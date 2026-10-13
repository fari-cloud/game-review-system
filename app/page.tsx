import { prisma } from '@/lib/prisma';
import { getSessionUser } from '@/lib/auth';
import { AuthStatus } from '@/components/AuthStatus';
import { ThemeToggle } from '@/components/ThemeToggle';

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
    <article className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg dark:border-slate-800 dark:bg-slate-900 dark:shadow-slate-950/40">
      <div className="h-48 w-full bg-slate-100 dark:bg-slate-800">
        {imageUrl ? (
          <img src={imageUrl} alt={title} className="h-full w-full object-cover" />
        ) : null}
      </div>
      <div className="space-y-3 p-5">
        <div className="flex items-center justify-between gap-3">
          <h2 className="text-xl font-semibold text-slate-900 dark:text-white">{title}</h2>
          <span className="rounded-full bg-violet-600 px-2.5 py-1 text-xs font-medium text-white">
            {rating.toFixed(1)}
          </span>
        </div>
        <p className="text-sm text-slate-600 dark:text-slate-300">{genre} • {platform}</p>
        <a
          href={`/games/${slug}`}
          className="inline-block rounded-lg border border-violet-500 px-3 py-2 text-sm font-medium text-violet-700 transition hover:bg-violet-50 dark:text-violet-100 dark:hover:bg-violet-500/10"
        >
          View game
        </a>
      </div>
    </article>
  );
}

