'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';

export function AuthStatus({ session }: { session: { name: string; email: string; role: string } | null }) {
  const router = useRouter();

  async function handleLogout() {
    await fetch('/api/auth/logout', { method: 'POST' });
    router.refresh();
    router.push('/');
  }

  if (!session) {
    return (
      <Link href="/login" className="rounded-xl bg-violet-600 px-4 py-2 font-medium text-white hover:bg-violet-500">
        Sign in
      </Link>
    );
  }

  return (
    <div className="flex items-center gap-3">
      <div className="hidden text-sm text-slate-600 md:block dark:text-slate-300">
        <span className="font-semibold">{session.name}</span>
        {session.role === 'admin' ? ' • Admin' : ''}
      </div>
      {session.role === 'admin' ? (
        <Link href="/admin" className="rounded-lg border border-violet-500 px-3 py-2 text-sm text-violet-700 dark:text-violet-200">
          Admin
        </Link>
      ) : null}
      <button
        type="button"
        onClick={handleLogout}
        className="rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-700 hover:border-slate-400 dark:border-slate-600 dark:text-slate-200"
      >
        Logout
      </button>
    </div>
  );
}
