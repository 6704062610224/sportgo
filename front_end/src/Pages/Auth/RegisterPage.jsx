import React from 'react';
import { Link } from 'react-router-dom';

const RegisterPage = () => {
  return (
    <div className="flex items-center justify-center min-h-[90vh] bg-gray-50 p-4">
      <div className="bg-white p-10 rounded-[40px] shadow-sm w-full max-w-md border border-gray-100">
        <h2 className="text-3xl font-bold text-center mb-2">Sign up</h2>
        <p className="text-center text-gray-400 text-sm mb-8">Create an account to start booking</p>
        
        <form className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 ml-1 mb-1">Name / Surname</label>
            <input 
              type="text" 
              placeholder="Your Name" 
              className="w-full p-4 bg-gray-50 rounded-2xl border border-gray-100 outline-none focus:border-teal-500 transition-all" 
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 ml-1 mb-1">Email address</label>
            <input 
              type="email" 
              placeholder="example@gmail.com" 
              className="w-full p-4 bg-gray-50 rounded-2xl border border-gray-100 outline-none focus:border-teal-500 transition-all" 
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 ml-1 mb-1">Password</label>
            <input 
              type="password" 
              placeholder="••••••••" 
              className="w-full p-4 bg-gray-50 rounded-2xl border border-gray-100 outline-none focus:border-teal-500 transition-all" 
            />
          </div>

          <div className="flex items-center gap-2 px-1">
            <input type="checkbox" id="terms" className="rounded border-gray-300 text-teal-600 focus:ring-teal-500" />
            <label htmlFor="terms" className="text-xs text-gray-500">
              I agree to the <span className="text-teal-600 underline cursor-pointer">Terms, Service and Privacy Policy</span>
            </label>
          </div>

          <button className="w-full bg-black text-white p-4 rounded-2xl font-bold mt-4 hover:opacity-90 transition-opacity">
            CREATE AN ACCOUNT
          </button>
        </form>

        <div className="relative my-8">
          <div className="absolute inset-0 flex items-center"><span className="w-full border-t border-gray-100"></span></div>
          <div className="relative flex justify-center text-xs uppercase"><span className="bg-white px-2 text-gray-400">Or</span></div>
        </div>

        <div className="flex justify-center gap-6 mb-8">
          <button className="p-3 border border-gray-100 rounded-full hover:bg-gray-50 transition-colors">
            <img src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google" className="w-6 h-6" />
          </button>
          <button className="p-3 border border-gray-100 rounded-full hover:bg-gray-50 transition-colors">
            <img src="https://www.svgrepo.com/show/445330/apple.svg" alt="Apple" className="w-6 h-6" />
          </button>
          <button className="p-3 border border-gray-100 rounded-full hover:bg-gray-50 transition-colors">
            <img src="https://www.svgrepo.com/show/448224/facebook.svg" alt="Facebook" className="w-6 h-6" />
          </button>
        </div>

        <p className="text-center text-sm text-gray-500">
          Already have an account? <Link to="/login" className="text-teal-600 font-bold hover:underline">Login for free</Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;