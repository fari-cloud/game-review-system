import { getGameBySlug } from '@/lib/prisma';
import { GameReviewForm } from '@/components/GameReviewForm';

export default async function GameDetailPage({ params }: { params: { slug: string } }) {
  const game = await getGameBySlug(params.slug);

  if (!game) {
    return (
      <main className="min-h-screen bg-slate-950 px-6 py-16 text-center text-white">
        <h1 className="text-3xl font-bold">Game not found</h1>
        <a href="/" className="mt-5 inline-block rounded-xl bg-accent-600 px-4 py-2 text-white">
          Back to home
        </a>
      </main>
    );
  }

  const averageRating =
    game.reviews.length > 0
      ? (game.reviews.reduce((sum, review) => sum + review.rating, 0) / game.reviews.length).toFixed(1)
      : 'No reviews yet';

  return (
    <main className="min-h-screen bg-slate-950 text-slate-100">
      <header className="border-b border-slate-800 bg-slate-950/80">
        <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
          <a href="/" className="text-2xl font-bold text-white">GameReview</a>
        </nav>
      </header>

      <section className="mx-auto max-w-6xl px-6 py-10">
        <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="overflow-hidden rounded-3xl border border-slate-800 bg-slate-900">
            {game.imageUrl ? (
              <img src={game.imageUrl} alt={game.title} className="h-80 w-full object-cover" />
            ) : null}
            <div className="space-y-5 p-6">
              <div className="flex items-center justify-between gap-3">
                <h1 className="text-4xl font-black text-white">{game.title}</h1>
                <span className="rounded-full bg-accent-600 px-3 py-1 text-sm font-medium text-white">
                  {averageRating}
                </span>
              </div>

              <div className="flex flex-wrap gap-3 text-sm text-slate-300">
                <span className="rounded-full bg-slate-800 px-3 py-1">{game.genre}</span>
                <span className="rounded-full bg-slate-800 px-3 py-1">{game.platform}</span>
                <span className="rounded-full bg-slate-800 px-3 py-1">{game.releaseYear}</span>
              </div>

              <p className="text-lg text-slate-300">{game.description}</p>
            </div>
          </div>

          <div className="space-y-6">
            <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
              <h2 className="text-2xl font-bold text-white">Community score</h2>
              <p className="mt-4 text-4xl font-black text-accent-100">{averageRating}</p>
              <p className="mt-2 text-slate-400">Based on {game.reviews.length} review(s)</p>
            </div>

            <GameReviewForm gameId={game.id} />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 pb-20">
        <h2 className="text-3xl font-bold text-white">Reviews</h2>

        <div className="mt-8 space-y-4">
          {game.reviews.length === 0 ? (
            <p className="rounded-2xl border border-dashed border-slate-700 bg-slate-900 p-8 text-slate-300">
              No reviews yet. Be the first to share your thoughts.
            </p>
          ) : (
            game.reviews.map((review) => (
              <article key={review.id} className="rounded-2xl border border-slate-800 bg-slate-900 p-5">
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <h3 className="text-lg font-semibold text-white">{review.user.name}</h3>
                    <p className="text-sm text-slate-400">
                      {new Date(review.createdAt).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric',
                      })}
                    </p>
                  </div>
                  <span className="rounded-full bg-accent-600 px-3 py-1 text-xs font-medium text-white">
                    {review.rating}/5
                  </span>
                </div>
                <p className="mt-4 text-slate-300">{review.content}</p>
              </article>
            ))
          )}
        </div>
      </section>
    </main>
  );
}
