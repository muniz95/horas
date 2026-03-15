import {
  type AppointmentsPageStatus,
  type AppointmentsPageViewModelItem,
  toAppointmentsPageViewModelItem
} from '@/features/appointments/application/state/create-appointments-page-store';
import { useAppointmentsPageStore } from '@/features/appointments/application/state/appointments-page-store-context';
import type { AppointmentField } from '@/features/appointments/domain/entities/appointment';

export interface AppointmentsPageViewModel {
  addAppointment: () => void;
  changeField: (
    id: AppointmentsPageViewModelItem['id'],
    field: AppointmentField,
    value: string
  ) => void;
  clearAppointments: () => Promise<void>;
  deleteAppointment: (id: AppointmentsPageViewModelItem['id']) => Promise<void>;
  error: string | null;
  items: AppointmentsPageViewModelItem[];
  retryLoad: () => Promise<void>;
  saveAppointment: (id: AppointmentsPageViewModelItem['id']) => Promise<void>;
  status: AppointmentsPageStatus;
}

export const useAppointmentsPageViewModel = (): AppointmentsPageViewModel => {
  const storedItems = useAppointmentsPageStore((state) => state.items);
  const status = useAppointmentsPageStore((state) => state.status);
  const error = useAppointmentsPageStore((state) => state.error);
  const addAppointment = useAppointmentsPageStore((state) => state.addAppointment);
  const changeField = useAppointmentsPageStore((state) => state.changeField);
  const saveAppointment = useAppointmentsPageStore((state) => state.saveAppointment);
  const deleteAppointment = useAppointmentsPageStore((state) => state.deleteAppointment);
  const clearAppointments = useAppointmentsPageStore((state) => state.clearAppointments);
  const retryLoad = useAppointmentsPageStore((state) => state.retryLoad);
  const items = storedItems.map(toAppointmentsPageViewModelItem);

  return {
    items,
    status,
    error,
    addAppointment,
    changeField,
    saveAppointment,
    deleteAppointment,
    clearAppointments,
    retryLoad
  };
};
