const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false // จำเป็นสำหรับการเชื่อมต่อฐานข้อมูลออนไลน์
  }
});

pool.on('connect', () => {
  console.log('Connected to Supabase (PostgreSQL) successfully!');
});

module.exports = pool;
