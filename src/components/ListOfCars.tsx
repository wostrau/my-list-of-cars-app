import { FC } from 'react';
import Grid from '@mui/material/Grid2';
import { useQuery } from '@tanstack/react-query';
import { fetchCars } from '../api/fetchCars';
import { FormControlLabel, Radio, RadioGroup, Typography } from '@mui/material';
import { Car } from '../interfaces/car.interface';

type ListOfCars = { onCarSelect: (id: number) => void };

export const ListOfCars: FC<ListOfCars> = ({ onCarSelect }) => {
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
    <Grid size={10}>
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
    </Grid>
  );
};
