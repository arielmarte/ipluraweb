import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Send, CheckCircle } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const ContactCTA = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
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
            <span className="badge mb-6 inline-flex">Contato</span>
            <h2
              className="text-3xl sm:text-4xl lg:text-5xl font-semibold leading-[1.16] mb-6"
              style={{ color: 'hsl(var(--iplura-dark))', letterSpacing: '-0.02em' }}
            >
              Vamos construir uma operação{' '}
              <span className="text-gradient">mais responsável e confiável?</span>
            </h2>
            <p className="text-lg leading-relaxed" style={{ color: 'hsl(var(--iplura-gray))' }}>
              Fale com o IPLURA para conhecer soluções em jogo responsável, acolhimento 
              especializado, capacitação e suporte técnico à operadora.
            </p>
          </div>

          {/* Right - Form */}
          <form
            ref={formRef}
            onSubmit={handleSubmit}
            className="card-clean p-8 opacity-0 parallax-soft"
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
                  Mensagem enviada!
                </h3>
                <p style={{ color: 'hsl(var(--iplura-gray))' }}>Entraremos em contato em breve.</p>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2" style={{ color: 'hsl(var(--iplura-dark))' }}>
                      Nome
                    </label>
                    <input
                      type="text"
                      name="nome"
                      value={formData.nome}
                      onChange={handleChange}
                      required
                      className="input-clean"
                      placeholder="Seu nome"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2" style={{ color: 'hsl(var(--iplura-dark))' }}>
                      Empresa
                    </label>
                    <input
                      type="text"
                      name="empresa"
                      value={formData.empresa}
                      onChange={handleChange}
                      required
                      className="input-clean"
                      placeholder="Nome da empresa"
                    />
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2" style={{ color: 'hsl(var(--iplura-dark))' }}>
                      Cargo
                    </label>
                    <input
                      type="text"
                      name="cargo"
                      value={formData.cargo}
                      onChange={handleChange}
                      required
                      className="input-clean"
                      placeholder="Seu cargo"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2" style={{ color: 'hsl(var(--iplura-dark))' }}>
                      E-mail
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="input-clean"
                      placeholder="seu@email.com"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2" style={{ color: 'hsl(var(--iplura-dark))' }}>
                    Telefone
                  </label>
                  <input
                    type="tel"
                    name="telefone"
                    value={formData.telefone}
                    onChange={handleChange}
                    required
                    className="input-clean"
                    placeholder="(XX) XXXXX-XXXX"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2" style={{ color: 'hsl(var(--iplura-dark))' }}>
                    Mensagem
                  </label>
                  <textarea
                    name="mensagem"
                    value={formData.mensagem}
                    onChange={handleChange}
                    rows={4}
                    className="input-clean resize-none"
                    placeholder="Conte-nos sobre sua necessidade..."
                  />
                </div>

                <button type="submit" className="btn-primary w-full flex items-center justify-center gap-2">
                  <Send className="w-4 h-4" />
                  Entrar em contato
                </button>
              </div>
            )}
          </form>
        </div>
      </div>
    </section>
  );
};

export default ContactCTA;
