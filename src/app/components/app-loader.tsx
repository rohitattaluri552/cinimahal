"use client";

import { Film } from "lucide-react";

interface AppLoaderProps {
  message?: string;
  fullScreen?: boolean;
}

export default function AppLoader({
  message = "Loading...",
  fullScreen = true,
}: AppLoaderProps) {
  const containerClasses = fullScreen
    ? "fixed inset-0 z-50 flex items-center justify-center bg-white/90 backdrop-blur-sm"
    : "flex items-center justify-center py-12";

  return (
    <div className={containerClasses}>
      <div className="flex flex-col items-center gap-4">
        <div className="relative">
          <Film className="w-12 h-12 text-blue-600 animate-pulse" />
          <div className="absolute inset-0 animate-spin">
            <div className="w-12 h-12 border-4 border-blue-200 border-t-blue-600 rounded-full" />
          </div>
        </div>
        <p className="text-gray-600 font-medium animate-pulse">{message}</p>
      </div>
    </div>
  );
}
