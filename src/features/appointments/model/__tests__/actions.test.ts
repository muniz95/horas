import { beforeEach, describe, expect, it } from 'vitest';
import {
  APPOINTMENTS_STORAGE_KEY,
  createAppointmentsStore
} from '@/features/appointments/model/store';
import { clearLocalStorage, readLocalStorage } from '@/shared/hooks/use-local-storage';

describe('appointments store actions', () => {
  beforeEach(() => {
    clearLocalStorage();
  });

  it('adds a default appointment to state', () => {
    const store = createAppointmentsStore();

    store.getState().addAppointment();

    expect(store.getState().appointments).toEqual([
      {
        startDate: '2018-05-09',
        startTime: '12:00',
        endDate: '2018-05-09',
        endTime: '12:00'
      }
    ]);
  });

  it('persists state into localStorage', () => {
    const store = createAppointmentsStore();

    store.getState().addAppointment();

    expect(readLocalStorage(APPOINTMENTS_STORAGE_KEY, { appointments: [] })).toEqual({
      appointments: [
        {
          startDate: '2018-05-09',
          startTime: '12:00',
          endDate: '2018-05-09',
          endTime: '12:00'
        }
      ]
    });
  });
});
