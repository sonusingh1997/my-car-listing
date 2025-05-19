import Link from 'next/link';

export default function Home() {
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Welcome to Car Listings</h1>
      <Link
        href={`/${"cars"}`} 
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Browse Cars
      </Link>
    </div>
  );
}
