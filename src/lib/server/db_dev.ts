import { db } from "./db";

/*
File usage:
    This file is used to reset the counter in the database. 
    It deletes all rows from the table and resets the auto-incrementing ID sequence. 
    This is useful for testing purposes, allowing you to start with a clean slate 
    without having to manually delete the database or table.
How to run:
    1. Make sure you have the necessary environment variables set in your .env file (TURSO_DB_URL, TURSO_DB_AUTH_TOKEN, TURSO_TABLE_NAME).
    2. Run this file using Node.js:
       node src/lib/server/db_dev.ts
    3. After running, the counter will be reset to its initial state (counter = 0).
*/

const resetCounter = async () => {
    await db.execute(`
        DELETE FROM button_counters; 
        DELETE FROM sqlite_sequence WHERE name = 'button_counters';`
    );
}

resetCounter().then(() => {
    console.log("Counter reset successfully");
}).catch((err) => {
    console.error("Error resetting counter:", err);
}).finally(() => {
    process.exit();
});