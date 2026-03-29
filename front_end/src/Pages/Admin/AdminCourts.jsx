
// import React, { useState, useEffect } from 'react';
// import { Link } from 'react-router-dom';
// import { supabase } from "../../supabaseClient";
// const AdminCourts = () => {
//   const [courts, setCourts] = useState([]);
//   // useEffect(() => {
//   //   const fetchCourts = async () => {
//   //     const { data, error } = await supabase
//   //       .from("courts")
//   //       .select(`
//   //         id,
//   //         name,
//   //         category,
//   //         price_per_hour,
//   //         is_available
//   //       `)
//   //       .order("id");

//   //     if (!error) {
//   //       setCourts(data);
//   //     } else {
//   //       console.error(error);
//   //     }
//   //   };

//   //   fetchCourts();
//   // }, []);

//   const fetchCourts = async () => {
//     const { data, error } = await supabase
//       .from("courts")
//       .select(`
//         id,
//         name,
//         category,
//         price_per_hour,
//         is_available
//       `)
//       .order("id");

//     if (!error) {
//       setCourts(data || []);
//     } else {
//       console.error(error);
//     }
//   };

//   // ✅ 2. useEffect เดียว: fetch + realtime
//   useEffect(() => {
//     fetchCourts(); // โหลดครั้งแรก

//     const channel = supabase
//       .channel("realtime-courts")
//       .on(
//         "postgres_changes",
//         {
//           event: "*",
//           schema: "public",
//           table: "courts",
//         },
//         (payload) => {
//           setCourts(prev => {
//             if (payload.eventType === "UPDATE") {
//               return prev.map(c =>
//                 c.id === payload.new.id ? payload.new : c
//               );
//             }
//             if (payload.eventType === "INSERT") {
//               return [...prev, payload.new];
//             }
//             if (payload.eventType === "DELETE") {
//               return prev.filter(c => c.id !== payload.old.id);
//             }
//             return prev;
//           });
//         }
//       )
//       .subscribe();

//     return () => {
//       supabase.removeChannel(channel);
//     };
//   }, []);
  
//  const toggleStatus = async (court) => {
//     const newStatus = !court.is_available;

//     const { error } = await supabase
//       .from("courts")
//       .update({ is_available: newStatus })
//       .eq("id", court.id);

//     if (!error) {
//       setCourts(prev =>
//         prev.map(c =>
//           c.id === court.id
//             ? { ...c, is_available: newStatus }
//             : c
//         )
//       );
//     }
//   };

//   const deleteCourt = async (courtId) => {
//     const confirm = window.confirm("คุณแน่ใจหรือไม่ว่าต้องการลบสนามนี้?");
//     if (!confirm) return;

//     const { error } = await supabase
//       .from("courts")
//       .delete()
//       .eq("id", courtId);

//     if (!error) {
//       setCourts(prev => prev.filter(c => c.id !== courtId));
//     } else {
//       console.error(error);
//       alert("ลบไม่สำเร็จ");
//     }
//   };
//   return (
//     <div className="flex min-h-screen bg-gray-50">
//       {/* 1. Sidebar - คงที่ไว้ด้านซ้าย */}
//       {/* <aside className="w-64 bg-gray-900 text-white p-6 hidden md:flex flex-col sticky top-0 h-screen">
//         <h2 className="text-2xl font-bold mb-8 text-teal-400">Admin Panel</h2>
//         <nav className="space-y-2 flex-grow">
//           <p className="text-gray-500 text-xs uppercase font-bold mb-2 px-4">Main Menu</p>
//           <Link to="/admin" className="block py-2.5 px-4 hover:bg-gray-800 rounded-xl transition-all">
//             📊 Dashboard
//           </Link>
//           <Link to="/admin/courts" className="block py-2.5 px-4 bg-teal-600 text-white rounded-xl shadow-lg transition-all">
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
//       </aside> */}

