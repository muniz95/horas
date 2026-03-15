# horas

React + TypeScript single-page app powered by Vite, Mantine, and a web app manifest for PWA installs.

## Commands

```bash
# install dependencies
npm install

# run local dev server
npm run dev

# build for production
npm run build

# run tests
npm test

# run tests with coverage
npm run test:coverage

# preview production build
npm run preview
```

## Source Structure

```text
src/
├── app/
│   ├── config/
│   │   └── navigation-items.ts
│   ├── hooks/
│   │   └── use-app.ts
│   ├── providers/
│   │   └── app-providers.tsx
│   ├── router/
│   │   ├── __tests__/
│   │   │   ├── app-router.integration.test.tsx
│   │   │   └── route-config.test.tsx
│   │   ├── app-router.tsx
│   │   ├── registry.ts
│   │   ├── route-config.tsx
│   │   └── types.ts
│   ├── shell/
│   │   ├── app-shell-header.tsx
│   │   ├── app-shell-layout.tsx
│   │   └── app-shell-navbar.tsx
│   └── index.tsx
├── features/
│   ├── appointments/
│   │   ├── application/
│   │   │   ├── __tests__/
│   │   │   ├── bootstrap/
│   │   │   │   └── appointments-feature-bootstrap.tsx
│   │   │   ├── state/
│   │   │   │   ├── __tests__/
│   │   │   │   │   └── create-appointments-page-store.test.ts
│   │   │   │   ├── appointments-page-store-context.ts
│   │   │   │   └── create-appointments-page-store.ts
│   │   │   └── view-model/
│   │   │       └── use-appointments-page-view-model.ts
│   │   ├── domain/
│   │   │   ├── __tests__/
│   │   │   │   └── appointment.test.ts
│   │   │   ├── appointment.ts
│   │   │   └── appointments-repository.ts
│   │   ├── infrastructure/
│   │   │   ├── __tests__/
│   │   │   │   └── indexeddb-appointments-repository.test.ts
│   │   │   └── indexeddb-appointments-repository.ts
│   │   ├── ui/
│   │   │   ├── __tests__/
│   │   │   │   └── appointments-page.integration.test.tsx
│   │   │   ├── appointment-card.tsx
│   │   │   └── appointments-page.tsx
│   │   └── feature.tsx
├── shared/
│   ├── hooks/
│   │   ├── __tests__/
│   │   │   └── use-local-storage.test.tsx
│   │   └── use-local-storage.ts
│   ├── lib/
│   │   ├── state/
│   │   │   ├── create-feature-store.ts
│   │   │   └── create-store-context.tsx
│   │   ├── storage/
│   │   │   └── indexed-db.ts
│   │   └── testing/
│   │       ├── fake-indexeddb.ts
│   │       └── setup.ts
│   ├── types/
│   │   ├── feature.ts
│   │   └── navigation.ts
│   └── ui/
│       └── not-found-page.tsx
├── main.tsx
└── vite-env.d.ts
```

## Folder Responsibilities

| Folder | Purpose |
| --- | --- |
| `src/app/` | App-level composition, routing, shell layout, and cross-feature wiring. |
| `src/app/config/` | Static app configuration values used by the shell and navigation. |
| `src/app/hooks/` | Hooks that coordinate app-wide UI behavior. |
| `src/app/providers/` | Top-level React providers applied around the app. |
| `src/app/router/` | Route definitions, router components, and router-focused tests. |
| `src/app/router/__tests__/` | Integration and unit tests for route composition and navigation behavior. |
| `src/app/shell/` | Shared layout components such as header, navbar, and shell containers. |
| `src/features/` | Feature modules registered into the app. |
| `src/features/appointments/` | Appointments feature organized by layered responsibilities. |
| `src/features/appointments/application/` | Application-layer code that coordinates appointments behavior between UI, domain rules, and persistence. |
| `src/features/appointments/application/__tests__/` | Reserved area for application-level appointments tests that span more than one application subfolder. |
| `src/features/appointments/application/bootstrap/` | Feature bootstrap and composition entrypoints, such as provider setup and initial loading behavior. |
| `src/features/appointments/application/state/` | Provider-scoped application state, commands, and store wiring for the appointments page. |
| `src/features/appointments/application/state/__tests__/` | Tests for appointments application-state behavior and store commands. |
| `src/features/appointments/application/view-model/` | Hooks that adapt appointments application state into UI-friendly view models. |
| `src/features/appointments/domain/` | Appointments business concepts, validation rules, and repository contracts. |
| `src/features/appointments/domain/__tests__/` | Tests for appointments domain rules and validation behavior. |
| `src/features/appointments/infrastructure/` | Concrete implementations of appointments domain ports, such as IndexedDB persistence. |
| `src/features/appointments/infrastructure/__tests__/` | Tests for appointments infrastructure adapters and persistence behavior. |
| `src/features/appointments/ui/` | Presentational and page components for the appointments feature. |
| `src/features/appointments/ui/__tests__/` | UI integration tests for the appointments screens and interactions. |
| `src/shared/` | Reusable cross-feature code that is not owned by a single feature. |
| `src/shared/hooks/` | Generic hooks and storage helpers shared across features. |
| `src/shared/hooks/__tests__/` | Tests for shared hooks and browser helper behavior. |
| `src/shared/lib/` | Shared low-level utilities for state, storage, and test support. |
| `src/shared/lib/state/` | Shared state-management helpers used by features. |
| `src/shared/lib/storage/` | Shared browser storage helpers and infrastructure primitives. |
| `src/shared/lib/testing/` | Shared test setup and test doubles. |
| `src/shared/types/` | Cross-feature TypeScript types used by app and feature composition. |
| `src/shared/ui/` | Shared UI components and fallback pages. |
