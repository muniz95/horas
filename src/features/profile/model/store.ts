import { createFeatureStore } from '@/shared/lib/state/create-feature-store';

export interface ProfileStoreState {
  count: number;
  increment: () => void;
  reset: () => void;
  tick: () => void;
  time: number;
}

const profileFeatureStore = createFeatureStore<ProfileStoreState>((set) => ({
  time: Date.now(),
  count: 10,
  tick: () => set({ time: Date.now() }),
  increment: () => set((state) => ({ count: state.count + 1 })),
  reset: () =>
    set({
      time: Date.now(),
      count: 10
    })
}));

export const createProfileStore = profileFeatureStore.createStore;

export const profileStore = profileFeatureStore.store;

export const useProfileStore = profileFeatureStore.useStore;
