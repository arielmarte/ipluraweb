import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Handshake, Layers, Target } from 'lucide-react';
import { homeContent } from '@/content/home';
import { createRevealTrigger } from '@/lib/gsap/reveal';
import { renderTextSegments } from '@/utils/renderTextSegments';

gsap.registerPlugin(ScrollTrigger);

const Differentiators = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const { differentiators } = homeContent;

  const iconByDifferentialId = {
    commitment: Handshake,
    'integrated-approach': Layers,
    'real-impact': Target,
  } as const;

  useEffect(() => {
    const triggers: ScrollTrigger[] = [];

    const ctx = gsap.context(() => {
      const contentTrigger = createRevealTrigger({
        trigger: contentRef.current,
        target: contentRef.current,
        start: 'top 85%',
        from: { opacity: 0, y: 30 },
        to: { opacity: 1, y: 0, duration: 0.6, ease: 'expo.out' },
      });
      if (contentTrigger) {
        triggers.push(contentTrigger);
      }

      if (cardsRef.current) {
        const cards = cardsRef.current.querySelectorAll('.diff-card');

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
    <section ref={sectionRef} className="section-padding surface-contrast">
      <div className="container-clean">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          {/* Left - Content */}
          <div ref={contentRef} className="opacity-0">
            <span className="badge mb-6 inline-flex">{differentiators.badge}</span>
            <h2 className="section-title mb-6">
              {renderTextSegments(differentiators.titleSegments, { gradient: 'text-gradient' })}
            </h2>
            <p className="section-intro">{differentiators.intro}</p>
          </div>

          {/* Right - Cards */}
          <div ref={cardsRef} className="space-y-4">
            {differentiators.items.map((diff) => {
              const Icon = iconByDifferentialId[diff.id];
              return (
                <div
                  key={diff.id}
                  className="diff-card card-clean flex items-start gap-5 p-6 group opacity-0"
                >
                  <div className="icon-box flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                    <Icon />
                  </div>
                  <div>
                    <h3
                      className="text-base font-semibold mb-2 group-hover:text-iplura-purple transition-colors duration-300"
                      style={{ color: 'hsl(var(--iplura-dark))' }}
                    >
                      {diff.title}
                    </h3>
                    <p className="text-sm leading-relaxed" style={{ color: 'hsl(var(--iplura-gray))' }}>
                      {diff.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Differentiators;
