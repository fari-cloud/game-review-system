import { getSessionUser } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { redirect } from 'next/navigation';
import { GameAdminForm } from '@/components/GameAdminForm';

export default async function AdminPage() {
  const session = getSessionUser();

  if (!session || session.role !== 'admin') {
    redirect('/login?next=/admin');
  }

  const games = await prisma.game.findMany({
    orderBy: { createdAt: 'desc' },
    include: { reviews: true },
  });

  return (
    <main className="min-h-screen bg-slate-50 px-6 py-10 text-slate-900 dark:bg-slate-950 dark:text-white">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8 flex items-center justify-between gap-4">
          <div>
            <p className="text-sm uppercase tracking-[0.2em] text-violet-600 dark:text-violet-300">Admin</p>
            <h1 className="mt-2 text-4xl font-black">Game dashboard</h1>
          </div>
          <a href="/" className="rounded-xl border border-slate-300 px-4 py-2 hover:border-slate-500 dark:border-slate-700 dark:hover:border-slate-500">
            Back to home
          </a>
        </div>

        <GameAdminForm />

        <section className="mt-10 rounded-2xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900">
          <h2 className="mb-5 text-2xl font-bold">Existing games</h2>
          <div className="space-y-4">
            {games.map((game) => (
              <div key={game.id} className="flex items-center justify-between rounded-xl border border-slate-200 p-4 dark:border-slate-700">
                <div>
                  <h3 className="font-semibold">{game.title}</h3>
                  <p className="text-sm text-slate-500 dark:text-slate-400">
                    {game.genre} • {game.platform} • {game.releaseYear}
                  </p>
                </div>
                <div className="text-right text-sm text-slate-500 dark:text-slate-400">
                  <div>{game.reviews.length} reviews</div>
                  <div>{game.rating.toFixed(1)} rating</div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
