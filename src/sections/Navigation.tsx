import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Início', href: '#hero' },
    { label: 'Soluções', href: '#solucoes' },
    { label: 'Como funciona', href: '#como-funciona' },
    { label: 'Benefícios', href: '#beneficios' },
    { label: 'Sobre', href: '#sobre' },
    { label: 'FAQ', href: '#faq' },
    { label: 'Contato', href: '#contato' },
  ];

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? 'bg-white/84 backdrop-blur-xl py-4 border-b border-iplura-purple/10 shadow-[0_8px_32px_rgba(26,28,46,0.08)]'
          : 'bg-transparent py-6'
      }`}
    >
      <div className="container-clean">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <a
            href="#hero"
            onClick={(e) => {
              e.preventDefault();
              scrollToSection('#hero');
            }}
            className="inline-flex items-center"
            aria-label="IPLURA"
          >
            <img
              src="/iplura-logo-icon-wordmark.svg"
              alt="IPLURA"
              className="h-8 sm:h-9 w-auto object-contain"
            />
          </a>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection(link.href);
                }}
                className="text-sm font-medium tracking-[0.01em] text-iplura-dark/75 hover:text-iplura-purple transition-colors duration-300 underline-subtle"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* CTA Button */}
          <div className="hidden lg:block">
            <a
              href="#contato"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection('#contato');
              }}
              className="btn-primary text-xs"
            >
              Falar com o IPLURA
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2 rounded-lg hover:bg-white/70 transition-colors"
          >
            {isMobileMenuOpen ? (
              <X className="w-5 h-5" style={{ color: 'hsl(var(--iplura-dark))' }} />
            ) : (
              <Menu className="w-5 h-5" style={{ color: 'hsl(var(--iplura-dark))' }} />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        <div
          className={`lg:hidden overflow-hidden transition-all duration-300 ${
            isMobileMenuOpen ? 'max-h-96 opacity-100 mt-4' : 'max-h-0 opacity-0'
          }`}
        >
          <div className="bg-white/95 backdrop-blur-md rounded-2xl p-4 shadow-xl border border-iplura-purple/10">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection(link.href);
                }}
                className="block px-4 py-3 text-sm font-medium text-iplura-dark/75 hover:text-iplura-purple hover:bg-iplura-purple/5 rounded-lg transition-all"
              >
                {link.label}
              </a>
            ))}
            <a
              href="#contato"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection('#contato');
              }}
              className="block w-full text-center px-4 py-3 mt-2 btn-primary text-xs"
            >
              Falar com o IPLURA
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
