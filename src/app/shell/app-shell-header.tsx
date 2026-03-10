import { Burger, Group, Switch, Title } from '@mantine/core';

interface AppShellHeaderProps {
  darkModeEnabled: boolean;
  onDarkModeChange: (enabled: boolean) => void;
  onToggleNavbar: () => void;
  opened: boolean;
}

export function AppShellHeader({
  darkModeEnabled,
  onDarkModeChange,
  onToggleNavbar,
  opened
}: AppShellHeaderProps) {
  return (
    <Group h="100%" px="md" justify="space-between">
      <Group gap="sm">
        <Burger opened={opened} onClick={onToggleNavbar} hiddenFrom="sm" size="sm" />
        <Title order={4}>Horas</Title>
      </Group>
      <Switch
        size="sm"
        label="Dark mode"
        checked={darkModeEnabled}
        onChange={(event) => onDarkModeChange(event.currentTarget.checked)}
      />
    </Group>
  );
}
