import { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Sections
import Navigation from './sections/Navigation';
import Hero from './sections/Hero';
import CredibilityStrip from './sections/CredibilityStrip';
import ProblemSection from './sections/ProblemSection';
import Solutions from './sections/Solutions';
import Methodology from './sections/Methodology';
import Benefits from './sections/Benefits';
import Differentiators from './sections/Differentiators';
import About from './sections/About';
import Trust from './sections/Trust';
import FAQ from './sections/FAQ';
import ContactCTA from './sections/ContactCTA';
import Footer from './sections/Footer';
import FloatingWhatsAppButton from './components/FloatingWhatsAppButton';
import TermsOfUsePage from './pages/TermsOfUsePage';
import PrivacyPolicyPage from './pages/PrivacyPolicyPage';
import { homeContent } from './content/home';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

const SITE_URL = 'https://iplura.org';
const HOME_SCHEMA_IDS = {
  webpage: 'iplura-home-webpage-schema',
  faq: 'iplura-home-faq-schema',
} as const;

const HOME_WEBPAGE_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  name: 'IPLURA | Jogo responsável com estrutura técnica, humana e regulatória',
  url: SITE_URL,
  description:
    'Instituto de Promoção da Legalidade e Uso Responsável de Apostas. Suporte técnico, acolhimento especializado e educação preventiva para operadoras.',
  inLanguage: 'pt-BR',
  isPartOf: {
    '@type': 'WebSite',
    name: 'IPLURA',
    url: SITE_URL,
  },
  about: {
    '@type': 'Organization',
    name: 'IPLURA',
  },
} as const;

const buildHomeFaqSchema = () => ({
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: homeContent.faq.items.map((item) => ({
    '@type': 'Question',
    name: item.question,
    acceptedAnswer: {
      '@type': 'Answer',
      text: item.answer,
    },
  })),
});

const upsertJsonLdScript = (id: string, payload: unknown) => {
  let script = window.document.querySelector<HTMLScriptElement>(`script#${id}`);

  if (!script) {
    script = window.document.createElement('script');
    script.id = id;
    script.type = 'application/ld+json';
    window.document.head.appendChild(script);
  }

  script.text = JSON.stringify(payload);
};

const removeJsonLdScript = (id: string) => {
  window.document.querySelector(`script#${id}`)?.remove();
};

function App() {
  const normalizedPath = window.location.pathname.replace(/\/+$/, '') || '/';
  const isTermsOfUsePage = normalizedPath === '/termos-de-uso';
  const isPrivacyPolicyPage = normalizedPath === '/politica-de-privacidade';
  const isLegalPage = isTermsOfUsePage || isPrivacyPolicyPage;

  useEffect(() => {
    if (isLegalPage) {
      return;
    }

    // Configure ScrollTrigger defaults
    ScrollTrigger.defaults({
      toggleActions: 'play none none none',
    });

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Subtle global parallax for layers that opt-in via data-parallax.
    if (!prefersReducedMotion) {
      const parallaxElements = gsap.utils.toArray<HTMLElement>('[data-parallax]');

      parallaxElements.forEach((element) => {
        const speed = Number(element.dataset.parallax ?? '0.16');
        const sectionParent = element.closest('section') ?? element;
        const distance = Math.round(window.innerHeight * speed);

        gsap.to(element, {
          y: distance,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionParent,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          },
        });
      });
    }

    // Refresh ScrollTrigger on load
    ScrollTrigger.refresh();

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, [isLegalPage]);

  useEffect(() => {
    if (isLegalPage) {
      removeJsonLdScript(HOME_SCHEMA_IDS.webpage);
      removeJsonLdScript(HOME_SCHEMA_IDS.faq);
      return;
    }

    upsertJsonLdScript(HOME_SCHEMA_IDS.webpage, HOME_WEBPAGE_SCHEMA);
    upsertJsonLdScript(HOME_SCHEMA_IDS.faq, buildHomeFaqSchema());

    return () => {
      removeJsonLdScript(HOME_SCHEMA_IDS.webpage);
      removeJsonLdScript(HOME_SCHEMA_IDS.faq);
    };
  }, [isLegalPage]);

  if (isTermsOfUsePage) {
    return <TermsOfUsePage />;
  }

  if (isPrivacyPolicyPage) {
    return <PrivacyPolicyPage />;
  }

  return (
    <div className="min-h-screen surface-base">
      <a
        href="#main-content"
        className="sr-only"
      >
        Pular para o conteúdo principal
      </a>
      <header role="banner">
        <Navigation />
      </header>
      <main id="main-content" tabIndex={-1} className="safe-area-main">
        <Hero />
        <CredibilityStrip />
        <ProblemSection />
        <Solutions />
        <Methodology />
        <Benefits />
        <Differentiators />
        <About />
        <Trust />
        <FAQ />
        <ContactCTA />
      </main>
      <Footer />
      <FloatingWhatsAppButton />
    </div>
  );
}

export default App;
