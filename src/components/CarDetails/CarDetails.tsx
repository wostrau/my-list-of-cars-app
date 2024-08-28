import { FC } from 'react';
import { Box, Typography } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { fetchCarById } from '../../api/fetchCarById';
import { CarDetailsProps } from './CarDetails.interfaces';

export const CarDetails: FC<CarDetailsProps> = ({ carId }) => {
  const { data, status, error } = useQuery({
    queryFn: () => fetchCarById(carId),
    queryKey: ['car', carId],
    enabled: carId !== null,
  });

  if (status === 'pending') {
    return <Typography>Loading...</Typography>;
  }

  if (status === 'error') {
    return <Typography>Error: {error.message}</Typography>;
  }

  return (
    <Box
      marginTop={4}
      padding={2}
      border={1}
    >
      <Typography variant='h6'>Car Details</Typography>
      <Typography>Model: {data.car_model}</Typography>
      <Typography>Color: {data.car_color}</Typography>
      <Typography>Year: {data.car_model_year}</Typography>
      <Typography>VIN: {data.car_vin}</Typography>
      <Typography>Price: {data.price}</Typography>
      <Typography>
        Availability: {data.availability ? 'Available' : 'Unavailable'}
      </Typography>
    </Box>
  );
};
