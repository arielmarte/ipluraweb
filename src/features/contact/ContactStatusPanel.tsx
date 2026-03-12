import type { RefObject } from 'react';
import { AlertTriangle, CheckCircle2, Info } from 'lucide-react';
import { homeContent } from '@/content/home';
import type { RecoverableStatus } from '@/features/contact/useContactFormFlow';
import WhatsAppIcon from '@/components/icons/WhatsAppIcon';

type ContactRecoverableStatusPanelProps = {
  status: RecoverableStatus;
  panelRef: RefObject<HTMLDivElement | null>;
  onWhatsAppFallback: () => void;
};

export const ContactRecoverableStatusPanel = ({
  status,
  panelRef,
  onWhatsAppFallback,
}: ContactRecoverableStatusPanelProps) => {
  const statusContent = homeContent.contact.status;

  const config = {
    error: {
      title: statusContent.errorTitle,
      description: statusContent.errorDescription,
      icon: AlertTriangle,
      iconClass: 'text-rose-600',
      panelClass: 'border-rose-500/24 bg-rose-500/8',
    },
    unavailable: {
      title: statusContent.unavailableTitle,
      description: statusContent.unavailableDescription,
      icon: Info,
      iconClass: 'text-iplura-purple-accent',
      panelClass: 'border-iplura-purple-accent/24 bg-iplura-purple-accent/8',
    },
  } as const;

  const activeConfig = config[status];
  const Icon = activeConfig.icon;

  return (
    <div
      ref={panelRef}
      role="status"
      aria-live={status === 'error' ? 'assertive' : 'polite'}
      aria-atomic="true"
      tabIndex={-1}
      className={`rounded-2xl border p-4 sm:p-5 ${activeConfig.panelClass}`}
    >
      <div className="flex items-start gap-3">
        <span className="inline-flex w-9 h-9 rounded-lg items-center justify-center bg-white/75 border border-white/70 shrink-0">
          <Icon className={`w-4 h-4 ${activeConfig.iconClass}`} aria-hidden="true" />
        </span>
        <div className="min-w-0">
          <p className="text-sm font-semibold text-iplura-dark mb-1">{activeConfig.title}</p>
          <p className="text-sm leading-[1.6] text-iplura-gray">{activeConfig.description}</p>
        </div>
      </div>
      <div className="mt-4">
        <button
          type="button"
          onClick={onWhatsAppFallback}
          className="btn-secondary w-full sm:w-auto inline-flex items-center justify-center gap-2"
        >
          <WhatsAppIcon className="w-4 h-4" aria-hidden="true" />
          {homeContent.contact.form.whatsapp.label}
        </button>
      </div>
    </div>
  );
};

type ContactSuccessPanelProps = {
  panelRef: RefObject<HTMLDivElement | null>;
  onReset: () => void;
  onWhatsAppAction: () => void;
};

export const ContactSuccessPanel = ({
  panelRef,
  onReset,
  onWhatsAppAction,
}: ContactSuccessPanelProps) => {
  const statusContent = homeContent.contact.status;

  return (
    <div
      ref={panelRef}
      role="status"
      aria-live="polite"
      aria-atomic="true"
      tabIndex={-1}
      className="flex min-h-[22rem] flex-col items-center justify-center text-center rounded-2xl border border-emerald-500/22 bg-white/86 p-6 sm:p-8"
    >
      <span className="inline-flex w-12 h-12 rounded-2xl items-center justify-center bg-emerald-500/12 border border-emerald-500/24 mb-4">
        <CheckCircle2 className="w-6 h-6 text-emerald-600" aria-hidden="true" />
      </span>
      <h3 className="text-xl sm:text-2xl font-semibold text-iplura-dark">
        {statusContent.successTitle}
      </h3>
      <p className="mt-3 max-w-[38ch] text-sm sm:text-base leading-[1.65] text-iplura-gray">
        {statusContent.successDescription}
      </p>
      <div className="mt-6 w-full max-w-[28rem] grid sm:grid-cols-2 gap-3">
        <button type="button" onClick={onReset} className="btn-primary w-full">
          {statusContent.successPrimaryActionLabel}
        </button>
        <button
          type="button"
          onClick={onWhatsAppAction}
          className="btn-secondary w-full inline-flex items-center justify-center gap-2"
        >
          <WhatsAppIcon className="w-4 h-4" aria-hidden="true" />
          {statusContent.successSecondaryActionLabel}
        </button>
      </div>
    </div>
  );
};
