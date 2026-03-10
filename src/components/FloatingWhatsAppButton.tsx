import WhatsAppIcon from '@/components/icons/WhatsAppIcon';

const FLOATING_WHATSAPP_URL = 'https://api.whatsapp.com/send?phone=5562995504444';

const FloatingWhatsAppButton = () => {
  return (
    <a
      href={FLOATING_WHATSAPP_URL}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Abrir conversa no WhatsApp com o IPLURA"
      className="fixed right-4 sm:right-6 z-40 inline-flex h-14 w-14 sm:h-16 sm:w-16 items-center justify-center rounded-full border border-white/65 bg-white/74 text-[#20A652] backdrop-blur-xl shadow-[0_12px_28px_rgba(26,28,46,0.16)] transition-all duration-300 hover:-translate-y-0.5 hover:border-iplura-purple-accent/32 hover:bg-white/82 hover:shadow-[0_16px_34px_rgba(109,42,167,0.2)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-iplura-purple-accent/45 focus-visible:ring-offset-2 focus-visible:ring-offset-[hsl(var(--iplura-surface))] active:translate-y-0"
      style={{ bottom: 'calc(1rem + env(safe-area-inset-bottom))' }}
    >
      <WhatsAppIcon className="h-6 w-6 sm:h-7 sm:w-7" aria-hidden="true" />
    </a>
  );
};

export default FloatingWhatsAppButton;
