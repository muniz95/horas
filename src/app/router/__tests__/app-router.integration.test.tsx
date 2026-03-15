import { MantineProvider, createTheme } from '@mantine/core';
import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { AppRouter } from '@/app/router/app-router';
import { MemoryRouter } from 'react-router-dom';

const theme = createTheme({
  primaryColor: 'blue',
  defaultRadius: 'md'
});

const renderRouter = (route = '/') =>
  render(
    <MantineProvider theme={theme} defaultColorScheme="light">
      <MemoryRouter initialEntries={[route]}>
        <AppRouter />
      </MemoryRouter>
    </MantineProvider>
  );

describe('AppRouter integration', () => {
  it('renders appointments page on root route', async () => {
    renderRouter('/');

    expect(
      await screen.findByRole('heading', { name: 'Appointments' })
    ).toBeInTheDocument();
    expect(
      await screen.findByText('Nenhum apontamento encontrado.')
    ).toBeInTheDocument();
  });

  it('renders fallback page on removed profile route', async () => {
    renderRouter('/profile/alex');

    expect(
      await screen.findByRole('heading', { name: '404! Page not found.' })
    ).toBeInTheDocument();
  });

  it('renders fallback page on unknown route', () => {
    renderRouter('/unknown');

    expect(screen.getByRole('heading', { name: '404! Page not found.' })).toBeInTheDocument();
  });
});
