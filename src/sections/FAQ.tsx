import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Plus, Minus } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const faqs = [
  {
    question: 'O IPLURA atende apenas operadoras?',
    answer:
      'Nosso foco principal é apoiar operadoras, mas nossa atuação também contempla acolhimento e orientação a usuários em situação de vulnerabilidade.',
  },
  {
    question: 'O IPLURA substitui a área de compliance?',
    answer:
      'Não. Atuamos como apoio técnico e operacional para fortalecer a estrutura interna da operadora.',
  },
  {
    question: 'Os treinamentos podem ser personalizados?',
    answer:
      'Sim. Os conteúdos podem ser adaptados à realidade e aos objetivos de cada operação.',
  },
  {
    question: 'O IPLURA ajuda na conformidade regulatória?',
    answer:
      'Sim. Nossa atuação apoia a implementação prática de ações ligadas ao jogo responsável.',
  },
  {
    question: 'O atendimento respeita confidencialidade?',
    answer:
      'Sim. A atuação é orientada por ética, sigilo e respeito à dignidade do usuário.',
  },
];

const FAQ = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const itemsRef = useRef<HTMLDivElement>(null);
  const [openIndex, setOpenIndex] = useState<number | null>(null);

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

      // Items animation
      if (itemsRef.current) {
        const items = itemsRef.current.querySelectorAll('.faq-item');

        const itemsTrigger = ScrollTrigger.create({
          trigger: itemsRef.current,
          start: 'top 80%',
          onEnter: () => {
            gsap.fromTo(
              items,
              { opacity: 0, y: 20 },
              {
                opacity: 1,
                y: 0,
                duration: 0.5,
                stagger: 0.08,
                ease: 'expo.out',
              }
            );
          },
          once: true,
        });
        triggers.push(itemsTrigger);
      }
    }, sectionRef);

    return () => {
      triggers.forEach((trigger) => trigger.kill());
      ctx.revert();
    };
  }, []);

  const toggleItem = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section
      id="faq"
      ref={sectionRef}
      className="section-padding surface-base"
    >
      <div className="container-clean">
        <div className="max-w-3xl mx-auto">
          {/* Header */}
          <div ref={headerRef} className="text-center mb-12 opacity-0">
            <span className="badge mb-6 inline-flex">FAQ</span>
            <h2 className="section-title">
              Perguntas <span className="text-gradient">frequentes</span>
            </h2>
          </div>

          {/* Items */}
          <div ref={itemsRef} className="space-y-3">
            {faqs.map((faq, index) => {
              const isOpen = openIndex === index;

              return (
                <div
                  key={index}
                  className={`faq-item rounded-2xl border transition-all duration-300 opacity-0 ${
                    isOpen
                      ? 'border-iplura-purple/24 bg-white shadow-[0_16px_40px_rgba(65,35,122,0.12)]'
                      : 'border-iplura-purple/10 bg-white/88 hover:border-iplura-purple/18'
                  }`}
                >
                  <button
                    onClick={() => toggleItem(index)}
                    className="w-full flex items-center justify-between p-6 text-left"
                  >
                    <span
                      className={`text-base font-medium pr-4 transition-colors duration-300 ${
                        isOpen ? 'text-iplura-purple' : 'text-iplura-dark'
                      }`}
                    >
                      {faq.question}
                    </span>
                    <div
                      className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${
                        isOpen ? 'bg-iplura-purple' : 'bg-iplura-purple/10'
                      }`}
                    >
                      {isOpen ? (
                        <Minus className="w-4 h-4 text-white" />
                      ) : (
                        <Plus className="w-4 h-4 text-iplura-gray" />
                      )}
                    </div>
                  </button>

                  <div
                    className={`overflow-hidden transition-all duration-300 ${
                      isOpen ? 'max-h-40' : 'max-h-0'
                    }`}
                  >
                    <div className="px-6 pb-6">
                      <p className="text-sm leading-relaxed" style={{ color: 'hsl(var(--iplura-gray))' }}>
                        {faq.answer}
                      </p>
                    </div>
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

export default FAQ;
