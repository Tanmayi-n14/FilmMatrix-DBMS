import { NextRequest, NextResponse } from 'next/server';
import { getMySQLPool } from '@/lib/mysql';

// GET: List all MySQL users (SELECT user, host FROM mysql.user) + their grants & app role
export async function GET() {
  const pool = getMySQLPool();
  try {
    const [rows] = await pool.execute<any[]>(
      `SELECT user, host FROM mysql.user 
       WHERE user NOT IN ('mysql.infoschema','mysql.session','mysql.sys')
       ORDER BY FIELD(user,'PES1UG24CS493_TANMAYI','critic_user','ul','root') DESC, user ASC`
    );

    // Also get app roles from Users table to match
    const [appUsers] = await pool.execute<any[]>(
      `SELECT username, role, email FROM Users`
    );
    const appRoleMap: Record<string, string> = {
      'PES1UG24CS493_TANMAYI': 'Admin',
      'critic_user': 'Critic',
      'ul': 'Viewer',
      'root': 'SuperAdmin'
    };
    appUsers.forEach((u: any) => {
      appRoleMap[u.username] = u.role;
    });

    // For each relevant user, fetch their grants summary
    const enriched = await Promise.all(
      rows.map(async (row: any) => {
        let grants = '—';
        try {
          const [grantRows] = await pool.execute<any[]>(
            `SHOW GRANTS FOR '${row.user}'@'${row.host}'`
          );
          if (grantRows.length > 0) {
            const allGrants = grantRows.map((g: any) => Object.values(g)[0] as string).join('; ');
            if (allGrants.includes('ALL PRIVILEGES')) {
              grants = 'ALL PRIVILEGES (filmmatrix_db.*)';
            } else if (allGrants.includes('INSERT') && allGrants.includes('SELECT')) {
              grants = 'SELECT (all) + INSERT/UPDATE (Reviews)';
            } else if (allGrants.includes('SELECT')) {
              grants = 'SELECT ONLY (Read-Only)';
            } else {
              grants = 'USAGE (No permissions)';
            }
          }
        } catch {
          grants = '(no grants / denied)';
        }
        return {
          user: row.user,
          host: row.host,
          appRole: appRoleMap[row.user] || 'Custom',
          grants,
        };
      })
    );

    return NextResponse.json({ users: enriched });
  } catch (err: any) {
    return NextResponse.json({ error: err.message, users: [] }, { status: 500 });
  }
}

