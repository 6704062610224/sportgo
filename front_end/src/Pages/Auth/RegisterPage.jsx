import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "../../supabaseClient";
import logo from "../../assets/logologin.png";
import bg from "../../assets/login.png";

export default function RegisterPage() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg("");
    setSuccessMsg("");

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { username },
      },
    });

    if (error) {
      setErrorMsg(error.message);
      setLoading(false);
      return;
    }

    setSuccessMsg("Register Success! Please check your email.");
    setLoading(false);

    setTimeout(() => {
      navigate("/");
    }, 1500);
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center flex items-center"
      style={{ backgroundImage: `url(${bg})` }}
    >
      {/* overlay */}
      <div className="absolute inset-0 "></div>

      <div className="relative z-10 w-full flex items-center justify-between px-20">
        
        {/* 🔹 Register Card */}
        <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md">
          <h2 className="text-4xl font-bold text-center">Sign Up</h2>
          <p className="text-center text-gray-400 mb-6">
            Sign up to join us
          </p>

          {errorMsg && (
            <p className="text-red-500 text-sm mb-3">{errorMsg}</p>
          )}

          {successMsg && (
            <p className="text-green-500 text-sm mb-3">{successMsg}</p>
          )}

          <form onSubmit={handleRegister} className="space-y-4">
            <label className="">Name</label>
            <input
              type="text"
              placeholder="Name / Surname"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full p-3 shadow-sm border rounded-lg outline-none"
              required
            />
            <label className="">Email</label>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 shadow-sm border rounded-lg outline-none"
              required
            />
            <label className="">Password</label>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 shadow-sm border rounded-lg outline-none"
              required
            />

            <button
              type="submit"
              className="w-full bg-blue-900 text-white py-3 rounded-lg font-semibold hover:bg-blue-800 transition"
            >
              {loading ? "Registering..." : "CREATE AN ACCOUNT"}
            </button>
          </form>

          <p className="text-center mt-6 text-sm text-gray-500">
            Already have an account?{" "}
            <Link to="/login" className="text-green-600 font-medium">
              Login
            </Link>
          </p>
        </div>

        {/* 🔹 Logo Section */}
        <div className="hidden lg:flex flex-1 justify-center">
          <img
            src={logo}
            alt="SportGo Logo"
            className="w-[350px] drop-shadow-lg"
          />
        </div>
      </div>
    </div>
  );
}