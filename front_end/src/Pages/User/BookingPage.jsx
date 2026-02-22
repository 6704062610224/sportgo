// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';



// const BookingPage = () => {
//   const navigate = useNavigate();
//   // 1. เพิ่มข้อมูลสนามกีฬาที่หลากหลายมากขึ้น
//   const handleBooking = (court) => {
//     // ส่งข้อมูลสนามที่เลือกไปยังหน้า Pay ผ่าน State
//     navigate('/pay', { state: { courtData: court } });
//   };
//   const courts = [
//     { id: 1, name: "สนามฟุตบอลหญ้าเทียม 1", category: "ฟุตบอล", price: 500, image: "https://images.unsplash.com/photo-1529900748604-07564a03e7a6?q=80&w=500" },
//     { id: 2, name: "สนามฟุตซอลในร่ม A", category: "ฟุตซอล", price: 600, image: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?q=80&w=500" },
//     { id: 3, name: "สนามแบดมินตัน A1", category: "แบดมินตัน", price: 200, image: "https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?q=80&w=500" },
//     { id: 4, name: "สนามบาสเกตบอล Standard", category: "บาสเกตบอล", price: 350, image: "https://images.unsplash.com/photo-1504450758481-7338eba7524a?q=80&w=500" },
//     { id: 5, name: "โต๊ะปิงปอง ITTF 1", category: "ปิงปอง", price: 100, image: "https://images.unsplash.com/photo-1534158914592-062992fbe900?q=80&w=500" },
//     { id: 6, name: "โต๊ะปิงปอง ITTF 2", category: "ปิงปอง", price: 100, image: "https://images.unsplash.com/photo-1609710228159-0fa9bd7c0827?q=80&w=500" },
//     { id: 7, name: "สนามวอลเลย์บอล Main Court", category: "วอลเลย์บอล", price: 400, image: "https://images.unsplash.com/photo-1592656670411-2918d70c654e?q=80&w=500" },
//     { id: 8, name: "สนามเทนนิส Hard Court", category: "เทนนิส", price: 300, image: "https://images.unsplash.com/photo-1595435064212-362637873604?q=80&w=500" },
//   ];

//   // เพิ่มหมวดหมู่ที่ต้องการ
//   const categories = [
//     { name: "ทั้งหมด", icon: "🏠" },
//     { name: "ฟุตบอล", icon: "⚽" },
//     { name: "ฟุตซอล", icon: "👟" },
//     { name: "แบดมินตัน", icon: "🏸" },
//     { name: "บาสเกตบอล", icon: "🏀" },
//     { name: "ปิงปอง", icon: "🏓" },
//     { name: "วอลเลย์บอล", icon: "🏐" },
//     { name: "เทนนิส", icon: "🎾" }
//   ];

//   const [filter, setFilter] = useState("ทั้งหมด");

//   const filteredCourts = filter === "ทั้งหมด" 
//     ? courts 
//     : courts.filter(c => c.category === filter);

//   return (
//     <div className="min-h-screen bg-gray-100 p-4 md:p-8">
//       <div className="max-w-7xl mx-auto">
        
//         {/* Header ส่วนหัว */}
//         <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-8 gap-6">
//           <div>
//             <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight">เลือกจองสนามกีฬายอดนิยม</h1>
//             <p className="text-gray-600 mt-2 text-lg">ค้นหาสนามว่างและทำรายการจองได้ง่ายๆ ภายในไม่กี่นาที</p>
//           </div>
          
//           {/* ส่วนตัวเลือกประเภทกีฬาแบบ Scroll ในมือถือ */}
//           <div className="flex overflow-x-auto pb-2 gap-2 no-scrollbar">
//             {categories.map(cat => (
//               <button
//                 key={cat.name}
//                 onClick={() => setFilter(cat.name)}
//                 className={`flex items-center gap-2 px-5 py-2.5 rounded-full font-bold whitespace-nowrap transition-all duration-300 ${
//                   filter === cat.name 
//                   ? "bg-teal-600 text-white shadow-lg scale-105" 
//                   : "bg-white text-gray-600 hover:bg-teal-50 border border-transparent hover:border-teal-200"
//                 }`}
//               >
//                 <span>{cat.icon}</span>
//                 {cat.name}
//               </button>
//             ))}
//           </div>
//         </div>

//         {/* รายงานจำนวนสนามที่พบ */}
//         <div className="mb-6">
//           <p className="text-gray-500 font-medium">พบสนามทั้งหมด {filteredCourts.length} รายการ</p>
//         </div>

//         {/* Grid แสดงรายการสนามแบบ Card */}
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
//           {filteredCourts.length > 0 ? (
//             filteredCourts.map(court => (
//               <div key={court.id} className="group bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 border border-gray-100 flex flex-col">
//                 {/* ส่วนรูปภาพพร้อม Overlay */}
//                 <div className="relative h-56 overflow-hidden">
//                   <img 
//                     src={court.image} 
//                     alt={court.name} 
//                     className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
//                   />
//                   <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
//                   <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-md px-4 py-1.5 rounded-2xl text-xs font-black text-teal-700 shadow-sm">
//                     {court.category.toUpperCase()}
//                   </div>
//                 </div>

//                 {/* รายละเอียดสนาม */}
//                 <div className="p-6 flex flex-col flex-grow">
//                   <h3 className="text-xl font-bold text-gray-800 mb-2 group-hover:text-teal-600 transition-colors">{court.name}</h3>
//                   <div className="flex items-center text-gray-400 text-sm mb-4">
//                     <span className="mr-2">📍</span> สาขาหลัก (Main Branch)
//                   </div>
                  
