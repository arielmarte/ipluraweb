import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Handshake, Layers, Target } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const differentiators = [
  {
    icon: Handshake,
    title: 'Compromisso com empresa e jogador',
    description: 'Proteção do usuário e maturidade operacional caminhando juntas.',
  },
  {
    icon: Layers,
    title: 'Abordagem integrada',
    description: 'Compliance, acolhimento e educação em uma mesma estrutura.',
  },
  {
    icon: Target,
    title: 'Impacto real',
    description: 'Mais do que discurso institucional, foco em implementação prática.',
  },
];

const Differentiators = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const triggers: ScrollTrigger[] = [];

    const ctx = gsap.context(() => {
      // Content animation
      const contentTrigger = ScrollTrigger.create({
        trigger: contentRef.current,
        start: 'top 85%',
        onEnter: () => {
          gsap.fromTo(
            contentRef.current,
            { opacity: 0, y: 30 },
            { opacity: 1, y: 0, duration: 0.6, ease: 'expo.out' }
          );
        },
        once: true,
      });
      triggers.push(contentTrigger);

      // Cards animation
      if (cardsRef.current) {
        const cards = cardsRef.current.querySelectorAll('.diff-card');

        const cardsTrigger = ScrollTrigger.create({
          trigger: cardsRef.current,
          start: 'top 80%',
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
    <section ref={sectionRef} className="section-padding surface-contrast">
      <div className="container-clean">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          {/* Left - Content */}
          <div ref={contentRef} className="opacity-0">
            <span className="badge mb-6 inline-flex">Diferenciais</span>
            <h2 className="section-title mb-6">
              Por que o <span className="text-gradient">IPLURA</span>
            </h2>
            <p className="section-intro">
              Unimos cuidado humano, suporte técnico e visão regulatória para ajudar 
              operadoras a construir uma atuação mais ética, sólida e sustentável.
            </p>
          </div>

          {/* Right - Cards */}
          <div ref={cardsRef} className="space-y-4">
            {differentiators.map((diff, index) => {
              const Icon = diff.icon;
              return (
                <div
                  key={index}
                  className="diff-card card-clean flex items-start gap-5 p-6 group opacity-0"
                >
                  <div className="icon-box flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                    <Icon />
                  </div>
                  <div>
                    <h3
                      className="text-base font-semibold mb-2 group-hover:text-iplura-purple transition-colors duration-300"
                      style={{ color: 'hsl(var(--iplura-dark))' }}
                    >
                      {diff.title}
                    </h3>
                    <p className="text-sm leading-relaxed" style={{ color: 'hsl(var(--iplura-gray))' }}>
                      {diff.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Differentiators;
