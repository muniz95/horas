import { AppShell, NavLink, ScrollArea, Text } from '@mantine/core';
import type { NavigationItem } from '@/shared/types/navigation';

interface AppShellNavbarProps {
  isNavigationItemActive: (path: string) => boolean;
  navigationItems: NavigationItem[];
  onNavigate: (path: string) => void;
}

export function AppShellNavbar({
  isNavigationItemActive,
  navigationItems,
  onNavigate
}: AppShellNavbarProps) {
  return (
    <AppShell.Navbar p="sm">
      <AppShell.Section>
        <Text size="xs" c="dimmed" fw={500} tt="uppercase" mb="sm">
          Navigation
        </Text>
      </AppShell.Section>
      <AppShell.Section component={ScrollArea} grow>
        {navigationItems.map((item) => (
          <NavLink
            key={item.path}
            active={isNavigationItemActive(item.path)}
            label={item.label}
            onClick={() => onNavigate(item.path)}
          />
        ))}
      </AppShell.Section>
    </AppShell.Navbar>
  );
}
