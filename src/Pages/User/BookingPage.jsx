import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';



const BookingPage = () => {
  const navigate = useNavigate();
  // 1. เพิ่มข้อมูลสนามกีฬาที่หลากหลายมากขึ้น
  const handleBooking = (court) => {
    // ส่งข้อมูลสนามที่เลือกไปยังหน้า Pay ผ่าน State
    navigate('/pay', { state: { courtData: court } });
  };
  const courts = [
    { id: 1, name: "สนามฟุตบอลหญ้าเทียม 1", category: "ฟุตบอล", price: 500, image: "https://images.unsplash.com/photo-1529900748604-07564a03e7a6?q=80&w=500" },
    { id: 2, name: "สนามฟุตซอลในร่ม A", category: "ฟุตซอล", price: 600, image: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?q=80&w=500" },
    { id: 3, name: "สนามแบดมินตัน A1", category: "แบดมินตัน", price: 200, image: "https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?q=80&w=500" },
    { id: 4, name: "สนามบาสเกตบอล Standard", category: "บาสเกตบอล", price: 350, image: "https://images.unsplash.com/photo-1504450758481-7338eba7524a?q=80&w=500" },
    { id: 5, name: "โต๊ะปิงปอง ITTF 1", category: "ปิงปอง", price: 100, image: "https://images.unsplash.com/photo-1534158914592-062992fbe900?q=80&w=500" },
    { id: 6, name: "โต๊ะปิงปอง ITTF 2", category: "ปิงปอง", price: 100, image: "https://images.unsplash.com/photo-1609710228159-0fa9bd7c0827?q=80&w=500" },
    { id: 7, name: "สนามวอลเลย์บอล Main Court", category: "วอลเลย์บอล", price: 400, image: "https://images.unsplash.com/photo-1592656670411-2918d70c654e?q=80&w=500" },
    { id: 8, name: "สนามเทนนิส Hard Court", category: "เทนนิส", price: 300, image: "https://images.unsplash.com/photo-1595435064212-362637873604?q=80&w=500" },
  ];

  // เพิ่มหมวดหมู่ที่ต้องการ
  const categories = [
    { name: "ทั้งหมด", icon: "🏠" },
    { name: "ฟุตบอล", icon: "⚽" },
    { name: "ฟุตซอล", icon: "👟" },
    { name: "แบดมินตัน", icon: "🏸" },
    { name: "บาสเกตบอล", icon: "🏀" },
    { name: "ปิงปอง", icon: "🏓" },
    { name: "วอลเลย์บอล", icon: "🏐" },
    { name: "เทนนิส", icon: "🎾" }
  ];

  const [filter, setFilter] = useState("ทั้งหมด");

  const filteredCourts = filter === "ทั้งหมด" 
    ? courts 
    : courts.filter(c => c.category === filter);

  return (
    <div className="min-h-screen bg-gray-100 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        
        {/* Header ส่วนหัว */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-8 gap-6">
          <div>
            <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight">เลือกจองสนามกีฬายอดนิยม</h1>
            <p className="text-gray-600 mt-2 text-lg">ค้นหาสนามว่างและทำรายการจองได้ง่ายๆ ภายในไม่กี่นาที</p>
          </div>
          
          {/* ส่วนตัวเลือกประเภทกีฬาแบบ Scroll ในมือถือ */}
          <div className="flex overflow-x-auto pb-2 gap-2 no-scrollbar">
            {categories.map(cat => (
              <button
                key={cat.name}
                onClick={() => setFilter(cat.name)}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-full font-bold whitespace-nowrap transition-all duration-300 ${
                  filter === cat.name 
                  ? "bg-teal-600 text-white shadow-lg scale-105" 
                  : "bg-white text-gray-600 hover:bg-teal-50 border border-transparent hover:border-teal-200"
                }`}
              >
                <span>{cat.icon}</span>
                {cat.name}
              </button>
            ))}
          </div>
        </div>

        {/* รายงานจำนวนสนามที่พบ */}
        <div className="mb-6">
          <p className="text-gray-500 font-medium">พบสนามทั้งหมด {filteredCourts.length} รายการ</p>
        </div>

        {/* Grid แสดงรายการสนามแบบ Card */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {filteredCourts.length > 0 ? (
            filteredCourts.map(court => (
              <div key={court.id} className="group bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 border border-gray-100 flex flex-col">
                {/* ส่วนรูปภาพพร้อม Overlay */}
                <div className="relative h-56 overflow-hidden">
                  <img 
                    src={court.image} 
                    alt={court.name} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-md px-4 py-1.5 rounded-2xl text-xs font-black text-teal-700 shadow-sm">
                    {court.category.toUpperCase()}
                  </div>
                </div>

                {/* รายละเอียดสนาม */}
                <div className="p-6 flex flex-col flex-grow">
                  <h3 className="text-xl font-bold text-gray-800 mb-2 group-hover:text-teal-600 transition-colors">{court.name}</h3>
                  <div className="flex items-center text-gray-400 text-sm mb-4">
                    <span className="mr-2">📍</span> สาขาหลัก (Main Branch)
                  </div>
                  
                  <div className="mt-auto pt-4 border-t border-gray-50 flex justify-between items-center">
                    <div>
                      <span className="text-2xl font-black text-teal-600">฿{court.price}</span>
                      <span className="text-gray-400 text-xs font-bold uppercase ml-1">/ ชม.</span>
                    </div>
                    {/* <button 
                      onClick={() => alert(`ไปหน้าเลือกเวลาของ ${court.name}`)}
                      className="bg-gray-900 hover:bg-teal-600 text-white px-5 py-2.5 rounded-2xl font-bold text-sm transition-all duration-300 shadow-md active:scale-95"
                    >
                      จองเลย
                    </button> */}
                    <button 
                      onClick={() => handleBooking(court)}
                      className="bg-gray-900 hover:bg-teal-600 text-white px-5 py-2.5 rounded-2xl font-bold text-sm transition-all"
                    >
                      จองเลย
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full py-20 text-center">
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-xl font-bold text-gray-800">ไม่พบสนามในหมวดหมู่นี้</h3>
              <p className="text-gray-500">กรุณาลองเลือกประเภทกีฬาอื่น</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BookingPage;