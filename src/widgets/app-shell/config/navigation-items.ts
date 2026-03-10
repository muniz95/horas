export interface NavigationItem {
  label: string;
  path: string;
}

export const navigationItems: NavigationItem[] = [
  {
    label: 'Home',
    path: '/'
  },
  {
    label: 'Profile',
    path: '/profile'
  }
];