export default async function HomePage({
  searchParams,
}: {
  searchParams?: { q?: string; genre?: string; platform?: string };
}) {
  const session = getSessionUser();
  const q = (searchParams?.q || '').trim();
  const genreFilter = searchParams?.genre || 'all';
  const platformFilter = searchParams?.platform || 'all';

  const games = await prisma.game.findMany({
    where: {
      ...(q
        ? {
            OR: [
              { title: { contains: q, mode: 'insensitive' } },
              { description: { contains: q, mode: 'insensitive' } },
            ],
          }
        : {}),
      ...(genreFilter !== 'all' ? { genre: { contains: genreFilter, mode: 'insensitive' } } : {}),
      ...(platformFilter !== 'all' ? { platform: { contains: platformFilter, mode: 'insensitive' } } : {}),
    },
    orderBy: { createdAt: 'desc' },
  });

  const uniqueGenres = Array.from(new Set(games.map((game) => game.genre))).sort();
  const uniquePlatforms = Array.from(new Set(games.map((game) => game.platform))).sort();

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900 transition-colors dark:bg-slate-950 dark:text-slate-100">
      <header className="border-b border-slate-200 bg-white/80 backdrop-blur-sm dark:border-slate-800 dark:bg-slate-950/80">
        <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
          <a href="/" className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
            GameReview
          </a>
          <div className="flex items-center gap-3 text-sm text-slate-700 dark:text-slate-300">
            <a href="#games" className="hover:text-violet-600 dark:hover:text-violet-300">
              Browse
            </a>
            <a href="#reviews" className="hover:text-violet-600 dark:hover:text-violet-300">
              Reviews
            </a>
            <ThemeToggle />
            <AuthStatus session={session} />
          </div>
        </nav>
      </header>

      <section className="mx-auto max-w-6xl px-6 py-16">
        <div className="grid items-center gap-10 lg:grid-cols-2">
          <div>
            <p className="mb-4 inline-flex rounded-full border border-violet-200 bg-violet-50 px-3 py-1 text-xs uppercase tracking-[0.2em] text-violet-700 dark:border-violet-500/40 dark:bg-violet-500/10 dark:text-violet-200">
              Built for gamers
            </p>
            <h1 className="text-4xl font-black tracking-tight text-slate-900 dark:text-white md:text-6xl">
              Review the games you love.
            </h1>
            <p className="mt-6 max-w-xl text-lg text-slate-600 dark:text-slate-300">
              Track, review, and discover games with a modern community-first platform built for players.
            </p>
            <div className="mt-8 flex gap-4">
              <a
                href="#games"
                className="rounded-xl bg-violet-600 px-5 py-3 font-semibold text-white hover:bg-violet-500"
              >
                Explore games
              </a>
              <a
                href="#reviews"
                className="rounded-xl border border-slate-300 px-5 py-3 font-semibold text-slate-800 hover:border-slate-400 dark:border-slate-700 dark:text-slate-100 dark:hover:border-slate-500"
              >
                Read reviews
              </a>
            </div>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-xl dark:border-slate-800 dark:bg-slate-900">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-slate-600 dark:text-slate-300">Top rated</span>
                <span className="rounded-full bg-emerald-500/10 px-2 py-1 text-xs font-medium text-emerald-700 dark:text-emerald-300">
                  +18% this week
                </span>
              </div>
              <div className="rounded-2xl bg-slate-100 p-5 dark:bg-slate-800">
                <p className="text-sm text-slate-500 dark:text-slate-400">Featured game</p>
                <h3 className="mt-2 text-2xl font-bold text-slate-900 dark:text-white">Elden Ring</h3>
                <p className="mt-3 text-slate-600 dark:text-slate-300">
                  A richly layered action RPG packed with discovery, responsibility, and challenge.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="games" className="mx-auto max-w-6xl px-6 pb-16">
        <div className="mb-8 flex flex-col gap-5 rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.2em] text-violet-600 dark:text-violet-300">Catalog</p>
            <h2 className="mt-2 text-3xl font-bold text-slate-900 dark:text-white">Popular games</h2>
          </div>

          <form method="get" className="grid gap-3 md:grid-cols-[1.5fr_1fr_1fr_auto]">
            <input
              name="q"
              defaultValue={q}
              placeholder="Search games..."
              className="rounded-xl border border-slate-300 bg-slate-50 px-3 py-2 text-slate-900 outline-none ring-0 placeholder:text-slate-400 focus:border-violet-500 dark:border-slate-700 dark:bg-slate-950 dark:text-white"
            />
            <select
              name="genre"
              defaultValue={genreFilter}
              className="rounded-xl border border-slate-300 bg-slate-50 px-3 py-2 text-slate-900 outline-none focus:border-violet-500 dark:border-slate-700 dark:bg-slate-950 dark:text-white"
            >
              <option value="all">All genres</option>
              {uniqueGenres.map((genre) => (
                <option key={genre} value={genre}>
                  {genre}
                </option>
              ))}
            </select>
            <select
              name="platform"
              defaultValue={platformFilter}
              className="rounded-xl border border-slate-300 bg-slate-50 px-3 py-2 text-slate-900 outline-none focus:border-violet-500 dark:border-slate-700 dark:bg-slate-950 dark:text-white"
            >
              <option value="all">All platforms</option>
              {uniquePlatforms.map((platform) => (
                <option key={platform} value={platform}>
                  {platform}
                </option>
              ))}
            </select>
            <button
              type="submit"
              className="rounded-xl bg-violet-600 px-4 py-2 font-semibold text-white hover:bg-violet-500"
            >
              Filter
            </button>
          </form>
        </div>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {games.length > 0 ? (
            games.map((game) => (
              <GameCard
                key={game.id}
                title={game.title}
                slug={game.slug}
                genre={game.genre}
                platform={game.platform}
                rating={game.rating}
                imageUrl={game.imageUrl}
              />
            ))
          ) : (
            <div className="col-span-full rounded-2xl border border-dashed border-slate-300 bg-white p-8 text-center text-slate-600 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300">
              No games match your current filters. Try a broader search.
            </div>
          )}
        </div>
      </section>

      <section id="reviews" className="mx-auto max-w-6xl px-6 pb-20">
        <h2 className="text-3xl font-bold text-slate-900 dark:text-white">What players are saying</h2>
        <div className="mt-8 grid gap-5 md:grid-cols-3">
          <div className="rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900">
            <p className="text-slate-700 dark:text-slate-300">“A masterpiece of worldbuilding and atmosphere.”</p>
            <p className="mt-4 text-sm text-slate-500 dark:text-slate-400">— Alice Gamer</p>
          </div>
          <div className="rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900">
            <p className="text-slate-700 dark:text-slate-300">“The kind of game that rewards curiosity and persistence.”</p>
            <p className="mt-4 text-sm text-slate-500 dark:text-slate-400">— Riley</p>
          </div>
          <div className="rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900">
            <p className="text-slate-700 dark:text-slate-300">“The perfect blend of creativity and challenge.”</p>
            <p className="mt-4 text-sm text-slate-500 dark:text-slate-400">— Jordan</p>
          </div>
        </div>
      </section>
    </main>
  );
}

























































































































































































cap
