import { Button, Card, Group, TextInput } from '@mantine/core';
import { useEffect, useState, type ChangeEvent } from 'react';
import type { Appointment as AppointmentType } from '@/features/appointments/model/types';

interface AppointmentCardProps {
  appointment: AppointmentType;
}

export default function AppointmentCard({ appointment }: AppointmentCardProps) {
  const [formData, setFormData] = useState<AppointmentType>(appointment);

  useEffect(() => {
    setFormData(appointment);
  }, [appointment]);

  const setContent = (event: ChangeEvent<HTMLInputElement>) => {
    const field = event.target.name as keyof AppointmentType;
    setFormData((prevState) => ({
      ...prevState,
      [field]: event.target.value
    }));
  };

  const save = () => {
    console.log('appointment', formData);
  };

  return (
    <Card withBorder shadow="xs" p="md">
      <Group align="end" wrap="wrap" gap="sm">
        <TextInput
          label="Start date"
          type="date"
          value={formData.startDate}
          name="startDate"
          onChange={setContent}
        />
        <TextInput
          label="Start time"
          type="time"
          value={formData.startTime}
          name="startTime"
          onChange={setContent}
        />
        <TextInput
          label="End date"
          type="date"
          value={formData.endDate}
          name="endDate"
          onChange={setContent}
        />
        <TextInput
          label="End time"
          type="time"
          value={formData.endTime}
          name="endTime"
          onChange={setContent}
        />
        <Button onClick={save}>Salvar</Button>
      </Group>
    </Card>
  );
}
