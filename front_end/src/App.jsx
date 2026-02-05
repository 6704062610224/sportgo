

// import React from 'react';

// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import Navbar from './components/Navbar';
// import HomePage from './Pages/HomePage';
// import LoginPage from './Pages/LoginPage';
// import RegisterPage from './Pages/RegisterPage';
// import PayPage from './Pages/PayPage';
// import BookingPage from './Pages/BookingPage';
// import BorrowPage from './Pages/BorrowPage';
// import HistoryPage from './Pages/HistoryPage';
// // import AdminDashboard from './Pages/Admin/AdminDashboard';

// function App() {
//   return (
//     <Router>
//       <Navbar />
//       <main className="min-h-screen bg-gray-50">
//         <Routes>
//           <Route path="/" element={<HomePage />} />
//           <Route path="/booking" element={<BookingPage />} />
//           <Route path="/login" element={<LoginPage />} />
//           <Route path="/register" element={<RegisterPage />} />
//           <Route path="/pay" element={<PayPage />} />
//           <Route path="/borrow" element={<BorrowPage />} />
//           <Route path="/history" element={<HistoryPage />} />
//           {/* <Route path="/admin" element={<AdminDashboard />} /> */}
          
//         </Routes>
//       </main>
//     </Router>
//   );
// }

// export default App;





// import React from 'react';
// import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
// import Navbar from './components/Navbar';

// // User Pages
// import HomePage from './Pages/User/HomePage';
// import BookingPage from './Pages/User/BookingPage';
// import HistoryPage from './Pages/User/HistoryPage';
// import PayPage from './Pages/User/PayPage';
// import BorrowPage from './Pages/User/BorrowPage';

// // Auth Pages
// import LoginPage from './Pages/Auth/LoginPage';
// import RegisterPage from './Pages/Auth/RegisterPage';

// // Admin Pages
// import AdminDashboard from './Pages/Admin/AdminDashboard';
// import AdminCourts from './Pages/Admin/AdminCourts'; 

// function App() {
//   // สมมติว่าดึงข้อมูล User หลัง Login (ใช้เช็คสิทธิ์ Admin)
//   const user = { role: 'admin' }; 

//   return (
//     <Router>
//       <Navbar />
//       <main className="min-h-screen bg-gray-50">
//         <Routes>
//           {/* Public & User Routes */}
//           <Route path="/" element={<HomePage />} />
//           <Route path="/booking" element={<BookingPage />} />
//           <Route path="/login" element={<LoginPage />} />
//           <Route path="/register" element={<RegisterPage />} />
//           <Route path="/pay" element={<PayPage />} />
//           <Route path="/borrow" element={<BorrowPage />} />
//           <Route path="/history" element={<HistoryPage />} />

//           {/* Admin Routes - มีการเช็คสิทธิ์ Role-Based Access Control */}
//           <Route 
//             path="/admin" 
//             element={user?.role === 'admin' ? <AdminDashboard /> : <Navigate to="/login" />} 
//           />
//           <Route 
//             path="/admin/courts" 
//             element={user?.role === 'admin' ? <AdminCourts /> : <Navigate to="/login" />} 
//           />
//         </Routes>
//       </main>
//     </Router>
//   );
// }

// export default App;




import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';

// User & Auth Pages
import HomePage from './Pages/User/HomePage';
import BookingPage from './Pages/User/BookingPage';
import HistoryPage from './Pages/User/HistoryPage';
import PayPage from './Pages/User/PayPage';
import BorrowPage from './Pages/User/BorrowPage';

import LoginPage from './Pages/Auth/LoginPage';
import RegisterPage from './Pages/Auth/RegisterPage';

// Admin Pages
import AdminDashboard from './Pages/Admin/AdminDashboard';
import AdminCourts from './Pages/Admin/AdminCourts';

function App() {
  // ในอนาคตค่านี้จะมาจากระบบ Login จริง
  const [user, setUser] = useState({ loggedIn: true, role: 'admin' }); 
  // const [user, setUser] = useState({ loggedIn: true, role: 'user' }); 

  return (
    <Router>
      {/* <Navbar user={user} /> */}
      <Navbar user={user} setUser={setUser} />
      <main className="min-h-screen bg-gray-50">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage setUser={setUser} />} />
          <Route path="/register" element={<RegisterPage />} />
          
          {/* User Only Routes */}
          <Route path="/booking" element={<BookingPage />} />
          <Route path="/pay" element={<PayPage />} />
          <Route path="/borrow" element={<BorrowPage />} />
          <Route path="/history" element={<HistoryPage />} />

          {/* Admin Protected Routes */}
          <Route 
            path="/admin" 
            element={user.role === 'admin' ? <AdminDashboard /> : <Navigate to="/" />} 
          />
          <Route 
            path="/admin/courts" 
            element={user.role === 'admin' ? <AdminCourts /> : <Navigate to="/" />} 
          />
        </Routes>
      </main>
    </Router>
  );
}
export default App;