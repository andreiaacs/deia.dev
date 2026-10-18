import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';
import { bubbleSort } from '../algorithms/bubble';
import { SortingPlayer } from './SortingPlayer';

describe('SortingPlayer', () => {
  const steps = bubbleSort.run([3, 1, 2]);

  it('começa no primeiro passo, na linha 2 do código', () => {
    render(<SortingPlayer algorithm={bubbleSort} steps={steps} />);
    expect(screen.getByText(`1/${steps.length}`)).toBeInTheDocument();
    expect(document.querySelector('[aria-current="step"]')).toHaveTextContent('n = len(lista)');
  });

  it('avança e volta com os botões e com o teclado', async () => {
    const user = userEvent.setup();
    render(<SortingPlayer algorithm={bubbleSort} steps={steps} />);

    await user.click(screen.getByRole('button', { name: 'Próximo passo' }));
    expect(screen.getByText(`2/${steps.length}`)).toBeInTheDocument();

    screen.getByRole('group', { name: /Visualização do Bubble Sort/ }).focus();
    await user.keyboard('{End}');
    expect(screen.getByText('Lista ordenada!')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Próximo passo' })).toBeDisabled();

    await user.keyboard('{Home}');
    expect(screen.getByText(`1/${steps.length}`)).toBeInTheDocument();
  });
});
