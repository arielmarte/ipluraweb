import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const ProblemSection = () => {
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
      ref={sectionRef}
      className="relative section-padding overflow-hidden surface-alt"
    >
      <div
        className="absolute -top-16 left-[8%] h-36 w-36 rounded-full bg-iplura-purple/10 blur-3xl parallax-soft"
        data-parallax="0.12"
      />
      <div
        className="absolute bottom-8 right-[10%] h-40 w-40 rounded-full bg-iplura-purple-accent/12 blur-3xl parallax-soft"
        data-parallax="0.14"
      />
      <div className="container-clean relative z-10">
        <div ref={contentRef} className="max-w-4xl mx-auto text-center opacity-0">
          {/* Badge */}
          <span className="badge mb-8">
            O Contexto
          </span>

          {/* Headline */}
          <h2
            className="text-3xl sm:text-4xl lg:text-5xl font-semibold leading-[1.16] mb-8"
            style={{ color: 'hsl(var(--iplura-dark))', letterSpacing: '-0.02em' }}
          >
            O setor cresceu.{' '}
            <span className="text-gradient">A responsabilidade também precisa crescer.</span>
          </h2>

          {/* Text */}
          <div className="space-y-6 max-w-3xl mx-auto">
            <p className="section-intro mx-auto">
              Com a expansão do mercado de apostas, operadoras precisam ir além do cumprimento 
              formal das normas. Hoje, jogo responsável exige estrutura, processo, evidência 
              e cuidado real com o usuário.
            </p>

            <p
              className="text-lg leading-[1.72] font-medium max-w-[62ch] mx-auto"
              style={{ color: 'hsl(var(--iplura-purple))' }}
            >
              O IPLURA atua para preencher essa lacuna, conectando conformidade, prevenção 
              e acolhimento em uma solução integrada.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProblemSection;
