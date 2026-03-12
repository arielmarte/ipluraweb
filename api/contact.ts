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

type HeaderValue = string | string[] | undefined;

type ApiRequest = {
  method?: string;
  body?: unknown;
  headers?: Record<string, HeaderValue>;
  socket?: {
    remoteAddress?: string;
  };
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
const MAX_MESSAGE_LENGTH = 2000;
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000;
const RATE_LIMIT_MAX_REQUESTS = 5;
const RATE_LIMIT_MAX_ENTRIES = 5000;

type RateLimitEntry = {
  count: number;
  resetAt: number;
};

const rateLimitStore = new Map<string, RateLimitEntry>();

const toSafeString = (value: unknown) => (typeof value === 'string' ? value.trim() : '');

const getHeader = (req: ApiRequest, name: string) => {
  const value = req.headers?.[name] ?? req.headers?.[name.toLowerCase()];

  if (Array.isArray(value)) {
    return value[0] ?? '';
  }

  return typeof value === 'string' ? value : '';
};

const getClientFingerprint = (req: ApiRequest) => {
  const forwardedFor = getHeader(req, 'x-forwarded-for')
    .split(',')
    .map((value) => value.trim())
    .find(Boolean);
  const vercelForwardedFor = getHeader(req, 'x-vercel-forwarded-for')
    .split(',')
    .map((value) => value.trim())
    .find(Boolean);
  const realIp = getHeader(req, 'x-real-ip').trim();
  const socketIp = toSafeString(req.socket?.remoteAddress);
  const ip = forwardedFor || vercelForwardedFor || realIp || socketIp || 'unknown';
  const userAgent = getHeader(req, 'user-agent').trim().slice(0, 160);

  return `${ip}|${userAgent || 'unknown'}`;
};

const cleanupRateLimitStore = (now: number) => {
  if (rateLimitStore.size < RATE_LIMIT_MAX_ENTRIES) {
    return;
  }

  for (const [key, entry] of rateLimitStore.entries()) {
    if (entry.resetAt <= now) {
      rateLimitStore.delete(key);
    }
  }

  if (rateLimitStore.size <= RATE_LIMIT_MAX_ENTRIES) {
    return;
  }

  const overflow = rateLimitStore.size - RATE_LIMIT_MAX_ENTRIES;
  let removed = 0;

  for (const key of rateLimitStore.keys()) {
    rateLimitStore.delete(key);
    removed += 1;

    if (removed >= overflow) {
      break;
    }
  }
};

const getRateLimitDecision = (fingerprint: string, now = Date.now()) => {
  cleanupRateLimitStore(now);

  const entry = rateLimitStore.get(fingerprint);

  if (!entry || entry.resetAt <= now) {
    rateLimitStore.set(fingerprint, {
      count: 1,
      resetAt: now + RATE_LIMIT_WINDOW_MS,
    });
    return { isLimited: false, retryAfterSec: 0 };
  }

  if (entry.count >= RATE_LIMIT_MAX_REQUESTS) {
    return {
      isLimited: true,
      retryAfterSec: Math.max(1, Math.ceil((entry.resetAt - now) / 1000)),
    };
  }

  entry.count += 1;
  return { isLimited: false, retryAfterSec: 0 };
};

const sendJson = (
  res: ApiResponse,
  statusCode: number,
  body: unknown,
  headers: Record<string, string> = {}
) => {
  for (const [name, value] of Object.entries(headers)) {
    res.setHeader(name, value);
  }

  res.status(statusCode).json(body);
};

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

    if (field === 'mensagem' && value.length > MAX_MESSAGE_LENGTH) {
      errors[field] = `A mensagem deve ter no máximo ${MAX_MESSAGE_LENGTH} caracteres.`;
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
    sendJson(
      res,
      405,
      { ok: false, code: 'method_not_allowed' },
      {
        Allow: 'POST',
      }
    );
    return;
  }

  const payload = parsePayload(req.body);

  if (toSafeString(payload.website)) {
    sendJson(res, 200, { ok: true });
    return;
  }

  const normalizedPayload = normalizePayload(payload);
  const validationErrors = validatePayload(normalizedPayload);

  if (hasValidationErrors(validationErrors)) {
    sendJson(res, 400, {
      ok: false,
      code: 'validation_error',
      errors: validationErrors,
    });
    return;
  }

  const fingerprint = getClientFingerprint(req);
  const rateLimitDecision = getRateLimitDecision(fingerprint);

  if (rateLimitDecision.isLimited) {
    sendJson(
      res,
      429,
      {
        ok: false,
        code: 'rate_limited',
        retryAfterSec: rateLimitDecision.retryAfterSec,
      },
      {
        'Retry-After': String(rateLimitDecision.retryAfterSec),
      }
    );
    return;
  }

  try {
    const verification = await checkBotId();
    if (verification.isBot) {
      sendJson(res, 403, {
        ok: false,
        code: 'blocked',
        message: 'Não foi possível processar sua solicitação no momento.',
      });
      return;
    }
  } catch {
    // Fail-open: do not block legitimate contacts on BotID infra/config issues.
    console.warn('[contact] BotID check failed; continuing in fail-open mode.');
  }

  const apiKey = process.env.RESEND_API_KEY;
  const emailFrom = process.env.FORM_EMAIL_FROM;
  const emailTo = process.env.FORM_EMAIL_TO;

  if (!apiKey || !emailFrom || !emailTo) {
    sendJson(res, 503, {
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

    sendJson(res, 200, { ok: true });
  } catch {
    console.error('[contact] Email send failed.');
    sendJson(res, 500, {
      ok: false,
      code: 'send_failed',
    });
  }
}
