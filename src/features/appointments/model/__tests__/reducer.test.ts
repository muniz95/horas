import { describe, expect, it } from 'vitest';
import { addAppointment } from '@/features/appointments/model/actions';
import { appointmentsReducer } from '@/features/appointments/model/reducer';

describe('appointments reducer', () => {
  it('returns initial state when state is undefined', () => {
    expect(appointmentsReducer(undefined, { type: '@@INIT' })).toEqual([]);
  });

  it('appends a new appointment to state', () => {
    const nextState = appointmentsReducer([], addAppointment());

    expect(nextState).toHaveLength(1);
    expect(nextState[0]).toEqual(addAppointment().payload);
  });

  it('returns same reference for unknown action', () => {
    const state = [{ startDate: '2026-03-10', startTime: '09:00', endDate: '2026-03-10', endTime: '10:00' }];

    expect(appointmentsReducer(state, { type: 'UNKNOWN' })).toBe(state);
  });
});
