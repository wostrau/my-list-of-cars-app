import { Car } from '../interfaces';

export const getRandomCars = (cars: Car[], count: number = 10): Car[] => {
  const shuffledCars = [...cars].sort(() => 0.5 - Math.random());
  return shuffledCars.slice(0, count);
};