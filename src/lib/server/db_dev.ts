import { db, tableName } from "./db";

const resetCounter = async () => {
    await db.execute(`
        DELETE FROM ${tableName}; 
        DELETE FROM sqlite_sequence WHERE name = '${tableName}';`
    );

    db.close();
}

resetCounter();