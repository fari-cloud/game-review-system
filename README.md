# Game Review System

A clean rebuild of the game review platform using Next.js, TypeScript, Prisma, and PostgreSQL.

## Features

- Browse the latest games
- Search and filter by score, genre, and platform
- View detailed game pages and reviews
- Add a review for a game
- Manage game metadata in the database

## Tech stack

- Next.js 14
- TypeScript
- Tailwind CSS
- Prisma ORM
- PostgreSQL

## Getting started

1. Install dependencies:
   ```bash
   npm install
   ```

2. Copy the environment template:
   ```bash
   cp .env.example .env
   ```

3. Update the database URL in `.env`.

4. Generate Prisma client:
   ```bash
   npx prisma generate
   ```

5. Push the Prisma schema to the database:
   ```bash
   npx prisma db push
   ```

6. Seed sample data:
   ```bash
   npm run db:seed
   ```

7. Run the development server:
   ```bash
   npm run dev
   ```

Open http://localhost:3000.
