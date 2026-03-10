import type { FeatureModule } from '@/features/types';
import ProfilePage from '@/features/profile/ui/profile-page';

export const profileFeature: FeatureModule = {
  key: 'profile',
  routes: [
    {
      path: '/profile',
      element: <ProfilePage />
    },
    {
      path: '/profile/:user',
      element: <ProfilePage />
    }
  ],
  navigationItems: [
    {
      label: 'Profile',
      path: '/profile'
    }
  ]
};
