import { useCallback, useEffect, useState } from 'react';

export const SPEEDS = [0.5, 1, 2, 4, 8] as const;
export type Speed = (typeof SPEEDS)[number];

/** Tempo entre passos na velocidade 1x. */
const BASE_DELAY_MS = 700;

/**
 * Controla a reprodução de uma lista de passos: tocar, pausar, avançar,
 * voltar e pular para qualquer passo. Para recomeçar do zero quando a
 * lista muda, renderize o componente com uma `key` diferente.
 */
export function useStepPlayer(total: number) {
  const last = Math.max(0, total - 1);
  const [index, setIndex] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [speed, setSpeed] = useState<Speed>(1);

  useEffect(() => {
    if (!playing) return;
    if (index >= last) {
      setPlaying(false);
      return;
    }
    const timer = window.setTimeout(
      () => setIndex((current) => Math.min(current + 1, last)),
      BASE_DELAY_MS / speed,
    );
    return () => window.clearTimeout(timer);
  }, [playing, index, last, speed]);

  const goTo = useCallback(
    (target: number) => {
      setPlaying(false);
      setIndex(Math.min(Math.max(target, 0), last));
    },
    [last],
  );

  const toggle = useCallback(() => {
    if (playing) {
      setPlaying(false);
      return;
    }
    // No fim, "tocar" recomeça do início.
    if (index >= last) setIndex(0);
    setPlaying(true);
  }, [playing, index, last]);

  return {
    index,
    last,
    playing,
    speed,
    setSpeed,
    toggle,
    goTo,
    next: () => goTo(index + 1),
    previous: () => goTo(index - 1),
    first: () => goTo(0),
    end: () => goTo(last),
  };
}
