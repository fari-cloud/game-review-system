import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Game Review System',
  description: 'A modern game review platform built from the ground up.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
