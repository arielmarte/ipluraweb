import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Heart, Building2, GraduationCap, ArrowUpRight } from 'lucide-react';
import { homeContent } from '@/content/home';
import { renderTextSegments } from '@/utils/renderTextSegments';

gsap.registerPlugin(ScrollTrigger);

const Solutions = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const { solutions } = homeContent;

  const iconBySolutionId = {
    'psychological-support': Heart,
    'operator-support': Building2,
    academy: GraduationCap,
  } as const;

  const gradientBySolutionId = {
    'psychological-support': 'from-violet-500/10 to-violet-600/5',
    'operator-support': 'from-violet-500/10 to-violet-600/5',
    academy: 'from-violet-500/10 to-violet-600/5',
  } as const;

  useEffect(() => {
    const triggers: ScrollTrigger[] = [];

    const ctx = gsap.context(() => {
      // Header animation
      const headerTrigger = ScrollTrigger.create({
        trigger: headerRef.current,
        start: 'top 85%',
        onEnter: () => {
          gsap.fromTo(
            headerRef.current,
            { opacity: 0, y: 30 },
            { opacity: 1, y: 0, duration: 0.6, ease: 'expo.out' }
          );
        },
        once: true,
      });
      triggers.push(headerTrigger);

      // Cards animation
      if (cardsRef.current) {
        const cards = cardsRef.current.querySelectorAll('.solution-card');

        const cardsTrigger = ScrollTrigger.create({
          trigger: cardsRef.current,
          start: 'top 80%',
          onEnter: () => {
            gsap.fromTo(
              cards,
              { opacity: 0, y: 40 },
              {
                opacity: 1,
                y: 0,
                duration: 0.7,
                stagger: 0.15,
                ease: 'expo.out',
              }
            );
          },
          once: true,
        });
        triggers.push(cardsTrigger);
      }
    }, sectionRef);

    return () => {
      triggers.forEach((trigger) => trigger.kill());
      ctx.revert();
    };
  }, []);

  return (
    <section
      id="solucoes"
      ref={sectionRef}
      className="section-padding surface-base section-separator-soft"
    >
      <div className="container-clean">
        {/* Header */}
        <div ref={headerRef} className="text-center max-w-3xl mx-auto mb-16 opacity-0">
          <span className="badge mb-6 inline-flex">{solutions.badge}</span>
          <h2 className="section-title">
            {renderTextSegments(solutions.titleSegments, { gradient: 'text-gradient' })}
          </h2>
        </div>

        {/* Cards */}
        <div ref={cardsRef} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {solutions.cards.map((solution) => {
            const Icon = iconBySolutionId[solution.id];
            const gradient = gradientBySolutionId[solution.id];
            return (
              <div
                key={solution.id}
                className="solution-card card-clean relative overflow-hidden p-8 group cursor-pointer opacity-0"
              >
                {/* Gradient background */}
                <div
                  className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
                />

                <div className="relative z-10">
                  {/* Icon */}
                  <div className="icon-box mb-6 group-hover:scale-110 transition-transform duration-300">
                    <Icon />
                  </div>

                  {/* Title */}
                  <h3
                    className="text-xl font-semibold mb-4 group-hover:text-iplura-purple transition-colors duration-300"
                    style={{ color: 'hsl(var(--iplura-dark))' }}
                  >
                    {solution.title}
                  </h3>

                  {/* Description */}
                  <p className="text-sm leading-relaxed mb-6" style={{ color: 'hsl(var(--iplura-gray))' }}>
                    {solution.description}
                  </p>

                  {/* Link */}
                  <a
                    href={solutions.linkHref}
                    onClick={(e) => {
                      e.preventDefault();
                      document
                        .querySelector(solutions.linkHref)
                        ?.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="inline-flex items-center gap-2 text-sm font-medium group/link"
                    style={{ color: 'hsl(var(--iplura-purple))' }}
                  >
                    {solutions.linkLabel}
                    <ArrowUpRight className="w-4 h-4 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform" />
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Solutions;
