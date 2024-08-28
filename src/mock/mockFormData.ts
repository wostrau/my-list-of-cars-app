import { MessageFormData } from "../interfaces/messageFormData.interface";

export const MOCK_FORM_DATA = {
  firstName: 'John',
  lastName: 'Wick',
  contact: 123456789,
  message: 'Hey!',
} satisfies MessageFormData;
