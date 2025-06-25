"use client";

import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

export default function MovieForm() {
  const router = useRouter();
  return (
    <>
      <div className="p-6 bg-gray-50 min-h-screen">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-row justify-between items-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900">{"Add movie"}</h2>

            <button
              className="flex space-x-2 justify-between items-center text-gray-800"
              onClick={() => router.push("/dashboard")}
            >
              <ArrowLeft className="w-4 h-4" />
              <span className="flex-1 text-lg">Go back</span>
            </button>
          </div>
        </div>
        <form
          action=""
          noValidate
          className="w-full max-w-7xl mx-auto space-y-6 bg-white p-8 rounded-xl shadow-lg border border-gray-100"
        ></form>
      </div>
    </>
  );
}
