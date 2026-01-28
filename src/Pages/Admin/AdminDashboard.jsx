// import React, { useState } from 'react';
// import { Link } from 'react-router-dom';
// const AdminDashboard = () => {
//   // ข้อมูลจำลองที่ดึงมาจากตาราง Bookings และ Users
//   const [pendingBookings, setPendingBookings] = useState([
//     { id: 101, user: "คุณสมชาย", court: "สนามฟุตบอล 1", amount: 500, time: "17:00 - 18:00", slip: "https://via.placeholder.com/150", date: "28 ม.ค. 2026" },
//     { id: 102, user: "คุณสมหญิง", court: "ปิงปอง 1", amount: 100, time: "13:00 - 14:00", slip: "https://via.placeholder.com/150", date: "28 ม.ค. 2026" },
//   ]);

//   const handleApprove = (id) => {
//     alert(`อนุมัติรายการจองที่ #${id} สำเร็จ! ระบบจะเปลี่ยนสถานะเป็น booked`);
//     setPendingBookings(pendingBookings.filter(b => b.id !== id));
//   };

//   return (
//     <div className="flex min-h-screen bg-gray-100">
//       {/* Sidebar */}
//       <div className="w-64 bg-gray-900 text-white p-6 hidden md:block">
//         <h2 className="text-2xl font-bold mb-8 text-teal-400">Admin Panel</h2>
//         {/* <nav className="space-y-4">
//           <div className="text-gray-400 text-xs uppercase font-bold">Main</div>
//           <a href="#" className="block py-2 px-4 bg-teal-600 rounded-lg">Dashboard</a>
//           <a href="/admin/courts" className="block py-2 px-4 hover:bg-gray-800 transition">จัดการสนาม</a>
//           <a href="#" className="block py-2 px-4 hover:bg-gray-800 transition">สต็อกอุปกรณ์</a>
//           <div className="pt-4 text-gray-400 text-xs uppercase font-bold">Account</div>
//           <a href="#" className="block py-2 px-4 hover:bg-red-900 text-red-400 transition">Logout</a>
//         </nav> */}
//         <nav className="space-y-4">
//             <div className="text-gray-400 text-xs uppercase font-bold">Main</div>
//             <Link to="/admin" className="block py-2 px-4 hover:bg-gray-800 rounded-lg transition">
//                 Dashboard
//             </Link>
//             <Link to="/admin/courts" className="block py-2 px-4 hover:bg-gray-800 rounded-lg transition">
//                 จัดการสนาม
//             </Link>
//             <a href="#" className="block py-2 px-4 hover:bg-gray-800 transition">สต็อกอุปกรณ์</a>
//         </nav>
//       </div>

//       {/* Main Content */}
//       <div className="flex-1 p-8">
//         <header className="flex justify-between items-center mb-8">
//           <h1 className="text-3xl font-bold text-gray-800">ตรวจสอบการจอง</h1>
//           <div className="bg-white px-4 py-2 rounded-xl shadow-sm border font-medium">
//             Admin: Worawit 👑
//           </div>
//         </header>

//         {/* Stats */}
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
//           <div className="bg-white p-6 rounded-2xl shadow-sm border-l-4 border-yellow-400">
//             <p className="text-gray-500 text-sm">รอตรวจสลิป</p>
//             <p className="text-3xl font-bold">{pendingBookings.length} รายการ</p>
//           </div>
//           <div className="bg-white p-6 rounded-2xl shadow-sm border-l-4 border-green-500">
//             <p className="text-gray-500 text-sm">รายได้วันนี้</p>
//             <p className="text-3xl font-bold">฿1,250</p>
//           </div>
//           <div className="bg-white p-6 rounded-2xl shadow-sm border-l-4 border-teal-500">
//             <p className="text-gray-500 text-sm">สนามที่ถูกจอง</p>
//             <p className="text-3xl font-bold">8 สนาม</p>
//           </div>
//         </div>

