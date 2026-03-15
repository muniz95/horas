import { useEffect, useRef, type ReactNode } from 'react';
import {
  AppointmentsPageStoreProvider,
  useAppointmentsPageStoreApi
} from '@/features/appointments/application/state/appointments-page-store-context';
import { createIndexedDbAppointmentsRepository } from '@/features/appointments/infrastructure/indexeddb-appointments-repository';
import type { AppointmentsRepository } from '@/features/appointments/domain/appointments-repository';

interface AppointmentsFeatureBootstrapProps {
  children: ReactNode;
  repository?: AppointmentsRepository;
}

function AppointmentsInitialLoad({ children }: { children: ReactNode }) {
  const store = useAppointmentsPageStoreApi();

  useEffect(() => {
    void store.getState().loadAppointments();
  }, [store]);

  return <>{children}</>;
}

export function AppointmentsFeatureBootstrap({
  children,
  repository
}: AppointmentsFeatureBootstrapProps) {
  const repositoryRef = useRef<AppointmentsRepository>(
    repository ?? createIndexedDbAppointmentsRepository()
  );

  return (
    <AppointmentsPageStoreProvider repository={repositoryRef.current}>
      <AppointmentsInitialLoad>{children}</AppointmentsInitialLoad>
    </AppointmentsPageStoreProvider>
  );
}
