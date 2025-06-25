export interface Movie {
  id: string;
  title: string;
  description: string;
  rating: number;
  posterUrl: string;
  genre: string;
  year: number;
  duration: string;
  director: string;
  cast: string[];
  producers: string[];
  musicians: string[];
}
