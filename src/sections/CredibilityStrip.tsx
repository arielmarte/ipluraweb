import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Scale, HeartHandshake, GraduationCap, Building2, ArrowRight } from 'lucide-react';
import { homeContent } from '@/content/home';
import { createRevealTrigger } from '@/lib/gsap/reveal';
import { scrollToAnchor } from '@/lib/scrollToAnchor';

gsap.registerPlugin(ScrollTrigger);

const CredibilityStrip = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const { credibilityStrip } = homeContent;

  const iconByPillarId = {
    compliance: Scale,
    care: HeartHandshake,
    education: GraduationCap,
    integration: Building2,
  } as const;

  useEffect(() => {
    const triggers: ScrollTrigger[] = [];

    const ctx = gsap.context(() => {
      const headerTrigger = createRevealTrigger({
        trigger: headerRef.current,
        target: headerRef.current,
        start: 'top 86%',
        from: { opacity: 0, y: 28 },
        to: { opacity: 1, y: 0, duration: 0.65, ease: 'expo.out' },
      });
      if (headerTrigger) {
        triggers.push(headerTrigger);
      }

      if (listRef.current) {
        const listItems = listRef.current.querySelectorAll('.pillar-item');

        const listTrigger = createRevealTrigger({
          trigger: listRef.current,
          target: listItems,
          start: 'top 84%',
          from: { opacity: 0, y: 24 },
          to: {
            opacity: 1,
            y: 0,
            duration: 0.58,
            stagger: 0.08,
            ease: 'expo.out',
          },
        });
        if (listTrigger) {
          triggers.push(listTrigger);
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
      id="fundamentos"
      ref={sectionRef}
      className="py-16 lg:py-20 surface-base"
    >
      <div className="container-clean">
        <div className="panel-premium p-6 sm:p-8 lg:p-10">
          <div className="grid lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] gap-8 lg:gap-10 items-start">
            <div ref={headerRef} className="opacity-0">
              <span className="badge mb-5 inline-flex">{credibilityStrip.badge}</span>
              <h2 className="section-title text-[clamp(2rem,3.2vw,2.75rem)] mb-4 max-w-[14ch]">
                {credibilityStrip.title}
              </h2>
              <p className="text-base leading-[1.72] text-iplura-gray max-w-[34ch] mb-6">
                {credibilityStrip.intro}
              </p>

              <a
                href={credibilityStrip.cta.href}
                onClick={(e) => {
                  e.preventDefault();
                  scrollToAnchor(credibilityStrip.cta.href);
                }}
                className="inline-flex items-center gap-2 text-sm font-semibold text-iplura-purple hover:text-iplura-purple-accent transition-colors"
              >
                {credibilityStrip.cta.label}
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>

            <div ref={listRef} className="divide-y divide-iplura-purple/14">
              {credibilityStrip.pillars.map((pillar) => {
                const Icon = iconByPillarId[pillar.id];

                return (
                  <article
                    key={pillar.id}
                    className="pillar-item opacity-0 py-5 first:pt-0 last:pb-0"
                  >
                    <div className="grid sm:grid-cols-[auto_1fr] gap-4 sm:gap-5 items-start">
                      <span className="inline-flex w-11 h-11 rounded-xl items-center justify-center bg-iplura-purple/10 border border-iplura-purple/16">
                        <Icon className="w-5 h-5 text-iplura-purple" />
                      </span>
                      <div>
                        <h3 className="text-lg font-semibold text-iplura-dark mb-1.5 leading-[1.3]">
                          {pillar.title}
                        </h3>
                        <p className="text-sm leading-[1.68] text-iplura-gray max-w-[58ch]">
                          {pillar.description}
                        </p>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CredibilityStrip;
