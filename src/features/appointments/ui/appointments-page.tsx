import { Button, Card, Group, Stack, Text, Title } from '@mantine/core';
import { useDispatch, useSelector } from 'react-redux';
import { addAppointment } from '@/features/appointments/model/actions';
import AppointmentCard from '@/features/appointments/ui/appointment-card';
import type { RootState } from '@/app/store/root-reducer';
import type { AppDispatch } from '@/app/store/store';

export default function AppointmentsPage() {
  const appointments = useSelector((state: RootState) => state.appointments);
  const dispatch = useDispatch<AppDispatch>();

  const onAddAppointment = () => {
    dispatch(addAppointment());
  };

  return (
    <Stack gap="md">
      <Group justify="space-between" align="flex-end">
        <div>
          <Title order={2}>Appointments</Title>
          <Text c="dimmed" size="sm">
            Manage your scheduling entries in one place.
          </Text>
        </div>
        <Button onClick={onAddAppointment}>New appointment</Button>
      </Group>

      {appointments.length > 0 ? (
        appointments.map((appointment, index) => (
          <AppointmentCard
            key={`${appointment.startDate}-${appointment.startTime}-${index}`}
            appointment={appointment}
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
