import { describe, expect, it } from 'vitest';
import { createAppointmentsStore } from '@/features/appointments/model/store';

describe('appointments store actions', () => {
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
});
