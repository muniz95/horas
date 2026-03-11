import { beforeEach, describe, expect, it } from 'vitest';
import {
  APPOINTMENTS_STORAGE_KEY,
  createAppointmentsStore
} from '@/features/appointments/model/store';
import { clearLocalStorage, writeLocalStorage } from '@/shared/hooks/use-local-storage';

describe('appointments store isolation', () => {
  beforeEach(() => {
    clearLocalStorage();
  });

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

  it('hydrates from persisted localStorage data', () => {
    writeLocalStorage(
      APPOINTMENTS_STORAGE_KEY,
      {
        appointments: [
          {
            startDate: '2026-01-01',
            startTime: '08:00',
            endDate: '2026-01-01',
            endTime: '09:00'
          }
        ]
      }
    );

    const store = createAppointmentsStore();

    expect(store.getState().appointments).toEqual([
      {
        startDate: '2026-01-01',
        startTime: '08:00',
        endDate: '2026-01-01',
        endTime: '09:00'
      }
    ]);
  });
});
