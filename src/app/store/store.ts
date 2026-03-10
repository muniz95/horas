import { legacy_createStore as createStore } from 'redux';
import { rootReducer } from '@/app/store/root-reducer';

export const store = createStore(rootReducer);

export type AppDispatch = typeof store.dispatch;
