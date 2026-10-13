import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function getGames() {
  return prisma.game.findMany({
    orderBy: { createdAt: 'desc' },
    include: { reviews: true },
  });
}

export async function getGameBySlug(slug: string) {
  return prisma.game.findUnique({
    where: { slug },
    include: { reviews: { include: { user: true } } },
  });
}
