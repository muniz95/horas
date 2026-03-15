import type { AppRoute } from '@/app/router/types';
import { featureModules } from '@/app/router/registry';
import NotFoundPage from '@/shared/ui/not-found-page';

const featureRoutes = featureModules.flatMap((feature) => feature.routes);

export const appRoutes: AppRoute[] = [
  ...featureRoutes,
  {
    path: '*',
    element: <NotFoundPage />
  }
];
