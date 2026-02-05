


// import React, { useState } from 'react';

// const HistoryPage = () => {
//   // 1. เพิ่มสถานะ 'all' เป็นค่าเริ่มต้น
//   const [activeTab, setActiveTab] = useState('all');

//   const historyData = [
//     {
//       id: 1,
//       title: "สนามกีฬา ABC",
//       type: "ฟุตบอล 7 คน",
//       date: "23 เม.ย. 2026 | 17:00 - 19:00",
//       items: "ลูกฟุตบอล x1, เสื้อกัน x10",
//       status: "booked",
//       statusText: "จองสำเร็จ",
//     },
//     {
//       id: 2,
//       title: "Sport Complex B",
//       type: "แบดมินตัน",
//       date: "10 เม.ย. 2026 | 10:00 - 11:00",
//       items: "ไม้แบต x2, ลูกขนไก่ x6",
//       price: "600 บาท",
//       status: "booked",
//       statusText: "จองสำเร็จ",
//     },
//     {
//       id: 3,
//       title: "Greenfield Tennis",
//       type: "เทนนิส",
//       date: "10 เม.ย. 2026 | 18:00 - 20:00",
//       items: "",
//       status: "cancelled",
//       statusText: "ยกเลิกแล้ว",
//       note: "ยกเลิกโดยผู้ใช้",
//     },
//     {
//       id: 4,
//       title: "Elite Sport Center",
//       type: "เทนนิส",
//       date: "28 เม.ย. 2026 | 14:00 - 16:00",
//       items: "ไม้เทนนิส x2, ลูกเทนนิส x6",
//       price: "700 บาท",
//       status: "pending",
//       statusText: "กำลังรอการชำระเงิน",
//     }
//   ];

//   // 2. ปรับ Logic การ Filter ให้รองรับ 'all'
//   const filteredData = activeTab === 'all' 
//     ? historyData 
//     : historyData.filter(item => item.status === activeTab);

//   return (
//     <div className="max-w-6xl mx-auto p-6 bg-gray-50 min-h-screen">
//       <h1 className="text-2xl font-bold mb-6">ประวัติการจอง</h1>

//       {/* 3. เพิ่มปุ่ม "ทั้งหมด" ใน Tabs */}
//       <div className="flex flex-wrap gap-4 mb-8 border-b border-gray-200 pb-2">
//         <button 
//           onClick={() => setActiveTab('all')}
//           className={`px-4 py-2 rounded-lg font-medium transition-all ${activeTab === 'all' ? 'bg-gray-800 text-white' : 'text-gray-500 hover:bg-gray-100'}`}
//         >
//           ทั้งหมด ({historyData.length})
//         </button>
//         <button 
//           onClick={() => setActiveTab('booked')}
//           className={`px-4 py-2 rounded-lg font-medium transition-all ${activeTab === 'booked' ? 'bg-green-600 text-white' : 'text-gray-500 hover:bg-gray-100'}`}
//         >
//           จองแล้ว ({historyData.filter(i => i.status === 'booked').length})
//         </button>
//         <button 
//           onClick={() => setActiveTab('cancelled')}
//           className={`px-4 py-2 rounded-lg font-medium transition-all ${activeTab === 'cancelled' ? 'bg-red-500 text-white' : 'text-gray-500 hover:bg-gray-100'}`}
//         >
//           ยกเลิก ({historyData.filter(i => i.status === 'cancelled').length})
//         </button>
//         <button 
//           onClick={() => setActiveTab('pending')}
//           className={`px-4 py-2 rounded-lg font-medium transition-all ${activeTab === 'pending' ? 'bg-yellow-500 text-white' : 'text-gray-500 hover:bg-gray-100'}`}
//         >
//           กำลังจอง ({historyData.filter(i => i.status === 'pending').length})
//         </button>
//       </div>

