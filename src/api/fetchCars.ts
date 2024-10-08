import { Car } from '../interfaces';

export const fetchCars = async (): Promise<Car[]> => {
  const res = await fetch('/api/cars/');

  if (!res.ok) {
    throw new Error('Failed to fetch cars');
  }

  const data = await res.json();
  return data.cars as Car[];
};
