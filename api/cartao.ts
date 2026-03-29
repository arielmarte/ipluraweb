import type { VercelRequest, VercelResponse } from '@vercel/node';

const FALLBACK_URL = 'https://iplura.org/';
const ONE_SECOND_REFRESH_DELAY_SECONDS = 1;
const ALLOWED_PROTOCOLS = new Set(['http:', 'https:']);

const escapeHtml = (value: string) =>
  value
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');

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

const buildHtmlResponse = (destinationUrl: string) => {
  const safeDestinationUrl = escapeHtml(destinationUrl);
  const refreshContent = `${ONE_SECOND_REFRESH_DELAY_SECONDS};url=${safeDestinationUrl}`;
  const destinationHost = new URL(destinationUrl).hostname.replace(/^www\./, '');
  const safeDestinationHost = escapeHtml(destinationHost);

  return `<!doctype html>
<html lang="pt-BR">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover" />
    <meta http-equiv="refresh" content="${refreshContent}" />
    <meta name="robots" content="noindex, nofollow" />
    <title>IPLURA | Redirecionando</title>
    <style>
      :root {
        color-scheme: light;
      }

      * {
        box-sizing: border-box;
      }

      body {
        margin: 0;
        min-height: 100svh;
        display: grid;
        place-items: center;
        padding: 24px;
        font-family: "Manrope", "Segoe UI", Arial, sans-serif;
        color: #1a1c2e;
        background:
          radial-gradient(120% 120% at 8% 0%, rgba(65, 35, 122, 0.17) 0%, rgba(65, 35, 122, 0) 60%),
          radial-gradient(100% 90% at 98% 100%, rgba(109, 42, 167, 0.16) 0%, rgba(109, 42, 167, 0) 65%),
          linear-gradient(160deg, #f8f9fe 0%, #f2f5ff 100%);
      }

      .card {
        width: min(100%, 460px);
        border-radius: 20px;
        border: 1px solid rgba(26, 28, 46, 0.09);
        background: rgba(255, 255, 255, 0.94);
        box-shadow: 0 20px 54px rgba(16, 24, 40, 0.12);
        backdrop-filter: blur(8px);
        padding: 26px 24px 24px;
      }

      .logo {
        width: 144px;
        height: auto;
        display: block;
      }

      h1 {
        margin: 16px 0 8px;
        font-size: 1.38rem;
        line-height: 1.28;
        letter-spacing: -0.024em;
      }

      .eyebrow {
        margin: 14px 0 0;
        display: inline-flex;
        align-items: center;
        gap: 8px;
        padding: 6px 10px;
        border-radius: 999px;
        font-size: 0.74rem;
        font-weight: 700;
        letter-spacing: 0.08em;
        text-transform: uppercase;
        color: #41237a;
        background: rgba(65, 35, 122, 0.1);
        border: 1px solid rgba(65, 35, 122, 0.18);
      }

      .eyebrow-dot {
        width: 7px;
        height: 7px;
        border-radius: 50%;
        background: #6d2aa7;
      }

      p {
        margin: 0;
        color: rgba(26, 28, 46, 0.74);
        line-height: 1.55;
      }

      .description {
        margin-top: 6px;
      }

      .helper {
        margin-top: 12px;
        font-size: 0.92rem;
      }

      .destination {
        margin-top: 14px;
        padding: 10px 12px;
        border-radius: 12px;
        border: 1px solid rgba(65, 35, 122, 0.14);
        background: rgba(255, 255, 255, 0.86);
        font-size: 0.84rem;
        color: rgba(26, 28, 46, 0.77);
      }

      .destination b {
        color: #41237a;
      }

      .actions {
        margin-top: 16px;
        display: flex;
        flex-direction: column;
        gap: 10px;
      }

      .button {
        text-decoration: none;
        border-radius: 11px;
        border: 1px solid transparent;
        font-weight: 700;
        padding: 12px 14px;
        font-size: 0.95rem;
        line-height: 1;
        text-align: center;
        transition: transform 0.18s ease, box-shadow 0.18s ease, background-color 0.18s ease, border-color 0.18s ease;
      }

      .button:focus-visible {
        outline: 2px solid #6d2aa7;
        outline-offset: 2px;
      }

      .button-primary {
        color: #fff;
        background: linear-gradient(135deg, #41237a 0%, #6d2aa7 100%);
        box-shadow: 0 8px 20px rgba(65, 35, 122, 0.32);
      }

      .button-primary:hover {
        background: #6d2aa7;
      }

      .button-secondary {
        color: #1a1c2e;
        border-color: rgba(65, 35, 122, 0.24);
        background: rgba(255, 255, 255, 0.92);
      }

      .button-secondary:hover {
        border-color: rgba(109, 42, 167, 0.42);
        background: rgba(255, 255, 255, 0.98);
      }

      .button:hover {
        transform: translateY(-1px);
      }
    </style>
  </head>
  <body>
    <main class="card" role="main" aria-live="polite">
      <img src="/iplura-logo-icon-wordmark.svg" alt="IPLURA" class="logo" />
      <p class="eyebrow"><span class="eyebrow-dot"></span> Acesso por QR Code</p>
      <h1>Conteúdo do cartão IPLURA</h1>
      <p class="description">Estamos abrindo o conteúdo para você.</p>
      <p class="helper">Se não abrir automaticamente, use o botão abaixo.</p>
      <p class="destination">Destino: <b>${safeDestinationHost}</b></p>
      <div class="actions">
        <a class="button button-primary" href="${safeDestinationUrl}" rel="nofollow noopener">Acessar conteúdo</a>
        <a class="button button-secondary" href="https://iplura.org/" rel="nofollow">Conhecer o site IPLURA</a>
      </div>
    </main>

    <script>
      window.setTimeout(function () {
        window.location.replace(${JSON.stringify(destinationUrl)});
      }, ${ONE_SECOND_REFRESH_DELAY_SECONDS * 1000});
    </script>
  </body>
</html>
`;
};

export default function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'GET') {
    res.setHeader('Allow', 'GET');
    res.status(405).json({ ok: false, code: 'method_not_allowed' });
    return;
  }

  const destinationUrl = resolveDestinationUrl(
    process.env.CARD_DESTINATION_URL,
    process.env.NODE_ENV
  );

  res.setHeader('Content-Type', 'text/html; charset=utf-8');
  res.setHeader('Cache-Control', 'no-store, max-age=0');
  res.setHeader('X-Robots-Tag', 'noindex, nofollow');
  res.status(200).send(buildHtmlResponse(destinationUrl));
}
