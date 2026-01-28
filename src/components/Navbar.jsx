// import React from 'react';
// import { Link } from 'react-router-dom';

// const Navbar = () => {
//   return (
//     <nav className="bg-white shadow-sm border-b border-gray-100 sticky top-0 z-50">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="flex justify-between h-16 items-center">
          
//           {/* Logo */}
//           <div className="flex-shrink-0 flex items-center">
//             <Link to="/" className="text-2xl font-bold text-teal-600">
//               Sport<span className="text-gray-800">GO</span>
//             </Link>
//           </div>

//           {/* Desktop Menu */}
//           <div className="hidden md:flex space-x-8 items-center">
//             <Link to="/" className="text-gray-700 hover:text-teal-600 font-medium">HOME</Link>
            
//             <div className="relative group">
//               <button className="text-gray-700 hover:text-teal-600 font-medium flex items-center gap-1">
//                 Reservation ▾
//               </button>
//               {/* Dropdown แบบง่าย */}
//               <div className="absolute hidden group-hover:block bg-white shadow-lg rounded-lg p-2 min-w-[150px] border border-gray-100">
//                 <Link to="/" className="block px-4 py-2 hover:bg-teal-50 rounded">จองสนาม</Link>
//                 <Link to="/pay" className="block px-4 py-2 hover:bg-teal-50 rounded">ชำระเงิน</Link>
//               </div>
//             </div>

//             <Link to="/history" className="text-gray-700 hover:text-teal-600 font-medium">History</Link>
//             <Link to="/borrow" className="text-gray-700 hover:text-teal-600 font-medium">Borrow</Link>
//           </div>

//           {/* Profile / Login Section */}
//           <div className="flex items-center gap-4">
//             <Link to="/login" className="text-gray-600 hover:text-teal-600 font-medium">Login</Link>
//             <Link 
//               to="/register" 
//               className="bg-teal-600 text-white px-5 py-2 rounded-full font-medium hover:bg-teal-700 transition-colors"
//             >
//               Sign up
//             </Link>
//           </div>

//         </div>
//       </div>
//     </nav>
//   );
// };

// export default Navbar;

// import React from 'react';
// import { Link } from 'react-router-dom';

// export default function Navbar({ user, setUser }) {
//   return (
//     <nav className="flex items-center justify-between px-8 py-4 bg-white shadow-sm">
//       <div className="text-xl font-bold text-gray-800">
//         <Link to="/" className="hover:text-teal-500">SportGo</Link>
//       </div>

//       <div className="flex gap-8 items-center text-sm font-medium">
//         <Link to="/" className="hover:text-teal-500">HOME</Link>
//         <Link to="/booking" className="hover:text-teal-500">Reservation ▾</Link>
//         <Link to="/history" className="hover:text-teal-500">History ▾</Link>
//         <Link to="/borrow" className="hover:text-teal-500">Borrow ▾</Link>
        
//         <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
//           <Link to="/login">👤</Link>
//         </div>
//       </div>
//       {user.role === 'admin' && (
//             <Link to="/admin" className="text-red-500 font-bold border-l pl-4">จัดการระบบ ⚙️</Link>
//       )}
//       <button 
//         onClick={() => setUser(prev => ({...prev, role: prev.role === 'admin' ? 'user' : 'admin'}))}
//         className="fixed bottom-4 right-4 bg-gray-800 text-white p-2 rounded-full text-xs z-50"
//         >
//         สลับเป็น: {user.role === 'admin' ? 'User' : 'Admin'}
//       </button>
//     </nav>
//   );
// }



// import React from 'react';
// import { Link, useNavigate } from 'react-router-dom';

// export default function Navbar({ user, setUser }) {
//   const navigate = useNavigate();

//   const handleLogout = () => {
//     // ล้างสถานะผู้ใช้และดีดไปหน้า Login
//     setUser({ loggedIn: false, role: null });
//     navigate('/login');
//   };

//   return (
//     <nav className="flex items-center justify-between px-8 py-4 bg-white shadow-sm sticky top-0 z-50">
//       <div className="flex items-center gap-8">
//         <div className="text-xl font-bold text-gray-800 tracking-tighter">
//           <Link to="/" className="hover:text-teal-500 transition-colors">SPORTGO</Link>
//         </div>

        
//       </div>

//       <div className="flex items-center gap-4">
//         {/* เมนูหลักสำหรับ User & Admin */}
//         <div className="hidden md:flex gap-6 items-center text-sm font-bold text-gray-500">
//           <Link to="/" className="hover:text-teal-500">HOME</Link>
//           <Link to="/booking" className="hover:text-teal-500">RESERVATION</Link>
//           <Link to="/history" className="hover:text-teal-500">HISTORY</Link>
//           <Link to="/borrow" className="hover:text-teal-500">BORROW</Link>
//           {/* <Link to="/borrow" className="hover:text-teal-500">Borrow ▾</Link> */}
//           {/* ส่วนเสริมเฉพาะ Admin - จะแสดงเมื่อ role เป็น admin เท่านั้น */}
//           {user?.role === 'admin' && (
//             <div className="flex items-center gap-4 border-l pl-4 border-gray-200">
//               <Link to="/admin" className="text-teal-600 hover:text-teal-700 bg-teal-50 px-3 py-1 rounded-lg">
//                 ADMIN DASHBOARD
//               </Link>
//             </div>
//           )}
//         </div>
//         {user?.loggedIn ? (
//           <div className="flex items-center gap-3">
//             <div className="text-right hidden sm:block">
//               <p className="text-xs font-bold text-gray-800 uppercase">{user.role}</p>
//               <p className="text-[10px] text-gray-400">Worawit 👑</p>
//             </div>
//             <button 
//               onClick={handleLogout}
//               className="bg-red-50 text-red-500 px-4 py-2 rounded-xl text-xs font-bold hover:bg-red-100 transition-all"
//             >
//               LOGOUT
//             </button>
//           </div>
//         ) : (
//           <Link to="/login" className="bg-black text-white px-6 py-2 rounded-xl text-sm font-bold hover:opacity-80 transition-all">
//             SIGN IN
//           </Link>
//         )}
//       </div>