//                   <div className="mt-auto pt-4 border-t border-gray-50 flex justify-between items-center">
//                     <div>
//                       <span className="text-2xl font-black text-teal-600">฿{court.price}</span>
//                       <span className="text-gray-400 text-xs font-bold uppercase ml-1">/ ชม.</span>
//                     </div>
//                     {/* <button 
//                       onClick={() => alert(`ไปหน้าเลือกเวลาของ ${court.name}`)}
//                       className="bg-gray-900 hover:bg-teal-600 text-white px-5 py-2.5 rounded-2xl font-bold text-sm transition-all duration-300 shadow-md active:scale-95"
//                     >
//                       จองเลย
//                     </button> */}
//                     <button 
//                       onClick={() => handleBooking(court)}
//                       className="bg-gray-900 hover:bg-teal-600 text-white px-5 py-2.5 rounded-2xl font-bold text-sm transition-all"
//                     >
//                       จองเลย
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             ))
//           ) : (
//             <div className="col-span-full py-20 text-center">
//               <div className="text-6xl mb-4">🔍</div>
//               <h3 className="text-xl font-bold text-gray-800">ไม่พบสนามในหมวดหมู่นี้</h3>
//               <p className="text-gray-500">กรุณาลองเลือกประเภทกีฬาอื่น</p>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default BookingPage;



// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';

// const BookingPage = () => {
//   const navigate = useNavigate();
//   const [filter, setFilter] = useState("ทั้งหมด");
  
//   // --- ส่วนที่เพิ่มใหม่: สถานะสำหรับการเลือกเวลา ---
//   const [selectedCourt, setSelectedCourt] = useState(null); // เก็บสนามที่กำลังจะจอง
//   const [selectedTime, setSelectedTime] = useState(null);   // เก็บเวลาที่เลือก

//   const courts = [
//     { id: 1, name: "สนามฟุตบอลหญ้าเทียม 1", category: "ฟุตบอล", price: 500, image: "https://images.unsplash.com/photo-1529900748604-07564a03e7a6?q=80&w=500" },
//     { id: 2, name: "สนามฟุตซอลในร่ม A", category: "ฟุตซอล", price: 600, image: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?q=80&w=500" },
//     { id: 3, name: "สนามแบดมินตัน A1", category: "แบดมินตัน", price: 200, image: "https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?q=80&w=500" },
//     { id: 4, name: "สนามบาสเกตบอล Standard", category: "บาสเกตบอล", price: 350, image: "https://images.unsplash.com/photo-1504450758481-7338eba7524a?q=80&w=500" },
//     { id: 5, name: "โต๊ะปิงปอง ITTF 1", category: "ปิงปอง", price: 100, image: "https://images.unsplash.com/photo-1534158914592-062992fbe900?q=80&w=500" },
//     { id: 6, name: "โต๊ะปิงปอง ITTF 2", category: "ปิงปอง", price: 100, image: "https://images.unsplash.com/photo-1609710228159-0fa9bd7c0827?q=80&w=500" },
//     { id: 7, name: "สนามวอลเลย์บอล Main Court", category: "วอลเลย์บอล", price: 400, image: "https://images.unsplash.com/photo-1592656670411-2918d70c654e?q=80&w=500" },
//     { id: 8, name: "สนามเทนนิส Hard Court", category: "เทนนิส", price: 300, image: "https://images.unsplash.com/photo-1595435064212-362637873604?q=80&w=500" },
//   ];

//   const categories = [
//     { name: "ทั้งหมด", icon: "🏠" }, { name: "ฟุตบอล", icon: "⚽" }, { name: "ฟุตซอล", icon: "👟" },
//     { name: "แบดมินตัน", icon: "🏸" }, { name: "บาสเกตบอล", icon: "🏀" }, { name: "ปิงปอง", icon: "🏓" },
//     { name: "วอลเลย์บอล", icon: "🏐" }, { name: "เทนนิส", icon: "🎾" }
//   ];

//   // จำลองช่วงเวลาที่เปิดให้จอง (Business Logic Layer)
//   const timeSlots = [
//     "09:00 - 10:00", "10:00 - 11:00", "11:00 - 12:00", 
//     "13:00 - 14:00", "14:00 - 15:00", "15:00 - 16:00",
//     "17:00 - 18:00", "18:00 - 19:00", "19:00 - 20:00"
//   ];

//   const filteredCourts = filter === "ทั้งหมด" ? courts : courts.filter(c => c.category === filter);

//   // ฟังก์ชันยืนยันการเลือกเวลาและไปหน้าชำระเงิน
//   const confirmBooking = () => {
//     if (selectedCourt && selectedTime) {
//       navigate('/pay', { 
//         state: { 
//           courtData: selectedCourt,
//           bookingTime: selectedTime 
//         } 
//       });
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-100 p-4 md:p-8">
//       <div className="max-w-7xl mx-auto">
        
//         {/* Header และ Category (เหมือนเดิม) */}
//         <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-8 gap-6">
//           <div>
//             <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight">เลือกจองสนามกีฬายอดนิยม</h1>
//             <p className="text-gray-600 mt-2 text-lg">ค้นหาสนามว่างและทำรายการจองได้ง่ายๆ</p>
//           </div>
//           <div className="flex overflow-x-auto pb-2 gap-2 no-scrollbar">
//             {categories.map(cat => (
//               <button key={cat.name} onClick={() => setFilter(cat.name)} className={`flex items-center gap-2 px-5 py-2.5 rounded-full font-bold transition-all ${filter === cat.name ? "bg-teal-600 text-white shadow-lg" : "bg-white text-gray-600 hover:bg-teal-50"}`}>
//                 <span>{cat.icon}</span> {cat.name}
//               </button>
//             ))}
//           </div>
//         </div>

//         {/* Grid แสดงรายการสนาม */}
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
//           {filteredCourts.map(court => (
//             <div key={court.id} className="group bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-2xl transition-all border border-gray-100 flex flex-col">
//               <div className="relative h-56 overflow-hidden">
//                 <img src={court.image} alt={court.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
//                 <div className="absolute top-4 right-4 bg-white/95 px-4 py-1.5 rounded-2xl text-xs font-black text-teal-700 uppercase">{court.category}</div>
//               </div>

