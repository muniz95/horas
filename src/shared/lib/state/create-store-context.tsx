import {
  createContext,
  type PropsWithChildren,
  useContext,
  useRef
} from 'react';
import { useStore } from 'zustand';
import type { ExtractState, StoreApi } from 'zustand/vanilla';

interface CreateStoreContextOptions {
  displayName?: string;
}

export const createStoreContext = <
  TStore extends StoreApi<object>,
  TProps extends object
>(
  createScopedStore: (props: TProps) => TStore,
  options: CreateStoreContextOptions = {}
) => {
  const displayName = options.displayName ?? 'ScopedStore';
  const StoreContext = createContext<TStore | null>(null);

  StoreContext.displayName = `${displayName}Context`;

  const Provider = ({ children, ...props }: PropsWithChildren<TProps>) => {
    const storeRef = useRef<TStore | null>(null);

    if (storeRef.current === null) {
      storeRef.current = createScopedStore(props as TProps);
    }

    return (
      <StoreContext.Provider value={storeRef.current}>
        {children}
      </StoreContext.Provider>
    );
  };

  const useScopedStoreApi = () => {
    const store = useContext(StoreContext);

    if (store === null) {
      throw new Error(`${displayName} provider is missing.`);
    }

    return store;
  };

  const useScopedStore = <T,>(selector: (state: ExtractState<TStore>) => T) =>
    useStore(useScopedStoreApi(), selector);

  return {
    Provider,
    useStore: useScopedStore,
    useStoreApi: useScopedStoreApi
  };
};
