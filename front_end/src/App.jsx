import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from "react-hot-toast";
import { supabase } from './supabaseClient';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

// Public & Auth Pages
import HomePage from './Pages/User/HomePage';
import LoginPage from './Pages/Auth/LoginPage';
import RegisterPage from './Pages/Auth/RegisterPage';

// User Only Pages
import BookingPage from './Pages/User/BookingPage';
import HistoryPage from './Pages/User/HistoryPage';
import PayPage from './Pages/User/PayPage';
import BorrowPage from './Pages/User/BorrowPage';
import ProfilePage from './Pages/User/ProfilePage';

// Admin Pages
import AdminDashboard from './Pages/Admin/AdminDashboard';
import AdminCourts from './Pages/Admin/AdminCourts';
import ManageBorrowPage from "./Pages/Admin/ManageBorrowPage";
import AdminBookingHistory from './Pages/Admin/AdminBookingHistory';
import ManageEquipmentsPage from './Pages/Admin/ManageEquipmentsPage';

const RequireAuth = ({ user, children }) => {
  if (!user || !user.id) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

const RequireAdmin = ({ user, children }) => {
  if (!user || !user.id) {
    return <Navigate to="/login" replace />;
  }
  if (user.role !== 'admin') {
    return <Navigate to="/" replace />; 
  }
  return children;
};

function App() {
  const [user, setUser] = useState({
    loggedIn: false,
    role: null,
    email: null,
    username: null,
    id: null,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getProfile = async (session) => {
      if (!session) {
        setUser({
          id: null,
          email: null,
          username: null,
          role: null,
          loggedIn: false,
        });
        setLoading(false);
        return;
      }

      const { data: profile } = await supabase
        .from("users")
        .select("id, username, role")
        .eq("id", session.user.id)
        .single();

      setUser({
        id: session.user.id,
        email: session.user.email,
        username: profile?.username,
        role: profile?.role,
        loggedIn: true,
      });

      setLoading(false);
    };

    supabase.auth.getSession().then(({ data: { session } }) => {
      getProfile(session);
    });

    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        getProfile(session);
      }
    );

    return () => listener.subscription.unsubscribe();
  }, []);

  if (loading) return <div className="min-h-screen flex items-center justify-center">กำลังโหลดระบบ...</div>;

  return (
    <div className="min-h-screen flex flex-col">
      <Toaster position="top-right" />
      <Router>
        <Navbar user={user} setUser={setUser} />
        <main>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage setUser={setUser} />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/booking" element={<BookingPage />} />
            <Route path="/borrow" element={<BorrowPage />} />

            <Route path="/pay" element={
              <RequireAuth user={user}><PayPage /></RequireAuth>
            } />
            <Route path="/history" element={
              <RequireAuth user={user}><HistoryPage /></RequireAuth>
            } />
            <Route path="/profile" element={
              <RequireAuth user={user}><ProfilePage user={user} setUser={setUser} /></RequireAuth>
            } />
            <Route path="/admin" element={
              <RequireAdmin user={user}><AdminDashboard /></RequireAdmin>
            } />
            <Route path="/admin/courts" element={
              <RequireAdmin user={user}><AdminCourts /></RequireAdmin>
            } />
            <Route path="/admin/borrow" element={
              <RequireAdmin user={user}><ManageBorrowPage /></RequireAdmin>
            } />
            <Route path="/admin/history" element={
              <RequireAdmin user={user}><AdminBookingHistory /></RequireAdmin>
            } />
            <Route path="/admin/equipments" element={
              <RequireAdmin user={user}><ManageEquipmentsPage /></RequireAdmin>
            } />
            
          </Routes>
        </main>
        
        <Footer />
      </Router>
    </div>
  );
}

export default App;