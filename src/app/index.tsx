import { AppProviders } from '@/app/providers/app-providers';
import { AppRouter } from '@/app/router/app-router';
import { AppShellLayout } from '@/widgets/app-shell/ui/app-shell-layout';

export default function App() {
  return (
    <AppProviders>
      <AppShellLayout>
        <AppRouter />
      </AppShellLayout>
    </AppProviders>
  );
}
