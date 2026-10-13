import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(req: Request) {
  const body = await req.json();

  if (!body.content || !body.gameId || !body.name || !body.email) {
    return NextResponse.json({ error: 'Missing required fields.' }, { status: 400 });
  }

  const user = await prisma.user.upsert({
    where: { email: body.email },
    update: { name: body.name },
    create: {
      email: body.email,
      name: body.name,
    },
  });

  const review = await prisma.review.create({
    data: {
      content: body.content,
      rating: Number(body.rating || 5),
      userId: user.id,
      gameId: body.gameId,
    },
  });

  return NextResponse.json({ review }, { status: 201 });
}
