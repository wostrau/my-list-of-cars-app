import { Car } from '../interfaces/car.interface';

export const fetchCars = async (): Promise<Car[]> => {
  const res = await fetch('/api/cars/');

  if (!res.ok) {
    throw new Error('Failed to fetch cars');
  }

  const data = await res.json();
  return data.cars.slice(0, 10) as Car[];
};
