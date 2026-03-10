import { legacy_createStore as createStore } from 'redux';
import reducer from '@/redux/reducers';

export const store = createStore(reducer);

export type AppDispatch = typeof store.dispatch;
