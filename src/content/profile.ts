import type { IconName } from '@/components/ui/Icon';
import type { CareerItem, Tone } from './types';

/**
 * Dados pessoais exibidos no site.
 */
export const profile = {
  name: 'Andréia Alencar',
  nickname: 'Déia',
  roles: ['Engenheira de Software', 'Professora'],
  headline: 'Projetos que resolvem problemas reais',
  intro: [
    'Aqui compartilho projetos, experiências e ideias que marcaram minha trajetória na tecnologia.',
    'Cada projeto tem um pouco da minha forma de pensar: trabalhar com propósito, colaborar com pessoas incríveis e transformar desafios em soluções de verdade.',
  ],
  motto: ['Mesma lógica de sempre:', 'curiosidade', '+ prática', '= evolução'],
  quote:
    'Gosto de resolver problemas, construir soluções e compartilhar conhecimento. A tecnologia é mais interessante quando conecta pessoas.',
  contact: {
    email: 'deia.alencarcs@gmail.com',
    linkedin: 'https://www.linkedin.com/in/andreiaalencar',
    github: 'https://github.com/andreiaacs',
  },
} as const;

export interface HighlightStat {
  icon: IconName;
  tone: Tone;
  title: string;
  detail: string;
}

export const highlightStats: HighlightStat[] = [
  { icon: 'code', tone: 'purple', title: '9+', detail: 'anos de experiência' },
  { icon: 'graduation', tone: 'pink', title: 'Professora', detail: 'de graduação de TI' },
  { icon: 'users', tone: 'blue', title: 'Tech Lead', detail: 'e Analista Sr.' },
  {
    icon: 'heart',
    tone: 'pink',
    title: 'Apaixonada',
    detail: 'por tecnologia, educação e soluções que geram impacto',
  },
];

/* ------------------------------------------------------------------ */
/* Página Sobre                                                         */
/* ------------------------------------------------------------------ */

export const about = {
  intro:
    'Sou engenheira de software, líder técnica, professora e entusiasta de soluções em tecnologia. Gosto de transformar problemas complexos em soluções simples, colaborar com pessoas incríveis e compartilhar conhecimento pelo caminho.',
  handNote: ['tecnologia', 'educação', 'pessoas', 'impacto real <3'],
  motto: ['Mesma lógica de sempre:', 'curiosidade', '+ prática', '+ compartilhamento', '= evolução'],
  sideNote: 'Experiência em diferentes contextos, sempre aprendendo algo novo',
  careerSummary: 'Mais de 9 anos de experiência unindo desenvolvimento, liderança e educação em tecnologia.',
};

export const aboutAreas: Array<{ icon: IconName; tone: Tone; label: string }> = [
  { icon: 'code', tone: 'purple', label: 'Engenharia de Software' },
  { icon: 'users', tone: 'blue', label: 'Liderança Técnica' },
  { icon: 'graduation', tone: 'pink', label: 'Educação' },
  { icon: 'chart', tone: 'lime', label: 'Dados e IA' },
  { icon: 'heart', tone: 'yellow', label: 'Comunidade' },
];

