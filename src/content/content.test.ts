/**
 * Testes de integridade do conteúdo. Rodam a cada `npm test` e pegam
 * erros comuns ao escrever conteúdo novo: slugs repetidos, conteúdo sem
 * resumo, datas inválidas etc.
 */
import { describe, expect, it } from 'vitest';
import { conteudos } from './conteudos';
import { posts } from './posts';
import { badges, career, recognitions } from './profile';
import { featuredProjects } from './projects';

const SLUG = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

function expectUniqueSlugs(items: Array<{ slug: string }>, context: string) {
  const slugs = items.map((item) => item.slug);
  const duplicated = slugs.filter((slug, index) => slugs.indexOf(slug) !== index);
  expect(duplicated, `slugs repetidos em ${context}`).toEqual([]);
  for (const slug of slugs) expect(slug, `slug inválido em ${context}`).toMatch(SLUG);
}

describe('conteúdos para alunos', () => {
  it('têm slugs únicos e válidos', () => {
    expectUniqueSlugs(conteudos, 'conteúdos');
  });

  it('têm resumo, etiquetas e data válida', () => {
    for (const conteudo of conteudos) {
      expect(conteudo.summary.length, conteudo.title).toBeGreaterThan(0);
      expect(conteudo.tags.length, conteudo.title).toBeGreaterThan(0);
      expect(conteudo.updatedAt).toMatch(/^\d{4}-\d{2}-\d{2}$/);
      expect(Number.isNaN(Date.parse(conteudo.updatedAt))).toBe(false);
    }
  });

  it('conteúdos de texto têm blocos', () => {
    for (const conteudo of conteudos) {
      if (conteudo.type === 'texto') expect(conteudo.blocks.length, conteudo.title).toBeGreaterThan(0);
    }
  });

  it('posts usam datas ISO válidas', () => {
    for (const post of posts) {
      expect(post.publishedAt).toMatch(/^\d{4}-\d{2}-\d{2}$/);
    }
  });
});

describe('blog e portfólio', () => {
  it('tem slugs únicos', () => {
    expectUniqueSlugs(posts, 'posts');
    expectUniqueSlugs(featuredProjects, 'projetos');
  });
});

describe('conquistas', () => {
  it('têm imagem, link válido e títulos únicos', () => {
    const titles = badges.map((badge) => badge.title);
    expect(new Set(titles).size).toBe(titles.length);
    for (const badge of badges) {
      expect(badge.image).toMatch(/^\/images\/.+\.webp$/);
      if (badge.url) expect(badge.url).toMatch(/^https:\/\/www\.credly\.com\/badges\//);
    }
    expect(recognitions.length).toBeGreaterThan(0);
  });
});

describe('trajetória', () => {
  it('tem itens completos e no máximo 5 em destaque no resumo', () => {
    for (const item of career) {
      expect(item.description.length, item.title).toBeGreaterThan(0);
      expect(item.tags.length, item.title).toBeGreaterThan(0);
    }
    expect(career.filter((item) => item.featured).length).toBeLessThanOrEqual(5);
  });
});
