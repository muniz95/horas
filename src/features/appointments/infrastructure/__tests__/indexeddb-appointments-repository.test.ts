import { describe, expect, it } from 'vitest';
import { createIndexedDbAppointmentsRepository } from '@/features/appointments/infrastructure/indexeddb-appointments-repository';

describe('IndexedDbAppointmentsRepository', () => {
  it('lists, saves, deletes, and clears appointments', async () => {
    const repository = createIndexedDbAppointmentsRepository({
      dbName: 'appointments-test-db'
    });

    await repository.save({
      id: 'appointment-1',
      startDate: '2026-01-01',
      startTime: '08:00',
      endDate: '2026-01-01',
      endTime: '09:00'
    });
    await repository.save({
      id: 'appointment-2',
      startDate: '2026-01-02',
      startTime: '10:00',
      endDate: '2026-01-02',
      endTime: '11:00'
    });

    expect(await repository.list()).toEqual([
      {
        id: 'appointment-1',
        startDate: '2026-01-01',
        startTime: '08:00',
        endDate: '2026-01-01',
        endTime: '09:00'
      },
      {
        id: 'appointment-2',
        startDate: '2026-01-02',
        startTime: '10:00',
        endDate: '2026-01-02',
        endTime: '11:00'
      }
    ]);

    await repository.delete('appointment-1');
    expect(await repository.list()).toEqual([
      {
        id: 'appointment-2',
        startDate: '2026-01-02',
        startTime: '10:00',
        endDate: '2026-01-02',
        endTime: '11:00'
      }
    ]);

    await repository.clear();
    expect(await repository.list()).toEqual([]);
  });
});
