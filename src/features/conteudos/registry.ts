import { lazy, type ComponentType, type LazyExoticComponent } from 'react';

/**
 * Componentes dos conteúdos interativos, pelo slug.
 * Cada um vira um arquivo JS separado, carregado só quando é aberto.
 */
export const interactiveContent: Record<string, LazyExoticComponent<ComponentType>> = {
  'algoritmos-de-ordenacao': lazy(() =>
    import('@/features/sorting/components/SortingLab').then((module) => ({ default: module.SortingLab })),
  ),
};
