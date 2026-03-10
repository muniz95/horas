import { screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { AppRouter } from '@/app/router/app-router';
import { renderWithProviders } from '@/shared/lib/testing/render-with-providers';

describe('AppRouter integration', () => {
  it('renders appointments page on root route', () => {
    renderWithProviders(<AppRouter />, { route: '/' });

    expect(screen.getByRole('heading', { name: 'Appointments' })).toBeInTheDocument();
    expect(screen.getByText('Nenhum apontamento encontrado.')).toBeInTheDocument();
  });

  it('renders profile page on dynamic profile route', () => {
    renderWithProviders(<AppRouter />, { route: '/profile/alex' });

    expect(screen.getByRole('heading', { name: 'Profile: alex' })).toBeInTheDocument();
  });

  it('renders fallback page on unknown route', () => {
    renderWithProviders(<AppRouter />, { route: '/unknown' });

    expect(screen.getByRole('heading', { name: '404! Page not found.' })).toBeInTheDocument();
  });
});
