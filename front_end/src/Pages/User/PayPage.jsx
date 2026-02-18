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





// import React, { useState } from 'react';
// import { useLocation, useNavigate } from 'react-router-dom';

// export default function PayPage() {
//   const location = useLocation();
//   const navigate = useNavigate();
//   const court = location.state?.courtData; // รับข้อมูลที่ส่งมาจาก BookingPage
//   const [file, setFile] = useState(null);

//   const handleConfirm = () => {
//     if (!file) return alert("กรุณาอัปโหลดสลิปเพื่อยืนยันการชำระเงิน");
//     alert("ส่งสลิปเรียบร้อย! กรุณารอแอดมินตรวจสอบสถานะในหน้าประวัติ");
//     navigate('/history');
//   };

//   return (
//     <div className="p-8 max-w-4xl mx-auto">
//       <h1 className="text-3xl font-bold mb-6">ชำระเงิน</h1>
//       <div className="bg-white p-8 rounded-3xl shadow-sm border flex flex-col md:flex-row gap-8">
//         <div className="flex-1">
//           <img src={court?.image} className="rounded-2xl h-48 w-full object-cover mb-4" />
//           <h2 className="text-2xl font-bold">{court?.name || "ยังไม่ได้เลือกสนาม"}</h2>
//           <p className="text-teal-600 font-bold text-xl">ยอดที่ต้องชำระ: ฿{location.state?.totalAmount}</p>
//         </div>
//         <div className="flex-1 space-y-4">
//           <label className="block font-bold text-gray-700">อัปโหลดสลิปโอนเงิน (PromptPay)</label>
//           <input 
//             type="file" 
//             onChange={(e) => setFile(e.target.files[0])}
//             className="w-full p-3 border-2 border-dashed rounded-xl" 
//           />
//           <button onClick={handleConfirm} className="w-full bg-black text-white py-4 rounded-xl font-bold">ยืนยันการชำระเงิน</button>
//           <button onClick={() => navigate(-1)} className="w-full text-gray-500 font-bold">ย้อนกลับ</button>
//         </div>
//       </div>
//     </div>
//   );
// }







// PayPage.jsx (ฉบับสมบูรณ์)
import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { supabase } from "../../supabaseClient";

export default function PayPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  // รับข้อมูลครบชุดจากหน้าก่อนหน้า
  const { courtData, bookingTimes, totalAmount, selectedEquipments, user_id } = location.state || {};
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const formatTimeRange = (times) => {
    if (!times || times.length === 0) return "";

    // 1. เรียงลำดับเวลาจากน้อยไปมาก
    const sortedTimes = [...times].sort((a, b) => {
      return parseInt(a.split(":")[0]) - parseInt(b.split(":")[0]);
    });

    let ranges = [];
    let currentRange = null;

    sortedTimes.forEach((timeStr) => {
      const [start, end] = timeStr.split(" - ");
      
      if (!currentRange) {
        currentRange = { start, end };
      } else {
        // 2. เช็คว่าเวลาเริ่มต้นของอันนี้ ตรงกับเวลาสิ้นสุดของอันก่อนหน้าหรือไม่ (ต่อเนื่องกัน)
        if (start === currentRange.end) {
          currentRange.end = end; // ขยายช่วงเวลาออกไป
        } else {
          // 3. ถ้าไม่ต่อเนื่อง ให้เก็บช่วงเก่าแล้วเริ่มช่วงใหม่
          ranges.push(`${currentRange.start} - ${currentRange.end}`);
          currentRange = { start, end };
        }
      }
    });
    
    if (currentRange) {
      ranges.push(`${currentRange.start} - ${currentRange.end}`);
    }

    return ranges.join(", "); // จะได้ผลลัพธ์เช่น "09:00 - 11:00, 14:00 - 15:00"
  };
  // const handleConfirm = async () => {
  //   if (!file) return alert("กรุณาอัปโหลดสลิปก่อนครับ");
  //   setLoading(true);

  //   try {
  //     // 1. บันทึกลงตาราง bookings
  //     const { data: booking, error: bError } = await supabase
  //       .from('bookings')
  //       .insert([{ 
  //           court_id: courtData.id, 
  //           user_id: user_id, // อย่าลืมส่ง ID ผู้ใช้มาจากหน้า Login
  //           total_price: totalAmount,
  //           status: 'waiting_verify'
  //       }])
  //       .select()
  //       .single();

  //     if (bError) throw bError;

  //     // 2. บันทึกเวลาลง booking_time_slots
  //     const timeData = bookingTimes.map(time => ({
  //       booking_id: booking.id,
  //       time_slot: time
  //     }));
  //     await supabase.from('booking_time_slots').insert(timeData);

  //     // 3. บันทึกอุปกรณ์ลง booking_equipments (ถ้ามี)
  //     if (selectedEquipments && selectedEquipments.length > 0) {
  //       const equipData = selectedEquipments.map(item => ({
  //         booking_id: booking.id,
  //         equipment_id: item.id,
  //         quantity: item.quantity
  //       }));
  //       await supabase.from('booking_equipments').insert(equipData);
  //     }

  //     alert("จองสำเร็จ! รอแอดมินตรวจสอบสลิปนะครับ");
  //     navigate('/history');
  //   } catch (err) {
  //     alert("เกิดข้อผิดพลาด: " + err.message);
  //   } finally {
  //     setLoading(false);
  //   }
  // };