/** Trajetória em ordem cronológica, conforme o currículo. */
export const career: CareerItem[] = [
  {
    period: '2010 – 2015',
    title: 'Graduação',
    subtitle: 'Engenharia de Computação · UTFPR',
    description: ['Bacharelado em Engenharia de Computação pela Universidade Tecnológica Federal do Paraná.'],
    tags: ['Programação', 'Algoritmos', 'Sistemas'],
    icon: 'graduation',
    tone: 'purple',
    featured: true,
  },
  {
    period: '2014 – 2015',
    title: 'Iniciação científica',
    subtitle: 'Bolsista PIBIC · UTFPR',
    description: [
      'Desenvolvimento de uma ferramenta para automatizar a implementação e a gestão de projetos, métricas e estimativas de software no Astah.',
    ],
    tags: ['Pesquisa', 'Engenharia de Software'],
    icon: 'flask',
    tone: 'pink',
  },
  {
    period: '2016 – 2017',
    title: 'Desenvolvedora Trainee',
    subtitle: 'DSIN',
    description: [
      'Desenvolvimento e manutenção de aplicações de gestão de trânsito para desktop e web.',
    ],
    tags: ['Delphi', 'PHP', 'JavaScript', 'Firebird'],
    icon: 'laptop',
    tone: 'blue',
  },
  {
    period: '2017 – 2019',
    title: 'Mestrado',
    subtitle: 'Mestre em Ciências · EESC/USP',
    description: [
      'Bolsista CAPES. Pesquisa e desenvolvimento de um aplicativo mobile para auxiliar no diagnóstico de retinopatia diabética usando deep learning.',
    ],
    tags: ['Pesquisa', 'Deep Learning', 'Mobile'],
    icon: 'brain',
    tone: 'pink',
    featured: true,
  },
  {
    period: 'abr – jun 2019',
    title: 'Desenvolvedora de Sistemas',
    subtitle: 'Almoço Grátis',
    description: ['Desenvolvimento e manutenção de sistema web.'],
    tags: ['PHP', 'JavaScript', 'MySQL'],
    icon: 'code',
    tone: 'yellow',
  },
  {
    period: '2019 – 2021',
    title: 'Analista Pleno e Sênior',
    subtitle: 'Accenture',
    description: [
      'Modernização de caixas automáticos (ATM) de Cobol para Angular, convivendo com o mainframe.',
      'Bibliotecas de componentes para microfrontends, Dealing Panel de câmbio e treinamento de novos integrantes do time.',
    ],
    tags: ['Angular', 'Microfrontends', 'CI/CD', 'Jasmine'],
    icon: 'rocket',
    tone: 'blue',
    featured: true,
  },
  {
    period: '2021 – 2022',
    title: 'Analista de Engenharia de TI Pleno',
    subtitle: 'Banco Itaú',
    description: [
      'Modernização de sistemas legados com microfrontends em Angular, testes com Jest e migração do código e das pipelines para GitHub e GitHub Actions.',
    ],
    tags: ['Angular', 'Jest', 'GitHub Actions'],
    icon: 'layers',
    tone: 'green',
  },
  {
    period: '2022 – atual',
    title: 'Tech Lead',
    subtitle: 'Banco Itaú',
    description: [
      'Liderança técnica de time multidisciplinar, arquitetura de soluções distribuídas na AWS, planejamento de releases e acompanhamento de indicadores de modernização, saúde e segurança do produto.',
    ],
    tags: ['Liderança', 'AWS', 'Arquitetura', 'Produto'],
    icon: 'users',
    tone: 'green',
    featured: true,
  },
  {
    period: '2026 – atual',
    title: 'Professora',
    subtitle: 'Graduação em Inteligência Artificial',
    description: [
      'Aulas de estrutura de dados e programação em Python, com materiais, exemplos e visualizações interativas para os alunos.',
    ],
    tags: ['Educação', 'Estrutura de Dados', 'Python'],
    icon: 'book',
    tone: 'lime',
    featured: true,
  },
];

/* ------------------------------------------------------------------ */
/* Conquistas                                                           */
/* ------------------------------------------------------------------ */

export interface Badge {
  title: string;
  issuer: string;
  /** Ex.: "fev. 2025". */
  date?: string;
  /** Imagem em public/images. */
  image: string;
  /** Página pública da credencial; sem link, mostra só a imagem. */
  url?: string;
}

