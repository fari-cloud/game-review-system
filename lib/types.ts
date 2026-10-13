export type GameSummary = {
  id: string;
  title: string;
  slug: string;
  description: string;
  genre: string;
  platform: string;
  releaseYear: number;
  rating: number;
  imageUrl?: string | null;
};
