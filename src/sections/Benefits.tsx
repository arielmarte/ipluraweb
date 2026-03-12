import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Scale, ShieldCheck, Award, GraduationCap } from 'lucide-react';
import { homeContent } from '@/content/home';
import { createRevealTrigger } from '@/lib/gsap/reveal';
import { renderTextSegments } from '@/utils/renderTextSegments';

gsap.registerPlugin(ScrollTrigger);

const Benefits = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const { benefits } = homeContent;

  const iconByBenefitId = {
    'regulatory-consistency': Scale,
    'risk-reduction': ShieldCheck,
    'institutional-strengthening': Award,
    'internal-training': GraduationCap,
  } as const;

  useEffect(() => {
    const triggers: ScrollTrigger[] = [];

    const ctx = gsap.context(() => {
      const headerTrigger = createRevealTrigger({
        trigger: headerRef.current,
        target: headerRef.current,
        start: 'top 85%',
        from: { opacity: 0, y: 30 },
        to: { opacity: 1, y: 0, duration: 0.6, ease: 'expo.out' },
      });
      if (headerTrigger) {
        triggers.push(headerTrigger);
      }

      if (cardsRef.current) {
        const cards = cardsRef.current.querySelectorAll('.benefit-card');

        const cardsTrigger = createRevealTrigger({
          trigger: cardsRef.current,
          target: cards,
          start: 'top 80%',
          from: { opacity: 0, y: 30 },
          to: {
            opacity: 1,
            y: 0,
            duration: 0.6,
            stagger: 0.1,
            ease: 'expo.out',
          },
        });
        if (cardsTrigger) {
          triggers.push(cardsTrigger);
        }
      }
    }, sectionRef);

    return () => {
      triggers.forEach((trigger) => trigger.kill());
      ctx.revert();
    };
  }, []);

  return (
    <section
      id="beneficios"
      ref={sectionRef}
      className="section-padding surface-base section-separator-soft"
    >
      <div className="container-clean">
        {/* Header */}
        <div ref={headerRef} className="text-center max-w-2xl mx-auto mb-16 opacity-0">
          <span className="badge mb-6 inline-flex">{benefits.badge}</span>
          <h2 className="section-title">
            {renderTextSegments(benefits.titleSegments, { gradient: 'text-gradient' })}
          </h2>
        </div>

        {/* Cards */}
        <div
          ref={cardsRef}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {benefits.cards.map((benefit) => {
            const Icon = iconByBenefitId[benefit.id];
            return (
              <div
                key={benefit.id}
                className="benefit-card card-clean p-8 text-center group opacity-0"
              >
                <div className="icon-box mx-auto mb-5 group-hover:scale-110 transition-transform duration-300">
                  <Icon />
                </div>
                <h3
                  className="text-base font-semibold mb-3 group-hover:text-iplura-purple transition-colors duration-300"
                  style={{ color: 'hsl(var(--iplura-dark))' }}
                >
                  {benefit.title}
                </h3>
                <p className="text-sm leading-relaxed" style={{ color: 'hsl(var(--iplura-gray))' }}>
                  {benefit.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Benefits;
