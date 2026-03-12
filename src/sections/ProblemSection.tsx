import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { AlertTriangle, ShieldAlert, Workflow } from 'lucide-react';
import { homeContent } from '@/content/home';
import { createRevealTrigger } from '@/lib/gsap/reveal';

gsap.registerPlugin(ScrollTrigger);

const ProblemSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const { problemSection } = homeContent;

  const iconByStepId = {
    growth: AlertTriangle,
    'operational-consequence': ShieldAlert,
    'strategic-response': Workflow,
  } as const;

  useEffect(() => {
    const triggers: ScrollTrigger[] = [];

    const ctx = gsap.context(() => {
      const revealItems = sectionRef.current?.querySelectorAll('.problem-reveal');

      if (!revealItems || revealItems.length === 0) return;

      const revealTrigger = createRevealTrigger({
        trigger: sectionRef.current,
        target: revealItems,
        start: 'top 78%',
        from: { opacity: 0, y: 34 },
        to: {
          opacity: 1,
          y: 0,
          duration: 0.72,
          stagger: 0.08,
          ease: 'expo.out',
        },
      });

      if (revealTrigger) {
        triggers.push(revealTrigger);
      }
    }, sectionRef);

    return () => {
      triggers.forEach((trigger) => trigger.kill());
      ctx.revert();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative section-padding overflow-hidden surface-alt"
    >
      <div
        className="absolute -top-16 left-[8%] h-36 w-36 rounded-full bg-iplura-purple/10 blur-3xl parallax-soft"
        data-parallax="0.12"
      />
      <div
        className="absolute bottom-8 right-[10%] h-40 w-40 rounded-full bg-iplura-purple-accent/12 blur-3xl parallax-soft"
        data-parallax="0.14"
      />

      <div className="container-clean relative z-10">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          <div className="lg:col-span-5 problem-reveal opacity-0">
            <span className="badge mb-6 inline-flex">{problemSection.badge}</span>
            <h2 className="section-title mb-6 max-w-[14ch]">
              {problemSection.title}
            </h2>
            <p className="section-intro max-w-[34rem]">
              {problemSection.intro}
            </p>

            <div className="panel-premium-dark p-6 mt-7 problem-reveal opacity-0 text-white">
              <p className="text-xs uppercase tracking-[0.1em] font-semibold text-white mb-2">
                {problemSection.criticalLabel}
              </p>
              <p className="text-base leading-[1.62] text-white font-semibold">
                {problemSection.criticalText}
              </p>
            </div>
          </div>

          <div className="lg:col-span-6 lg:col-start-7 problem-reveal opacity-0">
            <div className="relative pl-5 sm:pl-7">
              <div className="absolute left-0 top-1 bottom-1 w-px bg-iplura-purple/24" />

              <div className="space-y-5 max-w-[45rem]">
                {problemSection.steps.map((step, index) => {
                  const Icon = iconByStepId[step.id];

                  return (
                    <article key={step.title} className="relative">
                      <span className="absolute -left-[26px] sm:-left-[34px] top-7 inline-flex w-5 h-5 rounded-full bg-iplura-purple border-2 border-white shadow-[0_0_0_4px_rgba(65,35,122,0.12)]" />

                      <div className="panel-premium p-6 sm:p-7">
                        <div className="flex items-start justify-between gap-4 mb-3">
                          <p className="text-[0.68rem] uppercase tracking-[0.12em] text-iplura-purple font-semibold">
                            {problemSection.stepPrefix} {String(index + 1).padStart(2, '0')}
                          </p>
                          <span className="inline-flex w-10 h-10 items-center justify-center rounded-xl bg-iplura-purple/10 border border-iplura-purple/16">
                            <Icon className="w-5 h-5 text-iplura-purple" />
                          </span>
                        </div>

                        <h3 className="text-xl font-semibold text-iplura-dark leading-[1.28] mb-2.5 max-w-[32ch]">
                          {step.title}
                        </h3>
                        <p className="text-sm leading-[1.7] text-iplura-gray max-w-[52ch]">
                          {step.description}
                        </p>
                      </div>
                    </article>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProblemSection;
