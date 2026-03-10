import { AppShell } from '@mantine/core';
import { type ReactNode } from 'react';
import { useApp } from '@/app/hooks/use-app';
import { AppShellHeader } from '@/widgets/app-shell/ui/app-shell-header';
import { AppShellNavbar } from '@/widgets/app-shell/ui/app-shell-navbar';

interface AppShellLayoutProps {
  children: ReactNode;
}

export function AppShellLayout({ children }: AppShellLayoutProps) {
  const {
    darkModeEnabled,
    handleNavigation,
    isNavigationItemActive,
    navigationItems,
    opened,
    setDarkMode,
    toggle
  } = useApp();

  return (
    <AppShell
      header={{ height: 60 }}
      navbar={{
        width: 260,
        breakpoint: 'sm',
        collapsed: { mobile: !opened }
      }}
      padding="md"
    >
      <AppShell.Header>
        <AppShellHeader
          opened={opened}
          onToggleNavbar={toggle}
          darkModeEnabled={darkModeEnabled}
          onDarkModeChange={setDarkMode}
        />
      </AppShell.Header>

      <AppShellNavbar
        navigationItems={navigationItems}
        isNavigationItemActive={isNavigationItemActive}
        onNavigate={handleNavigation}
      />

      <AppShell.Main>{children}</AppShell.Main>
    </AppShell>
  );
}
