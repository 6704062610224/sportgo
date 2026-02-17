// back_end/routes/auth.js
import express from 'express';
import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
dotenv.config();

const router = express.Router();

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY // ใช้ service_role key บน backend
);

router.post('/register', async (req, res) => {
  const { name, email, password } = req.body;

  try {
    // สร้าง user ใน auth.users
    const { data: user, error: authError } = await supabase.auth.admin.createUser({
      email,
      password,
      email_confirm: true, // ไม่ส่ง email verification
    });

    if (authError) return res.status(400).json({ error: authError.message });

    // บันทึกข้อมูลเพิ่มเติมใน table users
    const { data, error: dbError } = await supabase
      .from('users')
      .insert([{ id: user.id, name, email }]);

    if (dbError) return res.status(400).json({ error: dbError.message });

    res.json({ message: 'User created successfully', user });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
