import { describe, expect, it } from 'vitest';
import { algorithms } from './algorithms';
import { datasets, generateDataset, parseCustomInput } from './datasets';

const generated = datasets.filter((dataset) => dataset.id !== 'personalizado');

describe('algoritmos de ordenação', () => {
  for (const algorithm of algorithms) {
    describe(algorithm.name, () => {
      it('termina com a lista ordenada para todos os tipos de dados', () => {
        for (const dataset of generated) {
          for (let seed = 1; seed <= 25; seed++) {
            for (const size of [5, 8, 13, 20]) {
              if (dataset.id === 'personalizado') continue;
              const input = generateDataset(dataset.id, size, seed);
              const steps = algorithm.run(input);
              const last = steps[steps.length - 1]!;
              const expected = [...input].sort((a, b) => a - b);
              expect(last.array, `${dataset.id} seed ${seed}`).toEqual(expected);
              expect(last.sorted).toHaveLength(size);
            }
          }
        }
      });

      it('não altera a lista de entrada', () => {
        const input = [5, 3, 9, 1, 7];
        algorithm.run(input);
        expect(input).toEqual([5, 3, 9, 1, 7]);
      });

      it('só aponta para linhas que existem no código Python', () => {
        const lines = algorithm.code.split('\n').length;
        const steps = algorithm.run([9, 4, 7, 1, 8, 2]);
        for (const step of steps) {
          expect(step.line).toBeGreaterThan(0);
          expect(step.line <= lines).toBe(true);
        }
      });

      it('mantém os contadores sempre crescentes', () => {
        const steps = algorithm.run([6, 2, 9, 1, 5, 3, 8]);
        for (let index = 1; index < steps.length; index++) {
          expect(steps[index]!.comparisons >= steps[index - 1]!.comparisons).toBe(true);
          expect(steps[index]!.moves >= steps[index - 1]!.moves).toBe(true);
        }
      });

      it('lida com valores repetidos e com dois elementos', () => {
        expect(algorithm.run([4, 4, 1, 4]).at(-1)!.array).toEqual([1, 4, 4, 4]);
        expect(algorithm.run([2, 1]).at(-1)!.array).toEqual([1, 2]);
      });
    });
  }

  it('Bubble Sort para cedo em lista já ordenada', () => {
    const bubble = algorithms.find((algorithm) => algorithm.id === 'bubble')!;
    const last = bubble.run([1, 2, 3, 4, 5]).at(-1)!;
    expect(last.comparisons).toBe(4);
    expect(last.moves).toBe(0);
  });
});

describe('conjuntos de dados', () => {
  it('são determinísticos para a mesma semente', () => {
    expect(generateDataset('aleatorio', 10, 42)).toEqual(generateDataset('aleatorio', 10, 42));
  });

  it('respeitam o tipo pedido', () => {
    const reversed = generateDataset('invertido', 10, 7);
    expect(reversed).toEqual([...reversed].sort((a, b) => b - a));
    expect(new Set(generateDataset('poucos-unicos', 20, 3)).size <= 4).toBe(true);
  });

  it('valida a entrada personalizada', () => {
    expect(parseCustomInput('5, 3 8;1')).toEqual({ ok: true, values: [5, 3, 8, 1] });
    expect(parseCustomInput('5').ok).toBe(false);
    expect(parseCustomInput('5, abc').ok).toBe(false);
    expect(parseCustomInput('5, 300').ok).toBe(false);
  });
});
