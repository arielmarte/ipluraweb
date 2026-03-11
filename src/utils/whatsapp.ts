export type ContactFormData = {
  nome: string;
  empresa: string;
  cargo: string;
  email: string;
  telefone: string;
  mensagem: string;
};

const WHATSAPP_PHONE = '5562985464200';
export const EMPTY_CONTACT_FORM_DATA: ContactFormData = {
  nome: '',
  empresa: '',
  cargo: '',
  email: '',
  telefone: '',
  mensagem: '',
};

const FIELD_DEFINITIONS: Array<{ key: keyof ContactFormData; label: string }> = [
  { key: 'nome', label: 'Nome' },
  { key: 'empresa', label: 'Empresa' },
  { key: 'cargo', label: 'Cargo' },
  { key: 'email', label: 'E-mail' },
  { key: 'telefone', label: 'Telefone' },
  { key: 'mensagem', label: 'Mensagem' },
];

const normalizeValue = (value: string) => value.trim();

export const buildWhatsappMessage = (formData: ContactFormData): string => {
  const filledLines = FIELD_DEFINITIONS.flatMap(({ key, label }) => {
    const value = normalizeValue(formData[key]);
    return value ? [`${label}: ${value}`] : [];
  });

  const lines = ['Olá, vim pelo site do IPLURA.'];

  if (filledLines.length > 0) {
    lines.push('', ...filledLines);
  }

  return lines.join('\n');
};

export const buildWhatsappUrl = (formData: ContactFormData = EMPTY_CONTACT_FORM_DATA): string => {
  const message = buildWhatsappMessage(formData);
  return `https://api.whatsapp.com/send?phone=${WHATSAPP_PHONE}&text=${encodeURIComponent(message)}`;
};
