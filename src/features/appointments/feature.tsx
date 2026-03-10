import type { FeatureModule } from '@/features/types';
import AppointmentsPage from '@/features/appointments/ui/appointments-page';

export const appointmentsFeature: FeatureModule = {
  key: 'appointments',
  routes: [
    {
      path: '/',
      element: <AppointmentsPage />
    }
  ],
  navigationItems: [
    {
      label: 'Appointments',
      path: '/'
    }
  ]
};
