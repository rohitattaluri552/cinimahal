"use client";

import { LoginForm } from "./LoginForm";

export default function LoginPage() {
  console.log("login form loaded...");
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <LoginForm />
    </div>
  );
}
