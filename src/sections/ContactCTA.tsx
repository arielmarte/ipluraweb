import { useEffect, useRef, useState, type ChangeEvent, type FormEvent } from 'react';
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
  validateContactField,
  validateContactForm,
  type ContactFormErrors,
  type ContactFormStatus,
} from '@/utils/contactForm';
import WhatsAppIcon from '@/components/icons/WhatsAppIcon';

gsap.registerPlugin(ScrollTrigger);

const EMAIL_INTEGRATION_ENABLED = false;

const submitEmailContact = async (_formData: ContactFormData) => {
  await new Promise((resolve) => {
    setTimeout(resolve, 1100);
  });
};

type FormStatusFeedbackProps = {
  status: ContactFormStatus;
  onReset: () => void;
  onBackToTop: () => void;
  onWhatsAppFallback: () => void;
};

const FormStatusFeedback = ({
  status,
  onReset,
  onBackToTop,
  onWhatsAppFallback,
}: FormStatusFeedbackProps) => {
  const statusContent = homeContent.contact.status;

  if (status === 'idle') {
    return null;
  }

  const config = {
    loading: {
      title: statusContent.loadingTitle,
      description: statusContent.loadingDescription,
      icon: Loader2,
      iconClass: 'animate-spin text-iplura-purple',
      panelClass: 'border-iplura-purple/20 bg-iplura-purple/6',
    },
    success: {
      title: statusContent.successTitle,
      description: statusContent.successDescription,
      icon: CheckCircle2,
      iconClass: 'text-emerald-600',
      panelClass: 'border-emerald-500/24 bg-emerald-500/8',
    },
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
      iconClass: 'text-iplura-purple',
      panelClass: 'border-iplura-purple/20 bg-iplura-purple/6',
    },
  } as const;

  const activeConfig = config[status];
  const Icon = activeConfig.icon;

  return (
    <div
      role="status"
      aria-live="polite"
      className={`rounded-2xl border p-4 sm:p-5 ${activeConfig.panelClass}`}
    >
      <div className="flex items-start gap-3">
        <span className="inline-flex w-9 h-9 rounded-lg items-center justify-center bg-white/75 border border-white/70 shrink-0">
          <Icon className={`w-4 h-4 ${activeConfig.iconClass}`} />
        </span>
        <div className="min-w-0">
          <p className="text-sm font-semibold text-iplura-dark mb-1">{activeConfig.title}</p>
          <p className="text-sm leading-[1.6] text-iplura-gray">{activeConfig.description}</p>
        </div>
      </div>

      {status === 'success' ? (
        <div className="mt-4 flex flex-col sm:flex-row gap-3">
          <button type="button" onClick={onReset} className="btn-secondary w-full sm:w-auto">
            {statusContent.resetActionLabel}
          </button>
          <button type="button" onClick={onBackToTop} className="btn-ghost w-full sm:w-auto">
            {statusContent.backToTopLabel}
          </button>
        </div>
      ) : null}

      {status === 'error' || status === 'unavailable' ? (
        <div className="mt-4">
          <button
            type="button"
            onClick={onWhatsAppFallback}
            className="btn-secondary w-full sm:w-auto inline-flex items-center justify-center gap-2"
          >
            <WhatsAppIcon className="w-4 h-4" />
            {homeContent.contact.form.whatsapp.label}
          </button>
        </div>
      ) : null}
    </div>
  );
};

