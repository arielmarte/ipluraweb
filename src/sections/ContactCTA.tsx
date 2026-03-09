import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Send, CheckCircle, MessageCircle } from 'lucide-react';
import { homeContent } from '@/content/home';
import { renderTextSegments } from '@/utils/renderTextSegments';

gsap.registerPlugin(ScrollTrigger);

const ContactCTA = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const { contact } = homeContent;
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    nome: '',
    empresa: '',
    cargo: '',
    email: '',
    telefone: '',
    mensagem: '',
  });

  useEffect(() => {
    const triggers: ScrollTrigger[] = [];

    const ctx = gsap.context(() => {
      // Content animation
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

      // Form animation
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({
        nome: '',
        empresa: '',
        cargo: '',
        email: '',
        telefone: '',
        mensagem: '',
      });
    }, 3000);
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
          {/* Left - Content */}
          <div ref={contentRef} className="opacity-0">
            <span className="badge mb-6 inline-flex">{contact.badge}</span>
            <h2 className="section-title mb-6">
              {renderTextSegments(contact.titleSegments, { gradient: 'text-gradient' })}
            </h2>
            <p className="section-intro">{contact.intro}</p>
          </div>

          {/* Right - Form */}
          <form
            ref={formRef}
            onSubmit={handleSubmit}
            className="panel-premium p-8 opacity-0 parallax-soft"
            data-parallax="0.06"
          >
            {isSubmitted ? (
              <div className="text-center py-12">
                <div
                  className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"
                  style={{ background: 'hsl(var(--iplura-purple) / 0.1)' }}
                >
                  <CheckCircle
                    className="w-8 h-8"
                    style={{ color: 'hsl(var(--iplura-purple))' }}
                  />
                </div>
                <h3
                  className="text-xl font-semibold mb-2"
                  style={{ color: 'hsl(var(--iplura-dark))' }}
                >
                  {contact.success.title}
                </h3>
                <p style={{ color: 'hsl(var(--iplura-gray))' }}>{contact.success.description}</p>
              </div>
            ) : (
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
                      required
                      className="input-clean"
                      placeholder={contact.form.fields.nome.placeholder}
                    />
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
                      required
                      className="input-clean"
                      placeholder={contact.form.fields.empresa.placeholder}
                    />
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
                      required
                      className="input-clean"
                      placeholder={contact.form.fields.cargo.placeholder}
                    />
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
                      required
                      className="input-clean"
                      placeholder={contact.form.fields.email.placeholder}
                    />
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
                    required
                    className="input-clean"
                    placeholder={contact.form.fields.telefone.placeholder}
                  />
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
                    className="input-clean resize-none"
                    placeholder={contact.form.fields.mensagem.placeholder}
                  />
                </div>

                <button type="submit" className="btn-primary w-full flex items-center justify-center gap-2">
                  <Send className="w-4 h-4" />
                  {contact.form.submitLabel}
                </button>

                <a
                  href={contact.form.whatsapp.href}
                  target="_blank"
                  rel="noreferrer"
                  className="btn-secondary w-full flex items-center justify-center gap-2"
                >
                  <MessageCircle className="w-4 h-4" />
                  {contact.form.whatsapp.label}
                </a>
              </div>
            )}
          </form>
        </div>
      </div>
    </section>
  );
};

export default ContactCTA;
