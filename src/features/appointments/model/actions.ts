import { ADD_APPOINTMENT } from '@/features/appointments/model/constants';
import type { Appointment } from '@/features/appointments/model/types';

export interface AddAppointmentAction {
  type: typeof ADD_APPOINTMENT;
  payload: Appointment;
}

export const addAppointment = (): AddAppointmentAction => {
  const appointment: Appointment = {
    startDate: '2018-05-09',
    startTime: '12:00',
    endDate: '2018-05-09',
    endTime: '12:00'
  };

  return {
    type: ADD_APPOINTMENT,
    payload: appointment
  };
};
