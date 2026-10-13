import { cookies } from 'next/headers';

export type SessionUser = {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'user';
};

const COOKIE_NAME = 'game-review-session';

export function getSessionUser(): SessionUser | null {
  const cookie = cookies().get(COOKIE_NAME);

  if (!cookie) {
    return null;
  }

  try {
    return JSON.parse(cookie.value) as SessionUser;
  } catch {
    return null;
  }
}

export function isAdminSession() {
  const session = getSessionUser();
  return Boolean(session && session.role === 'admin');
}

export function setSessionCookie(user: SessionUser) {
  cookies().set(COOKIE_NAME, JSON.stringify(user), {
    httpOnly: true,
    sameSite: 'lax',
    path: '/',
    maxAge: 60 * 60 * 24 * 7,
  });
}

export function clearSessionCookie() {
  cookies().delete(COOKIE_NAME);
}
