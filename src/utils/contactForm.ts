import type { ContactFormData } from './whatsapp';

export type ContactFormStatus = 'idle' | 'loading' | 'success' | 'error' | 'unavailable';
export type ContactFormErrors = Partial<Record<keyof ContactFormData, string>>;

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
const MIN_PHONE_DIGITS = 10;
const MAX_PHONE_DIGITS = 11;

const getPhoneDigits = (value: string) => value.replace(/\D/g, '').slice(0, MAX_PHONE_DIGITS);

export const formatPhoneInput = (value: string): string => {
  const digits = getPhoneDigits(value);

  if (!digits) {
    return '';
  }

  if (digits.length <= 2) {
    return `(${digits}`;
  }

  if (digits.length <= 6) {
    return `(${digits.slice(0, 2)}) ${digits.slice(2)}`;
  }

  if (digits.length <= 10) {
    return `(${digits.slice(0, 2)}) ${digits.slice(2, 6)}-${digits.slice(6)}`;
  }

  return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`;
};

export const validateContactField = (
  field: keyof ContactFormData,
  value: string
): string | undefined => {
  const trimmedValue = value.trim();

  if (!trimmedValue) {
    return 'Campo obrigatório.';
  }

  if (field === 'email' && !EMAIL_REGEX.test(trimmedValue)) {
    return 'Informe um e-mail válido.';
  }

  if (field === 'telefone' && getPhoneDigits(trimmedValue).length < MIN_PHONE_DIGITS) {
    return 'Informe um telefone válido.';
  }

  return undefined;
};

export const validateContactForm = (formData: ContactFormData): ContactFormErrors => {
  const fields: Array<keyof ContactFormData> = [
    'nome',
    'empresa',
    'cargo',
    'email',
    'telefone',
    'mensagem',
  ];

  return fields.reduce<ContactFormErrors>((errors, field) => {
    const error = validateContactField(field, formData[field]);

    if (error) {
      errors[field] = error;
    }

    return errors;
  }, {});
};

export const hasContactFormErrors = (errors: ContactFormErrors): boolean => {
  return Object.keys(errors).length > 0;
};
