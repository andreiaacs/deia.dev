import type { Conteudo } from './types';

/**
 * Conteúdos para alunos, exibidos em /aulas. Não há ordem nem sequência:
 * cada conteúdo é independente. Os mais recentes aparecem primeiro.
 *
 * Para publicar um conteúdo de texto, adicione um item com `type: 'texto'`
 * e os blocos. Para um conteúdo interativo, use `type: 'interativo'` e
 * registre o componente em `src/features/conteudos/registry.ts`.
 */
export const conteudos: Conteudo[] = [
  {
    slug: 'algoritmos-de-ordenacao',
    type: 'interativo',
    title: 'Algoritmos de ordenação',
    summary:
      'Escolha o algoritmo e o tipo de dados e acompanhe a ordenação acontecendo, com o código Python executando linha a linha ao lado.',
    icon: 'sort',
    tone: 'purple',
    tags: ['Estrutura de Dados', 'Ordenação', 'Python', 'Visualização'],
    updatedAt: '2026-10-17',
  },
];

export function findConteudo(slug: string | undefined) {
  return conteudos.find((conteudo) => conteudo.slug === slug);
}

/** Lista ordenada do mais recente para o mais antigo. */
export function conteudosRecentes() {
  return [...conteudos].sort((a, b) => b.updatedAt.localeCompare(a.updatedAt));
}
