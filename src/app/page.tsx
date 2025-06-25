// app/page.tsx
"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function HomePage() {
  const router = useRouter();
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    // Run only in the browser
    const user = localStorage.getItem("auth"); // or your auth key

    // Redirect after checking auth status
    if (user) {
      router.replace("/dashboard");
    } else {
      router.replace("/login");
    }
    // setChecking(false);
  }, [router]);

  // Avoid flashing the wrong page
  if (checking) {
    // Initially full-screen loader while checking
    return <div className="h-screen flex justify-center items-center">Loading...</div>;
  }

  return null; // Will never actually render
}
