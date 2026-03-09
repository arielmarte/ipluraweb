import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ArrowRight, ShieldCheck, HeartHandshake } from 'lucide-react';

const Hero = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subheadlineRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const detailsRef = useRef<HTMLDivElement>(null);
  const visualRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
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
        )
        .fromTo(
          detailsRef.current?.children || [],
          { opacity: 0, y: 16 },
          { opacity: 1, y: 0, duration: 0.55, stagger: 0.08 },
          '-=0.25'
        )
        .fromTo(
          visualRef.current,
          { opacity: 0, x: 30, scale: 0.98 },
          { opacity: 1, x: 0, scale: 1, duration: 1 },
          '-=0.45'
        );

      if (!prefersReducedMotion && sectionRef.current && visualRef.current) {
        gsap.to(visualRef.current, {
          yPercent: -7,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top top',
            end: 'bottom top',
            scrub: true,
          },
        });
      }
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
      className="relative min-h-screen flex items-center pt-28 pb-20 surface-hero"
    >
      <div
        className="absolute -top-10 left-[7%] h-44 w-44 rounded-full bg-iplura-purple/14 blur-3xl parallax-soft"
        data-parallax="0.08"
      />
      <div
        className="absolute top-[16%] right-[2%] h-56 w-56 rounded-full bg-iplura-purple-accent/16 blur-3xl parallax-soft"
        data-parallax="0.14"
      />
      <div
        className="absolute bottom-[7%] left-[42%] h-40 w-40 rounded-full bg-iplura-purple/10 blur-2xl parallax-soft"
        data-parallax="0.12"
      />

      <div className="container-clean relative z-10">
        <div className="grid lg:grid-cols-[minmax(0,1.02fr)_minmax(0,0.98fr)] items-center gap-12 lg:gap-14 xl:gap-16">
          <div>
            <div ref={badgeRef} className="mb-8 opacity-0">
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold tracking-[0.12em] uppercase border border-iplura-purple/20 bg-iplura-purple/10 text-iplura-purple">
                <span className="w-1.5 h-1.5 rounded-full bg-iplura-purple animate-pulse" />
                Instituto de Jogo Responsável
              </span>
            </div>

            <h1
              ref={headlineRef}
              className="relative z-20 text-[clamp(2.12rem,4.05vw,3.78rem)] font-semibold leading-[1.15] mb-6 text-iplura-dark opacity-0 max-w-[17ch]"
              style={{ letterSpacing: '-0.035em' }}
            >
              Jogo responsável com
              <span className="text-gradient"><br/>estrutura técnica, humana e regulatória</span>
            </h1>

            <p
              ref={subheadlineRef}
              className="relative z-10 section-intro text-lg sm:text-[1.14rem] mb-9 max-w-[35rem] opacity-0"
            >
              O IPLURA apoia operadoras de apostas com acolhimento especializado, educação
              preventiva e implementação de processos que transformam conformidade em cuidado real.
            </p>

            <div ref={ctaRef} className="flex flex-col sm:flex-row items-start gap-4">
              <a
                href="#contato"
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection('#contato');
                }}
                className="btn-primary w-full sm:w-auto text-center"
              >
                Falar com o IPLURA
              </a>
              <a
                href="#solucoes"
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection('#solucoes');
                }}
                className="btn-secondary group w-full sm:w-auto text-center"
              >
                Conhecer soluções
                <ArrowRight className="w-4 h-4 ml-2 inline group-hover:translate-x-1 transition-transform" />
              </a>
            </div>

            <div ref={detailsRef} className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-[38rem]">
              <div className="glass-chip opacity-0">
                <ShieldCheck className="w-4 h-4 text-iplura-purple mb-2" />
                <p className="text-xs uppercase tracking-[0.1em] text-iplura-dark/70 mb-1">Governança</p>
                <p className="text-sm text-iplura-dark font-medium leading-[1.4]">Conformidade prática e auditável</p>
              </div>
              <div className="glass-chip opacity-0">
                <HeartHandshake className="w-4 h-4 text-iplura-purple mb-2" />
                <p className="text-xs uppercase tracking-[0.1em] text-iplura-dark/70 mb-1">Cuidado</p>
                <p className="text-sm text-iplura-dark font-medium leading-[1.4]">Acolhimento qualificado ao usuário</p>
              </div>
            </div>

            <a
              href="#fundamentos"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection('#fundamentos');
              }}
              className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-iplura-purple hover:text-iplura-purple-accent transition-colors"
            >
              Ver fundamentos operacionais
              <ArrowRight className="w-4 h-4 rotate-90" />
            </a>
          </div>

          <div
            ref={visualRef}
            className="relative opacity-0 parallax-soft"
            data-parallax="0.09"
          >
            <div className="absolute -inset-7 rounded-[2.4rem] bg-gradient-to-br from-iplura-purple/14 via-transparent to-iplura-purple-accent/10 blur-2xl -z-10 pointer-events-none" />

            <div className="hero-visual-shell">
              <div className="hero-visual-media">
                <img
                  src="/sasha-freemind-e_YlUfX0iKY-unsplash.jpg"
                  alt="Profissional em acolhimento e suporte responsável"
                  className="w-full h-[460px] sm:h-[520px] lg:h-[610px] object-cover object-center"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-iplura-dark/54 via-iplura-dark/12 to-white/0" />
                <div className="absolute inset-0 bg-gradient-to-br from-white/24 via-transparent to-iplura-dark/30 mix-blend-soft-light" />
                <div className="absolute inset-[9px] rounded-[1.62rem] border border-white/30 pointer-events-none" />
              </div>
            </div>

            <div
              className="absolute z-20 top-5 right-5 glass-chip max-w-[220px] parallax-soft"
              data-parallax="0.18"
            >
              <div className="flex items-center gap-2 mb-1">
                <span className="w-1.5 h-1.5 rounded-full bg-iplura-purple animate-pulse" />
                <p className="text-xs tracking-[0.09em] uppercase text-iplura-dark/75">Atuação integrada</p>
              </div>
              <p className="text-sm text-iplura-dark font-semibold leading-[1.35]">
                Técnico, humano e regulatório em um só fluxo.
              </p>
            </div>

            <div
              className="absolute z-20 bottom-6 left-5 right-5 glass-chip parallax-soft"
              data-parallax="0.14"
            >
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-xs uppercase tracking-[0.1em] text-iplura-dark/70 mb-1">Maturidade operacional</p>
                  <p className="text-sm text-iplura-dark font-semibold">Protocolos, evidências e prevenção contínua</p>
                </div>
                <div className="w-11 h-11 rounded-xl bg-iplura-purple/12 border border-iplura-purple/20 flex items-center justify-center">
                  <ArrowRight className="w-5 h-5 text-iplura-purple" />
                </div>
              </div>
            </div>

            <div
              className="hidden lg:block absolute z-20 -left-4 bottom-24 glass-chip max-w-[190px] parallax-soft"
              data-parallax="0.12"
            >
              <p className="text-xs tracking-[0.1em] uppercase text-iplura-dark/70 mb-1">Implementação</p>
              <p className="text-sm text-iplura-dark font-semibold leading-[1.35]">
                Protocolos aplicados ao dia a dia da operação.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
