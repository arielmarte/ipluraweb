import {
  useEffect,
  useRef,
  useState,
  type ChangeEvent,
  type FormEvent,
  type RefObject,
} from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Send, CheckCircle2, AlertTriangle, Info, Loader2 } from 'lucide-react';
import { homeContent } from '@/content/home';
import { renderTextSegments } from '@/utils/renderTextSegments';
import {
  buildWhatsappUrl,
  EMPTY_CONTACT_FORM_DATA,
  type ContactFormData,
} from '@/utils/whatsapp';
import {
  hasContactFormErrors,
  formatPhoneInput,
  validateContactField,
  validateContactForm,
  type ContactFormErrors,
  type ContactFormStatus,
} from '@/utils/contactForm';
import WhatsAppIcon from '@/components/icons/WhatsAppIcon';

gsap.registerPlugin(ScrollTrigger);

type ContactApiPayload = ContactFormData & {
  website?: string;
};

type ContactApiErrorCode = 'unavailable' | 'error' | 'validation';

const CONTACT_REQUEST_TIMEOUT_MS = 15000;

class ContactApiError extends Error {
  code: ContactApiErrorCode;
  fieldErrors?: ContactFormErrors;

  constructor(code: ContactApiErrorCode, fieldErrors?: ContactFormErrors) {
    super(code);
    this.code = code;
    this.fieldErrors = fieldErrors;
  }
}

const submitEmailContact = async (formData: ContactApiPayload) => {
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

  const responseBody = await response.json().catch(() => null) as
    | { code?: string; errors?: ContactFormErrors }
    | null;

  if (responseBody?.code === 'validation_error' && responseBody.errors) {
    throw new ContactApiError('validation', responseBody.errors);
  }

  const isUnavailable = response.status === 503 || responseBody?.code === 'unavailable';
  throw new ContactApiError(isUnavailable ? 'unavailable' : 'error');
};

type RecoverableStatus = Extract<ContactFormStatus, 'error' | 'unavailable'>;

type FormStatusFeedbackProps = {
  status: RecoverableStatus;
  panelRef: RefObject<HTMLDivElement | null>;
  onWhatsAppFallback: () => void;
};

