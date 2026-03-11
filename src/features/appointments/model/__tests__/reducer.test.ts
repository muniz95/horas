import { describe, expect, it } from 'vitest';
import { createAppointmentsStore } from '@/features/appointments/model/store';

describe('appointments store isolation', () => {
  it('starts with an empty appointments array', () => {
    const store = createAppointmentsStore();

    expect(store.getState().appointments).toEqual([]);
  });

  it('creates isolated store instances', () => {
    const firstStore = createAppointmentsStore();
    const secondStore = createAppointmentsStore();

    firstStore.getState().addAppointment();

    expect(firstStore.getState().appointments).toHaveLength(1);
    expect(secondStore.getState().appointments).toHaveLength(0);
  });

  it('clears state via clearAppointments', () => {
    const store = createAppointmentsStore();

    store.getState().addAppointment();
    store.getState().clearAppointments();

    expect(store.getState().appointments).toEqual([]);
  });
});
