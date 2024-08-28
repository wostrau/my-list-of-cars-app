import { Car } from '../interfaces/car.interface';

export const fetchCarById = async (carId: number): Promise<Car> => {
  const res = await fetch(`/api/cars/${carId}`);

  if (!res.ok) {
    throw new Error('Failed to fetch car details');
  }

  const data = await res.json();
  return data.Car as Car;
};
