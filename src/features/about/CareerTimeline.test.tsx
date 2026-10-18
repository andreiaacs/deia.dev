import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';
import { career } from '@/content/profile';
import { CareerTimeline } from './CareerTimeline';

describe('CareerTimeline', () => {
  it('mostra toda a trajetória na visão geral', () => {
    render(<CareerTimeline />);
    const list = screen.getByRole('list', { name: '' });
    expect(within(list).getAllByRole('article')).toHaveLength(career.length);
  });

  it('filtra por formação', async () => {
    const user = userEvent.setup();
    render(<CareerTimeline />);

    await user.click(screen.getByRole('button', { name: 'Formação' }));

    expect(screen.getByRole('button', { name: 'Formação' })).toHaveAttribute('aria-pressed', 'true');
    expect(screen.getByRole('heading', { name: 'Graduação' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Mestrado' })).toBeInTheDocument();
    expect(screen.queryByRole('heading', { name: 'Tech Lead' })).not.toBeInTheDocument();
  });
});
