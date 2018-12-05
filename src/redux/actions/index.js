import { ADD_APPOINTMENT } from '../constants';

export const addAppointment = () => {
	const appointment = {
		startDate: '2018-05-09',
		startTime: '12:00',
		endDate: '2018-05-09',
		endTime: '12:00'
	};
	const action = {
		type: ADD_APPOINTMENT,
		payload: appointment
	};
	return action;
};