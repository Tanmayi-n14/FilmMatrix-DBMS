import { NextRequest, NextResponse } from 'next/server';
import { getSessionFromRequest } from '@/lib/auth';

export async function GET(req: NextRequest) {
  const session = getSessionFromRequest(req);
  if (!session) {
    return NextResponse.json({ authenticated: false, user: null }, { status: 200 });
  }
  return NextResponse.json({ authenticated: true, user: session });
}

export async function POST() {
  const res = NextResponse.json({ success: true, message: 'Logged out successfully' });
  res.cookies.set('filmmatrix_token', 'logged_out', {
    httpOnly: true,
    path: '/',
    maxAge: 0,
    expires: new Date(0),
  });
  return res;
}

