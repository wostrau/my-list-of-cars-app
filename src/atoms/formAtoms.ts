import { atom } from 'jotai';
import { MessageFormData } from '../interfaces';
import { INITIAL_FORM_DATA } from '../constants';

export const formDataAtom = atom<MessageFormData>(INITIAL_FORM_DATA);
export const formErrorsAtom = atom<MessageFormData>(INITIAL_FORM_DATA);
