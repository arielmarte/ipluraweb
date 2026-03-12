export type ContactEmailPayload = {
  nome: string;
  empresa: string;
  cargo: string;
  email: string;
  telefone: string;
  mensagem: string;
};

const WHATSAPP_LOCAL_MIN_DIGITS = 10;
const WHATSAPP_LOCAL_MAX_DIGITS = 11;
const WHATSAPP_INTERNATIONAL_MIN_DIGITS = 12;
const WHATSAPP_INTERNATIONAL_MAX_DIGITS = 15;
const IPLURA_REPLY_SUBJECT = 'Retorno ao seu contato com o IPLURA';

const escapeHtml = (value: string) =>
  value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');

const toSingleLine = (value: string) => value.trim().replace(/\s+/g, ' ');

const getFirstName = (name: string) => {
  const firstName = toSingleLine(name).split(' ')[0];
  return firstName || 'Contato';
};

const buildSubjectIdentifier = (date = new Date()) => {
  const year = String(date.getFullYear()).slice(-2);
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');

  return `${year}${month}${day}-${hours}${minutes}`;
};

const formatReceivedAt = (date = new Date()) => {
  return new Intl.DateTimeFormat('pt-BR', {
    dateStyle: 'short',
    timeStyle: 'short',
    timeZone: 'America/Sao_Paulo',
  }).format(date);
};

const normalizePhoneDigits = (value: string) => value.replace(/\D/g, '');

export const buildReplyMailtoLink = (email: string) => {
  const safeEmail = toSingleLine(email);

  if (!safeEmail) {
    return null;
  }

  const query = new URLSearchParams({
    subject: IPLURA_REPLY_SUBJECT,
  });

  return `mailto:${safeEmail}?${query.toString()}`;
};

const resolveWhatsAppPhone = (phone: string) => {
  const digits = normalizePhoneDigits(phone);

  if (digits.length >= WHATSAPP_LOCAL_MIN_DIGITS && digits.length <= WHATSAPP_LOCAL_MAX_DIGITS) {
    return `55${digits}`;
  }

  if (
    digits.length >= WHATSAPP_INTERNATIONAL_MIN_DIGITS &&
    digits.length <= WHATSAPP_INTERNATIONAL_MAX_DIGITS
  ) {
    return digits;
  }

  return null;
};

export const buildWhatsAppQuickLink = (payload: ContactEmailPayload) => {
  const normalizedPhone = resolveWhatsAppPhone(payload.telefone);

  if (!normalizedPhone) {
    return null;
  }

  const message = `Olá, ${getFirstName(payload.nome)}. Recebemos seu contato pelo site do IPLURA e vamos dar sequência ao atendimento.`;

  return `https://wa.me/${normalizedPhone}?text=${encodeURIComponent(message)}`;
};

export const buildContactEmailSubject = (payload: ContactEmailPayload) => {
  const firstName = getFirstName(payload.nome);
  const company = toSingleLine(payload.empresa);
  const companyPart = company ? `, da ${company}` : '';

  return `Novo contato de ${firstName}${companyPart} pelo site do IPLURA · ${buildSubjectIdentifier()}`;
};

export const buildContactEmailText = (payload: ContactEmailPayload) => {
  const lines = [
    'Novo contato pelo site IPLURA',
    '',
    `Nome: ${payload.nome}`,
    `Empresa: ${payload.empresa}`,
    `Cargo: ${payload.cargo}`,
    `E-mail: ${payload.email}`,
    `Telefone: ${payload.telefone}`,
    'Mensagem:',
    payload.mensagem,
    '',
    `Recebido em: ${formatReceivedAt()}`,
  ];

  return lines.join('\n');
};

