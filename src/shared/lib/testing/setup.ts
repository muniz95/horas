import '@testing-library/jest-dom/vitest';
import { cleanup } from '@testing-library/react';
import { afterEach, beforeEach, vi } from 'vitest';
import {
  createFakeIndexedDb,
  resetFakeIndexedDb
} from '@/shared/lib/testing/fake-indexeddb';

Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: vi.fn().mockImplementation((query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
    addListener: vi.fn(),
    removeListener: vi.fn()
  }))
});

class ResizeObserverMock {
  disconnect() {}
  observe() {}
  unobserve() {}
}

class IntersectionObserverMock {
  disconnect() {}
  observe() {}
  takeRecords() {
    return [];
  }
  unobserve() {}
}

vi.stubGlobal('ResizeObserver', ResizeObserverMock);
vi.stubGlobal('IntersectionObserver', IntersectionObserverMock);
vi.stubGlobal('scrollTo', vi.fn());
vi.stubGlobal('indexedDB', createFakeIndexedDb());

beforeEach(() => {
  resetFakeIndexedDb();
});

afterEach(() => {
  cleanup();
});
