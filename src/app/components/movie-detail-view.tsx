"use client";

import { StarIcon as StarOutlineIcon } from "@heroicons/react/24/outline";
import { StarIcon } from "@heroicons/react/24/solid";
import { Play, Plus, X } from "lucide-react";
import { useEffect, useState } from "react";
import { Movie } from "../models/movie.model";

type MovieDetailViewProps = {
  movie: Movie | null;
  isOpen: boolean;
  onClose: () => void;
  onAddToCart?: (movie: Movie) => void;
};

export default function MovieDetailView({
  movie,
  isOpen,
  onClose,
  onAddToCart,
}: MovieDetailViewProps) {
  const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      setImageLoaded(false);
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  // Generate star rating display
  const renderStars = (rating: number) => {
    const fullStars = Math.floor(rating / 2);
    const hasHalfStar = rating % 2 >= 1;
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

    return (
      <div className="flex items-center gap-1">
        {Array.from({ length: fullStars }).map((_, i) => (
          <StarIcon key={`full-${i}`} className="h-5 w-5 text-yellow-400" />
        ))}
        {hasHalfStar && (
          <div className="relative">
            <StarOutlineIcon className="h-5 w-5 text-yellow-400" />
            <div className="absolute inset-0 overflow-hidden w-1/2">
              <StarIcon className="h-5 w-5 text-yellow-400" />
            </div>
          </div>
        )}
        {Array.from({ length: emptyStars }).map((_, i) => (
          <StarOutlineIcon
            key={`empty-${i}`}
            className="h-5 w-5 text-gray-300"
          />
        ))}
        <span className="text-lg text-gray-700 ml-2 font-medium">
          {rating.toFixed(1)}/10
        </span>
      </div>
    );
  };

  const handleAddToCart = () => {
    if (movie && onAddToCart) {
      onAddToCart(movie);
    }
  };

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  if (!movie) return null;

  return (
    <div
      className={`fixed inset-0 z-50 transition-all duration-300 ease-in-out ${
        isOpen ? "opacity-100 visible" : "opacity-0 invisible"
      }`}
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black bg-opacity-75 backdrop-blur-sm"
        onClick={handleBackdropClick}
      />

      {/* Modal Content */}
      <div className="relative h-full overflow-y-auto">
        <div
          className={`min-h-full flex items-center justify-center p-4 transition-all duration-300 ease-in-out transform ${
            isOpen ? "scale-100 translate-y-0" : "scale-95 translate-y-4"
          }`}
        >
          <div className="bg-white rounded-2xl shadow-2xl max-w-6xl w-full max-h-[90vh] overflow-hidden">
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 z-10 p-2 bg-black bg-opacity-50 hover:bg-opacity-70 text-white rounded-full transition-all duration-200 cursor-pointer"
              aria-label="Close movie details"
            >
              <X className="h-6 w-6" />
            </button>

            <div className="flex flex-col lg:flex-row">
              {/* Poster Section */}
              <div className="lg:w-2/5 relative">
                <div className="aspect-[3/4] lg:h-[600px] relative overflow-hidden bg-gray-100">
                  <img
                    src={movie.posterUrl}
                    alt={`${movie.title} poster`}
                    className={`w-full h-full object-cover transition-opacity duration-500 ${
                      imageLoaded ? "opacity-100" : "opacity-0"
                    }`}
                    onLoad={() => setImageLoaded(true)}
                  />

                  {/* Genre Badge */}
                  <div className="absolute top-4 left-4">
                    <span className="bg-blue-600 text-white text-sm font-semibold px-3 py-1 rounded-full shadow-lg">
                      {movie.genre}
                    </span>
                  </div>
                </div>
              </div>

              {/* Content Section */}
              <div className="lg:w-3/5 p-6 lg:p-8 overflow-y-auto">
                <div className="space-y-6">
                  {/* Title and Year */}
                  <div>
                    <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-2">
                      {movie.title}
                    </h1>
                    <div className="flex items-center gap-4 text-gray-600">
                      <span className="text-lg font-medium">{movie.year}</span>
                      <span className="text-lg">{movie.duration}</span>
                    </div>
                  </div>

                  {/* Rating */}
                  <div className="flex items-center gap-4">
                    {renderStars(movie.rating)}
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-3">
                    <button className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200 cursor-pointer">
                      <Play className="h-5 w-5" />
                      Watch Trailer
                    </button>
                    {onAddToCart && (
                      <button
                        onClick={handleAddToCart}
                        className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200 cursor-pointer"
                      >
                        <Plus className="h-5 w-5" />
                        Add to Cart
                      </button>
                    )}
                  </div>

                  {/* Description */}
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-3">
                      Synopsis
                    </h3>
                    <p className="text-gray-700 leading-relaxed text-base">
                      {movie.description}
                    </p>
                  </div>

                  {/* Movie Details Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Director */}
                    <div>
                      <h4 className="text-lg font-semibold text-gray-900 mb-2">
                        Director
                      </h4>
                      <p className="text-gray-700">{movie.director}</p>
                    </div>

                    {/* Cast */}
                    <div>
                      <h4 className="text-lg font-semibold text-gray-900 mb-2">
                        Cast
                      </h4>
                      <div className="space-y-1">
                        {movie.cast.map((actor, index) => (
                          <p key={index} className="text-gray-700">
                            {actor}
                          </p>
                        ))}
                      </div>
                    </div>

                    {/* Producers */}
                    <div>
                      <h4 className="text-lg font-semibold text-gray-900 mb-2">
                        Producers
                      </h4>
                      <div className="space-y-1">
                        {movie.producers.map((producer, index) => (
                          <p key={index} className="text-gray-700">
                            {producer}
                          </p>
                        ))}
                      </div>
                    </div>

                    {/* Music */}
                    <div>
                      <h4 className="text-lg font-semibold text-gray-900 mb-2">
                        Music
                      </h4>
                      <div className="space-y-1">
                        {movie.musicians.map((musician, index) => (
                          <p key={index} className="text-gray-700">
                            {musician}
                          </p>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Additional Info */}
                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
                      <div>
                        <span className="font-semibold text-gray-800">
                          Release Year:
                        </span>
                        <p className="text-gray-600">{movie.year}</p>
                      </div>
                      <div>
                        <span className="font-semibold text-gray-800">
                          Genre:
                        </span>
                        <p className="text-gray-600">{movie.genre}</p>
                      </div>
                      <div>
                        <span className="font-semibold text-gray-800">
                          Duration:
                        </span>
                        <p className="text-gray-600">{movie.duration}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
