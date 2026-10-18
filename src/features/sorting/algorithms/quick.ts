import { createRecorder, type Recorder } from '../recorder';
import type { SortAlgorithm } from '../types';

const code = `def quick_sort(lista, ini, fim):
    if ini < fim:
        p = particionar(lista, ini, fim)
        quick_sort(lista, ini, p - 1)
        quick_sort(lista, p + 1, fim)

def particionar(lista, ini, fim):
    pivo = lista[fim]
    i = ini - 1
    for j in range(ini, fim):
        if lista[j] <= pivo:
            i += 1
            lista[i], lista[j] = lista[j], lista[i]
    lista[i + 1], lista[fim] = lista[fim], lista[i + 1]
    return i + 1`;

function quickSort(r: Recorder, ini: number, fim: number) {
  if (ini > fim) return;
  const range: [number, number] = [ini, fim];
  r.step(2, `Trecho de ${ini} a ${fim}: tem mais de um elemento?`, { range, vars: { ini, fim } });
  if (ini === fim) {
    r.markSorted(ini);
    return;
  }
  r.step(3, 'Particiona o trecho em volta de um pivô.', { range, vars: { ini, fim } });
  const p = partition(r, ini, fim);
  r.step(4, 'Ordena os menores que o pivô (à esquerda).', { range: [ini, Math.max(ini, p - 1)], vars: { ini, fim, p } });
  quickSort(r, ini, p - 1);
  r.step(5, 'Ordena os maiores que o pivô (à direita).', { range: [Math.min(p + 1, fim), fim], vars: { ini, fim, p } });
  quickSort(r, p + 1, fim);
}

function partition(r: Recorder, ini: number, fim: number) {
  const a = r.a;
  const range: [number, number] = [ini, fim];
  const pivo = a[fim] as number;
  r.step(8, `O pivô é o último elemento: ${pivo}.`, { marker: fim, range, vars: { ini, fim, pivo } });
  let i = ini - 1;
  r.step(9, 'i marca o fim da região dos menores ou iguais ao pivô.', { marker: fim, range, vars: { ini, fim, pivo, i } });

  for (let j = ini; j < fim; j++) {
    r.step(10, `Olha a posição ${j}.`, { marker: fim, range, vars: { pivo, i, j } });
    r.compare();
    const smaller = (a[j] as number) <= pivo;
    r.step(11, `${a[j]} <= ${pivo}? ${smaller ? 'Sim' : 'Não'}.`, {
      compare: [j, fim],
      marker: fim,
      range,
      vars: { pivo, i, j },
    });
    if (smaller) {
      i += 1;
      r.step(12, 'A região dos menores cresce uma posição.', { marker: fim, range, vars: { pivo, i, j } });
      if (i !== j) {
        r.swap(i, j);
        r.step(13, `Troca ${a[j]} com ${a[i]}.`, { swap: [i, j], marker: fim, range, vars: { pivo, i, j } });
      } else {
        r.step(13, 'i e j são a mesma posição: o valor fica onde está.', { marker: fim, range, vars: { pivo, i, j } });
      }
    }
  }

  if (i + 1 !== fim) r.swap(i + 1, fim);
  r.markSorted(i + 1);
  r.step(14, `Coloca o pivô ${pivo} na posição final ${i + 1}.`, {
    swap: [i + 1, fim],
    marker: i + 1,
    range,
    vars: { pivo, i },
  });
  r.step(15, `Devolve a posição do pivô: ${i + 1}.`, { marker: i + 1, range, vars: { pivo, i } });
  return i + 1;
}

export const quickSortAlgorithm: SortAlgorithm = {
  id: 'quick',
  name: 'Quick Sort',
  summary: 'Escolhe um pivô e separa menores de um lado e maiores do outro.',
  idea: 'Cada partição deixa o pivô na posição definitiva, com os menores à esquerda e os maiores à direita. Depois repete o processo em cada lado. Esta versão usa o último elemento como pivô (partição de Lomuto).',
  complexity: { best: 'O(n log n)', average: 'O(n log n)', worst: 'O(n²)', space: 'O(log n)' },
  stable: false,
  code,
  movesLabel: 'Trocas',
  run(input) {
    const r = createRecorder(input);
    quickSort(r, 0, r.a.length - 1);
    r.markAllSorted();
    r.step(1, 'Lista ordenada!', { vars: {} });
    return r.steps;
  },
};