//       {/* 2. Main Content Area */}
//       <main className="flex-1 p-8 overflow-y-auto">
//         {/* Header Section */}
//         <header className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
//           <div>
//             <h1 className="text-3xl font-extrabold text-gray-800">จัดการสนามกีฬา</h1>
//             <p className="text-gray-500 text-sm mt-1">เพิ่ม แก้ไข หรือเปลี่ยนสถานะสนามเปิดให้บริการ</p>
//           </div>
//           {/* <button className="bg-teal-600 hover:bg-teal-700 text-white px-6 py-3 rounded-2xl font-bold shadow-lg shadow-teal-200 transition-all active:scale-95 flex items-center gap-2">
//             <span>+</span> เพิ่มสนามใหม่
//           </button> */}
//         </header>

//         {/* Table Section */}
//         <div className="bg-white rounded-[2rem] shadow-sm border border-gray-100 overflow-hidden">
//           <div className="overflow-x-auto">
//             <table className="w-full text-left">
//               <thead className="bg-gray-50/50 border-b border-gray-100">
//                 <tr>
//                   <th className="p-5 text-sm font-bold text-gray-400 uppercase tracking-wider">ชื่อสนาม</th>
//                   <th className="p-5 text-sm font-bold text-gray-400 uppercase tracking-wider">ประเภท</th>
//                   <th className="p-5 text-sm font-bold text-gray-400 uppercase tracking-wider">ราคา/ชม.</th>
//                   <th className="p-5 text-sm font-bold text-gray-400 uppercase tracking-wider text-center">สถานะ</th>
//                   <th className="p-5 text-sm font-bold text-gray-400 uppercase tracking-wider text-right">จัดการ</th>
//                 </tr>
//               </thead>
//               <tbody className="divide-y divide-gray-50">
//                 {courts.map(court => (
//                   <tr key={court.id} className="hover:bg-gray-50/50 transition-colors group">
//                     <td className="p-5">
//                       <div className="font-bold text-gray-800 group-hover:text-blue-600 transition-colors">
//                         {court.name}
//                       </div>
//                     </td>
//                     <td className="p-5">
//                       <span className="bg-gray-100 text-gray-600 px-3 py-1 rounded-lg text-xs font-bold">
//                         {court.category}
//                       </span>
//                     </td>
//                     <td className="p-5">
//                       <span className="font-mono font-bold text-gray-700">
//                         ฿{court.price_per_hour}
//                       </span>
//                     </td>

//                     <td className="p-5 text-center">
//                       <span className={`px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest ${
//                         court.is_available
//                           ? 'bg-green-100 text-green-600'
//                           : 'bg-red-100 text-red-600'
//                       }`}>
//                         {court.is_available ? 'Available' : 'Maintenance'}
//                       </span>
//                     </td>
//                     <td className="p-5 text-right flex justify-end gap-3">
//                       <button 
//                         onClick={() => toggleStatus(court)} 
//                         className="text-xs font-bold bg-blue-50 text-blue-600 px-4 py-2 rounded-xl hover:bg-blue-600 hover:text-white transition-all shadow-sm"
//                       >
//                         เปลี่ยนสถานะ
//                       </button>
//                       {/* <button
//                       onClick={() => deleteCourt(court.id)}
//                       className="text-xs font-bold bg-red-50 text-red-500 px-4 py-2 rounded-xl hover:bg-red-500 hover:text-white transition-all shadow-sm">
//                         ลบ
//                       </button> */}
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
          
//           {/* Empty State */}
//           {courts.length === 0 && (
//             <div className="p-20 text-center flex flex-col items-center">
//               <div className="text-5xl mb-4">🏟️</div>
//               <p className="text-gray-400 font-medium">ยังไม่มีข้อมูลสนามในระบบ</p>
//             </div>
//           )}
//         </div>
//       </main>
//     </div>
//   );
// };

// export default AdminCourts;








// import React, { useState, useEffect } from 'react';
// import { supabase } from "../../supabaseClient";

// const AdminCourts = () => {
//   const [courts, setCourts] = useState([]);
//   const [editing, setEditing] = useState(null);
//   const [closingCourt, setClosingCourt] = useState(null);
//   const [closeDate, setCloseDate] = useState("");
//   const fetchCourts = async () => {
//     const { data, error } = await supabase
//       .from("courts")
//       .select(`id, name, category, price_per_hour, image_url, is_available`)
//       .order("id");

//     if (!error) setCourts(data || []);
//   };

//   useEffect(() => {
//     fetchCourts();

