import { Dispatch, SetStateAction, useEffect, useState } from 'react';

const memoryStorage: Record<string, string> = {};
const fallbackStorage: Pick<Storage, 'getItem' | 'setItem'> = {
  getItem: (key: string) => memoryStorage[key] ?? null,
  setItem: (key: string, value: string) => {
    memoryStorage[key] = value;
  },
};

const resolveStorage = (): Pick<Storage, 'getItem' | 'setItem'> => {
  const storage = globalThis?.localStorage as Partial<Storage> | undefined;
  const hasStorageInterface =
    typeof storage?.getItem === 'function' &&
    typeof storage?.setItem === 'function';

  if (hasStorageInterface) {
    return storage as Pick<Storage, 'getItem' | 'setItem'>;
  }

  return fallbackStorage;
};

const handleStoredValue = <T>(value: T) => {
  try {
    if (typeof value === 'object') return JSON.stringify(value);
    return `${value}`;
  } catch (error) {
    console.error(error);
    return `${value}`;
  }
};

const parseStoredValue = (item: string): unknown => {
  try {
    return JSON.parse(item);
  } catch {
    if (item.toLowerCase() === 'true') {
      return true;
    } else if (item.toLowerCase() === 'false') {
      return false;
    }

    if (item === '') {
      return item;
    }

    const number = Number(item);
    if (!isNaN(number)) {
      return number;
    }

    return item;
  }
};

export const readLocalStorage = <T>(key: string, fallbackValue: T): T => {
  const storage = resolveStorage();

  try {
    const item = storage.getItem(key);
    if (item !== null) {
      return parseStoredValue(item) as T;
    }

    storage.setItem(key, handleStoredValue(fallbackValue));
    return fallbackValue;
  } catch (error) {
    console.error(error);
    return fallbackValue;
  }
};

export const writeLocalStorage = <T>(key: string, value: T): void => {
  const storage = resolveStorage();

  try {
    storage.setItem(key, handleStoredValue(value));
  } catch (error) {
    console.error(error);
  }
};

export const clearLocalStorage = (): void => {
  const storage = globalThis?.localStorage as Partial<Storage> | undefined;

  try {
    if (typeof storage?.clear === 'function') {
      storage.clear();
      return;
    }
  } catch (error) {
    console.error(error);
  }

  Object.keys(memoryStorage).forEach((key) => {
    delete memoryStorage[key];
  });
};

const useLocalStorage = <T>(
  key: string,
  value: T
): [T, Dispatch<SetStateAction<T>>] => {
  const [storedValue, setStoredValue] = useState<T>(() => readLocalStorage(key, value));

  useEffect(() => {
    if (storedValue === undefined) return;
    writeLocalStorage(key, storedValue);
  }, [key, storedValue]);

  return [storedValue, setStoredValue];
};

export default useLocalStorage;
