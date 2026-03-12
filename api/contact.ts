import { Resend } from 'resend';
import { checkBotId } from 'botid/server';

type ContactPayload = {
  nome?: string;
  empresa?: string;
  cargo?: string;
  email?: string;
  telefone?: string;
  mensagem?: string;
  website?: string;
};

type ValidationErrors = Partial<Record<keyof Omit<ContactPayload, 'website'>, string>>;

type ApiRequest = {
  method?: string;
  body?: unknown;
};

type ApiResponse = {
  status: (code: number) => ApiResponse;
  setHeader: (name: string, value: string) => void;
  json: (body: unknown) => void;
};

const REQUIRED_FIELDS: Array<keyof Omit<ContactPayload, 'website'>> = [
  'nome',
  'empresa',
  'cargo',
  'email',
  'telefone',
  'mensagem',
];

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
const MIN_PHONE_DIGITS = 10;

const toSafeString = (value: unknown) => (typeof value === 'string' ? value.trim() : '');

const parsePayload = (body: unknown): ContactPayload => {
  if (typeof body === 'string') {
    try {
      const parsed = JSON.parse(body);
      return typeof parsed === 'object' && parsed !== null ? (parsed as ContactPayload) : {};
    } catch {
      return {};
    }
  }

  return typeof body === 'object' && body !== null ? (body as ContactPayload) : {};
};

const escapeHtml = (value: string) =>
  value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');

const validatePayload = (payload: ContactPayload): ValidationErrors => {
  const errors: ValidationErrors = {};

  for (const field of REQUIRED_FIELDS) {
    const value = toSafeString(payload[field]);

    if (!value) {
      errors[field] = 'Campo obrigatório.';
      continue;
    }

    if (field === 'email' && !EMAIL_REGEX.test(value)) {
      errors[field] = 'Informe um e-mail válido.';
      continue;
    }

    if (field === 'telefone') {
      const digits = value.replace(/\D/g, '');
      if (digits.length < MIN_PHONE_DIGITS) {
        errors[field] = 'Informe um telefone válido.';
      }
    }
  }

  return errors;
};

const hasValidationErrors = (errors: ValidationErrors) => Object.keys(errors).length > 0;

const buildEmailHtml = (payload: Required<Omit<ContactPayload, 'website'>>) => {
  const fields: Array<{ label: string; value: string }> = [
    { label: 'Nome', value: payload.nome },
    { label: 'Empresa', value: payload.empresa },
    { label: 'Cargo', value: payload.cargo },
    { label: 'E-mail', value: payload.email },
    { label: 'Telefone', value: payload.telefone },
    { label: 'Mensagem', value: payload.mensagem },
  ];

  const rows = fields
    .map(
      ({ label, value }) =>
        `<tr><td style="padding:8px 0;font-weight:600;color:#1A1C2E;vertical-align:top;">${label}</td><td style="padding:8px 0;color:#334155;">${escapeHtml(
          value
        )}</td></tr>`
    )
    .join('');

  return `
    <div style="font-family:Manrope,Arial,sans-serif;max-width:640px;margin:0 auto;color:#1A1C2E;">
      <h2 style="margin:0 0 16px;font-size:20px;line-height:1.3;">Novo contato pelo site IPLURA</h2>
      <p style="margin:0 0 20px;color:#475569;line-height:1.6;">
        Mensagem enviada pelo formulário institucional.
      </p>
      <table style="width:100%;border-collapse:collapse;">
        <tbody>${rows}</tbody>
      </table>
    </div>
  `;
};

const normalizePayload = (payload: ContactPayload): Required<Omit<ContactPayload, 'website'>> => ({
  nome: toSafeString(payload.nome),
  empresa: toSafeString(payload.empresa),
  cargo: toSafeString(payload.cargo),
  email: toSafeString(payload.email),
  telefone: toSafeString(payload.telefone),
  mensagem: toSafeString(payload.mensagem),
});

export default async function handler(req: ApiRequest, res: ApiResponse) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    res.status(405).json({ ok: false, code: 'method_not_allowed' });
    return;
  }

  const payload = parsePayload(req.body);

  if (toSafeString(payload.website)) {
    res.status(200).json({ ok: true });
    return;
  }

  const normalizedPayload = normalizePayload(payload);
  const validationErrors = validatePayload(normalizedPayload);

  if (hasValidationErrors(validationErrors)) {
    res.status(400).json({
      ok: false,
      code: 'validation_error',
      errors: validationErrors,
    });
    return;
  }

  try {
    const verification = await checkBotId();
    if (verification.isBot) {
      res.status(403).json({
        ok: false,
        code: 'blocked',
        message: 'Não foi possível processar sua solicitação no momento.',
      });
      return;
    }
  } catch {
    if (process.env.NODE_ENV === 'production') {
      res.status(503).json({
        ok: false,
        code: 'unavailable',
      });
      return;
    }
  }

  const apiKey = process.env.RESEND_API_KEY;
  const emailFrom = process.env.FORM_EMAIL_FROM;
  const emailTo = process.env.FORM_EMAIL_TO;

  if (!apiKey || !emailFrom || !emailTo) {
    res.status(503).json({
      ok: false,
      code: 'unavailable',
    });
    return;
  }

  const resend = new Resend(apiKey);
  const toList = emailTo
    .split(',')
    .map((value) => value.trim())
    .filter(Boolean);

  try {
    const result = await resend.emails.send({
      from: emailFrom,
      to: toList,
      subject: 'Novo contato pelo site IPLURA',
      replyTo: normalizedPayload.email,
      html: buildEmailHtml(normalizedPayload),
    });

    if (result.error) {
      throw new Error(result.error.message);
    }

    res.status(200).json({ ok: true });
  } catch {
    res.status(500).json({
      ok: false,
      code: 'send_failed',
    });
  }
}
