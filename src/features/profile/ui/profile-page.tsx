import { Badge, Button, Card, Group, Stack, Text, Title } from '@mantine/core';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

export default function ProfilePage() {
  const { user } = useParams();
  const profileUser = user ?? 'me';

  const [time, setTime] = useState(Date.now());
  const [count, setCount] = useState(10);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setTime(Date.now());
    }, 1000);

    return () => {
      window.clearInterval(timer);
    };
  }, []);

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
            <Button variant="default" onClick={() => setCount((prev) => prev + 1)}>
              Click me
            </Button>
            <Text>Clicked {count} times.</Text>
          </Group>
        </Stack>
      </Card>
    </Stack>
  );
}
