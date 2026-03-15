import type { Appointment, AppointmentId } from '@/features/appointments/domain/entities/appointment';

export interface AppointmentsRepository {
  clear: () => Promise<void>;
  delete: (id: AppointmentId) => Promise<void>;
  list: () => Promise<Appointment[]>;
  save: (appointment: Appointment) => Promise<Appointment>;
}
