import { useEffect } from 'react';
import type { LegalDocument } from '@/content/legal';

type LegalDocumentPageProps = {
  legalDocument: LegalDocument;
};

const PRODUCTION_URL = 'https://iplura.org';

const LegalDocumentPage = ({ legalDocument }: LegalDocumentPageProps) => {
  useEffect(() => {
    window.document.title = `${legalDocument.title} | IPLURA`;

    const canonical = window.document.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (canonical) {
      canonical.href = `${PRODUCTION_URL}${legalDocument.slug}`;
    }
  }, [legalDocument]);

  return (
    <div className="min-h-screen surface-base">
      <header className="border-b border-iplura-purple/10 bg-white/88 backdrop-blur-lg">
        <div className="container-clean py-4 sm:py-5 flex items-center justify-between gap-4">
          <a href="/" className="inline-flex items-center" aria-label="Voltar para a página inicial do IPLURA">
            <img
              src="/iplura-logo-icon-wordmark.svg"
              alt="IPLURA"
              className="h-8 sm:h-9 w-auto object-contain"
            />
          </a>
          <a
            href="/#hero"
            className="btn-secondary !px-5 !py-2.5 !text-xs sm:!text-sm"
            aria-label="Voltar para o site institucional do IPLURA"
          >
            Voltar ao site
          </a>
        </div>
      </header>

      <main className="section-padding">
        <div className="container-clean">
          <article className="panel-premium mx-auto max-w-4xl p-6 sm:p-8 lg:p-12">
            <h1 className="section-title text-3xl sm:text-4xl">{legalDocument.title}</h1>
            <p className="mt-4 text-sm font-medium text-iplura-dark/74">
              Última atualização: {legalDocument.lastUpdated}
            </p>

            <div className="mt-7 space-y-4">
              {legalDocument.introduction.map((paragraph) => (
                <p key={paragraph} className="text-base sm:text-[1.02rem] leading-[1.72]">
                  {paragraph}
                </p>
              ))}
            </div>

            <div className="mt-10 space-y-8">
              {legalDocument.sections.map((section, index) => (
                <section key={section.title} aria-labelledby={`legal-section-${index + 1}`}>
                  <h2
                    id={`legal-section-${index + 1}`}
                    className="text-xl sm:text-2xl font-semibold tracking-[-0.02em] text-iplura-dark"
                  >
                    {index + 1}. {section.title}
                  </h2>

                  <div className="mt-3 space-y-3">
                    {section.paragraphs.map((paragraph) => (
                      <p key={paragraph} className="text-base leading-[1.72]">
                        {paragraph}
                      </p>
                    ))}
                  </div>

                  {section.bullets && (
                    <ul className="mt-3 space-y-2 pl-5 text-base leading-[1.72] text-iplura-gray list-disc marker:text-iplura-purple-accent">
                      {section.bullets.map((bullet) => (
                        <li key={bullet}>{bullet}</li>
                      ))}
                    </ul>
                  )}

                  {section.afterBullets && (
                    <div className="mt-3 space-y-3">
                      {section.afterBullets.map((paragraph) => (
                        <p key={paragraph} className="text-base leading-[1.72]">
                          {paragraph}
                        </p>
                      ))}
                    </div>
                  )}
                </section>
              ))}
            </div>
          </article>
        </div>
      </main>
    </div>
  );
};

export default LegalDocumentPage;
