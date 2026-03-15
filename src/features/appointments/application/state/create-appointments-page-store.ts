import { createStore, type StoreApi } from 'zustand/vanilla';
import {
  appointmentDraftToAppointment,
  createAppointmentDraft,
  isSameAppointmentValues,
  validateAppointmentDraft,
  type Appointment,
  type AppointmentDraft,
  type AppointmentField,
  type AppointmentValidationErrors
} from '@/features/appointments/domain/entities/appointment';
import type { AppointmentsRepository } from '@/features/appointments/domain/interfaces/appointments-repository';

export type AppointmentsPageStatus = 'error' | 'idle' | 'loading' | 'ready';

export interface AppointmentsPageStoreItem {
  draft: AppointmentDraft;
  isSaving: boolean;
  persisted: Appointment | null;
  validationErrors: AppointmentValidationErrors;
}

export interface AppointmentsPageViewModelItem {
  appointment: AppointmentDraft;
  id: AppointmentDraft['id'];
  isDirty: boolean;
  isPersisted: boolean;
  isSaving: boolean;
  validationErrors: AppointmentValidationErrors;
}

export interface AppointmentsPageStoreState {
  addAppointment: () => void;
  changeField: (id: AppointmentDraft['id'], field: AppointmentField, value: string) => void;
  clearAppointments: () => Promise<void>;
  deleteAppointment: (id: AppointmentDraft['id']) => Promise<void>;
  error: string | null;
  items: AppointmentsPageStoreItem[];
  loadAppointments: () => Promise<void>;
  retryLoad: () => Promise<void>;
  saveAppointment: (id: AppointmentDraft['id']) => Promise<void>;
  status: AppointmentsPageStatus;
}

interface CreateAppointmentsPageStoreOptions {
  repository: AppointmentsRepository;
}

const toErrorMessage = (error: unknown, fallbackMessage: string) =>
  error instanceof Error ? error.message : fallbackMessage;

const createAppointmentsPageStoreItem = (
  appointment: AppointmentDraft,
  persisted: Appointment | null
): AppointmentsPageStoreItem => ({
  draft: appointment,
  persisted,
  isSaving: false,
  validationErrors: {}
});

const toAppointmentsPageStoreItems = (appointments: Appointment[]) =>
  appointments.map((appointment) =>
    createAppointmentsPageStoreItem(appointment, appointment)
  );

const withUpdatedPageStoreItem = (
  items: AppointmentsPageStoreItem[],
  id: AppointmentDraft['id'],
  update: (item: AppointmentsPageStoreItem) => AppointmentsPageStoreItem
) => items.map((item) => (item.draft.id === id ? update(item) : item));

export const toAppointmentsPageViewModelItem = (
  item: AppointmentsPageStoreItem
): AppointmentsPageViewModelItem => ({
  appointment: item.draft,
  id: item.draft.id,
  isDirty:
    item.persisted === null ||
    !isSameAppointmentValues(item.draft, item.persisted),
  isPersisted: item.persisted !== null,
  isSaving: item.isSaving,
  validationErrors: item.validationErrors
});

export const createAppointmentsPageStore = ({
  repository
}: CreateAppointmentsPageStoreOptions): StoreApi<AppointmentsPageStoreState> =>
  createStore<AppointmentsPageStoreState>((set, get) => ({
    items: [],
    status: 'idle',
    error: null,
    addAppointment: () =>
      set((state) => ({
        error: null,
        items: [
          ...state.items,
          createAppointmentsPageStoreItem(createAppointmentDraft(), null)
        ]
      })),
    changeField: (id, field, value) =>
      set((state) => ({
        error: null,
        items: withUpdatedPageStoreItem(state.items, id, (item) => {
          const nextDraft = {
            ...item.draft,
            [field]: value
          };

          return {
            ...item,
            draft: nextDraft,
            validationErrors:
              Object.keys(item.validationErrors).length > 0
                ? validateAppointmentDraft(nextDraft)
                : item.validationErrors
          };
        })
      })),
    clearAppointments: async () => {
      set({ error: null });

      try {
        await repository.clear();
        set({
          items: [],
          status: 'ready'
        });
      } catch (error) {
        set({
          error: toErrorMessage(error, 'Failed to clear appointments.')
        });
      }
    },
    deleteAppointment: async (id) => {
      const target = get().items.find((item) => item.draft.id === id);

      if (!target) {
        return;
      }

      if (target.persisted === null) {
        set((state) => ({
          error: null,
          items: state.items.filter((item) => item.draft.id !== id)
        }));
        return;
      }

      set((state) => ({
        error: null,
        items: withUpdatedPageStoreItem(state.items, id, (item) => ({
          ...item,
          isSaving: true
        }))
      }));

      try {
        await repository.delete(id);
        set((state) => ({
          items: state.items.filter((item) => item.draft.id !== id)
        }));
      } catch (error) {
        set((state) => ({
          error: toErrorMessage(error, 'Failed to delete appointment.'),
          items: withUpdatedPageStoreItem(state.items, id, (item) => ({
            ...item,
            isSaving: false
          }))
        }));
      }
    },
    loadAppointments: async () => {
      if (get().status === 'loading') {
        return;
      }

      set({
        error: null,
        status: 'loading'
      });

      try {
        const appointments = await repository.list();

        set({
          items: toAppointmentsPageStoreItems(appointments),
          status: 'ready'
        });
      } catch (error) {
        set({
          error: toErrorMessage(error, 'Failed to load appointments.'),
          status: 'error'
        });
      }
    },
    retryLoad: async () => {
      await get().loadAppointments();
    },
    saveAppointment: async (id) => {
      const target = get().items.find((item) => item.draft.id === id);

      if (!target) {
        return;
      }

      const appointmentResult = appointmentDraftToAppointment(target.draft);

      if (!appointmentResult.ok) {
        set((state) => ({
          error: null,
          items: withUpdatedPageStoreItem(state.items, id, (item) => ({
            ...item,
            validationErrors: appointmentResult.errors
          }))
        }));
        return;
      }

      set((state) => ({
        error: null,
        items: withUpdatedPageStoreItem(state.items, id, (item) => ({
          ...item,
          isSaving: true,
          validationErrors: {}
        }))
      }));

      try {
        const savedAppointment = await repository.save(appointmentResult.value);

        set((state) => ({
          items: withUpdatedPageStoreItem(state.items, id, () =>
            createAppointmentsPageStoreItem(savedAppointment, savedAppointment)
          ),
          status: 'ready'
        }));
      } catch (error) {
        set((state) => ({
          error: toErrorMessage(error, 'Failed to save appointment.'),
          items: withUpdatedPageStoreItem(state.items, id, (item) => ({
            ...item,
            isSaving: false
          }))
        }));
      }
    }
  }));

export const selectAppointmentsPageViewModelItems = (
  state: AppointmentsPageStoreState
) => state.items.map(toAppointmentsPageViewModelItem);
