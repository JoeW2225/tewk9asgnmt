import pg from "pg";

let db: null | pg.Pool
//^ added as per Sam's advice due to TS throwing error that db was not a defined type

export const connect = () => {
    if(!db) {
        db = new pg.Pool({connectionString: process.env.DB_URL})
        return db
    }
    return db
}
