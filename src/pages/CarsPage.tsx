import { useState } from 'react';
import { Box } from '@mui/material';
import { CarDetails } from '../components/CarDetails';
import { ListOfCars } from '../components/ListOfCars';
import { MessageForm } from '../components/MessageForm';
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
    <Box width={600}>
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
    </Box>
  );
};