//         {/* Pending Table */}
//         <div className="bg-white rounded-3xl shadow-sm overflow-hidden border border-gray-100">
//           <table className="w-full text-left">
//             <thead className="bg-gray-50 border-b">
//               <tr>
//                 <th className="p-4 font-bold text-gray-600">ผู้จอง</th>
//                 <th className="p-4 font-bold text-gray-600">สนาม/เวลา</th>
//                 <th className="p-4 font-bold text-gray-600">ยอดเงิน</th>
//                 <th className="p-4 font-bold text-gray-600">สลิป</th>
//                 <th className="p-4 font-bold text-gray-600 text-center">จัดการ</th>
//               </tr>
//             </thead>
//             <tbody>
//               {pendingBookings.map((b) => (
//                 <tr key={b.id} className="border-b last:border-0 hover:bg-gray-50 transition">
//                   <td className="p-4 font-medium">{b.user}</td>
//                   <td className="p-4">
//                     <p className="font-bold">{b.court}</p>
//                     <p className="text-xs text-gray-400">{b.date} | {b.time}</p>
//                   </td>
//                   <td className="p-4 font-bold text-teal-600">฿{b.amount}</td>
//                   <td className="p-4">
//                     <button className="text-teal-500 underline text-sm font-bold hover:text-teal-700">ดูสลิป</button>
//                   </td>
//                   <td className="p-4 flex justify-center gap-2">
//                     <button 
//                       onClick={() => handleApprove(b.id)}
//                       className="bg-green-500 text-white px-4 py-1.5 rounded-lg text-xs font-bold hover:bg-green-600 transition"
//                     >
//                       อนุมัติ
//                     </button>
//                     <button className="bg-red-50 text-red-500 px-4 py-1.5 rounded-lg text-xs font-bold hover:bg-red-100 transition">
//                       ปฏิเสธ
//                     </button>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//           {pendingBookings.length === 0 && (
//             <div className="p-20 text-center text-gray-400">ไม่มีสลิปที่รอการตรวจสอบในขณะนี้</div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AdminDashboard;






// import React, { useState } from 'react';
// import { Link } from 'react-router-dom';
// const AdminDashboard = () => {
//   // ข้อมูลจำลองที่ดึงมาจากตาราง Bookings และ Users
//   const [pendingBookings, setPendingBookings] = useState([
//     { id: 101, user: "คุณสมชาย", court: "สนามฟุตบอล 1", amount: 500, time: "17:00 - 18:00", slip: "https://via.placeholder.com/150", date: "28 ม.ค. 2026" },
//     { id: 102, user: "คุณสมหญิง", court: "ปิงปอง 1", amount: 100, time: "13:00 - 14:00", slip: "https://via.placeholder.com/150", date: "28 ม.ค. 2026" },
//   ]);

//   const handleApprove = (id) => {
//     alert(`อนุมัติรายการจองที่ #${id} สำเร็จ! ระบบจะเปลี่ยนสถานะเป็น booked`);
//     setPendingBookings(pendingBookings.filter(b => b.id !== id));
//   };

//   return (
//     <div className="flex min-h-screen bg-gray-100">
//       {/* Sidebar */}
//       <aside className="w-64 bg-gray-900 text-white p-6 hidden md:flex flex-col sticky top-0 h-screen">
//         <h2 className="text-2xl font-bold mb-8 text-teal-400">Admin Panel</h2>
//         <nav className="space-y-2 flex-grow">
//           <p className="text-gray-500 text-xs uppercase font-bold mb-2 px-4">Main Menu</p>
//           <Link to="/admin" className="block py-2.5 px-4 bg-teal-600 text-white rounded-xl shadow-lg transition-all">
//             📊 Dashboard
//           </Link>
//           <Link to="/admin/courts" className="block py-2.5 px-4 hover:bg-gray-800 rounded-xl transition-all text-gray-400">
//             🏟️ จัดการสนาม
//           </Link>
//           <Link to="#" className="block py-2.5 px-4 hover:bg-gray-800 rounded-xl transition-all text-gray-400">
//             📦 สต็อกอุปกรณ์
//           </Link>
//         </nav>
//         <div className="border-t border-gray-800 pt-4">
//           <Link to="/" className="block py-2.5 px-4 text-red-400 hover:bg-red-900/20 rounded-xl transition-all font-bold">
//             🚪 Logout
//           </Link>
//         </div>
//       </aside>

//       {/* Main Content */}
//       <div className="flex-1 p-8">
//         <header className="flex justify-between items-center mb-8">
//           <h1 className="text-3xl font-bold text-gray-800">ตรวจสอบการจอง</h1>
//           <div className="bg-white px-4 py-2 rounded-xl shadow-sm border font-medium">
//             Admin: Worawit 👑
//           </div>
//         </header>

