// const express = require('express');
// const mysql = require('mysql2');
// const cors = require('cors');
// require('dotenv').config();

// const app = express();

// // 1. แก้ปัญหาการเชื่อมต่อระหว่างหน้าจอ (CORS)
// app.use(cors()); 
// app.use(express.json()); // ให้เซิร์ฟเวอร์อ่านข้อมูล JSON ที่ส่งมาจากหน้าจองสนามได้

// // 2. ตั้งค่า Data Tier (การเชื่อมต่อ MySQL)
// const db = mysql.createConnection({
//   host: 'localhost',
//   user: 'root',      // ใส่ username ของ MySQL คุณ
//   password: 'your_password', // ใส่ password ของ MySQL คุณ
//   database: 'sportgo_db'    // ชื่อฐานข้อมูลที่คุณตั้งไว้
// });

// db.connect((err) => {
//   if (err) {
//     console.error('Error connecting to MySQL:', err);
//     return;
//   }
//   console.log('Connected to MySQL Database!');
// });

// // 3. ตัวอย่าง API สำหรับชั้น Business Logic (เช่น ดึงรายการสนาม)
// app.get('/api/courts', (req, res) => {
//   const sql = "SELECT * FROM SportFields";
//   db.query(sql, (err, result) => {
//     if (err) {
//       // ถ้าเกิด Error 500 จะมาเช็คได้ที่นี่
//       return res.status(500).json({ error: err.message });
//     }
//     res.json(result);
//   });
// });

// const PORT = 8000;
// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });






// เปลี่ยนจาก mysql เป็น pg
// const { Pool } = require('pg');

// // การเชื่อมต่อสำหรับ PostgreSQL Online (เช่น Supabase)
// const pool = new Pool({
//   connectionString: 'postgres://postgres:[รหัสผ่าน]@db.xxxx.supabase.co:5432/postgres',
//   ssl: {
//     rejectUnauthorized: false // จำเป็นสำหรับการเชื่อมต่อแบบ Online ที่มีความปลอดภัย
//   }
// });

// module.exports = pool;








// const express = require('express');
// const cors = require('cors');
// const pool = require('./db'); // ดึงการเชื่อมต่อจาก db.js ที่คุณเพิ่งทำ
// require('dotenv').config();

// const app = express();
// app.use(cors());
// app.use(express.json());

// // API สำหรับดึงข้อมูลสนามทั้งหมดจาก Supabase
// app.get('/api/courts', async (req, res) => {
//   try {
//     const result = await pool.query('SELECT * FROM courts ORDER BY id ASC');
//     res.json(result.rows); // PostgreSQL คืนค่าข้อมูลใน rows
//   } catch (err) {
//     console.error(err.message);
//     res.status(500).json({ error: "Server Error: ไม่สามารถดึงข้อมูลสนามได้" });
//   }
// });

// const PORT = process.env.PORT || 8000;
// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });


// app.use(cors({
//   origin: 'http://localhost:5173', // หรือ domain ของ React
//   credentials: true
// }));

// server.js

// import express from 'express';
// import cors from 'cors';
// import dotenv from 'dotenv';
// import { createClient } from '@supabase/supabase-js';

// dotenv.config();
// const app = express();

// // 1️⃣ ตั้งค่า CORS ให้ frontend ติดต่อได้
// app.use(cors({ origin: 'http://localhost:5173', credentials: true }));
// app.use(express.json());

// // 2️⃣ สร้าง Supabase client ด้วย service_role key (เฉพาะ backend)
// const supabase = createClient(
//   process.env.SUPABASE_URL,
//   process.env.SUPABASE_SERVICE_ROLE_KEY
// );

// // 3️⃣ Route สำหรับ register user
// app.post('/api/register', async (req, res) => {
//   const { name, email, password } = req.body;

//   try {
//     // สร้าง user โดยไม่ส่ง email verification
//     const { data: user, error: authError } = await supabase.auth.admin.createUser({
//       email,
//       password,
//       email_confirm: true
//     });

//     if (authError) return res.status(400).json({ error: authError.message });

//     // บันทึกข้อมูลเพิ่มเติมใน table users
//     const { data, error: dbError } = await supabase
//       .from('users')
//       .insert([{ id: user.id, name, email }]);

//     if (dbError) return res.status(400).json({ error: dbError.message });

//     res.json({ message: 'User created successfully', user });
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });

// const PORT = process.env.PORT || 8000;
// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { createClient } from '@supabase/supabase-js';
import pool from './db.js'; // ถ้าคุณยังต้องใช้ pool.query

dotenv.config();
const app = express();

// 1️⃣ ตั้งค่า CORS ให้ frontend ติดต่อได้
// app.use(cors({ origin: 'http://localhost:5173', credentials: true }));
app.use(cors({
  origin: [
    'http://localhost:5173',
    'http://localhost:5175',
  ],
  credentials: true,
}));
app.use(express.json());

// 2️⃣ สร้าง Supabase client ด้วย service_role key (เฉพาะ backend)
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

// =======================
// Route สำหรับดึงข้อมูลสนาม (PostgreSQL)
app.get('/api/courts', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM courts ORDER BY id ASC');
    res.json(result.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Server Error: ไม่สามารถดึงข้อมูลสนามได้" });
  }
});

// =======================
// Route register
app.post('/api/register', async (req, res) => {
  const { name, email, password } = req.body;

  try {
    // สร้าง user (ไม่ต้องยืนยัน email เพราะใช้ service_role)
    const { data: user, error: authError } = await supabase.auth.admin.createUser({
      email,
      password,
      email_confirm: true
    });

    if (authError) return res.status(400).json({ error: authError.message });

    // บันทึกข้อมูลเพิ่มเติมใน table users
    const { data, error: dbError } = await supabase
      .from('users') // table ของคุณ
      .insert([{ id: user.id, username, email }]);

    if (dbError) return res.status(400).json({ error: dbError.message });

    res.json({ message: 'User created successfully', user });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// =======================
// Route login
app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) return res.status(400).json({ error: error.message });

    res.json({ message: 'Login successful', user: data.user });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// =======================
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
