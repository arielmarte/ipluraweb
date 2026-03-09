import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ArrowRight } from 'lucide-react';

const Hero = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subheadlineRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'expo.out' } });

      tl.fromTo(
        badgeRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6 }
      )
        .fromTo(
          headlineRef.current,
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.8 },
          '-=0.3'
        )
        .fromTo(
          subheadlineRef.current,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.6 },
          '-=0.4'
        )
        .fromTo(
          ctaRef.current?.children || [],
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.5, stagger: 0.1 },
          '-=0.3'
        );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="hero"
      ref={sectionRef}
      className="relative min-h-screen flex items-center pt-24 pb-16 overflow-hidden"
      style={{ background: '#F8F9FE' }}
    >
      <div className="container-clean relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <div ref={badgeRef} className="mb-8 opacity-0">
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-medium tracking-wider uppercase border border-iplura-purple/20 bg-iplura-purple/10 text-iplura-purple">
              <span className="w-1.5 h-1.5 rounded-full bg-iplura-purple animate-pulse" />
              Instituto de Jogo Responsável
            </span>
          </div>

          {/* Headline */}
          <h1
            ref={headlineRef}
            className="text-4xl sm:text-5xl lg:text-6xl font-semibold leading-tight mb-8 text-iplura-dark opacity-0"
            style={{ letterSpacing: '-0.03em' }}
          >
            Jogo responsável com{' '}
            <span className="text-gradient">suporte técnico, humano e regulatório</span>
          </h1>

          {/* Subheadline */}
          <p
            ref={subheadlineRef}
            className="text-lg sm:text-xl leading-relaxed mb-12 max-w-2xl mx-auto text-iplura-gray opacity-0"
          >
            O IPLURA apoia operadoras de apostas na implementação de estratégias de jogo 
            responsável com acolhimento especializado, educação preventiva e apoio à conformidade.
          </p>

          {/* CTAs */}
          <div ref={ctaRef} className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="#contato"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection('#contato');
              }}
              className="btn-primary"
            >
              Falar com o IPLURA
            </a>
            <a
              href="#solucoes"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection('#solucoes');
              }}
              className="btn-secondary group"
            >
              Conhecer soluções
              <ArrowRight className="w-4 h-4 ml-2 inline group-hover:translate-x-1 transition-transform" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
