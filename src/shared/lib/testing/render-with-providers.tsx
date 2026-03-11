import { MantineProvider, createTheme } from '@mantine/core';
import { render, type RenderOptions } from '@testing-library/react';
import type { ReactElement, ReactNode } from 'react';
import { MemoryRouter } from 'react-router-dom';
import { appointmentsStore } from '@/features/appointments/model/store';
import { profileStore } from '@/features/profile/model/store';

interface AppRenderOptions extends Omit<RenderOptions, 'wrapper'> {
  route?: string;
}

const theme = createTheme({
  primaryColor: 'blue',
  defaultRadius: 'md'
});

export const renderWithProviders = (
  ui: ReactElement,
  { route = '/', ...renderOptions }: AppRenderOptions = {}
) => {
  appointmentsStore.setState({ appointments: [] });
  profileStore.getState().reset();

  function Wrapper({ children }: { children: ReactNode }) {
    return (
      <MantineProvider theme={theme} defaultColorScheme="light">
        <MemoryRouter initialEntries={[route]}>{children}</MemoryRouter>
      </MantineProvider>
    );
  }

  return render(ui, { wrapper: Wrapper, ...renderOptions });
};
