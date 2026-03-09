import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Scale, ShieldCheck, Award, GraduationCap } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const benefits = [
  {
    icon: Scale,
    title: 'Mais consistência regulatória',
    description: 'Apoio prático para fortalecer a conformidade.',
  },
  {
    icon: ShieldCheck,
    title: 'Redução de riscos',
    description: 'Mais preparo para lidar com vulnerabilidades, reputação e operação.',
  },
  {
    icon: Award,
    title: 'Fortalecimento institucional',
    description: 'Uma atuação responsável gera mais confiança no mercado.',
  },
  {
    icon: GraduationCap,
    title: 'Capacitação interna',
    description: 'Equipes mais preparadas para prevenir, orientar e agir.',
  },
];

const Benefits = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const triggers: ScrollTrigger[] = [];

    const ctx = gsap.context(() => {
      // Header animation
      const headerTrigger = ScrollTrigger.create({
        trigger: headerRef.current,
        start: 'top 85%',
        onEnter: () => {
          gsap.fromTo(
            headerRef.current,
            { opacity: 0, y: 30 },
            { opacity: 1, y: 0, duration: 0.6, ease: 'expo.out' }
          );
        },
        once: true,
      });
      triggers.push(headerTrigger);

      // Cards animation
      if (cardsRef.current) {
        const cards = cardsRef.current.querySelectorAll('.benefit-card');

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
    <section
      id="beneficios"
      ref={sectionRef}
      className="section-padding surface-base"
    >
      <div className="container-clean">
        {/* Header */}
        <div ref={headerRef} className="text-center max-w-2xl mx-auto mb-16 opacity-0">
          <span className="badge mb-6 inline-flex">Benefícios</span>
          <h2 className="section-title">
            Benefícios para a <span className="text-gradient">operadora</span>
          </h2>
        </div>

        {/* Cards */}
        <div
          ref={cardsRef}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {benefits.map((benefit, index) => {
            const Icon = benefit.icon;
            return (
              <div
                key={index}
                className="benefit-card card-clean p-8 text-center group opacity-0"
              >
                <div className="icon-box mx-auto mb-5 group-hover:scale-110 transition-transform duration-300">
                  <Icon />
                </div>
                <h3
                  className="text-base font-semibold mb-3 group-hover:text-iplura-purple transition-colors duration-300"
                  style={{ color: 'hsl(var(--iplura-dark))' }}
                >
                  {benefit.title}
                </h3>
                <p className="text-sm leading-relaxed" style={{ color: 'hsl(var(--iplura-gray))' }}>
                  {benefit.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Benefits;
