// import React from 'react';

// export default function HomePage() {
//   return (
//     <div className="p-8 flex flex-col items-center">
//       <div className="w-full max-w-4xl bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
//         <div className="flex justify-between items-center mb-4">
//           <h2 className="font-bold">June 2025</h2>
//           <div className="flex gap-2">
//             <button className="p-1 border rounded">{"<"}</button>
//             <button className="p-1 border rounded">{">"}</button>
//           </div>
//         </div>
//         {/* จำลองปฏิทิน */}
//         <div className="grid grid-cols-7 gap-2 text-center text-sm">
//           {['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'].map(d => <div key={d} className="font-bold py-2">{d}</div>)}
//           {Array.from({ length: 30 }, (_, i) => (
//             <div key={i} className={`p-4 border rounded-lg hover:bg-teal-50 cursor-pointer ${i+1 === 26 ? 'bg-teal-500 text-white' : ''}`}>
//               {i + 1}
//             </div>
//           ))}
//         </div>
//       </div>
//       <div className="w-full max-w-4xl mt-8 grid grid-cols-3 gap-4">
//         <div className="h-32 bg-gray-200 rounded-xl flex items-center justify-center">รูปข่าวสารกีฬา</div>
//         <div className="h-32 bg-gray-200 rounded-xl flex items-center justify-center">รูปข่าวสารกีฬา</div>
//         <div className="h-32 bg-gray-200 rounded-xl flex items-center justify-center">รูปข่าวสารกีฬา</div>
//       </div>
//     </div>
//   );
// }
// import React from "react";

// export default function HomePage() {
//   return (
//     <div className="p-8 flex justify-center">
//       {/* CARD ใหญ่ */}
//       <div className="w-full max-w-5xl bg-white rounded-2xl shadow-md border border-gray-200 overflow-hidden">

//         {/* ===== รูปสนาม ===== */}
//         <div className="h-72 w-full">
//           <img
//             src="https://images.unsplash.com/photo-1508609349937-5ec4ae374ebf"
//             alt="stadium"
//             className="w-full h-full object-cover"
//           />
//         </div>

//         {/* ===== ปฏิทิน ===== */}
//         <div className="p-6">
//           <div className="flex justify-between items-center mb-4">
//             <h2 className="font-bold text-lg">June 2025</h2>
//             <div className="flex gap-2">
//               <button className="px-2 py-1 border rounded hover:bg-gray-100">
//                 {"<"}
//               </button>
//               <button className="px-2 py-1 border rounded hover:bg-gray-100">
//                 {">"}
//               </button>
//             </div>
//           </div>

//           {/* หัววัน */}
//           <div className="grid grid-cols-7 text-center text-sm font-semibold text-gray-600 mb-2">
//             {["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"].map((d) => (
//               <div key={d}>{d}</div>
//             ))}
//           </div>

//           {/* วันที่ */}
//           <div className="grid grid-cols-7 gap-2 text-center text-sm">
//             {Array.from({ length: 30 }, (_, i) => (
//               <div
//                 key={i}
//                 className={`py-3 border rounded-lg cursor-pointer
//                   hover:bg-teal-50
//                   ${i + 1 === 26 ? "bg-teal-500 text-white font-bold" : ""}
//                 `}
//               >
//                 {i + 1}
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }
import { useState, useEffect } from "react";
import BookingCalendar from "../../components/BookingCalendar";

export default function HomePage() {
  const images = [
    "https://i.pinimg.com/1200x/ac/ea/bd/aceabd555e4f6a1e4d2c6151383397f5.jpg",
    "https://i.pinimg.com/1200x/cc/b4/ed/ccb4ed99cad4201e54e18085d132812b.jpg",
    "https://i.pinimg.com/1200x/0f/ad/ee/0fadee641661bfb0a1e1bed51d2a5c94.jpg",
    "https://i.pinimg.com/1200x/8d/74/09/8d7409f39ced59cbdf9c73b476f0ba5a.jpg"
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 3000); // เปลี่ยนรูปทุก 3 วินาที

    return () => clearInterval(interval);
  }, []);

  const handleSelectDate = (date) => {
    console.log("เลือกวันที่:", date);
  };

  return (
    <div className="p-8 flex justify-center">
      <div className="w-full max-w-7xl bg-white rounded-2xl shadow border overflow-hidden">

        {/* รูปสนาม (Slider) */}
        <div className="h-125 relative">
          <img
            src={images[currentIndex]}
            className="w-full h-full object-cover transition-opacity duration-800"
          />
        </div>

        {/* ปฏิทิน */}
        <div className="p-6">
          <BookingCalendar onSelectDate={handleSelectDate} />
        </div>

      </div>
    </div>
  );
}