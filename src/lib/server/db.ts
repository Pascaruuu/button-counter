import { TURSO_DB_URL, TURSO_DB_AUTH_TOKEN, TURSO_TABLE_NAME } from "$env/static/private";
import { createClient } from "@libsql/client";

export const db = createClient({
  url: TURSO_DB_URL,
  authToken: TURSO_DB_AUTH_TOKEN,
});

export const tableName = TURSO_TABLE_NAME;