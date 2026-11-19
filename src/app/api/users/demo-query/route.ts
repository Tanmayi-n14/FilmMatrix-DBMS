import { NextRequest, NextResponse } from 'next/server';
import mysql from 'mysql2/promise';

// Demo query API: connects as the specified MySQL user to prove privilege enforcement live
export async function POST(request: NextRequest) {
  const { dbUser, queryType } = await request.json();

  // Map dbUser to credentials
  const credentials: Record<string, { user: string; host: string; password: string }> = {
    'ul': { user: 'ul', host: '127.0.0.1', password: '' },
    'critic_user': { user: 'critic_user', host: '127.0.0.1', password: 'Critic@2026' },
    'PES1UG24CS493_TANMAYI': { user: 'PES1UG24CS493_TANMAYI', host: '127.0.0.1', password: '' },
  };

  const creds = credentials[dbUser];
  if (!creds) {
    return NextResponse.json({ user: dbUser, query: queryType, result: 'Unknown user', allowed: false });
  }

  let connection: mysql.Connection | null = null;
  try {
    connection = await mysql.createConnection({
      host: '127.0.0.1',
      port: 3306,
      user: creds.user,
      password: creds.password,
      database: 'filmmatrix_db',
    });

    let query = '';
    let result = '';
    let allowed = false;

    if (queryType === 'select') {
      query = 'SELECT movie_id, title, release_year FROM Movies ORDER BY movie_id LIMIT 5';
      const [rows] = await connection.execute<any[]>(query);
      result = rows.map((r: any) => `  [${r.movie_id}] ${r.title} (${r.release_year})`).join('\n');
      result = `SELECT executed successfully. ${rows.length} rows returned:\n${result}`;
      allowed = true;
    } else if (queryType === 'insert') {
      query = `INSERT INTO Movies (title, release_year, mpaa_rating, duration_minutes, language) VALUES ('PrivilegeTest', 2026, 'PG-13', 90, 'English')`;
      await connection.execute(query);
      // If we get here without error, clean up
      await connection.execute(`DELETE FROM Movies WHERE title = 'PrivilegeTest'`);
      result = `INSERT executed successfully (user has INSERT privilege). Test row cleaned up.`;
      allowed = true;
    } else if (queryType === 'delete') {
      query = `DELETE FROM Movies WHERE movie_id = 999`;
      await connection.execute(query);
      result = `DELETE executed successfully (user has DELETE privilege).`;
      allowed = true;
    }

    return NextResponse.json({ user: dbUser, query, result, allowed });

  } catch (err: any) {
    // MySQL error 1142 = privilege denied
    const isPrivilegeError = err.code === 'ER_TABLEACCESS_DENIED_ERROR' || err.code === 'ER_DBACCESS_DENIED_ERROR' || err.errno === 1142 || err.errno === 1044;
    return NextResponse.json({
      user: dbUser,
      query: queryType,
      result: isPrivilegeError
        ? `ERROR 1142 (42000): ${err.code} — command denied to user '${dbUser}'.\n\nThis confirms the GRANT restricts this user from performing ${queryType.toUpperCase()} operations.`
        : `ERROR: ${err.message}`,
      allowed: false,
    });
  } finally {
    if (connection) await connection.end();
  }
}
