import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ShieldCheck, LineChart, Scale, BadgeCheck } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const trustSignals = [
  {
    title: 'Governança aplicável',
    description: 'Protocolos claros, fluxos definidos e evidências rastreáveis para auditoria.',
  },
  {
    title: 'Proteção efetiva do usuário',
    description: 'Integração entre acolhimento qualificado, prevenção e tomada de decisão responsável.',
  },
  {
    title: 'Evolução contínua da operação',
    description: 'Capacitação recorrente e revisão estratégica com foco em melhoria de resultado.',
  },
  {
    title: 'Conexão com áreas críticas',
    description: 'Atuação integrada com Compliance, atendimento, risco e liderança institucional.',
  },
];

const Trust = () => {
  const sectionRef = useRef<HTMLElement>(null);

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
      ref={sectionRef}
      className="relative section-padding surface-alt overflow-hidden"
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
          <span className="badge mb-6 inline-flex">Base de Confiança</span>
          <h2
            className="text-3xl sm:text-4xl lg:text-5xl font-semibold leading-[1.14] mb-5"
            style={{ color: 'hsl(var(--iplura-dark))', letterSpacing: '-0.024em' }}
          >
            Autoridade institucional construída com{' '}
            <span className="text-gradient">método, transparência e resultado</span>
          </h2>
          <p className="section-intro mx-auto">
            A confiança no IPLURA vem da combinação entre rigor técnico, visão regulatória e foco
            humano. A atuação não se limita ao discurso: ela se converte em estrutura operacional
            concreta para as operadoras.
          </p>
        </div>

        <div className="grid lg:grid-cols-12 gap-6 lg:gap-7 items-stretch">
          <article className="lg:col-span-7 panel-premium p-8 sm:p-9 trust-reveal opacity-0">
            <p className="text-xs uppercase tracking-[0.12em] font-semibold text-iplura-purple mb-3">
              Pilar principal
            </p>
            <h3 className="text-2xl sm:text-[1.85rem] font-semibold leading-[1.18] text-iplura-dark mb-4">
              Estrutura técnica que protege reputação, operação e apostador ao mesmo tempo
            </h3>
            <p className="text-base sm:text-[1.03rem] leading-[1.72] text-iplura-gray max-w-[64ch]">
              O IPLURA conecta diagnóstico, protocolos, capacitação e acompanhamento contínuo para
              criar um modelo de jogo responsável com consistência institucional e execução diária.
            </p>

            <div className="mt-8 grid sm:grid-cols-2 gap-4">
              {trustSignals.map((item, index) => (
                <div
                  key={item.title}
                  className="rounded-2xl border border-iplura-purple/14 bg-white/75 p-4"
                >
                  <p className="text-[0.68rem] uppercase tracking-[0.12em] font-semibold text-iplura-purple mb-2">
                    Frente {String(index + 1).padStart(2, '0')}
                  </p>
                  <h4 className="text-base font-semibold text-iplura-dark leading-[1.35] mb-1.5">
                    {item.title}
                  </h4>
                  <p className="text-sm leading-[1.65] text-iplura-gray">{item.description}</p>
                </div>
              ))}
            </div>
          </article>

          <div className="lg:col-span-5 grid sm:grid-cols-2 lg:grid-cols-1 gap-6">
            <article className="panel-premium p-6 trust-reveal opacity-0">
              <span className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-iplura-purple/10 border border-iplura-purple/16 mb-4">
                <LineChart className="w-5 h-5 text-iplura-purple" />
              </span>
              <h4 className="text-lg font-semibold text-iplura-dark mb-2.5">Respaldo técnico</h4>
              <p className="text-sm leading-[1.68] text-iplura-gray">
                Diagnóstico situacional, definição de riscos prioritários e desenho de planos de
                ação com metas operacionais claras.
              </p>
            </article>

            <article className="panel-premium p-6 trust-reveal opacity-0">
              <span className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-iplura-purple/10 border border-iplura-purple/16 mb-4">
                <Scale className="w-5 h-5 text-iplura-purple" />
              </span>
              <h4 className="text-lg font-semibold text-iplura-dark mb-2.5">Segurança regulatória</h4>
              <p className="text-sm leading-[1.68] text-iplura-gray">
                Alinhamento com exigências normativas sem perder foco na viabilidade operacional e
                no impacto humano das decisões.
              </p>
            </article>

            <article className="panel-premium-dark p-6 trust-reveal opacity-0 text-white sm:col-span-2 lg:col-span-1">
              <div className="flex items-center gap-3 mb-3">
                <span className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-white/10 border border-white/20">
                  <ShieldCheck className="w-5 h-5 text-white" />
                </span>
                <p className="text-xs uppercase tracking-[0.1em] font-semibold text-white/78">
                  Diferenciação IPLURA
                </p>
              </div>
              <p className="text-lg leading-[1.46] font-semibold text-white mb-3">
                “Conformidade só é completa quando vira proteção real para o apostador.”
              </p>
              <div className="flex items-center gap-2 text-white/80">
                <BadgeCheck className="w-4 h-4" />
                <p className="text-sm leading-[1.55]">
                  Método proprietário com visão estratégica de longo prazo para o setor.
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
