import { FC, useState } from 'react';
import Grid from '@mui/material/Grid2';
import { useMutation } from '@tanstack/react-query';
import { postMessageToContactUs } from '../api/postMessageToContactUs';
import { MessageFormData } from '../interfaces/messageFormData.interface';
import { PayloadFormData } from '../interfaces/payloadFormData.interface';
import { INITIAL_FORM_DATA_STATE } from '../constants/initialFormDataState';
import { Box, Typography, TextField, Button } from '@mui/material';

interface MessageFormProps {
  onFormSuccess: (message: string) => void;
}

export const MessageForm: FC<MessageFormProps> = ({ onFormSuccess }) => {
  const { mutateAsync: postMessageMutation } = useMutation({
    mutationFn: postMessageToContactUs,
  });

  const [formData, setFormData] = useState<MessageFormData | PayloadFormData>(
    INITIAL_FORM_DATA_STATE
  );
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

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
    } else if (!/^\d{10}$/.test(formData.contact as string)) {
      errors.contact = 'Phone number must be 10 digits';
    }
    if (!formData.message.trim()) {
      errors.message = 'Message is required';
    }

    setFormErrors(errors);

    return Object.keys(errors).length === 0;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleContactChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const contact = parseInt(value.trim());
    setFormData({ ...formData, [name]: contact });
  };

  const handleSubmitWithMutation = async (e: React.FormEvent) => {
    e.preventDefault();

    if (validateForm()) {
      try {
        const res = await postMessageMutation(formData as PayloadFormData);

        if (res) {
          onFormSuccess(res);
        }
        setFormData(INITIAL_FORM_DATA_STATE);
      } catch (err) {
        if (err instanceof Error) {
          console.error(err.message);
        } else {
          console.error('An unknown error occurred');
        }
      }
    }
  };

  return (
    <Grid size={10}>
      <Box
        marginTop={4}
        padding={2}
        border={1}
      >
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

        {/* {formSuccess && (
          <Typography
            variant='body1'
            color='success'
            marginTop={2}
          >
            {formSuccess}
          </Typography>
        )} */}
      </Box>
    </Grid>
  );
};
