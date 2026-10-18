/**
 * Modelo de conteúdo do site.
 *
 * Todo o conteúdo (conteúdos para alunos, trajetória, projetos e posts) é
 * escrito como dados tipados em `src/content`. Os componentes só leem
 * esses dados.
 */

import type { IconName } from '@/components/ui/Icon';

export type Tone = 'purple' | 'blue' | 'yellow' | 'pink' | 'lime' | 'green';

/* ------------------------------------------------------------------ */
/* Blocos de conteúdo (usados em aulas, exercícios e posts)            */
/* ------------------------------------------------------------------ */

/**
 * Textos aceitam marcação inline simples:
 * `**negrito**`, `*itálico*` e `` `código` ``.
 */
export type ContentBlock =
  | { type: 'paragraph'; text: string }
  | { type: 'heading'; text: string }
  | { type: 'list'; items: string[]; ordered?: boolean; variant?: 'check' }
  | { type: 'code'; code: string; language?: CodeLanguage; title?: string }
  | { type: 'callout'; tone: 'tip' | 'info' | 'warning'; title?: string; text: string }
  | { type: 'linkedList'; values: Array<string | number>; caption?: string }
  | { type: 'stack'; values: Array<string | number>; caption?: string }
  | { type: 'queue'; values: Array<string | number>; caption?: string }
  | { type: 'table'; headers: string[]; rows: string[][]; caption?: string }
  | { type: 'image'; src: string; alt: string; caption?: string };

export type CodeLanguage = 'python' | 'text';

/* ------------------------------------------------------------------ */
/* Conteúdos para alunos (área Aulas)                                   */
/* ------------------------------------------------------------------ */

interface ConteudoBase {
  /** Vira a URL: /aulas/<slug>. */
  slug: string;
  title: string;
  /** Uma ou duas frases para o card e o topo da página. */
  summary: string;
  icon: IconName;
  tone: Tone;
  /** Assuntos do conteúdo, exibidos como etiquetas. */
  tags: string[];
  /** Data ISO (AAAA-MM-DD) da última atualização. */
  updatedAt: string;
}

/**
 * Um conteúdo avulso, sem ordem nem sequência. Pode ser:
 * - `texto`: escrito com blocos (parágrafos, código, diagramas...);
 * - `interativo`: uma página com componente próprio, registrado em
 *   `src/features/conteudos/registry.ts` (ex.: o visualizador de ordenação).
 */
export type Conteudo =
  | (ConteudoBase & { type: 'texto'; blocks: ContentBlock[] })
  | (ConteudoBase & { type: 'interativo' });

/* ------------------------------------------------------------------ */
/* Portfólio e blog                                                     */
/* ------------------------------------------------------------------ */

export interface Project {
  slug: string;
  title: string;
  description: string;
  labels: string[];
  stack: string[];
  image?: string;
  imageAlt?: string;
  url?: string;
}

export interface SideProject {
  title: string;
  description: string;
  icon: IconName;
  tone: Tone;
  href: string;
}

export type CareerCategory = 'formacao' | 'experiencia' | 'professora';

/** Um marco da trajetória (página Sobre e resumo no Portfólio). */
export interface CareerItem {
  period: string;
  title: string;
  /** Instituição ou empresa. */
  subtitle?: string;
  /** Um parágrafo por item. */
  description: string[];
  tags: string[];
  icon: IconName;
  tone: Tone;
  categories: CareerCategory[];
  /** Aparece também no resumo "Minha trajetória" do Portfólio. */
  featured?: boolean;
}

export interface Post {
  slug: string;
  title: string;
  summary: string;
  publishedAt: string;
  tags: string[];
  readingMinutes: number;
  blocks: ContentBlock[];
}
