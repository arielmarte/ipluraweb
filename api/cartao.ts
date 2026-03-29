import type { VercelRequest, VercelResponse } from '@vercel/node';

const FALLBACK_URL = 'https://iplura.org/';
const ALLOWED_PROTOCOLS = new Set(['http:', 'https:']);

const resolveDestinationUrl = (value: string | undefined, nodeEnv: string | undefined) => {
  const candidate = value?.trim();

  if (!candidate) {
    return FALLBACK_URL;
  }

  try {
    const parsedUrl = new URL(candidate);

    if (!ALLOWED_PROTOCOLS.has(parsedUrl.protocol)) {
      return FALLBACK_URL;
    }

    if (nodeEnv === 'production' && parsedUrl.protocol !== 'https:') {
      return FALLBACK_URL;
    }

    return parsedUrl.toString();
  } catch {
    return FALLBACK_URL;
  }
};

export default function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'GET' && req.method !== 'HEAD') {
    res.setHeader('Allow', 'GET, HEAD');
    res.status(405).json({ ok: false, code: 'method_not_allowed' });
    return;
  }

  const destinationUrl = resolveDestinationUrl(
    process.env.CARD_DESTINATION_URL,
    process.env.NODE_ENV
  );

  res.setHeader('Cache-Control', 'no-store, max-age=0');
  res.setHeader('X-Robots-Tag', 'noindex, nofollow');
  res.setHeader('Location', destinationUrl);
  res.status(307).end();
}
