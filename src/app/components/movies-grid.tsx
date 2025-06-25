"use client";

import { useState } from "react";
import { Movie } from "../models/movie.model";
import MovieCard from "./movie-card";
import MovieDetailView from "./movie-detail-view";
import { useRouter } from "next/navigation";
import { Plus } from "lucide-react";

type MoviesGridProps = {
  movies: Movie[];
  title?: string;
};

export default function MoviesGrid({
  movies,
  title = "Featured Movies",
}: MoviesGridProps) {
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  const [isDetailViewOpen, setIsDetailViewOpen] = useState(false);
  const router = useRouter();

  const handleAddToCart = (movie: Movie) => {
    console.log("Adding movie to cart:", movie);
    try {
      const existingCartItems = localStorage.getItem("cartItems");
      let cartItems: Movie[] = [];

      if (existingCartItems) {
        cartItems = JSON.parse(existingCartItems);
      }

      // Check if movie is already in cart
      const isAlreadyInCart = cartItems.some((item) => item.id === movie.id);

      if (!isAlreadyInCart) {
        cartItems.push(movie);
        localStorage.setItem("cartItems", JSON.stringify(cartItems));

        // Trigger cart update event
        window.dispatchEvent(new Event("cartUpdated"));

        // Show success feedback
        alert(`"${movie.title}" has been added to your cart!`);
      } else {
        alert(`"${movie.title}" is already in your cart!`);
      }
    } catch (error) {
      console.error("Error adding to cart:", error);
      alert("Failed to add movie to cart. Please try again.");
    }
  };

  const handleViewDetails = (movie: Movie) => {
    setSelectedMovie(movie);
    setIsDetailViewOpen(true);
  };

  const handleCloseDetailView = () => {
    setIsDetailViewOpen(false);
    // Small delay to allow animation to complete before clearing selected movie
    setTimeout(() => setSelectedMovie(null), 300);
  };

  return (
    <>
      <div className="p-6 bg-gray-50 min-h-screen">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-row justify-between items-center mb-8 ">
            <h2 className="text-3xl font-bold text-gray-900">{title}</h2>

            <button
              onClick={() => router.push("/add-movie")}
              className="flex flex-row space-x-1.5 items-center bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors duration-200 cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
            >
              <Plus className="font-semibold text-white text-lg" />
              <span>Add Movie</span>
            </button>
          </div>

          {movies.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16">
              <div className="text-gray-400 mb-4">
                <svg
                  className="w-16 h-16 mx-auto"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1}
                    d="M7 4V2a1 1 0 011-1h8a1 1 0 011 1v2h4a1 1 0 110 2h-1v12a2 2 0 01-2 2H6a2 2 0 01-2-2V6H3a1 1 0 110-2h4zM9 6v10h6V6H9z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-600 mb-2">
                No movies available
              </h3>
              <p className="text-gray-500">
                Check back later for new releases!
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {movies.map((movie) => (
                <MovieCard
                  key={movie.id}
                  movie={movie}
                  onAddToCart={handleAddToCart}
                  onViewDetails={handleViewDetails}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Movie Detail View Modal */}
      <MovieDetailView
        movie={selectedMovie}
        isOpen={isDetailViewOpen}
        onClose={handleCloseDetailView}
        onAddToCart={handleAddToCart}
      />
    </>
  );
}
