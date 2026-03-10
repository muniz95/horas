import { combineReducers } from 'redux';
import { appointmentsReducer } from '@/features/appointments/model/reducer';

export const rootReducer = combineReducers({
  appointments: appointmentsReducer
});

export type RootState = ReturnType<typeof rootReducer>;
