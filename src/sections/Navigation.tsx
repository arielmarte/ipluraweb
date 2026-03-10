import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { homeContent } from '@/content/home';

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { links, ctaLabel, logoAlt } = homeContent.navigation;

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (!isMobileMenuOpen) return;

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsMobileMenuOpen(false);
      }
    };

    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [isMobileMenuOpen]);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(min-width: 1136px)');

    const handleBreakpointChange = (event: MediaQueryListEvent) => {
      if (event.matches) {
        setIsMobileMenuOpen(false);
      }
    };

    mediaQuery.addEventListener('change', handleBreakpointChange);
    return () => mediaQuery.removeEventListener('change', handleBreakpointChange);
  }, []);

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <nav
      aria-label="Navegação principal"
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
              alt={logoAlt}
              className="h-8 sm:h-9 w-auto object-contain"
            />
          </a>

          {/* Desktop Navigation */}
          <div className="hidden min-[1136px]:flex items-center gap-6 xl:gap-8">
            {links.map((link) => (
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
          <div className="hidden min-[1136px]:block">
            <a
              href="#contato"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection('#contato');
              }}
              className="btn-primary text-xs"
            >
              {ctaLabel}
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            type="button"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="min-[1136px]:hidden p-2 rounded-lg hover:bg-white/70 transition-colors"
            aria-label={isMobileMenuOpen ? 'Fechar menu principal' : 'Abrir menu principal'}
            aria-expanded={isMobileMenuOpen}
            aria-controls="mobile-menu-panel"
            aria-haspopup="true"
          >
            {isMobileMenuOpen ? (
              <X className="w-5 h-5" style={{ color: 'hsl(var(--iplura-dark))' }} aria-hidden="true" />
            ) : (
              <Menu className="w-5 h-5" style={{ color: 'hsl(var(--iplura-dark))' }} aria-hidden="true" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        <div
          id="mobile-menu-panel"
          aria-hidden={!isMobileMenuOpen}
          className={`min-[1136px]:hidden overflow-hidden transition-all duration-300 ${
            isMobileMenuOpen ? 'max-h-[calc(100vh-6.5rem)] opacity-100 mt-4' : 'max-h-0 opacity-0'
          }`}
        >
          <div className="bg-white/95 backdrop-blur-md rounded-2xl p-4 border border-iplura-purple/10 max-h-[calc(100vh-7rem)] overflow-y-auto">
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection(link.href);
                }}
                tabIndex={isMobileMenuOpen ? 0 : -1}
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
              tabIndex={isMobileMenuOpen ? 0 : -1}
              className="block w-full text-center px-4 py-3 mt-2 btn-primary text-xs"
            >
              {ctaLabel}
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
