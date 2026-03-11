import { beforeEach, describe, expect, it } from 'vitest';
import { createProfileStore, PROFILE_STORAGE_KEY } from '@/features/profile/model/store';
import { clearLocalStorage, writeLocalStorage } from '@/shared/hooks/use-local-storage';

describe('profile store', () => {
  beforeEach(() => {
    clearLocalStorage();
  });

  it('creates isolated store instances', () => {
    const firstStore = createProfileStore();
    const secondStore = createProfileStore();

    firstStore.getState().increment();

    expect(firstStore.getState().count).toBe(11);
    expect(secondStore.getState().count).toBe(10);
  });

  it('resets count and time', () => {
    const store = createProfileStore();

    store.getState().increment();
    store.getState().tick();
    store.getState().reset();

    expect(store.getState().count).toBe(10);
  });

  it('hydrates persisted count from localStorage', () => {
    writeLocalStorage(PROFILE_STORAGE_KEY, { count: 33 });

    const store = createProfileStore();

    expect(store.getState().count).toBe(33);
  });
});
