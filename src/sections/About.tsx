import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Target, Eye, Handshake, ShieldCheck, BookOpenCheck, Sparkles } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const values = [
  {
    title: 'Compromisso com o bem-estar do apostador',
    description: 'Proteção efetiva do usuário como prioridade contínua.',
    icon: Handshake,
  },
  {
    title: 'Responsabilidade compartilhada',
    description: 'Operadora, plataforma e suporte atuando de forma coordenada.',
    icon: ShieldCheck,
  },
  {
    title: 'Transparência e ética institucional',
    description: 'Decisões claras, rastreáveis e alinhadas ao interesse público.',
    icon: Sparkles,
  },
  {
    title: 'Educação como ferramenta de transformação',
    description: 'Conhecimento aplicado para prevenir risco e ampliar consciência.',
    icon: BookOpenCheck,
  },
  {
    title: 'Efetividade regulatória com impacto real',
    description: 'Conformidade convertida em prática operacional consistente.',
    icon: Target,
  },
  {
    title: 'Inovação com propósito',
    description: 'Evolução contínua com foco em resultado humano e institucional.',
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
          <div className="lg:col-span-6 about-reveal opacity-0">
            <span className="badge mb-6 inline-flex">Sobre</span>
            <h2 className="section-title mb-6 max-w-[15ch]">
              Arquitetura institucional para jogo responsável de alto padrão
            </h2>
            <p className="section-intro max-w-[38rem]">
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

          <article className="lg:col-span-6 panel-premium about-reveal opacity-0 p-7 sm:p-8">
            <p className="text-xs uppercase tracking-[0.11em] text-iplura-purple font-semibold mb-3">
              Declaração institucional
            </p>
            <h3 className="text-2xl font-semibold text-iplura-dark leading-[1.24] mb-4">
              O objetivo é unir crescimento de mercado e proteção real do usuário
            </h3>
            <p className="text-base leading-[1.72] text-iplura-gray">
              A atuação do IPLURA conecta estratégia, execução e evidência de conformidade para que
              o jogo responsável deixe de ser apenas obrigação formal e passe a estruturar a
              maturidade institucional da operação.
            </p>
          </article>
        </div>

        <div className="grid md:grid-cols-2 gap-5 mt-10 lg:mt-12">
          <article className="panel-premium p-6 about-reveal opacity-0">
            <div className="inline-flex items-center justify-center w-11 h-11 rounded-xl bg-iplura-purple/10 border border-iplura-purple/16 mb-4">
              <Target className="w-5 h-5 text-iplura-purple" />
            </div>
            <h3 className="text-xl font-semibold mb-3 text-iplura-dark">Missão</h3>
            <p className="text-sm leading-[1.72] text-iplura-gray">
              Atuar como parceiro estratégico das operadoras, oferecendo suporte técnico às
              plataformas, acolhimento qualificado aos usuários em risco e ações educativas para
              saúde financeira, equilíbrio emocional e consumo consciente.
            </p>
          </article>

          <article className="panel-premium p-6 about-reveal opacity-0">
            <div className="inline-flex items-center justify-center w-11 h-11 rounded-xl bg-iplura-purple/10 border border-iplura-purple/16 mb-4">
              <Eye className="w-5 h-5 text-iplura-purple" />
            </div>
            <h3 className="text-xl font-semibold mb-3 text-iplura-dark">Visão</h3>
            <p className="text-sm leading-[1.72] text-iplura-gray">
              Ser a principal referência em jogo responsável no Brasil, contribuindo para um setor
              mais ético, sustentável e centrado na proteção efetiva do apostador.
            </p>
          </article>
        </div>

        <div className="mt-12 lg:mt-14">
          <div className="about-reveal opacity-0 mb-6 lg:mb-8">
            <p className="text-xs uppercase tracking-[0.12em] text-iplura-purple font-semibold mb-2">
              Valores
            </p>
            <h3 className="text-2xl sm:text-3xl font-semibold text-iplura-dark leading-[1.2]">
              Princípios que orientam decisões e execução institucional
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