//       {/* ปุ่ม Dev Toggle (เก็บไว้ใช้เฉพาะตอนพัฒนา) */}
//       <button 
//         onClick={() => setUser(prev => ({...prev, role: prev.role === 'admin' ? 'user' : 'admin'}))}
//         className="fixed bottom-4 right-4 bg-gray-900 text-white p-2 rounded-full text-[10px] z-50 opacity-50 hover:opacity-100"
//       >
//         TOGGLE ROLE: {user.role === 'admin' ? 'User' : 'Admin'}
//       </button>
//     </nav>
//   );
// }






import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';

export default function Navbar({ user, setUser }) {
  const navigate = useNavigate();
  const location = useLocation();

  // ตรวจสอบว่าปัจจุบันอยู่ในหน้า Admin หรือไม่
  const isAdminPath = location.pathname.startsWith('/admin');

  const handleLogout = () => {
    setUser({ loggedIn: false, role: null });
    navigate('/login');
  };

  return (
    <nav className="flex items-center justify-between px-8 py-4 bg-white shadow-sm sticky top-0 z-50">
      <div className="flex items-center gap-8">
        <div className="text-xl font-bold text-gray-800 tracking-tighter">
          <Link to="/" className="hover:text-teal-500 transition-colors">SPORTGO</Link>
        </div>

        
      </div>

      <div className="flex items-center gap-4">
        {/* --- ส่วนที่ต่างกันทางการใช้งาน --- */}
        <div className="hidden md:flex gap-6 items-center text-sm font-bold text-gray-500">
          {user?.role === 'admin' && isAdminPath ? (
            /* 1. เมนูสำหรับ Admin เมื่ออยู่ในหน้าจัดการ */
            <>
              <Link to="/admin" className="text-teal-600 border-b-2 border-teal-600 pb-1">DASHBOARD</Link>
              <Link to="/admin/courts" className="hover:text-teal-500">MANAGE COURTS</Link>
              <Link to="#" className="hover:text-teal-500 text-gray-300 cursor-not-allowed">EQUIPMENTS</Link>
            </>
          ) : (
            /* 2. เมนูสำหรับ User ทั่วไป (หรือ Admin เมื่ออยู่หน้าบ้าน) */
            <>
              <Link to="/" className="hover:text-teal-500">HOME</Link>
              <Link to="/booking" className="hover:text-teal-500">RESERVATION</Link>
              <Link to="/history" className="hover:text-teal-500">MY HISTORY</Link>
              <Link to="/borrow" className="hover:text-teal-500">BORROW</Link>
            </>
          )}
        </div>
        {/* แสดงปุ่มสลับไปหน้า Admin เฉพาะคนที่เป็น Admin เท่านั้น */}
        {user?.role === 'admin' && !isAdminPath && (
          <Link to="/admin" className="text-[10px] bg-teal-50 text-teal-600 px-3 py-1.5 rounded-lg font-black hover:bg-teal-600 hover:text-white transition-all">
            GO TO ADMIN PANEL ⚙️
          </Link>
        )}

        {user?.loggedIn ? (
          <div className="flex items-center gap-3 border-l pl-4 border-gray-100">
            <div className="text-right hidden sm:block">
              <p className="text-[10px] font-black text-gray-400 uppercase leading-none mb-1">{user.role}</p>
              <p className="text-xs font-bold text-gray-800">Worawit 👑</p>
            </div>
            <button 
              onClick={handleLogout}
              className="bg-red-50 text-red-500 px-4 py-2 rounded-xl text-xs font-bold hover:bg-red-100 transition-all"
            >
              LOGOUT
            </button>
          </div>
        ) : (
          <Link to="/login" className="bg-black text-white px-6 py-2 rounded-xl text-sm font-bold hover:opacity-80 transition-all">
            SIGN IN
          </Link>
        )}
      </div>

      {/* Dev Toggle */}
      <button 
        onClick={() => setUser(prev => ({...prev, role: prev.role === 'admin' ? 'user' : 'admin'}))}
        className="fixed bottom-4 right-4 bg-gray-900 text-white p-2 rounded-full text-[10px] z-50 opacity-20 hover:opacity-100 transition-opacity"
      >
        DEV: {user.role === 'admin' ? 'User Mode' : 'Admin Mode'}
      </button>
    </nav>
  );
}