/** Certificações e programas, exibidos com a imagem do badge. */
export const badges: Badge[] = [
  {
    title: 'AWS Certified Solutions Architect – Associate',
    issuer: 'Amazon Web Services',
    date: 'fev. 2025',
    image: '/images/badge-aws-solutions-architect.webp',
    url: 'https://www.credly.com/badges/b01cb073-4339-4eab-baec-bfe5c75220a0/public_url',
  },
  {
    title: 'AWS Certified AI Practitioner',
    issuer: 'Amazon Web Services',
    date: 'fev. 2025',
    image: '/images/badge-aws-ai-practitioner.webp',
    url: 'https://www.credly.com/badges/8b4e5098-bc91-426f-8302-57daf59032c3/public_url',
  },
  {
    title: 'AWS Certified AI Practitioner Early Adopter',
    issuer: 'Amazon Web Services',
    image: '/images/badge-aws-ai-practitioner-early-adopter.webp',
    url: 'https://www.credly.com/badges/745945f6-6053-4fc2-9231-29ac59eba28b/public_url',
  },
  {
    title: 'AWS Educate Getting Started with Networking',
    issuer: 'Amazon Web Services',
    image: '/images/badge-aws-educate-networking.webp',
    url: 'https://www.credly.com/badges/b4e161e0-b8a1-4cf6-ad7c-fd68020b894e/public_url',
  },
  {
    title: 'M365 Copilot Expert',
    issuer: 'Itaú · iox hub OIA',
    image: '/images/badge-m365-copilot-expert.webp',
  },
  {
    title: 'M365 Copilot Trained',
    issuer: 'Itaú · iox hub OIA',
    image: '/images/badge-m365-copilot-trained.webp',
  },
  {
    title: 'Programa Tecnicidade Feminina – Mentoradas',
    issuer: 'Itaú · HubTech',
    image: '/images/badge-tecnicidade-feminina.webp',
  },
];

/** Reconhecimentos de alto desempenho (PRAD) no Itaú, do mais recente ao mais antigo. */
export const recognitions = [
  { title: 'High Performance Recognition (PRAD)', issuer: 'Banco Itaú', date: 'fev. 2025', year: '2025' },
  { title: 'High Performance Recognition (PRAD)', issuer: 'Banco Itaú', date: 'fev. 2023', year: '2023' },
  { title: 'High Performance Recognition (PRAD)', issuer: 'Banco Itaú', date: 'fev. 2022', year: '2022' },
];

export const journeyNumbers: Array<{ icon: IconName; value: string; label: string; accent: Tone }> = [
  { icon: 'graduation', value: '9+', label: 'anos de experiência', accent: 'purple' },
  { icon: 'briefcase', value: '5+', label: 'empresas e produtos', accent: 'lime' },
  { icon: 'users', value: '4', label: 'áreas de atuação (tech, educação, liderança e dados)', accent: 'pink' },
  { icon: 'search', value: '∞', label: 'aprendizado contínuo', accent: 'blue' },
];

/** Tecnologias em destaque na página Sobre; `color` pinta o marcador. */
export const mainTechnologies: Array<{ name: string; color: string }> = [
  { name: 'Angular', color: '#dd0031' },
  { name: 'TypeScript', color: '#3178c6' },
  { name: 'JavaScript', color: '#e8c400' },
  { name: 'Python', color: '#3776ab' },
  { name: 'AWS', color: '#ff9900' },
  { name: 'Lambda', color: '#e8590c' },
  { name: 'Kafka', color: '#231f20' },
  { name: 'SQS/SNS', color: '#d6336c' },
  { name: 'Athena', color: '#8c4fff' },
  { name: 'Datadog', color: '#632ca6' },
  { name: 'Splunk', color: '#65a637' },
  { name: 'Grafana', color: '#f46800' },
  { name: 'GitHub', color: '#181717' },
  { name: 'GitLab', color: '#fc6d26' },
  { name: 'SQL', color: '#336791' },
  { name: 'Claude Code', color: '#d97757' },
  { name: 'Devin', color: '#1f7a8c' },
];

/* ------------------------------------------------------------------ */

export const technologies = [
  'Java',
  'Python',
  'JavaScript',
  'TypeScript',
  'Spring',
  'React',
  'Next.js',
  'Angular',
  'AWS',
  'Docker',
  'Kubernetes',
  'Kafka',
  'PostgreSQL',
  'MySQL',
  'DynamoDB',
  'Lambda',
  'API Gateway',
  'Datadog',
  'GitLab',
  'Jenkins',
  'OpenShift',
];

export const beyondTech = [
  { image: '/images/beyond-series.webp', label: 'Séries e filmes' },
  { image: '/images/beyond-livros.webp', label: 'Livros e estudo' },
  { image: '/images/beyond-locais.webp', label: 'Locais tranquilos' },
  { image: '/images/beyond-familia.webp', label: 'Família e pets' },
];