//               <div className="p-6 flex flex-col flex-grow">
//                 <h3 className="text-xl font-bold text-gray-800 mb-4">{court.name}</h3>
//                 <div className="mt-auto flex justify-between items-center">
//                   <div>
//                     <span className="text-2xl font-black text-teal-600">฿{court.price}</span>
//                     <span className="text-gray-400 text-xs font-bold ml-1">/ ชม.</span>
//                   </div>
//                   <button 
//                     onClick={() => setSelectedCourt(court)} // เมื่อกด "จอง" ให้เปิดหน้าต่างเลือกเวลา
//                     className="bg-gray-900 hover:bg-teal-600 text-white px-5 py-2.5 rounded-2xl font-bold text-sm transition-all"
//                   >
//                     เลือกเวลา
//                   </button>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>

//         {/* --- ส่วนที่เพิ่มใหม่: Modal เลือกเวลา (Time Selection UI) --- */}
//         {selectedCourt && (
//           <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
//             <div className="bg-white rounded-[2rem] max-w-lg w-full p-8 shadow-2xl animate-in zoom-in duration-300">
//               <div className="flex justify-between items-start mb-6">
//                 <div>
//                   <h2 className="text-2xl font-black text-gray-900">เลือกเวลาที่คุณต้องการ</h2>
//                   <p className="text-teal-600 font-bold">{selectedCourt.name}</p>
//                 </div>
//                 <button onClick={() => {setSelectedCourt(null); setSelectedTime(null);}} className="text-gray-400 hover:text-red-500 text-2xl">✕</button>
//               </div>

//               <div className="grid grid-cols-2 gap-3 mb-8">
//                 {timeSlots.map((time) => (
//                   <button
//                     key={time}
//                     onClick={() => setSelectedTime(time)}
//                     className={`py-3 px-4 rounded-xl border-2 font-bold text-sm transition-all ${
//                       selectedTime === time 
//                       ? "border-teal-600 bg-teal-50 text-teal-600 shadow-inner" 
//                       : "border-gray-100 text-gray-500 hover:border-teal-200"
//                     }`}
//                   >
//                     {time}
//                   </button>
//                 ))}
//               </div>

//               <div className="flex gap-4">
//                 <button 
//                   onClick={() => {setSelectedCourt(null); setSelectedTime(null);}}
//                   className="flex-1 py-4 rounded-2xl font-bold text-gray-500 bg-gray-100 hover:bg-gray-200 transition-all"
//                 >
//                   ยกเลิก
//                 </button>
//                 <button 
//                   disabled={!selectedTime}
//                   onClick={confirmBooking}
//                   className={`flex-1 py-4 rounded-2xl font-bold text-white shadow-lg transition-all ${
//                     selectedTime ? "bg-teal-600 hover:bg-teal-700 scale-100" : "bg-gray-300 cursor-not-allowed scale-95"
//                   }`}
//                 >
//                   ยืนยันการจอง
//                 </button>
//               </div>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default BookingPage;










// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';

// const BookingPage = () => {
//   const navigate = useNavigate();
//   const [filter, setFilter] = useState("ทั้งหมด");
  
//   // --- ส่วนจัดการสถานะการจอง ---
//   const [selectedCourt, setSelectedCourt] = useState(null); 
//   const [selectedSlots, setSelectedSlots] = useState([]); // เปลี่ยนเป็น Array เพื่อเก็บหลายช่วงเวลา

//   const courts = [
//     { id: 1, name: "สนามฟุตบอลหญ้าเทียม 1", category: "ฟุตบอล", price: 500, image: "https://images.unsplash.com/photo-1529900748604-07564a03e7a6?q=80&w=500" },
//     { id: 2, name: "สนามฟุตซอลในร่ม A", category: "ฟุตซอล", price: 600, image: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?q=80&w=500" },
//     { id: 3, name: "สนามแบดมินตัน A1", category: "แบดมินตัน", price: 200, image: "https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?q=80&w=500" },
//     { id: 4, name: "สนามบาสเกตบอล Standard", category: "บาสเกตบอล", price: 350, image: "https://images.unsplash.com/photo-1504450758481-7338eba7524a?q=80&w=500" },
//     { id: 5, name: "โต๊ะปิงปอง ITTF 1", category: "ปิงปอง", price: 100, image: "https://images.unsplash.com/photo-1534158914592-062992fbe900?q=80&w=500" },
//     { id: 6, name: "โต๊ะปิงปอง ITTF 2", category: "ปิงปอง", price: 100, image: "https://images.unsplash.com/photo-1609710228159-0fa9bd7c0827?q=80&w=500" },
//     { id: 7, name: "สนามวอลเลย์บอล Main Court", category: "วอลเลย์บอล", price: 400, image: "https://images.unsplash.com/photo-1592656670411-2918d70c654e?q=80&w=500" },
//     { id: 8, name: "สนามเทนนิส Hard Court", category: "เทนนิส", price: 300, image: "https://images.unsplash.com/photo-1595435064212-362637873604?q=80&w=500" },
//   ];

//   const timeSlots = [
//     "09:00 - 10:00", "10:00 - 11:00", "11:00 - 12:00", 
//     "13:00 - 14:00", "14:00 - 15:00", "15:00 - 16:00",
//     "17:00 - 18:00", "18:00 - 19:00", "19:00 - 20:00"
//   ];

//   // ฟังก์ชันสลับการเลือกเวลา (Toggle Selection)
//   const toggleTimeSlot = (time) => {
//     if (selectedSlots.includes(time)) {
//       setSelectedSlots(selectedSlots.filter(t => t !== time));
//     } else {
//       setSelectedSlots([...selectedSlots, time]);
//     }
//   };

