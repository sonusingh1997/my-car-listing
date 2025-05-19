import ImageCarousel from "@/app/components/ImageCarousel";
import { fetchCarById } from "@/app/utils/api";
import Link from "next/link";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function CarDetails({ params }: PageProps) {
  const resolvedParams = await params;

  if (!resolvedParams.id || typeof resolvedParams.id !== 'string') {
    return (
      <div className="container mx-auto p-4">
        <div className="text-center py-8">
          <h1 className="text-2xl font-bold">Invalid Car ID</h1>
          <Link href="/cars" className="text-blue-500 mt-4 inline-block">
            ← Back to Cars
          </Link>
        </div>
      </div>
    );
  }

  const car = await fetchCarById(resolvedParams.id);




  if (!car) {
    return (
      <div className="container mx-auto p-4">
        <Link href="/cars" className="text-blue-500 mb-4 inline-block">
          ← Back to Cars
        </Link>
        <div className="text-center py-8">
          <h1 className="text-2xl font-bold">Car not found</h1>
          <p>No car with ID {resolvedParams.id} exists.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <Link href="/cars" className="text-blue-500 mb-4 inline-block">
        ← Back to Cars
      </Link>
      <h1 className="text-3xl font-bold mb-4">
        {car.make} {car.model}
      </h1>

      <div className="grid md:grid-cols-2 gap-8">
        <ImageCarousel images={car.image || []} />

        {/* Main Specifications Card - Added shadow here */}
        <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
          <p className="text-2xl font-semibold mb-4 text-blue-500">
            ${car.price.toLocaleString()}
          </p>

          <h2 className="text-xl font-semibold mb-4 text-blue-500">
            Specifications
          </h2>
          <div className="grid grid-cols-2 gap-4">
            {/* Individual specification boxes with subtle shadows */}
            <div className="border p-3 rounded shadow-sm hover:shadow-md transition-shadow">
              <p className="font-semibold text-blue-600">Year</p>
              <p className="text-gray-600">{car.year}</p>
            </div>
            <div className="border p-3 rounded shadow-sm hover:shadow-md transition-shadow">
              <p className="font-semibold text-blue-600">Color</p>
              <p className="text-gray-600">{car.color || "N/A"}</p>
            </div>
            <div className="border p-3 rounded shadow-sm hover:shadow-md transition-shadow">
              <p className="font-semibold text-blue-600">Engine</p>
              <p className="text-gray-600">{car.engine || "N/A"}</p>
            </div>
            <div className="border p-3 rounded shadow-sm hover:shadow-md transition-shadow">
              <p className="font-semibold text-blue-600">Transmission</p>
              <p className="text-gray-600">{car.transmission || "N/A"}</p>
            </div>
            <div className="border p-3 rounded shadow-sm hover:shadow-md transition-shadow">
              <p className="font-semibold text-blue-600">Mileage</p>
              <p className="text-gray-600">
                {car.mileage ? `${car.mileage.toLocaleString()} miles` : "N/A"}
              </p>
            </div>
            <div className="border p-3 rounded shadow-sm hover:shadow-md transition-shadow">
              <p className="font-semibold text-blue-600">Owners</p>
              <p className="text-gray-600">{car.owners || "N/A"}</p>
            </div>
          </div>

          {car.features && car.features.length > 0 && (
            <>
              <h2 className="text-xl font-semibold mt-6 mb-4 text-blue-600">
                Features
              </h2>
              <div className="flex flex-wrap gap-2">
                {car.features.map((feature, index) => (
                  <span
                    key={index}
                    className="bg-gray-900 text-white px-3 py-1 rounded-full text-sm shadow-md hover:shadow-lg transition-shadow"
                  >
                    {feature}
                  </span>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
