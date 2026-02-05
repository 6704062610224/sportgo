//ล่าสุด

// import React from 'react';
// import { Link, useNavigate, useLocation } from 'react-router-dom';

// export default function Navbar({ user, setUser }) {
//   const navigate = useNavigate();
//   const location = useLocation();

//   // ตรวจสอบว่าปัจจุบันอยู่ในหน้า Admin หรือไม่
//   const isAdminPath = location.pathname.startsWith('/admin');

//   const handleLogout = () => {
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
//         {/* --- ส่วนที่ต่างกันทางการใช้งาน --- */}
//         <div className="hidden md:flex gap-6 items-center text-sm font-bold text-gray-500">
//           {user?.role === 'admin' && isAdminPath ? (
//             /* 1. เมนูสำหรับ Admin เมื่ออยู่ในหน้าจัดการ */
//             <>
//               <Link to="/admin" className="text-teal-600 border-b-2 border-teal-600 pb-1">DASHBOARD</Link>
//               <Link to="/admin/courts" className="hover:text-teal-500">MANAGE COURTS</Link>
//               <Link to="#" className="hover:text-teal-500 text-gray-300 cursor-not-allowed">EQUIPMENTS</Link>
//             </>
//           ) : (
//             /* 2. เมนูสำหรับ User ทั่วไป (หรือ Admin เมื่ออยู่หน้าบ้าน) */
//             <>
//               <Link to="/" className="hover:text-teal-500">HOME</Link>
//               <Link to="/booking" className="hover:text-teal-500">RESERVATION</Link>
//               <Link to="/history" className="hover:text-teal-500">MY HISTORY</Link>
//               <Link to="/borrow" className="hover:text-teal-500">BORROW</Link>
//             </>
//           )}
//         </div>
//         {/* แสดงปุ่มสลับไปหน้า Admin เฉพาะคนที่เป็น Admin เท่านั้น */}
//         {user?.role === 'admin' && !isAdminPath && (
//           <Link to="/admin" className="text-[10px] bg-teal-50 text-teal-600 px-3 py-1.5 rounded-lg font-black hover:bg-teal-600 hover:text-white transition-all">
//             GO TO ADMIN PANEL ⚙️
//           </Link>
//         )}

//         {user?.loggedIn ? (
//           <div className="flex items-center gap-3 border-l pl-4 border-gray-100">
//             <div className="text-right hidden sm:block">
//               <p className="text-[10px] font-black text-gray-400 uppercase leading-none mb-1">{user.role}</p>
//               <p className="text-xs font-bold text-gray-800">Worawit 👑</p>
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

//       {/* Dev Toggle */}
//       <button 
//         onClick={() => setUser(prev => ({...prev, role: prev.role === 'admin' ? 'user' : 'admin'}))}
//         className="fixed bottom-4 right-4 bg-gray-900 text-white p-2 rounded-full text-[10px] z-50 opacity-20 hover:opacity-100 transition-opacity"
//       >
//         DEV: {user.role === 'admin' ? 'User Mode' : 'Admin Mode'}
//       </button>
//     </nav>
//   );
// }













import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Menu, X, Settings, LogOut, User as UserIcon } from 'lucide-react';

