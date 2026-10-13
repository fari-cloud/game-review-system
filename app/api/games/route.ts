import { getSessionUser } from '@/lib/auth';
import { NextResponse } from 'next/server';

export async function GET() {
  const games = await prisma.game.findMany({
    orderBy: { createdAt: 'desc' },
  });

  return NextResponse.json({ games });
}

export async function POST(req: Request) {
  const session = getSessionUser();

  if (!session || session.role !== 'admin') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const body = await req.json();

  const game = await prisma.game.create({
    data: {
      title: body.title,
      slug: body.slug || body.title.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      description: body.description,
      genre: body.genre,
      platform: body.platform,
      releaseYear: Number(body.releaseYear),
      rating: Number(body.rating || 0),
      imageUrl: body.imageUrl,
    },
  });

  return NextResponse.json({ game }, { status: 201 });
}