//       <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//         {filteredData.map((item) => (
//           <div key={item.id} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 relative hover:shadow-md transition-shadow">
//             <div className="flex justify-between items-start mb-4">
//               <h3 className="text-lg font-bold text-gray-800">{item.title}</h3>
//               <span className={`px-3 py-1 rounded-full text-xs font-bold ${
//                 item.status === 'booked' ? 'bg-green-100 text-green-600' : 
//                 item.status === 'cancelled' ? 'bg-red-100 text-red-500' : 'bg-yellow-100 text-yellow-600'
//               }`}>
//                 {item.statusText}
//               </span>
//             </div>

//             <div className="space-y-3 text-sm text-gray-600">
//               <div className="flex items-center gap-2">⚽ {item.type}</div>
//               <div className="flex items-center gap-2">📅 {item.date}</div>
//               {item.items && <div className="flex items-center gap-2">👕 {item.items}</div>}
//               {item.price && <div className="text-right font-bold text-lg text-gray-800">{item.price}</div>}
//               {item.note && <div className="text-right text-red-500 font-medium">{item.note}</div>}
//             </div>

//             <div className="mt-6 flex justify-end gap-2 border-t pt-4">
//               {item.status === 'pending' ? (
//                 <>
//                   <button className="bg-orange-100 text-orange-600 px-4 py-2 rounded-lg text-sm font-bold hover:bg-orange-200 transition-colors">ชำระเงิน</button>
//                   <button className="bg-red-50 text-red-500 px-4 py-2 rounded-lg text-sm font-bold hover:bg-red-100 transition-colors">ยกเลิก</button>
//                 </>
//               ) : (
//                 <button className="border border-gray-300 px-4 py-2 rounded-lg text-sm font-bold flex items-center gap-1 hover:bg-gray-50 transition-colors text-gray-700">
//                   🔄 จองใหม่
//                 </button>
//               )}
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default HistoryPage;










import React, { useState } from 'react';

