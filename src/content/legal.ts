export type LegalSection = {
  title: string;
  paragraphs: string[];
  bullets?: string[];
  afterBullets?: string[];
};

export type LegalDocument = {
  title: string;
  slug: '/termos-de-uso' | '/politica-de-privacidade';
  lastUpdated: string;
  introduction: string[];
  sections: LegalSection[];
};

const lastUpdatedPlaceholder = '[inserir data]';

export const termsOfUseContent: LegalDocument = {
  title: 'Termos de Uso',
  slug: '/termos-de-uso',
  lastUpdated: lastUpdatedPlaceholder,
  introduction: [
    'Bem-vindo ao site do IPLURA — Instituto de Promoção da Legalidade e Uso Responsável de Apostas.',
    'Estes Termos de Uso regulam o acesso e a navegação neste site. Ao acessar e utilizar este ambiente digital, o usuário declara estar ciente destas condições.',
  ],
  sections: [
    {
      title: 'Objeto do site',
      paragraphs: [
        'O site do IPLURA tem caráter institucional e informativo, com a finalidade de apresentar a organização, suas frentes de atuação, conteúdos institucionais e canais de contato.',
        'Este site não oferece plataforma de apostas, não intermedeia apostas, não realiza transações financeiras e não disponibiliza área de cadastro de usuários.',
      ],
    },
    {
      title: 'Uso adequado',
      paragraphs: [
        'O usuário compromete-se a utilizar o site de forma lícita, ética e compatível com sua finalidade, abstendo-se de:',
      ],
      bullets: [
        'praticar atos que comprometam a segurança, estabilidade ou disponibilidade do site;',
        'inserir conteúdo falso, ofensivo, ilícito ou que viole direitos de terceiros;',
        'utilizar o formulário de contato para spam, fraude, automação abusiva ou qualquer finalidade indevida;',
        'tentar acessar áreas, sistemas ou dados não disponibilizados publicamente.',
      ],
    },
    {
      title: 'Conteúdo e propriedade intelectual',
      paragraphs: [
        'Os textos, marcas, sinais distintivos, identidade visual, logotipos, elementos gráficos e demais conteúdos disponibilizados neste site pertencem ao IPLURA ou são utilizados de forma legítima.',
        'É vedada a reprodução, distribuição, modificação ou uso comercial de qualquer conteúdo do site sem autorização prévia e expressa, salvo quando permitido por lei.',
      ],
    },
    {
      title: 'Informações do site',
      paragraphs: [
        'O IPLURA busca manter as informações deste site corretas, atualizadas e adequadas à sua finalidade institucional. Ainda assim, o conteúdo pode ser ajustado, atualizado, complementado ou removido a qualquer tempo, sem aviso prévio.',
        'O uso das informações disponibilizadas neste site é de responsabilidade do usuário.',
      ],
    },
    {
      title: 'Links para terceiros',
      paragraphs: [
        'O site poderá conter links para páginas, serviços ou conteúdos de terceiros. Esses ambientes possuem políticas e condições próprias, não sendo o IPLURA responsável por práticas, conteúdos, disponibilidade ou segurança de sites externos.',
      ],
    },
    {
      title: 'Disponibilidade e segurança',
      paragraphs: [
        'O IPLURA poderá realizar alterações técnicas, manutenções, atualizações ou interrupções temporárias no site sempre que necessário.',
        'Embora sejam adotadas medidas razoáveis para proteção do ambiente digital, não se garante disponibilidade ininterrupta ou ausência absoluta de falhas, indisponibilidades ou vulnerabilidades externas.',
      ],
    },
    {
      title: 'Formulário de contato',
      paragraphs: [
        'O site disponibiliza formulário para contato institucional. Ao utilizá-lo, o usuário declara que as informações enviadas são verdadeiras e que possui legitimidade para compartilhá-las.',
        'O envio do formulário não cria vínculo contratual automático, obrigação de contratação ou garantia de resposta em prazo específico, embora o IPLURA busque tratar os contatos recebidos com diligência.',
      ],
    },
    {
      title: 'Privacidade e dados pessoais',
      paragraphs: [
        'O tratamento de dados pessoais relacionado ao formulário e ao uso do site ocorre nos termos da legislação aplicável e da Política de Privacidade deste site, que integra estes Termos de Uso para todos os efeitos.',
      ],
    },
    {
      title: 'Alterações destes Termos',
      paragraphs: [
        'O IPLURA poderá atualizar estes Termos de Uso periodicamente para refletir alterações legais, regulatórias, operacionais ou institucionais. A versão mais recente será sempre a publicada nesta página.',
      ],
    },
    {
      title: 'Contato',
      paragraphs: [
        'Para dúvidas relacionadas a estes Termos de Uso ou ao site, entre em contato por meio do canal institucional informado no próprio site.',
      ],
    },
  ],
};

