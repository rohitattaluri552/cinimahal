"use client";

import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { LoginFormData } from "./login-types";

export function LoginForm() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({ mode: "onBlur" });

  const onSubmit = async (data: LoginFormData) => {
    localStorage.setItem(
      "cinimahal_user",
      JSON.stringify({
        email: data.email,
        isLoggedIn: true,
      })
    );

    setTimeout(() => {
      // Navigate to dashboard
      router.replace("/dashboard");
    }, 1200);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      className="w-full max-w-md mx-auto space-y-6 bg-white p-8 rounded-xl shadow-lg border border-gray-100"
    >
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Welcome Back</h2>
        <p className="text-gray-600 mt-2">Please sign in to your account</p>
      </div>

      {/* Email */}
      <div className="space-y-2">
        <label
          htmlFor="email"
          className="block text-sm font-semibold text-gray-700"
        >
          Email Address
        </label>
        <input
          id="email"
          type="email"
          className={`w-full min-w-[250px] px-4 py-3 
            border-2 rounded-lg 
            bg-gray-50 
            text-gray-800 
            placeholder-gray-400
            transition-all duration-200 ease-in-out
            focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50
            hover:bg-gray-100
            ${
              errors.email
                ? "border-red-400 focus:border-red-500 bg-red-50"
                : "border-blue-300 focus:border-blue-500 hover:border-blue-400"
            }
          `}
          placeholder="Enter your email"
          {...register("email", {
            required: "Email is required",
            pattern: {
              value: /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/,
              message: "Invalid email",
            },
          })}
        />
        {errors.email && (
          <p
            role="alert"
            className="text-red-500 text-sm font-medium flex items-center gap-1"
          >
            {errors.email.message}
          </p>
        )}
      </div>

      {/* Password */}
      <div className="space-y-2">
        <label
          htmlFor="password"
          className="block text-sm font-semibold text-gray-700"
        >
          Password
        </label>
        <input
          id="password"
          type="password"
          className={`w-full min-w-[250px] px-4 py-3 
            border-2 rounded-lg 
            bg-gray-50 
            text-gray-800 
            placeholder-gray-400
            transition-all duration-200 ease-in-out
            focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50
            hover:bg-gray-100
            ${
              errors.password
                ? "border-red-400 focus:border-red-500 bg-red-50"
                : "border-blue-300 focus:border-blue-500 hover:border-blue-400"
            }
          `}
          placeholder="Enter your password"
          {...register("password", {
            required: "Password is required",
            minLength: { value: 6, message: "Min 6 characters" },
          })}
        />
        {errors.password && (
          <p
            role="alert"
            className="text-red-500 text-sm font-medium flex items-center gap-1"
          >
            {errors.password.message}
          </p>
        )}
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className={`w-full min-w-[250px] py-3 px-4 
          rounded-lg font-semibold text-white 
          transition-all duration-200 ease-in-out
          focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50
          cursor-pointer
          ${
            isSubmitting
              ? "bg-blue-600 hover:bg-blue-700 active:bg-blue-800 hover:shadow-lg transform hover:-translate-y-0.5 cursor-pointer"
              : "bg-blue-600 hover:bg-blue-700 active:bg-blue-800 hover:shadow-lg transform hover:-translate-y-0.5"
          }
        `}
      >
        {isSubmitting ? (
          <span className="flex items-center justify-center gap-2">
            <svg
              className="animate-spin h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
            Logging in…
          </span>
        ) : (
          "Sign In"
        )}
      </button>
    </form>
  );
}
