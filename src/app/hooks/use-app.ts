import { useMantineColorScheme } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { useLocation, useNavigate } from 'react-router-dom';
import { navigationItems } from '@/widgets/app-shell/config/navigation-items';

export const useApp = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [opened, { toggle, close }] = useDisclosure(false);
  const { colorScheme, setColorScheme } = useMantineColorScheme();

  const darkModeEnabled = colorScheme === 'dark';

  const setDarkMode = (enabled: boolean) => {
    setColorScheme(enabled ? 'dark' : 'light');
  };

  const handleNavigation = (path: string) => {
    navigate(path);
    close();
  };

  const isNavigationItemActive = (path: string) => {
    if (path === '/') {
      return location.pathname === '/';
    }

    return location.pathname.startsWith(path);
  };

  return {
    darkModeEnabled,
    handleNavigation,
    isNavigationItemActive,
    navigationItems,
    opened,
    setDarkMode,
    toggle
  };
};
