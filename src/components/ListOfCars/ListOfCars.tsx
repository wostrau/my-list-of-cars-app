import { FC } from 'react';
import { FormControlLabel, Radio, RadioGroup, Typography } from '@mui/material';
import { ListOfCarsProps } from './ListOfCars.interfaces';
import { useRandomCars } from '../../hooks/useRandomCars';
import { Car } from '../../interfaces/car.interface';

export const ListOfCars: FC<ListOfCarsProps> = ({ onCarSelect }) => {
  const { status, data, error } = useRandomCars();

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
