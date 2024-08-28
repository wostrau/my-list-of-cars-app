import { useCallback, useRef, useState } from 'react';
import { Box } from '@mui/material';
import { CarDetails } from '../components/CarDetails';
import { ListOfCars } from '../components/ListOfCars';
import { MessageForm } from '../components/MessageForm';
import { MessageModal } from '../components/MessageModal';

export const CarsPage = () => {
  const [carId, setCarId] = useState<number | null>(null);
  const carIdRef = useRef<number>();
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [formSuccess, setFormSuccess] = useState<string | null>(null);

  // const handleCarSelect = (carId: number) => {
  //   setFormSuccess(null);
  //   setCarId(carId);
  // };
  // console.log(carIdRef);

  const handleFormSuccess = (message: string) => {
    setFormSuccess(message);
    setIsModalOpen(true);
  };
  console.log('rerender');
  return (
    <Box width={600}>
      <ListOfCars
        // onCarSelect={handleCarSelect}
        Bref={carIdRef}
      />

      {carId && (
        <>
          <CarDetails carId={carId} />
          <MessageForm onFormSuccess={handleFormSuccess} />
        </>
      )}

      {formSuccess && (
        <MessageModal
          open={isModalOpen}
          message={formSuccess}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </Box>
  );
};
