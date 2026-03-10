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

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

function App() {
  useEffect(() => {
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
  }, []);

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