//     const channel = supabase
//       .channel("realtime-courts")
//       .on("postgres_changes", { event: "*", schema: "public", table: "courts" },
//         (payload) => {
//           setCourts(prev => {
//             if (payload.eventType === "UPDATE") return prev.map(c => c.id === payload.new.id ? payload.new : c);
//             if (payload.eventType === "INSERT") return [...prev, payload.new];
//             if (payload.eventType === "DELETE") return prev.filter(c => c.id !== payload.old.id);
//             return prev;
//           });
//         }
//       )
//       .subscribe();

//     return () => supabase.removeChannel(channel);
//   }, []);

//   const toggleStatus = async (court) => {
//     const newStatus = !court.is_available;
//     const { error } = await supabase
//       .from("courts")
//       .update({ is_available: newStatus })
//       .eq("id", court.id);

//     if (!error) {
//       setCourts(prev => prev.map(c => c.id === court.id ? { ...c, is_available: newStatus } : c));
//     }
//   };

//   const getLocalDateString = (daysToAdd = 0) => {
//     const date = new Date();
//     date.setDate(date.getDate() + daysToAdd);
//     const localDate = new Date(date.getTime() - (date.getTimezoneOffset() * 60000));
//     return localDate.toISOString().split('T')[0];
//   };
//   return (
//     <div className="flex-1 p-10 bg-[#FAFAFA] min-h-screen">

//       {/* HEADER */}
//       <h1 className="text-3xl font-bold text-gray-800 mb-8">จัดการสนามกีฬา</h1>

//       {/* TABLE */}
//       <div className="bg-white rounded-sm border border-gray-100 shadow-sm overflow-hidden">
//         <table className="w-full text-left text-xs">
//           <thead className="bg-gray-50 border-b border-gray-100 text-gray-400 font-bold">
//             <tr>
//               <th className="p-4 uppercase">ชื่อสนาม</th>
//               <th className="p-4 uppercase">ประเภท</th>
//               <th className="p-4 uppercase">ราคา/ชม.</th>
//               <th className="p-4 uppercase text-center">สถานะ</th>
//               <th className="p-4 uppercase text-right">จัดการ</th>
//             </tr>
//           </thead>
//           <tbody className="divide-y divide-gray-50">
//             {courts.map(court => (
//               <tr key={court.id} className="hover:bg-gray-50 transition-colors">
//                 <td className="p-4">
//                   <p className="font-bold text-gray-700">{court.name}</p>
//                 </td>
//                 <td className="p-4 text-gray-500">
//                   <span className="bg-gray-100 text-gray-600 px-3 py-1 rounded-lg text-[10px] font-bold">
//                     {court.category}
//                   </span>
//                 </td>
//                 <td className="p-4">
//                   <span className="font-mono font-bold text-gray-700">
//                     ฿{court.price_per_hour}
//                   </span>
//                 </td>
//                 <td className="p-4 text-center">
//                   <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${
//                     court.is_available
//                       ? 'bg-green-50 text-green-600'
//                       : 'bg-red-50 text-red-600'
//                   }`}>
//                     {court.is_available ? 'Available' : 'Maintenance'}
//                   </span>
//                 </td>
//                 <td className="p-4 text-right">
//                   <div className="flex justify-end gap-2">
//                     <button
//                       onClick={() => setEditing({ ...court })}
//                       className="text-[10px] font-bold bg-gray-100 text-gray-600 px-3 py-1.5 rounded hover:bg-gray-900 hover:text-white transition-all"
//                     >
//                       Edit
//                     </button>
//                     <button
//                       onClick={() => toggleStatus(court)}
//                       className="text-[10px] font-bold bg-blue-50 text-blue-600 px-3 py-1.5 rounded hover:bg-blue-600 hover:text-white transition-all"
//                     >
//                       เปลี่ยนสถานะ
//                     </button>
//                     <button
//                       onClick={() => setClosingCourt(court)}
//                       className="text-[10px] font-bold bg-red-50 text-red-600 px-3 py-1.5 rounded hover:bg-red-600 hover:text-white transition-all"
//                     >
//                       ปิดล่วงหน้า
//                     </button>
//                   </div>
                  
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>

