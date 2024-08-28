import { useState } from 'react';
import Grid from '@mui/material/Grid2';
import { CarDetails } from '../components/CarDetails';
import { ListOfCars } from '../components/ListOfCars';
import { MessageForm } from '../components/MessageFormNew';
import { MessageModal } from '../components/MessageModal';

export const CarsPage = () => {
  const [carId, setCarId] = useState<number | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [formSuccess, setFormSuccess] = useState<string>('null');

  const handleCarSelect = (carId: number) => {
    setFormSuccess('null');
    setCarId(carId);
  };

  const handleFormSuccess = (message: string) => {
    setFormSuccess(message);
    setIsModalOpen(true);
  };

  return (
    <Grid
      container
      spacing={2}
    >
      <ListOfCars onCarSelect={handleCarSelect} />

      {carId && (
        <>
          <CarDetails carId={carId} />
          <MessageForm onFormSuccess={handleFormSuccess} />
        </>
      )}

      <MessageModal
        open={isModalOpen}
        message={formSuccess}
        onClose={() => setIsModalOpen(false)}
      />
    </Grid>
  );
};
