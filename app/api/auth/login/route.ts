import { NextResponse } from 'next/server';
import { setSessionCookie } from '@/lib/auth';

export async function POST(req: Request) {
  const body = await req.json();
  const email = String(body.email || '').trim().toLowerCase();
  const password = String(body.password || '');

  if (!email || !password) {
    return NextResponse.json({ error: 'Email and password are required.' }, { status: 400 });
  }

  const role = email === 'admin@gamereview.io' || email.includes('admin') ? 'admin' : 'user';
  const user = {
    id: email,
    name: body.name || (role === 'admin' ? 'Admin User' : 'Player'),
    email,
    role,
  };

  setSessionCookie(user);

  return NextResponse.json({ user }, { status: 200 });
}
