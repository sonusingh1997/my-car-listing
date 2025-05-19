import { fetchCars } from "@/app/utils/api";
import CarList from "./CarList";
  export default async function CarsPage({
    searchParams,
  }: {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
  }) {
    const resolvedSearchParams = await searchParams;
  
    const params = new URLSearchParams();
    for (const [key, value] of Object.entries(resolvedSearchParams)) {
      if (typeof value === "string") params.set(key, value);
    }
  
  // Extract parameters with proper type checking
  const page = params.get("page") || "1";
  const search = params.get("search") || undefined;
  const minYear = params.get("minYear") || undefined;
  const maxYear = params.get("maxYear") || undefined;
  const minPrice = params.get("minPrice") || undefined;
  const maxPrice = params.get("maxPrice") || undefined;
  const sortField = params.get("sortField") || undefined;
  const sortDirection = params.get("sortDirection") || undefined;

  const currentPage = Number(page) || 1;
  const perPage = 6;

  const allCars = await fetchCars();

  const filteredCars = allCars.filter((car) => {
    if (search) {
      const searchTerm = search.toLowerCase();
      if (
        !car.make.toLowerCase().includes(searchTerm) &&
        !car.model.toLowerCase().includes(searchTerm)
      ) {
        return false;
      }
    }

    if (minYear && car.year < Number(minYear)) return false;
    if (maxYear && car.year > Number(maxYear)) return false;
    if (minPrice && car.price < Number(minPrice)) return false;
    if (maxPrice && car.price > Number(maxPrice)) return false;

    return true;
  });

  if (sortField && sortDirection) {
    filteredCars.sort((a, b) => {
      const field = sortField as "price" | "year";
      const multiplier = sortDirection === "asc" ? 1 : -1;
      return (a[field] - b[field]) * multiplier;
    });
  }

  const totalPages = Math.ceil(filteredCars.length / perPage);
  const paginatedCars = filteredCars.slice(
    (currentPage - 1) * perPage,
    currentPage * perPage
  );

  return (
    <CarList
      cars={paginatedCars}
      currentPage={currentPage}
      totalPages={totalPages}
    />
  );
}
