import { describe, expect, it } from 'vitest';
import { formatDate, formatDuration, plural } from './format';
import { tokenizePython } from './highlight';
import { parseInline } from './inline';

describe('parseInline', () => {
  it('separa negrito, itálico e código', () => {
    expect(parseInline('um **nó** aponta para `None` *sempre*')).toEqual([
      { kind: 'text', value: 'um ' },
      { kind: 'strong', value: 'nó' },
      { kind: 'text', value: ' aponta para ' },
      { kind: 'code', value: 'None' },
      { kind: 'text', value: ' ' },
      { kind: 'em', value: 'sempre' },
    ]);
  });

  it('devolve o texto puro quando não há marcação', () => {
    expect(parseInline('texto simples')).toEqual([{ kind: 'text', value: 'texto simples' }]);
  });
});

describe('tokenizePython', () => {
  it('reconhece palavras-chave, self, funções, strings e comentários', () => {
    const tokens = tokenizePython('def f(self):\n    return len("x")  # fim');
    const kinds = tokens.filter((token) => token.kind !== 'plain').map((t) => [t.kind, t.value]);
    expect(kinds).toEqual([
      ['keyword', 'def'],
      ['function', 'f'],
      ['self', 'self'],
      ['keyword', 'return'],
      ['function', 'len'],
      ['string', '"x"'],
      ['comment', '# fim'],
    ]);
  });

  it('preserva o código original ao juntar os tokens', () => {
    const source = 'x = [1, 2.5]\nprint(x)\n';
    expect(
      tokenizePython(source)
        .map((token) => token.value)
        .join(''),
    ).toBe(source);
  });
});

describe('format', () => {
  it('formata durações', () => {
    expect(formatDuration(25)).toBe('25 min');
    expect(formatDuration(90)).toBe('1h30');
    expect(formatDuration(120)).toBe('2h');
  });

  it('usa singular e plural', () => {
    expect(plural(1, 'aula', 'aulas')).toBe('1 aula');
    expect(plural(4, 'aula', 'aulas')).toBe('4 aulas');
  });

  it('formata datas em português sem erro de fuso', () => {
    expect(formatDate('2026-10-10')).toMatch(/^10 de out/);
  });
});
