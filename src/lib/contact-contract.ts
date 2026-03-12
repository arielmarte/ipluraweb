export const CONTACT_FIELDS = ['nome', 'empresa', 'cargo', 'email', 'telefone', 'mensagem'] as const;

export type ContactField = (typeof CONTACT_FIELDS)[number];

export type ContactFormData = Record<ContactField, string>;

export type ContactRequestPayload = Partial<ContactFormData> & {
  website?: string;
};

export type ContactFormErrors = Partial<Record<ContactField, string>>;

export const CONTACT_REQUIRED_FIELDS: ContactField[] = [...CONTACT_FIELDS];

export const CONTACT_EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
export const CONTACT_PHONE_MIN_DIGITS = 10;
export const CONTACT_PHONE_MAX_DIGITS = 11;
export const CONTACT_MESSAGE_MAX_LENGTH = 2000;
