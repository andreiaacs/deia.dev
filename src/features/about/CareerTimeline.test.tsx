import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { career } from '@/content/profile';
import { CareerTimeline } from './CareerTimeline';

describe('CareerTimeline', () => {
  it('mostra toda a trajetória em ordem', () => {
    render(<CareerTimeline />);
    const titles = screen.getAllByRole('heading', { level: 3 }).map((heading) => heading.textContent);
    expect(titles).toEqual(career.map((item) => item.title));
  });
});