export default function Navbar({ user, setUser }) {
  const navigate = useNavigate();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const isAdminPath = location.pathname.startsWith('/admin');

  const handleLogout = () => {
    setUser({ loggedIn: false, role: null });
    navigate('/login');
    setIsMenuOpen(false);
  };

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50">
      <div className="mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          
          {/* --- ฝั่งซ้าย: Logo --- */}
          <div className="flex-shrink-0">
            <Link to="/" className="text-xl font-bold text-gray-800 tracking-tighter hover:text-teal-500 transition-colors">
              SPORTGO
            </Link>
          </div>

          {/* --- ส่วนกลาง: Desktop Menu (ซ่อนบนมือถือ) --- */}
          {/* <div className="hidden md:flex flex-1 justify-center px-8">
            <div className="flex gap-8 items-center text-sm font-bold text-gray-500">
              {user?.role === 'admin' && isAdminPath ? (
                <>
                  <Link to="/admin" className="text-teal-600 border-b-2 border-teal-600 pb-1">DASHBOARD</Link>
                  <Link to="/admin/courts" className="hover:text-teal-500 transition-colors">MANAGE COURTS</Link>
                  <span className="text-gray-300 cursor-not-allowed">EQUIPMENTS</span>
                </>
              ) : (
                <>
                  <Link to="/" className="hover:text-teal-500 transition-colors">HOME</Link>
                  <Link to="/booking" className="hover:text-teal-500 transition-colors">RESERVATION</Link>
                  <Link to="/history" className="hover:text-teal-500 transition-colors">MY HISTORY</Link>
                  <Link to="/borrow" className="hover:text-teal-500 transition-colors">BORROW</Link>
                </>
              )}
            </div>
          </div> */}

          {/* --- ฝั่งขวา: User Profile & Auth (Desktop) --- */}
          <div className="hidden md:flex items-center gap-4">
            <div className='flex gap-8 items-center text-sm font-bold text-gray-500'>
              {user?.role === 'admin' && isAdminPath ? (
                <>
                  <Link to="/admin" className="text-teal-600 border-b-2 border-teal-600 pb-1">DASHBOARD</Link>
                  <Link to="/admin/courts" className="hover:text-teal-500 transition-colors">MANAGE COURTS</Link>
                  <span className="text-gray-300 cursor-not-allowed">EQUIPMENTS</span>
                </>
              ) : (
                <>
                  <Link to="/" className="hover:text-teal-500 transition-colors">HOME</Link>
                  <Link to="/booking" className="hover:text-teal-500 transition-colors">RESERVATION</Link>
                  <Link to="/history" className="hover:text-teal-500 transition-colors">MY HISTORY</Link>
                  <Link to="/borrow" className="hover:text-teal-500 transition-colors">BORROW</Link>
                </>
              )}
            </div>
            {user?.role === 'admin' && !isAdminPath && (
              <Link to="/admin" className="text-[10px] bg-teal-50 text-teal-600 px-3 py-1.5 rounded-lg font-black hover:bg-teal-600 hover:text-white transition-all">
                ADMIN PANEL ⚙️
              </Link>
            )}

            {user?.loggedIn ? (
              <div className="flex items-center gap-3 border-l pl-4 border-gray-100">
                <div className="text-right">
                  <p className="text-[10px] font-black text-gray-400 uppercase leading-none mb-1">{user.role}</p>
                  <p className="text-xs font-bold text-gray-800">Worawit 👑</p>
                </div>
                <button 
                  onClick={handleLogout}
                  className="bg-red-50 text-red-500 p-2 rounded-xl hover:bg-red-100 transition-all"
                  title="Logout"
                >
                  <LogOut size={18} />
                </button>
              </div>
            ) : (
              <Link to="/login" className="bg-black text-white px-6 py-2 rounded-xl text-sm font-bold hover:opacity-80 transition-all">
                SIGN IN
              </Link>
            )}
          </div>

          {/* --- ปุ่ม Hamburger Menu (แสดงเฉพาะบนมือถือ) --- */}
          <div className="md:hidden flex items-center">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-600 hover:text-teal-500 hover:bg-gray-100 focus:outline-none"
            >
              {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* --- Mobile Menu Overlay (แสดงเมื่อกดปุ่ม Hamburger) --- */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 animate-in slide-in-from-top duration-300">
          <div className="px-4 pt-2 pb-6 space-y-1">
            {/* รายการเมนูสำหรับมือถือ */}
            <div className="py-2 border-b border-gray-50 mb-2">
              <p className="px-3 text-[10px] font-bold text-gray-400 uppercase tracking-widest">Menu</p>
            </div>
            {user?.role === 'admin' && isAdminPath ? (
              <>
                <Link to="/admin" onClick={toggleMenu} className="block px-3 py-3 text-base font-bold text-teal-600 bg-teal-50 rounded-lg">DASHBOARD</Link>
                <Link to="/admin/courts" onClick={toggleMenu} className="block px-3 py-3 text-base font-bold text-gray-600">MANAGE COURTS</Link>
              </>
            ) : (
              <>
                <Link to="/" onClick={toggleMenu} className="block px-3 py-3 text-base font-bold text-gray-600">HOME</Link>
                <Link to="/booking" onClick={toggleMenu} className="block px-3 py-3 text-base font-bold text-gray-600">RESERVATION</Link>
                <Link to="/history" onClick={toggleMenu} className="block px-3 py-3 text-base font-bold text-gray-600">MY HISTORY</Link>
                <Link to="/borrow" onClick={toggleMenu} className="block px-3 py-3 text-base font-bold text-gray-600">BORROW</Link>
              </>
            )}

            {/* ส่วนล่างของ Mobile Menu: ข้อมูลผู้ใช้ & Logout */}
            <div className="pt-4 mt-4 border-t border-gray-100">
              {user?.loggedIn ? (
                <div className="space-y-3">
                  <div className="flex items-center gap-3 px-3">
                    <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                      <UserIcon size={20} className="text-gray-400" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-gray-800">Worawit</p>
                      <p className="text-[10px] text-gray-400 uppercase">{user.role}</p>
                    </div>
                  </div>
                  {user?.role === 'admin' && !isAdminPath && (
                    <Link to="/admin" onClick={toggleMenu} className="block w-full text-center bg-teal-50 text-teal-600 py-3 rounded-xl font-bold text-sm">
                      GO TO ADMIN PANEL ⚙️
                    </Link>
                  )}
                  <button 
                    onClick={handleLogout}
                    className="w-full bg-red-50 text-red-500 py-3 rounded-xl font-bold text-sm flex items-center justify-center gap-2"
                  >
                    <LogOut size={16} /> LOGOUT
                  </button>
                </div>
              ) : (
                <Link to="/login" onClick={toggleMenu} className="block w-full bg-black text-white py-4 rounded-xl font-bold text-center">
                  SIGN IN
                </Link>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Dev Toggle (ปุ่มสำหรับพัฒนา) */}
      <button 
        onClick={() => setUser(prev => ({...prev, role: prev.role === 'admin' ? 'user' : 'admin'}))}
        className="fixed bottom-4 right-4 bg-gray-900 text-white p-2 rounded-full text-[10px] z-50 opacity-20 hover:opacity-100 transition-opacity md:block hidden"
      >
        DEV: {user.role === 'admin' ? 'User Mode' : 'Admin Mode'}
      </button>
    </nav>
  );
}