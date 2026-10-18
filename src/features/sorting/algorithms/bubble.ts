import { createRecorder } from '../recorder';
import type { SortAlgorithm } from '../types';

const code = `def bubble_sort(lista):
    n = len(lista)
    for i in range(n - 1):
        trocou = False
        for j in range(n - 1 - i):
            if lista[j] > lista[j + 1]:
                lista[j], lista[j + 1] = lista[j + 1], lista[j]
                trocou = True
        if not trocou:
            break
    return lista`;

const bool = (value: boolean) => (value ? 'True' : 'False');

export const bubbleSort: SortAlgorithm = {
  id: 'bubble',
  name: 'Bubble Sort',
  summary: 'Compara vizinhos e troca quando estão fora de ordem.',
  idea: 'A cada passada, o maior valor ainda fora do lugar "borbulha" até o fim da lista. Se uma passada inteira acontece sem trocas, a lista já está ordenada.',
  complexity: { best: 'O(n)', average: 'O(n²)', worst: 'O(n²)', space: 'O(1)' },
  stable: true,
  code,
  movesLabel: 'Trocas',
  run(input) {
    const r = createRecorder(input);
    const a = r.a;
    const n = a.length;

    r.step(2, `A lista tem ${n} elementos.`, { vars: { n } });

    for (let i = 0; i < n - 1; i++) {
      r.step(3, `Passada ${i + 1}: o maior valor restante vai até o fim.`, { vars: { n, i } });
      let trocou = false;
      r.step(4, 'Nenhuma troca nesta passada até agora.', { vars: { n, i, trocou: bool(trocou) } });

      for (let j = 0; j < n - 1 - i; j++) {
        const vars = () => ({ n, i, j, trocou: bool(trocou) });
        r.step(5, `Próximo par: posições ${j} e ${j + 1}.`, { vars: vars() });
        r.compare();
        r.step(6, `${a[j]} > ${a[j + 1]}?`, { compare: [j, j + 1], vars: vars() });
        if ((a[j] as number) > (a[j + 1] as number)) {
          r.swap(j, j + 1);
          r.step(7, `Sim! Troca ${a[j + 1]} com ${a[j]}.`, { swap: [j, j + 1], vars: vars() });
          trocou = true;
          r.step(8, 'Marca que houve troca nesta passada.', { vars: vars() });
        }
      }

      r.markSorted(n - 1 - i);
      r.step(9, `${a[n - 1 - i]} chegou à posição final. Houve troca?`, {
        vars: { n, i, trocou: bool(trocou) },
      });
      if (!trocou) {
        r.step(10, 'Nenhuma troca na passada inteira: a lista já está ordenada!', {
          vars: { n, i, trocou: bool(trocou) },
        });
        break;
      }
    }

    r.markAllSorted();
    r.step(11, 'Lista ordenada!', { vars: { n } });
    return r.steps;
  },
};
