import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Scale, HeartHandshake, GraduationCap, Building2, ArrowRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const pillars = [
  {
    icon: Scale,
    title: 'Conformidade prática',
    description: 'Exigências regulatórias traduzidas em processo operacional executável.',
  },
  {
    icon: HeartHandshake,
    title: 'Acolhimento especializado',
    description: 'Suporte qualificado para usuários em risco com protocolo de cuidado.',
  },
  {
    icon: GraduationCap,
    title: 'Educação preventiva',
    description: 'Treinamentos contínuos para equipes e orientação ao usuário final.',
  },
  {
    icon: Building2,
    title: 'Atuação integrada',
    description: 'Conexão entre Compliance, atendimento e estratégia institucional.',
  },
];

const CredibilityStrip = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const triggers: ScrollTrigger[] = [];

    const ctx = gsap.context(() => {
      const headerTrigger = ScrollTrigger.create({
        trigger: headerRef.current,
        start: 'top 86%',
        onEnter: () => {
          gsap.fromTo(
            headerRef.current,
            { opacity: 0, y: 28 },
            { opacity: 1, y: 0, duration: 0.65, ease: 'expo.out' }
          );
        },
        once: true,
      });
      triggers.push(headerTrigger);

      if (listRef.current) {
        const listItems = listRef.current.querySelectorAll('.pillar-item');

        const listTrigger = ScrollTrigger.create({
          trigger: listRef.current,
          start: 'top 84%',
          onEnter: () => {
            gsap.fromTo(
              listItems,
              { opacity: 0, y: 24 },
              {
                opacity: 1,
                y: 0,
                duration: 0.58,
                stagger: 0.08,
                ease: 'expo.out',
              }
            );
          },
          once: true,
        });
        triggers.push(listTrigger);
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
              <span className="badge mb-5 inline-flex">Fundamentos Operacionais</span>
              <h2 className="section-title text-[clamp(2rem,3.2vw,2.75rem)] mb-4 max-w-[14ch]">
                Quatro frentes que sustentam a atuação do IPLURA
              </h2>
              <p className="text-base leading-[1.72] text-iplura-gray max-w-[34ch] mb-6">
                Antes de avançar para o contexto do setor, este é o núcleo que organiza a entrega
                técnica, humana e regulatória.
              </p>

              <a
                href="#como-funciona"
                onClick={(e) => {
                  e.preventDefault();
                  document.querySelector('#como-funciona')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="inline-flex items-center gap-2 text-sm font-semibold text-iplura-purple hover:text-iplura-purple-accent transition-colors"
              >
                Ver metodologia completa
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>

            <div ref={listRef} className="divide-y divide-iplura-purple/14">
              {pillars.map((pillar) => {
                const Icon = pillar.icon;

                return (
                  <article
                    key={pillar.title}
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