const ContactCTA = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const { contact } = homeContent;

  const [formData, setFormData] = useState<ContactFormData>(EMPTY_CONTACT_FORM_DATA);
  const [errors, setErrors] = useState<ContactFormErrors>({});
  const [formStatus, setFormStatus] = useState<ContactFormStatus>('idle');

  const directWhatsappUrl = buildWhatsappUrl(EMPTY_CONTACT_FORM_DATA);
  const whatsappUrl = buildWhatsappUrl(formData);

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

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const field = e.target.name as keyof ContactFormData;
    const value = e.target.value;

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

    if (formStatus !== 'idle') {
      setFormStatus('idle');
    }
  };

  const handleResetForm = () => {
    setFormData(EMPTY_CONTACT_FORM_DATA);
    setErrors({});
    setFormStatus('idle');
  };

  const handleBackToTop = () => {
    document.querySelector('#hero')?.scrollIntoView({ behavior: 'smooth' });
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

    if (formStatus === 'loading') {
      return;
    }

    const validationErrors = validateContactForm(formData);
    setErrors(validationErrors);

    if (hasContactFormErrors(validationErrors)) {
      setFormStatus('error');
      return;
    }

    if (!EMAIL_INTEGRATION_ENABLED) {
      setFormStatus('unavailable');
      return;
    }

    try {
      setFormStatus('loading');
      await submitEmailContact(formData);
      setFormStatus('success');
    } catch (_error) {
      setFormStatus('error');
    }
  };

  const getInputClassName = (field: keyof ContactFormData) => {
    return errors[field]
      ? 'input-clean border-rose-400 focus:border-rose-500 focus:shadow-[0_0_0_3px_rgba(244,63,94,0.15)]'
      : 'input-clean';
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
      <div className="container-clean">
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
              <WhatsAppIcon className="w-4 h-4" />
              {contact.quickWhatsappCtaLabel}
            </button>
          </div>

          <form
            ref={formRef}
            noValidate
            onSubmit={handleEmailClick}
            className="panel-premium p-8 opacity-0 parallax-soft"
            data-parallax="0.06"
          >
            <div className="space-y-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2" style={{ color: 'hsl(var(--iplura-dark))' }}>
                    {contact.form.fields.nome.label}
                  </label>
                  <input
                    type="text"
                    name="nome"
                    value={formData.nome}
                    onChange={handleChange}
                    className={getInputClassName('nome')}
                    placeholder={contact.form.fields.nome.placeholder}
                    aria-invalid={Boolean(errors.nome)}
                    aria-describedby={errors.nome ? 'error-nome' : undefined}
                  />
                  {errors.nome ? (
                    <p id="error-nome" className="mt-2 text-xs text-rose-600 font-medium">
                      {errors.nome}
                    </p>
                  ) : null}
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2" style={{ color: 'hsl(var(--iplura-dark))' }}>
                    {contact.form.fields.empresa.label}
                  </label>
                  <input
                    type="text"
                    name="empresa"
                    value={formData.empresa}
                    onChange={handleChange}
                    className={getInputClassName('empresa')}
                    placeholder={contact.form.fields.empresa.placeholder}
                    aria-invalid={Boolean(errors.empresa)}
                    aria-describedby={errors.empresa ? 'error-empresa' : undefined}
                  />
                  {errors.empresa ? (
                    <p id="error-empresa" className="mt-2 text-xs text-rose-600 font-medium">
                      {errors.empresa}
                    </p>
                  ) : null}
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2" style={{ color: 'hsl(var(--iplura-dark))' }}>
                    {contact.form.fields.cargo.label}
                  </label>
                  <input
                    type="text"
                    name="cargo"
                    value={formData.cargo}
                    onChange={handleChange}
                    className={getInputClassName('cargo')}
                    placeholder={contact.form.fields.cargo.placeholder}
                    aria-invalid={Boolean(errors.cargo)}
                    aria-describedby={errors.cargo ? 'error-cargo' : undefined}
                  />
                  {errors.cargo ? (
                    <p id="error-cargo" className="mt-2 text-xs text-rose-600 font-medium">
                      {errors.cargo}
                    </p>
                  ) : null}
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2" style={{ color: 'hsl(var(--iplura-dark))' }}>
                    {contact.form.fields.email.label}
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={getInputClassName('email')}
                    placeholder={contact.form.fields.email.placeholder}
                    aria-invalid={Boolean(errors.email)}
                    aria-describedby={errors.email ? 'error-email' : undefined}
                  />
                  {errors.email ? (
                    <p id="error-email" className="mt-2 text-xs text-rose-600 font-medium">
                      {errors.email}
                    </p>
                  ) : null}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2" style={{ color: 'hsl(var(--iplura-dark))' }}>
                  {contact.form.fields.telefone.label}
                </label>
                <input
                  type="tel"
                  name="telefone"
                  value={formData.telefone}
                  onChange={handleChange}
                  className={getInputClassName('telefone')}
                  placeholder={contact.form.fields.telefone.placeholder}
                  aria-invalid={Boolean(errors.telefone)}
                  aria-describedby={errors.telefone ? 'error-telefone' : undefined}
                />
                {errors.telefone ? (
                  <p id="error-telefone" className="mt-2 text-xs text-rose-600 font-medium">
                    {errors.telefone}
                  </p>
                ) : null}
              </div>

              <div>
                <label className="block text-sm font-medium mb-2" style={{ color: 'hsl(var(--iplura-dark))' }}>
                  {contact.form.fields.mensagem.label}
                </label>
                <textarea
                  name="mensagem"
                  value={formData.mensagem}
                  onChange={handleChange}
                  rows={4}
                  className={`${getInputClassName('mensagem')} resize-none`}
                  placeholder={contact.form.fields.mensagem.placeholder}
                  aria-invalid={Boolean(errors.mensagem)}
                  aria-describedby={errors.mensagem ? 'error-mensagem' : undefined}
                />
                {errors.mensagem ? (
                  <p id="error-mensagem" className="mt-2 text-xs text-rose-600 font-medium">
                    {errors.mensagem}
                  </p>
                ) : null}
              </div>

              <div className="grid sm:grid-cols-2 gap-3">
                <button
                  type="submit"
                  disabled={formStatus === 'loading'}
                  className="btn-primary w-full flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {formStatus === 'loading' ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
                  {formStatus === 'loading' ? contact.status.loadingTitle : contact.form.submitLabel}
                </button>

                <button
                  type="button"
                  onClick={handleWhatsAppClick}
                  className="btn-secondary w-full flex items-center justify-center gap-2"
                >
                  <WhatsAppIcon className="w-4 h-4" />
                  {contact.form.whatsapp.label}
                </button>
              </div>

              <FormStatusFeedback
                status={formStatus}
                onReset={handleResetForm}
                onBackToTop={handleBackToTop}
                onWhatsAppFallback={handleWhatsAppClick}
              />
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default ContactCTA;
