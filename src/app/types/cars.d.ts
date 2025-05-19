export interface Car {
  id: number;
  make: string;
  model: string;
  year: number;
  price: number;
  image?: string[];
  color?: string;
  engine?: string;
  features?: string[];
  fuelType?: string;
  horsepower?: number;
  mileage?: number;
  owners?: number;
  transmission?: string;
}

export interface FilterOptions {
  search?: string;
  minYear?: number;
  maxYear?: number;
  minPrice?: number;
  maxPrice?: number;
}

export interface SortOptions {
  field: "price" | "year";
  direction: "asc" | "desc";
}