//         {courts.length === 0 && (
//           <div className="p-20 text-center">
//             <p className="text-gray-400">ยังไม่มีข้อมูลสนามในระบบ</p>
//           </div>
//         )}
//       </div>

//       {/* EDIT MODAL */}
//       {editing && (
//         <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
//           <div className="bg-white rounded-2xl w-[420px] shadow-xl overflow-hidden">

//             <div className="px-6 py-5">
//               <h2 className="text-lg font-medium text-gray-900 tracking-tight">แก้ไขสนาม</h2>
//               <p className="text-sm text-gray-400 mt-0.5">ปรับราคาและรูปภาพสนาม</p>
//             </div>

//             <div className="mx-6 mb-4 p-4 rounded-2xl bg-gray-50 flex items-center gap-4 border border-gray-100">
//               <div className="w-16 h-16 rounded-xl bg-white border border-gray-100 overflow-hidden flex-shrink-0">
//                 <img
//                   src={editing.image_url || "https://via.placeholder.com/150"}
//                   alt={editing.name}
//                   className="w-full h-full object-cover"
//                 />
//               </div>
//               <div>
//                 <p className="font-medium text-gray-900 text-sm">{editing.name}</p>
//                 <p className="text-xs text-gray-400 mt-0.5">{editing.category}</p>
//                 <span className={`inline-block mt-1.5 text-xs px-2.5 py-0.5 rounded-full font-medium ${
//                   editing.is_available ? "bg-emerald-50 text-emerald-600" : "bg-red-50 text-red-500"
//                 }`}>
//                   {editing.is_available ? "Available" : "Maintenance"}
//                 </span>
//               </div>
//             </div>

//             <div className="px-6 pb-2 space-y-4">
//               <div>
//                 <label className="text-xs font-medium text-gray-500 block mb-1.5">URL รูปภาพ</label>
//                 <input
//                   type="text"
//                   className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-900 bg-gray-50 outline-none focus:ring-2 focus:ring-gray-200 transition"
//                   value={editing.image_url || ""}
//                   onChange={e => setEditing({ ...editing, image_url: e.target.value })}
//                   placeholder="https://example.com/image.jpg"
//                 />
//                 <p className="text-xs text-gray-400 mt-1">วางลิงก์รูปภาพ รูป preview จะอัปเดตอัตโนมัติ</p>
//               </div>

//               <div>
//                 <label className="text-xs font-medium text-gray-500 block mb-1.5">ราคา (บาท/ชม.)</label>
//                 <div className="flex items-center border border-gray-200 rounded-xl overflow-hidden bg-gray-50">
//                   <button
//                     type="button"
//                     onClick={() => setEditing(prev => ({ ...prev, price_per_hour: Math.max(0, prev.price_per_hour - 10) }))}
//                     className="w-10 h-10 flex items-center justify-center text-gray-400 hover:bg-gray-100 transition text-lg flex-shrink-0"
//                   >
//                     −
//                   </button>
//                   <input
//                     type="number"
//                     className="flex-1 text-center outline-none bg-transparent text-sm font-medium text-gray-900 min-w-0"
//                     value={editing.price_per_hour}
//                     onChange={e => setEditing({ ...editing, price_per_hour: Number(e.target.value) })}
//                   />
//                   <button
//                     type="button"
//                     onClick={() => setEditing(prev => ({ ...prev, price_per_hour: prev.price_per_hour + 10 }))}
//                     className="w-10 h-10 flex items-center justify-center text-gray-400 hover:bg-gray-100 transition text-lg flex-shrink-0"
//                   >
//                     +
//                   </button>
//                 </div>
//                 <p className="text-xs text-gray-400 mt-1">ทีละ 10 บาท</p>
//               </div>
//             </div>

//             <div className="px-6 pb-6 pt-5 flex gap-3">
//               <button
//                 className="flex-1 py-3 rounded-xl border border-gray-200 bg-white text-gray-500 text-sm font-medium hover:bg-gray-50 transition"
//                 onClick={() => setEditing(null)}
//               >
//                 ยกเลิก
//               </button>
//               <button
//                 className="grow py-3 rounded-xl bg-gray-900 text-white text-sm font-medium hover:bg-gray-800 active:scale-95 transition-all"
//                 onClick={async () => {
//                   const { error } = await supabase
//                     .from("courts")
//                     .update({
//                       price_per_hour: editing.price_per_hour,
//                       image_url: editing.image_url,
//                     })
//                     .eq("id", editing.id);

