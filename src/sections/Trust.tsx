import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Trust = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const triggers: ScrollTrigger[] = [];

    const ctx = gsap.context(() => {
      const contentTrigger = ScrollTrigger.create({
        trigger: contentRef.current,
        start: 'top 80%',
        onEnter: () => {
          gsap.fromTo(
            contentRef.current,
            { opacity: 0, y: 40 },
            { opacity: 1, y: 0, duration: 0.8, ease: 'expo.out' }
          );
        },
        once: true,
      });
      triggers.push(contentTrigger);
    }, sectionRef);

    return () => {
      triggers.forEach((trigger) => trigger.kill());
      ctx.revert();
    };
  }, []);

  return (
    <section ref={sectionRef} className="section-padding surface-alt">
      <div className="container-clean">
        <div ref={contentRef} className="max-w-4xl mx-auto text-center opacity-0">
          {/* Badge */}
          <span className="badge mb-8 inline-flex">Base de Confiança</span>

          {/* Headline */}
          <h2
            className="text-3xl sm:text-4xl lg:text-5xl font-semibold leading-[1.16] mb-8"
            style={{ color: 'hsl(var(--iplura-dark))', letterSpacing: '-0.02em' }}
          >
            Uma atuação baseada em{' '}
            <span className="text-gradient">método, ética e responsabilidade</span>
          </h2>

          {/* Text */}
          <p className="text-lg leading-relaxed" style={{ color: 'hsl(var(--iplura-gray))' }}>
            O IPLURA trabalha com abordagem multidisciplinar, processos estruturados e 
            foco em implementação prática. Nossa atuação é guiada por compromisso ético, 
            escuta qualificada e visão de longo prazo para o setor.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Trust;
