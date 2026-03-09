import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const steps = [
  {
    number: '01',
    title: 'Diagnóstico',
    description: 'Entendemos o contexto e as necessidades da operação.',
  },
  {
    number: '02',
    title: 'Estruturação',
    description: 'Desenhamos fluxos, protocolos e estratégias de atuação.',
  },
  {
    number: '03',
    title: 'Acolhimento e prevenção',
    description: 'Implementamos suporte especializado e ações educativas.',
  },
  {
    number: '04',
    title: 'Capacitação',
    description: 'Treinamos equipes para uma atuação mais segura e alinhada.',
  },
  {
    number: '05',
    title: 'Evidências de conformidade',
    description: 'Organizamos relatórios e registros que fortalecem a governança.',
  },
];

const Methodology = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const stepsRef = useRef<HTMLDivElement>(null);

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

      // Steps animation
      if (stepsRef.current) {
        const stepItems = stepsRef.current.querySelectorAll('.step-item');

        const stepsTrigger = ScrollTrigger.create({
          trigger: stepsRef.current,
          start: 'top 80%',
          onEnter: () => {
            gsap.fromTo(
              stepItems,
              { opacity: 0, x: -30 },
              {
                opacity: 1,
                x: 0,
                duration: 0.6,
                stagger: 0.12,
                ease: 'expo.out',
              }
            );
          },
          once: true,
        });
        triggers.push(stepsTrigger);
      }
    }, sectionRef);

    return () => {
      triggers.forEach((trigger) => trigger.kill());
      ctx.revert();
    };
  }, []);

  return (
    <section
      id="como-funciona"
      ref={sectionRef}
      className="section-padding surface-alt"
    >
      <div className="container-clean">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-start">
          {/* Left - Header */}
          <div ref={headerRef} className="lg:sticky lg:top-32 opacity-0">
            <span className="badge mb-6 inline-flex">Como Funciona</span>
            <h2
              className="text-3xl sm:text-4xl lg:text-5xl font-semibold leading-[1.16] mb-6"
              style={{ color: 'hsl(var(--iplura-dark))', letterSpacing: '-0.02em' }}
            >
              Como o <span className="text-gradient">IPLURA atua</span>
            </h2>
            <p className="text-lg leading-relaxed" style={{ color: 'hsl(var(--iplura-gray))' }}>
              Uma metodologia estruturada para transformar cuidado em processo, 
              conectando todas as áreas da operação.
            </p>
          </div>

          {/* Right - Steps */}
          <div ref={stepsRef} className="space-y-6">
            {steps.map((step, index) => (
              <div
                key={index}
                className="step-item flex items-start gap-6 p-6 rounded-2xl bg-white border border-gray-100 hover:border-iplura-purple/20 hover:shadow-clean-hover transition-all duration-300 group opacity-0"
              >
                {/* Number */}
                <div className="flex-shrink-0">
                  <span
                    className="text-2xl font-bold group-hover:text-iplura-purple transition-colors duration-300"
                    style={{ color: 'hsl(var(--iplura-gray))' }}
                  >
                    {step.number}
                  </span>
                </div>

                {/* Content */}
                <div>
                  <h3
                    className="text-lg font-semibold mb-2 group-hover:text-iplura-purple transition-colors duration-300"
                    style={{ color: 'hsl(var(--iplura-dark))' }}
                  >
                    {step.title}
                  </h3>
                  <p className="text-sm leading-relaxed" style={{ color: 'hsl(var(--iplura-gray))' }}>
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Methodology;
