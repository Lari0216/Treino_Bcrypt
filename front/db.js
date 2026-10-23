import { Pool } from "pg"

const pool = new Pool ({
    user: "postgres",
    host: "localhost",
    password: "senai", 
    database: "loginbcrypt", 
    port: 5432
})

export default pool; 