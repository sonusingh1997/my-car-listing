"use client";

import { useState } from "react";
import Image from "next/image";

export default function ImageCarousel({ images }: { images: string[] }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextImage = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <div className="relative">
      <div className="relative h-64 md:h-96">
        <Image
          src={images[currentIndex]}
          alt={`Car image ${currentIndex + 1}`}
          fill
          className="object-contain"
          sizes="(max-width: 768px) 100vw, 50vw"
        />
      </div>

      {images.length > 1 && (
        <div className="flex justify-between mt-2">
          <button
            onClick={prevImage}
            className="bg-gray-900 text-white px-4 py-2 rounded hover:bg-gray-700 hover:text-white"
          >
            Previous
          </button>
          <span className="self-center">
            {currentIndex + 1} / {images.length}
          </span>
          <button
            onClick={nextImage}
            className="bg-gray-900 text-white px-4 py-2 rounded hover:bg-gray-700 hover:text-white"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}
