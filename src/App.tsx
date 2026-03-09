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

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

function App() {
  useEffect(() => {
    // Configure ScrollTrigger defaults
    ScrollTrigger.defaults({
      toggleActions: 'play none none none',
    });

    // Refresh ScrollTrigger on load
    ScrollTrigger.refresh();

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <div className="min-h-screen" style={{ background: 'hsl(var(--iplura-light))' }}>
      <Navigation />
      <main>
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
    </div>
  );
}

export default App;
