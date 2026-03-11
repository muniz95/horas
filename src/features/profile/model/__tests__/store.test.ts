import { describe, expect, it } from 'vitest';
import { createProfileStore } from '@/features/profile/model/store';

describe('profile store', () => {
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
});
