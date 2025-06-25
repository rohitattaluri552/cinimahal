"use client";

import { Film } from "lucide-react";
import Link from "next/link";
import { CartIcon } from "./cart-icon";
import Logout from "./logout";

export default function DashboardNavbar() {
  return (
    <nav className="sticky top-0 z-50 bg-blue-400 text-white flex items-center justify-between px-4 py-2 shadow">
      {/* Hamburger and title */}
      <Link href="/" className="flex space-x-2 items-center">
        <Film className="h-6.5 w-6.5 text-white" />
        <span className="text-2xl font-semibold">Cinimahal</span>
      </Link>

      <div className="flex items-center space-x-4">
        <CartIcon />
        <Logout />
      </div>
    </nav>
  );
}
