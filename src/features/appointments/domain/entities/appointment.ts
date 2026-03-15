export type AppointmentId = string;

export const appointmentFields = [
  'startDate',
  'startTime',
  'endDate',
  'endTime'
] as const;

export type AppointmentField = (typeof appointmentFields)[number];

export interface AppointmentValues {
  endDate: string;
  endTime: string;
  startDate: string;
  startTime: string;
}

export interface AppointmentDraft extends AppointmentValues {
  id: AppointmentId;
}

export interface Appointment extends AppointmentValues {
  id: AppointmentId;
}

export interface AppointmentValidationErrors {
  endDate?: string;
  endTime?: string;
  schedule?: string;
  startDate?: string;
  startTime?: string;
}

export interface CreateAppointmentDraftOptions {
  id?: AppointmentId;
  now?: Date;
}

const padDateSegment = (value: number) => `${value}`.padStart(2, '0');

const formatDate = (value: Date) =>
  `${value.getFullYear()}-${padDateSegment(value.getMonth() + 1)}-${padDateSegment(value.getDate())}`;

const formatTime = (value: Date) =>
  `${padDateSegment(value.getHours())}:${padDateSegment(value.getMinutes())}`;

const createAppointmentId = () => {
  if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
    return crypto.randomUUID();
  }

  return `appointment-${Date.now()}-${Math.random().toString(16).slice(2)}`;
};

export const createAppointmentDraft = ({
  id = createAppointmentId(),
  now = new Date()
}: CreateAppointmentDraftOptions = {}): AppointmentDraft => {
  const date = formatDate(now);
  const time = formatTime(now);

  return {
    id,
    startDate: date,
    startTime: time,
    endDate: date,
    endTime: time
  };
};

const createRequiredFieldError = (label: string) => `${label} is required.`;

const toComparableDate = (date: string, time: string) => new Date(`${date}T${time}:00`);

export const validateAppointmentDraft = (
  appointment: AppointmentDraft
): AppointmentValidationErrors => {
  const errors: AppointmentValidationErrors = {};

  if (!appointment.startDate) {
    errors.startDate = createRequiredFieldError('Start date');
  }

  if (!appointment.startTime) {
    errors.startTime = createRequiredFieldError('Start time');
  }

  if (!appointment.endDate) {
    errors.endDate = createRequiredFieldError('End date');
  }

  if (!appointment.endTime) {
    errors.endTime = createRequiredFieldError('End time');
  }

  if (
    !errors.startDate &&
    !errors.startTime &&
    !errors.endDate &&
    !errors.endTime
  ) {
    const start = toComparableDate(appointment.startDate, appointment.startTime);
    const end = toComparableDate(appointment.endDate, appointment.endTime);

    if (Number.isNaN(start.getTime()) || Number.isNaN(end.getTime())) {
      errors.schedule = 'Appointment dates and times must be valid.';
    } else if (start.getTime() > end.getTime()) {
      errors.schedule = 'Start must be before or equal to end.';
    }
  }

  return errors;
};

const hasAppointmentValidationErrors = (
  errors: AppointmentValidationErrors
) => Object.keys(errors).length > 0;

export const appointmentDraftToAppointment = (
  appointment: AppointmentDraft
):
  | { ok: true; value: Appointment }
  | { errors: AppointmentValidationErrors; ok: false } => {
  const errors = validateAppointmentDraft(appointment);

  if (hasAppointmentValidationErrors(errors)) {
    return {
      ok: false,
      errors
    };
  }

  return {
    ok: true,
    value: {
      ...appointment
    }
  };
};

export const isSameAppointmentValues = (
  first: AppointmentValues,
  second: AppointmentValues
) =>
  appointmentFields.every((field) => first[field] === second[field]);