//   // คำนวณราคารวม (Business Logic)
//   const totalPrice = selectedCourt ? selectedSlots.length * selectedCourt.price : 0;

//   const confirmBooking = () => {
//     if (selectedCourt && selectedSlots.length > 0) {
//       navigate('/pay', { 
//         state: { 
//           courtData: selectedCourt,
//           bookingSlots: selectedSlots,
//           totalAmount: totalPrice
//         } 
//       });
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-100 p-4 md:p-8">
//       <div className="max-w-7xl mx-auto">
//         {/* ส่วนแสดงรายการสนาม (เหมือนเดิม) */}
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
//           {courts.filter(c => filter === "ทั้งหมด" || c.category === filter).map(court => (
//             <div key={court.id} className="bg-white rounded-3xl overflow-hidden shadow-sm border border-gray-100 p-6">
//               <img src={court.image} className="w-full h-40 object-cover rounded-2xl mb-4" alt={court.name} />
//               <h3 className="font-bold text-lg mb-2">{court.name}</h3>
//               <div className="flex justify-between items-center mt-4">
//                 <span className="text-xl font-black text-teal-600">฿{court.price}</span>
//                 <button 
//                   onClick={() => {setSelectedCourt(court); setSelectedSlots([]);}}
//                   className="bg-gray-900 text-white px-4 py-2 rounded-xl text-sm font-bold hover:bg-teal-600"
//                 >
//                   เลือกจอง
//                 </button>
//               </div>
//             </div>
//           ))}
//         </div>

//         {/* --- Modal เลือกหลายช่วงเวลาพร้อมคำนวณเงิน --- */}
//         {selectedCourt && (
//           <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
//             <div className="bg-white rounded-[2.5rem] max-w-2xl w-full p-8 shadow-2xl overflow-hidden">
//               <div className="flex justify-between items-start mb-6">
//                 <div>
//                   <h2 className="text-2xl font-black text-gray-900">ระบุช่วงเวลาที่ต้องการ</h2>
//                   <p className="text-teal-600 font-bold">สนาม: {selectedCourt.name}</p>
//                 </div>
//                 <button onClick={() => setSelectedCourt(null)} className="text-gray-400 hover:text-red-500">✕</button>
//               </div>

//               {/* Grid เลือกเวลา */}
//               <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-8">
//                 {timeSlots.map((time) => {
//                   const isSelected = selectedSlots.includes(time);
//                   return (
//                     <button
//                       key={time}
//                       onClick={() => toggleTimeSlot(time)}
//                       className={`py-3 px-2 rounded-2xl border-2 font-bold text-xs transition-all ${
//                         isSelected 
//                         ? "border-teal-600 bg-teal-50 text-teal-600 shadow-md" 
//                         : "border-gray-50 bg-gray-50 text-gray-500 hover:border-teal-200"
//                       }`}
//                     >
//                       {time}
//                     </button>
//                   );
//                 })}
//               </div>

//               {/* ส่วนสรุปราคา (Summary Tier) */}
//               <div className="bg-gray-900 rounded-3xl p-6 text-white mb-8">
//                 <div className="flex justify-between items-center mb-2">
//                   <span className="text-gray-400 text-sm">จำนวนที่เลือก:</span>
//                   <span className="font-bold">{selectedSlots.length} ชั่วโมง</span>
//                 </div>
//                 <div className="flex justify-between items-center border-t border-gray-700 pt-4">
//                   <span className="text-lg font-bold">ยอดชำระเงินรวม:</span>
//                   <span className="text-3xl font-black text-teal-400">฿{totalPrice.toLocaleString()}</span>
//                 </div>
//               </div>

//               <div className="flex gap-4">
//                 <button onClick={() => setSelectedCourt(null)} className="flex-1 py-4 font-bold text-gray-400">ยกเลิก</button>
//                 <button 
//                   disabled={selectedSlots.length === 0}
//                   onClick={confirmBooking}
//                   className={`flex-1 py-4 rounded-2xl font-bold text-white shadow-xl transition-all ${
//                     selectedSlots.length > 0 ? "bg-teal-600 hover:bg-teal-700" : "bg-gray-200 cursor-not-allowed"
//                   }`}
//                 >
//                   ยืนยันการจอง
//                 </button>
//               </div>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default BookingPage;











// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';

// const BookingPage = () => {
//   const navigate = useNavigate();
//   const [filter, setFilter] = useState("ทั้งหมด");
  
//   const [selectedCourt, setSelectedCourt] = useState(null); 
//   // 1. ปรับ selectedTime ให้เป็น Array เพื่อเก็บหลายช่วงเวลา
//   const [selectedTimes, setSelectedTimes] = useState([]);   

//   const courts = [
//     { id: 1, name: "สนามฟุตบอลหญ้าเทียม 1", category: "ฟุตบอล", price: 500, image: "https://images.unsplash.com/photo-1529900748604-07564a03e7a6?q=80&w=500" },
//     { id: 2, name: "สนามฟุตซอลในร่ม A", category: "ฟุตซอล", price: 600, image: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?q=80&w=500" },
//     { id: 3, name: "สนามแบดมินตัน A1", category: "แบดมินตัน", price: 200, image: "https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?q=80&w=500" },
//     { id: 4, name: "สนามบาสเกตบอล Standard", category: "บาสเกตบอล", price: 350, image: "https://images.unsplash.com/photo-1504450758481-7338eba7524a?q=80&w=500" },
//     { id: 5, name: "โต๊ะปิงปอง ITTF 1", category: "ปิงปอง", price: 100, image: "https://images.unsplash.com/photo-1534158914592-062992fbe900?q=80&w=500" },
//     { id: 6, name: "โต๊ะปิงปอง ITTF 2", category: "ปิงปอง", price: 100, image: "https://images.unsplash.com/photo-1609710228159-0fa9bd7c0827?q=80&w=500" },
//     { id: 7, name: "สนามวอลเลย์บอล Main Court", category: "วอลเลย์บอล", price: 400, image: "https://images.unsplash.com/photo-1592656670411-2918d70c654e?q=80&w=500" },
//     { id: 8, name: "สนามเทนนิส Hard Court", category: "เทนนิส", price: 300, image: "https://images.unsplash.com/photo-1595435064212-362637873604?q=80&w=500" },
//   ];


