"use client";

import { StarIcon as StarOutlineIcon } from "@heroicons/react/24/outline";
import { StarIcon } from "@heroicons/react/24/solid";
import { useState } from "react";
import { Movie } from "../models/movie.model";

type MovieCardProps = {
  movie: Movie;
  onAddToCart?: (movie: Movie) => void;
  onViewDetails?: (movie: Movie) => void;
};

export default function MovieCard({
  movie,
  onAddToCart,
  onViewDetails,
}: MovieCardProps) {
  const [imageLoaded, setImageLoaded] = useState(false);

  // Generate star rating display
  const renderStars = (rating: number) => {
    const fullStars = Math.floor(rating / 2);
    const hasHalfStar = rating % 2 >= 1;
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

    return (
      <div className="flex items-center gap-1">
        {/* Full stars */}
        {Array.from({ length: fullStars }).map((_, i) => (
          <StarIcon key={`full-${i}`} className="h-4 w-4 text-yellow-400" />
        ))}
        {/* Half star */}
        {hasHalfStar && (
          <div className="relative">
            <StarOutlineIcon className="h-4 w-4 text-yellow-400" />
            <div className="absolute inset-0 overflow-hidden w-1/2">
              <StarIcon className="h-4 w-4 text-yellow-400" />
            </div>
          </div>
        )}
        {/* Empty stars */}
        {Array.from({ length: emptyStars }).map((_, i) => (
          <StarOutlineIcon
            key={`empty-${i}`}
            className="h-4 w-4 text-gray-300"
          />
        ))}
        <span className="text-sm text-gray-600 ml-1">
          ({rating.toFixed(1)})
        </span>
      </div>
    );
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onAddToCart) {
      onAddToCart(movie);
    }
  };

  const handleCardClick = () => {
    if (onViewDetails) {
      console.log("Card clicked:", movie.title);
      onViewDetails(movie);
    }
  };

  return (
    <div
      onClick={handleCardClick}
      className={`bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200 transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-xl hover:border-blue-400 ${
        onViewDetails ? "cursor-pointer" : ""
      } group`}
    >
      {/* Poster Image */}
      <div className="relative overflow-hidden bg-gray-100">
        <img
          src={movie.posterUrl}
          alt={`${movie.title} poster`}
          className={`w-full h-64 object-cover transition-all duration-500 group-hover:scale-110 ${
            imageLoaded ? "opacity-100" : "opacity-0"
          }`}
          onLoad={() => setImageLoaded(true)}
        />

        {/* Genre Badge */}
        <div className="absolute top-3 left-3">
          <span className="bg-blue-600 text-white text-xs font-semibold px-2 py-1 rounded-full shadow-lg">
            {movie.genre}
          </span>
        </div>

        {/* Year Badge */}
        <div className="absolute top-3 right-3">
          <span className="bg-gray-800 bg-opacity-75 text-white text-xs font-semibold px-2 py-1 rounded-full">
            {movie.year}
          </span>
        </div>
      </div>

      {/* Card Content */}
      <div className="p-5 space-y-3">
        {/* Title and Duration */}
        <div className="space-y-1">
          <h3 className="text-xl font-bold text-gray-900 line-clamp-2 group-hover:text-blue-600 transition-colors">
            {movie.title}
          </h3>
          <p className="text-sm text-gray-500 font-medium">{movie.duration}</p>
        </div>

        {/* Rating */}
        <div className="flex items-center justify-between">
          {renderStars(movie.rating)}
        </div>

        {/* Description */}
        <p className="text-gray-700 text-sm text-ellipsis leading-relaxed line-clamp-3">
          {movie.description}
        </p>

        {/* Action Buttons */}
        <div className="flex gap-2 pt-3 border-t border-gray-100">
          {onAddToCart && (
            <button
              onClick={handleAddToCart}
              className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors duration-200 cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
            >
              Add to Cart
            </button>
          )}
          {onViewDetails && (
            <button
              onClick={handleCardClick}
              className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-800 font-semibold py-2 px-4 rounded-lg transition-colors duration-200 cursor-pointer focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50"
            >
              View Details
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
