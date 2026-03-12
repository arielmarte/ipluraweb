import { useCallback, useEffect, useRef, useState } from 'react';
import { Menu, X } from 'lucide-react';
import { homeContent } from '@/content/home';
import {
  DESKTOP_LINK_HIDE_ORDER,
  DESKTOP_NAV_LAYOUT,
  NAVIGATION_BREAKPOINTS,
} from '@/config/navigation';
import { scrollToAnchor } from '@/lib/scrollToAnchor';

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSectionHref, setActiveSectionHref] = useState('#hero');
  const [visibleDesktopLinks, setVisibleDesktopLinks] = useState(homeContent.navigation.links);
  const navRef = useRef<HTMLElement>(null);
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
    const sectionTargets = links
      .filter((link) => link.href.startsWith('#'))
      .map((link) => ({
        href: link.href,
        element: document.querySelector<HTMLElement>(link.href),
      }))
      .filter((item): item is { href: string; element: HTMLElement } => Boolean(item.element));

    if (sectionTargets.length === 0) {
      return;
    }

    const getHeaderHeight = () => navRef.current?.getBoundingClientRect().height ?? 0;
    const intersectionRatios = new Map<string, number>();
    let rafId: number | null = null;

    const updateActiveSection = () => {
      const viewportHeight = window.innerHeight;
      const pageBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2;
      const headerHeight = getHeaderHeight();

      if (window.scrollY <= 8) {
        setActiveSectionHref('#hero');
        return;
      }

      if (pageBottom) {
        setActiveSectionHref(sectionTargets[sectionTargets.length - 1].href);
        return;
      }

      const focusLineY = Math.min(viewportHeight - 1, headerHeight + viewportHeight * 0.3);

      let bestHref = sectionTargets[0].href;
      let bestScore = Number.NEGATIVE_INFINITY;

      for (const target of sectionTargets) {
        const rect = target.element.getBoundingClientRect();
        const ratio = intersectionRatios.get(target.href) ?? 0;
        const containsFocusLine = rect.top <= focusLineY && rect.bottom >= focusLineY;
        const distanceToFocusLine = Math.abs(rect.top - focusLineY);
        const intersectsViewport = rect.bottom > headerHeight && rect.top < viewportHeight;

        const score =
          (containsFocusLine ? 1000 : 0) +
          ratio * 120 +
          (intersectsViewport ? 10 : 0) -
          distanceToFocusLine * 0.02;

        if (score > bestScore) {
          bestScore = score;
          bestHref = target.href;
        }
      }

      setActiveSectionHref(bestHref);
    };

    const queueUpdate = () => {
      if (rafId !== null) {
        cancelAnimationFrame(rafId);
      }
      rafId = requestAnimationFrame(() => {
        updateActiveSection();
      });
    };

    const observerRootMarginTop = Math.round(getHeaderHeight() + 12);
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const href = `#${entry.target.id}`;
          intersectionRatios.set(href, entry.isIntersecting ? entry.intersectionRatio : 0);
        });
        queueUpdate();
      },
      {
        rootMargin: `-${observerRootMarginTop}px 0px -58% 0px`,
        threshold: [0, 0.1, 0.25, 0.4, 0.6, 0.8, 1],
      }
    );

    sectionTargets.forEach((target) => observer.observe(target.element));

    window.addEventListener('scroll', queueUpdate, { passive: true });
    window.addEventListener('resize', queueUpdate, { passive: true });
    queueUpdate();

    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', queueUpdate);
      window.removeEventListener('resize', queueUpdate);
      if (rafId !== null) {
        cancelAnimationFrame(rafId);
      }
    };
  }, [links]);

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

  const getNavLinkClassName = (href: string) => {
    const isActive = activeSectionHref === href;
    return `text-sm font-medium tracking-[0.01em] transition-colors duration-300 underline-subtle whitespace-nowrap ${
      isActive
        ? 'text-iplura-purple-accent'
        : 'text-iplura-dark/75 hover:text-iplura-purple-accent focus-visible:text-iplura-purple-accent'
    }`;
  };

  const getMobileLinkClassName = (href: string) => {
    const isActive = activeSectionHref === href;
    return `block px-4 py-3 text-sm font-medium rounded-lg transition-all ${
      isActive
        ? 'text-iplura-purple-accent bg-iplura-purple-accent/10'
        : 'text-iplura-dark/75 hover:text-iplura-purple-accent hover:bg-iplura-purple-accent/6'
    }`;
  };

  useEffect(() => {
    let rafId: number | null = null;

    const scheduleVisibleDesktopLinksCompute = () => {
      if (rafId !== null) {
        cancelAnimationFrame(rafId);
      }

      rafId = requestAnimationFrame(() => {
        computeVisibleDesktopLinks();
      });
    };

    scheduleVisibleDesktopLinksCompute();

    const handleResize = () => {
      scheduleVisibleDesktopLinksCompute();
    };

    window.addEventListener('resize', handleResize, { passive: true });

    const resizeObserver = new ResizeObserver(() => {
      scheduleVisibleDesktopLinksCompute();
    });

    if (desktopLinksViewportRef.current) {
      resizeObserver.observe(desktopLinksViewportRef.current);
    }

    if ('fonts' in document) {
      document.fonts.ready.then(() => {
        scheduleVisibleDesktopLinksCompute();
      });
    }

    return () => {
      if (rafId !== null) {
        cancelAnimationFrame(rafId);
      }
      window.removeEventListener('resize', handleResize);
      resizeObserver.disconnect();
    };
  }, [computeVisibleDesktopLinks]);

  const scrollToSection = (href: string) => {
    if (scrollToAnchor(href)) {
      setActiveSectionHref(href);
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <nav
      ref={navRef}
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
                  className={getNavLinkClassName(link.href)}
                  aria-current={activeSectionHref === link.href ? 'page' : undefined}
                  data-active={activeSectionHref === link.href ? 'true' : 'false'}
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
                className={getMobileLinkClassName(link.href)}
                aria-current={activeSectionHref === link.href ? 'page' : undefined}
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
