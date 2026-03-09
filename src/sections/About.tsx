import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Target, Eye, Handshake, ShieldCheck, BookOpenCheck, Sparkles } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const values = [
  {
    title: 'Compromisso com o bem-estar do apostador',
    description: 'Proteção efetiva do usuário como prioridade contínua da operação.',
    icon: Handshake,
  },
  {
    title: 'Responsabilidade compartilhada',
    description: 'Plataforma, operadora e suporte atuando de forma coordenada.',
    icon: ShieldCheck,
  },
  {
    title: 'Transparência e ética institucional',
    description: 'Decisões claras, rastreáveis e alinhadas ao interesse público.',
    icon: Sparkles,
  },
  {
    title: 'Educação como transformação',
    description: 'Conhecimento aplicado para prevenir risco e ampliar consciência.',
    icon: BookOpenCheck,
  },
  {
    title: 'Efetividade regulatória com impacto real',
    description: 'Conformidade traduzida em práticas operacionais que funcionam.',
    icon: Target,
  },
  {
    title: 'Inovação com propósito',
    description: 'Evolução contínua orientada por resultado humano e institucional.',
    icon: Eye,
  },
];

const About = () => {
  const sectionRef = useRef<HTMLElement>(null);

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
            { opacity: 0, y: 34 },
            {
              opacity: 1,
              y: 0,
              duration: 0.75,
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
      className="relative section-padding surface-base overflow-hidden"
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
          <div className="lg:col-span-5 about-reveal opacity-0">
            <span className="badge mb-6">Sobre</span>
            <h2
              className="text-3xl sm:text-4xl lg:text-5xl font-semibold leading-[1.14] mb-6 max-w-[13ch]"
              style={{ color: 'hsl(var(--iplura-dark))', letterSpacing: '-0.024em' }}
            >
              Base institucional para um setor mais responsável
            </h2>
            <p className="section-intro">
              O IPLURA atua como parceiro estratégico das operadoras de apostas para transformar
              responsabilidade em prática operacional, governança contínua e proteção efetiva ao
              apostador.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <span className="metric-pill">Suporte técnico aplicado</span>
              <span className="metric-pill">Acolhimento qualificado</span>
              <span className="metric-pill">Educação preventiva</span>
            </div>
          </div>

          <div className="lg:col-span-7 space-y-6">
            <div
              className="hero-visual-shell about-reveal opacity-0 parallax-soft"
              data-parallax="0.08"
            >
              <img
                src="/13on-HlcNKOAi5vQ-unsplash.jpg"
                alt="Fluxo urbano representando o contexto humano e social do jogo responsável"
                className="w-full h-[300px] sm:h-[360px] lg:h-[400px] object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-iplura-dark/60 via-iplura-dark/18 to-transparent" />
              <div className="absolute inset-[10px] rounded-[1.55rem] border border-white/24 pointer-events-none" />
              <div className="absolute left-5 bottom-5 glass-chip max-w-[18rem]">
                <p className="text-xs tracking-[0.1em] uppercase text-iplura-dark/70 mb-1">
                  Presença institucional
                </p>
                <p className="text-sm text-iplura-dark font-semibold leading-[1.35]">
                  Atuação estruturada para um ecossistema de apostas mais ético e sustentável.
                </p>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-5">
              <article className="panel-premium p-6 about-reveal opacity-0">
                <div className="inline-flex items-center justify-center w-11 h-11 rounded-xl bg-iplura-purple/10 border border-iplura-purple/16 mb-4">
                  <Target className="w-5 h-5 text-iplura-purple" />
                </div>
                <h3 className="text-xl font-semibold mb-3 text-iplura-dark">Missão</h3>
                <p className="text-sm leading-[1.72] text-iplura-gray">
                  Atuar como parceiro estratégico das operadoras, oferecendo suporte técnico às
                  plataformas, acolhimento qualificado aos usuários em risco e ações educativas
                  para saúde financeira, equilíbrio emocional e consumo consciente.
                </p>
              </article>

              <article className="panel-premium p-6 about-reveal opacity-0">
                <div className="inline-flex items-center justify-center w-11 h-11 rounded-xl bg-iplura-purple/10 border border-iplura-purple/16 mb-4">
                  <Eye className="w-5 h-5 text-iplura-purple" />
                </div>
                <h3 className="text-xl font-semibold mb-3 text-iplura-dark">Visão</h3>
                <p className="text-sm leading-[1.72] text-iplura-gray">
                  Ser a principal referência em jogo responsável no Brasil, promovendo um setor
                  mais ético, sustentável e centrado na proteção efetiva do apostador com impacto
                  humano real.
                </p>
              </article>
            </div>
          </div>
        </div>

        <div className="mt-12 lg:mt-14">
          <div className="about-reveal opacity-0 mb-6 lg:mb-8">
            <p className="text-xs uppercase tracking-[0.12em] text-iplura-purple font-semibold mb-2">
              Valores
            </p>
            <h3 className="text-2xl sm:text-3xl font-semibold text-iplura-dark leading-[1.2]">
              Princípios que orientam cada frente de atuação do IPLURA
            </h3>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-5">
            {values.map((value, index) => {
              const Icon = value.icon;

              return (
                <article
                  key={value.title}
                  className="card-clean p-6 about-reveal opacity-0"
                >
                  <div className="flex items-start justify-between gap-4 mb-4">
                    <span className="text-xs font-semibold tracking-[0.11em] uppercase text-iplura-purple">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    <span className="inline-flex items-center justify-center w-9 h-9 rounded-lg bg-iplura-purple/10 border border-iplura-purple/15">
                      <Icon className="w-4 h-4 text-iplura-purple" />
                    </span>
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
