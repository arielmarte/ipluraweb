import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ShieldCheck, LineChart, Scale, BadgeCheck } from 'lucide-react';
import { homeContent } from '@/content/home';
import { createRevealTrigger } from '@/lib/gsap/reveal';

gsap.registerPlugin(ScrollTrigger);

const Trust = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const { trust } = homeContent;

  useEffect(() => {
    const triggers: ScrollTrigger[] = [];

    const ctx = gsap.context(() => {
      const revealItems = sectionRef.current?.querySelectorAll('.trust-reveal');

      if (!revealItems || revealItems.length === 0) return;

      const revealTrigger = createRevealTrigger({
        trigger: sectionRef.current,
        target: revealItems,
        start: 'top 78%',
        from: { opacity: 0, y: 34 },
        to: {
          opacity: 1,
          y: 0,
          duration: 0.7,
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
      id="credenciais"
      ref={sectionRef}
      className="relative section-padding overflow-hidden bg-[linear-gradient(160deg,#F8F9FE_0%,#EEF1FA_34%,#41237A_122%)]"
    >
      <div
        className="absolute -top-8 left-[8%] h-40 w-40 rounded-full bg-iplura-purple/10 blur-3xl parallax-soft"
        data-parallax="0.1"
      />
      <div
        className="absolute bottom-0 right-[6%] h-48 w-48 rounded-full bg-iplura-purple-accent/13 blur-3xl parallax-soft"
        data-parallax="0.12"
      />

      <div className="container-clean relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-12 lg:mb-14 trust-reveal opacity-0">
          <span className="badge mb-6 inline-flex">{trust.badge}</span>
          <h2 className="section-title mb-5">
            {trust.title}
          </h2>
          <p className="section-intro mx-auto">
            {trust.intro}
          </p>
        </div>

        <div className="grid lg:grid-cols-12 gap-6 lg:gap-7 items-stretch">
          <article className="lg:col-span-7 panel-premium p-8 sm:p-9 trust-reveal opacity-0">
            <p className="text-xs uppercase tracking-[0.12em] font-semibold text-iplura-purple-accent mb-3">
              {trust.primary.label}
            </p>
            <h3 className="text-2xl sm:text-[1.78rem] font-semibold leading-[1.2] text-iplura-dark mb-4">
              {trust.primary.title}
            </h3>
            <p className="text-base leading-[1.66] text-iplura-gray max-w-[62ch]">
              {trust.primary.description}
            </p>

            <div className="mt-7 grid gap-4 md:grid-cols-2">
              {trust.fronts.map((item, index) => (
                <div
                  key={item.title}
                  className="rounded-2xl border border-iplura-purple/14 bg-white/78 p-4"
                >
                  <p className="text-[0.66rem] uppercase tracking-[0.12em] font-semibold text-iplura-purple-accent mb-2">
                    {trust.frontPrefix} {String(index + 1).padStart(2, '0')}
                  </p>
                  <h4 className="text-base font-semibold text-iplura-dark leading-[1.3] mb-1.5">
                    {item.title}
                  </h4>
                  <p className="text-sm leading-[1.6] text-iplura-gray">{item.description}</p>
                </div>
              ))}

              <div className="flex items-center justify-center min-h-[142px]">
                <img
                  src="/iplura-logo-icon.svg"
                  alt="Logo do IPLURA"
                  className="w-16 h-16 sm:w-20 sm:h-20 object-contain"
                  loading="lazy"
                  decoding="async"
                />
              </div>
            </div>
          </article>

          <div className="lg:col-span-5 grid sm:grid-cols-2 lg:grid-cols-1 gap-6">
            <article className="panel-premium p-6 trust-reveal opacity-0">
              <span className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-iplura-purple-accent/10 border border-iplura-purple-accent/20 mb-4">
                <LineChart className="w-5 h-5 text-iplura-purple-accent" />
              </span>
              <h4 className="text-lg font-semibold text-iplura-dark mb-2">
                {trust.sideCards[0].title}
              </h4>
              <p className="text-sm leading-[1.62] text-iplura-gray">
                {trust.sideCards[0].description}
              </p>
            </article>

            <article className="panel-premium p-6 trust-reveal opacity-0">
              <span className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-iplura-purple-accent/10 border border-iplura-purple-accent/20 mb-4">
                <Scale className="w-5 h-5 text-iplura-purple-accent" />
              </span>
              <h4 className="text-lg font-semibold text-iplura-dark mb-2">
                {trust.sideCards[1].title}
              </h4>
              <p className="text-sm leading-[1.62] text-iplura-gray">
                {trust.sideCards[1].description}
              </p>
            </article>

            <article className="panel-premium-dark p-6 trust-reveal opacity-0 text-[hsl(var(--iplura-light))] sm:col-span-2 lg:col-span-1">
              <div className="flex items-center gap-3 mb-3">
                <span className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-white/12 border border-white/24">
                  <ShieldCheck className="w-5 h-5 text-[hsl(var(--iplura-light))]" />
                </span>
                <p className="text-xs uppercase tracking-[0.1em] font-semibold text-[hsl(var(--iplura-light))/0.9]">
                  {trust.differentiation.label}
                </p>
              </div>
              <p className="text-lg leading-[1.42] font-semibold text-[hsl(var(--iplura-light))] mb-3">
                {trust.differentiation.title}
              </p>
              <div className="flex items-center gap-2 text-[hsl(var(--iplura-light))]">
                <BadgeCheck className="w-5 h-5 sm:w-4 sm:h-4 text-[hsl(var(--iplura-light))/0.95]" />
                <p className="text-sm leading-[1.5] text-[hsl(var(--iplura-light))]">
                  {trust.differentiation.description}
                </p>
              </div>
            </article>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Trust;
