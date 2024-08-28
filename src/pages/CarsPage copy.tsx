import { useState } from 'react';
import Grid from '@mui/material/Grid2';
import {
  Box,
  Button,
  FormControlLabel,
  Radio,
  RadioGroup,
  TextField,
  Typography,
} from '@mui/material';
import { useMutation, useQuery } from '@tanstack/react-query';
import { fetchCars } from '../api/fetchCars';
import { postMessageToContactUs } from '../api/postMessageToContactUs';
import { MessageFormData } from '../interfaces/messageFormData.interface';
import { INITIAL_FORM_DATA_STATE } from '../constants/initialFormDataState';
import { Car } from '../interfaces/car.interface';

export const CarsPage = () => {
  const { data: cars, isLoading } = useQuery({
    queryFn: fetchCars,
    queryKey: ['cars'],
  });

  const { mutateAsync: postMessageMutation } = useMutation({
    mutationFn: postMessageToContactUs,
  });

  // const [cars, setCars] = useState<Car[] | null>(null);
  const [selectedCarId, setSelectedCarId] = useState<number | null>(null);
  const [selectedCarDetails, setSelectedCarDetails] = useState<Car | null>(
    null
  );

  // const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [formSuccess, setFormSuccess] = useState<string | null>(null);

  console.log('formSuccess >>>', formSuccess);

  const [formData, setFormData] = useState<MessageFormData>(INITIAL_FORM_DATA_STATE);

  // useEffect(() => {
  //   const fetchCars = async () => {
  //     try {
  //       const res = await fetch('/api/cars/');

  //       if (!res.ok) {
  //         throw new Error('Failed to fetch cars');
  //       }
  //       const data = await res.json();
  //       setCars(data.cars.slice(0, 10));
  //     } catch (err) {
  //       if (err instanceof Error) {
  //         setError(err.message);
  //       } else {
  //         setError('An unknown error occurred');
  //       }
  //     } finally {
  //       setLoading(false);
  //     }
  //   };
  //
  //   fetchCars();
  // }, []);

  const handleCarSelection = async (carId: number) => {
    setSelectedCarId(carId);
    setSelectedCarDetails(null);

    try {
      const res = await fetch(`/api/cars/${carId}`);

      if (!res.ok) {
        throw new Error('Failed to fetch car details');
      }
      const data = await res.json();
      setSelectedCarDetails(data.Car);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('An unknown error occurred');
      }
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleContactChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const contact = Number(value.trim());
    setFormData({ ...formData, [name]: contact });
  };

  const validateForm = () => {
    const errors: Record<string, string> = {};

    if (!formData.firstName.trim()) {
      errors.firstName = 'First name is required';
    }
    if (!formData.lastName.trim()) {
      errors.lastName = 'Last name is required';
    }
    if (!formData.contact) {
      errors.contact = 'Phone number is required';
    } else if (!/^\d{9}$/.test(formData.contact)) {
      errors.contact = 'Phone number must be 9 digits';
    }
    if (!formData.message.trim()) {
      errors.message = 'Message is required';
    }

    setFormErrors(errors);

    return Object.keys(errors).length === 0;
  };

  // const handleSubmit = async (e: React.FormEvent) => {
  //   e.preventDefault();
  //   setFormSuccess(null);

  //   if (validateForm()) {
  //     try {
  //       const res = await fetch('/api/contactus', {
  //         method: 'POST',
  //         headers: {
  //           'Content-Type': 'application/json',
  //         },
  //         body: JSON.stringify(formData),
  //       });

  //       if (res.ok) {
  //         setFormSuccess('Form submitted successfully!');
  //         setFormData({
  //           firstName: '',
  //           lastName: '',
  //           contact: null,
  //           message: '',
  //         });
  //         setFormErrors({});
  //       } else {
  //         throw new Error('Failed to submit form');
  //       }
  //     } catch (err) {
  //       if (err instanceof Error) {
  //         setError(err.message);
  //       } else {
  //         setError('An unknown error occurred');
  //       }
  //     }
  //   }
  // };

  const handleSubmitWithMutation = async (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        const res = await postMessageMutation(formData);
        setFormSuccess(res.message);
        setFormData(INITIAL_FORM_DATA_STATE)
      } catch (err: any) {
        console.error(err.message);
      }
    }
  };

  if (isLoading) {
    return <Typography>Loading...</Typography>;
  }

  if (error) {
    return <Typography>Error: {error}</Typography>;
  }

  return (
    <Grid
      container
      spacing={2}
    >
      <Grid size={10}>
        <RadioGroup
          value={selectedCarId}
          onChange={(e) => handleCarSelection(Number(e.target.value))}
        >
          {cars?.map((car: Car) => (
            <FormControlLabel
              key={car.id}
              value={car.id}
              control={<Radio />}
              label={`${car.car} ${car.car_model} (${car.car_model_year})`}
            />
          ))}
        </RadioGroup>
      </Grid>

      {selectedCarDetails && (
        <Grid size={10}>
          <Box
            marginTop={4}
            padding={2}
            border={1}
          >
            <Typography variant='h6'>Car Details</Typography>
            <Typography>Model: {selectedCarDetails.car_model}</Typography>
            <Typography>Color: {selectedCarDetails.car_color}</Typography>
            <Typography>Year: {selectedCarDetails.car_model_year}</Typography>
            <Typography>VIN: {selectedCarDetails.car_vin}</Typography>
            <Typography>Price: {selectedCarDetails.price}</Typography>
            <Typography>
              Availability:{' '}
              {selectedCarDetails.availability ? 'Available' : 'Unavailable'}
            </Typography>
          </Box>

          <Box
            marginTop={4}
            padding={2}
            border={1}
          >
            {/* <form onSubmit={handleSubmit}> */}
            <form onSubmit={handleSubmitWithMutation}>
              <Typography variant='h6'>Customer Information</Typography>
              <Grid
                container
                spacing={2}
              >
                <Grid size={10}>
                  <TextField
                    fullWidth
                    label='First Name'
                    name='firstName'
                    value={formData.firstName}
                    onChange={handleInputChange}
                    error={!!formErrors.firstName}
                    helperText={formErrors.firstName}
                  />
                </Grid>
                <Grid size={10}>
                  <TextField
                    fullWidth
                    label='Last Name'
                    name='lastName'
                    value={formData.lastName}
                    onChange={handleInputChange}
                    error={!!formErrors.lastName}
                    helperText={formErrors.lastName}
                  />
                </Grid>
                <Grid size={10}>
                  <TextField
                    fullWidth
                    label='Mobile Phone'
                    name='contact'
                    value={formData.contact}
                    onChange={handleContactChange}
                    error={!!formErrors.contact}
                    helperText={formErrors.contact}
                  />
                </Grid>
                <Grid size={10}>
                  <TextField
                    fullWidth
                    label='Message'
                    name='message'
                    value={formData.message}
                    onChange={handleInputChange}
                    error={!!formErrors.message}
                    helperText={formErrors.message}
                    multiline
                    rows={4}
                  />
                </Grid>
                <Grid size={10}>
                  <Button
                    type='submit'
                    variant='outlined'
                    color='secondary'
                  >
                    Send
                  </Button>
                </Grid>
              </Grid>
            </form>

            {formSuccess && (
              <Typography
                variant='body1'
                color='success'
                marginTop={2}
              >
                {formSuccess}
              </Typography>
            )}
          </Box>
        </Grid>
      )}
    </Grid>
  );
};
