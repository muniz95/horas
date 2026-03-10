import { Button, Card, Group, Stack, Text, Title } from '@mantine/core';
import { useNavigate } from 'react-router-dom';

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <Card withBorder p="xl" maw={560} mx="auto">
      <Stack gap="sm">
        <Title order={2}>404! Page not found.</Title>
        <Text c="dimmed">Looks like the page you are trying to access does not exist.</Text>
        <Group>
          <Button onClick={() => navigate('/')}>Back to Home</Button>
        </Group>
      </Stack>
    </Card>
  );
}
