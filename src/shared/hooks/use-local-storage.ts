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

const useLocalStorage = <T>(
  key: string,
  value: T
): [T, Dispatch<SetStateAction<T>>] => {
  const storage = resolveStorage();
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = storage.getItem(key);
      if (item !== null) {
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
      } else {
        storage.setItem(key, handleStoredValue(value));
        return value;
      }
    } catch (error) {
      console.error(error);
      return value;
    }

    return value;
  });

  useEffect(() => {
    try {
      if (storedValue === undefined) return;
      storage.setItem(key, handleStoredValue(storedValue));
    } catch (error) {
      console.error(error);
    }
  }, [key, storage, storedValue]);

  return [storedValue, setStoredValue];
};

export default useLocalStorage;
