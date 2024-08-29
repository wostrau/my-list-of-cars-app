import { ERROR_10_DIGITS, ERROR_MESSAGE } from './../constants/errorMessages';
import { useAtom } from 'jotai';
import { formErrorsAtom } from '../atoms';
import { MessageFormData } from '../interfaces';
import {
  ERROR_CONTACT,
  ERROR_FIRSTNAME,
  ERROR_LASTNAME,
  PHONE_NUMBER_VALIDATION,
} from '../constants';

export const useValidation = (formData: MessageFormData) => {
  const [, setFormErrors] = useAtom(formErrorsAtom);

  const validateField = (name: keyof MessageFormData, value: string) => {
    let error = '';

    switch (name) {
      case 'firstName':
        if (!value.trim()) {
          error = ERROR_FIRSTNAME;
        }
        break;
      case 'lastName':
        if (!value.trim()) {
          error = ERROR_LASTNAME;
        }
        break;
      case 'contact':
        if (!value.trim()) {
          error = ERROR_CONTACT;
        } else if (!PHONE_NUMBER_VALIDATION.test(value)) {
          error = ERROR_10_DIGITS;
        }
        break;
      case 'message':
        if (!value.trim()) {
          error = ERROR_MESSAGE;
        }
        break;
      default:
        break;
    }

    return error;
  };

  const validateForm = () => {
    const errors: Partial<MessageFormData> = {};

    Object.entries(formData).forEach(([key, value]) => {
      const error = validateField(key as keyof MessageFormData, value);
      if (error) {
        errors[key as keyof MessageFormData] = error;
      }
    });

    setFormErrors(errors as MessageFormData);
    return Object.keys(errors).length === 0;
  };

  return {
    validateField,
    validateForm,
  };
};