const HistoryPage = () => {
  const [activeTab, setActiveTab] = useState('all');

  // ข้อมูลจำลองที่รองรับรูปแบบ Array ของเวลา (bookingTimes)
  const historyData = [
    {
      id: 1,
      title: "สนามกีฬา ABC",
      type: "ฟุตบอล 7 คน",
      date: "23 เม.ย. 2026",
      bookingTimes: ["17:00 - 18:00", "18:00 - 19:00"], // จองต่อเนื่อง
      items: "ลูกฟุตบอล x1, เสื้อกัน x10",
      price: "1,000 บาท",
      status: "booked",
      statusText: "จองสำเร็จ",
    },
    {
      id: 2,
      title: "Sport Complex B",
      type: "แบดมินตัน",
      date: "10 เม.ย. 2026",
      bookingTimes: ["10:00 - 11:00"], 
      items: "ไม้แบต x2, ลูกขนไก่ x6",
      price: "600 บาท",
      status: "booked",
      statusText: "จองสำเร็จ",
    },
    {
      id: 3,
      title: "Greenfield Tennis",
      type: "เทนนิส",
      date: "10 เม.ย. 2026",
      bookingTimes: ["18:00 - 19:00", "19:00 - 20:00"],
      items: "",
      status: "cancelled",
      statusText: "ยกเลิกแล้ว",
      note: "ยกเลิกโดยผู้ใช้",
    },
    {
      id: 4,
      title: "Elite Sport Center",
      type: "เทนนิส",
      date: "28 เม.ย. 2026",
      bookingTimes: ["14:00 - 15:00", "15:00 - 16:00"],
      items: "ไม้เทนนิส x2, ลูกเทนนิส x6",
      price: "700 บาท",
      status: "pending",
      statusText: "กำลังรอการชำระเงิน",
    }
  ];

  // ฟังก์ชันช่วยจัดรูปแบบเวลาสำหรับการแสดงผล (Presentation Logic)
  const formatTimeDisplay = (times) => {
    if (!times || times.length === 0) return "ไม่ได้ระบุเวลา";
    if (times.length === 1) return times[0];

    // เรียงเวลาและดึงเวลาเริ่ม - เวลาสิ้นสุด
    const sorted = [...times].sort();
    const start = sorted[0].split(" - ")[0];
    const end = sorted[sorted.length - 1].split(" - ")[1];
    
    return `${start} - ${end} (${times.length} ชม.)`;
  };

  const filteredData = activeTab === 'all' 
    ? historyData 
    : historyData.filter(item => item.status === activeTab);

  return (
    <div className="max-w-6xl mx-auto p-6 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-black text-gray-900 mb-8">ประวัติการจอง</h1>

      {/* Tabs Filter */}
      <div className="flex flex-wrap gap-3 mb-8 border-b border-gray-200 pb-4">
        {[
          { id: 'all', label: 'ทั้งหมด', color: 'bg-gray-800' },
          { id: 'booked', label: 'จองสำเร็จ', color: 'bg-green-600' },
          { id: 'cancelled', label: 'ยกเลิกแล้ว', color: 'bg-red-500' },
          { id: 'pending', label: 'รอชำระเงิน', color: 'bg-yellow-500' }
        ].map(tab => (
          <button 
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-5 py-2.5 rounded-xl font-bold transition-all text-sm ${
              activeTab === tab.id 
              ? `${tab.color} text-white shadow-lg` 
              : 'text-gray-500 bg-white hover:bg-gray-100 border border-gray-100'
            }`}
          >
            {tab.label} ({tab.id === 'all' ? historyData.length : historyData.filter(i => i.status === tab.id).length})
          </button>
        ))}
      </div>

      {/* Booking Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredData.length > 0 ? filteredData.map((item) => (
          <div key={item.id} className="bg-white p-6 rounded-[2rem] shadow-sm border border-gray-100 relative hover:shadow-xl transition-all duration-300">
            <div className="flex justify-between items-start mb-6">
              <div>
                <h3 className="text-xl font-bold text-gray-800 mb-1">{item.title}</h3>
                <p className="text-teal-600 font-bold text-sm uppercase tracking-wider">{item.type}</p>
              </div>
              <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest ${
                item.status === 'booked' ? 'bg-green-50 text-green-600' : 
                item.status === 'cancelled' ? 'bg-red-50 text-red-500' : 'bg-yellow-50 text-yellow-600'
              }`}>
                {item.statusText}
              </span>
            </div>

            <div className="space-y-4 text-sm text-gray-600 bg-gray-50 p-4 rounded-2xl mb-6">
              <div className="flex items-center gap-3">
                <span className="text-lg">📅</span> 
                <span className="font-bold">{item.date}</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-lg">⏰</span> 
                <span className="font-black text-gray-900">{formatTimeDisplay(item.bookingTimes)}</span>
              </div>
              {item.items && (
                <div className="flex items-center gap-3">
                  <span className="text-lg">👕</span> 
                  <span>{item.items}</span>
                </div>
              )}
            </div>

            <div className="flex justify-between items-end border-t border-gray-50 pt-4">
              <div className="text-left">
                {item.note && <p className="text-xs text-red-500 font-bold mb-1">! {item.note}</p>}
                <p className="text-xs text-gray-400 font-bold uppercase">ยอดชำระสุทธิ</p>
                <p className="text-2xl font-black text-gray-900">{item.price || "฿0"}</p>
              </div>

              <div className="flex gap-2">
                {item.status === 'pending' ? (
                  <>
                    <button className="bg-teal-600 text-white px-5 py-2.5 rounded-xl text-xs font-black hover:bg-teal-700 shadow-md">ชำระเงิน</button>
                    <button className="bg-red-50 text-red-500 px-5 py-2.5 rounded-xl text-xs font-black hover:bg-red-100">ยกเลิก</button>
                  </>
                ) : (
                  <button className="bg-gray-900 text-white px-5 py-2.5 rounded-xl text-xs font-black hover:bg-teal-600 flex items-center gap-2 transition-all shadow-md">
                    <span>🔄</span> จองอีกครั้ง
                  </button>
                )}
              </div>
            </div>
          </div>
        )) : (
          <div className="col-span-full py-20 text-center bg-white rounded-[3rem] border-2 border-dashed border-gray-100">
             <p className="text-4xl mb-4">📭</p>
             <p className="text-gray-400 font-bold">ไม่พบประวัติการจองในหมวดนี้</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default HistoryPage;