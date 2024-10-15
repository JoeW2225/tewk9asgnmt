import pg from "pg";

let db: null | pg.Pool
//^ added

export const connect = () => {
    if(!db) {
        db = new pg.Pool({connectionString: process.env.DB_URL})
        return db
    }
    return db
}
