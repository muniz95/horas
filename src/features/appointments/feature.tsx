import type { FeatureModule } from '@/shared/types/feature';
import { AppointmentsFeatureBootstrap } from '@/features/appointments/application/bootstrap/appointments-feature-bootstrap';
import AppointmentsPage from '@/features/appointments/ui/appointments-page';

export const appointmentsFeature: FeatureModule = {
  key: 'appointments',
  routes: [
    {
      path: '/',
      element: (
        <AppointmentsFeatureBootstrap>
          <AppointmentsPage />
        </AppointmentsFeatureBootstrap>
      )
    }
  ],
  navigationItems: [
    {
      label: 'Appointments',
      path: '/'
    }
  ]
};
