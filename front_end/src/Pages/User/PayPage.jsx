// import React from 'react';

// export default function PayPage() {
//   return (
//     <div className="p-8 max-w-6xl mx-auto">
//       <h1 className="text-2xl font-bold mb-6">Pay</h1>
//       <div className="flex flex-col md:flex-row gap-8 bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
//         <div className="flex-1 bg-gray-100 rounded-2xl h-64 flex items-center justify-center text-gray-400">
//            [ รูปภาพสนาม ]
//         </div>
//         <div className="flex-1">
//           <h2 className="text-3xl font-bold mb-2">Title สนามฟุตบอล</h2>
//           <div className="text-2xl font-bold text-teal-600 mb-4">$50 <span className="text-sm text-gray-400">/ hr</span></div>
//           <ul className="text-gray-500 space-y-2 mb-8 text-sm">
//             <li>• รายละเอียดการจอง 1</li>
//             <li>• รายละเอียดการจอง 2</li>
//           </ul>
//           <button className="w-full bg-black text-white py-3 rounded-xl mb-3">Confirm Payment</button>
//           <button className="w-full bg-red-500 text-white py-3 rounded-xl">Back</button>
//         </div>
//       </div>
//     </div>
//   );
// }





import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

export default function PayPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const court = location.state?.courtData; // รับข้อมูลที่ส่งมาจาก BookingPage
  const [file, setFile] = useState(null);

  const handleConfirm = () => {
    if (!file) return alert("กรุณาอัปโหลดสลิปเพื่อยืนยันการชำระเงิน");
    alert("ส่งสลิปเรียบร้อย! กรุณารอแอดมินตรวจสอบสถานะในหน้าประวัติ");
    navigate('/history');
  };

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">ชำระเงิน</h1>
      <div className="bg-white p-8 rounded-3xl shadow-sm border flex flex-col md:flex-row gap-8">
        <div className="flex-1">
          <img src={court?.image} className="rounded-2xl h-48 w-full object-cover mb-4" />
          <h2 className="text-2xl font-bold">{court?.name || "ยังไม่ได้เลือกสนาม"}</h2>
          <p className="text-teal-600 font-bold text-xl">ยอดที่ต้องชำระ: ฿{court?.price}</p>
        </div>
        <div className="flex-1 space-y-4">
          <label className="block font-bold text-gray-700">อัปโหลดสลิปโอนเงิน (PromptPay)</label>
          <input 
            type="file" 
            onChange={(e) => setFile(e.target.files[0])}
            className="w-full p-3 border-2 border-dashed rounded-xl" 
          />
          <button onClick={handleConfirm} className="w-full bg-black text-white py-4 rounded-xl font-bold">ยืนยันการชำระเงิน</button>
          <button onClick={() => navigate(-1)} className="w-full text-gray-500 font-bold">ย้อนกลับ</button>
        </div>
      </div>
    </div>
  );
}