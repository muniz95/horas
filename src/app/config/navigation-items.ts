import { featureModules } from '@/features/registry';
import type { NavigationItem } from '@/shared/types/navigation';

export const navigationItems: NavigationItem[] = featureModules.flatMap(
  ({ navigationItems: items = [] }) => items
);
