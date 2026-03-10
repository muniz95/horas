import type { AnyAction } from 'redux';
import { ADD_APPOINTMENT } from '@/features/appointments/model/constants';
import type { Appointment } from '@/features/appointments/model/types';

export type AppointmentsState = Appointment[];

export const appointmentsReducer = (
  state: AppointmentsState = [],
  action: AnyAction
): AppointmentsState => {
  switch (action.type) {
    case ADD_APPOINTMENT:
      return [...state, action.payload as Appointment];
    default:
      return state;
  }
};
