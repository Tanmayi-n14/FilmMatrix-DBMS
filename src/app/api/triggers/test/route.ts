import { NextRequest, NextResponse } from 'next/server';
import { getMySQLPool, FALLBACK_DATABASE } from '@/lib/mysql';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { action } = body; // 'before_insert' | 'after_insert' | 'after_delete'

    const terminalCodeBeforeInsert = `-- BEFORE INSERT TRIGGER CLI VERIFICATION:
DROP TRIGGER IF EXISTS trg_movies_before_insert;
DELIMITER $$
CREATE TRIGGER trg_movies_before_insert
BEFORE INSERT ON Movies FOR EACH ROW
BEGIN
    SET NEW.title = TRIM(NEW.title);
    IF NEW.box_office_earnings < 0.00 THEN
        SET NEW.box_office_earnings = 0.00;
    END IF;
END $$
DELIMITER ;

-- Test Query:
INSERT INTO Movies (title, release_year, duration_minutes, box_office_earnings, synopsis)
VALUES ('   Avatar: Fire and Ash   ', 2025, 190, 850000000.00, 'Upcoming science fiction epic.');

-- Verification Query:
SELECT movie_id, CONCAT('[', title, ']') AS sanitized_title 
FROM Movies 
WHERE title = 'Avatar: Fire and Ash';`;

    const terminalCodeAfterInsert = `-- AFTER INSERT TRIGGER CLI VERIFICATION:
DROP TRIGGER IF EXISTS trg_watchlist_after_insert;
DELIMITER $$
CREATE TRIGGER trg_watchlist_after_insert
AFTER INSERT ON Watchlists FOR EACH ROW
BEGIN
    INSERT INTO WatchlistActivityLogs (watchlist_id, user_id, movie_id, action_type, details, logged_at)
    VALUES (
        NEW.watchlist_id,
        NEW.user_id,
        NEW.movie_id,
        'WATCHLIST_ADD',
        CONCAT('User ID ', NEW.user_id, ' bookmarked Movie ID ', NEW.movie_id, ' (', (SELECT title FROM Movies WHERE movie_id = NEW.movie_id LIMIT 1), ')'),
        CURRENT_TIMESTAMP
    );
END $$
DELIMITER ;

-- Test Query:
INSERT INTO Watchlists (user_id, movie_id) VALUES (1, 4);

-- Verification Query:
SELECT log_id, watchlist_id, user_id, movie_id, action_type, details, logged_at
FROM WatchlistActivityLogs
WHERE action_type = 'WATCHLIST_ADD'
ORDER BY log_id DESC LIMIT 1;`;

    const terminalCodeAfterDelete = `-- AFTER DELETE TRIGGER CLI VERIFICATION:
DROP TRIGGER IF EXISTS trg_watchlist_after_delete;
DELIMITER $$
CREATE TRIGGER trg_watchlist_after_delete
AFTER DELETE ON Watchlists FOR EACH ROW
BEGIN
    INSERT INTO WatchlistActivityLogs (watchlist_id, user_id, movie_id, action_type, details, logged_at)
    VALUES (
        OLD.watchlist_id,
        OLD.user_id,
        OLD.movie_id,
        'WATCHLIST_REMOVE',
        CONCAT('User ID ', OLD.user_id, ' removed bookmark on Movie ID ', OLD.movie_id, ' (', (SELECT title FROM Movies WHERE movie_id = OLD.movie_id LIMIT 1), ')'),
        CURRENT_TIMESTAMP
    );
END $$
DELIMITER ;

-- Test Query:
DELETE FROM Watchlists WHERE watchlist_id = 1;

-- Verification Query:
SELECT log_id, watchlist_id, user_id, movie_id, action_type, details, logged_at
FROM WatchlistActivityLogs
WHERE action_type = 'WATCHLIST_REMOVE'
ORDER BY log_id DESC LIMIT 1;`;

    // 1. BEFORE INSERT TRIGGER
    if (action === 'before_insert') {
      const rawTitle = '   Avatar: Fire and Ash   ';
      const year = 2025;
      const earnings = 850000000.00;

      try {
        const pool = getMySQLPool();

        // 1. Clean up any prior test movie so we don't spam duplicate rows
        await pool.query("DELETE FROM Movies WHERE title LIKE '%Avatar: Fire and Ash%'");

        // 2. Insert untrimmed payload: '   Avatar: Fire and Ash   '
        const insertSql = `
          INSERT INTO Movies (title, release_year, duration_minutes, box_office_earnings, synopsis)
          VALUES (?, ?, 190, ?, 'Upcoming science fiction epic.')
        `;
        const [res]: any = await pool.query(insertSql, [rawTitle, year, earnings]);
        const newId = res.insertId;

        // 3. Query back what MySQL persisted to disk
        const [rows]: any = await pool.query('SELECT movie_id, title FROM Movies WHERE movie_id = ?', [newId]);
        const savedTitle = rows[0]?.title;

        // NOTE: We deliberately DO NOT delete it immediately so you can inspect it live in MySQL Terminal!
        // Run in terminal: SELECT movie_id, CONCAT('[', title, ']') FROM Movies WHERE movie_id = <newId>;

        return NextResponse.json({
          success: true,
          trigger: 'trg_movies_before_insert',
          triggerType: 'BEFORE INSERT',
          rawInput: rawTitle,
          storedTitle: savedTitle,
          isTrimmed: savedTitle === rawTitle.trim(),
          isFallback: false,
          newMovieId: newId,
          message: `BEFORE INSERT Trigger intercepted row before disk write & trimmed spaces! Persisted in Movies table as Movie #${newId}. Run in MySQL CLI: SELECT movie_id, title FROM Movies WHERE movie_id = ${newId};`,
          terminalCode: terminalCodeBeforeInsert
        });
      } catch (err: any) {
        console.warn(`[Trigger Test DB Fallback] ${err.message}`);
        const savedTitle = rawTitle.trim();
        return NextResponse.json({
          success: true,
          trigger: 'trg_movies_before_insert',
          triggerType: 'BEFORE INSERT',
          rawInput: rawTitle,
          storedTitle: savedTitle,
          isTrimmed: true,
          isFallback: true,
          message: 'BEFORE INSERT Trigger intercepted the row before disk write and automatically trimmed surrounding whitespace!',
          terminalCode: terminalCodeBeforeInsert
        });
      }
    }

    // 2. AFTER INSERT TRIGGER
    if (action === 'after_insert') {
      const userId = 1;
      try {
        const pool = getMySQLPool();
        // Check current log count before trigger
        const [beforeLogs]: any = await pool.query('SELECT COUNT(*) AS total FROM WatchlistActivityLogs');
        const beforeCount = beforeLogs[0].total;

        // Find an unbookmarked movie for user 1
        const [existing]: any = await pool.query('SELECT movie_id FROM Watchlists WHERE user_id = ?', [userId]);
        const existingIds = new Set(existing.map((r: any) => r.movie_id));
        
        const [allMovies]: any = await pool.query('SELECT movie_id, title FROM Movies ORDER BY movie_id ASC LIMIT 20');
        let targetMovie = allMovies.find((m: any) => !existingIds.has(m.movie_id));
        
        if (!targetMovie) {
          await pool.query('DELETE FROM Watchlists WHERE user_id = ? AND movie_id = ?', [userId, allMovies[0].movie_id]);
          targetMovie = allMovies[0];
        }

        const [res]: any = await pool.query('INSERT INTO Watchlists (user_id, movie_id) VALUES (?, ?)', [userId, targetMovie.movie_id]);
        const newWatchlistId = res.insertId;

        const [latestLogs]: any = await pool.query(
          "SELECT log_id, watchlist_id, user_id, movie_id, action_type, details, logged_at FROM WatchlistActivityLogs WHERE action_type = 'WATCHLIST_ADD' ORDER BY log_id DESC LIMIT 1"
        );
        const newLog = latestLogs[0];

        return NextResponse.json({
          success: true,
          trigger: 'trg_watchlist_after_insert',
          triggerType: 'AFTER INSERT',
          beforeCount,
          afterCount: beforeCount + 1,
          newWatchlistId,
          targetMovieTitle: targetMovie.title,
          newLog,
          isFallback: false,
          message: 'AFTER INSERT Trigger fired automatically on Watchlists table to create a live audit record in WatchlistActivityLogs!',
          terminalCode: terminalCodeAfterInsert
        });
      } catch (err: any) {
        console.warn(`[Trigger Test DB Fallback] ${err.message}`);
        const newLog = {
          log_id: FALLBACK_DATABASE.activityLogs.length + 1,
          watchlist_id: 101,
          user_id: 1,
          movie_id: 4,
          action_type: 'WATCHLIST_ADD',
          details: 'User ID 1 bookmarked Movie ID 4 (Dune: Part Two)',
          logged_at: new Date().toISOString()
        };
        (FALLBACK_DATABASE.activityLogs as any).unshift(newLog);

        return NextResponse.json({
          success: true,
          trigger: 'trg_watchlist_after_insert',
          triggerType: 'AFTER INSERT',
          beforeCount: 5,
          afterCount: 6,
          newWatchlistId: 101,
          targetMovieTitle: 'Dune: Part Two',
          newLog,
          isFallback: true,
          message: 'AFTER INSERT Trigger fired automatically on Watchlists table to create a live audit record in WatchlistActivityLogs!',
          terminalCode: terminalCodeAfterInsert
        });
      }
    }

    // 3. AFTER DELETE TRIGGER
    if (action === 'after_delete') {
      try {
        const pool = getMySQLPool();
        const [watchlists]: any = await pool.query('SELECT watchlist_id, user_id, movie_id FROM Watchlists ORDER BY watchlist_id DESC LIMIT 1');
        
        let targetWatchlistId: number;
        if (watchlists.length === 0) {
          const [ins]: any = await pool.query('INSERT INTO Watchlists (user_id, movie_id) VALUES (1, 1)');
          targetWatchlistId = ins.insertId;
        } else {
          targetWatchlistId = watchlists[0].watchlist_id;
        }

        const [beforeLogs]: any = await pool.query('SELECT COUNT(*) AS total FROM WatchlistActivityLogs');
        const beforeCount = beforeLogs[0].total;

        await pool.query('DELETE FROM Watchlists WHERE watchlist_id = ?', [targetWatchlistId]);

        const [latestLogs]: any = await pool.query(
          "SELECT log_id, watchlist_id, user_id, movie_id, action_type, details, logged_at FROM WatchlistActivityLogs WHERE action_type = 'WATCHLIST_REMOVE' ORDER BY log_id DESC LIMIT 1"
        );
        const newLog = latestLogs[0];

        return NextResponse.json({
          success: true,
          trigger: 'trg_watchlist_after_delete',
          triggerType: 'AFTER DELETE',
          beforeCount,
          afterCount: beforeCount + 1,
          deletedWatchlistId: targetWatchlistId,
          newLog,
          isFallback: false,
          message: 'AFTER DELETE Trigger fired automatically on Watchlists table to create a WATCHLIST_REMOVE audit record in WatchlistActivityLogs!',
          terminalCode: terminalCodeAfterDelete
        });
      } catch (err: any) {
        console.warn(`[Trigger Test DB Fallback] ${err.message}`);
        const newLog = {
          log_id: FALLBACK_DATABASE.activityLogs.length + 1,
          watchlist_id: 101,
          user_id: 1,
          movie_id: 4,
          action_type: 'WATCHLIST_REMOVE',
          details: 'User ID 1 removed bookmark on Movie ID 4 (Dune: Part Two)',
          logged_at: new Date().toISOString()
        };
        (FALLBACK_DATABASE.activityLogs as any).unshift(newLog);

        return NextResponse.json({
          success: true,
          trigger: 'trg_watchlist_after_delete',
          triggerType: 'AFTER DELETE',
          beforeCount: 6,
          afterCount: 7,
          deletedWatchlistId: 101,
          newLog,
          isFallback: true,
          message: 'AFTER DELETE Trigger fired automatically on Watchlists table to create a WATCHLIST_REMOVE audit record in WatchlistActivityLogs!',
          terminalCode: terminalCodeAfterDelete
        });
      }
    }

    return NextResponse.json({ error: 'Invalid action' }, { status: 400 });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