const FormStatusFeedback = ({ status, panelRef, onWhatsAppFallback }: FormStatusFeedbackProps) => {
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

type FormSuccessStateProps = {
  panelRef: RefObject<HTMLDivElement | null>;
  onReset: () => void;
  onWhatsAppAction: () => void;
};

const FormSuccessState = ({ panelRef, onReset, onWhatsAppAction }: FormSuccessStateProps) => {
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

const ContactCTA = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const statusPanelRef = useRef<HTMLDivElement>(null);
  const { contact } = homeContent;

  const [formData, setFormData] = useState<ContactFormData>(EMPTY_CONTACT_FORM_DATA);
  const [errors, setErrors] = useState<ContactFormErrors>({});
  const [formStatus, setFormStatus] = useState<ContactFormStatus>('idle');
  const [website, setWebsite] = useState('');

  const directWhatsappUrl = buildWhatsappUrl(EMPTY_CONTACT_FORM_DATA);
  const whatsappUrl = buildWhatsappUrl(formData);
  const requiredNoteId = 'contact-required-note';
  const privacyNoticeId = 'contact-privacy-notice';
  const privacyNotice = contact.form.privacyNotice;

  const isLoading = formStatus === 'loading';
  const isSuccess = formStatus === 'success';
  const showRecoverableStatus = formStatus === 'error' || formStatus === 'unavailable';

  const fieldIds: Record<keyof ContactFormData, string> = {
    nome: 'contact-nome',
    empresa: 'contact-empresa',
    cargo: 'contact-cargo',
    email: 'contact-email',
    telefone: 'contact-telefone',
    mensagem: 'contact-mensagem',
  };

  useEffect(() => {
    const triggers: ScrollTrigger[] = [];

    const ctx = gsap.context(() => {
      const contentTrigger = ScrollTrigger.create({
        trigger: contentRef.current,
        start: 'top 80%',
        onEnter: () => {
          gsap.fromTo(
            contentRef.current,
            { opacity: 0, y: 30 },
            { opacity: 1, y: 0, duration: 0.6, ease: 'expo.out' }
          );
        },
        once: true,
      });
      triggers.push(contentTrigger);

      if (formRef.current) {
        const formTrigger = ScrollTrigger.create({
          trigger: formRef.current,
          start: 'top 80%',
          onEnter: () => {
            gsap.fromTo(
              formRef.current,
              { opacity: 0, y: 40 },
              { opacity: 1, y: 0, duration: 0.7, ease: 'expo.out', delay: 0.2 }
            );
          },
          once: true,
        });
        triggers.push(formTrigger);
      }
    }, sectionRef);

    return () => {
      triggers.forEach((trigger) => trigger.kill());
      ctx.revert();
    };
  }, []);

  useEffect(() => {
    if (formStatus !== 'success' && formStatus !== 'error' && formStatus !== 'unavailable') {
      return;
    }

    const node = statusPanelRef.current;
    if (!node) {
      return;
    }

    const animationFrame = window.requestAnimationFrame(() => {
      node.scrollIntoView({ behavior: 'smooth', block: 'center' });
      node.focus({ preventScroll: true });
    });

    return () => window.cancelAnimationFrame(animationFrame);
  }, [formStatus]);

  const focusFirstInvalidField = (fieldErrors: ContactFormErrors) => {
    const firstField = Object.keys(fieldErrors)[0] as keyof ContactFormData | undefined;
    if (!firstField) {
      return;
    }

    const targetId = fieldIds[firstField];
    const fieldElement = document.getElementById(targetId) as HTMLElement | null;
    if (!fieldElement) {
      return;
    }

    fieldElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
    fieldElement.focus({ preventScroll: true });
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const field = e.target.name as keyof ContactFormData;
    const value = field === 'telefone' ? formatPhoneInput(e.target.value) : e.target.value;

    setFormData((prev) => ({ ...prev, [field]: value }));

    setErrors((prev) => {
      if (!prev[field]) {
        return prev;
      }

      const fieldError = validateContactField(field, value);
      if (!fieldError) {
        const { [field]: _removed, ...rest } = prev;
        return rest;
      }

      return { ...prev, [field]: fieldError };
    });

    if (formStatus === 'error' || formStatus === 'unavailable') {
      setFormStatus('idle');
    }
  };

  const handleResetForm = () => {
    setFormData(EMPTY_CONTACT_FORM_DATA);
    setWebsite('');
    setErrors({});
    setFormStatus('idle');
  };

  const openWhatsApp = (url: string) => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const handleWhatsAppClick = () => {
    openWhatsApp(whatsappUrl);
  };

  const handleDirectWhatsAppClick = () => {
    openWhatsApp(directWhatsappUrl);
  };

  const handleEmailClick = async (e: FormEvent) => {
    e.preventDefault();

    if (isLoading) {
      return;
    }

    const validationErrors = validateContactForm(formData);
    setErrors(validationErrors);

    if (hasContactFormErrors(validationErrors)) {
      setFormStatus('idle');
      focusFirstInvalidField(validationErrors);
      return;
    }

    try {
      setFormStatus('loading');
      await submitEmailContact({
        ...formData,
        website,
      });
      setErrors({});
      setFormStatus('success');
    } catch (error) {
      if (error instanceof ContactApiError) {
        if (error.code === 'validation') {
          const fieldErrors = error.fieldErrors ?? {};
          setErrors(fieldErrors);
          setFormStatus('error');
          return;
        }

        if (error.code === 'unavailable') {
          setFormStatus('unavailable');
          return;
        }
      }

      setFormStatus('error');
    }
  };

  const getInputClassName = (field: keyof ContactFormData) => {
    return errors[field]
      ? 'input-clean border-rose-400 focus:border-rose-500 focus:shadow-[0_0_0_3px_rgba(244,63,94,0.15)]'
      : 'input-clean';
  };

  const getFieldDescribedBy = (field: keyof ContactFormData) => {
    const errorId = errors[field] ? `error-${field}` : null;
    return [requiredNoteId, errorId].filter(Boolean).join(' ');
  };

  return (
    <section
      id="contato"
      ref={sectionRef}
      className="relative section-padding surface-contrast overflow-hidden"
    >
      <div
        className="absolute -top-14 right-[8%] h-36 w-36 rounded-full bg-iplura-purple/16 blur-3xl parallax-soft"
        data-parallax="0.12"
      />
      <div
        className="absolute bottom-0 left-[4%] h-44 w-44 rounded-full bg-iplura-purple-accent/12 blur-3xl parallax-soft"
        data-parallax="0.1"
      />
      <div className="container-clean px-4 sm:px-8 lg:px-16 xl:px-24">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24">
          <div ref={contentRef} className="opacity-0">
            <span className="badge mb-6 inline-flex">{contact.badge}</span>
            <h2 className="section-title mb-6">
              {renderTextSegments(contact.titleSegments, { gradient: 'text-gradient' })}
            </h2>
            <p className="section-intro">{contact.intro}</p>
            <button
              type="button"
              onClick={handleDirectWhatsAppClick}
              className="mt-6 btn-secondary inline-flex items-center gap-2"
            >
              <WhatsAppIcon className="w-4 h-4" aria-hidden="true" />
              {contact.quickWhatsappCtaLabel}
            </button>
          </div>

          <form
            ref={formRef}
            noValidate
            onSubmit={handleEmailClick}
            aria-busy={isLoading}
            className="relative panel-premium p-5 sm:p-7 lg:p-8 opacity-0 parallax-soft"
            data-parallax="0.06"
          >
            {isLoading ? (
              <div className="absolute inset-0 z-20 rounded-[inherit] bg-white/56 backdrop-blur-[2px] flex items-center justify-center px-6">
                <div
                  role="status"
                  aria-live="polite"
                  aria-atomic="true"
                  className="inline-flex items-center gap-2 rounded-full border border-iplura-purple-accent/26 bg-white/88 px-4 py-2 text-sm font-medium text-iplura-dark shadow-[0_10px_24px_rgba(26,28,46,0.08)]"
                >
                  <Loader2 className="h-4 w-4 animate-spin text-iplura-purple-accent" aria-hidden="true" />
                  {contact.status.loadingOverlayLabel}
                </div>
              </div>
            ) : null}

            {isSuccess ? (
              <FormSuccessState
                panelRef={statusPanelRef}
                onReset={handleResetForm}
                onWhatsAppAction={handleWhatsAppClick}
              />
            ) : (
              <div className="space-y-4">
                <div aria-hidden="true" className="sr-only">
                  <label htmlFor="contact-website">Website</label>
                  <input
                    id="contact-website"
                    type="text"
                    name="website"
                    value={website}
                    onChange={(event) => setWebsite(event.target.value)}
                    tabIndex={-1}
                    autoComplete="off"
                  />
                </div>

                <fieldset disabled={isLoading} className="space-y-4">
                  <p id={requiredNoteId} className="sr-only">
                    Todos os campos deste formulário são obrigatórios.
                  </p>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label
                        htmlFor={fieldIds.nome}
                        className="block text-sm font-medium mb-2"
                        style={{ color: 'hsl(var(--iplura-dark))' }}
                      >
                        {contact.form.fields.nome.label}
                      </label>
                      <input
                        id={fieldIds.nome}
                        type="text"
                        name="nome"
                        value={formData.nome}
                        onChange={handleChange}
                        className={getInputClassName('nome')}
                        placeholder={contact.form.fields.nome.placeholder}
                        required
                        aria-required="true"
                        aria-invalid={Boolean(errors.nome)}
                        aria-describedby={getFieldDescribedBy('nome')}
                      />
                      {errors.nome ? (
                        <p id="error-nome" role="alert" className="mt-2 text-xs text-rose-600 font-medium">
                          {errors.nome}
                        </p>
                      ) : null}
                    </div>

                    <div>
                      <label
                        htmlFor={fieldIds.empresa}
                        className="block text-sm font-medium mb-2"
                        style={{ color: 'hsl(var(--iplura-dark))' }}
                      >
                        {contact.form.fields.empresa.label}
                      </label>
                      <input
                        id={fieldIds.empresa}
                        type="text"
                        name="empresa"
                        value={formData.empresa}
                        onChange={handleChange}
                        className={getInputClassName('empresa')}
                        placeholder={contact.form.fields.empresa.placeholder}
                        required
                        aria-required="true"
                        aria-invalid={Boolean(errors.empresa)}
                        aria-describedby={getFieldDescribedBy('empresa')}
                      />
                      {errors.empresa ? (
                        <p id="error-empresa" role="alert" className="mt-2 text-xs text-rose-600 font-medium">
                          {errors.empresa}
                        </p>
                      ) : null}
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label
                        htmlFor={fieldIds.cargo}
                        className="block text-sm font-medium mb-2"
                        style={{ color: 'hsl(var(--iplura-dark))' }}
                      >
                        {contact.form.fields.cargo.label}
                      </label>
                      <input
                        id={fieldIds.cargo}
                        type="text"
                        name="cargo"
                        value={formData.cargo}
                        onChange={handleChange}
                        className={getInputClassName('cargo')}
                        placeholder={contact.form.fields.cargo.placeholder}
                        required
                        aria-required="true"
                        aria-invalid={Boolean(errors.cargo)}
                        aria-describedby={getFieldDescribedBy('cargo')}
                      />
                      {errors.cargo ? (
                        <p id="error-cargo" role="alert" className="mt-2 text-xs text-rose-600 font-medium">
                          {errors.cargo}
                        </p>
                      ) : null}
                    </div>

                    <div>
                      <label
                        htmlFor={fieldIds.email}
                        className="block text-sm font-medium mb-2"
                        style={{ color: 'hsl(var(--iplura-dark))' }}
                      >
                        {contact.form.fields.email.label}
                      </label>
                      <input
                        id={fieldIds.email}
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className={getInputClassName('email')}
                        placeholder={contact.form.fields.email.placeholder}
                        autoComplete="email"
                        required
                        aria-required="true"
                        aria-invalid={Boolean(errors.email)}
                        aria-describedby={getFieldDescribedBy('email')}
                      />
                      {errors.email ? (
                        <p id="error-email" role="alert" className="mt-2 text-xs text-rose-600 font-medium">
                          {errors.email}
                        </p>
                      ) : null}
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor={fieldIds.telefone}
                      className="block text-sm font-medium mb-2"
                      style={{ color: 'hsl(var(--iplura-dark))' }}
                    >
                      {contact.form.fields.telefone.label}
                    </label>
                    <input
                      id={fieldIds.telefone}
                      type="tel"
                      name="telefone"
                      value={formData.telefone}
                      onChange={handleChange}
                      className={getInputClassName('telefone')}
                      placeholder={contact.form.fields.telefone.placeholder}
                      autoComplete="tel"
                      inputMode="tel"
                      maxLength={15}
                      required
                      aria-required="true"
                      aria-invalid={Boolean(errors.telefone)}
                      aria-describedby={getFieldDescribedBy('telefone')}
                    />
                    {errors.telefone ? (
                      <p id="error-telefone" role="alert" className="mt-2 text-xs text-rose-600 font-medium">
                        {errors.telefone}
                      </p>
                    ) : null}
                  </div>

                  <div>
                    <label
                      htmlFor={fieldIds.mensagem}
                      className="block text-sm font-medium mb-2"
                      style={{ color: 'hsl(var(--iplura-dark))' }}
                    >
                      {contact.form.fields.mensagem.label}
                    </label>
                    <textarea
                      id={fieldIds.mensagem}
                      name="mensagem"
                      value={formData.mensagem}
                      onChange={handleChange}
                      rows={4}
                      className={`${getInputClassName('mensagem')} resize-none`}
                      placeholder={contact.form.fields.mensagem.placeholder}
                      required
                      aria-required="true"
                      aria-invalid={Boolean(errors.mensagem)}
                      aria-describedby={getFieldDescribedBy('mensagem')}
                    />
                    {errors.mensagem ? (
                      <p id="error-mensagem" role="alert" className="mt-2 text-xs text-rose-600 font-medium">
                        {errors.mensagem}
                      </p>
                    ) : null}
                  </div>

                  {showRecoverableStatus ? (
                    <FormStatusFeedback
                      status={formStatus}
                      panelRef={statusPanelRef}
                      onWhatsAppFallback={handleWhatsAppClick}
                    />
                  ) : (
                    <div className="grid sm:grid-cols-2 gap-3">
                      <button
                        type="submit"
                        disabled={isLoading}
                        className="btn-primary w-full flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                      >
                        {isLoading ? (
                          <Loader2 className="w-4 h-4 animate-spin" aria-hidden="true" />
                        ) : (
                          <Send className="w-4 h-4" aria-hidden="true" />
                        )}
                        {isLoading ? contact.status.loadingTitle : contact.form.submitLabel}
                      </button>

                      <button
                        type="button"
                        onClick={handleWhatsAppClick}
                        className="btn-secondary w-full flex items-center justify-center gap-2"
                      >
                        <WhatsAppIcon className="w-4 h-4" aria-hidden="true" />
                        {contact.form.whatsapp.label}
                      </button>
                    </div>
                  )}

                  <p id={privacyNoticeId} className="text-xs leading-[1.6] text-iplura-gray-soft">
                    {privacyNotice.usage}{' '}
                    {privacyNotice.agreementPrefix}
                    <a
                      href={privacyNotice.termsHref}
                      className="font-medium text-iplura-gray underline decoration-iplura-purple-accent/40 underline-offset-2 hover:text-iplura-purple-accent focus-visible:text-iplura-purple-accent transition-colors"
                    >
                      {privacyNotice.termsLabel}
                    </a>
                    {privacyNotice.connector}
                    <a
                      href={privacyNotice.policyHref}
                      className="font-medium text-iplura-gray underline decoration-iplura-purple-accent/40 underline-offset-2 hover:text-iplura-purple-accent focus-visible:text-iplura-purple-accent transition-colors"
                    >
                      {privacyNotice.policyLabel}
                    </a>
                    .
                  </p>
                </fieldset>
              </div>
            )}
          </form>
        </div>
      </div>
    </section>
  );
};

export default ContactCTA;
