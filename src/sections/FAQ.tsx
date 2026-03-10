import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Plus, Minus } from 'lucide-react';
import { homeContent } from '@/content/home';
import { renderTextSegments } from '@/utils/renderTextSegments';

gsap.registerPlugin(ScrollTrigger);

const FAQ = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const itemsRef = useRef<HTMLDivElement>(null);
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const { faq } = homeContent;

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
            <span className="badge mb-6 inline-flex">{faq.badge}</span>
            <h2 className="section-title">
              {renderTextSegments(faq.titleSegments, { gradient: 'text-gradient' })}
            </h2>
          </div>

          {/* Items */}
          <div ref={itemsRef} className="space-y-3">
            {faq.items.map((item, index) => {
              const isOpen = openIndex === index;
              const questionId = `faq-question-${index}`;
              const panelId = `faq-panel-${index}`;

              return (
                <div
                  key={item.question}
                  className={`faq-item rounded-2xl border transition-all duration-300 opacity-0 ${
                    isOpen
                      ? 'border-iplura-purple/24 bg-white shadow-[0_16px_40px_rgba(65,35,122,0.12)]'
                      : 'border-iplura-purple/10 bg-white/88 hover:border-iplura-purple/18'
                  }`}
                >
                  <h3 className="text-base">
                    <button
                      id={questionId}
                      type="button"
                      onClick={() => toggleItem(index)}
                      aria-expanded={isOpen}
                      aria-controls={panelId}
                      className="w-full flex items-center justify-between p-6 text-left"
                    >
                      <span
                        className={`text-base font-medium pr-4 transition-colors duration-300 ${
                          isOpen ? 'text-iplura-purple' : 'text-iplura-dark'
                        }`}
                      >
                        {item.question}
                      </span>
                      <div
                        className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${
                          isOpen ? 'bg-iplura-purple' : 'bg-iplura-purple/10'
                        }`}
                      >
                        {isOpen ? (
                          <Minus className="w-4 h-4 text-white" aria-hidden="true" />
                        ) : (
                          <Plus className="w-4 h-4 text-iplura-gray" aria-hidden="true" />
                        )}
                      </div>
                    </button>
                  </h3>

                  <div
                    id={panelId}
                    role="region"
                    aria-labelledby={questionId}
                    aria-hidden={!isOpen}
                    className={`overflow-hidden transition-all duration-300 ${
                      isOpen ? 'max-h-40' : 'max-h-0'
                    }`}
                  >
                    <div className="px-6 pb-6">
                      <p className="text-sm leading-relaxed" style={{ color: 'hsl(var(--iplura-gray))' }}>
                        {item.answer}
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
