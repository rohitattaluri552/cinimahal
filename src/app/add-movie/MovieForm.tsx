/* eslint-disable @next/next/no-img-element */
"use client";

import { ArrowLeft, Upload } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState, useRef } from "react";

interface FormData {
  title: string;
  description: string;
  genre: string;
  rating: string;
  duration: string;
}

interface FormErrors {
  title?: string;
  description?: string;
  genre?: string;
  rating?: string;
  duration?: string;
  image?: string;
}

export default function MovieForm() {
  const router = useRouter();
  const [thumbnail, setThumbnail] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [formData, setFormData] = useState<FormData>({
    title: "",
    description: "",
    genre: "",
    rating: "",
    duration: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});

  const handleThumbnailClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setThumbnail(reader.result as string);
        setErrors((prev) => ({ ...prev, image: undefined }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: undefined }));
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.title.trim()) {
      newErrors.title = "Movie title is required";
    }
    if (!formData.description.trim()) {
      newErrors.description = "Movie description is required";
    }
    if (!formData.genre.trim()) {
      newErrors.genre = "Movie genre is required";
    }
    if (!formData.rating) {
      newErrors.rating = "Movie rating is required";
    } else if (parseFloat(formData.rating) < 0 || parseFloat(formData.rating) > 10) {
      newErrors.rating = "Rating must be between 0 and 10";
    }
    if (!formData.duration) {
      newErrors.duration = "Movie duration is required";
    } else if (parseInt(formData.duration) <= 0) {
      newErrors.duration = "Duration must be greater than 0";
    }
    if (!thumbnail) {
      newErrors.image = "Movie thumbnail is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const formatDuration = (minutes: string): string => {
    const mins = parseInt(minutes, 10);
    const hours = Math.floor(mins / 60);
    const remainingMinutes = mins % 60;
    if (hours === 0) return `${remainingMinutes}m`;
    if (remainingMinutes === 0) return `${hours}h`;
    return `${hours}h ${remainingMinutes}m`;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (validateForm()) {
      const dataToLog = {
        ...formData,
        duration: formatDuration(formData.duration),
        imageUrl: thumbnail,
      };
      console.log("Form Data:", dataToLog);
    }
  };
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
          onSubmit={handleSubmit}
          noValidate
          className="w-full max-w-7xl mx-auto space-y-6 bg-white p-8 rounded-xl shadow-lg border border-gray-100"
        >
          <div className="space-y-4">
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
                Movie Title
              </label>
              <input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors ${
                  errors.title
                    ? "border-red-500 focus:ring-red-500 focus:border-red-500"
                    : "border-gray-300"
                }`}
                placeholder="Enter movie title"
              />
              {errors.title && <p className="mt-1 text-sm text-red-600">{errors.title}</p>}
            </div>
            {/* Movie description */}
            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
                Movie Description
              </label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors ${
                  errors.description
                    ? "border-red-500 focus:ring-red-500 focus:border-red-500"
                    : "border-gray-300"
                }`}
                placeholder="Enter movie description"
                rows={4}
              />
              {errors.description && (
                <p className="mt-1 text-sm text-red-600">{errors.description}</p>
              )}
            </div>
            {/* Movie genre */}
            <div>
              <label htmlFor="genre" className="block text-sm font-medium text-gray-700 mb-2">
                Movie Genre
              </label>
              <input
                type="text"
                id="genre"
                name="genre"
                value={formData.genre}
                onChange={handleInputChange}
                className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors ${
                  errors.genre
                    ? "border-red-500 focus:ring-red-500 focus:border-red-500"
                    : "border-gray-300"
                }`}
                placeholder="Enter movie genre"
              />
              {errors.genre && <p className="mt-1 text-sm text-red-600">{errors.genre}</p>}
            </div>
            {/* Movie rating */}
            <div>
              <label htmlFor="rating" className="block text-sm font-medium text-gray-700 mb-2">
                Movie Rating
              </label>
              <input
                type="number"
                id="rating"
                name="rating"
                value={formData.rating}
                onChange={handleInputChange}
                className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors ${
                  errors.rating
                    ? "border-red-500 focus:ring-red-500 focus:border-red-500"
                    : "border-gray-300"
                }`}
                placeholder="Enter movie rating"
                min={0}
                max={10}
              />
              {errors.rating && <p className="mt-1 text-sm text-red-600">{errors.rating}</p>}
            </div>
            {/* Duration */}
            <div>
              <label htmlFor="duration" className="block text-sm font-medium text-gray-700 mb-2">
                Movie Duration (minutes)
              </label>
              <input
                type="number"
                id="duration"
                name="duration"
                value={formData.duration}
                onChange={handleInputChange}
                className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors ${
                  errors.duration
                    ? "border-red-500 focus:ring-red-500 focus:border-red-500"
                    : "border-gray-300"
                }`}
                placeholder="Enter duration in minutes (e.g., 135)"
                min={0}
              />
              {errors.duration && <p className="mt-1 text-sm text-red-600">{errors.duration}</p>}
            </div>
            {/* Thumbnail Upload */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Movie Thumbnail
              </label>
              <div className="flex items-center gap-4">
                <button
                  type="button"
                  onClick={handleThumbnailClick}
                  className={`relative w-20 h-20 rounded-lg border-2 border-dashed border-gray-300 hover:border-blue-500 hover:bg-blue-50 transition-colors flex items-center justify-center overflow-hidden ${thumbnail ? "border-solid border-blue-500" : ""}`}
                >
                  {thumbnail ? (
                    <img
                      src={thumbnail}
                      alt="Thumbnail preview"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <Upload className="w-6 h-6 text-gray-400" />
                  )}
                </button>
                <input
                  ref={fileInputRef}
                  type="file"
                  name="image"
                  required
                  className="hidden"
                  accept="image/*"
                  onChange={handleFileChange}
                />
                <span className="text-sm text-gray-500">
                  {thumbnail ? "Click to change" : "Click to upload"}
                </span>
              </div>
              {errors.image && <p className="mt-1 text-sm text-red-600">{errors.image}</p>}
            </div>
          </div>

          {/* Submit Button */}
          <div className="pt-4">
            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Add Movie
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
