"use client";
import { useState } from "react";
import { FilterOptions, SortOptions } from "../types/cars";

interface CarFiltersProps {
  onFilter: (filters: FilterOptions, sort?: SortOptions) => void;
}

export default function CarFilters({ onFilter }: CarFiltersProps) {
  const [search, setSearch] = useState("");
  const [filters, setFilters] = useState<Omit<FilterOptions, "search">>({
    minYear: undefined,
    maxYear: undefined,
    minPrice: undefined,
    maxPrice: undefined,
  });
  const [sort, setSort] = useState<SortOptions>({
    field: "price",
    direction: "asc",
  });

  const handleApply = () => {
    const filterValues: FilterOptions = {
      search: search.trim(),
      minYear: filters.minYear,
      maxYear: filters.maxYear,
      minPrice: filters.minPrice,
      maxPrice: filters.maxPrice,
    };
  
    onFilter(filterValues, sort);
  };

  const handleReset = () => {
    setSearch("");
    setFilters({
      minYear: undefined,
      maxYear: undefined,
      minPrice: undefined,
      maxPrice: undefined,
    });
    setSort({ field: "price", direction: "asc" });
  
    onFilter(
      {
        search: "",
        minYear: undefined,
        maxYear: undefined,
        minPrice: undefined,
        maxPrice: undefined,
      },
      { field: "price", direction: "asc" }
    );
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    key: keyof Omit<FilterOptions, "search">
  ) => {
    const value = e.target.value;
    setFilters({
      ...filters,
      [key]: value ? parseInt(value) : undefined,
    });
  };

  return (
    <div className="bg-violet-900 p-4 rounded-lg mb-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
        <div>
          <label htmlFor="search" className="block text-sm font-medium mb-1">
            Search
          </label>
          <input
            id="search"
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Make or model"
            className="w-full p-2 border rounded"
          />
        </div>

        <div>
          <label htmlFor="minYear" className="block text-sm font-medium mb-1">
            Min Year
          </label>
          <input
            id="minYear"
            type="number"
            min="1900"
            max={new Date().getFullYear()}
            value={filters.minYear?.toString() ?? ""}
            onChange={(e) => handleInputChange(e, "minYear")}
            placeholder="Min year"
            className="w-full p-2 border rounded"
          />
        </div>

        <div>
          <label htmlFor="maxYear" className="block text-sm font-medium mb-1">
            Max Year
          </label>
          <input
            id="maxYear"
            type="number"
            min="1900"
            max={new Date().getFullYear()}
            value={filters.maxYear?.toString() ?? ""}
            onChange={(e) => handleInputChange(e, "maxYear")}
            placeholder="Max year"
            className="w-full p-2 border rounded"
          />
        </div>

        <div>
          <label htmlFor="minPrice" className="block text-sm font-medium mb-1">
            Min Price
          </label>
          <input
            id="minPrice"
            type="number"
            min="0"
            value={filters.minPrice?.toString() ?? ""}
            onChange={(e) => handleInputChange(e, "minPrice")}
            placeholder="Min price"
            className="w-full p-2 border rounded"
          />
        </div>

        <div>
          <label htmlFor="maxPrice" className="block text-sm font-medium mb-1">
            Max Price
          </label>
          <input
            id="maxPrice"
            type="number"
            min="0"
            value={filters.maxPrice?.toString() ?? ""}
            onChange={(e) => handleInputChange(e, "maxPrice")}
            placeholder="Max price"
            className="w-full p-2 border rounded"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Sort By</label>
          <div className="flex gap-2">
            <select
              value={sort.field}
              onChange={(e) =>
                setSort({ ...sort, field: e.target.value as "price" | "year" })
              }
              className="p-2 border rounded flex-1"
              aria-label="Sort field"
            >
              <option value="price">Price</option>
              <option value="year">Year</option>
            </select>
            <select
              value={sort.direction}
              onChange={(e) =>
                setSort({
                  ...sort,
                  direction: e.target.value as "asc" | "desc",
                })
              }
              className="p-2 border rounded flex-1"
              aria-label="Sort direction"
            >
              <option value="asc">Ascending</option>
              <option value="desc">Descending</option>
            </select>
          </div>
        </div>
      </div>

      <div className="flex gap-2">
        <button
          onClick={handleApply}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
        >
          Apply Filters
        </button>
        <button
          onClick={handleReset}
          className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 transition-colors"
        >
          Reset
        </button>
      </div>
    </div>
  );
}