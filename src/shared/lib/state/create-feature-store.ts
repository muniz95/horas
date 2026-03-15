import { useStore } from 'zustand';
import { createStore, type StateCreator, type StoreApi } from 'zustand/vanilla';
import { readLocalStorage, writeLocalStorage } from '@/shared/hooks/use-local-storage';

interface FeatureStoreBundle<TState extends object> {
  createStore: () => StoreApi<TState>;
  store: StoreApi<TState>;
  useStore: <T>(selector: (state: TState) => T) => T;
}

interface FeatureStoreOptions<TState extends object, TPersistedState extends object> {
  partialize: (state: TState) => TPersistedState;
  persistKey?: string;
}

const defaultPartialize = <TState extends object>(state: TState) => {
  return Object.fromEntries(
    Object.entries(state).filter(([, value]) => typeof value !== 'function')
  ) as Partial<TState>;
};

export const createFeatureStore = <TState extends object>(
  initializer: StateCreator<TState, [], []>,
  options: FeatureStoreOptions<TState, Partial<TState>> = {
    partialize: defaultPartialize
  }
): FeatureStoreBundle<TState> => {
  const createScopedStore = () => {
    const store = createStore<TState>((set, get, api) => {
      const initialState = initializer(set, get, api);
      const { persistKey } = options;

      if (!persistKey) {
        return initialState;
      }

      const persistedValue = readLocalStorage<unknown>(persistKey, {});

      if (typeof persistedValue !== 'object' || persistedValue === null) {
        return initialState;
      }

      return {
        ...initialState,
        ...(persistedValue as Partial<TState>)
      };
    });

    if (options.persistKey) {
      store.subscribe((state) => {
        writeLocalStorage(options.persistKey as string, options.partialize(state));
      });
    }

    return store;
  };

  const store = createScopedStore();
  const useFeatureStore = <T>(selector: (state: TState) => T) => useStore(store, selector);

  return {
    createStore: createScopedStore,
    store,
    useStore: useFeatureStore
  };
};