// import React, { useState, useEffect } from 'react'; // 1. เพิ่ม useEffect เข้ามา
// import { useNavigate } from 'react-router-dom';

// const BookingPage = () => {
//   const navigate = useNavigate();
//   const [filter, setFilter] = useState("ทั้งหมด");
//   const [selectedCourt, setSelectedCourt] = useState(null); 
//   const [selectedTimes, setSelectedTimes] = useState([]); 

//   // 2. เปลี่ยนจากตัวแปรธรรมดา เป็น State เพื่อเก็บข้อมูลจากฐานข้อมูล
//   const [courts, setCourts] = useState([]);

//   // 3. ใช้ useEffect ดึงข้อมูลจาก Backend ทันทีที่เปิดหน้าจอ
//   useEffect(() => {
//     const fetchCourts = async () => {
//       try {
//         const response = await fetch('http://localhost:/api/courts');
//         if (!response.ok) throw new Error('Network response was not ok'); // เช็คว่า Server ตอบกลับปกติไหม
        
//         const data = await response.json();
        
//         const formattedData = data.map(item => ({
//           id: item.id,
//           name: item.name,
//           category: item.category,
//           price: parseFloat(item.price_per_hour), 
//           image: item.image_url 
//         }));
        
//         setCourts(formattedData);
//       } catch (error) {
//         console.error("เชื่อมต่อ Database ไม่สำเร็จ:", error);
//         // อาจจะเพิ่มแจ้งเตือนผู้ใช้ตรงนี้ เช่น alert("โหลดข้อมูลสนามไม่สำเร็จ")
//       }
//     };

//     fetchCourts();
//   }, []);

//   // ... (ส่วน categories และ timeSlots คงเดิม)
//   const categories = [
//     { name: "ทั้งหมด", icon: "🏠" }, { name: "ฟุตบอล", icon: "⚽" }, { name: "ฟุตซอล", icon: "👟" },
//     { name: "แบดมินตัน", icon: "🏸" }, { name: "บาสเกตบอล", icon: "🏀" }, { name: "ปิงปอง", icon: "🏓" },
//     { name: "วอลเลย์บอล", icon: "🏐" }, { name: "เทนนิส", icon: "🎾" }
//   ];

//   const timeSlots = [
//     "09:00 - 10:00", "10:00 - 11:00", "11:00 - 12:00", 
//     "13:00 - 14:00", "14:00 - 15:00", "15:00 - 16:00",
//     "17:00 - 18:00", "18:00 - 19:00", "19:00 - 20:00"
//   ];

//   const filteredCourts = filter === "ทั้งหมด" ? courts : courts.filter(c => c.category === filter);

//   // 2. ฟังก์ชันจัดการการเลือก/ยกเลิกเวลา (Toggle Selection)
//   const handleTimeSelect = (time) => {
//     setSelectedTimes(prev => 
//       prev.includes(time) 
//         ? prev.filter(t => t !== time) // ถ้ามีอยู่แล้วให้เอาออก
//         : [...prev, time]             // ถ้ายังไม่มีให้เพิ่มเข้าไป
//     );
//   };

//   // 3. ตรรกะการคำนวณเงินสุทธิ (Business Logic)
//   const totalPrice = selectedCourt ? selectedTimes.length * selectedCourt.price : 0;

//   const confirmBooking = () => {
//     if (selectedCourt && selectedTimes.length > 0) {
//       navigate('/pay', { 
//         state: { 
//           courtData: selectedCourt,
//           bookingTimes: selectedTimes,
//           totalAmount: totalPrice
//         } 
//       });
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-100 p-4 md:p-8">
//       <div className="max-w-7xl mx-auto">
//         {/* Header ส่วนหัวเหมือนเดิม */}
//         <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-8 gap-6">
//           <div>
//             <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight">เลือกจองสนามกีฬายอดนิยม</h1>
//             <p className="text-gray-600 mt-2 text-lg">จองได้หลายช่วงเวลาพร้อมระบบคำนวณราคาอัตโนมัติ</p>
//           </div>
//           <div className="flex overflow-x-auto pb-2 gap-2 no-scrollbar">
//             {categories.map(cat => (
//               <button key={cat.name} onClick={() => setFilter(cat.name)} className={`flex items-center gap-2 px-5 py-2.5 rounded-full font-bold transition-all ${filter === cat.name ? "bg-teal-600 text-white shadow-lg" : "bg-white text-gray-600 hover:bg-teal-50"}`}>
//                 <span>{cat.icon}</span> {cat.name}
//               </button>
//             ))}
//           </div>
//         </div>

//         {/* Grid แสดงรายการสนาม */}
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
//           {filteredCourts.map(court => (
//             <div key={court.id} className="group bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-2xl transition-all border border-gray-100 flex flex-col">
//               <div className="relative h-56 overflow-hidden">
//                 <img src={court.image} alt={court.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
//               </div>
//               <div className="p-6 flex flex-col flex-grow">
//                 <h3 className="text-xl font-bold text-gray-800 mb-4">{court.name}</h3>
//                 <div className="mt-auto flex justify-between items-center">
//                   <div className="text-2xl font-black text-teal-600">฿{court.price}<span className="text-gray-400 text-xs ml-1">/ชม.</span></div>
//                   <button onClick={() => setSelectedCourt(court)} className="bg-gray-900 hover:bg-teal-600 text-white px-5 py-2.5 rounded-2xl font-bold text-sm transition-all">จองสนาม</button>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>

