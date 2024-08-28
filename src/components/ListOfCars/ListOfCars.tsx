import { FC } from 'react';
// import Grid from '@mui/material/Grid2';
import { useQuery } from '@tanstack/react-query';
import { fetchCars } from '../../api';
import { FormControlLabel, Radio, RadioGroup, Typography } from '@mui/material';
import { Car } from '../../interfaces/car.interface';
import { ListOfCarsProps } from './ListOfCars.interfaces';

export const ListOfCars: FC<ListOfCarsProps> = ({ onCarSelect }) => {
  const { status, data, error } = useQuery({
    queryFn: fetchCars,
    queryKey: ['cars'],
  });

  if (status === 'pending') {
    return <Typography>Loading...</Typography>;
  }

  if (status === 'error') {
    return <Typography>Error: {error.message}</Typography>;
  }

  return (
    <RadioGroup onChange={(e) => onCarSelect(parseInt(e.target.value))}>
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
