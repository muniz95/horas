import type { ReactElement } from 'react';
import HomePage from '@/pages/home/ui/home-page';
import NotFoundPage from '@/pages/not-found/ui/not-found-page';
import ProfilePage from '@/pages/profile/ui/profile-page';

export interface AppRoute {
  element: ReactElement;
  path: string;
}

export const appRoutes: AppRoute[] = [
  {
    path: '/',
    element: <HomePage />
  },
  {
    path: '/profile',
    element: <ProfilePage />
  },
  {
    path: '/profile/:user',
    element: <ProfilePage />
  },
  {
    path: '*',
    element: <NotFoundPage />
  }
];
