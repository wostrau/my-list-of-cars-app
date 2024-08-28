import { PayloadFormData } from '../interfaces/payloadFormData.interface';

export const postMessageToContactUs = async (
  formData: PayloadFormData
): Promise<string> => {
  const res = await fetch('/api/contactus', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(formData),
  });

  if (!res.ok) {
    throw new Error('Failed to submit form');
  }

  const data = await res.json();
  return data.message as string;
};