//         {/* Modal เลือกหลายช่วงเวลา และแสดงราคาสรุป */}
//         {selectedCourt && (
//           <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
//             <div className="bg-white rounded-[2rem] max-w-lg w-full p-8 shadow-2xl">
//               <div className="flex justify-between items-start mb-6">
//                 <div>
//                   <h2 className="text-2xl font-black text-gray-900">เลือกช่วงเวลาจอง</h2>
//                   <p className="text-teal-600 font-bold">{selectedCourt.name} (฿{selectedCourt.price}/ชม.)</p>
//                 </div>
//                 <button onClick={() => {setSelectedCourt(null); setSelectedTimes([]);}} className="text-gray-400 hover:text-red-500 text-2xl">✕</button>
//               </div>

//               <div className="grid grid-cols-2 gap-3 mb-6">
//                 {timeSlots.map((time) => (
//                   <button
//                     key={time}
//                     onClick={() => handleTimeSelect(time)}
//                     className={`py-3 px-4 rounded-xl border-2 font-bold text-sm transition-all ${
//                       selectedTimes.includes(time) 
//                       ? "border-teal-600 bg-teal-50 text-teal-600 shadow-inner" 
//                       : "border-gray-100 text-gray-500 hover:border-teal-200"
//                     }`}
//                   >
//                     {time}
//                   </button>
//                 ))}
//               </div>

//               {/* ส่วนแสดงสรุปราคา */}
//               <div className="bg-gray-50 rounded-2xl p-4 mb-8 flex justify-between items-center">
//                 <div className="text-gray-500 text-sm font-bold">
//                   เลือกแล้ว <span className="text-teal-600">{selectedTimes.length}</span> ชั่วโมง
//                 </div>
//                 <div className="text-right">
//                   <p className="text-xs text-gray-400 font-bold uppercase">รวมทั้งสิ้น</p>
//                   <p className="text-2xl font-black text-gray-900">฿{totalPrice.toLocaleString()}</p>
//                 </div>
//               </div>

//               <div className="flex gap-4">
//                 <button onClick={() => {setSelectedCourt(null); setSelectedTimes([]);}} className="flex-1 py-4 rounded-2xl font-bold text-gray-400 bg-gray-100 hover:bg-gray-200">ยกเลิก</button>
//                 <button 
//                   disabled={selectedTimes.length === 0}
//                   onClick={confirmBooking}
//                   className={`flex-1 py-4 rounded-2xl font-bold text-white shadow-lg transition-all ${
//                     selectedTimes.length > 0 ? "bg-teal-600 hover:bg-teal-700" : "bg-gray-300 cursor-not-allowed"
//                   }`}
//                 >
//                   ดำเนินการต่อ
//                 </button>
//               </div>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default BookingPage;






// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';

// const BookingPage = () => {
//   const navigate = useNavigate();
//   const [filter, setFilter] = useState("ทั้งหมด");
//   const [selectedCourt, setSelectedCourt] = useState(null); 
//   const [selectedTimes, setSelectedTimes] = useState([]); 
//   const [courts, setCourts] = useState([]);

//   // ดึงข้อมูลจาก API
//   useEffect(() => {
//     fetch('http://localhost:8000/api/courts')
//       .then(res => res.json())
//       .then(data => {
//         const formatted = data.map(item => ({
//           id: item.id,
//           name: item.name,
//           category: item.category,
//           price: parseFloat(item.price_per_hour), 
//           image: item.image_url 
//         }));
//         setCourts(formatted);
//       })
//       .catch(err => console.error("Fetch error:", err));
//   }, []);

//   const timeSlots = ["09:00 - 10:00", "10:00 - 11:00", "11:00 - 12:00", "13:00 - 14:00", "14:00 - 15:00", "15:00 - 16:00", "17:00 - 18:00", "18:00 - 19:00", "19:00 - 20:00"];
//   const categories = [{ name: "ทั้งหมด", icon: "🏠" }, { name: "ฟุตบอล", icon: "⚽" }, { name: "แบดมินตัน", icon: "🏸" }, { name: "บาสเกตบอล", icon: "🏀" }, { name: "ปิงปอง", icon: "🏓" }, { name: "วอลเลย์บอล", icon: "🏐" }];

//   const filteredCourts = filter === "ทั้งหมด" ? courts : courts.filter(c => c.category === filter);

//   const handleTimeSelect = (time) => {
//     setSelectedTimes(prev => prev.includes(time) ? prev.filter(t => t !== time) : [...prev, time]);
//   };

//   const totalPrice = selectedCourt ? selectedTimes.length * selectedCourt.price : 0;

//   // const confirmBooking = () => {
//   //   if (selectedCourt && selectedTimes.length > 0) {
//   //     navigate('/pay', { state: { courtData: selectedCourt, bookingTimes: selectedTimes, totalAmount: totalPrice } });
//   //   }
//   // };
//   // ในฟังก์ชัน confirmBooking ของ BookingPage.jsx
// const confirmBooking = () => {
//   if (selectedCourt && selectedTimes.length > 0) {
//     // ย้ายไปหน้ายืมอุปกรณ์ก่อน
//     navigate('/borrow', { 
//       state: { 
//         courtData: selectedCourt, 
//         bookingTimes: selectedTimes, 
//         courtAmount: totalPrice // เก็บราคาสนามไว้บวกต่อ
//       } 
//     });
//   }
// };

//   return (
//     <div className="min-h-screen bg-gray-100 p-4 md:p-8">
//       <div className="max-w-7xl mx-auto">
//         <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-8 gap-6">
//           <div>
//             <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight">เลือกจองสนามกีฬายอดนิยม</h1>
//             <p className="text-gray-600 mt-2 text-lg">ดึงข้อมูลจริงจากระบบออนไลน์</p>
//           </div>
//           <div className="flex overflow-x-auto pb-2 gap-2 no-scrollbar">
//             {categories.map(cat => (
//               <button key={cat.name} onClick={() => setFilter(cat.name)} className={`flex items-center gap-2 px-5 py-2.5 rounded-full font-bold transition-all ${filter === cat.name ? "bg-teal-600 text-white shadow-lg" : "bg-white text-gray-600 hover:bg-teal-50"}`}>
//                 <span>{cat.icon}</span> {cat.name}
//               </button>
//             ))}
//           </div>
//         </div>

