import { useStore } from 'zustand';
import { createStore, type StateCreator, type StoreApi } from 'zustand/vanilla';

interface FeatureStoreBundle<TState extends object> {
  createStore: () => StoreApi<TState>;
  store: StoreApi<TState>;
  useStore: <T>(selector: (state: TState) => T) => T;
}

export const createFeatureStore = <TState extends object>(
  initializer: StateCreator<TState, [], []>
): FeatureStoreBundle<TState> => {
  const createScopedStore = () => createStore<TState>(initializer);
  const store = createScopedStore();
  const useFeatureStore = <T>(selector: (state: TState) => T) => useStore(store, selector);

  return {
    createStore: createScopedStore,
    store,
    useStore: useFeatureStore
  };
};
