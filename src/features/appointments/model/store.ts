import type { Appointment } from '@/features/appointments/model/types';
import { createFeatureStore } from '@/shared/lib/state/create-feature-store';

export interface AppointmentsStoreState {
  addAppointment: () => void;
  appointments: Appointment[];
  clearAppointments: () => void;
}

export const APPOINTMENTS_STORAGE_KEY = 'feature:appointments-store';

const createDefaultAppointment = (): Appointment => ({
  startDate: '2018-05-09',
  startTime: '12:00',
  endDate: '2018-05-09',
  endTime: '12:00'
});

const appointmentsFeatureStore = createFeatureStore<AppointmentsStoreState>((set) => ({
  appointments: [],
  addAppointment: () =>
    set((state) => ({
      appointments: [...state.appointments, createDefaultAppointment()]
    })),
  clearAppointments: () => set({ appointments: [] })
}), {
  persistKey: APPOINTMENTS_STORAGE_KEY,
  partialize: (state) => ({
    appointments: state.appointments
  })
});

export const createAppointmentsStore = appointmentsFeatureStore.createStore;

export const appointmentsStore = appointmentsFeatureStore.store;

export const useAppointmentsStore = appointmentsFeatureStore.useStore;
