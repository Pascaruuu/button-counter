// unit testing all the functions in page.server.ts
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { load, actions } from '../../src/routes/+page.server';
import {
  getDataFromDB,
  incrementCounter,
} from '../../src/lib/server/db_controllers';
import { fail } from '@sveltejs/kit';

// Mock the db_controllers module
vi.mock('../../src/lib/server/db_controllers', () => ({
  getDataFromDB: vi.fn(),
  incrementCounter: vi.fn(),
}));

describe('page.server', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  // test the load function to ensure it calls getDataFromDB and returns the correct data
  describe('load function', () => {
    it('returns count from getDataFromDB', async () => {
      const mockCount = { counter: 5, last_clicked: '2024-06-01 12:00:00' };
      vi.mocked(getDataFromDB).mockResolvedValueOnce(mockCount);

      const mockEvent = {} as any;
      const result = await load(mockEvent);

      expect(getDataFromDB).toHaveBeenCalled();
      expect(result).toEqual({ count: mockCount });
    });
  });

  describe('actions', () => {
    it('incrementCounter is called and returns success', async () => {
      // Setup mock to resolve successfully
      vi.mocked(incrementCounter).mockResolvedValueOnce(undefined);

      // Call the default action
      const result = await actions.default();

      expect(incrementCounter).toHaveBeenCalledTimes(1);
      expect(result).toEqual({ success: true });
    });

    it('returns a 500 error when incrementCounter fails', async () => {
      // Setup mock to throw an error
      vi.mocked(incrementCounter).mockRejectedValueOnce(new Error('DB Error'));

      const result = await actions.default();

      // Verify the failure response
      expect(incrementCounter).toHaveBeenCalledTimes(1);
      expect(result).toEqual(
        fail(500, { message: 'Could not update counter' })
      );
    });
  });
});