//         {/* Stats */}
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
//           <div className="bg-white p-6 rounded-2xl shadow-sm border-l-4 border-yellow-400">
//             <p className="text-gray-500 text-sm">รอตรวจสลิป</p>
//             <p className="text-3xl font-bold">{pendingBookings.length} รายการ</p>
//           </div>
//           <div className="bg-white p-6 rounded-2xl shadow-sm border-l-4 border-green-500">
//             <p className="text-gray-500 text-sm">รายได้วันนี้</p>
//             <p className="text-3xl font-bold">฿1,250</p>
//           </div>
//           <div className="bg-white p-6 rounded-2xl shadow-sm border-l-4 border-teal-500">
//             <p className="text-gray-500 text-sm">สนามที่ถูกจอง</p>
//             <p className="text-3xl font-bold">8 สนาม</p>
//           </div>
//         </div>

//         {/* Pending Table */}
//         <div className="bg-white rounded-3xl shadow-sm overflow-hidden border border-gray-100">
//           <table className="w-full text-left">
//             <thead className="bg-gray-50 border-b">
//               <tr>
//                 <th className="p-4 font-bold text-gray-600">ผู้จอง</th>
//                 <th className="p-4 font-bold text-gray-600">สนาม/เวลา</th>
//                 <th className="p-4 font-bold text-gray-600">ยอดเงิน</th>
//                 <th className="p-4 font-bold text-gray-600">สลิป</th>
//                 <th className="p-4 font-bold text-gray-600 text-center">จัดการ</th>
//               </tr>
//             </thead>
//             <tbody>
//               {pendingBookings.map((b) => (
//                 <tr key={b.id} className="border-b last:border-0 hover:bg-gray-50 transition">
//                   <td className="p-4 font-medium">{b.user}</td>
//                   <td className="p-4">
//                     <p className="font-bold">{b.court}</p>
//                     <p className="text-xs text-gray-400">{b.date} | {b.time}</p>
//                   </td>
//                   <td className="p-4 font-bold text-teal-600">฿{b.amount}</td>
//                   <td className="p-4">
//                     <button className="text-teal-500 underline text-sm font-bold hover:text-teal-700">ดูสลิป</button>
//                   </td>
//                   <td className="p-4 flex justify-center gap-2">
//                     <button 
//                       onClick={() => handleApprove(b.id)}
//                       className="bg-green-500 text-white px-4 py-1.5 rounded-lg text-xs font-bold hover:bg-green-600 transition"
//                     >
//                       อนุมัติ
//                     </button>
//                     <button className="bg-red-50 text-red-500 px-4 py-1.5 rounded-lg text-xs font-bold hover:bg-red-100 transition">
//                       ปฏิเสธ
//                     </button>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//           {pendingBookings.length === 0 && (
//             <div className="p-20 text-center text-gray-400">ไม่มีสลิปที่รอการตรวจสอบในขณะนี้</div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AdminDashboard;



