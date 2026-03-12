import { useEffect, useRef, useState, type ChangeEvent, type FormEvent } from 'react';
import { ContactApiError, submitEmailContact } from '@/lib/contactApi';
import type { ContactField, ContactFormData, ContactFormErrors } from '@/lib/contact-contract';
import { buildWhatsappUrl, EMPTY_CONTACT_FORM_DATA } from '@/utils/whatsapp';
import {
  formatPhoneInput,
  hasContactFormErrors,
  validateContactField,
  validateContactForm,
  type ContactFormStatus,
} from '@/utils/contactForm';

export type RecoverableStatus = Extract<ContactFormStatus, 'error' | 'unavailable'>;

const CONTACT_REQUIRED_NOTE_ID = 'contact-required-note';
const CONTACT_PRIVACY_NOTICE_ID = 'contact-privacy-notice';

const fieldIds: Record<ContactField, string> = {
  nome: 'contact-nome',
  empresa: 'contact-empresa',
  cargo: 'contact-cargo',
  email: 'contact-email',
  telefone: 'contact-telefone',
  mensagem: 'contact-mensagem',
};

const openWhatsApp = (url: string) => {
  window.open(url, '_blank', 'noopener,noreferrer');
};

export const useContactFormFlow = () => {
  const statusPanelRef = useRef<HTMLDivElement>(null);
  const [formData, setFormData] = useState<ContactFormData>(EMPTY_CONTACT_FORM_DATA);
  const [errors, setErrors] = useState<ContactFormErrors>({});
  const [formStatus, setFormStatus] = useState<ContactFormStatus>('idle');
  const [website, setWebsite] = useState('');

  const directWhatsappUrl = buildWhatsappUrl(EMPTY_CONTACT_FORM_DATA);
  const whatsappUrl = buildWhatsappUrl(formData);

  const isLoading = formStatus === 'loading';
  const isSuccess = formStatus === 'success';
  const showRecoverableStatus = formStatus === 'error' || formStatus === 'unavailable';

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
    const firstField = Object.keys(fieldErrors)[0] as ContactField | undefined;
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

  const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const field = event.target.name as ContactField;
    const value = field === 'telefone' ? formatPhoneInput(event.target.value) : event.target.value;

    setFormData((previous) => ({ ...previous, [field]: value }));

    setErrors((previous) => {
      if (!previous[field]) {
        return previous;
      }

      const fieldError = validateContactField(field, value);
      if (!fieldError) {
        const nextErrors = { ...previous };
        delete nextErrors[field];
        return nextErrors;
      }

      return { ...previous, [field]: fieldError };
    });

    if (formStatus === 'error' || formStatus === 'unavailable') {
      setFormStatus('idle');
    }
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

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

  const handleResetForm = () => {
    setFormData(EMPTY_CONTACT_FORM_DATA);
    setWebsite('');
    setErrors({});
    setFormStatus('idle');
  };

  const handleWhatsAppClick = () => {
    openWhatsApp(whatsappUrl);
  };

  const handleDirectWhatsAppClick = () => {
    openWhatsApp(directWhatsappUrl);
  };

  const getInputClassName = (field: ContactField) => {
    return errors[field]
      ? 'input-clean border-rose-400 focus:border-rose-500 focus:shadow-[0_0_0_3px_rgba(244,63,94,0.15)]'
      : 'input-clean';
  };

  const getFieldDescribedBy = (field: ContactField) => {
    const errorId = errors[field] ? `error-${field}` : null;
    return [CONTACT_REQUIRED_NOTE_ID, errorId].filter(Boolean).join(' ');
  };

  return {
    fieldIds,
    formData,
    errors,
    formStatus,
    website,
    statusPanelRef,
    isLoading,
    isSuccess,
    showRecoverableStatus,
    requiredNoteId: CONTACT_REQUIRED_NOTE_ID,
    privacyNoticeId: CONTACT_PRIVACY_NOTICE_ID,
    setWebsite,
    handleChange,
    handleSubmit,
    handleResetForm,
    handleWhatsAppClick,
    handleDirectWhatsAppClick,
    getInputClassName,
    getFieldDescribedBy,
  };
};
