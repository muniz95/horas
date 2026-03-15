interface OpenIndexedDbOptions {
  indexedDB?: IDBFactory;
  name: string;
  upgrade?: (database: IDBDatabase) => void;
  version: number;
}

const getRequestError = (error: DOMException | null, fallbackMessage: string) =>
  error ?? new Error(fallbackMessage);

export const openIndexedDb = ({
  indexedDB = globalThis.indexedDB,
  name,
  upgrade,
  version
}: OpenIndexedDbOptions): Promise<IDBDatabase> => {
  if (!indexedDB) {
    return Promise.reject(new Error('IndexedDB is not available in this environment.'));
  }

  return new Promise((resolve, reject) => {
    const request = indexedDB.open(name, version);

    request.onupgradeneeded = () => {
      upgrade?.(request.result);
    };

    request.onerror = () => {
      reject(getRequestError(request.error, `Failed to open IndexedDB database "${name}".`));
    };

    request.onblocked = () => {
      reject(new Error(`Opening IndexedDB database "${name}" was blocked.`));
    };

    request.onsuccess = () => {
      resolve(request.result);
    };
  });
};

export const requestToPromise = <T>(request: IDBRequest<T>): Promise<T> =>
  new Promise((resolve, reject) => {
    request.onsuccess = () => {
      resolve(request.result);
    };

    request.onerror = () => {
      reject(getRequestError(request.error, 'IndexedDB request failed.'));
    };
  });

export const transactionToPromise = (transaction: IDBTransaction): Promise<void> =>
  new Promise((resolve, reject) => {
    transaction.oncomplete = () => {
      resolve();
    };

    transaction.onerror = () => {
      reject(getRequestError(transaction.error, 'IndexedDB transaction failed.'));
    };

    transaction.onabort = () => {
      reject(getRequestError(transaction.error, 'IndexedDB transaction was aborted.'));
    };
  });
