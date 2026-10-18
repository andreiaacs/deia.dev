import { useId, useMemo, useState, type FormEvent } from 'react';
import { useSearchParams } from 'react-router';
import { Icon } from '@/components/ui/Icon';
import { cx } from '@/lib/cx';
import { algorithms, getAlgorithm, isAlgorithmId } from '../algorithms';
import {
  datasets,
  generateDataset,
  isDatasetId,
  MAX_SIZE,
  MAX_VALUE,
  MIN_SIZE,
  parseCustomInput,
  type DatasetId,
} from '../datasets';
import type { AlgorithmId } from '../types';
import { SortingPlayer } from './SortingPlayer';
import styles from './SortingLab.module.css';

const DEFAULT_CUSTOM = '38, 27, 43, 3, 9, 82, 10';

/**
 * Página interativa de ordenação. Algoritmo e tipo de dados ficam na URL
 * (?algoritmo=quick&dados=invertido), então o link pode ser compartilhado
 * com a turma já no exemplo certo.
 */
export function SortingLab() {
  const [params, setParams] = useSearchParams();
  const algorithmParam = params.get('algoritmo');
  const datasetParam = params.get('dados');
  const algorithmId: AlgorithmId = isAlgorithmId(algorithmParam) ? algorithmParam : 'bubble';
  const datasetId: DatasetId = isDatasetId(datasetParam) ? datasetParam : 'aleatorio';
  const algorithm = getAlgorithm(algorithmId);

  const [size, setSize] = useState(10);
  const [seed, setSeed] = useState(7);
  const [customText, setCustomText] = useState(DEFAULT_CUSTOM);
  const [customValues, setCustomValues] = useState<number[]>(() => {
    const parsed = parseCustomInput(DEFAULT_CUSTOM);
    return parsed.ok ? parsed.values : [];
  });
  const [customError, setCustomError] = useState<string>();

  const sizeId = useId();
  const datasetSelectId = useId();
  const customId = useId();

  const input = useMemo(
    () => (datasetId === 'personalizado' ? customValues : generateDataset(datasetId, size, seed)),
    [datasetId, customValues, size, seed],
  );
  const steps = useMemo(() => algorithm.run(input), [algorithm, input]);

  const updateParam = (key: string, value: string) => {
    const next = new URLSearchParams(params);
    next.set(key, value);
    setParams(next, { replace: true });
  };

  const applyCustom = (event: FormEvent) => {
    event.preventDefault();
    const parsed = parseCustomInput(customText);
    if (parsed.ok) {
      setCustomValues(parsed.values);
      setCustomError(undefined);
    } else {
      setCustomError(parsed.error);
    }
  };

  const dataset = datasets.find((item) => item.id === datasetId);

  return (
    <div className={styles.lab}>
      <section className={styles.toolbar} aria-label="Escolha o algoritmo e os dados">
        <div className={styles.field}>
          <span className={styles.label} id="algoritmo-label">
            Algoritmo
          </span>
          <div className={styles.pills} role="group" aria-labelledby="algoritmo-label">
            {algorithms.map((item) => (
              <button
                key={item.id}
                type="button"
                aria-pressed={item.id === algorithmId}
                className={cx(styles.pill, item.id === algorithmId && styles.pillActive)}
                onClick={() => updateParam('algoritmo', item.id)}
              >
                {item.name}
              </button>
            ))}
          </div>
        </div>

        <div className={styles.row}>
          <div className={styles.field}>
            <label className={styles.label} htmlFor={datasetSelectId}>
              Tipo de dados
            </label>
            <div className={styles.selectWrap}>
              <select
                id={datasetSelectId}
                value={datasetId}
                onChange={(event) => updateParam('dados', event.target.value)}
              >
                {datasets.map((item) => (
                  <option key={item.id} value={item.id}>
                    {item.label}
                  </option>
                ))}
              </select>
              <Icon name="chevronDown" size={16} />
            </div>
          </div>

          {datasetId === 'personalizado' ? (
            <form className={styles.customForm} onSubmit={applyCustom}>
              <label className={styles.label} htmlFor={customId}>
                Seus números (1 a {MAX_VALUE}, separados por vírgula)
              </label>
              <div className={styles.customRow}>
                <input
                  id={customId}
                  type="text"
                  inputMode="numeric"
                  value={customText}
                  onChange={(event) => setCustomText(event.target.value)}
                  aria-invalid={customError ? true : undefined}
                  aria-describedby={customError ? `${customId}-erro` : undefined}
                />
                <button type="submit" className={styles.actionButton}>
                  Usar
                </button>
              </div>
              {customError && (
                <p id={`${customId}-erro`} className={styles.error} role="alert">
                  {customError}
                </p>
              )}
            </form>
          ) : (
            <>
              <div className={styles.field}>
                <label className={styles.label} htmlFor={sizeId}>
                  Tamanho: <strong>{size}</strong>
                </label>
                <input
                  id={sizeId}
                  className={styles.range}
                  type="range"
                  min={MIN_SIZE}
                  max={MAX_SIZE}
                  value={size}
                  onChange={(event) => setSize(Number(event.target.value))}
                />
              </div>
              <button
                type="button"
                className={styles.actionButton}
                onClick={() => setSeed((value) => value + 1)}
              >
                <Icon name="shuffle" size={16} />
                Novos dados
              </button>
            </>
          )}
        </div>
        {dataset && <p className={styles.hint}>{dataset.description}</p>}
      </section>

      <SortingPlayer key={`${algorithmId}-${input.join(',')}`} algorithm={algorithm} steps={steps} />

      <div className={styles.info}>
        <section className={styles.about} aria-labelledby="sobre-algoritmo">
          <h3 id="sobre-algoritmo">Como o {algorithm.name} funciona</h3>
          <p className={styles.summary}>{algorithm.summary}</p>
          <p>{algorithm.idea}</p>
        </section>

        <section className={styles.compare} aria-labelledby="comparacao">
          <h3 id="comparacao">Comparação entre os algoritmos</h3>
          <div className={styles.tableWrap}>
            <table>
              <thead>
                <tr>
                  <th scope="col">Algoritmo</th>
                  <th scope="col">Melhor</th>
                  <th scope="col">Médio</th>
                  <th scope="col">Pior</th>
                  <th scope="col">Memória</th>
                  <th scope="col">Estável</th>
                </tr>
              </thead>
              <tbody>
                {algorithms.map((item) => (
                  <tr key={item.id} className={cx(item.id === algorithmId && styles.currentRow)}>
                    <th scope="row">
                      <button type="button" onClick={() => updateParam('algoritmo', item.id)}>
                        {item.name}
                      </button>
                    </th>
                    <td>{item.complexity.best}</td>
                    <td>{item.complexity.average}</td>
                    <td>{item.complexity.worst}</td>
                    <td>{item.complexity.space}</td>
                    <td>{item.stable ? 'Sim' : 'Não'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className={styles.hint}>
            Dica: compare os contadores de um mesmo algoritmo com dados aleatórios, quase ordenados e
            invertidos.
          </p>
        </section>
      </div>
    </div>
  );
}
