import { useEffect, useState } from 'react';
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
import { TOKEN } from '../constants/token';

interface Car {
  id: number;
  car: string;
  car_model: string;
  car_color: string;
  car_model_year: number;
  car_vin: string;
  price: string;
  availability: boolean;
}

export const CarsPage = () => {
  const [cars, setCars] = useState<Car[] | null>(null);
  const [selectedCarId, setSelectedCarId] = useState<number | null>(null);
  const [selectedCarDetails, setSelectedCarDetails] = useState<Car | null>(
    null
  );
  console.log('selectedCarDetails >>>', selectedCarDetails);

  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [formSuccess, setFormSuccess] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    message: '',
  });

  const apiUrl = 'https://myfakeapi.com/api/cars/';

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const res = await fetch(apiUrl, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ token: TOKEN }),
        });

        if (!res.ok) {
          throw new Error('Failed to fetch cars');
        }
        const data = await res.json();
        setCars(data.cars.slice(0, 10));
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError('An unknown error occurred');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchCars();
  }, []);

  const handleCarSelection = async (carId: number) => {
    setSelectedCarId(carId);
    setSelectedCarDetails(null);

    try {
      const res = await fetch(`https://myfakeapi.com/api/cars/${carId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

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

  const validateForm = () => {
    const errors: Record<string, string> = {};

    if (!formData.firstName.trim()) {
      errors.firstName = 'First name is required';
    }
    if (!formData.lastName.trim()) {
      errors.lastName = 'Last name is required';
    }
    if (!formData.phone.trim()) {
      errors.phone = 'Phone number is required';
    } else if (!/^\d{10}$/.test(formData.phone)) {
      errors.phone = 'Phone number must be 10 digits';
    }
    if (!formData.message.trim()) {
      errors.message = 'Message is required';
    }

    setFormErrors(errors);

    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormSuccess(null);

    if (validateForm()) {
      try {
        const res = await fetch('https://myfakeapi.com/api/contactus', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${TOKEN}`,
          },
          body: JSON.stringify({ ...formData, token: TOKEN }),
        });

        if (res.ok) {
          setFormSuccess('Form submitted successfully!');
          setFormData({
            firstName: '',
            lastName: '',
            phone: '',
            message: '',
          });
          setFormErrors({});
        } else {
          throw new Error('Failed to submit form');
        }
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError('An unknown error occurred');
        }
      }
    }
  };

  if (loading) {
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
      <Grid size={12}>
        <RadioGroup
          value={selectedCarId}
          onChange={(e) => handleCarSelection(Number(e.target.value))}
        >
          {cars?.map((car) => (
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
            <form onSubmit={handleSubmit}>
              <Typography variant='h6'>Customer Information</Typography>
              <Grid
                container
                spacing={2}
              >
                <Grid size={12}>
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
                <Grid size={12}>
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
                <Grid size={12}>
                  <TextField
                    fullWidth
                    label='Mobile Phone'
                    name='phone'
                    value={formData.phone}
                    onChange={handleInputChange}
                    error={!!formErrors.phone}
                    helperText={formErrors.phone}
                  />
                </Grid>
                <Grid size={12}>
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
                <Grid size={12}>
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
