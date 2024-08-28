import { UseQueryResult } from '@tanstack/react-query';
import { getRandomCars } from '../helpers/getRandomCars';
import { Car } from '../interfaces';
import { useCars } from './useCars';

export const useRandomCars = (): UseQueryResult<Car[]> => {
  return useCars<Car[]>((cars) => getRandomCars(cars));
};
