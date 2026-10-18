import { screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { conteudos } from '@/content/conteudos';
import { renderWithRouter } from '@/test/renderWithRouter';
import AulasPage from './AulasPage';

describe('AulasPage', () => {
  it('lista todos os conteúdos publicados', () => {
    renderWithRouter(<AulasPage />, { route: '/aulas' });
    expect(screen.getAllByRole('article')).toHaveLength(conteudos.length);
    expect(screen.getByRole('link', { name: 'Algoritmos de ordenação' })).toHaveAttribute(
      'href',
      '/aulas/algoritmos-de-ordenacao',
    );
  });
});
