import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Target, Eye, Handshake, ShieldCheck, BookOpenCheck, Sparkles } from 'lucide-react';
import { homeContent } from '@/content/home';

gsap.registerPlugin(ScrollTrigger);

const About = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const { about } = homeContent;

  const iconByValueId = {
    wellbeing: Handshake,
    'shared-responsibility': ShieldCheck,
    ethics: Sparkles,
    education: BookOpenCheck,
    'regulatory-effectiveness': Target,
    innovation: Eye,
  } as const;

  useEffect(() => {
    const triggers: ScrollTrigger[] = [];

    const ctx = gsap.context(() => {
      const revealItems = sectionRef.current?.querySelectorAll('.about-reveal');

      if (!revealItems || revealItems.length === 0) return;

      const revealTrigger = ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top 78%',
        onEnter: () => {
          gsap.fromTo(
            revealItems,
            { opacity: 0, y: 32 },
            {
              opacity: 1,
              y: 0,
              duration: 0.72,
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
      id="sobre"
      ref={sectionRef}
      className="relative section-padding surface-base overflow-hidden section-separator-soft"
    >
      <div
        className="absolute top-10 left-[5%] h-40 w-40 rounded-full bg-iplura-purple/11 blur-3xl parallax-soft"
        data-parallax="0.1"
      />
      <div
        className="absolute bottom-0 right-[8%] h-52 w-52 rounded-full bg-iplura-purple-accent/12 blur-3xl parallax-soft"
        data-parallax="0.12"
      />

      <div className="container-clean relative z-10">
        <div className="grid lg:grid-cols-12 gap-8 xl:gap-10 items-start">
          <div className="lg:col-span-6 about-reveal opacity-0">
            <span className="badge mb-6 inline-flex">{about.badge}</span>
            <h2 className="section-title mb-6 max-w-[15ch]">
              {about.title}
            </h2>
            <p className="section-intro max-w-[38rem]">
              {about.intro}
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              {about.pills.map((pill) => (
                <span key={pill} className="metric-pill">
                  {pill}
                </span>
              ))}
            </div>
          </div>

          <div className="lg:col-span-6 about-reveal opacity-0 lg:pt-10 xl:pt-12">
            <div className="flex justify-center px-3 sm:px-4 py-3 sm:py-4 mb-5 sm:mb-6 lg:mb-9 xl:mb-10">
              <img
                src="/iplura-logo-icon-wordmark-description.svg"
                alt="IPLURA - Instituto de Promoção da Legalidade e Uso Responsável de Apostas"
                className="w-full max-w-[25rem] h-auto object-contain"
                loading="lazy"
                decoding="async"
              />
            </div>
            <article className="panel-premium p-7 sm:p-8">
              <p className="text-xs uppercase tracking-[0.11em] text-iplura-purple font-semibold mb-3">
                {about.statement.label}
              </p>
              <h3 className="text-2xl font-semibold text-iplura-dark leading-[1.24] mb-4">
                {about.statement.title}
              </h3>
              <p className="text-base leading-[1.72] text-iplura-gray">
                {about.statement.description}
              </p>
            </article>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-5 mt-10 lg:mt-12">
          <article className="panel-premium p-6 about-reveal opacity-0">
            <div className="inline-flex items-center justify-center w-11 h-11 rounded-xl bg-iplura-purple/10 border border-iplura-purple/16 mb-4">
              <Target className="w-5 h-5 text-iplura-purple" />
            </div>
            <h3 className="text-xl font-semibold mb-3 text-iplura-dark">{about.mission.title}</h3>
            <p className="text-sm leading-[1.72] text-iplura-gray">
              {about.mission.description}
            </p>
          </article>

          <article className="panel-premium p-6 about-reveal opacity-0">
            <div className="inline-flex items-center justify-center w-11 h-11 rounded-xl bg-iplura-purple/10 border border-iplura-purple/16 mb-4">
              <Eye className="w-5 h-5 text-iplura-purple" />
            </div>
            <h3 className="text-xl font-semibold mb-3 text-iplura-dark">{about.vision.title}</h3>
            <p className="text-sm leading-[1.72] text-iplura-gray">
              {about.vision.description}
            </p>
          </article>
        </div>

        <div className="mt-12 lg:mt-14">
          <div className="about-reveal opacity-0 mb-6 lg:mb-8">
            <p className="text-xs uppercase tracking-[0.12em] text-iplura-purple font-semibold mb-2">
              {about.values.label}
            </p>
            <h3 className="text-2xl sm:text-3xl font-semibold text-iplura-dark leading-[1.2]">
              {about.values.title}
            </h3>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-5">
            {about.values.items.map((value) => {
              const Icon = iconByValueId[value.id];

              return (
                <article
                  key={value.id}
                  className="card-clean p-6 about-reveal opacity-0 group"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <span className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-iplura-purple/10 border border-iplura-purple/15 group-hover:border-iplura-purple/28 transition-colors duration-300">
                      <Icon className="w-4 h-4 text-iplura-purple" />
                    </span>
                    <span className="h-px flex-1 bg-iplura-purple/16 group-hover:bg-iplura-purple/24 transition-colors duration-300" />
                  </div>
                  <h4 className="text-base font-semibold text-iplura-dark leading-[1.4] mb-2.5">
                    {value.title}
                  </h4>
                  <p className="text-sm leading-[1.7] text-iplura-gray">{value.description}</p>
                </article>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
