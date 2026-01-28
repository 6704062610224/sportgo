


import React, { useState } from 'react';

const HistoryPage = () => {
  // 1. เพิ่มสถานะ 'all' เป็นค่าเริ่มต้น
  const [activeTab, setActiveTab] = useState('all');

  const historyData = [
    {
      id: 1,
      title: "สนามกีฬา ABC",
      type: "ฟุตบอล 7 คน",
      date: "23 เม.ย. 2026 | 17:00 - 19:00",
      items: "ลูกฟุตบอล x1, เสื้อกัน x10",
      status: "booked",
      statusText: "จองสำเร็จ",
    },
    {
      id: 2,
      title: "Sport Complex B",
      type: "แบดมินตัน",
      date: "10 เม.ย. 2026 | 10:00 - 11:00",
      items: "ไม้แบต x2, ลูกขนไก่ x6",
      price: "600 บาท",
      status: "booked",
      statusText: "จองสำเร็จ",
    },
    {
      id: 3,
      title: "Greenfield Tennis",
      type: "เทนนิส",
      date: "10 เม.ย. 2026 | 18:00 - 20:00",
      items: "",
      status: "cancelled",
      statusText: "ยกเลิกแล้ว",
      note: "ยกเลิกโดยผู้ใช้",
    },
    {
      id: 4,
      title: "Elite Sport Center",
      type: "เทนนิส",
      date: "28 เม.ย. 2026 | 14:00 - 16:00",
      items: "ไม้เทนนิส x2, ลูกเทนนิส x6",
      price: "700 บาท",
      status: "pending",
      statusText: "กำลังรอการชำระเงิน",
    }
  ];

  // 2. ปรับ Logic การ Filter ให้รองรับ 'all'
  const filteredData = activeTab === 'all' 
    ? historyData 
    : historyData.filter(item => item.status === activeTab);

  return (
    <div className="max-w-6xl mx-auto p-6 bg-gray-50 min-h-screen">
      <h1 className="text-2xl font-bold mb-6">ประวัติการจอง</h1>

      {/* 3. เพิ่มปุ่ม "ทั้งหมด" ใน Tabs */}
      <div className="flex flex-wrap gap-4 mb-8 border-b border-gray-200 pb-2">
        <button 
          onClick={() => setActiveTab('all')}
          className={`px-4 py-2 rounded-lg font-medium transition-all ${activeTab === 'all' ? 'bg-gray-800 text-white' : 'text-gray-500 hover:bg-gray-100'}`}
        >
          ทั้งหมด ({historyData.length})
        </button>
        <button 
          onClick={() => setActiveTab('booked')}
          className={`px-4 py-2 rounded-lg font-medium transition-all ${activeTab === 'booked' ? 'bg-green-600 text-white' : 'text-gray-500 hover:bg-gray-100'}`}
        >
          จองแล้ว ({historyData.filter(i => i.status === 'booked').length})
        </button>
        <button 
          onClick={() => setActiveTab('cancelled')}
          className={`px-4 py-2 rounded-lg font-medium transition-all ${activeTab === 'cancelled' ? 'bg-red-500 text-white' : 'text-gray-500 hover:bg-gray-100'}`}
        >
          ยกเลิก ({historyData.filter(i => i.status === 'cancelled').length})
        </button>
        <button 
          onClick={() => setActiveTab('pending')}
          className={`px-4 py-2 rounded-lg font-medium transition-all ${activeTab === 'pending' ? 'bg-yellow-500 text-white' : 'text-gray-500 hover:bg-gray-100'}`}
        >
          กำลังจอง ({historyData.filter(i => i.status === 'pending').length})
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredData.map((item) => (
          <div key={item.id} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 relative hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-lg font-bold text-gray-800">{item.title}</h3>
              <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                item.status === 'booked' ? 'bg-green-100 text-green-600' : 
                item.status === 'cancelled' ? 'bg-red-100 text-red-500' : 'bg-yellow-100 text-yellow-600'
              }`}>
                {item.statusText}
              </span>
            </div>

            <div className="space-y-3 text-sm text-gray-600">
              <div className="flex items-center gap-2">⚽ {item.type}</div>
              <div className="flex items-center gap-2">📅 {item.date}</div>
              {item.items && <div className="flex items-center gap-2">👕 {item.items}</div>}
              {item.price && <div className="text-right font-bold text-lg text-gray-800">{item.price}</div>}
              {item.note && <div className="text-right text-red-500 font-medium">{item.note}</div>}
            </div>

            <div className="mt-6 flex justify-end gap-2 border-t pt-4">
              {item.status === 'pending' ? (
                <>
                  <button className="bg-orange-100 text-orange-600 px-4 py-2 rounded-lg text-sm font-bold hover:bg-orange-200 transition-colors">ชำระเงิน</button>
                  <button className="bg-red-50 text-red-500 px-4 py-2 rounded-lg text-sm font-bold hover:bg-red-100 transition-colors">ยกเลิก</button>
                </>
              ) : (
                <button className="border border-gray-300 px-4 py-2 rounded-lg text-sm font-bold flex items-center gap-1 hover:bg-gray-50 transition-colors text-gray-700">
                  🔄 จองใหม่
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HistoryPage;