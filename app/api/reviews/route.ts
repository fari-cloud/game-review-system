import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
  const reviews = await prisma.review.findMany({
    include: { user: true, game: true },
    orderBy: { createdAt: 'desc' },
  });

  return NextResponse.json({ reviews });
}

export async function POST(req: Request) {
  const body = await req.json();

  const review = await prisma.review.create({
    data: {
      content: body.content,
      rating: Number(body.rating),
      user: {
        connectOrCreate: {
          where: { email: body.email || 'guest@example.com' },
          create: {
            email: body.email || 'guest@example.com',
            name: body.name || 'Guest User',
          },
        },
      },
      game: {
        connect: {
          id: body.gameId,
        },
      },
    },
  });

  return NextResponse.json({ review });
}
