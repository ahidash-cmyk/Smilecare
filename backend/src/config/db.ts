import { Pool } from "pg";
import "dotenv/config";

const pool = new Pool({
  host: "aws-1-eu-west-1.pooler.supabase.com",
  port: 6543,
  user: "postgres.drkpmyhtggmpiuclided",
  password: process.env.DB_PASSWORD,
  database: "postgres",
  ssl: {
    rejectUnauthorized: false,
  },
});

export default pool;