/**
 * Geradores dos "tipos de dados" de entrada. Usam um gerador pseudoaleatório
 * com semente, então a mesma semente sempre gera a mesma lista (bom para
 * testes e para a turma ver exatamente o mesmo exemplo).
 */

export type DatasetId = 'aleatorio' | 'quase-ordenado' | 'invertido' | 'poucos-unicos' | 'personalizado';

export const datasets: Array<{ id: DatasetId; label: string; description: string }> = [
  { id: 'aleatorio', label: 'Aleatório', description: 'Valores em ordem qualquer.' },
  { id: 'quase-ordenado', label: 'Quase ordenado', description: 'Só alguns valores fora do lugar.' },
  { id: 'invertido', label: 'Invertido', description: 'Do maior para o menor: o pior caso de vários algoritmos.' },
  { id: 'poucos-unicos', label: 'Poucos valores únicos', description: 'Muitos valores repetidos.' },
  { id: 'personalizado', label: 'Personalizado', description: 'Digite seus próprios números.' },
];

export const MIN_SIZE = 5;
export const MAX_SIZE = 20;
export const MAX_VALUE = 99;

export function isDatasetId(value: string | null): value is DatasetId {
  return datasets.some((dataset) => dataset.id === value);
}

/** Mulberry32: gerador pequeno e determinístico. */
function random(seed: number) {
  let t = seed >>> 0;
  return () => {
    t += 0x6d2b79f5;
    let r = Math.imul(t ^ (t >>> 15), 1 | t);
    r ^= r + Math.imul(r ^ (r >>> 7), 61 | r);
    return ((r ^ (r >>> 14)) >>> 0) / 4294967296;
  };
}

export function generateDataset(id: Exclude<DatasetId, 'personalizado'>, size: number, seed: number): number[] {
  const rand = random(seed);
  const value = () => 5 + Math.floor(rand() * (MAX_VALUE - 4));
  const list = Array.from({ length: size }, value);

  switch (id) {
    case 'aleatorio':
      return list;
    case 'invertido':
      return list.sort((a, b) => b - a);
    case 'quase-ordenado': {
      list.sort((a, b) => a - b);
      const swaps = Math.max(1, Math.floor(size / 6));
      for (let s = 0; s < swaps; s++) {
        const i = Math.floor(rand() * (size - 1));
        [list[i], list[i + 1]] = [list[i + 1] as number, list[i] as number];
      }
      return list;
    }
    case 'poucos-unicos': {
      const options = [20, 45, 70, 95];
      return list.map(() => options[Math.floor(rand() * options.length)] as number);
    }
  }
}

export type ParseResult = { ok: true; values: number[] } | { ok: false; error: string };

/** Lê "5, 3, 8 1" e valida tamanho e intervalo. */
export function parseCustomInput(text: string): ParseResult {
  const parts = text.split(/[\s,;]+/).filter(Boolean);
  const values = parts.map(Number);
  if (values.some((value) => !Number.isInteger(value))) {
    return { ok: false, error: 'Use apenas números inteiros, separados por vírgula.' };
  }
  if (values.length < 2 || values.length > MAX_SIZE) {
    return { ok: false, error: `Digite entre 2 e ${MAX_SIZE} números.` };
  }
  if (values.some((value) => value < 1 || value > MAX_VALUE)) {
    return { ok: false, error: `Os números precisam estar entre 1 e ${MAX_VALUE}.` };
  }
  return { ok: true, values };
}