//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
//           {filteredCourts.map(court => (
//             <div key={court.id} className="group bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-2xl transition-all border border-gray-100 flex flex-col">
//               <div className="relative h-56 overflow-hidden">
//                 <img src={court.image} alt={court.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
//               </div>
//               <div className="p-6 flex flex-col flex-grow">
//                 <h3 className="text-xl font-bold text-gray-800 mb-4">{court.name}</h3>
//                 <div className="mt-auto flex justify-between items-center">
//                   <div className="text-2xl font-black text-teal-600">฿{court.price}<span className="text-gray-400 text-xs ml-1">/ชม.</span></div>
//                   <button onClick={() => setSelectedCourt(court)} className="bg-gray-900 hover:bg-teal-600 text-white px-5 py-2.5 rounded-2xl font-bold text-sm transition-all">จองสนาม</button>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>

//         {selectedCourt && (
//           <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
//             <div className="bg-white rounded-[2rem] max-w-lg w-full p-8 shadow-2xl">
//               <div className="flex justify-between mb-6">
//                 <h2 className="text-2xl font-black">{selectedCourt.name}</h2>
//                 <button onClick={() => {setSelectedCourt(null); setSelectedTimes([]);}}>✕</button>
//               </div>
//               <div className="grid grid-cols-2 gap-3 mb-6">
//                 {timeSlots.map(time => (
//                   <button key={time} onClick={() => handleTimeSelect(time)} className={`py-3 rounded-xl border-2 font-bold ${selectedTimes.includes(time) ? "border-teal-600 bg-teal-50 text-teal-600" : "border-gray-100 text-gray-500"}`}>{time}</button>
//                 ))}
//               </div>
//               <div className="bg-gray-50 p-4 rounded-2xl mb-8 flex justify-between">
//                 <span className="text-gray-500 font-bold">ยอดรวม ({selectedTimes.length} ชม.)</span>
//                 <span className="text-2xl font-black">฿{totalPrice.toLocaleString()}</span>
//               </div>
//               <button disabled={selectedTimes.length === 0} onClick={confirmBooking} className={`w-full py-4 rounded-2xl font-bold text-white ${selectedTimes.length > 0 ? "bg-teal-600" : "bg-gray-300"}`}>ดำเนินการต่อ</button>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default BookingPage;




import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from "../../supabaseClient";

