import { appointmentsFeature } from '@/features/appointments/feature';
import { profileFeature } from '@/features/profile/feature';
import type { FeatureModule } from '@/features/types';

export const featureModules: FeatureModule[] = [appointmentsFeature, profileFeature];
