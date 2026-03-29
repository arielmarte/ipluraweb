# IPLURA Web

Aplicação React (SPA) para site institucional, com páginas legais e formulário de contato integrado.

## O que este projeto entrega

- Página institucional onepage.
- Rotas legais:
  - `/termos-de-uso`
  - `/politica-de-privacidade`
- Rota de cartão em server-side:
  - `/cartao` (Vercel Function com redirect HTTP 307)
- Endpoint server-side de contato em `/api/contact` (Resend).
- Integração de contato por WhatsApp.
- SEO técnico básico (canonical, Open Graph, JSON-LD, sitemap e robots).

## Stack

- React 19 + TypeScript + Vite
- Tailwind CSS
- GSAP (animações)
- Vercel Functions
- Resend (envio de e-mail)
- BotID + honeypot + rate limit (proteção anti-abuso)

## Estrutura principal

```txt
api/                 # Funções serverless
public/              # Arquivos estáticos, SEO e 404 fallback
scripts/             # Scripts de build (ex.: sitemap)
src/
  content/           # Conteúdo textual centralizado
  sections/          # Seções da onepage
  pages/             # Páginas legais
  features/contact/  # Fluxo do formulário de contato
  lib/ utils/        # Helpers compartilhados
```

## Requisitos

- Node `24.x`
- npm `>=10`

## Setup local

```bash
nvm use 24
npm install
npm run dev
```

Aplicação local: `http://localhost:5173`

## Scripts úteis

- `npm run dev` inicia desenvolvimento
- `npm run lint` valida código
- `npm run typecheck:api` valida tipagem da API
- `npm run build` gera build de produção
- `npm run preview` sobe preview local do build

## Variáveis de ambiente

Baseie-se no `.env.example`:

- `VITE_WHATSAPP_PHONE`
- `CARD_DESTINATION_URL` (URL destino para o fluxo do cartão em `/cartao`)
- `FORM_EMAIL_FROM`
- `FORM_EMAIL_TO`
- `RESEND_API_KEY`

Nunca versionar segredos no repositório.

## Fluxo de contato (resumo)

1. Front envia formulário para `POST /api/contact`.
2. API valida payload e aplica proteção:
   - honeypot
   - validação server-side
   - rate limit
   - BotID (fail-open em falha de infraestrutura)
3. API envia e-mail via Resend e retorna status para o front.

## Fluxo do cartão `/cartao` (resumo)

1. Acessar `https://iplura.org/cartao`.
2. `vercel.json` faz rewrite para `/api/cartao`.
3. A Function valida o destino e retorna `307 Temporary Redirect` com `Location`.
4. O destino vem de `CARD_DESTINATION_URL` (fallback para home se ausente/inválido).

## Deploy

- Plataforma alvo: Vercel.
- Configurações de roteamento/headers em `vercel.json`.
- `404.html` em `public/` redireciona para `/`.
- Ajuste as variáveis de ambiente no painel da Vercel por ambiente.

## Observações para manutenção

- O projeto não usa React Router; as páginas legais são resolvidas pela URL atual no `App`.
- A rota `/cartao` não passa pelo React; é atendida diretamente por Vercel Function.
- Conteúdo institucional deve ser alterado prioritariamente em `src/content`.
- Sempre valide `lint`, `typecheck:api` e `build` antes de publicar.
