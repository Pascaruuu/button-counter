import { describe, it, expect, vi, beforeEach } from 'vitest';
import * as libsql from '@libsql/client';

// 1. Create your test data in a hoisted block
const envVars = vi.hoisted(() => ({
  URL: 'https://turso.test',
  TOKEN: 'token-abc'
}));

// 2. Mock the external library
vi.mock('@libsql/client', () => ({
  createClient: vi.fn(() => ({ __isFakeClient: true }))
}));

// 3. Mock the environment variables using the hoisted data
vi.mock('$env/static/private', () => ({
  TURSO_DB_URL: envVars.URL,
  TURSO_DB_AUTH_TOKEN: envVars.TOKEN
}));

describe('src/lib/server/db', () => {
  beforeEach(() => {
    vi.resetModules();
    vi.clearAllMocks();
  });

  it('calls createClient with TURSO env vars', async () => {
    // Import the DB file INSIDE the test to ensure it picks up the mocks
    const { db } = await import('../../src/lib/server/db');
    
    expect(libsql.createClient).toHaveBeenCalledWith({
      url: 'https://turso.test',
      authToken: 'token-abc'
    });
    expect(db).toEqual({ __isFakeClient: true });
  });
});