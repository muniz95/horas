import { ADD_APPOINTMENT } from '@/redux/constants';
import type { Appointment } from '@/redux/types';

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
