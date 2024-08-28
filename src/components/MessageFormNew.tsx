import { FC } from 'react';
import { useForm, Controller } from 'react-hook-form';
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

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<MessageFormData>({
    defaultValues: INITIAL_FORM_DATA_STATE,
  });

  const onSubmit = async (data: MessageFormData) => {
    try {
      const payloadData = {
        ...data,
        contact: parseInt(data.contact),
      } satisfies PayloadFormData;
      const res = await postMessageMutation(payloadData);

      if (res) {
        onFormSuccess(res);
      }
      reset(INITIAL_FORM_DATA_STATE);
    } catch (err) {
      if (err instanceof Error) {
        console.error(err.message);
      } else {
        console.error('An unknown error occurred');
      }
    }
  };

  return (
    <Grid
      container
      spacing={2}
    >
      <Box
        marginTop={4}
        padding={2}
        border={1}
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <Typography variant='h6'>Customer Information</Typography>
          <Grid
            container
            spacing={2}
          >
            <Grid size={10}>
              <Controller
                name='firstName'
                control={control}
                rules={{ required: 'First name is required' }}
                render={({ field }) => (
                  <TextField
                    fullWidth
                    label='First Name'
                    {...field}
                    error={!!errors.firstName}
                    helperText={errors.firstName?.message}
                  />
                )}
              />
            </Grid>
            <Grid size={10}>
              <Controller
                name='lastName'
                control={control}
                rules={{ required: 'Last name is required' }}
                render={({ field }) => (
                  <TextField
                    fullWidth
                    label='Last Name'
                    {...field}
                    error={!!errors.lastName}
                    helperText={errors.lastName?.message}
                  />
                )}
              />
            </Grid>
            <Grid size={10}>
              <Controller
                name='contact'
                control={control}
                rules={{
                  required: 'Phone number is required',
                  pattern: {
                    value: /^\d{10}$/,
                    message: 'Phone number must be 10 digits',
                  },
                }}
                render={({ field }) => (
                  <TextField
                    fullWidth
                    label='Mobile Phone'
                    {...field}
                    error={!!errors.contact}
                    helperText={errors.contact?.message}
                  />
                )}
              />
            </Grid>
            <Grid size={10}>
              <Controller
                name='message'
                control={control}
                rules={{ required: 'Message is required' }}
                render={({ field }) => (
                  <TextField
                    fullWidth
                    label='Message'
                    {...field}
                    multiline
                    rows={4}
                    error={!!errors.message}
                    helperText={errors.message?.message}
                  />
                )}
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
      </Box>
    </Grid>
  );
};
