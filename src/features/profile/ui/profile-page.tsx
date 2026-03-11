import { Badge, Button, Card, Group, Stack, Text, Title } from '@mantine/core';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useProfileStore } from '@/features/profile/model/store';

export default function ProfilePage() {
  const { user } = useParams();
  const profileUser = user ?? 'me';

  const time = useProfileStore((state) => state.time);
  const count = useProfileStore((state) => state.count);
  const tick = useProfileStore((state) => state.tick);
  const reset = useProfileStore((state) => state.reset);
  const increment = useProfileStore((state) => state.increment);

  useEffect(() => {
    reset();

    const timer = window.setInterval(() => {
      tick();
    }, 1000);

    return () => {
      window.clearInterval(timer);
    };
  }, [reset, tick]);

  return (
    <Stack gap="md">
      <Group justify="space-between" align="center">
        <div>
          <Title order={2}>Profile: {profileUser}</Title>
          <Text c="dimmed">This is the user profile for a user named {profileUser}.</Text>
        </div>
        <Badge variant="light">Live clock</Badge>
      </Group>

      <Card withBorder p="lg">
        <Stack gap="md">
          <Text>Current time: {new Date(time).toLocaleString()}</Text>
          <Group>
            <Button variant="default" onClick={increment}>
              Click me
            </Button>
            <Text>Clicked {count} times.</Text>
          </Group>
        </Stack>
      </Card>
    </Stack>
  );
}
