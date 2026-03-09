import type { TextSegment } from './types';

const heroTitle: TextSegment[] = [
  { text: 'Jogo responsável com' },
  { text: ' estrutura técnica, humana e regulatória', variant: 'gradient' },
];

const solutionsTitle: TextSegment[] = [
  { text: 'Soluções para operadoras que querem atuar com ' },
  { text: 'mais segurança e responsabilidade', variant: 'gradient' },
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
      'O IPLURA apoia operadoras de apostas com acolhimento especializado, educação preventiva e implementação de processos que transformam conformidade em cuidado real.',
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
    anchorLink: { label: 'Ver fundamentos operacionais', href: '#fundamentos' },
    visual: {
      imageAlt: 'Profissional em acolhimento e suporte responsável',
      topChipLabel: 'Atuação integrada',
      topChipText: 'Técnico, humano e regulatório em um só fluxo.',
      bottomChipLabel: 'Maturidade operacional',
      bottomChipText: 'Protocolos, evidências e prevenção contínua',
      sideChipLabel: 'Implementação',
      sideChipText: 'Protocolos aplicados ao dia a dia da operação.',
    },
  },

  credibilityStrip: {
    badge: 'Fundamentos Operacionais',
    title: 'Quatro frentes que sustentam a atuação do IPLURA',
    intro:
      'Antes de avançar para o contexto do setor, este é o núcleo que organiza a entrega técnica, humana e regulatória.',
    cta: { label: 'Ver metodologia completa', href: '#como-funciona' },
    pillars: [
      {
        id: 'compliance',
        title: 'Conformidade prática',
        description: 'Exigências regulatórias traduzidas em processo operacional executável.',
      },
      {
        id: 'care',
        title: 'Acolhimento especializado',
        description: 'Suporte qualificado para usuários em risco com protocolo de cuidado.',
      },
      {
        id: 'education',
        title: 'Educação preventiva',
        description: 'Treinamentos contínuos para equipes e orientação ao usuário final.',
      },
      {
        id: 'integration',
        title: 'Atuação integrada',
        description: 'Conexão entre Compliance, atendimento e estratégia institucional.',
      },
    ],
  },

  problemSection: {
    badge: 'Contexto Estratégico',
    title: 'O mercado cresceu e a régua de responsabilidade subiu junto',
    intro:
      'No cenário atual, jogo responsável não é apenas uma exigência de conformidade. Ele se tornou componente central de sustentabilidade institucional e confiança pública.',
    criticalLabel: 'Leitura crítica',
    stepPrefix: 'Etapa',
    criticalText:
      'Quanto maior a escala da operação, maior a necessidade de processos claros, prevenção ativa e resposta técnica qualificada.',
    steps: [
      {
        id: 'growth',
        title: 'Crescimento acelerado do setor',
        description:
          'Com a expansão das apostas, aumenta a exposição da operação a risco social, reputacional e regulatório.',
      },
      {
        id: 'operational-consequence',
        title: 'Consequência operacional direta',
        description:
          'Sem estrutura robusta, o jogo responsável fica restrito a respostas reativas e pouco consistentes.',
      },
      {
        id: 'strategic-response',
        title: 'Necessidade de resposta estratégica',
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
      'Uma metodologia estruturada para transformar cuidado em processo, conectando todas as áreas da operação.',
    steps: [
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
    ],
  },

  benefits: {
    badge: 'Benefícios',
    titleSegments: benefitsTitle,
    cards: [
      {
        id: 'regulatory-consistency',
        title: 'Mais consistência regulatória',
        description: 'Apoio prático para fortalecer a conformidade.',
      },
      {
        id: 'risk-reduction',
        title: 'Redução de riscos',
        description: 'Mais preparo para lidar com vulnerabilidades, reputação e operação.',
      },
      {
        id: 'institutional-strengthening',
        title: 'Fortalecimento institucional',
        description: 'Uma atuação responsável gera mais confiança no mercado.',
      },
      {
        id: 'internal-training',
        title: 'Capacitação interna',
        description: 'Equipes mais preparadas para prevenir, orientar e agir.',
      },
    ],
  },

  differentiators: {
    badge: 'Diferenciais',
    titleSegments: differentiatorsTitle,
    intro:
      'Unimos cuidado humano, suporte técnico e visão regulatória para ajudar operadoras a construir uma atuação mais ética, sólida e sustentável.',
    items: [
      {
        id: 'commitment',
        title: 'Compromisso com empresa e jogador',
        description: 'Proteção do usuário e maturidade operacional caminhando juntas.',
      },
      {
        id: 'integrated-approach',
        title: 'Abordagem integrada',
        description: 'Compliance, acolhimento e educação em uma mesma estrutura.',
      },
      {
        id: 'real-impact',
        title: 'Impacto real',
        description: 'Mais do que discurso institucional, foco em implementação prática.',
      },
    ],
  },

  about: {
    badge: 'Sobre',
    title: 'Arquitetura institucional para jogo responsável de alto padrão',
    intro:
      'O IPLURA atua como parceiro estratégico das operadoras de apostas para transformar responsabilidade em prática operacional, governança contínua e proteção efetiva ao apostador.',
    pills: ['Suporte técnico aplicado', 'Acolhimento qualificado', 'Educação preventiva'],
    statement: {
      label: 'Declaração institucional',
      title: 'O objetivo é unir crescimento de mercado e proteção real do usuário',
      description:
        'A atuação do IPLURA conecta estratégia, execução e evidência de conformidade para que o jogo responsável deixe de ser apenas obrigação formal e passe a estruturar a maturidade institucional da operação.',
    },
    mission: {
      title: 'Missão',
      description:
        'Atuar como parceiro estratégico das operadoras, oferecendo suporte técnico às plataformas, acolhimento qualificado aos usuários em risco e ações educativas para saúde financeira, equilíbrio emocional e consumo consciente.',
    },
    vision: {
      title: 'Visão',
      description:
        'Ser a principal referência em jogo responsável no Brasil, contribuindo para um setor mais ético, sustentável e centrado na proteção efetiva do apostador.',
    },
    values: {
      label: 'Valores',
      title: 'Princípios que orientam decisões e execução institucional',
      items: [
        {
          id: 'wellbeing',
          title: 'Compromisso com o bem-estar do apostador',
          description: 'Proteção efetiva do usuário como prioridade contínua.',
        },
        {
          id: 'shared-responsibility',
          title: 'Responsabilidade compartilhada',
          description: 'Operadora, plataforma e suporte atuando de forma coordenada.',
        },
        {
          id: 'ethics',
          title: 'Transparência e ética institucional',
          description: 'Decisões claras, rastreáveis e alinhadas ao interesse público.',
        },
        {
          id: 'education',
          title: 'Educação como ferramenta de transformação',
          description: 'Conhecimento aplicado para prevenir risco e ampliar consciência.',
        },
        {
          id: 'regulatory-effectiveness',
          title: 'Efetividade regulatória com impacto real',
          description: 'Conformidade convertida em prática operacional consistente.',
        },
        {
          id: 'innovation',
          title: 'Inovação com propósito',
          description: 'Evolução contínua com foco em resultado humano e institucional.',
        },
      ],
    },
  },

  trust: {
    badge: 'Base de Confiança',
    title: 'Credenciais institucionais que sustentam a atuação do IPLURA',
    intro:
      'Rigor técnico, visão regulatória e foco humano convertidos em estrutura operacional sólida.',
    primary: {
      label: 'Pilar principal',
      title: 'Estrutura técnica que protege reputação, operação e apostador',
      description:
        'O IPLURA conecta diagnóstico, protocolos e capacitação para transformar responsabilidade em execução contínua.',
    },
    fronts: [
      {
        title: 'Governança verificável',
        description: 'Protocolos e evidências prontos para auditoria.',
      },
      {
        title: 'Proteção efetiva do usuário',
        description: 'Prevenção ativa integrada ao fluxo operacional.',
      },
      {
        title: 'Evolução contínua',
        description: 'Treinamento recorrente e melhoria com foco em resultado.',
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
      title: 'Conformidade completa é a que gera proteção real.',
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
        question: 'O IPLURA ajuda na conformidade regulatória?',
        answer: 'Sim. Nossa atuação apoia a implementação prática de ações ligadas ao jogo responsável.',
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
      submitLabel: 'Entrar em contato',
    },
  },

  footer: {
    logoAlt: 'IPLURA',
    descriptionLines: [
      'Instituto de Promoção da Legalidade e Uso Responsável de Apostas.',
      'Transformando obrigação regulatória em cuidado real.',
    ],
    linksTitle: 'Links',
    contactTitle: 'Contato',
    quickLinks: navigationLinks,
    contactItems: ['contato@iplura.org.br', 'São Paulo, SP - Brasil'],
    copyright: '© 2026 IPLURA. Todos os direitos reservados.',
    legalLinks: [
      { label: 'Política de Privacidade', href: '#' },
      { label: 'Termos de Uso', href: '#' },
    ],
  },
} as const;
