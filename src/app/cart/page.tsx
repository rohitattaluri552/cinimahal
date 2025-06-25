"use client";

import { useEffect, useState } from "react";
import CartCard from "../components/cart-card";
import DashboardNavbar from "../components/dashboard-navbar";
import { Movie } from "../models/movie.model";

export default function CartPage() {
  const [cartMovies, setCartMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);

  const loadCartItems = () => {
    try {
      const cartItems = localStorage.getItem("cartItems");
      if (cartItems) {
        const parsedItems = JSON.parse(cartItems);
        setCartMovies(parsedItems);
      } else {
        // Fallback to sample data if no cart items exist
        const sampleMovies = [
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
          // ... more sample movies if needed
        ];
        setCartMovies(sampleMovies);
        localStorage.setItem("cartItems", JSON.stringify(sampleMovies));
      }
    } catch (error) {
      console.error("Error loading cart items:", error);
      setCartMovies([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCartItems();
  }, []);

  const handleCartUpdate = () => {
    // Trigger a custom event to update cart icon count
    window.dispatchEvent(new Event("cartUpdated"));
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
        <p className="mt-4 text-gray-600">Loading your cart...</p>
      </div>
    );
  }

  return (
    <div>
      <DashboardNavbar />
      <CartCard movies={cartMovies} onCartUpdate={handleCartUpdate} />
    </div>
  );
}
