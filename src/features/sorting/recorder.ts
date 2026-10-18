import type { SortStep } from './types';

type StepExtras = Partial<Pick<SortStep, 'compare' | 'swap' | 'write' | 'marker' | 'range'>> & {
  vars?: SortStep['vars'];
};

/**
 * Ajudante usado pelos algoritmos: guarda a lista sendo ordenada,
 * os contadores e o conjunto de posições finais, e tira uma "foto"
 * a cada chamada de `step`.
 */
export function createRecorder(input: readonly number[]) {
  const a = [...input];
  const steps: SortStep[] = [];
  const sorted = new Set<number>();
  let comparisons = 0;
  let moves = 0;

  return {
    a,
    step(line: number, message: string, extras: StepExtras = {}) {
      steps.push({
        array: [...a],
        line,
        message,
        sorted: [...sorted].sort((x, y) => x - y),
        vars: extras.vars ?? {},
        comparisons,
        moves,
        ...(extras.compare && { compare: extras.compare }),
        ...(extras.swap && { swap: extras.swap }),
        ...(extras.write !== undefined && { write: extras.write }),
        ...(extras.marker !== undefined && { marker: extras.marker }),
        ...(extras.range && { range: extras.range }),
      });
    },
    compare() {
      comparisons += 1;
    },
    swap(i: number, j: number) {
      [a[i], a[j]] = [a[j] as number, a[i] as number];
      moves += 1;
    },
    write(i: number, value: number) {
      a[i] = value;
      moves += 1;
    },
    markSorted(...indices: number[]) {
      indices.forEach((index) => sorted.add(index));
    },
    markAllSorted() {
      a.forEach((_, index) => sorted.add(index));
    },
    get steps() {
      return steps;
    },
  };
}

export type Recorder = ReturnType<typeof createRecorder>;
