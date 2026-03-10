import { Route, Routes } from 'react-router-dom';
import { appRoutes } from '@/app/router/route-config';

export function AppRouter() {
  return (
    <Routes>
      {appRoutes.map((route) => (
        <Route key={route.path} path={route.path} element={route.element} />
      ))}
    </Routes>
  );
}
