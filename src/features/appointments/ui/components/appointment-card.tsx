import { Badge, Button, Card, Group, Stack, Text, TextInput } from '@mantine/core';
import type {
  AppointmentDraft,
  AppointmentField,
  AppointmentValidationErrors
} from '@/features/appointments/domain/entities/appointment';

interface AppointmentCardProps {
  appointment: AppointmentDraft;
  isDirty: boolean;
  isPersisted: boolean;
  isSaving: boolean;
  onChange: (field: AppointmentField, value: string) => void;
  onDelete: () => void;
  onSave: () => void;
  validationErrors: AppointmentValidationErrors;
}

export default function AppointmentCard({
  appointment,
  isDirty,
  isPersisted,
  isSaving,
  onChange,
  onDelete,
  onSave,
  validationErrors
}: AppointmentCardProps) {
  return (
    <Card withBorder shadow="xs" p="md">
      <Stack gap="sm">
        <Group justify="space-between" align="center">
          <Text fw={600}>Appointment</Text>
          <Badge variant="light" color={isPersisted && !isDirty ? 'green' : 'blue'}>
            {isPersisted && !isDirty ? 'Saved' : 'Unsaved'}
          </Badge>
        </Group>

        <Group align="start" wrap="wrap" gap="sm">
          <TextInput
            error={validationErrors.startDate}
            label="Start date"
            name="startDate"
            onChange={(event) => onChange('startDate', event.target.value)}
            type="date"
            value={appointment.startDate}
          />
          <TextInput
            error={validationErrors.startTime}
            label="Start time"
            name="startTime"
            onChange={(event) => onChange('startTime', event.target.value)}
            type="time"
            value={appointment.startTime}
          />
          <TextInput
            error={validationErrors.endDate}
            label="End date"
            name="endDate"
            onChange={(event) => onChange('endDate', event.target.value)}
            type="date"
            value={appointment.endDate}
          />
          <TextInput
            error={validationErrors.endTime}
            label="End time"
            name="endTime"
            onChange={(event) => onChange('endTime', event.target.value)}
            type="time"
            value={appointment.endTime}
          />
        </Group>

        {validationErrors.schedule ? (
          <Text c="red" size="sm">
            {validationErrors.schedule}
          </Text>
        ) : null}

        <Group justify="space-between">
          <Text c="dimmed" size="sm">
            {isDirty ? 'Changes pending save.' : 'All changes saved.'}
          </Text>
          <Group>
            <Button color="red" onClick={onDelete} variant="subtle">
              Delete
            </Button>
            <Button loading={isSaving} onClick={onSave}>
              Save
            </Button>
          </Group>
        </Group>
      </Stack>
    </Card>
  );
}
