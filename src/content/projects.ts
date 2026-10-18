import type { Project, SideProject } from './types';

export const featuredProjects: Project[] = [
  {
    slug: 'modernizacao-de-precos',
    title: 'Modernização de Preços',
    description:
      'Liderança técnica em um ecossistema de microsserviços, com foco em performance e escalabilidade.',
    labels: ['Produto', 'Liderança'],
    stack: ['Java', 'AWS', 'Kafka', 'Docker'],
    image: '/images/project-precos.webp',
    imageAlt: 'Painel escuro com tabelas e indicadores de preços',
  },
  {
    slug: 'api-de-atendimento',
    title: 'API de Atendimento',
    description:
      'Integração com WhatsApp para consulta de multas e 2ª via de notificações.',
    labels: ['Produto', 'API'],
    stack: ['Python', 'AWS', 'API GW', 'Lambda'],
    image: '/images/project-atendimento.webp',
    imageAlt: 'Ilustração de celular com conversa no WhatsApp',
  },
  {
    slug: 'classificacao-de-autos-por-ia',
    title: 'Classificação de Autos por IA',
    description:
      'Uso de IA para classificação de autos de infração, com configurações genéricas e tratamento de resultados.',
    labels: ['IA', 'Produto'],
    stack: ['Python', 'Bedrock', 'AWS', 'OpenCV'],
    image: '/images/project-autos.webp',
    imageAlt: 'Painel com imagem de carro sendo analisada por visão computacional',
  },
];

export const sideProjects: SideProject[] = [
  {
    title: 'FinTrack – Projeto Pessoal',
    description: 'Aplicação de controle financeiro com dashboard intuitivo.',
    icon: 'chart',
    tone: 'lime',
    href: '/portfolio',
  },
  {
    title: 'Materiais para Alunos',
    description: 'Aulas, exercícios e projetos práticos.',
    icon: 'graduation',
    tone: 'blue',
    href: '/aulas',
  },
  {
    title: 'Automação de Processos',
    description: 'Scripts e ferramentas para facilitar o dia a dia.',
    icon: 'settings',
    tone: 'pink',
    href: '/portfolio',
  },
  {
    title: 'Projetos de Estudo',
    description: 'Explorações de IA, dados e novas tecnologias.',
    icon: 'flask',
    tone: 'purple',
    href: '/blog',
  },
];
