import { describe, expect, it } from 'vitest';
import { conteudos } from '@/content/conteudos';
import { interactiveContent } from './registry';

describe('registro de conteúdos interativos', () => {
  it('todo conteúdo interativo tem um componente registrado', () => {
    for (const conteudo of conteudos) {
      if (conteudo.type === 'interativo') {
        expect(interactiveContent[conteudo.slug], conteudo.slug).toBeDefined();
      }
    }
  });
});
