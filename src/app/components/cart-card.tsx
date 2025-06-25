// components/Cart.tsx
"use client";

import { Trash } from "lucide-react";
import { useState } from "react";
import Skeleton from "react-loading-skeleton";
import { Movie } from "../models/movie.model";

type CartProps = {
  movies: Movie[];
  onCartUpdate?: () => void; // Callback to notify parent of cart changes
};

export default function CartCard({ movies, onCartUpdate }: CartProps) {
  const [imgLoaded] = useState(false);
  const [cartMovies, setCartMovies] = useState<Movie[]>(movies);

  const handleDeleteFromCart = (movieId: string) => {
    // Remove from local state
    const updatedMovies = cartMovies.filter((movie) => movie.id !== movieId);
    setCartMovies(updatedMovies);

    // Update localStorage
    try {
      const existingCartItems = localStorage.getItem("cartItems");
      if (existingCartItems) {
        const cartItems = JSON.parse(existingCartItems);
        const updatedCartItems = cartItems.filter(
          (item: Movie) => item.id !== movieId
        );
        localStorage.setItem("cartItems", JSON.stringify(updatedCartItems));
      }
    } catch (error) {
      console.error("Error updating cart in localStorage:", error);
    }

    // Notify parent component of cart update
    if (onCartUpdate) {
      onCartUpdate();
    }
  };

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <h2 className="text-2xl text-gray-900 font-semibold mb-6">Your Cart</h2>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {cartMovies.map((movie) => (
          <div
            key={movie.id}
            className="bg-white rounded-lg shadow-lg overflow-hidden border-2 border-gray-300 hover:border-blue-500 transition-colors relative group"
          >
            {/* Delete Button */}
            <button
              onClick={() => handleDeleteFromCart(movie.id)}
              className="absolute top-3 right-3 z-10 p-2 bg-red-500 hover:bg-red-600 text-white rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-all duration-200 ease-in-out transform hover:scale-110 cursor-pointer"
              aria-label={`Remove ${movie.title} from cart`}
              title="Remove from cart"
            >
              <Trash className="h-4 w-4" />
            </button>

            <div className="overflow-hidden">
              {!imgLoaded && <Skeleton height={256} />}
              <img
                src={movie.posterUrl}
                alt={movie.title}
                className="w-full h-64 object-cover transform transition-transform duration-500 ease-in-out hover:scale-105"
              />
            </div>
            <div className="p-4">
              {movie.title ? (
                <>
                  <h3 className="text-xl text-gray-800 font-bold">
                    {movie.title} ({movie.year})
                  </h3>
                  <p className="text-sm text-gray-600 mb-2">
                    ⭐ {movie.rating.toFixed(1)}
                  </p>
                  <p className="text-gray-700 text-sm line-clamp-3">
                    {movie.description}
                  </p>
                </>
              ) : (
                <Skeleton height={256} width="60%" />
              )}
            </div>
          </div>
        ))}
      </div>

      {cartMovies.length === 0 && (
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
                d="M16 11V7a4 4 0 00-8 0v4M5 9h14l-1 12H6L5 9z"
              />
            </svg>
          </div>
          <h3 className="text-xl font-semibold text-gray-600 mb-2">
            Your cart is empty
          </h3>
          <p className="text-gray-500">Add some movies to get started!</p>
        </div>
      )}
    </div>
  );
}
