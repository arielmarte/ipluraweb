# IPLURA Website

Site institucional onepage do IPLURA, com páginas legais e fluxo de contato integrado (E-mail + WhatsApp), desenvolvido em React + TypeScript e hospedado na Vercel.

## Visão geral

- SPA institucional com seções de apresentação, credenciais, FAQ e contato.
- Páginas legais:
  - `/termos-de-uso`
  - `/politica-de-privacidade`
- Formulário de contato com envio server-side via Resend.
- Proteção anti-bot com honeypot + Vercel BotID (modo basic) + rate limit por IP.
- Preview social e metadados SEO configurados para produção em `https://iplura.org`.

## Stack

- React 19
- TypeScript (strict)
- Vite 7
- Tailwind CSS 3 + PostCSS + Autoprefixer
- GSAP + ScrollTrigger
- Lucide React
- shadcn/ui + Radix UI
- Vercel Functions (`/api/contact`)
- Resend
- BotID
- Vercel Analytics

## Estrutura de pastas

```txt
api/                 # Funções serverless (contato)
public/              # Assets estáticos, robots e sitemap
scripts/             # Scripts utilitários (geração de sitemap)
src/
  components/        # Componentes reutilizáveis (inclui ui/)
  config/            # Configurações centralizadas (ex.: navegação)
  content/           # Conteúdo institucional centralizado
  lib/               # Helpers de domínio e integrações
  pages/             # Páginas legais
  sections/          # Seções da onepage
  utils/             # Utilitários gerais (form, whatsapp etc.)
```

## Requisitos

- Node.js `24.x` (recomendado para manter paridade com o deploy)
- npm 10+

## Como rodar localmente

```bash
nvm use 24
npm install
npm run dev
```

App local: `http://localhost:5173`

## Scripts disponíveis

- `npm run dev`: inicia ambiente de desenvolvimento
- `npm run build`: type-check + build de produção
- `npm run preview`: pré-visualiza build local
- `npm run lint`: executa ESLint

## Variáveis de ambiente

Use `.env.example` como referência:

- `VITE_WHATSAPP_PHONE`
- `FORM_EMAIL_FROM`
- `FORM_EMAIL_TO`
- `RESEND_API_KEY`

Observações:
- Nunca comitar `.env` com valores reais.
- Variáveis server-side devem ser configuradas também no painel da Vercel.

## Fluxo de contato (resumo técnico)

1. Front-end valida campos obrigatórios e envia `POST /api/contact`.
2. API processa na ordem:
   - Honeypot (`website`)
   - Validação server-side
   - Rate limit por IP/fingerprint (5 requisições por 10 minutos)
   - Verificação BotID (`fail-open` em falhas de infraestrutura)
   - Envio via Resend
3. A API retorna códigos padronizados para o front-end:
   - `200` sucesso
   - `400` `validation_error`
   - `429` `rate_limited` (+ header `Retry-After`)
   - `503` `unavailable`
   - `500` `send_failed`

## SEO e metadados

- Canonical de produção: `https://iplura.org`
- Open Graph/Twitter com `iplura-og.png`
- `robots.txt` e `sitemap.xml` em `public/`
- JSON-LD (Organization, WebSite, WebPage e FAQPage) em `index.html`

## Deploy (Vercel)

- Deploy principal em `iplura.org`
- Regras de noindex para previews `*.vercel.app`
- Rewrites configurados para páginas legais e BotID em `vercel.json`
- Variáveis de ambiente devem ser definidas por ambiente (Production/Preview/Development)
