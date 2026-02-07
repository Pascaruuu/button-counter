import { db, tableName } from "./db";

/* Output format:
{
    getDataFromDB(): {
        counter: number,
        created_at: string (eg, "2024-06-01 12:00:00")
    },
    incrementCounter(): void
}
*/

export const getDataFromDB = async () => {
    const res = await db.execute(`SELECT counter, last_clicked FROM ${tableName} LIMIT 1`);
    db.close();
    if (res.rows.length === 0) {
        return {
            counter: 0,
            last_clicked: NaN
        };
    }
    
    return {
        counter: res.rows[0].counter as number,
        last_clicked: res.rows[0].last_clicked as string
    };
};

export const incrementCounter = async () => {
    const res = await db.execute(`INSERT INTO ${tableName} (id, counter) VALUES (1, 1) ON CONFLICT (id) DO UPDATE SET counter = counter + 1`);
    if (res.rowsAffected === 0) {
        db.close();
        throw new Error("Failed to update counter");
    } else {
        db.close();
    }
}