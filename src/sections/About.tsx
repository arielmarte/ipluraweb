import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const About = () => {
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
    <section
      id="sobre"
      ref={sectionRef}
      className="section-padding"
      style={{ background: 'hsl(var(--iplura-light))' }}
    >
      <div className="container-clean">
        <div ref={contentRef} className="max-w-4xl mx-auto opacity-0">
          {/* Badge */}
          <div className="text-center mb-8">
            <span className="badge">Sobre</span>
          </div>

          {/* Headline */}
          <h2
            className="text-3xl sm:text-4xl lg:text-5xl font-semibold leading-tight mb-8 text-center"
            style={{ color: 'hsl(var(--iplura-dark))', letterSpacing: '-0.02em' }}
          >
            Sobre o <span className="text-gradient">IPLURA</span>
          </h2>

          {/* Content */}
          <div className="space-y-6 text-center">
            <p className="text-lg leading-relaxed" style={{ color: 'hsl(var(--iplura-gray))' }}>
              O IPLURA é um instituto especializado em jogo responsável. Atuamos como 
              parceiro técnico e operacional de operadoras de apostas, apoiando a 
              implementação de práticas mais responsáveis, preventivas e alinhadas à 
              realidade regulatória do setor.
            </p>

            <p
              className="text-lg leading-relaxed font-medium"
              style={{ color: 'hsl(var(--iplura-purple))' }}
            >
              Nosso trabalho conecta conformidade, educação e acolhimento para promover 
              mais segurança ao usuário e mais solidez à operação.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
