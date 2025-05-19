"use client";
import { useSearchParams, useRouter } from "next/navigation";
import CarFilters from "../components/CarFilters";
import CarCard from "../components/CarCard";
import Pagination from "../components/Pagination";

export default function CarList({
  cars,
  currentPage,
  totalPages,
}: {
  cars: any[];
  currentPage: number;
  totalPages: number;
}) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleFilter = (filters: any, sort?: any) => {
    const params = new URLSearchParams(searchParams);

    // Update search params
    if (filters.search) params.set("search", filters.search);
    if (filters.minYear) params.set("minYear", filters.minYear.toString());
    if (filters.maxYear) params.set("maxYear", filters.maxYear.toString());
    if (filters.minPrice) params.set("minPrice", filters.minPrice.toString());
    if (filters.maxPrice) params.set("maxPrice", filters.maxPrice.toString());

    // Update sort params
    if (sort) {
      params.set("sortField", sort.field);
      params.set("sortDirection", sort.direction);
    }

    // Reset to first page when filters change
    params.set("page", "1");
    
    // Update URL
    router.push(`/cars?${params.toString()}`);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Car Listings</h1>

      <CarFilters onFilter={handleFilter} />

      {cars.length > 0 ? (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {cars.map((car) => (
              <CarCard key={car.id} car={car} />
            ))}
          </div>
          <Pagination currentPage={currentPage} totalPages={totalPages} />
        </>
      ) : (
        <div className="text-center py-8">
          <p className="text-lg">No cars found matching your criteria</p>
        </div>
      )}
    </div>
  );
}