import {
  AppShell,
  Burger,
  Group,
  NavLink,
  ScrollArea,
  Switch,
  Text,
  Title
} from '@mantine/core';
import { Provider } from 'react-redux';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { useApp } from './hooks/use-app';
import NotFound from '../routes/404';
import Home from '../routes/home';
import Profile from '../routes/profile';
import { store } from '../redux/store';

function AppLayout() {
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
        <Group h="100%" px="md" justify="space-between">
          <Group gap="sm">
            <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
            <Title order={4}>Horas</Title>
          </Group>
          <Switch
            size="sm"
            label="Dark mode"
            checked={darkModeEnabled}
            onChange={(event) => setDarkMode(event.currentTarget.checked)}
          />
        </Group>
      </AppShell.Header>

      <AppShell.Navbar p="sm">
        <AppShell.Section>
          <Text size="xs" c="dimmed" fw={500} tt="uppercase" mb="sm">
            Navigation
          </Text>
        </AppShell.Section>
        <AppShell.Section component={ScrollArea} grow>
          {navigationItems.map((item) => {
            return (
              <NavLink
                key={item.path}
                active={isNavigationItemActive(item.path)}
                label={item.label}
                onClick={() => handleNavigation(item.path)}
              />
            );
          })}
        </AppShell.Section>
      </AppShell.Navbar>

      <AppShell.Main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/profile/:user" element={<Profile />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </AppShell.Main>
    </AppShell>
  );
}

export default function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <AppLayout />
      </BrowserRouter>
    </Provider>
  );
}
