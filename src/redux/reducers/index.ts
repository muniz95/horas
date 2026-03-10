import { combineReducers, type AnyAction } from 'redux';
import { ADD_APPOINTMENT } from '../constants';
import type { Appointment } from '../types';

const appointments = (state: Appointment[] = [], action: AnyAction): Appointment[] => {
  switch (action.type) {
    case ADD_APPOINTMENT:
      return [...state, action.payload as Appointment];
    default:
      return state;
  }
};

const reducer = combineReducers({
  appointments
});

export type RootState = ReturnType<typeof reducer>;

export default reducer;
