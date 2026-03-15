import type {
  Appointment,
  AppointmentId
} from '@/features/appointments/domain/entities/appointment';
import type { AppointmentsRepository } from '@/features/appointments/domain/interfaces/appointments-repository';
import {
  openIndexedDb,
  requestToPromise,
  transactionToPromise
} from '@/shared/lib/storage/indexed-db';

const APPOINTMENTS_DB_NAME = 'horas';
const APPOINTMENTS_DB_VERSION = 1;
const APPOINTMENTS_STORE_NAME = 'appointments';

interface IndexedDbAppointmentsRepositoryOptions {
  dbName?: string;
  indexedDB?: IDBFactory;
}

class IndexedDbAppointmentsRepository implements AppointmentsRepository {
  private databasePromise: Promise<IDBDatabase> | null = null;

  constructor(private readonly options: IndexedDbAppointmentsRepositoryOptions = {}) {}

  async clear() {
    await this.withStore('readwrite', async (store) => {
      await requestToPromise(store.clear());
    });
  }

  async delete(id: AppointmentId) {
    await this.withStore('readwrite', async (store) => {
      await requestToPromise(store.delete(id));
    });
  }

  async list() {
    return this.withStore('readonly', async (store) => {
      const appointments = await requestToPromise(store.getAll());

      return appointments as Appointment[];
    });
  }

  async save(appointment: Appointment) {
    await this.withStore('readwrite', async (store) => {
      await requestToPromise(store.put(appointment));
    });

    return appointment;
  }

  private async getDatabase() {
    if (this.databasePromise === null) {
      this.databasePromise = openIndexedDb({
        indexedDB: this.options.indexedDB,
        name: this.options.dbName ?? APPOINTMENTS_DB_NAME,
        version: APPOINTMENTS_DB_VERSION,
        upgrade: (database) => {
          if (!database.objectStoreNames.contains(APPOINTMENTS_STORE_NAME)) {
            database.createObjectStore(APPOINTMENTS_STORE_NAME, { keyPath: 'id' });
          }
        }
      });
    }

    return this.databasePromise;
  }

  private async withStore<T>(
    mode: IDBTransactionMode,
    run: (store: IDBObjectStore) => Promise<T>
  ) {
    const database = await this.getDatabase();
    const transaction = database.transaction(APPOINTMENTS_STORE_NAME, mode);
    const store = transaction.objectStore(APPOINTMENTS_STORE_NAME);
    const result = await run(store);

    await transactionToPromise(transaction);

    return result;
  }
}

export const createIndexedDbAppointmentsRepository = (
  options: IndexedDbAppointmentsRepositoryOptions = {}
) => new IndexedDbAppointmentsRepository(options);