// POST: Execute CREATE USER, GRANT, REVOKE, or DROP USER
export async function POST(request: NextRequest) {
  const pool = getMySQLPool();
  try {
    const body = await request.json();
    const { action, username, password, host, role, targetUser } = body;

    // -------------------------------------------------------------
    // ACTION 1: CREATE USER WITH ROLE GRANTS
    // -------------------------------------------------------------
    if (action === 'create_user') {
      const cleanUser = (username || '').trim().replace(/[^a-zA-Z0-9_]/g, '');
      const cleanHost = (host || 'localhost').trim().replace(/[^a-zA-Z0-9_%.-]/g, '');
      const pass = password || 'FilmMatrix@2026';
      const cleanRole = ['Admin', 'Critic', 'Viewer'].includes(role) ? role : 'Viewer';

      if (!cleanUser) {
        return NextResponse.json({ success: false, message: 'Username is required (alphanumeric and underscores only).' }, { status: 400 });
      }

      const sqlStatements: string[] = [];

      // 1. Create MySQL user
      const createSql = `CREATE USER IF NOT EXISTS '${cleanUser}'@'${cleanHost}' IDENTIFIED BY '${pass}';`;
      await pool.execute(createSql);
      sqlStatements.push(createSql);

      // 2. Grant based on selected role
      if (cleanRole === 'Admin') {
        const grantSql = `GRANT ALL PRIVILEGES ON filmmatrix_db.* TO '${cleanUser}'@'${cleanHost}' WITH GRANT OPTION;`;
        await pool.execute(grantSql);
        sqlStatements.push(grantSql);
      } else if (cleanRole === 'Critic') {
        const g1 = `GRANT SELECT ON filmmatrix_db.* TO '${cleanUser}'@'${cleanHost}';`;
        const g2 = `GRANT INSERT, UPDATE ON filmmatrix_db.Reviews TO '${cleanUser}'@'${cleanHost}';`;
        await pool.execute(g1);
        await pool.execute(g2);
        sqlStatements.push(g1, g2);
      } else {
        // Viewer
        const g1 = `GRANT SELECT ON filmmatrix_db.* TO '${cleanUser}'@'${cleanHost}';`;
        await pool.execute(g1);
        sqlStatements.push(g1);
      }

      await pool.execute(`FLUSH PRIVILEGES;`);
      sqlStatements.push(`FLUSH PRIVILEGES;`);

      // 3. Synchronize with Users application table
      try {
        await pool.execute(
          `INSERT INTO Users (username, email, role, password_hash)
           VALUES (?, ?, ?, SHA2(?, 256))
           ON DUPLICATE KEY UPDATE role = VALUES(role)`,
          [cleanUser, `${cleanUser.toLowerCase()}@filmmatrix.pes.edu`, cleanRole, pass]
        );
      } catch (e) {
        console.warn('Could not mirror into Users table:', e);
      }

      return NextResponse.json({
        success: true,
        message: `✓ MySQL user '${cleanUser}'@'${cleanHost}' created with role '${cleanRole}'! Privileges granted.`,
        sql: sqlStatements.join('\n')
      });
    }

    // -------------------------------------------------------------
    // ACTION 2: DROP USER
    // -------------------------------------------------------------
    if (action === 'drop_user') {
      const target = (username || targetUser || '').trim();
      const cleanHost = (host || 'localhost').trim();

      if (['root', 'PES1UG24CS493_TANMAYI'].includes(target)) {
        return NextResponse.json({ success: false, message: `Safety guard: Cannot drop primary administrator user '${target}'!` }, { status: 400 });
      }

      const dropSql = `DROP USER IF EXISTS '${target}'@'${cleanHost}';`;
      await pool.execute(dropSql);
      await pool.execute(`FLUSH PRIVILEGES;`);

      // Optionally clean up application table
      try {
        await pool.execute(`DELETE FROM Users WHERE username = ?`, [target]);
      } catch (e) {}

      return NextResponse.json({
        success: true,
        message: `✓ User '${target}'@'${cleanHost}' dropped successfully.`,
        sql: `${dropSql}\nFLUSH PRIVILEGES;`
      });
    }

    // -------------------------------------------------------------
    // ACTION 3: PRESET GRANTS (u1 / critic_user)
    // -------------------------------------------------------------
    let sql = '';
    let message = '';

    if (action === 'grant' && targetUser === 'critic_user') {
      await pool.execute(`CREATE USER IF NOT EXISTS 'critic_user'@'localhost' IDENTIFIED BY 'Critic@2026';`);
      await pool.execute(`GRANT SELECT ON filmmatrix_db.* TO 'critic_user'@'localhost';`);
      await pool.execute(`GRANT INSERT, UPDATE ON filmmatrix_db.Reviews TO 'critic_user'@'localhost';`);
      await pool.execute(`FLUSH PRIVILEGES;`);
      sql = `CREATE USER IF NOT EXISTS 'critic_user'@'localhost' IDENTIFIED BY 'Critic@2026';\nGRANT SELECT ON filmmatrix_db.* TO 'critic_user'@'localhost';\nGRANT INSERT, UPDATE ON filmmatrix_db.Reviews TO 'critic_user'@'localhost';\nFLUSH PRIVILEGES;`;
      message = `✓ critic_user granted SELECT on filmmatrix_db.* and INSERT, UPDATE on Reviews. Critic role active.`;
    } else if (action === 'grant' && (targetUser === 'ul' || targetUser === 'u1')) {
      await pool.execute(`GRANT SELECT ON filmmatrix_db.* TO 'ul'@'%';`);
      await pool.execute(`FLUSH PRIVILEGES;`);
      sql = `GRANT SELECT ON filmmatrix_db.* TO 'ul'@'%';\nFLUSH PRIVILEGES;`;
      message = `✓ ul granted SELECT on filmmatrix_db.*. Viewer role active (Read-Only).`;
    } else if (action === 'revoke' && targetUser === 'critic_user') {
      await pool.execute(`REVOKE INSERT, UPDATE ON filmmatrix_db.Reviews FROM 'critic_user'@'localhost';`);
      await pool.execute(`FLUSH PRIVILEGES;`);
      sql = `REVOKE INSERT, UPDATE ON filmmatrix_db.Reviews FROM 'critic_user'@'localhost';\nFLUSH PRIVILEGES;`;
      message = `✓ critic_user REVOKED INSERT/UPDATE on Reviews. Now read-only like Viewer.`;
    } else {
      return NextResponse.json({ success: false, message: `Unsupported action or user.` }, { status: 400 });
    }

    return NextResponse.json({ success: true, message, sql });
  } catch (err: any) {
    return NextResponse.json({ success: false, message: err.message }, { status: 500 });
  }
}
