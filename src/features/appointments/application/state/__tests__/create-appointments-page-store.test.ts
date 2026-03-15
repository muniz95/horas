import { describe, expect, it, vi } from 'vitest';
import {
  createAppointmentsPageStore,
  selectAppointmentsPageViewModelItems
} from '@/features/appointments/application/state/create-appointments-page-store';
import type { Appointment } from '@/features/appointments/domain/appointment';
import type { AppointmentsRepository } from '@/features/appointments/domain/appointments-repository';

class InMemoryAppointmentsRepository implements AppointmentsRepository {
  appointments: Appointment[];
  clear = vi.fn(async () => {
    this.appointments = [];
  });
  delete = vi.fn(async (id: string) => {
    this.appointments = this.appointments.filter((appointment) => appointment.id !== id);
  });
  list = vi.fn(async () => this.appointments.map((appointment) => ({ ...appointment })));
  save = vi.fn(async (appointment: Appointment) => {
    const existingIndex = this.appointments.findIndex(
      (item) => item.id === appointment.id
    );

    if (existingIndex >= 0) {
      this.appointments.splice(existingIndex, 1, { ...appointment });
    } else {
      this.appointments.push({ ...appointment });
    }

    return { ...appointment };
  });

  constructor(appointments: Appointment[] = []) {
    this.appointments = appointments.map((appointment) => ({ ...appointment }));
  }
}

describe('createAppointmentsPageStore', () => {
  it('loads appointments from the repository', async () => {
    const repository = new InMemoryAppointmentsRepository([
      {
        id: 'appointment-1',
        startDate: '2026-01-01',
        startTime: '08:00',
        endDate: '2026-01-01',
        endTime: '09:00'
      }
    ]);
    const store = createAppointmentsPageStore({ repository });

    await store.getState().loadAppointments();

    expect(store.getState().status).toBe('ready');
    expect(selectAppointmentsPageViewModelItems(store.getState())).toEqual([
      {
        id: 'appointment-1',
        appointment: {
          id: 'appointment-1',
          startDate: '2026-01-01',
          startTime: '08:00',
          endDate: '2026-01-01',
          endTime: '09:00'
        },
        isDirty: false,
        isPersisted: true,
        isSaving: false,
        validationErrors: {}
      }
    ]);
  });

  it('creates a draft, tracks field changes, and saves it through the repository', async () => {
    const repository = new InMemoryAppointmentsRepository();
    const store = createAppointmentsPageStore({ repository });

    store.getState().addAppointment();
    const draftId = store.getState().items[0].draft.id;

    store.getState().changeField(draftId, 'startTime', '09:15');
    await store.getState().saveAppointment(draftId);

    expect(repository.save).toHaveBeenCalledTimes(1);
    expect(selectAppointmentsPageViewModelItems(store.getState())[0]).toMatchObject({
      id: draftId,
      isDirty: false,
      isPersisted: true
    });
    expect(repository.appointments[0]?.startTime).toBe('09:15');
  });

  it('surfaces validation errors without persisting invalid drafts', async () => {
    const repository = new InMemoryAppointmentsRepository();
    const store = createAppointmentsPageStore({ repository });

    store.getState().addAppointment();
    const draftId = store.getState().items[0].draft.id;
    store.getState().changeField(draftId, 'endTime', '');

    await store.getState().saveAppointment(draftId);

    expect(repository.save).not.toHaveBeenCalled();
    expect(
      selectAppointmentsPageViewModelItems(store.getState())[0]?.validationErrors
    ).toEqual({
      endTime: 'End time is required.'
    });
  });

  it('deletes unsaved drafts locally and persisted appointments through the repository', async () => {
    const repository = new InMemoryAppointmentsRepository([
      {
        id: 'appointment-1',
        startDate: '2026-01-01',
        startTime: '08:00',
        endDate: '2026-01-01',
        endTime: '09:00'
      }
    ]);
    const store = createAppointmentsPageStore({ repository });

    await store.getState().loadAppointments();
    store.getState().addAppointment();

    const persistedId = selectAppointmentsPageViewModelItems(store.getState())[0].id;
    const draftId = selectAppointmentsPageViewModelItems(store.getState())[1].id;

    await store.getState().deleteAppointment(draftId);
    await store.getState().deleteAppointment(persistedId);

    expect(repository.delete).toHaveBeenCalledTimes(1);
    expect(selectAppointmentsPageViewModelItems(store.getState())).toEqual([]);
  });

  it('clears persisted appointments and local view state', async () => {
    const repository = new InMemoryAppointmentsRepository([
      {
        id: 'appointment-1',
        startDate: '2026-01-01',
        startTime: '08:00',
        endDate: '2026-01-01',
        endTime: '09:00'
      }
    ]);
    const store = createAppointmentsPageStore({ repository });

    await store.getState().loadAppointments();
    await store.getState().clearAppointments();

    expect(repository.clear).toHaveBeenCalledTimes(1);
    expect(selectAppointmentsPageViewModelItems(store.getState())).toEqual([]);
  });

  it('surfaces repository errors during load', async () => {
    const repository = new InMemoryAppointmentsRepository();
    repository.list = vi.fn(async () => {
      throw new Error('Repository unavailable');
    });
    const store = createAppointmentsPageStore({ repository });

    await store.getState().loadAppointments();

    expect(store.getState().status).toBe('error');
    expect(store.getState().error).toBe('Repository unavailable');
  });
});
