import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { fetchCars } from '../api';
import { Car } from '../interfaces';

type UseCarsSelect<T extends Car[]> = (cars: Car[]) => T;

export const useCars = <T extends Car[] = Car[]>(
  select?: UseCarsSelect<T>
): UseQueryResult<T> => {
  return useQuery<T>({
    queryKey: ['cars'],
    queryFn: fetchCars as () => Promise<T>,
    select,
    enabled: true,
  });
};
