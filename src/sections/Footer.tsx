import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Linkedin, Instagram } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const quickLinks = [
  { label: 'Início', href: '#hero' },
  { label: 'Soluções', href: '#solucoes' },
  { label: 'Como funciona', href: '#como-funciona' },
  { label: 'Benefícios', href: '#beneficios' },
  { label: 'Sobre', href: '#sobre' },
  { label: 'Credenciais', href: '#credenciais' },
  { label: 'Contato', href: '#contato' },
];

const Footer = () => {
  const footerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const triggers: ScrollTrigger[] = [];

    const ctx = gsap.context(() => {
      const footerTrigger = ScrollTrigger.create({
        trigger: footerRef.current,
        start: 'top 95%',
        onEnter: () => {
          gsap.fromTo(
            footerRef.current,
            { opacity: 0 },
            { opacity: 1, duration: 0.6, ease: 'power2.out' }
          );
        },
        once: true,
      });
      triggers.push(footerTrigger);
    }, footerRef);

    return () => {
      triggers.forEach((trigger) => trigger.kill());
      ctx.revert();
    };
  }, []);

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer
      ref={footerRef}
      className="py-20 border-t border-white/10 opacity-0 surface-dark text-white"
    >
      <div className="container-clean">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Logo & Description */}
          <div className="lg:col-span-2">
            <a
              href="#hero"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection('#hero');
              }}
              className="inline-flex items-center mb-5"
            >
              <img
                src="/iplura-logo-icon-wordmark-description-white.svg"
                alt="IPLURA"
                className="w-full max-w-[22rem] h-auto object-contain"
              />
            </a>
            <p className="text-[0.95rem] leading-[1.75] max-w-[34rem] text-[hsl(var(--iplura-dark-muted))]">
              Instituto de Promoção da Legalidade e Uso Responsável de Apostas.
              <br />
              Transformando obrigação regulatória em cuidado real.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4
              className="text-sm font-semibold uppercase tracking-wider mb-4"
              style={{ color: 'hsl(var(--iplura-white))' }}
            >
              Links
            </h4>
            <ul className="space-y-2">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    onClick={(e) => {
                      e.preventDefault();
                      scrollToSection(link.href);
                    }}
                    className="text-sm text-white/84 hover:text-white transition-colors duration-300 underline-subtle"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4
              className="text-sm font-semibold uppercase tracking-wider mb-4"
              style={{ color: 'hsl(var(--iplura-white))' }}
            >
              Contato
            </h4>
            <ul className="space-y-2">
              <li className="text-sm text-white/86">
                contato@iplura.org.br
              </li>
              <li className="text-sm text-white/86">
                São Paulo, SP - Brasil
              </li>
            </ul>

            {/* Social Links */}
            <div className="flex items-center gap-3 mt-4">
              <a
                href="#"
                onClick={(e) => e.preventDefault()}
                className="w-10 h-10 rounded-full bg-white/10 border border-white/15 flex items-center justify-center hover:bg-white/18 hover:text-white transition-all duration-300 text-white/92"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a
                href="#"
                onClick={(e) => e.preventDefault()}
                className="w-10 h-10 rounded-full bg-white/10 border border-white/15 flex items-center justify-center hover:bg-white/18 hover:text-white transition-all duration-300 text-white/92"
              >
                <Instagram className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/12">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-xs text-white/82">
              © 2026 IPLURA. Todos os direitos reservados.
            </p>
            <div className="flex items-center gap-6">
              <a
                href="#"
                onClick={(e) => e.preventDefault()}
                className="text-xs text-white/82 hover:text-white transition-colors duration-300"
              >
                Política de Privacidade
              </a>
              <a
                href="#"
                onClick={(e) => e.preventDefault()}
                className="text-xs text-white/82 hover:text-white transition-colors duration-300"
              >
                Termos de Uso
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
