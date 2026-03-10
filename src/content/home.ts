import type { TextSegment } from './types';

const heroTitle: TextSegment[] = [
  { text: 'Jogo responsável com' },
  { text: ' estrutura técnica, humana e regulatória', variant: 'gradient' },
];

const solutionsTitle: TextSegment[] = [
  { text: 'Soluções para operadoras que buscam ' },
  { text: 'mais segurança, consistência e responsabilidade', variant: 'gradient' },
];

const methodologyTitle: TextSegment[] = [
  { text: 'Como o ' },
  { text: 'IPLURA atua', variant: 'gradient' },
];

const benefitsTitle: TextSegment[] = [
  { text: 'Benefícios para a ' },
  { text: 'operadora', variant: 'gradient' },
];

const differentiatorsTitle: TextSegment[] = [
  { text: 'Por que o ' },
  { text: 'IPLURA', variant: 'gradient' },
];

const faqTitle: TextSegment[] = [
  { text: 'Perguntas ' },
  { text: 'frequentes', variant: 'gradient' },
];

const contactTitle: TextSegment[] = [
  { text: 'Vamos construir uma operação ' },
  { text: 'mais responsável e confiável?', variant: 'gradient' },
];

const navigationLinks = [
  { label: 'Início', href: '#hero' },
  { label: 'Soluções', href: '#solucoes' },
  { label: 'Como funciona', href: '#como-funciona' },
  { label: 'Benefícios', href: '#beneficios' },
  { label: 'Sobre', href: '#sobre' },
  { label: 'Credenciais', href: '#credenciais' },
  { label: 'Contato', href: '#contato' },
];

