import type { AlgorithmId, SortAlgorithm } from '../types';
import { bubbleSort } from './bubble';
import { insertionSort } from './insertion';
import { mergeSortAlgorithm } from './merge';
import { quickSortAlgorithm } from './quick';
import { selectionSort } from './selection';

/** Algoritmos na ordem em que aparecem no filtro. */
export const algorithms: SortAlgorithm[] = [
  bubbleSort,
  selectionSort,
  insertionSort,
  mergeSortAlgorithm,
  quickSortAlgorithm,
];

export const algorithmIds = algorithms.map((algorithm) => algorithm.id);

export function getAlgorithm(id: AlgorithmId): SortAlgorithm {
  return algorithms.find((algorithm) => algorithm.id === id) ?? bubbleSort;
}

export function isAlgorithmId(value: string | null): value is AlgorithmId {
  return algorithmIds.includes(value as AlgorithmId);
}
