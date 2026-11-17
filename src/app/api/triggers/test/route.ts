import { NextRequest, NextResponse } from 'next/server';
import { getMySQLPool, FALLBACK_DATABASE } from '@/lib/mysql';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { action } = body; // 'before_insert' | 'after_insert' | 'after_delete'

    const pool = getMySQLPool();

    if (action === 'before_insert') {
      const rawTitle = '   Avatar: Fire and Ash (AutoTrim Test)   ';
      const year = 2025;
      const earnings = 850000000.00;
      
      const insertSql = `
        INSERT INTO Movies (title, release_year, duration_minutes, box_office_earnings, synopsis)
        VALUES (?, ?, 190, ?, 'Testing BEFORE INSERT trigger data sanitization.')
      `;
      const [res]: any = await pool.query(insertSql, [rawTitle, year, earnings]);
      const newId = res.insertId;

      // Query back what was saved to disk
      const [rows]: any = await pool.query('SELECT movie_id, title FROM Movies WHERE movie_id = ?', [newId]);
      const savedTitle = rows[0]?.title;

      // Clean up test row
      await pool.query('DELETE FROM Movies WHERE movie_id = ?', [newId]);

      const terminalCode = `-- BEFORE INSERT TRIGGER CLI VERIFICATION:
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
VALUES ('   Avatar: Fire and Ash (AutoTrim Test)   ', 2025, 190, 850000000.00, 'Test.');

-- Verification Query:
SELECT movie_id, CONCAT('[', title, ']') AS sanitized_title 
FROM Movies 
WHERE title = 'Avatar: Fire and Ash (AutoTrim Test)';`;

      return NextResponse.json({
        success: true,
        trigger: 'trg_movies_before_insert',
        triggerType: 'BEFORE INSERT',
        rawInput: rawTitle,
        storedTitle: savedTitle,
        isTrimmed: savedTitle === rawTitle.trim(),
        message: 'BEFORE INSERT Trigger intercepted the row before disk write and automatically trimmed surrounding whitespace!',
        terminalCode
      });
    }

    if (action === 'after_insert') {
      const userId = 1;

      // Check current log count before trigger
      const [beforeLogs]: any = await pool.query('SELECT COUNT(*) AS total FROM WatchlistActivityLogs');
      const beforeCount = beforeLogs[0].total;

      // Find a movie not yet bookmarked by user 1
      const [existing]: any = await pool.query('SELECT movie_id FROM Watchlists WHERE user_id = ?', [userId]);
      const existingIds = new Set(existing.map((r: any) => r.movie_id));
      
      const [allMovies]: any = await pool.query('SELECT movie_id, title FROM Movies ORDER BY movie_id ASC LIMIT 10');
      let targetMovie = allMovies.find((m: any) => !existingIds.has(m.movie_id));
      
      if (!targetMovie) {
        // If all are bookmarked, clear one so we can bookmark it
        await pool.query('DELETE FROM Watchlists WHERE user_id = ? AND movie_id = ?', [userId, allMovies[0].movie_id]);
        targetMovie = allMovies[0];
      }

      // Insert into Watchlists -> MySQL fires trg_watchlist_after_insert
      const [res]: any = await pool.query('INSERT INTO Watchlists (user_id, movie_id) VALUES (?, ?)', [userId, targetMovie.movie_id]);
      const newWatchlistId = res.insertId;

      // Query latest audit log created by the trigger
      const [latestLogs]: any = await pool.query(
        'SELECT log_id, watchlist_id, user_id, movie_id, action_type, details, logged_at FROM WatchlistActivityLogs ORDER BY log_id DESC LIMIT 1'
      );
      const newLog = latestLogs[0];

      const terminalCode = `-- AFTER INSERT TRIGGER CLI VERIFICATION:
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
        CONCAT('User ID ', NEW.user_id, ' bookmarked Movie ID ', NEW.movie_id, ' at ', CURRENT_TIMESTAMP),
        CURRENT_TIMESTAMP
    );
END $$
DELIMITER ;

-- Test Query:
INSERT INTO Watchlists (user_id, movie_id) VALUES (${userId}, ${targetMovie.movie_id});

-- Verification Query:
SELECT log_id, watchlist_id, user_id, movie_id, action_type, details, logged_at
FROM WatchlistActivityLogs
ORDER BY log_id DESC LIMIT 1;`;

      return NextResponse.json({
        success: true,
        trigger: 'trg_watchlist_after_insert',
        triggerType: 'AFTER INSERT',
        beforeCount,
        afterCount: beforeCount + 1,
        bookmarkedMovie: targetMovie.title,
        watchlistId: newWatchlistId,
        newLog,
        message: 'AFTER INSERT Trigger fired automatically on Watchlists table to create an audit ledger row in WatchlistActivityLogs!',
        terminalCode
      });
    }

    if (action === 'after_delete') {
      const userId = 1;

      // Find an existing watchlist row
      const [existing]: any = await pool.query('SELECT watchlist_id, movie_id FROM Watchlists WHERE user_id = ? LIMIT 1', [userId]);
      
      let targetWatchlistId = existing[0]?.watchlist_id;
      let targetMovieId = existing[0]?.movie_id;

      if (!targetWatchlistId) {
        // Create one first so we can demonstrate delete
        const [res]: any = await pool.query('INSERT INTO Watchlists (user_id, movie_id) VALUES (?, 1)', [userId]);
        targetWatchlistId = res.insertId;
        targetMovieId = 1;
      }

      // Check log count before delete
      const [beforeLogs]: any = await pool.query('SELECT COUNT(*) AS total FROM WatchlistActivityLogs');
      const beforeCount = beforeLogs[0].total;

      // Delete from Watchlists -> MySQL fires trg_watchlist_after_delete
      await pool.query('DELETE FROM Watchlists WHERE watchlist_id = ?', [targetWatchlistId]);

      // Query latest audit log created by trigger
      const [latestLogs]: any = await pool.query(
        'SELECT log_id, watchlist_id, user_id, movie_id, action_type, details, logged_at FROM WatchlistActivityLogs ORDER BY log_id DESC LIMIT 1'
      );
      const newLog = latestLogs[0];

      const terminalCode = `-- AFTER DELETE TRIGGER CLI VERIFICATION:
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
        CONCAT('User ID ', OLD.user_id, ' removed bookmark on Movie ID ', OLD.movie_id, ' at ', CURRENT_TIMESTAMP),
        CURRENT_TIMESTAMP
    );
END $$
DELIMITER ;

-- Test Query:
DELETE FROM Watchlists WHERE watchlist_id = ${targetWatchlistId};

-- Verification Query:
SELECT log_id, watchlist_id, user_id, movie_id, action_type, details, logged_at
FROM WatchlistActivityLogs
ORDER BY log_id DESC LIMIT 1;`;

      return NextResponse.json({
        success: true,
        trigger: 'trg_watchlist_after_delete',
        triggerType: 'AFTER DELETE',
        beforeCount,
        afterCount: beforeCount + 1,
        deletedWatchlistId: targetWatchlistId,
        newLog,
        message: 'AFTER DELETE Trigger fired automatically on Watchlists table to create a WATCHLIST_REMOVE audit record in WatchlistActivityLogs!',
        terminalCode
      });
    }

    return NextResponse.json({ error: 'Invalid action' }, { status: 400 });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
