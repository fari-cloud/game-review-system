import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const alice = await prisma.user.upsert({
    where: { email: 'alice@example.com' },
    update: {},
    create: {
      email: 'alice@example.com',
      name: 'Alice Gamer',
      avatarUrl: 'https://images.unsplash.com/...',
    },
  });

  const games = [
    {
      title: 'Elden Ring',
      slug: 'elden-ring',
      description: 'A dark fantasy action RPG that rewards curiosity and mastery.',
      genre: 'Action RPG',
      platform: 'PC',
      releaseYear: 2022,
      rating: 4.8,
      imageUrl: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=1200&q=80',
    },
    {
      title: 'Hades',
      slug: 'hades',
      description: 'A stylish roguelike where each attempt teaches you something new.',
      genre: 'Roguelike',
      platform: 'PC',
      releaseYear: 2020,
      rating: 4.9,
      imageUrl: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=1200&q=80',
    },
    {
      title: 'Stardew Valley',
      slug: 'stardew-valley',
      description: 'A charming farming and life sim where each day matters.',
      genre: 'Simulation',
      platform: 'Switch',
      releaseYear: 2016,
      rating: 4.7,
      imageUrl: 'https://images.unsplash.com/photo-1511884642898-4c92249e20b6?auto=format&fit=crop&w=1200&q=80',
    },
  ];

  for (const game of games) {
    await prisma.game.upsert({
      where: { slug: game.slug },
      update: {},
      create: game,
    });
  }

  const game = await prisma.game.findUnique({ where: { slug: 'elden-ring' } });

  if (game) {
    await prisma.review.upsert({
      where: {
        id: 'seed-review-elden-ring',
      },
      update: {},
      create: {
        id: 'seed-review-elden-ring',
        content: 'A beautifully crafted fantasy world with excellent combat and exploration.',
        rating: 5,
        userId: alice.id,
        gameId: game.id,
      },
    });
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
