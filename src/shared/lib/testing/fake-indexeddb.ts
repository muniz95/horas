type FakeKey = number | string;

interface FakeObjectStoreState {
  keyPath: string;
  records: Map<FakeKey, unknown>;
}

interface FakeDatabaseState {
  name: string;
  objectStores: Map<string, FakeObjectStoreState>;
  version: number;
}

interface FakeRequest<T> extends Partial<IDBRequest<T>> {
  error: DOMException | null;
  onerror: ((event: Event) => void) | null;
  onsuccess: ((event: Event) => void) | null;
  result: T;
}

interface FakeOpenRequest<T> {
  error: DOMException | null;
  onblocked: ((event: Event) => void) | null;
  onerror: ((event: Event) => void) | null;
  onsuccess: ((event: Event) => void) | null;
  onupgradeneeded: ((event: Event) => void) | null;
  result: T;
}

interface FakeTransaction {
  error: DOMException | null;
  onabort: ((event: Event) => void) | null;
  oncomplete: ((event: Event) => void) | null;
  onerror: ((event: Event) => void) | null;
  objectStore: (name: string) => IDBObjectStore;
}

const databases = new Map<string, FakeDatabaseState>();

const cloneValue = <T,>(value: T): T => {
  if (typeof structuredClone === 'function') {
    return structuredClone(value);
  }

  return JSON.parse(JSON.stringify(value)) as T;
};

const createEvent = (target: EventTarget) => ({ target } as unknown as Event);

const toDomException = (error: unknown, fallbackMessage: string) => {
  if (error instanceof DOMException) {
    return error;
  }

  if (error instanceof Error) {
    return new DOMException(error.message, 'UnknownError');
  }

  return new DOMException(fallbackMessage, 'UnknownError');
};

const createDomStringList = (values: string[]): DOMStringList =>
  ({
    contains: (value: string) => values.includes(value),
    item: (index: number) => values[index] ?? null,
    get length() {
      return values.length;
    },
    [Symbol.iterator]: function* iterator() {
      yield* values;
    }
  }) as DOMStringList;

const createRequest = <T,>() =>
  ({
    error: null,
    onerror: null,
    onsuccess: null
  }) as FakeRequest<T>;

const createTransaction = (databaseState: FakeDatabaseState): FakeTransaction => {
  let pendingRequests = 0;
  let completed = false;

  const completeTransaction = () => {
    if (completed || pendingRequests > 0) {
      return;
    }

    completed = true;
    setTimeout(() => {
      transaction.oncomplete?.(createEvent(transaction as unknown as EventTarget));
    }, 0);
  };

  const runRequest = <T,>(task: () => T): IDBRequest<T> => {
    const request = createRequest<T>();

    pendingRequests += 1;

    queueMicrotask(() => {
      try {
        request.result = task();
        request.onsuccess?.(createEvent(request as unknown as EventTarget));
      } catch (error) {
        const requestError = toDomException(error, 'IndexedDB request failed.');

        request.error = requestError;
        transaction.error = requestError;
        request.onerror?.(createEvent(request as unknown as EventTarget));
        transaction.onerror?.(createEvent(transaction as unknown as EventTarget));
      } finally {
        pendingRequests -= 1;
        completeTransaction();
      }
    });

    return request as IDBRequest<T>;
  };

  const objectStore = (name: string) => {
    const state = databaseState.objectStores.get(name);

    if (!state) {
      throw new Error(`Object store "${name}" does not exist.`);
    }

    return {
      clear: () =>
        runRequest(() => {
          state.records.clear();
          return undefined;
        }),
      delete: (key: IDBValidKey) =>
        runRequest(() => {
          state.records.delete(key as FakeKey);
          return undefined;
        }),
      getAll: () =>
        runRequest(() =>
          Array.from(state.records.values()).map((record) => cloneValue(record))
        ),
      keyPath: state.keyPath,
      put: (value: unknown) =>
        runRequest(() => {
          const record = cloneValue(value);
          const key = (record as Record<string, FakeKey>)[state.keyPath];

          if (key === undefined || key === null) {
            throw new Error(`Missing key path "${state.keyPath}".`);
          }

          state.records.set(key, record);
          return key;
        })
    } as IDBObjectStore;
  };

  const transaction: FakeTransaction = {
    error: null,
    onabort: null,
    oncomplete: null,
    onerror: null,
    objectStore
  };

  return transaction;
};

const createDatabase = (state: FakeDatabaseState): IDBDatabase =>
  ({
    close: () => undefined,
    createObjectStore: (name: string, options?: IDBObjectStoreParameters) => {
      const keyPath = typeof options?.keyPath === 'string' ? options.keyPath : 'id';
      const existingState = state.objectStores.get(name);

      if (existingState) {
        return {
          keyPath: existingState.keyPath
        } as IDBObjectStore;
      }

      state.objectStores.set(name, {
        keyPath,
        records: new Map()
      });

      return {
        keyPath
      } as IDBObjectStore;
    },
    get name() {
      return state.name;
    },
    get objectStoreNames() {
      return createDomStringList(Array.from(state.objectStores.keys()));
    },
    transaction: (_storeName: string | string[]) =>
      createTransaction(state) as IDBTransaction,
    get version() {
      return state.version;
    }
  }) as IDBDatabase;

export const createFakeIndexedDb = (): IDBFactory =>
  ({
    deleteDatabase: (name: string) => {
      const request = createRequest<undefined>();

      queueMicrotask(() => {
        databases.delete(name);
        request.result = undefined;
        request.onsuccess?.(createEvent(request as unknown as EventTarget));
      });

      return request as unknown as IDBOpenDBRequest;
    },
    open: (name: string, version?: number) => {
      const request = createRequest<IDBDatabase>() as FakeOpenRequest<IDBDatabase>;

      request.onblocked = null;
      request.onupgradeneeded = null;

      queueMicrotask(() => {
        try {
          const nextVersion = version ?? 1;
          const existingState = databases.get(name);

          if (existingState && nextVersion < existingState.version) {
            throw new Error('IndexedDB version cannot be downgraded.');
          }

          const databaseState =
            existingState ??
            {
              name,
              objectStores: new Map(),
              version: nextVersion
            };

          const requiresUpgrade =
            existingState === undefined || nextVersion > existingState.version;

          databaseState.version = nextVersion;
          databases.set(name, databaseState);

          request.result = createDatabase(databaseState);

          if (requiresUpgrade) {
            request.onupgradeneeded?.(
              createEvent(request as unknown as EventTarget)
            );
          }

          request.onsuccess?.(createEvent(request as unknown as EventTarget));
        } catch (error) {
          request.error = toDomException(error, 'IndexedDB open failed.');
          request.onerror?.(createEvent(request as unknown as EventTarget));
        }
      });

      return request as unknown as IDBOpenDBRequest;
    }
  }) as IDBFactory;

export const resetFakeIndexedDb = () => {
  databases.clear();
};
