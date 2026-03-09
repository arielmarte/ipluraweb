import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ShieldCheck, LineChart, Scale, BadgeCheck } from 'lucide-react';
import { homeContent } from '@/content/home';

gsap.registerPlugin(ScrollTrigger);

const Trust = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const { trust } = homeContent;

  useEffect(() => {
    const triggers: ScrollTrigger[] = [];

    const ctx = gsap.context(() => {
      const revealItems = sectionRef.current?.querySelectorAll('.trust-reveal');

      if (!revealItems || revealItems.length === 0) return;

      const revealTrigger = ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top 78%',
        onEnter: () => {
          gsap.fromTo(
            revealItems,
            { opacity: 0, y: 34 },
            {
              opacity: 1,
              y: 0,
              duration: 0.7,
              stagger: 0.08,
              ease: 'expo.out',
            }
          );
        },
        once: true,
      });

      triggers.push(revealTrigger);
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
      className="relative section-padding overflow-hidden bg-[linear-gradient(160deg,#F8F9FE_20%,#41237A_140%)]"
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
            <p className="text-xs uppercase tracking-[0.12em] font-semibold text-iplura-purple mb-3">
              {trust.primary.label}
            </p>
            <h3 className="text-2xl sm:text-[1.78rem] font-semibold leading-[1.2] text-iplura-dark mb-4">
              {trust.primary.title}
            </h3>
            <p className="text-base leading-[1.66] text-iplura-gray max-w-[62ch]">
              {trust.primary.description}
            </p>

            <div className="mt-7 grid sm:grid-cols-3 gap-4">
              {trust.fronts.map((item, index) => (
                <div
                  key={item.title}
                  className="rounded-2xl border border-iplura-purple/14 bg-white/78 p-4"
                >
                  <p className="text-[0.66rem] uppercase tracking-[0.12em] font-semibold text-iplura-purple mb-2">
                    {trust.frontPrefix} {String(index + 1).padStart(2, '0')}
                  </p>
                  <h4 className="text-base font-semibold text-iplura-dark leading-[1.3] mb-1.5">
                    {item.title}
                  </h4>
                  <p className="text-sm leading-[1.6] text-iplura-gray">{item.description}</p>
                </div>
              ))}
            </div>
          </article>

          <div className="lg:col-span-5 grid sm:grid-cols-2 lg:grid-cols-1 gap-6">
            <article className="panel-premium p-6 trust-reveal opacity-0">
              <span className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-iplura-purple/10 border border-iplura-purple/16 mb-4">
                <LineChart className="w-5 h-5 text-iplura-purple" />
              </span>
              <h4 className="text-lg font-semibold text-iplura-dark mb-2">
                {trust.sideCards[0].title}
              </h4>
              <p className="text-sm leading-[1.62] text-iplura-gray">
                {trust.sideCards[0].description}
              </p>
            </article>

            <article className="panel-premium p-6 trust-reveal opacity-0">
              <span className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-iplura-purple/10 border border-iplura-purple/16 mb-4">
                <Scale className="w-5 h-5 text-iplura-purple" />
              </span>
              <h4 className="text-lg font-semibold text-iplura-dark mb-2">
                {trust.sideCards[1].title}
              </h4>
              <p className="text-sm leading-[1.62] text-iplura-gray">
                {trust.sideCards[1].description}
              </p>
            </article>

            <article className="panel-premium-dark p-6 trust-reveal opacity-0 text-white sm:col-span-2 lg:col-span-1">
              <div className="flex items-center gap-3 mb-3">
                <span className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-white/12 border border-white/24">
                  <ShieldCheck className="w-5 h-5 text-white" />
                </span>
                <p className="text-xs uppercase tracking-[0.1em] font-semibold text-white/90">
                  {trust.differentiation.label}
                </p>
              </div>
              <p className="text-lg leading-[1.42] font-semibold text-white mb-3">
                {trust.differentiation.title}
              </p>
              <div className="flex items-center gap-2 text-white">
                <BadgeCheck className="w-4 h-4 text-white/95" />
                <p className="text-sm leading-[1.5] text-white">
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
