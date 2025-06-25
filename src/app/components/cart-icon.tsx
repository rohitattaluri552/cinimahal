"use client";

import { ShoppingCart } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export function CartIcon() {
  const router = useRouter();
  const [cartCount, setCartCount] = useState(0);

  const updateCartCount = () => {
    try {
      const cartItems = localStorage.getItem("cartItems");
      setCartCount(cartItems ? JSON.parse(cartItems).length : 0);
    } catch (error) {
      console.error("Error reading cart items:", error);
      setCartCount(0);
    }
  };

  useEffect(() => {
    // Initial load
    updateCartCount();

    // Listen for cart updates
    const handleCartUpdate = () => {
      updateCartCount();
    };

    window.addEventListener("cartUpdated", handleCartUpdate);

    // Cleanup
    return () => {
      window.removeEventListener("cartUpdated", handleCartUpdate);
    };
  }, []);

  return (
    <button
      className="relative cursor-pointer"
      onClick={() => router.push("/cart")}
      aria-label="Go to cart"
    >
      <ShoppingCart className="h-6 w-6" />
      {cartCount > 0 && (
        <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
          {cartCount}
        </span>
      )}
    </button>
  );
}
