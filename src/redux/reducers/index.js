import { REACH_GOAL } from '../constants';
import { combineReducers } from 'redux';

const defaultAppointments = [
	{
		startDate: '2018-12-03',
		startTime: '09:30',
		endDate: '2018-12-03',
		endTime: '14:00'
	}, {
		startDate: '2018-12-03',
		startTime: '09:30',
		endDate: '2018-12-03',
		endTime: '14:00'
	}
];

const goal = (state = 'not finished', action) => {
	switch (action.type) {
		case REACH_GOAL:
			return 'you have reached your daily goal!';
		default:
			return state;
	}
};

const appointments = (state = defaultAppointments, action) => {
	switch (action.type) {
		case 'ADD_APPOINTMENT':
			return [...state, action.payload];
		default:
			return state;
	}
};

export default combineReducers({
	goal, appointments
});