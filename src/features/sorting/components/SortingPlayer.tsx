import type { KeyboardEvent } from 'react';
import { Icon } from '@/components/ui/Icon';
import type { SortAlgorithm, SortStep } from '../types';
import { SPEEDS, useStepPlayer, type Speed } from '../useStepPlayer';
import { Bars, Legend } from './Bars';
import { CodeTrace } from './CodeTrace';
import styles from './SortingPlayer.module.css';

interface SortingPlayerProps {
  algorithm: SortAlgorithm;
  steps: SortStep[];
}

/**
 * Executa os passos de um algoritmo: barras à esquerda, código Python
 * com a linha atual à direita. Atalhos: espaço toca/pausa, setas avançam
 * e voltam um passo.
 */
export function SortingPlayer({ algorithm, steps }: SortingPlayerProps) {
  const player = useStepPlayer(steps.length);
  const step = steps[player.index] ?? steps[0];
  if (!step) return null;

  const onKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.target instanceof HTMLInputElement || event.target instanceof HTMLSelectElement) return;
    const actions: Record<string, () => void> = {
      ' ': player.toggle,
      ArrowRight: player.next,
      ArrowLeft: player.previous,
      Home: player.first,
      End: player.end,
    };
    const action = actions[event.key];
    if (!action) return;
    event.preventDefault();
    action();
  };

  const vars = Object.entries(step.vars);

  return (
    <div
      className={styles.player}
      role="group"
      aria-label={`Visualização do ${algorithm.name}. Espaço toca ou pausa; setas avançam e voltam.`}
      tabIndex={0}
      onKeyDown={onKeyDown}
    >
      <div className={styles.stage}>
        <div className={styles.stageHeader}>
          <h3 className={styles.stageTitle}>{algorithm.name}</h3>
          <dl className={styles.counters}>
            <div>
              <dt>Comparações</dt>
              <dd>{step.comparisons}</dd>
            </div>
            <div>
              <dt>{algorithm.movesLabel}</dt>
              <dd>{step.moves}</dd>
            </div>
          </dl>
        </div>

        <Bars step={step} />

        <p className={styles.message} aria-live="polite">
          <span className={styles.stepCount}>
            {player.index + 1}/{steps.length}
          </span>
          {step.message}
        </p>

        <div className={styles.controls}>
          <div className={styles.buttons}>
            <button type="button" onClick={player.first} aria-label="Voltar ao início" disabled={player.index === 0}>
              <Icon name="skipBack" size={18} />
            </button>
            <button type="button" onClick={player.previous} aria-label="Passo anterior" disabled={player.index === 0}>
              <Icon name="stepBack" size={20} />
            </button>
            <button
              type="button"
              className={styles.play}
              onClick={player.toggle}
              aria-label={player.playing ? 'Pausar' : 'Executar'}
            >
              <Icon name={player.playing ? 'pause' : 'play'} size={20} />
            </button>
            <button
              type="button"
              onClick={player.next}
              aria-label="Próximo passo"
              disabled={player.index === player.last}
            >
              <Icon name="stepForward" size={20} />
            </button>
            <button type="button" onClick={player.end} aria-label="Ir para o fim" disabled={player.index === player.last}>
              <Icon name="skipForward" size={18} />
            </button>
          </div>

          <input
            className={styles.scrubber}
            type="range"
            min={0}
            max={player.last}
            value={player.index}
            onChange={(event) => player.goTo(Number(event.target.value))}
            aria-label="Passo da execução"
          />

          <label className={styles.speed}>
            <span>Velocidade</span>
            <select
              value={player.speed}
              onChange={(event) => player.setSpeed(Number(event.target.value) as Speed)}
            >
              {SPEEDS.map((speed) => (
                <option key={speed} value={speed}>
                  {speed}x
                </option>
              ))}
            </select>
          </label>
        </div>

        <Legend />
      </div>

      <div className={styles.side}>
        <CodeTrace code={algorithm.code} activeLine={step.line} title={`${algorithm.id}_sort.py`} />
        <section className={styles.vars} aria-label="Variáveis">
          <h4>Variáveis</h4>
          {vars.length ? (
            <ul>
              {vars.map(([name, value]) => (
                <li key={name}>
                  <code>
                    {name} = <strong>{value}</strong>
                  </code>
                </li>
              ))}
            </ul>
          ) : (
            <p>Nenhuma variável local neste passo.</p>
          )}
        </section>
      </div>
    </div>
  );
}
