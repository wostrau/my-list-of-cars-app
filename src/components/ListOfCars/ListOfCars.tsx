import { FC, forwardRef, memo } from 'react';
import { FormControlLabel, Radio, RadioGroup, Typography } from '@mui/material';
import { getRandomCars } from '../../helpers/getRandomCars';
import { ListOfCarsProps } from './ListOfCars.interfaces';
import { Car } from '../../interfaces/car.interface';
import { useQuery } from '@tanstack/react-query';
import { fetchCars } from '../../api';

export const ListOfCars: FC<ListOfCarsProps> = ({Bref}) => {
  const { status, data, error } = useQuery({
    queryFn: fetchCars,
    queryKey: ['cars'],
    select: (cars) => getRandomCars(cars),
    enabled: true,
  });

  if (status === 'pending') {
    return <Typography>Loading...</Typography>;
  }

  if (status === 'error') {
    return <Typography>Error: {error.message}</Typography>;
  }

  return (
    <RadioGroup onChange={(e) => {
      Bref.current = parseInt(e.target.value)
console.log(Bref);
      }}>
      {data?.map((car: Car) => (
        <FormControlLabel
          key={car.id}
          value={car.id}
          control={<Radio />}
          label={`${car.car} ${car.car_model} (${car.car_model_year})`}
        />
      ))}
    </RadioGroup>
  );
};
