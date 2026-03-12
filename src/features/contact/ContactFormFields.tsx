import type { ChangeEvent } from 'react';
import type { ContactField, ContactFormData, ContactFormErrors } from '@/lib/contact-contract';
import { CONTACT_MESSAGE_MAX_LENGTH } from '@/utils/contactForm';
import { homeContent } from '@/content/home';

type ContactFormFieldsProps = {
  formData: ContactFormData;
  errors: ContactFormErrors;
  website: string;
  isLoading: boolean;
  requiredNoteId: string;
  onWebsiteChange: (value: string) => void;
  onFieldChange: (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  fieldIds: Record<ContactField, string>;
  getInputClassName: (field: ContactField) => string;
  getFieldDescribedBy: (field: ContactField) => string;
};

const { fields } = homeContent.contact.form;

export const ContactFormFields = ({
  formData,
  errors,
  website,
  isLoading,
  requiredNoteId,
  onWebsiteChange,
  onFieldChange,
  fieldIds,
  getInputClassName,
  getFieldDescribedBy,
}: ContactFormFieldsProps) => {
  return (
    <div className="space-y-4">
      <div aria-hidden="true" className="sr-only">
        <label htmlFor="contact-website">Website</label>
        <input
          id="contact-website"
          type="text"
          name="website"
          value={website}
          onChange={(event) => onWebsiteChange(event.target.value)}
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
              {fields.nome.label}
            </label>
            <input
              id={fieldIds.nome}
              type="text"
              name="nome"
              value={formData.nome}
              onChange={onFieldChange}
              className={getInputClassName('nome')}
              placeholder={fields.nome.placeholder}
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
              {fields.empresa.label}
            </label>
            <input
              id={fieldIds.empresa}
              type="text"
              name="empresa"
              value={formData.empresa}
              onChange={onFieldChange}
              className={getInputClassName('empresa')}
              placeholder={fields.empresa.placeholder}
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
              {fields.cargo.label}
            </label>
            <input
              id={fieldIds.cargo}
              type="text"
              name="cargo"
              value={formData.cargo}
              onChange={onFieldChange}
              className={getInputClassName('cargo')}
              placeholder={fields.cargo.placeholder}
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
              {fields.email.label}
            </label>
            <input
              id={fieldIds.email}
              type="email"
              name="email"
              value={formData.email}
              onChange={onFieldChange}
              className={getInputClassName('email')}
              placeholder={fields.email.placeholder}
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
            {fields.telefone.label}
          </label>
          <input
            id={fieldIds.telefone}
            type="tel"
            name="telefone"
            value={formData.telefone}
            onChange={onFieldChange}
            className={getInputClassName('telefone')}
            placeholder={fields.telefone.placeholder}
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
            {fields.mensagem.label}
          </label>
          <textarea
            id={fieldIds.mensagem}
            name="mensagem"
            value={formData.mensagem}
            onChange={onFieldChange}
            rows={4}
            maxLength={CONTACT_MESSAGE_MAX_LENGTH}
            className={`${getInputClassName('mensagem')} resize-none`}
            placeholder={fields.mensagem.placeholder}
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
      </fieldset>
    </div>
  );
};
