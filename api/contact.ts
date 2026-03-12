import { Resend } from 'resend';
import { checkBotId } from 'botid/server';
import {
  buildContactEmailHtml,
  buildContactEmailSubject,
  buildContactEmailText,
} from './_lib/contactEmail.js';

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
  } catch (error) {
    // Fail-open for BotID infra/config issues so legitimate contacts are not blocked.
    // Bot traffic is still blocked when BotID returns `isBot: true`.
    console.warn('[contact] BotID check failed, continuing without bot verdict:', error);
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
    const subject = buildContactEmailSubject(normalizedPayload);
    const html = buildContactEmailHtml(normalizedPayload);
    const text = buildContactEmailText(normalizedPayload);

    const result = await resend.emails.send({
      from: emailFrom,
      to: toList,
      subject,
      replyTo: normalizedPayload.email,
      html,
      text,
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
