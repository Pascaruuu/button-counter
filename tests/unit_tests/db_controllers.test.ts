import { describe, it, expect, vi, beforeEach } from 'vitest';
import { getDataFromDB, incrementCounter } from '../../src/lib/server/db_controllers';
import { db } from '../../src/lib/server/db';

// Mock the db module
vi.mock('../../src/lib/server/db', () => ({
  db: {
    execute: vi.fn(),
  },
}));

describe('counterService', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('getDataFromDB', () => {
    it('returns formatted data when a row exists', async () => {
      // Setup: Mock a database response
      const mockTimestamp = "2024-06-01 12:00:00";
      vi.mocked(db.execute).mockResolvedValueOnce({
        rows: [{ counter: 5, last_clicked: mockTimestamp }],
        columns: [],
        rowsAffected: 0,
        lastInsertRowid: undefined,
        columnTypes: [],
        toJSON: function () {
          throw new Error('Function not implemented.');
        }
      });

      const result = await getDataFromDB();

      expect(db.execute).toHaveBeenCalledWith(expect.stringContaining('SELECT counter'));
      expect(result).toEqual({
        counter: 5,
        last_clicked: mockTimestamp,
      });
    });

    it('returns default values when the table is empty', async () => {
      // Setup: Mock empty rows
      vi.mocked(db.execute).mockResolvedValueOnce({
        rows: [],
        columns: [],
        rowsAffected: 0,
        lastInsertRowid: undefined,
        columnTypes: [],
        toJSON: function () {
          throw new Error('Function not implemented.');
        }
      });

      const result = await getDataFromDB();

      expect(result).toEqual({
        counter: 0,
        last_clicked: null,
      });
    });
  });

  describe('incrementCounter', () => {
    it('successfully increments the counter', async () => {
      // Setup: Mock rowsAffected > 0
      vi.mocked(db.execute).mockResolvedValueOnce({
        rows: [],
        columns: [],
        rowsAffected: 1,
        lastInsertRowid: undefined,
        columnTypes: [],
        toJSON: function () {
          throw new Error('Function not implemented.');
        }
      });

      await expect(incrementCounter()).resolves.not.toThrow();
      expect(db.execute).toHaveBeenCalledWith(expect.stringContaining('INSERT INTO button_counters'));
    });

    it('throws an error if rowsAffected is 0', async () => {
      // Setup: Mock failure
      vi.mocked(db.execute).mockResolvedValueOnce({
        rows: [],
        columns: [],
        rowsAffected: 0,
        lastInsertRowid: undefined,
        columnTypes: [],
        toJSON: function () {
          throw new Error('Function not implemented.');
        }
      });

      await expect(incrementCounter()).rejects.toThrow("Failed to update counter");
    });
  });
});