//                   if (error) {
//                     alert(error.message);
//                   } else {
//                     setEditing(null);
//                     fetchCourts();
//                   }
//                 }}
//               >
//                 บันทึกการเปลี่ยนแปลง
//               </button>
//             </div>

//           </div>
//         </div>
//       )}
//       {closingCourt && (
//         <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
//           <div className="bg-white rounded-2xl p-6 w-[350px]">

//             <h2 className="text-lg font-bold mb-4">ปิดสนามล่วงหน้า</h2>
//             <p className="text-sm text-gray-500 mb-4">
//               สนาม: <span className="font-bold text-gray-800">{closingCourt.name}</span>
//               <span className="ml-2 px-2 py-0.5 text-xs bg-gray-100 rounded">
//                 {closingCourt.category}
//               </span>
//             </p>
//             <div className="mb-4 flex items-center gap-3">
//               <img
//                 src={closingCourt.image_url}
//                 className="w-14 h-14 object-cover rounded-lg border"
//               />
//               <div>
//                 <p className="font-bold">{closingCourt.name}</p>
//                 <p className="text-xs text-gray-400">{closingCourt.category}</p>
//               </div>
//             </div>
//             <input
//               type="date"
//               value={closeDate}
//               min={getLocalDateString(7)}   // ✅ เริ่มวันที่ 7 เป็นต้นไป
//               onChange={(e) => setCloseDate(e.target.value)}
//               className="w-full border p-2 rounded mb-4"
//             />

//             <div className="flex gap-2">
//               <button
//                 onClick={() => {
//                   setClosingCourt(null);
//                   setCloseDate("");
//                 }}
//                 className="flex-1 border p-2 rounded"
//               >
//                 ยกเลิก
//               </button>

//               <button
//                 onClick={async () => {
//                   if (!closeDate) return alert("เลือกวันก่อน");
//                   if (closeDate < getLocalDateString(7)) {
//                     alert("ปิดได้เฉพาะวันที่เกิน 7 วันจากวันนี้");
//                     return;
//                   }
//                   const { error } = await supabase
//                     .from("court_closures")
//                     .insert({
//                       court_id: closingCourt.id,
//                       close_date: closeDate
//                     });
                  
//                   if (error) {
//                     alert(error.message);
//                   } else {
//                     alert("ปิดสนามสำเร็จ");
//                     setClosingCourt(null);
//                     setCloseDate("");
//                   }
                  
//                 }}
//                 className="flex-1 bg-red-500 text-white p-2 rounded"
//               >
//                 ยืนยัน
//               </button>
//             </div>

//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default AdminCourts;

import React, { useState, useEffect } from 'react';
import { supabase } from "../../supabaseClient";

