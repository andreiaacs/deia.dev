/**
 * Interpreta a marcação inline usada no conteúdo:
 * `**negrito**`, `*itálico*` e `` `código` ``.
 */

export type InlineNode =
  | { kind: 'text'; value: string }
  | { kind: 'strong'; value: string }
  | { kind: 'em'; value: string }
  | { kind: 'code'; value: string };

const INLINE_PATTERN = /`([^`]+)`|\*\*([^*]+)\*\*|\*([^*]+)\*/g;

export function parseInline(text: string): InlineNode[] {
  const nodes: InlineNode[] = [];
  let lastIndex = 0;

  for (const match of text.matchAll(INLINE_PATTERN)) {
    const index = match.index ?? 0;
    if (index > lastIndex) nodes.push({ kind: 'text', value: text.slice(lastIndex, index) });

    const [whole, code, strong, em] = match;
    if (code !== undefined) nodes.push({ kind: 'code', value: code });
    else if (strong !== undefined) nodes.push({ kind: 'strong', value: strong });
    else if (em !== undefined) nodes.push({ kind: 'em', value: em });

    lastIndex = index + whole.length;
  }

  if (lastIndex < text.length) nodes.push({ kind: 'text', value: text.slice(lastIndex) });
  return nodes;
}