import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const AdminDashboard = () => {
  const [pendingBookings] = useState([
    { id: 101, user: "Jane Doe", email: "fadfa@gmail.com", type: "Badminton", court: "Badminton Court 1", time: "12.00-14.00", status: "Paid" },
    { id: 102, user: "Mom Jokmok", email: "ngnen@gmail.com", type: "Football", court: "Field 1", time: "12.00-15.00", status: "Unpaid" },
    { id: 103, user: "Teng Tedteng", email: "ruruhg@gmail.com", type: "Basketball", court: "Basketball Court 1", time: "13.00-15.00", status: "Awaiting" },
    { id: 104, user: "Nong Chachacha", email: "uhruuhni11@gmail.com", type: "Football", court: "Field 2", time: "18.00-21.00", status: "Paid" },
  ]);

  return (
    <div className="flex min-h-screen bg-white">
      {/* 1. Sidebar แบบในภาพ - เน้นความเรียบง่าย */}
      {/* <aside className="w-64 bg-white border-r border-gray-100 p-6 hidden md:flex flex-col sticky top-0 h-screen">
        <div className="flex flex-col items-center mb-10">
          <img src="https://i.ibb.co/L9H8GjB/sportgo-logo.png" alt="Logo" className="w-16 mb-4" />
          <div className="flex gap-3 text-gray-400">
            <button className="hover:text-teal-500">👤</button>
            <button className="hover:text-teal-500">⚙️</button>
            <button className="relative hover:text-teal-500">
              🔔 <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[8px] px-1 rounded-full">9</span>
            </button>
          </div>
        </div>

        <div className="relative mb-8">
          <input type="text" placeholder="Search for..." className="w-full bg-gray-50 border-none rounded-lg py-2 px-10 text-xs outline-none" />
          <span className="absolute left-3 top-2 text-gray-300">🔍</span>
        </div>

        <nav className="space-y-1 flex-grow">
          <Link to="/admin" className="flex items-center gap-3 py-2 px-4 text-gray-800 font-bold bg-gray-50 rounded-lg text-sm">
            📊 Dashboard
          </Link>
          <Link to="/admin/courts" className="flex items-center gap-3 py-2 px-4 text-gray-400 hover:text-gray-800 text-sm">
            🏟️ Manage Court
          </Link>
          <Link to="#" className="flex items-center gap-3 py-2 px-4 text-gray-400 hover:text-gray-800 text-sm">
            🏐 Manage Equipment
          </Link>
        </nav>

        <div className="mt-auto">
          <p className="text-[10px] font-bold text-gray-300 uppercase mb-2">Account</p>
          <Link to="/" className="text-red-500 text-xs font-bold px-4">Logout</Link>
        </div>
      </aside> */}

      {/* 2. Main Content */}
      <main className="flex-1 p-10 bg-[#FAFAFA]">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">Dashboard</h1>

        {/* Status Cards - ตามแบบในภาพ */}
        <div className="grid grid-cols-4 gap-4 mb-10">
          {[
            { label: "รอตรวจการชำระเงิน", val: "2", color: "border-gray-200" },
            { label: "จำนวนคนจอง", val: "5", color: "border-gray-200" },
            { label: "รายได้วันนี้", val: "$55.00", color: "border-gray-200" },
            { label: "สนามที่ถูกจอง", val: "5", color: "border-gray-200" }
          ].map((card, idx) => (
            <div key={idx} className={`bg-white p-5 rounded-sm border ${card.color} shadow-sm`}>
              <p className="text-gray-400 text-[10px] font-bold uppercase mb-1">{card.label}</p>
              <p className="text-2xl font-bold text-gray-800">{card.val}</p>
            </div>
          ))}
        </div>

        {/* Table - ตามแบบในภาพ */}
        <div className="bg-white rounded-sm border border-gray-100 shadow-sm overflow-hidden">
          <table className="w-full text-left text-xs">
            <thead className="bg-gray-50 border-b border-gray-100 text-gray-400 font-bold">
              <tr>
                <th className="p-4"><input type="checkbox" /></th>
                <th className="p-4 uppercase">Author ↓</th>
                <th className="p-4 uppercase">Type</th>
                <th className="p-4 uppercase">Court</th>
                <th className="p-4 uppercase">Time</th>
                <th className="p-4 uppercase">Receipt</th>
                <th className="p-4 uppercase">Payment status</th>
                <th className="p-4"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {pendingBookings.map((b) => (
                <tr key={b.id} className="hover:bg-gray-50 transition-colors">
                  <td className="p-4"><input type="checkbox" /></td>
                  <td className="p-4 flex items-center gap-3">
                    <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center text-gray-300">👤</div>
                    <div>
                      <p className="font-bold text-gray-700">{b.user}</p>
                      <p className="text-[10px] text-gray-400">{b.email}</p>
                    </div>
                  </td>
                  <td className="p-4 text-gray-500">{b.type}</td>
                  <td className="p-4 text-gray-500">{b.court}</td>
                  <td className="p-4 text-gray-500">{b.time}</td>
                  <td className="p-4"><button className="text-teal-500 font-bold hover:underline">View</button></td>
                  <td className="p-4">
                    <span className={`px-3 py-1 rounded-full text-[10px] font-bold ${
                      b.status === 'Paid' ? 'bg-gray-100 text-gray-600' : 
                      b.status === 'Unpaid' ? 'bg-red-50 text-red-400' : 'bg-yellow-50 text-yellow-500'
                    }`}>
                      {b.status}
                    </span>
                  </td>
                  <td className="p-4 text-gray-300 font-bold">•••</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;