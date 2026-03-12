import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { homeContent } from '@/content/home';
import { createRevealTrigger } from '@/lib/gsap/reveal';
import { renderTextSegments } from '@/utils/renderTextSegments';

gsap.registerPlugin(ScrollTrigger);

const Methodology = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const stepsRef = useRef<HTMLDivElement>(null);
  const { methodology } = homeContent;

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

      if (stepsRef.current) {
        const stepItems = stepsRef.current.querySelectorAll('.step-item');

        const stepsTrigger = createRevealTrigger({
          trigger: stepsRef.current,
          target: stepItems,
          start: 'top 80%',
          from: { opacity: 0, x: -30 },
          to: {
            opacity: 1,
            x: 0,
            duration: 0.6,
            stagger: 0.12,
            ease: 'expo.out',
          },
        });
        if (stepsTrigger) {
          triggers.push(stepsTrigger);
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
      id="como-funciona"
      ref={sectionRef}
      className="section-padding surface-alt"
    >
      <div className="container-clean">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-start">
          {/* Left - Header */}
          <div ref={headerRef} className="lg:sticky lg:top-32 opacity-0">
            <span className="badge mb-6 inline-flex">{methodology.badge}</span>
            <h2 className="section-title mb-6">
              {renderTextSegments(methodology.titleSegments, { gradient: 'text-gradient' })}
            </h2>
            <p className="section-intro">{methodology.intro}</p>
          </div>

          {/* Right - Steps */}
          <div ref={stepsRef} className="space-y-6">
            {methodology.steps.map((step) => (
              <div
                key={step.number}
                className="step-item card-clean flex items-start gap-6 p-6 group opacity-0"
              >
                {/* Number */}
                <div className="flex-shrink-0">
                  <span
                    className="text-2xl font-bold group-hover:text-iplura-purple-accent transition-colors duration-300"
                    style={{ color: 'hsl(var(--iplura-purple-accent) / 0.72)' }}
                  >
                    {step.number}
                  </span>
                </div>

                {/* Content */}
                <div>
                  <h3
                    className="text-lg font-semibold mb-2 group-hover:text-iplura-purple-accent transition-colors duration-300"
                    style={{ color: 'hsl(var(--iplura-dark))' }}
                  >
                    {step.title}
                  </h3>
                  <p className="text-sm leading-relaxed" style={{ color: 'hsl(var(--iplura-gray))' }}>
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Methodology;
