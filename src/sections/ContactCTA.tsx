import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { Send, Loader2 } from 'lucide-react';
import { homeContent } from '@/content/home';
import { renderTextSegments } from '@/utils/renderTextSegments';
import { createRevealTrigger } from '@/lib/gsap/reveal';
import { ContactFormFields } from '@/features/contact/ContactFormFields';
import {
  ContactRecoverableStatusPanel,
  ContactSuccessPanel,
} from '@/features/contact/ContactStatusPanel';
import { useContactFormFlow } from '@/features/contact/useContactFormFlow';
import WhatsAppIcon from '@/components/icons/WhatsAppIcon';

const ContactCTA = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const { contact } = homeContent;
  const privacyNotice = contact.form.privacyNotice;

  const {
    fieldIds,
    formData,
    errors,
    formStatus,
    website,
    statusPanelRef,
    isLoading,
    isSuccess,
    showRecoverableStatus,
    requiredNoteId,
    privacyNoticeId,
    setWebsite,
    handleChange,
    handleSubmit,
    handleResetForm,
    handleWhatsAppClick,
    handleDirectWhatsAppClick,
    getInputClassName,
    getFieldDescribedBy,
  } = useContactFormFlow();
  const recoverableStatus =
    formStatus === 'error' || formStatus === 'unavailable' ? formStatus : null;

  useEffect(() => {
    const triggers: Array<{ kill: () => void }> = [];

    const ctx = gsap.context(() => {
      const contentTrigger = createRevealTrigger({
        trigger: contentRef.current,
        target: contentRef.current,
        start: 'top 80%',
        from: { opacity: 0, y: 30 },
        to: { opacity: 1, y: 0, duration: 0.6, ease: 'expo.out' },
      });

      if (contentTrigger) {
        triggers.push(contentTrigger);
      }

      const formTrigger = createRevealTrigger({
        trigger: formRef.current,
        target: formRef.current,
        start: 'top 80%',
        from: { opacity: 0, y: 40 },
        to: { opacity: 1, y: 0, duration: 0.7, ease: 'expo.out', delay: 0.2 },
      });

      if (formTrigger) {
        triggers.push(formTrigger);
      }
    }, sectionRef);

    return () => {
      triggers.forEach((trigger) => trigger.kill());
      ctx.revert();
    };
  }, []);

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
            onSubmit={handleSubmit}
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
              <ContactSuccessPanel
                panelRef={statusPanelRef}
                onReset={handleResetForm}
                onWhatsAppAction={handleWhatsAppClick}
              />
            ) : (
              <div className="space-y-4">
                <ContactFormFields
                  formData={formData}
                  errors={errors}
                  website={website}
                  isLoading={isLoading}
                  requiredNoteId={requiredNoteId}
                  onWebsiteChange={setWebsite}
                  onFieldChange={handleChange}
                  fieldIds={fieldIds}
                  getInputClassName={getInputClassName}
                  getFieldDescribedBy={getFieldDescribedBy}
                />

                {showRecoverableStatus && recoverableStatus ? (
                  <ContactRecoverableStatusPanel
                    status={recoverableStatus}
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
              </div>
            )}
          </form>
        </div>
      </div>
    </section>
  );
};

export default ContactCTA;
