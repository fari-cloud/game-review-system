import { getGames } from '@/lib/prisma';

function GameCard({
  title,
  slug,
  genre,
  platform,
  rating,
  imageUrl,
}: {
  title: string;
  slug: string;
  genre: string;
  platform: string;
  rating: number;
  imageUrl?: string | null;
}) {
  return (
    <article className="overflow-hidden rounded-2xl border border-slate-700 bg-slate-900 shadow-lg">
      <div className="h-48 w-full bg-slate-800">
        {imageUrl ? (
          <img src={imageUrl} alt={title} className="h-full w-full object-cover" />
        ) : null}
      </div>
      <div className="space-y-3 p-5">
        <div className="flex items-center justify-between gap-3">
          <h2 className="text-xl font-semibold text-white">{title}</h2>
          <span className="rounded-full bg-accent-600 px-2.5 py-1 text-xs font-medium text-white">
            {rating.toFixed(1)}
          </span>
        </div>
        <p className="text-sm text-slate-300">{genre} • {platform}</p>
        <a
          href={`/games/${slug}`}
          className="inline-block rounded-lg border border-accent-500 px-3 py-2 text-sm font-medium text-accent-100 transition hover:bg-accent-600/20"
        >
          View game
        </a>
      </div>
    </article>
  );
}

export default async function HomePage() {
  const games = await getGames();

  return (
    <main className="min-h-screen bg-slate-950 text-slate-100">
      <header className="border-b border-slate-800 bg-slate-950/80 backdrop-blur-sm">
        <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
          <div className="text-2xl font-bold tracking-tight text-white">GameReview</div>
          <div className="flex items-center gap-4 text-sm text-slate-300">
            <a href="#games" className="hover:text-white">Browse</a>
            <a href="#reviews" className="hover:text-white">Reviews</a>
            <button className="rounded-xl bg-accent-600 px-4 py-2 font-medium text-white hover:bg-accent-500">
              Sign in
            </button>
          </div>
        </nav>
      </header>

      <section className="mx-auto max-w-6xl px-6 py-16">
        <div className="grid items-center gap-10 lg:grid-cols-2">
          <div>
            <p className="mb-4 inline-flex rounded-full border border-accent-500/30 bg-accent-600/10 px-3 py-1 text-xs uppercase tracking-[0.2em] text-accent-200">
              Built for gamers
            </p>
            <h1 className="text-4xl font-black tracking-tight text-white md:text-6xl">
              Review the games you love.
            </h1>
            <p className="mt-6 max-w-xl text-lg text-slate-300">
              Track, review, and discover games with a modern community-first platform built for players.
            </p>
            <div className="mt-8 flex gap-4">
              <a
                href="#games"
                className="rounded-xl bg-accent-600 px-5 py-3 font-semibold text-white hover:bg-accent-500"
              >
                Explore games
              </a>
              <a
                href="#reviews"
                className="rounded-xl border border-slate-700 px-5 py-3 font-semibold text-slate-100 hover:border-slate-500"
              >
                Read reviews
              </a>
            </div>
          </div>

          <div className="rounded-3xl border border-slate-800 bg-slate-900 p-6 shadow-2xl">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-slate-300">Top rated</span>
                <span className="rounded-full bg-emerald-500/20 px-2 py-1 text-xs font-medium text-emerald-300">
                  +18% this week
                </span>
              </div>
              <div className="rounded-2xl bg-slate-800 p-5">
                <p className="text-sm text-slate-400">Featured game</p>
                <h3 className="mt-2 text-2xl font-bold text-white">Elden Ring</h3>
                <p className="mt-3 text-slate-300">A richly layered action RPG packed with discovery, responsibility, and challenge.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="games" className="mx-auto max-w-6xl px-6 pb-16">
        <div className="mb-8 flex items-end justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.2em] text-accent-200">Catalog</p>
            <h2 className="mt-2 text-3xl font-bold text-white">Popular games</h2>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {games.map((game) => (
            <GameCard
              key={game.id}
              title={game.title}
              slug={game.slug}
              genre={game.genre}
              platform={game.platform}
              rating={game.rating}
              imageUrl={game.imageUrl}
            />
          ))}
        </div>
      </section>

      <section id="reviews" className="mx-auto max-w-6xl px-6 pb-20">
        <h2 className="text-3xl font-bold text-white">What players are saying</h2>
        <div className="mt-8 grid gap-5 md:grid-cols-3">
          <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5">
            <p className="text-slate-300">“A masterpiece of worldbuilding and atmosphere.”</p>
            <p className="mt-4 text-sm text-slate-500">— Alice Gamer</p>
          </div>
          <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5">
            <p className="text-slate-300">“The kind of game that rewards curiosity and persistence.”</p>
            <p className="mt-4 text-sm text-slate-500">— Riley</p>
          </div>
          <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5">
            <p className="text-slate-300">“The perfect blend of creativity and challenge.”</p>
            <p className="mt-4 text-sm text-slate-500">— Jordan</p>
          </div>
        </div>
      </section>
    </main>
  );
}
