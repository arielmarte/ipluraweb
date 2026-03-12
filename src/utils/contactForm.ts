import {
  CONTACT_EMAIL_REGEX,
  CONTACT_MESSAGE_MAX_LENGTH,
  CONTACT_PHONE_MAX_DIGITS,
  CONTACT_PHONE_MIN_DIGITS,
  CONTACT_REQUIRED_FIELDS,
  type ContactField,
  type ContactFormData,
  type ContactFormErrors,
} from '@/lib/contact-contract';

export type ContactFormStatus = 'idle' | 'loading' | 'success' | 'error' | 'unavailable';
export type { ContactFormErrors };
export { CONTACT_MESSAGE_MAX_LENGTH };

const getPhoneDigits = (value: string) => value.replace(/\D/g, '').slice(0, CONTACT_PHONE_MAX_DIGITS);

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
  field: ContactField,
  value: string
): string | undefined => {
  const trimmedValue = value.trim();

  if (!trimmedValue) {
    return 'Campo obrigatório.';
  }

  if (field === 'email' && !CONTACT_EMAIL_REGEX.test(trimmedValue)) {
    return 'Informe um e-mail válido.';
  }

  if (field === 'telefone' && getPhoneDigits(trimmedValue).length < CONTACT_PHONE_MIN_DIGITS) {
    return 'Informe um telefone válido.';
  }

  if (field === 'mensagem' && trimmedValue.length > CONTACT_MESSAGE_MAX_LENGTH) {
    return `A mensagem deve ter no máximo ${CONTACT_MESSAGE_MAX_LENGTH} caracteres.`;
  }

  return undefined;
};

export const validateContactForm = (formData: ContactFormData): ContactFormErrors => {
  return CONTACT_REQUIRED_FIELDS.reduce<ContactFormErrors>((errors, field) => {
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