const BookingPage = () => {
  const navigate = useNavigate();
  const [filter, setFilter] = useState("ทั้งหมด");
  const [selectedCourt, setSelectedCourt] = useState(null); 
  const [selectedTimes, setSelectedTimes] = useState([]); 
  const [courts, setCourts] = useState([]);
  
  // --- ส่วนที่เพิ่มใหม่: ระบบจองล่วงหน้า ---
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [bookedTimes, setBookedTimes] = useState([]); // เก็บเวลาที่ถูกจองแล้วในวันที่เลือก

  // ดึงข้อมูลสนามทั้งหมด
  useEffect(() => {
    fetch('http://localhost:8000/api/courts')
      .then(res => res.json())
      .then(data => {
        const formatted = data
        .filter(item => item.is_available !== false) // ❗ เพิ่ม
        .map(item => ({
          id: item.id,
          name: item.name,
          category: item.category,
          price: parseFloat(item.price_per_hour),
          image: item.image_url
        }));
        setCourts(formatted);
      })
      .catch(err => console.error("Fetch error:", err));
  }, []);
  
  // --- ส่วนที่เพิ่มใหม่: ดึงสถานะสนามว่างตามวันที่และสนามที่เลือก ---
  useEffect(() => {
  //   if (selectedCourt) {
  //     fetch(`http://localhost:8000/api/booked-slots?court_id=${selectedCourt.id}&date=${selectedDate}`)
  //       .then(res => res.json())
  //       .then(data => {
  //         setBookedTimes(data); // data คือ Array ของ time_slot ที่ไม่ว่าง
  //         setSelectedTimes([]); // ล้างเวลาที่เคยเลือกไว้เมื่อเปลี่ยนวันที่หรือสนาม
  //       })
  //       .catch(err => console.error("Error fetching booked slots:", err));
  //   }
  // }, [selectedCourt, selectedDate]);
    if (!selectedCourt) return;
    
    const fetchBookedSlots = async () => {
        const res = await fetch(
          `http://localhost:8000/api/booked-slots?court_id=${selectedCourt.id}&date=${selectedDate}`
        );
        const data = await res.json();
        setBookedTimes(data);
        setSelectedTimes([]);
      };

      fetchBookedSlots(); // ✅ สำคัญมาก

      const channel = supabase
        .channel(`booking-slots-${selectedCourt.id}`)
        .on(
          'postgres_changes',
          {
            event: '*',
            schema: 'public',
            table: 'booking_time_slots'
          },
          () => {
            fetchBookedSlots(); // realtime update
          }
        )
        .subscribe();

      return () => {
        supabase.removeChannel(channel);
      };
  }, [selectedCourt, selectedDate]);

  const timeSlots = [
    "09:00 - 10:00", "10:00 - 11:00", "11:00 - 12:00", 
    "13:00 - 14:00", "14:00 - 15:00", "15:00 - 16:00", 
    "17:00 - 18:00", "18:00 - 19:00", "19:00 - 20:00"
  ];

  const categories = [
    { name: "ทั้งหมด", icon: "🏠" }, { name: "ฟุตบอล", icon: "⚽" }, 
    { name: "แบดมินตัน", icon: "🏸" }, { name: "บาสเกตบอล", icon: "🏀" }, 
    { name: "ปิงปอง", icon: "🏓" }, { name: "วอลเลย์บอล", icon: "🏐" }
  ];

  const filteredCourts = filter === "ทั้งหมด" ? courts : courts.filter(c => c.category === filter);

  const handleTimeSelect = (time) => {
    setSelectedTimes(prev => prev.includes(time) ? prev.filter(t => t !== time) : [...prev, time]);
  };

  const totalPrice = selectedCourt ? selectedTimes.length * selectedCourt.price : 0;

  const confirmBooking = () => {
    if (selectedTimes.length === 0) {
      alert("กรุณาเลือกเวลา");
      return;
    }
    if (bookedTimes.some(t => selectedTimes.includes(t))) {
      alert("มีบางช่วงเวลาถูกจองไปแล้ว");
      return;
    }
    if (selectedCourt && selectedTimes.length > 0) {
      navigate('/borrow', { 
        state: { 
          courtData: selectedCourt, 
          bookingTimes: selectedTimes, 
          bookingDate: selectedDate, // ส่งวันที่ที่เลือกไปด้วย
          courtAmount: totalPrice 
        } 
      });
    }
    // navigate('/borrow', { ... });
  };

  // คำนวณวันที่จองล่วงหน้าสูงสุด (วันนี้ + 6 วัน = 7 วัน)
  const today = new Date().toISOString().split('T')[0];
  const maxDate = new Date(Date.now() + 6 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];

  return (
    <div className="min-h-screen bg-gray-100 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-8 gap-6">
          <div>
            <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight">เลือกจองสนามกีฬายอดนิยม</h1>
            <p className="text-gray-600 mt-2 text-lg">จองล่วงหน้าได้สูงสุด 7 วัน</p>
          </div>
          <div className="flex overflow-x-auto pb-2 gap-2 no-scrollbar">
            {categories.map(cat => (
              <button key={cat.name} onClick={() => setFilter(cat.name)} className={`flex items-center gap-2 px-5 py-2.5 rounded-full font-bold transition-all ${filter === cat.name ? "bg-teal-600 text-white shadow-lg" : "bg-white text-gray-600 hover:bg-teal-50"}`}>
                <span>{cat.icon}</span> {cat.name}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {filteredCourts.map(court => (
            <div key={court.id} className="group bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-2xl transition-all border border-gray-100 flex flex-col">
              <div className="relative h-56 overflow-hidden">
                <img src={court.image} alt={court.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
              </div>
              <div className="p-6 flex flex-col flex-grow">
                <h3 className="text-xl font-bold text-gray-800 mb-4">{court.name}</h3>
                <div className="mt-auto flex justify-between items-center">
                  <div className="text-2xl font-black text-teal-600">฿{court.price}<span className="text-gray-400 text-xs ml-1">/ชม.</span></div>
                  <button onClick={() => setSelectedCourt(court)} className="bg-gray-900 hover:bg-teal-600 text-white px-5 py-2.5 rounded-2xl font-bold text-sm transition-all">จองสนาม</button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {selectedCourt && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
            <div className="bg-white rounded-[2rem] max-w-lg w-full p-8 shadow-2xl">
              <div className="flex justify-between mb-6">
                <div>
                  <h2 className="text-2xl font-black">{selectedCourt.name}</h2>
                  <p className="text-gray-500 text-sm italic">กรุณาเลือกวันที่และเวลาที่ต้องการ</p>
                </div>
                <button className="text-2xl text-gray-400 hover:text-gray-600" onClick={() => {setSelectedCourt(null); setSelectedTimes([]);}}>✕</button>
              </div>

              {/* ส่วนเลือกวันที่ (Date Selection) */}
              <div className="mb-6">
                <label className="block text-sm font-bold text-gray-700 mb-2">เลือกวันที่เข้าใช้บริการ</label>
                <input 
                  type="date" 
                  value={selectedDate}
                  min={today}
                  max={maxDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  className="w-full p-4 rounded-2xl border-2 border-gray-100 focus:border-teal-600 outline-none transition-all font-bold text-gray-700"
                />
              </div>

              {/* ส่วนเลือกเวลา (Time Slots) */}
              <div className="grid grid-cols-2 gap-3 mb-6">
                {timeSlots.map(time => {
                  const isBooked = bookedTimes.includes(time); // ตรวจสอบว่าเวลานี้เต็มหรือยัง
                  return (
                    <button 
                      key={time} 
                      disabled={isBooked}
                      onClick={() => handleTimeSelect(time)} 
                      className={`py-3 rounded-xl border-2 font-bold transition-all ${
                        isBooked 
                          ? "bg-gray-100 text-gray-300 border-gray-100 cursor-not-allowed" 
                          : selectedTimes.includes(time) 
                            ? "border-teal-600 bg-teal-50 text-teal-600 shadow-sm" 
                            : "border-gray-100 text-gray-500 hover:border-teal-200"
                      }`}
                    >
                      {time} {isBooked && "(เต็ม)"}
                    </button>
                  );
                })}
              </div>

              <div className="bg-gray-50 p-4 rounded-2xl mb-8 flex justify-between items-center">
                <span className="text-gray-500 font-bold">ยอดรวม ({selectedTimes.length} ชม.)</span>
                <span className="text-2xl font-black text-gray-900">฿{totalPrice.toLocaleString()}</span>
              </div>
              
              <button 
                disabled={selectedTimes.length === 0} 
                onClick={confirmBooking} 
                className={`w-full py-4 rounded-2xl font-bold text-white shadow-lg transition-all ${selectedTimes.length > 0 ? "bg-teal-600 hover:bg-teal-700 active:scale-95" : "bg-gray-300"}`}
              >
                {selectedTimes.length > 0 ? "ดำเนินการต่อ" : "กรุณาเลือกเวลา"}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BookingPage;