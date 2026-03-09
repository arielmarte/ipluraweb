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
  { label: 'FAQ', href: '#faq' },
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
      className="py-16 border-t border-gray-100 opacity-0"
      style={{ background: 'hsl(var(--iplura-light))' }}
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
              className="text-2xl font-bold tracking-tight mb-4 inline-block"
              style={{ color: 'hsl(var(--iplura-purple))' }}
            >
              IPLURA
            </a>
            <p className="text-sm leading-relaxed max-w-sm" style={{ color: 'hsl(var(--iplura-gray))' }}>
              Instituto de Promoção da Legalidade e Uso Responsável de Apostas. 
              Transformando obrigação regulatória em cuidado real.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4
              className="text-sm font-semibold uppercase tracking-wider mb-4"
              style={{ color: 'hsl(var(--iplura-dark))' }}
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
                    className="text-sm hover:text-iplura-purple transition-colors duration-300 underline-subtle"
                    style={{ color: 'hsl(var(--iplura-gray))' }}
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
              style={{ color: 'hsl(var(--iplura-dark))' }}
            >
              Contato
            </h4>
            <ul className="space-y-2">
              <li className="text-sm" style={{ color: 'hsl(var(--iplura-gray))' }}>
                contato@iplura.org.br
              </li>
              <li className="text-sm" style={{ color: 'hsl(var(--iplura-gray))' }}>
                São Paulo, SP - Brasil
              </li>
            </ul>

            {/* Social Links */}
            <div className="flex items-center gap-3 mt-4">
              <a
                href="#"
                onClick={(e) => e.preventDefault()}
                className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center hover:bg-iplura-purple/10 hover:text-iplura-purple transition-all duration-300"
                style={{ color: 'hsl(var(--iplura-gray))' }}
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a
                href="#"
                onClick={(e) => e.preventDefault()}
                className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center hover:bg-iplura-purple/10 hover:text-iplura-purple transition-all duration-300"
                style={{ color: 'hsl(var(--iplura-gray))' }}
              >
                <Instagram className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-gray-100">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-xs" style={{ color: 'hsl(var(--iplura-gray))' }}>
              © 2025 IPLURA. Todos os direitos reservados.
            </p>
            <div className="flex items-center gap-6">
              <a
                href="#"
                onClick={(e) => e.preventDefault()}
                className="text-xs hover:text-iplura-purple transition-colors duration-300"
                style={{ color: 'hsl(var(--iplura-gray))' }}
              >
                Política de Privacidade
              </a>
              <a
                href="#"
                onClick={(e) => e.preventDefault()}
                className="text-xs hover:text-iplura-purple transition-colors duration-300"
                style={{ color: 'hsl(var(--iplura-gray))' }}
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
