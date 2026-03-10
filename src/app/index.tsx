import {
  AppShell,
  Burger,
  Group,
  NavLink,
  ScrollArea,
  Switch,
  Text,
  Title,
  useMantineColorScheme
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { Provider } from 'react-redux';
import { BrowserRouter, Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import NotFound from '../routes/404';
import Home from '../routes/home';
import Profile from '../routes/profile';
import { store } from '../redux/store';

interface NavigationItem {
  label: string;
  path: string;
}

const navigationItems: NavigationItem[] = [
  {
    label: 'Home',
    path: '/'
  },
  {
    label: 'Profile',
    path: '/profile'
  }
];

function AppLayout() {
  const navigate = useNavigate();
  const location = useLocation();
  const [opened, { toggle, close }] = useDisclosure(false);
  const { colorScheme, setColorScheme } = useMantineColorScheme();

  const darkModeEnabled = colorScheme === 'dark';

  const handleNavigation = (path: string) => {
    navigate(path);
    close();
  };

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
            onChange={(event) => setColorScheme(event.currentTarget.checked ? 'dark' : 'light')}
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
            const isActive =
              item.path === '/'
                ? location.pathname === '/'
                : location.pathname.startsWith(item.path);

            return (
              <NavLink
                key={item.path}
                active={isActive}
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
