import { describe, expect, it } from 'vitest';
import {
  appointmentDraftToAppointment,
  createAppointmentDraft,
  validateAppointmentDraft
} from '@/features/appointments/domain/appointment';

describe('appointment domain', () => {
  it('creates a draft with a stable id and mirrored start/end values', () => {
    const appointment = createAppointmentDraft({
      id: 'appointment-1',
      now: new Date('2026-01-01T08:30:00')
    });

    expect(appointment).toEqual({
      id: 'appointment-1',
      startDate: '2026-01-01',
      startTime: '08:30',
      endDate: '2026-01-01',
      endTime: '08:30'
    });
  });

  it('returns required-field validation errors for incomplete drafts', () => {
    expect(
      validateAppointmentDraft({
        id: 'appointment-1',
        startDate: '',
        startTime: '',
        endDate: '',
        endTime: ''
      })
    ).toEqual({
      startDate: 'Start date is required.',
      startTime: 'Start time is required.',
      endDate: 'End date is required.',
      endTime: 'End time is required.'
    });
  });

  it('rejects drafts where the end is before the start', () => {
    expect(
      appointmentDraftToAppointment({
        id: 'appointment-1',
        startDate: '2026-01-01',
        startTime: '10:00',
        endDate: '2026-01-01',
        endTime: '09:00'
      })
    ).toEqual({
      ok: false,
      errors: {
        schedule: 'Start must be before or equal to end.'
      }
    });
  });

  it('converts a valid draft into a persisted appointment shape', () => {
    expect(
      appointmentDraftToAppointment({
        id: 'appointment-1',
        startDate: '2026-01-01',
        startTime: '09:00',
        endDate: '2026-01-01',
        endTime: '10:00'
      })
    ).toEqual({
      ok: true,
      value: {
        id: 'appointment-1',
        startDate: '2026-01-01',
        startTime: '09:00',
        endDate: '2026-01-01',
        endTime: '10:00'
      }
    });
  });
});
