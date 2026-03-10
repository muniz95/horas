import { MantineProvider, createTheme } from '@mantine/core';
import { render, type RenderOptions } from '@testing-library/react';
import type { ReactElement, ReactNode } from 'react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { legacy_createStore as createStore } from 'redux';
import { rootReducer, type RootState } from '@/app/store/root-reducer';

interface AppRenderOptions extends Omit<RenderOptions, 'wrapper'> {
  preloadedState?: Partial<RootState>;
  route?: string;
}

const theme = createTheme({
  primaryColor: 'blue',
  defaultRadius: 'md'
});

export const createTestStore = (preloadedState?: Partial<RootState>) => {
  return createStore(rootReducer, preloadedState as RootState | undefined);
};

export const renderWithProviders = (
  ui: ReactElement,
  { preloadedState, route = '/', ...renderOptions }: AppRenderOptions = {}
) => {
  const store = createTestStore(preloadedState);

  function Wrapper({ children }: { children: ReactNode }) {
    return (
      <MantineProvider theme={theme} defaultColorScheme="light">
        <Provider store={store}>
          <MemoryRouter initialEntries={[route]}>{children}</MemoryRouter>
        </Provider>
      </MantineProvider>
    );
  }

  return {
    store,
    ...render(ui, { wrapper: Wrapper, ...renderOptions })
  };
};
