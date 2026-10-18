import type { Post } from './types';

/** Posts do blog, do mais recente para o mais antigo. */
export const posts: Post[] = [
  {
    slug: 'como-estudar-estrutura-de-dados',
    title: 'Como estudar Estrutura de Dados sem decorar',
    summary: 'Desenhar, implementar e explicar: o ciclo que mais funciona com as minhas turmas.',
    publishedAt: '2026-10-01',
    tags: ['Ensino', 'Estrutura de Dados'],
    readingMinutes: 4,
    blocks: [
      {
        type: 'paragraph',
        text: 'Depois de alguns semestres ensinando a disciplina, percebi que quem aprende de verdade segue quase sempre o mesmo ciclo: **desenha**, **implementa** e **explica**.',
      },
      { type: 'heading', text: '1. Desenhe antes de programar' },
      {
        type: 'paragraph',
        text: 'Caixinhas e setas no papel mostram o que o código vai fazer. Se o desenho não fecha, o código também não vai fechar.',
      },
      { type: 'heading', text: '2. Implemente do zero' },
      {
        type: 'paragraph',
        text: 'Usar a `list` do Python é ótimo no dia a dia, mas implementar uma lista encadeada uma vez muda a forma como você enxerga a memória.',
      },
      { type: 'heading', text: '3. Explique para alguém' },
      {
        type: 'callout',
        tone: 'tip',
        text: 'Se você consegue explicar a operação em voz alta, linha por linha, você entendeu.',
      },
    ],
  },
  {
    slug: 'ia-em-produto',
    title: 'IA em produto: o que aprendi classificando autos de infração',
    summary: 'Configurações genéricas, avaliação contínua e por que o humano continua no circuito.',
    publishedAt: '2026-09-12',
    tags: ['IA', 'Produto', 'AWS'],
    readingMinutes: 6,
    blocks: [
      {
        type: 'paragraph',
        text: 'Colocar um modelo em produção é a parte fácil. O difícil é decidir **o que fazer com a resposta** quando ela não é confiável o suficiente.',
      },
      { type: 'heading', text: 'Configuração antes de código' },
      {
        type: 'paragraph',
        text: 'Separar regras de negócio do prompt e do modelo permitiu que o time ajustasse o comportamento sem novos deploys.',
      },
      { type: 'heading', text: 'Medir sempre' },
      {
        type: 'list',
        variant: 'check',
        items: [
          'Conjunto de avaliação fixo, revisado por especialistas.',
          'Métricas acompanhadas a cada mudança de prompt.',
          'Fila de revisão humana para os casos de baixa confiança.',
        ],
      },
    ],
  },
];
