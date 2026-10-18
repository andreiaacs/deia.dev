import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';
import { Tabs } from './Tabs';

const items = [
  { id: 'a', label: 'Conteúdo', content: <p>Painel A</p> },
  { id: 'b', label: 'Exemplos', content: <p>Painel B</p> },
  { id: 'c', label: 'Materiais', content: <p>Painel C</p> },
];

describe('Tabs', () => {
  it('mostra o painel da aba clicada', async () => {
    const user = userEvent.setup();
    render(<Tabs label="Seções" items={items} />);

    expect(screen.getByText('Painel A')).toBeVisible();
    await user.click(screen.getByRole('tab', { name: 'Exemplos' }));
    expect(screen.getByText('Painel B')).toBeVisible();
    expect(screen.getByRole('tab', { name: 'Exemplos' })).toHaveAttribute('aria-selected', 'true');
  });

  it('navega com as setas do teclado', async () => {
    const user = userEvent.setup();
    render(<Tabs label="Seções" items={items} />);

    await user.click(screen.getByRole('tab', { name: 'Conteúdo' }));
    await user.keyboard('{ArrowLeft}');
    expect(screen.getByRole('tab', { name: 'Materiais' })).toHaveFocus();
    await user.keyboard('{Home}');
    expect(screen.getByRole('tab', { name: 'Conteúdo' })).toHaveFocus();
  });
});
