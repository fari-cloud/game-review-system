'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

export function LoginForm({ next = '/' }: { next?: string }) {
  const router = useRouter();
  const [email, setEmail] = useState('admin@gamereview.io');
  const [password, setPassword] = useState('admin123');
  const [name, setName] = useState('Admin User');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    setIsSubmitting(true);
    setError('');

    const response = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password, name }),
    });

    const data = await response.json();

    if (!response.ok) {
      setError(data.error || 'Unable to sign in.');
      setIsSubmitting(false);
      return;
    }

    router.push(next);
    router.refresh();
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-50 px-6 dark:bg-slate-950">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md rounded-3xl border border-slate-200 bg-white p-8 shadow-xl dark:border-slate-800 dark:bg-slate-900"
      >
        <h1 className="mb-6 text-3xl font-black text-slate-900 dark:text-white">Sign in</h1>

        <div className="space-y-5">
          <label className="block space-y-2 text-sm text-slate-700 dark:text-slate-300">
            <span>Name</span>
            <input
              value={name}
              onChange={(event) => setName(event.target.value)}
              className="w-full rounded-xl border border-slate-300 bg-slate-50 px-3 py-2 dark:border-slate-700 dark:bg-slate-950 dark:text-white"
              placeholder="Your name"
            />
          </label>

          <label className="block space-y-2 text-sm text-slate-700 dark:text-slate-300">
            <span>Email</span>
            <input
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              className="w-full rounded-xl border border-slate-300 bg-slate-50 px-3 py-2 dark:border-slate-700 dark:bg-slate-950 dark:text-white"
              placeholder="admin@gamereview.io"
              required
            />
          </label>

          <label className="block space-y-2 text-sm text-slate-700 dark:text-slate-300">
            <span>Password</span>
            <input
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              className="w-full rounded-xl border border-slate-300 bg-slate-50 px-3 py-2 dark:border-slate-700 dark:bg-slate-950 dark:text-white"
              placeholder="admin123"
              required
            />
          </label>
        </div>

        {error ? <p className="mt-4 text-sm text-red-500">{error}</p> : null}

        <button
          type="submit"
          disabled={isSubmitting}
          className="mt-6 w-full rounded-xl bg-violet-600 px-4 py-3 font-semibold text-white hover:bg-violet-500 disabled:opacity-60"
        >
          {isSubmitting ? 'Signing in...' : 'Continue'}
        </button>

        <p className="mt-5 text-center text-sm text-slate-500 dark:text-slate-400">
          Demo admin: admin@gamereview.io / admin123
        </p>
      </form>
    </main>
  );
}
