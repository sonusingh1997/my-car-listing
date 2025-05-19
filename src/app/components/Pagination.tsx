"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
}

export default function Pagination({
  currentPage,
  totalPages,
}: PaginationProps) {
  const searchParams = useSearchParams();

  const createPageUrl = (page: number) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", page.toString());
    return `?${params.toString()}`;
  };

  if (totalPages <= 1) return null;

  return (
    <div className="flex justify-center mt-8">
      <nav className="flex gap-1">
        {currentPage > 1 && (
          <Link
            href={createPageUrl(currentPage - 1)}
            className="px-3 py-1 border rounded hover:bg-gray-100"
          >
            Previous
          </Link>
        )}

        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
          <Link
            key={page}
            href={createPageUrl(page)}
            className={`px-3 py-1 border rounded ${
              page === currentPage
                ? "bg-blue-500 text-white"
                : "hover:bg-gray-100"
            }`}
          >
            {page}
          </Link>
        ))}

        {currentPage < totalPages && (
          <Link
            href={createPageUrl(currentPage + 1)}
            className="px-3 py-1 border rounded hover:bg-gray-100"
          >
            Next
          </Link>
        )}
      </nav>
    </div>
  );
}