const AdminCourts = () => {
  const [courts, setCourts] = useState([]);
  const [editing, setEditing] = useState(null);
  const [closingCourt, setClosingCourt] = useState(null);
  const [closeDate, setCloseDate] = useState("");
  const [closeSuccess, setCloseSuccess] = useState(false);

  const fetchCourts = async () => {
    const { data, error } = await supabase
      .from("courts")
      .select(`id, name, category, price_per_hour, image_url, is_available`)
      .order("id");

    if (!error) setCourts(data || []);
  };

  useEffect(() => {
    fetchCourts();

    const channel = supabase
      .channel("realtime-courts")
      .on("postgres_changes", { event: "*", schema: "public", table: "courts" },
        (payload) => {
          setCourts(prev => {
            if (payload.eventType === "UPDATE") return prev.map(c => c.id === payload.new.id ? payload.new : c);
            if (payload.eventType === "INSERT") return [...prev, payload.new];
            if (payload.eventType === "DELETE") return prev.filter(c => c.id !== payload.old.id);
            return prev;
          });
        }
      )
      .subscribe();

    return () => supabase.removeChannel(channel);
  }, []);

  const toggleStatus = async (court) => {
    const newStatus = !court.is_available;
    const { error } = await supabase
      .from("courts")
      .update({ is_available: newStatus })
      .eq("id", court.id);

    if (!error) {
      setCourts(prev => prev.map(c => c.id === court.id ? { ...c, is_available: newStatus } : c));
    }
  };

  const getLocalDateString = (daysToAdd = 0) => {
    const date = new Date();
    date.setDate(date.getDate() + daysToAdd);
    const localDate = new Date(date.getTime() - (date.getTimezoneOffset() * 60000));
    return localDate.toISOString().split('T')[0];
  };

  const formatDateThai = (dateStr) => {
    if (!dateStr) return "";
    const date = new Date(dateStr + "T00:00:00");
    return date.toLocaleDateString("th-TH", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const handleCloseModal = () => {
    setClosingCourt(null);
    setCloseDate("");
    setCloseSuccess(false);
  };

  return (
    <div className="flex-1 p-10 bg-[#FAFAFA] min-h-screen">

      {/* HEADER */}
      <h1 className="text-3xl font-bold text-gray-800 mb-8">จัดการสนามกีฬา</h1>

      {/* TABLE */}
      <div className="bg-white rounded-sm border border-gray-100 shadow-sm overflow-hidden">
        <table className="w-full text-left text-xs">
          <thead className="bg-gray-50 border-b border-gray-100 text-gray-400 font-bold">
            <tr>
              <th className="p-4 uppercase">ชื่อสนาม</th>
              <th className="p-4 uppercase">ประเภท</th>
              <th className="p-4 uppercase">ราคา/ชม.</th>
              <th className="p-4 uppercase text-center">สถานะ</th>
              <th className="p-4 uppercase text-right">จัดการ</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {courts.map(court => (
              <tr key={court.id} className="hover:bg-gray-50 transition-colors">
                <td className="p-4">
                  <p className="font-bold text-gray-700">{court.name}</p>
                </td>
                <td className="p-4 text-gray-500">
                  <span className="bg-gray-100 text-gray-600 px-3 py-1 rounded-lg text-[10px] font-bold">
                    {court.category}
                  </span>
                </td>
                <td className="p-4">
                  <span className="font-mono font-bold text-gray-700">
                    ฿{court.price_per_hour}
                  </span>
                </td>
                <td className="p-4 text-center">
                  <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${
                    court.is_available
                      ? 'bg-green-50 text-green-600'
                      : 'bg-red-50 text-red-600'
                  }`}>
                    {court.is_available ? 'Available' : 'Maintenance'}
                  </span>
                </td>
                <td className="p-4 text-right">
                  <div className="flex justify-end gap-2">
                    <button
                      onClick={() => setEditing({ ...court })}
                      className="text-[10px] font-bold bg-gray-100 text-gray-600 px-3 py-1.5 rounded hover:bg-gray-900 hover:text-white transition-all"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => toggleStatus(court)}
                      className="text-[10px] font-bold bg-blue-50 text-blue-600 px-3 py-1.5 rounded hover:bg-blue-600 hover:text-white transition-all"
                    >
                      เปลี่ยนสถานะ
                    </button>
                    <button
                      onClick={() => { setClosingCourt(court); setCloseSuccess(false); }}
                      className="text-[10px] font-bold bg-red-50 text-red-600 px-3 py-1.5 rounded hover:bg-red-600 hover:text-white transition-all"
                    >
                      ปิดล่วงหน้า
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {courts.length === 0 && (
          <div className="p-20 text-center">
            <p className="text-gray-400">ยังไม่มีข้อมูลสนามในระบบ</p>
          </div>
        )}
      </div>

      {/* EDIT MODAL */}
      {editing && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl w-[420px] shadow-xl overflow-hidden">
            <div className="px-6 py-5">
              <h2 className="text-lg font-medium text-gray-900 tracking-tight">แก้ไขสนาม</h2>
              <p className="text-sm text-gray-400 mt-0.5">ปรับราคาและรูปภาพสนาม</p>
            </div>

            <div className="mx-6 mb-4 p-4 rounded-2xl bg-gray-50 flex items-center gap-4 border border-gray-100">
              <div className="w-16 h-16 rounded-xl bg-white border border-gray-100 overflow-hidden flex-shrink-0">
                <img
                  src={editing.image_url || "https://via.placeholder.com/150"}
                  alt={editing.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <p className="font-medium text-gray-900 text-sm">{editing.name}</p>
                <p className="text-xs text-gray-400 mt-0.5">{editing.category}</p>
                <span className={`inline-block mt-1.5 text-xs px-2.5 py-0.5 rounded-full font-medium ${
                  editing.is_available ? "bg-emerald-50 text-emerald-600" : "bg-red-50 text-red-500"
                }`}>
                  {editing.is_available ? "Available" : "Maintenance"}
                </span>
              </div>
            </div>

            <div className="px-6 pb-2 space-y-4">
              <div>
                <label className="text-xs font-medium text-gray-500 block mb-1.5">URL รูปภาพ</label>
                <input
                  type="text"
                  className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-900 bg-gray-50 outline-none focus:ring-2 focus:ring-gray-200 transition"
                  value={editing.image_url || ""}
                  onChange={e => setEditing({ ...editing, image_url: e.target.value })}
                  placeholder="https://example.com/image.jpg"
                />
                <p className="text-xs text-gray-400 mt-1">วางลิงก์รูปภาพ รูป preview จะอัปเดตอัตโนมัติ</p>
              </div>

              <div>
                <label className="text-xs font-medium text-gray-500 block mb-1.5">ราคา (บาท/ชม.)</label>
                <div className="flex items-center border border-gray-200 rounded-xl overflow-hidden bg-gray-50">
                  <button
                    type="button"
                    onClick={() => setEditing(prev => ({ ...prev, price_per_hour: Math.max(0, prev.price_per_hour - 10) }))}
                    className="w-10 h-10 flex items-center justify-center text-gray-400 hover:bg-gray-100 transition text-lg flex-shrink-0"
                  >
                    −
                  </button>
                  <input
                    type="number"
                    className="flex-1 text-center outline-none bg-transparent text-sm font-medium text-gray-900 min-w-0"
                    value={editing.price_per_hour}
                    onChange={e => setEditing({ ...editing, price_per_hour: Number(e.target.value) })}
                  />
                  <button
                    type="button"
                    onClick={() => setEditing(prev => ({ ...prev, price_per_hour: prev.price_per_hour + 10 }))}
                    className="w-10 h-10 flex items-center justify-center text-gray-400 hover:bg-gray-100 transition text-lg flex-shrink-0"
                  >
                    +
                  </button>
                </div>
                <p className="text-xs text-gray-400 mt-1">ทีละ 10 บาท</p>
              </div>
            </div>

            <div className="px-6 pb-6 pt-5 flex gap-3">
              <button
                className="flex-1 py-3 rounded-xl border border-gray-200 bg-white text-gray-500 text-sm font-medium hover:bg-gray-50 transition"
                onClick={() => setEditing(null)}
              >
                ยกเลิก
              </button>
              <button
                className="grow py-3 rounded-xl bg-gray-900 text-white text-sm font-medium hover:bg-gray-800 active:scale-95 transition-all"
                onClick={async () => {
                  const { error } = await supabase
                    .from("courts")
                    .update({
                      price_per_hour: editing.price_per_hour,
                      image_url: editing.image_url,
                    })
                    .eq("id", editing.id);

                  if (error) {
                    alert(error.message);
                  } else {
                    setEditing(null);
                    fetchCourts();
                  }
                }}
              >
                บันทึกการเปลี่ยนแปลง
              </button>
            </div>
          </div>
        </div>
      )}

      {/* CLOSE COURT MODAL */}
      {closingCourt && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl w-[420px] shadow-xl overflow-hidden">

            {/* Success State */}
            {closeSuccess ? (
              <div className="px-6 py-10 flex flex-col items-center text-center">
                <div className="w-14 h-14 rounded-full bg-green-50 flex items-center justify-center mb-4">
                  <svg className="w-7 h-7 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="text-base font-semibold text-gray-900 mb-1">บันทึกการปิดสนามแล้ว</h3>
                <p className="text-sm text-gray-400 mb-1">
                  <span className="font-medium text-gray-700">{closingCourt.name}</span>
                </p>
                <p className="text-sm text-gray-400 mb-6">
                  วันที่ปิด: <span className="font-medium text-gray-700">{formatDateThai(closeDate)}</span>
                </p>
                <button
                  onClick={handleCloseModal}
                  className="w-full py-3 rounded-xl bg-gray-900 text-white text-sm font-medium hover:bg-gray-800 active:scale-95 transition-all"
                >
                  เสร็จสิ้น
                </button>
              </div>
            ) : (
              <>
                {/* Header */}
                <div className="px-6 py-5 border-b border-gray-100">
                  <div className="flex items-center gap-2 mb-0.5">
                    {/* <div className="w-5 h-5 rounded-md bg-red-50 flex items-center justify-center flex-shrink-0">
                      <svg className="w-3 h-3 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </div> */}
                    <h2 className="text-base font-semibold text-gray-900 tracking-tight">ปิดสนามล่วงหน้า</h2>
                  </div>
                  <p className="text-xs text-gray-400 ">เลือกวันที่ต้องการปิด อย่างน้อย 7 วันล่วงหน้า</p>
                </div>

                {/* Court Info Card */}
                <div className="mx-6 mt-5 p-4 rounded-2xl bg-gray-50 flex items-center gap-4 border border-gray-100">
                  <div className="w-14 h-14 rounded-xl bg-white border border-gray-100 overflow-hidden flex-shrink-0">
                    <img
                      src={closingCourt.image_url || "https://via.placeholder.com/150"}
                      alt={closingCourt.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="min-w-0">
                    <p className="font-semibold text-gray-900 text-sm truncate">{closingCourt.name}</p>
                    <span className="inline-block mt-1 text-[10px] font-bold bg-gray-200 text-gray-600 px-2 py-0.5 rounded">
                      {closingCourt.category}
                    </span>
                  </div>
                </div>

                {/* Date Picker Section */}
                <div className="px-6 mt-5 mb-2">
                  <label className="text-xs font-medium text-gray-500 block mb-1.5">วันที่ต้องการปิดสนาม</label>
                  <input
                    type="date"
                    value={closeDate}
                    min={getLocalDateString(7)}
                    onChange={(e) => setCloseDate(e.target.value)}
                    className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-900 bg-gray-50 outline-none focus:ring-2 focus:ring-red-100 focus:border-red-200 transition"
                  />
                  {closeDate ? (
                    <p className="text-xs text-gray-500 mt-1.5 flex items-center gap-1">
                      <svg className="w-3 h-3 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      {formatDateThai(closeDate)}
                    </p>
                  ) : (
                    <p className="text-xs text-gray-400 mt-1.5">สามารถเลือกได้ตั้งแต่ {formatDateThai(getLocalDateString(7))} เป็นต้นไป</p>
                  )}
                </div>

                {/* Warning Note */}
                <div className="mx-6 mt-4 mb-1 p-3 rounded-xl bg-amber-50 border border-amber-100 flex gap-2.5">
                  <svg className="w-4 h-4 text-amber-500 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
                  </svg>
                  <p className="text-xs text-amber-700 leading-relaxed">
                    การจองทั้งหมดในวันดังกล่าวจะถูกระงับ และผู้ใช้จะไม่สามารถจองสนามในวันนี้ได้
                  </p>
                </div>

                {/* Buttons */}
                <div className="px-6 pb-6 pt-4 flex gap-3">
                  <button
                    onClick={handleCloseModal}
                    className="flex-1 py-3 rounded-xl border border-gray-200 bg-white text-gray-500 text-sm font-medium hover:bg-gray-50 transition"
                  >
                    ยกเลิก
                  </button>
                  <button
                    onClick={async () => {
                      if (!closeDate) return;
                      if (closeDate < getLocalDateString(7)) return;

                      const { error } = await supabase
                        .from("court_closures")
                        .insert({
                          court_id: closingCourt.id,
                          close_date: closeDate,
                        });

                      if (error) {
                        alert(error.message);
                      } else {
                        setCloseSuccess(true);
                      }
                    }}
                    disabled={!closeDate}
                    className={`flex-1 py-3 rounded-xl text-sm font-medium transition-all ${
                      closeDate
                        ? 'bg-red-500 text-white hover:bg-red-600 active:scale-95'
                        : 'bg-gray-100 text-gray-300 cursor-not-allowed'
                    }`}
                  >
                    ยืนยันการปิดสนาม
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminCourts;