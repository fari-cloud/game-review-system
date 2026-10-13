'use client';

import { useState } from 'react';

export function GameAdminForm() {
  const [form, setForm] = useState({
    title: '',
    slug: '',
    description: '',
    genre: '',
    platform: '',
    releaseYear: '2025',
    rating: '5',
    imageUrl: '',
  });
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    setIsSubmitting(true);
    setMessage('');

    const response = await fetch('/api/games', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });

    const data = await response.json();

    if (!response.ok) {
      setMessage(data.error || 'Unable to add game.');
      setIsSubmitting(false);
      return;
    }

    setMessage('Game added successfully!');
    setForm({
      title: '',
      slug: '',
      description: '',
      genre: '',
      platform: '',
      releaseYear: '2025',
      rating: '5',
      imageUrl: '',
    });
    setIsSubmitting(false);
    window.location.reload();
  }

  return (
    <form onSubmit={handleSubmit} className="rounded-2xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900">
      <h2 className="mb-5 text-2xl font-bold">Add a new game</h2>

      <div className="grid gap-4 md:grid-cols-2">
        <label className="space-y-2 text-sm">
          <span>Title</span>
          <input
            value={form.title}
            onChange={(event) => setForm({ ...form, title: event.target.value })}
            className="w-full rounded-xl border border-slate-300 bg-slate-50 px-3 py-2 dark:border-slate-700 dark:bg-slate-950"
            required
          />
        </label>

        <label className="space-y-2 text-sm">
          <span>Slug</span>
          <input
            value={form.slug}
            onChange={(event) => setForm({ ...form, slug: event.target.value })}
            className="w-full rounded-xl border border-slate-300 bg-slate-50 px-3 py-2 dark:border-slate-700 dark:bg-slate-950"
            placeholder="e.g. doom-3"
          />
        </label>

        <label className="space-y-2 text-sm md:col-span-2">
          <span>Description</span>
          <textarea
            rows={4}
            value={form.description}
            onChange={(event) => setForm({ ...form, description: event.target.value })}
            className="w-full rounded-xl border border-slate-300 bg-slate-50 px-3 py-2 dark:border-slate-700 dark:bg-slate-950"
            required
          />
        </label>

        <label className="space-y-2 text-sm">
          <span>Genre</span>
          <input
            value={form.genre}
            onChange={(event) => setForm({ ...form, genre: event.target.value })}
            className="w-full rounded-xl border border-slate-300 bg-slate-50 px-3 py-2 dark:border-slate-700 dark:bg-slate-950"
            required
          />
        </label>

        <label className="space-y-2 text-sm">
          <span>Platform</span>
          <input
            value={form.platform}
            onChange={(event) => setForm({ ...form, platform: event.target.value })}
            className="w-full rounded-xl border border-slate-300 bg-slate-50 px-3 py-2 dark:border-slate-700 dark:bg-slate-950"
            required
          />
        </label>

        <label className="space-y-2 text-sm">
          <span>Release year</span>
          <input
            type="number"
            value={form.releaseYear}
            onChange={(event) => setForm({ ...form, releaseYear: event.target.value })}
            className="w-full rounded-xl border border-slate-300 bg-slate-50 px-3 py-2 dark:border-slate-700 dark:bg-slate-950"
            required
          />
        </label>

        <label className="space-y-2 text-sm">
          <span>Rating</span>
          <input
            type="number"
            min="0"
            max="5"
            step="0.1"
            value={form.rating}
            onChange={(event) => setForm({ ...form, rating: event.target.value })}
            className="w-full rounded-xl border border-slate-300 bg-slate-50 px-3 py-2 dark:border-slate-700 dark:bg-slate-950"
            required
          />
        </label>

        <label className="space-y-2 text-sm md:col-span-2">
          <span>Image URL</span>
          <input
            value={form.imageUrl}
            onChange={(event) => setForm({ ...form, imageUrl: event.target.value })}
            className="w-full rounded-xl border border-slate-300 bg-slate-50 px-3 py-2 dark:border-slate-700 dark:bg-slate-950"
            placeholder="https://example.com/image.jpg"
          />
        </label>
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="mt-6 rounded-xl bg-violet-600 px-4 py-2 font-semibold text-white hover:bg-violet-500 disabled:opacity-60"
      >
        {isSubmitting ? 'Saving...' : 'Add game'}
      </button>

      {message ? <p className="mt-4 text-sm text-emerald-600 dark:text-emerald-400">{message}</p> : null}
    </form>
  );
}
