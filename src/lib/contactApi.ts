import type { ContactFormErrors, ContactRequestPayload } from '@/lib/contact-contract';

export type ContactApiPayload = ContactRequestPayload;

export type ContactApiErrorCode = 'unavailable' | 'error' | 'validation';

type ContactApiResponseBody = {
  code?: string;
  errors?: ContactFormErrors;
};

const CONTACT_REQUEST_TIMEOUT_MS = 15000;

export class ContactApiError extends Error {
  code: ContactApiErrorCode;
  fieldErrors?: ContactFormErrors;

  constructor(code: ContactApiErrorCode, fieldErrors?: ContactFormErrors) {
    super(code);
    this.code = code;
    this.fieldErrors = fieldErrors;
  }
}

const parseErrorBody = async (response: Response): Promise<ContactApiResponseBody | null> => {
  try {
    return (await response.json()) as ContactApiResponseBody;
  } catch {
    return null;
  }
};

const isUnavailableResponse = (
  response: Response,
  responseBody: ContactApiResponseBody | null
) => {
  return (
    response.status === 503 ||
    response.status === 429 ||
    responseBody?.code === 'unavailable' ||
    responseBody?.code === 'rate_limited'
  );
};

export const submitEmailContact = async (formData: ContactApiPayload) => {
  const controller = new AbortController();
  const timeoutId = window.setTimeout(() => {
    controller.abort();
  }, CONTACT_REQUEST_TIMEOUT_MS);

  let response: Response;

  try {
    response = await fetch('/api/contact', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
      signal: controller.signal,
    });
  } catch (error) {
    if (error instanceof DOMException && error.name === 'AbortError') {
      throw new ContactApiError('error');
    }
    throw error;
  } finally {
    window.clearTimeout(timeoutId);
  }

  if (response.ok) {
    return;
  }

  const responseBody = await parseErrorBody(response);

  if (responseBody?.code === 'validation_error' && responseBody.errors) {
    throw new ContactApiError('validation', responseBody.errors);
  }

  if (isUnavailableResponse(response, responseBody)) {
    throw new ContactApiError('unavailable');
  }

  throw new ContactApiError('error');
};
