import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
  const games = await prisma.game.findMany({
    orderBy: { createdAt: 'desc' },
  });

  return NextResponse.json({ games });
}

export async function POST(req: Request) {
  const body = await req.json();

  const game = await prisma.game.create({
    data: {
      title: body.title,
      slug: body.slug,
      description: body.description,
      genre: body.genre,
      platform: body.platform,
      releaseYear: Number(body.releaseYear),
      rating: Number(body.rating || 0),
      imageUrl: body.imageUrl,
    },
  });

  return NextResponse.json({ game });
}
