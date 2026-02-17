import React, { useState } from 'react';
import { Link,useNavigate } from 'react-router-dom';
import { supabase } from "../../supabaseClient";

const RegisterPage = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const navigate = useNavigate();
  const [successMsg, setSuccessMsg] = useState('');

  // const handleRegister = async (e) => {
  //   e.preventDefault();
  //   setLoading(true);
  //   setErrorMsg('');

  //   // 1️⃣ ใช้ Supabase Auth สร้างผู้ใช้
  //   const { user, session, error } = await supabase.auth.signUp({
  //       email,
  //       password,
  //       options: {
  //         emailRedirectTo: 'http://localhost:5173/login',
  //         data: {
  //           name: name
  //         }
  //       }
  //   });

  //   if (error) {
  //     setErrorMsg(error.message);
  //     setLoading(false);
  //     return;
  //   }

  //   // 2️⃣ บันทึกข้อมูลเพิ่มเติม (เช่น name) ลง table users
  //   const { data, error: dbError } = await supabase
  //     .from('users')  // table ที่คุณสร้างใน Supabase
  //     .insert([{ id: user.id, name, email }]);

  //   if (dbError) {
  //     setErrorMsg(dbError.message);
  //   } else {
  //     setSuccessMsg('Register successful! Please check your email to confirm.');
  //     setTimeout(() => {
  //       navigate('/login');
  //     }, 1500);
  //   }

  //   setLoading(false);
  // };
  const handleRegister = async (e) => {
  e.preventDefault();
  setLoading(true);
  setErrorMsg('');
  setSuccessMsg('');

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: 'http://localhost:5175/login',
      data: {
        username: username
      }
    }
  });

  if (error) {
    setErrorMsg(error.message);
    setLoading(false);
    return;
  }

  const user = data.user;

  const { error: dbError } = await supabase
    .from('users')
    .insert([
      {
        id: user.id,
        username: username,
        email: email
      }
    ]);

  if (dbError) {
    setErrorMsg(dbError.message);
  } else {
    setSuccessMsg('Register successful! Please check your email.');
    setTimeout(() => navigate('/login'), 1500);
  }

  setLoading(false);
};


  return (
    <div className="flex items-center justify-center min-h-[90vh] bg-gray-50 p-4">
      <div className="bg-white p-10 rounded-[40px] shadow-sm w-full max-w-md border border-gray-100">
        <h2 className="text-3xl font-bold text-center mb-2">Sign up</h2>
        <p className="text-center text-gray-400 text-sm mb-8">Create an account to start booking</p>
        
        {errorMsg && <p className="text-red-500 text-sm mb-2">{errorMsg}</p>}
        {successMsg && (
          <p className="text-green-500 text-sm mb-2 text-center">
            {successMsg}
          </p>
        )}

        <form className="space-y-4" onSubmit={handleRegister}>
          <div>
            <label className="block text-sm font-medium text-gray-700 ml-1 mb-1">Name / Surname</label>
            <input 
              type="text" 
              placeholder="Your Name"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full p-4 bg-gray-50 rounded-2xl border border-gray-100 outline-none focus:border-teal-500 transition-all" 
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 ml-1 mb-1">Email address</label>
            <input 
              type="email" 
              placeholder="example@gmail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-4 bg-gray-50 rounded-2xl border border-gray-100 outline-none focus:border-teal-500 transition-all" 
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 ml-1 mb-1">Password</label>
            <input 
              type="password" 
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-4 bg-gray-50 rounded-2xl border border-gray-100 outline-none focus:border-teal-500 transition-all" 
              required
            />
          </div>

          <div className="flex items-center gap-2 px-1">
            <input type="checkbox" id="terms" className="rounded border-gray-300 text-teal-600 focus:ring-teal-500" required/>
            <label htmlFor="terms" className="text-xs text-gray-500">
              I agree to the <span className="text-teal-600 underline cursor-pointer">Terms, Service and Privacy Policy</span>
            </label>
          </div>

          <button type="submit" className="w-full bg-black text-white p-4 rounded-2xl font-bold mt-4 hover:opacity-90 transition-opacity">
            {loading ? 'Registering...' : 'CREATE AN ACCOUNT'}
          </button>
        </form>

        <p className="text-center text-sm text-gray-500 mt-4">
          Already have an account? <Link to="/login" className="text-teal-600 font-bold hover:underline">Login for free</Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;
