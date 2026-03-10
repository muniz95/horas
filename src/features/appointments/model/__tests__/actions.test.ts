import { describe, expect, it } from 'vitest';
import { addAppointment } from '@/features/appointments/model/actions';
import { ADD_APPOINTMENT } from '@/features/appointments/model/constants';

describe('appointments actions', () => {
  it('creates an add appointment action with expected payload', () => {
    expect(addAppointment()).toEqual({
      type: ADD_APPOINTMENT,
      payload: {
        startDate: '2018-05-09',
        startTime: '12:00',
        endDate: '2018-05-09',
        endTime: '12:00'
      }
    });
  });
});
