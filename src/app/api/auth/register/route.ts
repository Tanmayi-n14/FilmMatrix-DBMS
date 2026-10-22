import { NextRequest, NextResponse } from 'next/server';
import { query, FALLBACK_DATABASE, getMySQLPool } from '@/lib/mysql';
import { hashPassword, signToken } from '@/lib/auth';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { username, email, password, role = 'Viewer' } = body;

    // Application-level validation
    if (!username || !email || !password) {
      return NextResponse.json({ error: 'Username, email, and password are required.' }, { status: 400 });
    }
    if (password.length < 6) {
      return NextResponse.json({ error: 'Password must be at least 6 characters long.' }, { status: 400 });
    }
    if (!['Viewer', 'Admin'].includes(role)) {
      return NextResponse.json({ error: 'Invalid role. Must be Viewer or Admin.' }, { status: 400 });
    }

    // Check if user already exists
    const checkSql = 'SELECT user_id FROM Users WHERE email = ? OR username = ?';
    const { rows: existing } = await query(checkSql, [email, username]);

    if (existing && existing.length > 0) {
      return NextResponse.json({ error: 'Username or email already registered.' }, { status: 409 });
    }

    // BCrypt Hashing (Security Requirement)
    const passwordHash = await hashPassword(password);

    // Database Insertion
    try {
      const p = getMySQLPool();
      const insertSql = 'INSERT INTO Users (username, email, password_hash, role) VALUES (?, ?, ?, ?)';
      const [result]: any = await p.query(insertSql, [username, email, passwordHash, role]);

      const newUser = {
        user_id: result.insertId,
        username,
        email,
        role: role as 'Viewer' | 'Admin',
      };

      const token = signToken(newUser);
      const res = NextResponse.json({ success: true, user: newUser, token });
      res.cookies.set('filmmatrix_token', token, {
        httpOnly: true,
        path: '/',
        maxAge: 7 * 24 * 60 * 60,
      });
      return res;
    } catch (dbErr: any) {
      // Fallback in-memory registration for testing resilience
      const newId = FALLBACK_DATABASE.users.length + 1;
      const fallbackUser = {
        user_id: newId,
        username,
        email,
        role: role as 'Viewer' | 'Admin',
        password_hash: passwordHash,
        created_at: new Date().toISOString()
      };
      FALLBACK_DATABASE.users.push(fallbackUser);

      const token = signToken({
        user_id: newId,
        username,
        email,
        role: role as 'Viewer' | 'Admin',
      });
      const res = NextResponse.json({
        success: true,
        user: { user_id: newId, username, email, role },
        token,
        isFallback: true
      });
      res.cookies.set('filmmatrix_token', token, {
        httpOnly: true,
        path: '/',
        maxAge: 7 * 24 * 60 * 60,
      });
      return res;
    }
  } catch (err: any) {
    return NextResponse.json({ error: err.message || 'Internal server error' }, { status: 500 });
  }
}
