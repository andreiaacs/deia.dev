/**
 * Modelo do visualizador de ordenação.
 *
 * Cada algoritmo é uma função pura que recebe a lista de entrada e devolve
 * a sequência completa de passos. Cada passo é uma "foto" do estado no
 * momento em que uma linha do código Python é executada. A interface só
 * navega por essa lista, o que deixa o avanço, o retrocesso e os testes
 * triviais.
 */

export type AlgorithmId = 'bubble' | 'selection' | 'insertion' | 'merge' | 'quick';

export interface SortStep {
  /** Estado da lista neste passo. */
  array: number[];
  /** Linha do código Python em execução (começa em 1). */
  line: number;
  /** Explicação do passo em português. */
  message: string;
  /** Índices sendo comparados. */
  compare?: number[];
  /** Índices que acabaram de trocar de lugar. */
  swap?: number[];
  /** Índice que acabou de receber um valor (merge e insertion). */
  write?: number;
  /** Índice do pivô (quick sort) ou do menor (selection sort). */
  marker?: number;
  /** Índices já na posição final. */
  sorted: number[];
  /** Trecho ativo da lista [início, fim] inclusive (algoritmos recursivos). */
  range?: [number, number];
  /** Variáveis locais exibidas ao lado do código. */
  vars: Record<string, string | number>;
  comparisons: number;
  /** Trocas ou escritas na lista. */
  moves: number;
}

export interface SortAlgorithm {
  id: AlgorithmId;
  name: string;
  /** Uma frase para o cartão de explicação. */
  summary: string;
  idea: string;
  complexity: { best: string; average: string; worst: string; space: string };
  stable: boolean;
  /** Código Python exibido; as linhas batem com `SortStep.line`. */
  code: string;
  /** Nome do contador de movimentos ("trocas" ou "escritas"). */
  movesLabel: string;
  run: (input: readonly number[]) => SortStep[];
}
