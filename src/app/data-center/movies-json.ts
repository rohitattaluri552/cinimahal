import { Movie } from "../models/movie.model";

export const SAMPLE_MOVIES: Movie[] = [
  {
    id: "1",
    title: "The Grand Adventure",
    description:
      "An epic journey through mystical lands filled with wonder and danger.",
    rating: 8.5,
    posterUrl:
      "https://images.pexels.com/photos/436413/pexels-photo-436413.jpeg",
    genre: "Adventure",
    year: 2023,
    duration: "2h 15m",
    director: "James Cameron",
    cast: ["Chris Evans", "Scarlett Johansson", "Robert Downey Jr."],
    producers: ["Kevin Feige", "Victoria Alonso"],
    musicians: ["Hans Zimmer", "John Williams"],
  },
  {
    id: "2",
    title: "Digital Dreams",
    description:
      "A mind-bending sci-fi thriller exploring the boundaries of reality.",
    rating: 9.2,
    posterUrl:
      "https://images.pexels.com/photos/1587927/pexels-photo-1587927.jpeg",
    genre: "Sci-Fi",
    year: 2024,
    duration: "2h 35m",
    director: "Christopher Nolan",
    cast: ["Ryan Gosling", "Emma Stone", "Oscar Isaac"],
    producers: ["Emma Thomas", "Christopher Nolan"],
    musicians: ["Trent Reznor", "Atticus Ross"],
  },
  {
    id: "3",
    title: "Love in Paris",
    description: "A romantic comedy set in the beautiful streets of Paris.",
    rating: 7.8,
    posterUrl:
      "https://images.pexels.com/photos/2726111/pexels-photo-2726111.jpeg",
    genre: "Romance",
    year: 2023,
    duration: "1h 55m",
    director: "Nancy Meyers",
    cast: ["Ryan Reynolds", "Blake Lively", "Hugh Jackman"],
    producers: ["Reese Witherspoon", "Nancy Meyers"],
    musicians: ["Alexandre Desplat", "Thomas Newman"],
  },
  {
    id: "tt0068646",
    title: "The Godfather",
    description:
      "The aging patriarch of an organized crime dynasty transfers control of his clandestine empire to his reluctant son. A masterpiece of cinema that explores family, power, and the American Dream through the lens of the Corleone family.",
    rating: 9.2,
    posterUrl:
      "https://images.unsplash.com/photo-1440404653325-ab127d49abc1?w=400&h=600&fit=crop",
    genre: "Crime",
    year: 1972,
    duration: "2h 55m",
    director: "Francis Ford Coppola",
    cast: ["Marlon Brando", "Al Pacino", "James Caan", "Diane Keaton"],
    producers: ["Albert S. Ruddy"],
    musicians: ["Nino Rota"],
  },
];

export const SAMPLE_MOVIESS: Movie[] = [
  {
    id: "tt0111161",
    title: "The Shawshank Redemption",
    description:
      "Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency. This powerful drama explores themes of hope, friendship, and the human spirit's ability to endure even in the darkest circumstances.",
    rating: 9.3,
    posterUrl:
      "https://images.unsplash.com/photo-1489599735734-79b4fc8c4c8a?w=400&h=600&fit=crop",
    genre: "Drama",
    year: 1994,
    duration: "2h 22m",
    director: "Frank Darabont",
    cast: ["Tim Robbins", "Morgan Freeman", "Bob Gunton", "William Sadler"],
    producers: ["Niki Marvin"],
    musicians: ["Thomas Newman"],
  },

  {
    id: "tt0468569",
    title: "The Dark Knight",
    description:
      "When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests of his ability to fight injustice.",
    rating: 9.0,
    posterUrl:
      "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=600&fit=crop",
    genre: "Action",
    year: 2008,
    duration: "2h 32m",
    director: "Christopher Nolan",
    cast: ["Christian Bale", "Heath Ledger", "Aaron Eckhart", "Michael Caine"],
    producers: ["Emma Thomas", "Charles Roven", "Christopher Nolan"],
    musicians: ["Hans Zimmer", "James Newton Howard"],
  },
  {
    id: "tt0167260",
    title: "The Lord of the Rings: The Return of the King",
    description:
      "Gandalf and Aragorn lead the World of Men against Sauron's army to draw his gaze from Frodo and Sam as they approach Mount Doom with the One Ring.",
    rating: 8.9,
    posterUrl:
      "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=400&h=600&fit=crop",
    genre: "Fantasy",
    year: 2003,
    duration: "3h 21m",
    director: "Peter Jackson",
    cast: ["Elijah Wood", "Viggo Mortensen", "Ian McKellen", "Orlando Bloom"],
    producers: ["Peter Jackson", "Fran Walsh", "Philippa Boyens"],
    musicians: ["Howard Shore"],
  },
];
