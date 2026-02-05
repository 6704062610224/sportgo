import React from 'react';
import { Link } from 'react-router-dom';

export default function LoginPage() {
  return (
    <div className="flex items-center justify-center min-h-[80vh]">
      <div className="bg-white p-8 rounded-3xl shadow-lg w-full max-w-md border border-gray-50">
        <h2 className="text-2xl font-bold text-center mb-6">Login</h2>
        <input type="text" placeholder="Email" className="w-full p-3 mb-4 bg-gray-100 rounded-xl outline-none" />
        <input type="password" placeholder="Password" className="w-full p-3 mb-6 bg-gray-100 rounded-xl outline-none" />
        <button className="w-full bg-black text-white p-3 rounded-xl font-bold">Sign in</button>
        <div className="text-center my-4 text-gray-400 text-sm">Or Continue With</div>
        <div className="flex justify-center gap-4">
          <button className="p-2 border rounded-full">G</button>
          <button className="p-2 border rounded-full">A</button>
          <button className="p-2 border rounded-full">f</button>
        </div>
        <p className="text-center mt-6 text-sm">Don't have an account? <Link to="/register" className="text-teal-500">Register for free</Link></p>
      </div>
    </div>
  );
}