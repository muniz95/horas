import { createAppointmentsPageStore } from '@/features/appointments/application/state/create-appointments-page-store';
import type { AppointmentsRepository } from '@/features/appointments/domain/interfaces/appointments-repository';
import { createStoreContext } from '@/shared/lib/state/create-store-context';

export const {
  Provider: AppointmentsPageStoreProvider,
  useStore: useAppointmentsPageStore,
  useStoreApi: useAppointmentsPageStoreApi
} = createStoreContext(
  ({ repository }: { repository: AppointmentsRepository }) =>
    createAppointmentsPageStore({ repository }),
  {
    displayName: 'AppointmentsPageStore'
  }
);