export const privacyPolicyContent: LegalDocument = {
  title: 'Política de Privacidade',
  slug: '/politica-de-privacidade',
  lastUpdated: lastUpdatedPlaceholder,
  introduction: [
    'Esta Política de Privacidade explica, de forma clara e objetiva, como o IPLURA — Instituto de Promoção da Legalidade e Uso Responsável de Apostas trata dados pessoais no contexto deste site institucional.',
    'A LGPD define “controlador” como quem toma as decisões sobre o tratamento de dados e “tratamento” como toda operação realizada com dados pessoais, como coleta, uso, armazenamento e eliminação.',
  ],
  sections: [
    {
      title: 'Quem é o controlador',
      paragraphs: [
        'Para os fins desta Política, o IPLURA atua como controlador dos dados pessoais tratados por meio deste site, no que diz respeito às decisões relacionadas ao formulário de contato e aos atendimentos decorrentes dele.',
        'Contato institucional: contato@iplura.org.br',
      ],
    },
    {
      title: 'Escopo desta Política',
      paragraphs: [
        'Este site possui natureza predominantemente institucional e informativa.',
        'Em regra:',
      ],
      bullets: [
        'não há criação de conta de usuário;',
        'não há área logada;',
        'não há contratação online pelo site;',
        'não há coleta ativa de dados pessoais além daqueles fornecidos voluntariamente pelo usuário no formulário de contato.',
      ],
    },
    {
      title: 'Quais dados podem ser tratados',
      paragraphs: [
        'Quando o usuário preenche o formulário de contato, poderão ser tratados os dados informados voluntariamente, como:',
      ],
      bullets: [
        'nome;',
        'empresa;',
        'cargo;',
        'e-mail;',
        'telefone;',
        'mensagem enviada.',
      ],
      afterBullets: [
        'Além disso, a infraestrutura tecnológica do site pode gerar registros técnicos mínimos necessários ao funcionamento, à segurança e à prevenção de abuso, como data e hora do acesso e logs técnicos do ambiente. Esses registros, quando existentes, são tratados de forma compatível com sua finalidade operacional.',
      ],
    },
    {
      title: 'Finalidades do tratamento',
      paragraphs: [
        'Os dados enviados pelo formulário podem ser tratados para:',
      ],
      bullets: [
        'receber e analisar solicitações de contato;',
        'responder dúvidas, pedidos de informação ou manifestações enviadas pelo usuário;',
        'encaminhar a demanda internamente, quando necessário;',
        'manter registro mínimo do atendimento;',
        'adotar medidas de segurança, prevenção a abuso e proteção do ambiente digital.',
      ],
    },
    {
      title: 'Bases legais',
      paragraphs: [
        'O tratamento dos dados enviados pelo formulário poderá ocorrer, conforme o contexto da solicitação, para atender pedido iniciado pelo próprio titular, para procedimentos preliminares relacionados a eventual relação institucional ou contratual, para cumprimento de obrigação legal ou regulatória quando aplicável e, em situações adequadas, com base em consentimento ou legítimo interesse, observados os requisitos da LGPD. A LGPD prevê diferentes bases legais para o tratamento de dados pessoais, e cabe ao controlador definir a hipótese adequada ao tratamento realizado.',
      ],
    },
    {
      title: 'Compartilhamento de dados',
      paragraphs: [
        'O IPLURA não comercializa dados pessoais.',
        'Os dados poderão ser compartilhados apenas quando necessário para:',
      ],
      bullets: [
        'operação técnica do site e da hospedagem;',
        'atendimento da solicitação enviada;',
        'cumprimento de obrigação legal, regulatória ou determinação de autoridade competente;',
        'proteção dos direitos do IPLURA em procedimentos administrativos, regulatórios ou judiciais.',
      ],
      afterBullets: [
        'Quando houver operadores ou prestadores de serviço envolvidos, o tratamento deverá ocorrer de forma compatível com a finalidade informada e com a legislação aplicável.',
      ],
    },
    {
      title: 'Armazenamento e retenção',
      paragraphs: [
        'Os dados pessoais serão mantidos apenas pelo tempo necessário para cumprir as finalidades desta Política, atender obrigações legais ou regulatórias, resguardar direitos e possibilitar a adequada gestão dos contatos recebidos.',
        'Após o término da necessidade de tratamento, os dados poderão ser eliminados, anonimizados ou mantidos nas hipóteses legalmente autorizadas. A LGPD prevê direitos do titular e também hipóteses legais de conservação de dados.',
      ],
    },
    {
      title: 'Direitos do titular',
      paragraphs: [
        'Nos termos da LGPD, o titular pode solicitar, observadas as hipóteses legais aplicáveis:',
      ],
      bullets: [
        'confirmação da existência de tratamento;',
        'acesso aos dados;',
        'correção de dados incompletos, inexatos ou desatualizados;',
        'anonimização, bloqueio ou eliminação de dados desnecessários, excessivos ou tratados em desconformidade;',
        'portabilidade, quando aplicável;',
        'eliminação de dados tratados com consentimento, nas hipóteses legais;',
        'informação sobre compartilhamentos realizados;',
        'informação sobre a possibilidade de não fornecer consentimento e suas consequências, quando essa base legal for utilizada;',
        'revisão e esclarecimentos cabíveis na forma da legislação aplicável.',
      ],
      afterBullets: [
        'A ANPD disponibiliza orientação pública sobre os direitos dos titulares e sobre a possibilidade de petição perante a autoridade em caso de violação de direitos.',
      ],
    },
    {
      title: 'Como exercer seus direitos',
      paragraphs: [
        'O titular poderá entrar em contato com o IPLURA pelo canal institucional indicado nesta Política para solicitar informações ou exercer direitos relacionados a dados pessoais.',
        'Sempre que necessário, o IPLURA poderá solicitar informações adicionais para confirmar a identidade do solicitante e proteger os dados contra acessos indevidos.',
        'Caso o titular entenda que seus direitos não foram adequadamente atendidos, a ANPD informa que é possível apresentar petição de titular ou denúncia nos canais oficiais.',
      ],
    },
    {
      title: 'Segurança',
      paragraphs: [
        'O IPLURA adota medidas técnicas e organizacionais razoáveis para proteger os dados pessoais contra acessos não autorizados, perda, alteração, destruição ou divulgação indevida, compatíveis com a natureza do site e das informações tratadas.',
        'Nenhum ambiente digital é absolutamente invulnerável. Por isso, embora o IPLURA adote boas práticas de segurança, não é possível garantir risco zero.',
      ],
    },
    {
      title: 'Cookies e tecnologias semelhantes',
      paragraphs: [
        'Este site não possui, por padrão, funcionalidade de cadastro ou coleta ativa de dados comportamentais do usuário além do formulário de contato.',
        'Caso venham a ser utilizados cookies não estritamente necessários, ferramentas analíticas adicionais ou integrações que alterem substancialmente esta dinâmica, esta Política deverá ser atualizada para refletir a nova prática.',
      ],
    },
    {
      title: 'Alterações desta Política',
      paragraphs: [
        'Esta Política de Privacidade poderá ser atualizada a qualquer momento para refletir mudanças legais, regulatórias, técnicas ou institucionais. A versão vigente será sempre aquela publicada nesta página.',
      ],
    },
    {
      title: 'Contato',
      paragraphs: [
        'Para assuntos relacionados a esta Política de Privacidade ou ao tratamento de dados pessoais no contexto deste site:',
        'E-mail: contato@iplura.org.br',
      ],
    },
  ],
};
