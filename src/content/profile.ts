import type { IconName } from '@/components/ui/Icon';
import type { CareerCategory, CareerItem, Tone } from './types';

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

export const careerFilters: Array<{ id: 'todos' | CareerCategory; label: string }> = [
  { id: 'todos', label: 'Visão geral' },
  { id: 'experiencia', label: 'Experiência profissional' },
  { id: 'formacao', label: 'Formação' },
  { id: 'professora', label: 'Atuação como professora' },
];

/** Trajetória em ordem cronológica. */
export const career: CareerItem[] = [
  {
    period: '2010 – 2015',
    title: 'Graduação',
    subtitle: 'Engenharia de Computação · UTFPR',
    description: [
      'Base sólida em programação, algoritmos e sistemas. Aqui começou minha paixão por resolver problemas com código.',
    ],
    tags: ['Programação', 'Algoritmos', 'Sistemas'],
    icon: 'graduation',
    tone: 'purple',
    categories: ['formacao'],
    featured: true,
  },
  {
    period: '2015 – 2017',
    title: 'Desenvolvedora',
    description: [
      'Primeiras experiências profissionais com desenvolvimento de software e participação em projetos de diferentes áreas.',
    ],
    tags: ['Python', 'Java', 'Web', 'Boas práticas'],
    icon: 'laptop',
    tone: 'blue',
    categories: ['experiencia'],
  },
  {
    period: '2017 – 2019',
    title: 'Mestrado',
    subtitle: 'Engenharia de Sistemas Computacionais · EESC/USP',
    description: [
      'Pesquisa, aprendizado avançado e uma visão mais profunda da tecnologia e seus impactos.',
    ],
    tags: ['Pesquisa', 'Dados', 'IA'],
    icon: 'users',
    tone: 'pink',
    categories: ['formacao'],
    featured: true,
  },
  {
    period: '2019 – 2023',
    title: 'Desenvolvedora Sr.',
    description: [
      'Crescimento técnico em diferentes empresas e produtos.',
      'Atuação em microsserviços, cloud, integrações e soluções de alta escala.',
    ],
    tags: ['Java', 'AWS', 'Arquitetura', 'Microsserviços'],
    icon: 'rocket',
    tone: 'blue',
    categories: ['experiencia'],
    featured: true,
  },
  {
    period: '2023 – atual',
    title: 'Tech Lead',
    subtitle: 'Banco Itaú',
    description: [
      'Liderança técnica, gestão de releases, discovery, métricas, processos e modernização de preços. Time, pessoas e impacto em escala.',
    ],
    tags: ['Liderança', 'Arquitetura', 'AWS', 'Produto'],
    icon: 'building',
    tone: 'green',
    categories: ['experiencia'],
    featured: true,
  },
  {
    period: '2020 – atual',
    title: 'Professora',
    subtitle: 'Graduação em TI',
    description: [
      'Ensino de algoritmos, estrutura de dados, Python e IA. Criação de materiais, exercícios e projetos práticos para o aprendizado.',
    ],
    tags: ['Educação', 'Python', 'Estrutura de Dados', 'Machine Learning'],
    icon: 'book',
    tone: 'lime',
    categories: ['professora'],
    featured: true,
  },
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
