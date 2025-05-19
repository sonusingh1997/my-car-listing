"use client";

import Image from "next/image";
import Link from "next/link";
import { Car } from "../types/cars";

const DEFAULT_CAR_IMAGE = "https://fakeimg.pl/350x200/?text=Car&font=lobster";

export default function CarCard({ car }: { car: Car }) {
  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    const target = e.target as HTMLImageElement;
    target.src = DEFAULT_CAR_IMAGE;
  };

  return (
    <div className="border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
      <Link href={`/cars/${car.id}`}>
        <div className="relative h-48">
          <Image
            src={car.image?.[0] || DEFAULT_CAR_IMAGE}
            alt={`${car.make} ${car.model}`}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            onError={handleImageError}
          />
        </div>
        <div className="p-4">
          <h3 className="text-lg font-semibold">
            {car.make} {car.model}
          </h3>
          <div className="flex justify-between text-gray-600">
            <span>Year: {car.year}</span>
            {car.mileage && <span>{car.mileage.toLocaleString()} miles</span>}
          </div>
          <div className="mt-2">
            <span className="font-bold">${car.price.toLocaleString()}</span>
            {car.owners && (
              <span className="ml-2 text-sm text-gray-500">
                {car.owners} owner{car.owners !== 1 ? "s" : ""}
              </span>
            )}
          </div>
          {car.color && car.engine && (
            <div className="mt-1 text-sm text-gray-500">
              {car.color} • {car.engine}
            </div>
          )}
        </div>
      </Link>
    </div>
  );
}