// PayPage.jsx (ฟังก์ชันเมื่อกดส่งสลิป)
  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        setUser(user);
      } else {
        alert("กรุณาเข้าสู่ระบบก่อนชำระเงิน");
        navigate('/login');
      }
    };
    getUser();
  }, [navigate]);

  const handleConfirmPayment = async () => {
    if (!user) return alert("รอกำลังโหลดข้อมูลผู้ใช้...");
    const payload = {
      user_id: user.id, // ID จากระบบ Login
      court_id: courtData?.id, 
      bookingTimes: bookingTimes, // ["09:00 - 10:00", ...]
      selectedEquipments: selectedEquipments, // [{id, quantity}, ...]
      total_price: totalAmount
    };

    try {
      const response = await fetch('http://localhost:5000/api/create-booking', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      const result = await response.json();
      if (result.success) {
        alert("จองสำเร็จ!");
        navigate('/history');
      } else {
        alert("เกิดข้อผิดพลาด: " + result.error);
      }
    } catch (error) {
      console.error("Network Error:", error);
    }
  };
  return (
    <div className="p-8 max-w-4xl mx-auto">
      {/* ส่วนแสดงสรุปราคาและ QR Code ที่เราคุยกันไว้ (แบบ Dynamic) */}
      <h1 className="text-3xl font-black mb-6">สรุปรายการจอง</h1>
      <div className="bg-white p-8 rounded-[2.5rem] border shadow-sm grid md:grid-cols-2 gap-8">
          <div>
            <h2 className="text-xl font-bold mb-2">{courtData?.name}</h2>
              <div className="text-xs text-teal-600 flex flex-wrap gap-1 items-center">
              <span className="font-bold">เวลา:</span>
                {formatTimeRange(bookingTimes).split(', ').map((range, index) => (
                  <span key={index} className="bg-teal-200/50 px-2 py-0.5 rounded-md">
                    {range}
                  </span>
                ))}
              <span className="ml-1 text-[10px] opacity-70">({bookingTimes.length} ชม.)</span>
            </div>
            {/* <p className="text-gray-500 mb-4">เวลา: {bookingTimes?.join(', ')}</p> */}
            <div className="border-t pt-4">
               <p className="font-bold">รายการอุปกรณ์:</p>
               {selectedEquipments?.map(e => <p key={e.id} className="text-sm">- {e.name} x{e.quantity}</p>)}
            </div>
            <p className="text-3xl font-black text-teal-600 mt-6">฿{totalAmount?.toLocaleString()}</p>
          </div>
          <div className="flex flex-col items-center border-l pl-8">
             <p className="font-bold mb-4">สแกนเพื่อจ่ายเงิน</p>
             {/* ใส่ QR Code ตรงนี้ */}
             <div className="bg-gray-100 w-48 h-48 rounded-2xl flex items-center justify-center mb-4">QR CODE</div>
             <input type="file" onChange={(e) => setFile(e.target.files[0])} className="text-xs mb-4" />
             <button onClick={handleConfirmPayment} disabled={loading} className="w-full bg-black text-white py-4 rounded-2xl font-bold">
               {loading ? "กำลังบันทึก..." : "ยืนยันและส่งสลิป"}
             </button>
          </div>
      </div>
    </div>
  );
}