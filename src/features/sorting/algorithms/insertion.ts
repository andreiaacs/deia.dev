import { createRecorder } from '../recorder';
import type { SortAlgorithm } from '../types';

const code = `def insertion_sort(lista):
    for i in range(1, len(lista)):
        chave = lista[i]
        j = i - 1
        while j >= 0 and lista[j] > chave:
            lista[j + 1] = lista[j]
            j -= 1
        lista[j + 1] = chave
    return lista`;

export const insertionSort: SortAlgorithm = {
  id: 'insertion',
  name: 'Insertion Sort',
  summary: 'Insere cada valor no lugar certo da parte já ordenada.',
  idea: 'Como organizar cartas na mão: pega o próximo valor (a chave), desloca para a direita os maiores que ela e encaixa a chave no espaço que sobrou. Muito rápido em listas quase ordenadas.',
  complexity: { best: 'O(n)', average: 'O(n²)', worst: 'O(n²)', space: 'O(1)' },
  stable: true,
  code,
  movesLabel: 'Escritas',
  run(input) {
    const r = createRecorder(input);
    const a = r.a;
    const n = a.length;

    for (let i = 1; i < n; i++) {
      r.step(2, `A parte ordenada vai da posição 0 até ${i - 1}.`, { range: [0, i], vars: { i } });
      const chave = a[i] as number;
      r.step(3, `A chave é ${chave}.`, { marker: i, range: [0, i], vars: { i, chave } });
      let j = i - 1;
      r.step(4, `Começa comparando com a posição ${j}.`, { marker: i, range: [0, i], vars: { i, chave, j } });

      while (true) {
        if (j < 0) {
          r.step(5, 'j < 0: chegamos ao início da lista.', { range: [0, i], vars: { i, chave, j } });
          break;
        }
        r.compare();
        const bigger = (a[j] as number) > chave;
        r.step(5, `${a[j]} > ${chave}? ${bigger ? 'Sim' : 'Não, para aqui'}.`, {
          compare: [j],
          range: [0, i],
          vars: { i, chave, j },
        });
        if (!bigger) break;
        r.write(j + 1, a[j] as number);
        r.step(6, `Desloca ${a[j]} uma posição para a direita.`, {
          write: j + 1,
          range: [0, i],
          vars: { i, chave, j },
        });
        j -= 1;
        r.step(7, 'Anda uma posição para a esquerda.', { range: [0, i], vars: { i, chave, j } });
      }

      r.write(j + 1, chave);
      r.step(8, `Encaixa a chave ${chave} na posição ${j + 1}.`, {
        write: j + 1,
        range: [0, i],
        vars: { i, chave, j },
      });
    }

    r.markAllSorted();
    r.step(9, 'Lista ordenada!', { vars: {} });
    return r.steps;
  },
};
