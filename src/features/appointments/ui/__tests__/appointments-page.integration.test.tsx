import { MantineProvider, createTheme } from '@mantine/core';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import type { ReactElement } from 'react';
import { describe, expect, it } from 'vitest';
import { AppointmentsFeatureBootstrap } from '@/features/appointments/application/bootstrap/appointments-feature-bootstrap';
import type { Appointment } from '@/features/appointments/domain/appointment';
import type { AppointmentsRepository } from '@/features/appointments/domain/appointments-repository';
import AppointmentsPage from '@/features/appointments/ui/appointments-page';
import { MemoryRouter } from 'react-router-dom';

const theme = createTheme({
  primaryColor: 'blue',
  defaultRadius: 'md'
});

const renderAppointmentsPage = (ui: ReactElement) =>
  render(
    <MantineProvider theme={theme} defaultColorScheme="light">
      <MemoryRouter initialEntries={['/']}>{ui}</MemoryRouter>
    </MantineProvider>
  );

class InMemoryAppointmentsRepository implements AppointmentsRepository {
  appointments: Appointment[];

  constructor(appointments: Appointment[] = []) {
    this.appointments = appointments.map((appointment) => ({ ...appointment }));
  }

  async clear() {
    this.appointments = [];
  }

  async delete(id: string) {
    this.appointments = this.appointments.filter((appointment) => appointment.id !== id);
  }

  async list() {
    return this.appointments.map((appointment) => ({ ...appointment }));
  }

  async save(appointment: Appointment) {
    const existingIndex = this.appointments.findIndex((item) => item.id === appointment.id);

    if (existingIndex >= 0) {
      this.appointments.splice(existingIndex, 1, { ...appointment });
    } else {
      this.appointments.push({ ...appointment });
    }

    return { ...appointment };
  }
}

describe('AppointmentsPage integration', () => {
  it('loads appointments from the injected repository', async () => {
    renderAppointmentsPage(
      <AppointmentsFeatureBootstrap
        repository={
          new InMemoryAppointmentsRepository([
            {
              id: 'appointment-1',
              startDate: '2026-01-01',
              startTime: '08:00',
              endDate: '2026-01-01',
              endTime: '09:00'
            }
          ])
        }
      >
        <AppointmentsPage />
      </AppointmentsFeatureBootstrap>
    );

    expect(await screen.findByLabelText('Start date')).toHaveValue('2026-01-01');
    expect(screen.getByText('All changes saved.')).toBeInTheDocument();
  });

  it('validates, saves, and deletes appointments through the page model', async () => {
    const user = userEvent.setup();
    const repository = new InMemoryAppointmentsRepository();

    renderAppointmentsPage(
      <AppointmentsFeatureBootstrap repository={repository}>
        <AppointmentsPage />
      </AppointmentsFeatureBootstrap>
    );

    await user.click(screen.getByRole('button', { name: 'New appointment' }));
    expect(screen.getAllByLabelText('Start date')).toHaveLength(1);

    fireEvent.change(screen.getByLabelText('Start time'), {
      target: { value: '09:00' }
    });
    fireEvent.change(screen.getByLabelText('End time'), {
      target: { value: '' }
    });
    await user.click(screen.getByRole('button', { name: 'Save' }));
    expect(await screen.findByText('End time is required.')).toBeInTheDocument();

    fireEvent.change(screen.getByLabelText('End time'), {
      target: { value: '10:15' }
    });
    await user.click(screen.getByRole('button', { name: 'Save' }));

    await waitFor(() => {
      expect(repository.appointments).toHaveLength(1);
    });
    expect(screen.getByText('All changes saved.')).toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: 'Delete' }));
    await waitFor(() => {
      expect(screen.getByText('Nenhum apontamento encontrado.')).toBeInTheDocument();
    });
    expect(repository.appointments).toEqual([]);
  });

  it('persists appointments across remounts with the IndexedDB adapter', async () => {
    const user = userEvent.setup();
    const view = renderAppointmentsPage(
      <AppointmentsFeatureBootstrap>
        <AppointmentsPage />
      </AppointmentsFeatureBootstrap>
    );

    await user.click(screen.getByRole('button', { name: 'New appointment' }));
    await user.click(screen.getByRole('button', { name: 'Save' }));

    await waitFor(() => {
      expect(screen.getByText('All changes saved.')).toBeInTheDocument();
    });

    view.unmount();

    renderAppointmentsPage(
      <AppointmentsFeatureBootstrap>
        <AppointmentsPage />
      </AppointmentsFeatureBootstrap>
    );

    await waitFor(() => {
      expect(screen.getAllByLabelText('Start date')).toHaveLength(1);
    });
  });
});
