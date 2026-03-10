import { useCallback, useEffect, useRef, useState } from 'react';
import { Menu, X } from 'lucide-react';
import { homeContent } from '@/content/home';
import {
  DESKTOP_LINK_HIDE_ORDER,
  DESKTOP_NAV_LAYOUT,
  NAVIGATION_BREAKPOINTS,
} from '@/config/navigation';

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [visibleDesktopLinks, setVisibleDesktopLinks] = useState(homeContent.navigation.links);
  const desktopLinksViewportRef = useRef<HTMLDivElement>(null);
  const linkMeasureRefs = useRef<Record<string, HTMLSpanElement | null>>({});
  const { links, ctaLabel, logoAlt } = homeContent.navigation;

  const computeVisibleDesktopLinks = useCallback(() => {
    if (typeof window === 'undefined') return;

    if (window.innerWidth < NAVIGATION_BREAKPOINTS.mobile) {
      setVisibleDesktopLinks(links);
      return;
    }

    const viewport = desktopLinksViewportRef.current;
    if (!viewport) return;

    const availableWidth = viewport.clientWidth;
    if (availableWidth <= 0) return;

    const widthMap = new Map(
      links.map((link) => [
        link.href,
        linkMeasureRefs.current[link.href]?.getBoundingClientRect().width ?? 0,
      ])
    );

    const getTotalWidth = (items: typeof links) =>
      items.reduce((total, link) => total + (widthMap.get(link.href) ?? 0), 0) +
      Math.max(0, items.length - 1) * DESKTOP_NAV_LAYOUT.linkGapPx;

    const nextVisible = [...links];
    let totalWidth = getTotalWidth(nextVisible);

    for (const href of DESKTOP_LINK_HIDE_ORDER) {
      if (totalWidth <= availableWidth - DESKTOP_NAV_LAYOUT.safetyPx) break;

      const indexToRemove = nextVisible.findIndex((link) => link.href === href);
      if (indexToRemove === -1) continue;

      nextVisible.splice(indexToRemove, 1);
      totalWidth = getTotalWidth(nextVisible);
    }

    setVisibleDesktopLinks(nextVisible);
  }, [links]);

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
    const mediaQuery = window.matchMedia(`(min-width: ${NAVIGATION_BREAKPOINTS.mobile}px)`);

    const handleBreakpointChange = (event: MediaQueryListEvent) => {
      if (event.matches) {
        setIsMobileMenuOpen(false);
      }

      computeVisibleDesktopLinks();
    };

    mediaQuery.addEventListener('change', handleBreakpointChange);
    return () => mediaQuery.removeEventListener('change', handleBreakpointChange);
  }, [computeVisibleDesktopLinks]);

  useEffect(() => {
    computeVisibleDesktopLinks();

    const handleResize = () => {
      computeVisibleDesktopLinks();
    };

    window.addEventListener('resize', handleResize, { passive: true });

    const resizeObserver = new ResizeObserver(() => {
      computeVisibleDesktopLinks();
    });

    if (desktopLinksViewportRef.current) {
      resizeObserver.observe(desktopLinksViewportRef.current);
    }

    if ('fonts' in document) {
      document.fonts.ready.then(() => {
        computeVisibleDesktopLinks();
      });
    }

    return () => {
      window.removeEventListener('resize', handleResize);
      resizeObserver.disconnect();
    };
  }, [computeVisibleDesktopLinks]);

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
        <div className="flex items-center justify-between gap-4 lg:gap-6">
          {/* Logo */}
          <a
            href="#hero"
            onClick={(e) => {
              e.preventDefault();
              scrollToSection('#hero');
            }}
            className="inline-flex items-center shrink-0"
            aria-label="IPLURA"
          >
            <img
              src="/iplura-logo-icon-wordmark.svg"
              alt={logoAlt}
              className="h-8 sm:h-9 w-auto object-contain"
            />
          </a>

          {/* Desktop Navigation */}
          <div
            ref={desktopLinksViewportRef}
            className="hidden lg:flex min-w-0 flex-1 justify-center px-2 xl:px-4"
          >
            <div className="flex min-w-0 items-center gap-6">
              {visibleDesktopLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToSection(link.href);
                  }}
                  className="text-sm font-medium tracking-[0.01em] text-iplura-dark/75 hover:text-iplura-purple transition-colors duration-300 underline-subtle whitespace-nowrap"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>

          {/* CTA Button */}
          <div className="hidden lg:block shrink-0">
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
            className="lg:hidden ml-auto p-2 rounded-lg hover:bg-white/70 transition-colors"
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
          className={`lg:hidden overflow-hidden transition-all duration-300 ${
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

        {/* Hidden measurement layer for progressive desktop simplification */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute h-0 overflow-hidden opacity-0 whitespace-nowrap"
        >
          {links.map((link) => (
            <span
              key={link.href}
              ref={(node) => {
                linkMeasureRefs.current[link.href] = node;
              }}
              className="text-sm font-medium tracking-[0.01em]"
            >
              {link.label}
            </span>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
