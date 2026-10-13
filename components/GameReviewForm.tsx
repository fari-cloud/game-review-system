'use client';

import { useState } from 'react';

export function GameReviewForm({ gameId }: { gameId: string }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [content, setContent] = useState('');
  const [rating, setRating] = useState(5);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState('');

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSubmitting(true);
    setMessage('');

    const res = await fetch('/api/reviews', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        gameId,
        name,
        email,
        content,
        rating,
      }),
    });

    const data = await res.json();

    if (!res.ok) {
      setMessage(data.error || 'Unable to submit review.');
      setIsSubmitting(false);
      return;
    }

    setName('');
    setEmail('');
    setContent('');
    setRating(5);
    setMessage('Review submitted successfully.');
    setIsSubmitting(false);
    window.location.reload();
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5 rounded-2xl border border-slate-800 bg-slate-900 p-6">
      <div>
        <h3 className="text-xl font-semibold text-white">Write a review</h3>
        <p className="text-sm text-slate-400">Share your thoughts and score this game.</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <label className="space-y-2 text-sm text-slate-300">
          <span>Name</span>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full rounded-xl border border-slate-700 bg-slate-950 px-3 py-2 text-white outline-none focus:border-accent-500"
            placeholder="Your name"
            required
          />
        </label>

        <label className="space-y-2 text-sm text-slate-300">
          <span>Email</span>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded-xl border border-slate-700 bg-slate-950 px-3 py-2 text-white outline-none focus:border-accent-500"
            placeholder="you@example.com"
            required
          />
        </label>
      </div>

      <label className="space-y-2 text-sm text-slate-300">
        <span>Rating</span>
        <select
          value={rating}
          onChange={(e) => setRating(Number(e.target.value))}
          className="w-full rounded-xl border border-slate-700 bg-slate-950 px-3 py-2 text-white outline-none focus:border-accent-500"
        >
          {[5, 4, 3, 2, 1].map((value) => (
            <option key={value} value={value}>
              {value} / 5
            </option>
          ))}
        </select>
      </label>

      <label className="space-y-2 text-sm text-slate-300">
        <span>Review</span>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          rows={5}
          className="w-full rounded-xl border border-slate-700 bg-slate-950 px-3 py-2 text-white outline-none focus:border-accent-500"
          placeholder="What did you enjoy most about this game?"
          required
        />
      </label>

      <button
        type="submit"
        disabled={isSubmitting}
        className="rounded-xl bg-accent-600 px-4 py-2 font-semibold text-white hover:bg-accent-500 disabled:cursor-not-allowed disabled:opacity-50"
      >
        {isSubmitting ? 'Submitting...' : 'Post review'}
      </button>

      {message ? <p className="text-sm text-emerald-300">{message}</p> : null}
    </form>
  );
}
