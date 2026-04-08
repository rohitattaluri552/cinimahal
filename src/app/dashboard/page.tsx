"use client";

import { useState, useEffect } from "react";
import DashboardNavbar from "../components/dashboard-navbar";
import MoviesGrid from "../components/movies-grid";
import { SAMPLE_MOVIES } from "../data-center/movies-json";
import { Movie } from "../models/movie.model";
import AppLoader from "../components/app-loader";

export default function DashboardPage() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadMovies = () => {
      const storedMovies = localStorage.getItem("cinimahal_movies");
      if (storedMovies) {
        setMovies(JSON.parse(storedMovies));
      } else {
        localStorage.setItem("cinimahal_movies", JSON.stringify(SAMPLE_MOVIES));
        setMovies(SAMPLE_MOVIES);
      }
      setIsLoading(false);
    };

    loadMovies();
  }, []);

  if (isLoading) {
    return (
      <div>
        <DashboardNavbar />
        <AppLoader message="Loading movies..." fullScreen={false} />
      </div>
    );
  }

  return (
    <div>
      <DashboardNavbar />
      <MoviesGrid movies={movies} title="Featured Movies" />
    </div>
  );
}
