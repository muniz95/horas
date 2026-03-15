import { describe, expect, it } from 'vitest';
import { featureModules } from '@/app/router/registry';
import { appRoutes } from '@/app/router/route-config';

describe('route config', () => {
  it('includes all feature routes and wildcard fallback', () => {
    const featurePaths = featureModules.flatMap((feature) => feature.routes.map((route) => route.path));
    const paths = appRoutes.map((route) => route.path);

    expect(paths).toEqual([...featurePaths, '*']);
  });
});
