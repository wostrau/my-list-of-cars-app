import { ChangeEvent, FC, FormEvent } from 'react';
import { useAtom } from 'jotai';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { postMessageToContactUs } from '../../api/postMessageToContactUs';
import { PayloadFormData } from '../../interfaces/payloadFormData.interface';
import { INITIAL_FORM_DATA } from '../../constants/initialFormData';
import { Box, Typography, TextField, Button } from '@mui/material';
import { MessageFormProps } from './MessageForm.interfaces';
import { formDataAtom, formErrorsAtom } from '../../atoms';
import { useValidation } from '../../hooks/useValidation';
import { MessageFormData } from '../../interfaces';

export const MessageForm: FC<MessageFormProps> = ({ onFormSuccess }) => {
  const queryClient = useQueryClient();

  const { mutateAsync: postMessageMutation } = useMutation({
    mutationFn: postMessageToContactUs,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['cars'] }),
  });

  const [formData, setFormData] = useAtom(formDataAtom);
  const [formErrors, setFormErrors] = useAtom(formErrorsAtom);
  const { validateForm, validateField } = useValidation(formData);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    const error = validateField(name as keyof MessageFormData, value);
    setFormErrors({ ...formErrors, [name]: error });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (validateForm()) {
      try {
        const payloadData = {
          ...formData,
          contact: parseInt(formData.contact),
        } satisfies PayloadFormData;

        const res = await postMessageMutation(payloadData);
        onFormSuccess(res);
        setFormData(INITIAL_FORM_DATA);
        setFormErrors(INITIAL_FORM_DATA);
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
    <Box
      marginTop={4}
      padding={3}
      border={1}
    >
      <form onSubmit={handleSubmit}>
        <Typography variant='h6'>Customer Information</Typography>

        <Box paddingBottom={2}>
          <TextField
            fullWidth
            label='First Name'
            name='firstName'
            value={formData.firstName}
            onChange={handleChange}
            error={!!formErrors.firstName}
            helperText={formErrors.firstName}
          />
        </Box>

        <Box paddingBottom={2}>
          <TextField
            fullWidth
            label='Last Name'
            name='lastName'
            value={formData.lastName}
            onChange={handleChange}
            error={!!formErrors.lastName}
            helperText={formErrors.lastName}
          />
        </Box>

        <Box paddingBottom={2}>
          <TextField
            fullWidth
            label='Mobile Phone'
            name='contact'
            value={formData.contact}
            onChange={handleChange}
            error={!!formErrors.contact}
            helperText={formErrors.contact}
          />
        </Box>

        <Box paddingBottom={2}>
          <TextField
            fullWidth
            label='Message'
            name='message'
            value={formData.message}
            onChange={handleChange}
            multiline
            rows={4}
            error={!!formErrors.message}
            helperText={formErrors.message}
          />
        </Box>

        <Button
          type='submit'
          variant='outlined'
          color='secondary'
        >
          Send
        </Button>
      </form>
    </Box>
  );
};
