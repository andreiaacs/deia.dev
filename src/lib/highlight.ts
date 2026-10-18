/**
 * Realce de sintaxe mínimo para Python, suficiente para os exemplos
 * das aulas. Retorna tokens; quem renderiza decide as cores.
 */

export type TokenKind = 'keyword' | 'string' | 'comment' | 'number' | 'function' | 'self' | 'plain';

export interface Token {
  kind: TokenKind;
  value: string;
}

const KEYWORDS = new Set([
  'and', 'as', 'assert', 'break', 'class', 'continue', 'def', 'del', 'elif', 'else', 'except',
  'False', 'finally', 'for', 'from', 'if', 'import', 'in', 'is', 'lambda', 'None', 'not', 'or',
  'pass', 'raise', 'return', 'True', 'try', 'while', 'with', 'yield',
]);

const PATTERN =
  /(#[^\n]*)|("""[\s\S]*?"""|'''[\s\S]*?'''|"(?:\\.|[^"\\\n])*"|'(?:\\.|[^'\\\n])*')|(\b\d+(?:\.\d+)?\b)|([A-Za-z_][A-Za-z0-9_]*)/g;

export function tokenizePython(source: string): Token[] {
  const tokens: Token[] = [];
  let lastIndex = 0;

  const push = (kind: TokenKind, value: string) => {
    const previous = tokens[tokens.length - 1];
    if (kind === 'plain' && previous?.kind === 'plain') {
      previous.value += value;
    } else {
      tokens.push({ kind, value });
    }
  };

  for (const match of source.matchAll(PATTERN)) {
    const index = match.index ?? 0;
    if (index > lastIndex) push('plain', source.slice(lastIndex, index));

    const [text, comment, string, number, identifier] = match;
    if (comment) push('comment', comment);
    else if (string) push('string', string);
    else if (number) push('number', number);
    else if (identifier) {
      const nextChar = source.slice(index + identifier.length).trimStart()[0];
      if (identifier === 'self') push('self', identifier);
      else if (KEYWORDS.has(identifier)) push('keyword', identifier);
      else if (nextChar === '(') push('function', identifier);
      else push('plain', identifier);
    } else {
      push('plain', text);
    }
    lastIndex = index + text.length;
  }

  if (lastIndex < source.length) push('plain', source.slice(lastIndex));
  return tokens;
}