export const buildContactEmailHtml = (payload: ContactEmailPayload) => {
  const replyMailtoLink = buildReplyMailtoLink(payload.email);
  const whatsappQuickLink = buildWhatsAppQuickLink(payload);
  const escapedMessage = escapeHtml(payload.mensagem).replace(/\n/g, '<br/>');

  return `
    <div style="margin:0;padding:24px;background:#F4F6FC;font-family:Manrope,Arial,sans-serif;color:#1A1C2E;">
      <div style="max-width:680px;margin:0 auto;background:#FFFFFF;border:1px solid #E2E8F0;border-radius:16px;overflow:hidden;">
        <div style="padding:24px 24px 20px;background:linear-gradient(135deg,#F8F9FE 0%,#F1EDFA 100%);border-bottom:1px solid #E2E8F0;">
          <h1 style="margin:0 0 8px;font-size:22px;line-height:1.3;color:#1A1C2E;">Novo contato para atendimento</h1>
          <p style="margin:0;font-size:14px;line-height:1.65;color:#475569;">Mensagem recebida pelo formulário institucional do site do IPLURA.</p>
        </div>

        <div style="padding:20px 24px 4px;">
          <div style="padding:14px 16px;background:#F8F9FE;border:1px solid #E2E8F0;border-radius:12px;">
            <p style="margin:0 0 4px;font-size:11px;font-weight:700;letter-spacing:0.08em;text-transform:uppercase;color:#64748B;">Nome</p>
            <p style="margin:0;font-size:18px;font-weight:700;line-height:1.35;color:#1A1C2E;">${escapeHtml(payload.nome)}</p>
          </div>

          <div style="height:10px;line-height:10px;font-size:10px;">&nbsp;</div>

          <div style="padding:14px 16px;background:#FFFFFF;border:1px solid #E2E8F0;border-radius:12px;">
            <p style="margin:0 0 4px;font-size:11px;font-weight:700;letter-spacing:0.08em;text-transform:uppercase;color:#64748B;">Empresa</p>
            <p style="margin:0;font-size:16px;font-weight:600;line-height:1.45;color:#1A1C2E;">${escapeHtml(payload.empresa)}</p>
          </div>

          <div style="height:10px;line-height:10px;font-size:10px;">&nbsp;</div>

          <table role="presentation" style="width:100%;border-collapse:separate;border-spacing:0 10px;">
            <tbody>
              <tr>
                <td style="vertical-align:top;width:50%;padding-right:5px;">
                  <div style="padding:12px 14px;background:#FFFFFF;border:1px solid #E2E8F0;border-radius:12px;">
                    <p style="margin:0 0 4px;font-size:11px;font-weight:700;letter-spacing:0.08em;text-transform:uppercase;color:#64748B;">E-mail</p>
                    <p style="margin:0;font-size:14px;line-height:1.5;color:#1A1C2E;word-break:break-word;">
                      <a href="mailto:${escapeHtml(payload.email)}" style="color:#2D5DA8;text-decoration:none;">${escapeHtml(payload.email)}</a>
                    </p>
                  </div>
                </td>
                <td style="vertical-align:top;width:50%;padding-left:5px;">
                  <div style="padding:12px 14px;background:#FFFFFF;border:1px solid #E2E8F0;border-radius:12px;">
                    <p style="margin:0 0 4px;font-size:11px;font-weight:700;letter-spacing:0.08em;text-transform:uppercase;color:#64748B;">Telefone</p>
                    <p style="margin:0;font-size:14px;line-height:1.5;color:#1A1C2E;">${escapeHtml(payload.telefone)}</p>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>

          <div style="height:2px;line-height:2px;font-size:2px;">&nbsp;</div>

          <div style="padding:12px 14px;background:#FFFFFF;border:1px solid #E2E8F0;border-radius:12px;">
            <p style="margin:0 0 4px;font-size:11px;font-weight:700;letter-spacing:0.08em;text-transform:uppercase;color:#64748B;">Cargo</p>
            <p style="margin:0;font-size:14px;line-height:1.55;color:#1A1C2E;">${escapeHtml(payload.cargo)}</p>
          </div>
        </div>

        <div style="padding:8px 24px 0;">
          <p style="margin:0 0 8px;font-size:12px;font-weight:700;letter-spacing:0.02em;text-transform:uppercase;color:#475569;">Mensagem</p>
          <div style="padding:14px 16px;background:#F8F9FE;border:1px solid #E2E8F0;border-radius:12px;font-size:15px;line-height:1.65;color:#1A1C2E;">
            ${escapedMessage}
          </div>
        </div>

        <div style="padding:20px 24px 8px;">
          <p style="margin:0 0 10px;font-size:12px;font-weight:700;letter-spacing:0.02em;text-transform:uppercase;color:#475569;">Ações rápidas</p>
          <table role="presentation" style="width:100%;border-collapse:collapse;">
            <tbody>
              <tr>
                <td style="padding:0 8px 8px 0;">
                  ${
                    replyMailtoLink
                      ? `<a href="${replyMailtoLink}" style="display:inline-block;padding:10px 14px;border-radius:10px;border:1px solid #D7E0F1;background:#EDF4FF;color:#224D8E;font-size:13px;font-weight:600;text-decoration:none;">Responder por e-mail</a>`
                      : ''
                  }
                </td>
                <td style="padding:0 0 8px 8px;text-align:right;">
                  ${
                    whatsappQuickLink
                      ? `<a href="${whatsappQuickLink}" style="display:inline-block;padding:10px 14px;border-radius:10px;border:1px solid #CDEBDD;background:#EAF9F2;color:#1F7A53;font-size:13px;font-weight:600;text-decoration:none;">Iniciar conversa no WhatsApp</a>`
                      : ''
                  }
                </td>
              </tr>
            </tbody>
          </table>
          ${
            whatsappQuickLink
              ? '<p style="margin:6px 0 0;font-size:12px;line-height:1.5;color:#64748B;">Obs.: o atalho de WhatsApp pode falhar se o número informado estiver incompleto ou inválido.</p>'
              : ''
          }
        </div>

        <div style="padding:14px 24px 22px;border-top:1px solid #E2E8F0;margin-top:14px;">
          <p style="margin:0;font-size:12px;line-height:1.6;color:#64748B;">Recebido em ${formatReceivedAt()} (horário de Brasília).</p>
        </div>
      </div>
    </div>
  `;
};
