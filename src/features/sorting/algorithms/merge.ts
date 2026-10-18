import { createRecorder, type Recorder } from '../recorder';
import type { SortAlgorithm } from '../types';

const code = `def merge_sort(lista, ini, fim):
    if fim - ini <= 1:
        return
    meio = (ini + fim) // 2
    merge_sort(lista, ini, meio)
    merge_sort(lista, meio, fim)
    intercalar(lista, ini, meio, fim)

def intercalar(lista, ini, meio, fim):
    esquerda, direita = lista[ini:meio], lista[meio:fim]
    i = j = 0
    k = ini
    while i < len(esquerda) and j < len(direita):
        if esquerda[i] <= direita[j]:
            lista[k] = esquerda[i]
            i += 1
        else:
            lista[k] = direita[j]
            j += 1
        k += 1
    lista[k:fim] = esquerda[i:] + direita[j:]`;

const show = (values: number[]) => `[${values.join(', ')}]`;

function mergeSort(r: Recorder, ini: number, fim: number) {
  const range: [number, number] = [ini, fim - 1];
  r.step(2, `Trecho de ${ini} a ${fim - 1}: tem mais de um elemento?`, { range, vars: { ini, fim } });
  if (fim - ini <= 1) {
    r.step(3, 'Um elemento só já está ordenado. Volta.', { range, vars: { ini, fim } });
    return;
  }
  const meio = Math.floor((ini + fim) / 2);
  r.step(4, `Divide ao meio na posição ${meio}.`, { range, vars: { ini, meio, fim } });
  r.step(5, 'Ordena a metade esquerda.', { range: [ini, meio - 1], vars: { ini, meio, fim } });
  mergeSort(r, ini, meio);
  r.step(6, 'Ordena a metade direita.', { range: [meio, fim - 1], vars: { ini, meio, fim } });
  mergeSort(r, meio, fim);
  r.step(7, 'Junta as duas metades ordenadas.', { range, vars: { ini, meio, fim } });
  merge(r, ini, meio, fim);
}

function merge(r: Recorder, ini: number, meio: number, fim: number) {
  const a = r.a;
  const range: [number, number] = [ini, fim - 1];
  const esquerda = a.slice(ini, meio);
  const direita = a.slice(meio, fim);
  const base = { esquerda: show(esquerda), direita: show(direita) };
  r.step(10, `Copia as metades: ${show(esquerda)} e ${show(direita)}.`, { range, vars: { ...base, ini, meio, fim } });
  let i = 0;
  let j = 0;
  r.step(11, 'Começa pelo primeiro elemento de cada metade.', { range, vars: { ...base, i, j } });
  let k = ini;
  r.step(12, `Escreve a partir da posição ${k}.`, { range, vars: { ...base, i, j, k } });

  while (i < esquerda.length && j < direita.length) {
    r.step(13, 'As duas metades ainda têm elementos.', { range, vars: { ...base, i, j, k } });
    r.compare();
    const left = esquerda[i] as number;
    const right = direita[j] as number;
    r.step(14, `${left} <= ${right}?`, { range, vars: { ...base, i, j, k } });
    if (left <= right) {
      r.write(k, left);
      r.step(15, `Sim: ${left} vai para a posição ${k}.`, { write: k, range, vars: { ...base, i, j, k } });
      i += 1;
      r.step(16, 'Avança na metade esquerda.', { range, vars: { ...base, i, j, k } });
    } else {
      r.step(17, `Não: o menor está na direita.`, { range, vars: { ...base, i, j, k } });
      r.write(k, right);
      r.step(18, `${right} vai para a posição ${k}.`, { write: k, range, vars: { ...base, i, j, k } });
      j += 1;
      r.step(19, 'Avança na metade direita.', { range, vars: { ...base, i, j, k } });
    }
    k += 1;
    r.step(20, 'Próxima posição da lista.', { range, vars: { ...base, i, j, k } });
  }

  const rest = [...esquerda.slice(i), ...direita.slice(j)];
  rest.forEach((value, offset) => r.write(k + offset, value));
  if (ini === 0 && fim === a.length) r.markAllSorted();
  r.step(21, rest.length ? `Copia o que sobrou: ${show(rest)}.` : 'Não sobrou nada para copiar.', {
    range,
    vars: { ...base, i, j, k },
  });
}

export const mergeSortAlgorithm: SortAlgorithm = {
  id: 'merge',
  name: 'Merge Sort',
  summary: 'Divide a lista ao meio, ordena cada metade e intercala.',
  idea: 'Dividir e conquistar: quebra a lista até sobrarem pedaços de um elemento (que já estão ordenados) e depois junta os pedaços, sempre escolhendo o menor dos dois primeiros.',
  complexity: { best: 'O(n log n)', average: 'O(n log n)', worst: 'O(n log n)', space: 'O(n)' },
  stable: true,
  code,
  movesLabel: 'Escritas',
  run(input) {
    const r = createRecorder(input);
    mergeSort(r, 0, r.a.length);
    r.markAllSorted();
    r.step(1, 'Lista ordenada!', { vars: {} });
    return r.steps;
  },
};
