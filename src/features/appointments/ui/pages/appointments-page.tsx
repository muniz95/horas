import { Alert, Button, Card, Group, Loader, Stack, Text, Title } from '@mantine/core';
import AppointmentCard from '@/features/appointments/ui/components/appointment-card';
import { useAppointmentsPageViewModel } from '@/features/appointments/application/view-model/use-appointments-page-view-model';

export default function AppointmentsPage() {
  const {
    addAppointment,
    changeField,
    clearAppointments,
    deleteAppointment,
    error,
    items,
    retryLoad,
    saveAppointment,
    status
  } = useAppointmentsPageViewModel();

  return (
    <Stack gap="md">
      <Group justify="space-between" align="flex-end">
        <div>
          <Title order={2}>Appointments</Title>
          <Text c="dimmed" size="sm">
            Manage your scheduling entries in one place.
          </Text>
        </div>
        <Group>
          <Button onClick={() => void clearAppointments()} variant="default">
            Clear all
          </Button>
          <Button onClick={addAppointment}>New appointment</Button>
        </Group>
      </Group>

      {error ? (
        <Alert
          color="red"
          title="Appointments could not be updated"
          variant="light"
        >
          <Group justify="space-between" align="center">
            <Text size="sm">{error}</Text>
            <Button onClick={() => void retryLoad()} size="xs" variant="light">
              Retry
            </Button>
          </Group>
        </Alert>
      ) : null}

      {status === 'loading' ? (
        <Card withBorder p="lg">
          <Group>
            <Loader size="sm" />
            <Text c="dimmed">Loading appointments...</Text>
          </Group>
        </Card>
      ) : items.length > 0 ? (
        items.map((item) => (
          <AppointmentCard
            key={item.id}
            appointment={item.appointment}
            isDirty={item.isDirty}
            isPersisted={item.isPersisted}
            isSaving={item.isSaving}
            onChange={(field, value) => changeField(item.id, field, value)}
            onDelete={() => void deleteAppointment(item.id)}
            onSave={() => void saveAppointment(item.id)}
            validationErrors={item.validationErrors}
          />
        ))
      ) : (
        <Card withBorder p="lg">
          <Text c="dimmed">Nenhum apontamento encontrado.</Text>
        </Card>
      )}
    </Stack>
  );
}
