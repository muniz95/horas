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
│   ├── {feature}/
│   │   ├── application/
│   │   │   ├── __tests__/
│   │   │   ├── bootstrap/
│   │   │   │   └── {feature}-feature-bootstrap.tsx
│   │   │   ├── state/
│   │   │   │   ├── __tests__/
│   │   │   │   │   └── create-{feature}-page-store.test.ts
│   │   │   │   ├── {feature}-page-store-context.ts
│   │   │   │   └── create-{feature}-page-store.ts
│   │   │   └── view-model/
│   │   │       └── use-{feature}-page-view-model.ts
│   │   ├── domain/
│   │   │   ├── entities/
│   │   │   │   ├── __tests__/
│   │   │   │   │   └── entity.test.ts
│   │   │   │   └── entity.ts
│   │   │   └── interfaces/
│   │   │       └── {feature}-repository.ts
│   │   ├── infrastructure/
│   │   │   ├── __tests__/
│   │   │   │   └── indexeddb-{feature}-repository.test.ts
│   │   │   └── indexeddb-{feature}-repository.ts
│   │   ├── ui/
│   │   │   ├── __tests__/
│   │   │   │   └── {feature}-page.integration.test.tsx
│   │   │   ├── components/
│   │   │   │   └── component.tsx
│   │   │   └── pages/
│   │   │       └── {feature}-page.tsx
│   │   └── feature.tsx
├── shared/
│   ├── hooks/
│   │   ├── __tests__/
│   │   │   └── use-local-storage.test.tsx
│   │   └── use-local-storage.ts
│   ├── lib/
│   │   ├── state/
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
| `src/features/{feature}/application/` | Application-layer code that coordinates feature-related behavior between UI, domain rules, and persistence. |
| `src/features/{feature}/application/__tests__/` | Reserved area for application-level tests that span more than one application subfolder. |
| `src/features/{feature}/application/bootstrap/` | Feature bootstrap and composition entrypoints, such as provider setup and initial loading behavior. |
| `src/features/{feature}/application/state/` | Provider-scoped application state, commands, and store wiring for the feature-level page. |
| `src/features/{feature}/application/state/__tests__/` | Tests for feature-level application-state behavior and store commands. |
| `src/features/{feature}/application/view-model/` | Hooks that adapt feature application state into UI-friendly view models. |
| `src/features/{feature}/domain/` | Feature business concepts, validation rules, and repository contracts. |
| `src/features/{feature}/domain/entities/` | Models and contracts for objects used inside the feature scope. |
| `src/features/{feature}/domain/entities/__tests__/` | Tests for model behavior, validation rules, data conversion, etc. |
| `src/features/{feature}/domain/interfaces/` | Data contracts specifically meant to be implemented by other components, like repositories. |
| `src/features/{feature}/infrastructure/` | Concrete implementations of domain ports, such as IndexedDB persistence. |
| `src/features/{feature}/infrastructure/__tests__/` | Tests for infrastructure adapters and persistence behavior. |
| `src/features/{feature}/ui/` | Presentational and page components for the feature. |
| `src/features/{feature}/ui/__tests__/` | UI integration tests for the screens and interactions. |
| `src/features/{feature}/ui/components/` | Reusable components for feature-scope instance. |
| `src/features/{feature}/ui/pages/` | Implementation of screens, meant to be mapped as elements for route endpoints. |
| `src/shared/` | Reusable cross-feature code that is not owned by a single feature. |
| `src/shared/hooks/` | Generic hooks and storage helpers shared across features. |
| `src/shared/hooks/__tests__/` | Tests for shared hooks and browser helper behavior. |
| `src/shared/lib/` | Shared low-level utilities for state, storage, and test support. |
| `src/shared/lib/state/` | Shared state-management helpers used by features. |
| `src/shared/lib/storage/` | Shared browser storage helpers and infrastructure primitives. |
| `src/shared/lib/testing/` | Shared test setup and test doubles. |
| `src/shared/types/` | Cross-feature TypeScript types used by app and feature composition. |
| `src/shared/ui/` | Shared UI components and fallback pages. |
