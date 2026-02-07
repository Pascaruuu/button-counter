/*
File usage:
    This file is used to reset the counter in the database. 
    It deletes all rows from the table and resets the auto-incrementing ID sequence. 
    This is useful for testing purposes, allowing you to start with a clean slate 
    without having to manually delete the database or table.
How to run:
    1. Make sure you have the necessary environment variables set in your .env file (TURSO_DB_URL, TURSO_DB_AUTH_TOKEN, TURSO_TABLE_NAME).
    2. Run this file using tsx:
       npm run reset-db
       or
       npx tsx src/lib/server/db_dev.ts
    3. After running, the counter will be reset to its initial state (counter = 0).
    4. If you get an error, make sure to install "npm install dotenv"
*/

import { createClient } from "@libsql/client";
import "dotenv/config"; // This loads your .env file automatically

// Manually pull from process.env instead of SvelteKit's $env
const db = createClient({
  url: process.env.TURSO_DB_URL!,
  authToken: process.env.TURSO_DB_AUTH_TOKEN!,
});

const resetCounter = async () => {
    console.log("Attempting to reset counter...");
    // Note: Use individual executes or a transaction for multiple statements
    await db.execute("DELETE FROM button_counters");
    await db.execute("DELETE FROM sqlite_sequence WHERE name = 'button_counters'");
}

resetCounter()
  .then(() => console.log("✅ Counter reset successfully"))
  .catch((err) => console.error("❌ Error resetting counter:", err))
  .finally(() => process.exit());
