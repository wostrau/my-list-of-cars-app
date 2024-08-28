import { MessageFormData } from '../interfaces/messageFormData.interface';

export const INITIAL_FORM_DATA_STATE = {
  firstName: '',
  lastName: '',
  contact: '',
  message: '',
} satisfies MessageFormData;