export const homeContent = {
  navigation: {
    logoAlt: 'IPLURA',
    links: navigationLinks,
    ctaLabel: 'Falar com o IPLURA',
  },

  hero: {
    badge: 'Instituto de Jogo Responsável',
    titleSegments: heroTitle,
    subtitle:
      'O IPLURA apoia operadoras de apostas com acolhimento especializado, educação preventiva e processos que transformam conformidade em proteção real.',
    ctaPrimary: { label: 'Falar com o IPLURA', href: '#contato' },
    ctaSecondary: { label: 'Conhecer soluções', href: '#solucoes' },
    details: [
      {
        label: 'Governança',
        text: 'Conformidade prática e auditável',
      },
      {
        label: 'Cuidado',
        text: 'Acolhimento qualificado ao usuário',
      },
    ],
    anchorLink: { label: 'Ver arquitetura de atuação', href: '#fundamentos' },
    visual: {
      imageAlt: 'Profissional em acolhimento e suporte responsável',
      topChipLabel: 'Atuação integrada',
      topChipText: 'Técnico, humano e regulatório em um só fluxo.',
      bottomChipLabel: 'Maturidade operacional',
      bottomChipText: 'Protocolos, evidências e prevenção contínua.',
      sideChipLabel: 'Implementação',
      sideChipText: 'Processos aplicados ao dia a dia da operação.',
    },
  },

  credibilityStrip: {
    badge: 'Arquitetura de Atuação',
    title: 'Quatro frentes que estruturam a atuação do IPLURA',
    intro:
      'Este é o núcleo que organiza a entrega do IPLURA e sustenta sua atuação técnica, humana e regulatória junto às operadoras.',
    cta: { label: 'Ver metodologia completa', href: '#como-funciona' },
    pillars: [
      {
        id: 'compliance',
        title: 'Conformidade prática',
        description: 'Exigências regulatórias traduzidas em processos operacionais viáveis.',
      },
      {
        id: 'care',
        title: 'Acolhimento especializado',
        description:
          'Suporte qualificado para usuários em risco, com escuta, protocolo e encaminhamento responsável.',
      },
      {
        id: 'education',
        title: 'Educação preventiva',
        description: 'Treinamentos e conteúdos para fortalecer prevenção, orientação e uso consciente.',
      },
      {
        id: 'integration',
        title: 'Atuação integrada',
        description: 'Conexão entre compliance, atendimento e estratégia institucional.',
      },
    ],
  },

  problemSection: {
    badge: 'Contexto Estratégico',
    title: 'O mercado cresceu. A responsabilidade também.',
    intro:
      'No cenário atual, jogo responsável deixou de ser apenas uma exigência regulatória. Tornou-se condição para sustentar reputação, governança e confiança pública.',
    criticalLabel: 'Leitura crítica',
    stepPrefix: 'Etapa',
    criticalText:
      'Quanto maior a escala da operação, maior a necessidade de prevenção ativa, protocolos claros e resposta qualificada.',
    steps: [
      {
        id: 'growth',
        title: 'Crescimento acelerado do setor',
        description:
          'Com a expansão das apostas, aumenta a exposição da operação a riscos sociais, reputacionais e regulatórios.',
      },
      {
        id: 'operational-consequence',
        title: 'Impacto direto na operação',
        description:
          'Sem estrutura consistente, o jogo responsável tende a se limitar a respostas reativas e pouco efetivas.',
      },
      {
        id: 'strategic-response',
        title: 'Resposta estratégica necessária',
        description:
          'É preciso integrar cuidado humano, governança e evidências para sustentar crescimento com responsabilidade.',
      },
    ],
  },

  solutions: {
    badge: 'Nossas Soluções',
    titleSegments: solutionsTitle,
    linkLabel: 'Saiba mais',
    linkHref: '#contato',
    cards: [
      {
        id: 'psychological-support',
        title: 'Acolhimento Psicológico Estruturado',
        description:
          'Suporte especializado para usuários em situação de vulnerabilidade, com escuta qualificada e acompanhamento responsável.',
      },
      {
        id: 'operator-support',
        title: 'Suporte Técnico à Operadora',
        description:
          'Apoio às equipes internas com diagnóstico de risco, capacitação, protocolos e orientação em jogo responsável.',
      },
      {
        id: 'academy',
        title: 'IPLURA Academy',
        description:
          'Treinamentos e conteúdos educativos para fortalecer a prevenção, a conformidade e o uso consciente.',
      },
    ],
  },

  methodology: {
    badge: 'Como Funciona',
    titleSegments: methodologyTitle,
    intro:
      'Uma metodologia estruturada para transformar responsabilidade em processo, conectando operação, atendimento e governança.',
    steps: [
      {
        number: '01',
        title: 'Diagnóstico',
        description: 'Entendemos o contexto, os riscos e as necessidades da operação.',
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
        description: 'Organizamos registros e relatórios que fortalecem a governança.',
      },
    ],
  },

  benefits: {
    badge: 'Benefícios',
    titleSegments: benefitsTitle,
    cards: [
      {
        id: 'regulatory-consistency',
        title: 'Mais consistência regulatória',
        description: 'Apoio prático para fortalecer a conformidade e qualificar a execução.',
      },
      {
        id: 'risk-reduction',
        title: 'Redução de riscos',
        description: 'Mais preparo para lidar com vulnerabilidades, reputação e operação.',
      },
      {
        id: 'institutional-strengthening',
        title: 'Fortalecimento institucional',
        description:
          'Uma estrutura mais responsável fortalece reputação, confiança e posicionamento de mercado.',
      },
      {
        id: 'internal-training',
        title: 'Capacitação interna',
        description:
          'Equipes mais preparadas para prevenir riscos, orientar usuários e atuar com consistência.',
      },
    ],
  },

  differentiators: {
    badge: 'Diferenciais',
    titleSegments: differentiatorsTitle,
    intro:
      'O IPLURA integra suporte técnico, acolhimento especializado e visão regulatória em uma estrutura única de implementação.',
    items: [
      {
        id: 'commitment',
        title: 'Proteção do usuário com viabilidade operacional',
        description: 'Cuidado efetivo e estrutura institucional alinhados na mesma estratégia.',
      },
      {
        id: 'integrated-approach',
        title: 'Atuação integrada',
        description: 'Compliance, acolhimento e educação conectados em um mesmo fluxo operacional.',
      },
      {
        id: 'real-impact',
        title: 'Implementação prática',
        description: 'Protocolos, capacitação e evidências aplicados à rotina da operação.',
      },
    ],
  },

  about: {
    badge: 'Sobre',
    title: 'Arquitetura institucional para jogo responsável de alto padrão',
    intro:
      'O IPLURA atua como parceiro estratégico das operadoras de apostas para transformar responsabilidade em estrutura, governança contínua e proteção efetiva ao apostador.',
    pills: ['Suporte técnico aplicado', 'Acolhimento qualificado', 'Educação preventiva'],
    statement: {
      label: 'Declaração institucional',
      title: 'O objetivo é conectar crescimento de mercado e proteção real do usuário',
      description:
        'A atuação do IPLURA integra estratégia, execução e evidências de conformidade para que o jogo responsável deixe de ser apenas obrigação formal e passe a sustentar a maturidade institucional da operação.',
    },
    mission: {
      title: 'Missão',
      description:
        'Atuar como parceiro estratégico das operadoras de apostas na construção de um ecossistema verdadeiramente responsável, oferecendo suporte técnico às plataformas, acolhimento qualificado aos usuários em risco e ações educativas que promovam saúde financeira, equilíbrio emocional e consumo consciente.',
    },
    vision: {
      title: 'Visão',
      description:
        'Ser reconhecido como a principal referência em jogo responsável no Brasil, contribuindo para um setor de apostas mais ético, sustentável e centrado na proteção efetiva dos apostadores, com práticas que vão além do cumprimento formal das normas e geram impacto humano real.',
    },
    values: {
      label: 'Valores',
      title: 'Os valores que sustentam nossa atuação',
      items: [
        {
          id: 'wellbeing',
          title: 'Compromisso com o bem-estar do apostador',
          description:
            'Colocamos a saúde mental, emocional e financeira do usuário no centro das nossas ações, com respeito, empatia e escuta ativa.',
        },
        {
          id: 'shared-responsibility',
          title: 'Responsabilidade compartilhada',
          description:
            'Acreditamos que a proteção do jogador é uma construção coletiva entre operadoras, reguladores, profissionais técnicos e sociedade.',
        },
        {
          id: 'ethics',
          title: 'Transparência e ética institucional',
          description:
            'Atuamos com clareza, integridade e seriedade em todas as relações, preservando a confiança das operadoras e dos usuários.',
        },
        {
          id: 'education',
          title: 'Educação como ferramenta de transformação',
          description:
            'Investimos em trilhas formativas e conteúdos acessíveis como forma de prevenir riscos, fomentar o autocuidado e promover escolhas conscientes.',
        },
        {
          id: 'regulatory-effectiveness',
          title: 'Efetividade regulatória com impacto real',
          description:
            'Nosso objetivo é ir além do papel, transformar normas em práticas, regras em resultados, obrigação legal em valor estratégico.',
        },
        {
          id: 'innovation',
          title: 'Inovação com propósito',
          description:
            'Buscamos constantemente soluções inteligentes, sustentáveis e adaptadas à realidade das operadoras e à complexidade do comportamento humano.',
        },
      ],
    },
  },

  trust: {
    badge: 'Credenciais',
    title: 'Estrutura institucional que sustenta a atuação do IPLURA',
    intro:
      'Rigor técnico, visão regulatória e foco humano convertidos em operação consistente.',
    primary: {
      label: 'Pilar principal',
      title: 'Estrutura técnica para proteger operação, reputação e apostador',
      description:
        'O IPLURA conecta diagnóstico, protocolos e capacitação para transformar responsabilidade em execução contínua.',
    },
    fronts: [
      {
        title: 'Governança verificável',
        description: 'Protocolos, registros e evidências preparados para auditoria.',
      },
      {
        title: 'Proteção efetiva do usuário',
        description: 'Prevenção ativa integrada ao fluxo operacional.',
      },
      {
        title: 'Evolução contínua',
        description: 'Treinamento recorrente e melhoria permanente com foco em resultado.',
      },
    ],
    frontPrefix: 'Frente',
    sideCards: [
      {
        id: 'technical-support',
        title: 'Respaldo técnico',
        description: 'Diagnóstico, priorização de riscos e plano de ação com foco prático.',
      },
      {
        id: 'regulatory-security',
        title: 'Segurança regulatória',
        description:
          'Alinhamento normativo com viabilidade operacional e consistência institucional.',
      },
    ],
    differentiation: {
      label: 'Diferenciação IPLURA',
      title: 'Conformidade efetiva é a que gera proteção real.',
      description: 'Método proprietário com visão estratégica de longo prazo.',
    },
  },

  faq: {
    badge: 'FAQ',
    titleSegments: faqTitle,
    items: [
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
        question: 'O IPLURA apoia a conformidade regulatória?',
        answer:
          'Sim. Nossa atuação contribui para a implementação prática de ações ligadas ao jogo responsável.',
      },
      {
        question: 'O atendimento respeita confidencialidade?',
        answer: 'Sim. A atuação é orientada por ética, sigilo e respeito à dignidade do usuário.',
      },
    ],
  },

  contact: {
    badge: 'Contato',
    titleSegments: contactTitle,
    intro:
      'Fale com o IPLURA para conhecer soluções em jogo responsável, acolhimento especializado, capacitação e suporte técnico à operadora.',
    quickWhatsappCtaLabel: 'Atendimento direto no WhatsApp',
    status: {
      loadingTitle: 'Enviando mensagem...',
      loadingDescription: 'Estamos processando seus dados com segurança.',
      successTitle: 'Mensagem enviada com sucesso',
      successDescription: 'Recebemos seu contato e nossa equipe retornará em breve.',
      errorTitle: 'Não foi possível enviar sua mensagem agora',
      errorDescription:
        'Tente novamente em instantes ou fale conosco pelo WhatsApp.',
      unavailableTitle: 'Envio por e-mail em breve',
      unavailableDescription:
        'No momento, utilize o WhatsApp para falar com o IPLURA.',
      resetActionLabel: 'Enviar nova mensagem',
      backToTopLabel: 'Voltar ao início',
    },
    success: {
      title: 'Mensagem enviada!',
      description: 'Entraremos em contato em breve.',
    },
    form: {
      fields: {
        nome: { label: 'Nome', placeholder: 'Seu nome' },
        empresa: { label: 'Empresa', placeholder: 'Nome da empresa' },
        cargo: { label: 'Cargo', placeholder: 'Seu cargo' },
        email: { label: 'E-mail', placeholder: 'seu@email.com' },
        telefone: { label: 'Telefone', placeholder: '(XX) XXXXX-XXXX' },
        mensagem: { label: 'Mensagem', placeholder: 'Conte-nos sobre sua necessidade...' },
      },
      submitLabel: 'Enviar por E-mail',
      whatsapp: {
        label: 'Falar no WhatsApp',
      },
    },
  },

  footer: {
    logoAlt: 'IPLURA',
    descriptionLines: [
      'Instituto de Promoção da Legalidade e Uso Responsável de Apostas.',
      'Transformando conformidade em proteção real.',
    ],
    linksTitle: 'Links',
    contactTitle: 'Contato',
    quickLinks: navigationLinks,
    contactItems: ['contato@iplura.org.br', 'São Paulo, SP — Brasil'],
    copyright: '© 2026 IPLURA. Todos os direitos reservados.',
    legalLinks: [
      { label: 'Política de Privacidade', href: '/politica-de-privacidade' },
      { label: 'Termos de Uso', href: '/termos-de-uso' },
    ],
  },
} as const;
