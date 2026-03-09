import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Scale, HeartHandshake, GraduationCap, Building2 } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const pillars = [
  {
    icon: Scale,
    title: 'Conformidade prática',
    description: 'Apoio técnico para transformar exigências regulatórias em operação estruturada.',
  },
  {
    icon: HeartHandshake,
    title: 'Acolhimento especializado',
    description: 'Suporte qualificado para usuários em situação de vulnerabilidade.',
  },
  {
    icon: GraduationCap,
    title: 'Educação preventiva',
    description: 'Conteúdos e treinamentos para promover escolhas mais conscientes.',
  },
  {
    icon: Building2,
    title: 'Atuação integrada',
    description: 'Suporte às áreas de Compliance, Atendimento e Jogo Responsável.',
  },
];

const CredibilityStrip = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const triggers: ScrollTrigger[] = [];

    const ctx = gsap.context(() => {
      if (cardsRef.current) {
        const cards = cardsRef.current.querySelectorAll('.pillar-card');

        const cardsTrigger = ScrollTrigger.create({
          trigger: cardsRef.current,
          start: 'top 85%',
          onEnter: () => {
            gsap.fromTo(
              cards,
              { opacity: 0, y: 30 },
              {
                opacity: 1,
                y: 0,
                duration: 0.6,
                stagger: 0.1,
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
    <section ref={sectionRef} className="section-padding surface-base">
      <div className="container-clean">
        <div
          ref={cardsRef}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {pillars.map((pillar, index) => {
            const Icon = pillar.icon;
            return (
              <div
                key={index}
                className="pillar-card card-clean p-8 opacity-0 group"
              >
                <div className="icon-box mb-5 group-hover:scale-110 transition-transform duration-300">
                  <Icon />
                </div>
                <h3 className="text-base font-semibold mb-3" style={{ color: 'hsl(var(--iplura-dark))' }}>
                  {pillar.title}
                </h3>
                <p className="text-sm leading-relaxed" style={{ color: 'hsl(var(--iplura-gray))' }}>
                  {pillar.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default CredibilityStrip;
