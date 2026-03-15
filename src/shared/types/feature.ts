import type { AppRoute } from '@/app/router/types';
import type { NavigationItem } from '@/shared/types/navigation';

export interface FeatureModule {
  key: string;
  navigationItems?: NavigationItem[];
  routes: AppRoute[];
}
