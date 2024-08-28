import { MessageFormData } from '../interfaces/messageFormData.interface';

export const INITIAL_FORM_DATA = {
  firstName: '',
  lastName: '',
  contact: '',
  message: '',
} satisfies MessageFormData;
