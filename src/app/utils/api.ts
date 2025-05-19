import { Car } from "../types/cars";

const API_URL =
  "https://arpitjoshi.github.io/8e4474f3-d675-44c2-ba12-ccfacfa97c8b.json";

export async function fetchCars(): Promise<Car[]> {
  const response = await fetch(API_URL);
  if (!response.ok) {
    throw new Error("Failed to fetch cars");
  }
  return response.json();
}
export async function fetchCarById(
  id: string | number
): Promise<Car | undefined> {
  const cars = await fetchCars();

 
  return cars.find((car) => car.id.toString() === id.toString());
}
