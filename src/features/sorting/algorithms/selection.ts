import { createRecorder } from '../recorder';
import type { SortAlgorithm } from '../types';

const code = `def selection_sort(lista):
    n = len(lista)
    for i in range(n - 1):
        menor = i
        for j in range(i + 1, n):
            if lista[j] < lista[menor]:
                menor = j
        if menor != i:
            lista[i], lista[menor] = lista[menor], lista[i]
    return lista`;

export const selectionSort: SortAlgorithm = {
  id: 'selection',
  name: 'Selection Sort',
  summary: 'Procura o menor valor e o coloca na próxima posição.',
  idea: 'Para cada posição, percorre o resto da lista em busca do menor valor e troca os dois. Faz poucas trocas, mas sempre o mesmo número de comparações.',
  complexity: { best: 'O(n²)', average: 'O(n²)', worst: 'O(n²)', space: 'O(1)' },
  stable: false,
  code,
  movesLabel: 'Trocas',
  run(input) {
    const r = createRecorder(input);
    const a = r.a;
    const n = a.length;

    r.step(2, `A lista tem ${n} elementos.`, { vars: { n } });

    for (let i = 0; i < n - 1; i++) {
      r.step(3, `Vamos encontrar o valor certo para a posição ${i}.`, { vars: { n, i } });
      let menor = i;
      r.step(4, `Por enquanto, o menor é ${a[menor]} (posição ${menor}).`, {
        marker: menor,
        vars: { n, i, menor },
      });

      for (let j = i + 1; j < n; j++) {
        r.step(5, `Olha a posição ${j}.`, { marker: menor, vars: { n, i, menor, j } });
        r.compare();
        r.step(6, `${a[j]} < ${a[menor]}?`, { compare: [j, menor], marker: menor, vars: { n, i, menor, j } });
        if ((a[j] as number) < (a[menor] as number)) {
          menor = j;
          r.step(7, `Sim! Novo menor: ${a[menor]} (posição ${menor}).`, {
            marker: menor,
            vars: { n, i, menor, j },
          });
        }
      }

      r.step(8, `O menor valor do trecho é ${a[menor]}. Precisa trocar?`, {
        marker: menor,
        vars: { n, i, menor },
      });
      if (menor !== i) {
        r.swap(i, menor);
        r.markSorted(i);
        r.step(9, `Troca: ${a[i]} vai para a posição ${i}.`, { swap: [i, menor], vars: { n, i, menor } });
      } else {
        r.markSorted(i);
      }
    }

    r.markAllSorted();
    r.step(10, 'Lista ordenada!', { vars: { n } });
    return r.steps;
  },
};
