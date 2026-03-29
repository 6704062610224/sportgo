// import React, { useState, useEffect, useRef  } from 'react';
// import { useLocation, useNavigate } from 'react-router-dom';
// import { supabase } from "../../supabaseClient";

// const getLocalDateString = () => {
//   const date = new Date();
//   const localDate = new Date(date.getTime() - (date.getTimezoneOffset() * 60000));
//   return localDate.toISOString().split('T')[0];
// };

// export default function BorrowPage() {
//   const location = useLocation();
//   const navigate = useNavigate();
  
//   const { 
//     bookingId,
//     courtData = null, 
//     bookingTimes = [], 
//     courtAmount = 0,
//     bookingDate = null
//   } = location.state || {};
  
//   const [equipments, setEquipments] = useState([]);
//   const [selectedEquips, setSelectedEquips] = useState({});
//   const [filter, setFilter] = useState(courtData?.category || "ทั้งหมด");
  
//   const categories = ["ทั้งหมด", "ฟุตบอล", "แบดมินตัน", "บาสเกตบอล", "ปิงปอง", "วอลเลย์บอล"];

//   const holdUntil = location.state?.holdUntil; 
//   const [timeLeft, setTimeLeft] = useState("");
//   const courtDataRef = useRef(courtData);
//   useEffect(() => {
//     if (!holdUntil) return;

//     const interval = setInterval(() => {
//       const now = new Date().getTime();
//       const expireTime = new Date(holdUntil).getTime();
//       const distance = expireTime - now;

//       if (distance <= 0) {
//         clearInterval(interval);
//         setTimeLeft("00:00");
//         alert("เวลาในการทำรายการหมดแล้ว ระบบได้ยกเลิกคิวของคุณ กรุณาทำรายการใหม่ครับ");
//         navigate('/booking');
//       } else {
//         const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
//         const seconds = Math.floor((distance % (1000 * 60)) / 1000);
//         setTimeLeft(`${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}`);
//       }
//     }, 1000);

//     return () => clearInterval(interval);
//   }, [holdUntil, navigate]);

//   const formatTimeRange = (times) => {
//     if (!times || times.length === 0) return "";

//     const sortedTimes = [...times].sort((a, b) => {
//       return parseInt(a.split(":")[0]) - parseInt(b.split(":")[0]);
//     });

//     let ranges = [];
//     let currentRange = null;

//     sortedTimes.forEach((timeStr) => {
//       const [start, end] = timeStr.split(" - ");
      
//       if (!currentRange) {
//         currentRange = { start, end };
//       } else {
//         if (start === currentRange.end) {
//           currentRange.end = end;
//         } else {
//           ranges.push(`${currentRange.start} - ${currentRange.end}`);
//           currentRange = { start, end };
//         }
//       }
//     });
    
//     if (currentRange) {
//       ranges.push(`${currentRange.start} - ${currentRange.end}`);
//     }

//     return ranges.join(", ");
//   };
  
  

//   useEffect(() => {
//     const fetchEquip = async () => {
//       let query = supabase.from('equipments').select('*');
//       if (filter !== "ทั้งหมด") {
//         query = query.eq('sport_type', filter.trim());
//       }
//       const { data, error } = await query;
//       if (!error) setEquipments(data || []);
//     };

//     fetchEquip();

//     const channel = supabase
//       .channel('realtime-equipments')
//       .on(
//         'postgres_changes',
//         { event: '*', schema: 'public', table: 'equipments' },
//         () => fetchEquip()
//       )
//       .subscribe();

//     return () => supabase.removeChannel(channel);
//   }, [filter]);

//   useEffect(() => {
//     setSelectedEquips(prev => {
//       const updated = { ...prev };

//       equipments.forEach(item => {
//         if (updated[item.id] && updated[item.id].qty > item.stock) {
//           if (item.stock === 0) {
//             delete updated[item.id];
//           } else {
//             updated[item.id] = { ...updated[item.id], qty: item.stock };
//           }
//         }
//       });

//       return updated;
//     });
//   }, [equipments]);

//   const updateQuantity = (item, delta) => {
//     setSelectedEquips(prev => {
//       const current = prev[item.id] || {
//         id: item.id,
//         qty: 0,
//         price: Number(item.price_per_unit),
//         name: item.name
//       };

//       const newQty = current.qty + delta;
//       if (newQty < 0) return prev;
//       if (newQty > item.stock) {
//         alert("อุปกรณ์ไม่เพียงพอ");
//         return prev;
//       }

//       return {
//         ...prev,
//         [item.id]: { ...current, qty: newQty }
//       };
//     });
//   };

//   const cartItems = Object.values(selectedEquips).filter(i => i.qty > 0);
//   const equipTotal = cartItems.reduce((sum, item) => sum + item.price * item.qty, 0);
//   const grandTotal = (courtAmount || 0) + equipTotal;

//   const today = getLocalDateString();
//   const safeBookingDate = bookingDate && bookingDate !== "" ? bookingDate : today;

//   const handleCheckout = async () => {
//     if (!safeBookingDate) {
//       alert("ไม่พบวันที่จอง กรุณาเลือกวันที่ใหม่");
//       return;
//     }

//     let finalBookingId = bookingId;
//     let finalHoldUntil = holdUntil; // ✅ ค่าเดิมจากจองสนาม

//     if (!finalBookingId) {
//       const { data: { session } } = await supabase.auth.getSession();
//       if (!session) {
//         alert("กรุณาเข้าสู่ระบบก่อนทำรายการ");
//         navigate('/login');
//         return;
//       }

//       const { data: newBooking, error } = await supabase
//         .from("bookings")
//         .insert([{
//           user_id: session.user.id,
//           court_id: null,
//           booking_date: safeBookingDate,
//           total_price: grandTotal,
//           status: "pending",
//           hold_until: new Date(Date.now() + 5 * 60 * 1000).toISOString()
//         }])
//         .select()
//         .single();

//       if (error) {
//         alert("เกิดข้อผิดพลาด: " + error.message);
//         return;
//       }

//       finalBookingId = newBooking.id;
//       finalHoldUntil = newBooking.hold_until; // ✅ เก็บไว้ใน scope นี้
//     }

//     navigate('/pay', {
//       state: {
//         bookingId: finalBookingId,
//         courtData,
//         bookingTimes,
//         bookingDate: safeBookingDate,
//         selectedEquipments: cartItems,
//         holdUntil: finalHoldUntil, 
//         totalAmount: grandTotal
//       }
//     });
//   };

//   useEffect(() => {
//     courtDataRef.current = courtData;
//   }, [courtData]);

//   useEffect(() => {
//     const channel = supabase
//       .channel("realtime-borrow-courts")
//       .on(
//         "postgres_changes",
//         { event: "UPDATE", schema: "public", table: "courts" },
//         (payload) => {
//           console.log("🏟️ Court update payload:", payload);
//           console.log("🏟️ courtDataRef.current:", courtDataRef.current);
//           console.log("🏟️ payload.new.id:", payload.new.id);
//           console.log("🏟️ payload.new.is_available:", payload.new.is_available);

//           if (
//             payload.new.is_available === false &&
//             courtDataRef.current?.id === payload.new.id
//           ) {
//             console.log("❌ navigate จาก: court ถูกปิด");
//             alert("⚠️ สนามที่คุณจองถูกปิดปรับปรุง กรุณาติดต่อแอดมิน");
//             navigate('/booking');
//           }
//         }
//       )
//       .subscribe();

//     return () => supabase.removeChannel(channel);
//   }, []);
//   return (
//     <div className="min-h-screen bg-gray-50 p-4 md:p-8 pb-40">
//       <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
        
//         <div className="lg:col-span-2">
//           <header className="mb-8">
//             <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight">เลือกยืมอุปกรณ์</h1>
//             <div className="flex overflow-x-auto gap-2 mt-4 no-scrollbar">
//               {categories.map(cat => (
//                 <button key={cat} onClick={() => setFilter(cat)} className={`px-5 py-2 rounded-xl font-bold whitespace-nowrap transition-all ${filter === cat ? "bg-[#003E77] text-white shadow-md" : "bg-white text-gray-600 shadow-sm"}`}>{cat}</button>
//               ))}
//             </div>
//           </header>

//           <div className="grid gap-4">
//             {equipments.map(item => {
//               const qty = selectedEquips[item.id]?.qty || 0;
//               const isOutOfStock = item.stock === 0;
//               const isMaxQty = qty >= item.stock;

//               return (
//                 <div key={item.id} className={`bg-white p-4 rounded-3xl shadow-sm border transition-all flex items-center gap-4 ${isOutOfStock ? "border-red-100 opacity-60" : "border-gray-100"}`}>
//                   <img src={item.image_url || 'https://via.placeholder.com/100'} className="w-20 h-20 object-cover rounded-2xl bg-gray-50 flex-shrink-0" alt="" />
                  
//                   <div className="flex-grow">
//                     <h3 className="font-bold text-gray-800">{item.name}</h3>
//                     <p className="text-teal-600 font-bold text-sm">฿{item.price_per_unit}</p>
//                     {isOutOfStock ? (
//                       <span className="inline-block mt-1 text-xs font-bold text-red-500 bg-red-50 px-2 py-0.5 rounded-full">
//                         หมดแล้ว
//                       </span>
//                     ) : (
//                       <span className="inline-block mt-1 text-xs text-gray-400">
//                         เหลือ {item.stock - qty} ชิ้น
//                       </span>
//                     )}
//                   </div>

//                   {isOutOfStock ? (
//                     <div className="px-4 py-2 rounded-xl bg-red-50 text-red-400 text-xs font-bold whitespace-nowrap">
//                       Out of stock
//                     </div>
//                   ) : (
//                     <div className="flex items-center bg-gray-50 rounded-xl p-1 gap-3">
//                       <button
//                         onClick={() => updateQuantity(item, -1)}
//                         disabled={qty === 0}
//                         className="w-8 h-8 bg-white rounded-lg shadow-sm font-bold disabled:opacity-30 disabled:cursor-not-allowed transition"
//                       >
//                         －
//                       </button>
//                       <span className="w-4 text-center font-bold">{qty}</span>
//                       <button
//                         onClick={() => updateQuantity(item, 1)}
//                         disabled={isMaxQty}
//                         className="w-8 h-8 bg-white rounded-lg shadow-sm font-bold disabled:opacity-30 disabled:cursor-not-allowed transition"
//                       >
//                         ＋
//                       </button>
//                     </div>
//                   )}
//                 </div>
//               );
//             })}
//           </div>
//         </div>

//         {/* ส่วนสรุปรายการ (Right Side) */}
//         <div className="lg:col-span-1">
//           <div className="bg-white p-6 rounded-[2rem] shadow-xl border border-gray-100 sticky top-8">
//             <h2 className="text-xl font-black mb-4 flex justify-between">
//               รายการที่เลือก <span>{cartItems.length + (courtData ? 1 : 0)}</span>
//             </h2>
            
//             <div className="space-y-3 mb-6 max-h-60 overflow-y-auto pr-2">
//               {courtData && (
//                 <div className="flex justify-between items-start text-sm bg-[#003E77]/20 p-3 rounded-xl border border-teal-100">
//                   <div>
//                     <p className="font-bold text-gray-700">สนาม: {courtData.name}</p>
//                     <div className="text-xs text-gray-700 flex flex-wrap gap-1 items-center">
//                       <span className="font-bold">เวลา:</span>
//                       {formatTimeRange(bookingTimes).split(', ').map((range, index) => (
//                         <span key={index} className="bg-[#003E77]/50 px-2 py-0.5 rounded-md text-white">
//                           {range}
//                         </span>
//                       ))}
//                       <span className="ml-1 text-[10px] opacity-70">({bookingTimes.length} ชม.)</span>
//                     </div>
//                   </div>
//                   <p className="font-bold text-gray-700">฿{courtAmount.toLocaleString()}</p>
//                 </div>
//               )}

//               {cartItems.map(item => (
//                 <div key={item.id} className="flex justify-between text-sm p-2 border-b border-gray-50">
//                   <p className="font-bold text-gray-900">
//                     {item.name} <span className="font-bold">x{item.qty}</span>
//                   </p>
//                   <p className="font-bold">
//                     ฿{(item.price * item.qty).toLocaleString()}
//                   </p>
//                 </div>
//               ))}

//               {cartItems.length === 0 && !courtData && (
//                 <p className="text-center text-gray-400 py-10 italic">ยังไม่มีรายการที่เลือก</p>
//               )}
//             </div>

//             <div className="border-t-2 border-dashed pt-4 space-y-2">
//               <div className="flex justify-between text-sm text-gray-500">
//                 <span>ยอดรวมอุปกรณ์</span>
//                 <span>฿{equipTotal.toLocaleString()}</span>
//               </div>
//               <div className="flex justify-between text-2xl font-black text-gray-900 pt-2">
//                 <span>ยอดสุทธิ</span>
//                 <span className="text-teal-600">฿{grandTotal.toLocaleString()}</span>
//               </div>
//             </div>

//             {holdUntil && (
//               <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-xl mt-3 flex justify-between items-center">
//                 <span className="font-bold">กรุณาทำรายการภายในเวลา</span>
//                 <span className="text-xl font-black">{timeLeft}</span>
//               </div>
//             )}

//             <button 
//               disabled={grandTotal === 0}
//               onClick={handleCheckout}
//               className="w-full bg-[#003E77] hover:bg-blue-700 text-white py-4 rounded-2xl font-bold mt-6 transition-all disabled:bg-gray-200"
//             >
//               ไปหน้าชำระเงิน
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }







import React, { useState, useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { supabase } from "../../supabaseClient";

const getLocalDateString = () => {
  const date = new Date();
  const localDate = new Date(date.getTime() - (date.getTimezoneOffset() * 60000));
  return localDate.toISOString().split('T')[0];
};

// 🔥 แก้ปัญหา range → slot
const expandTimeSlots = (times) => {
  let result = [];

  times.forEach(range => {
    const [start, end] = range.split(" - ");
    let current = parseInt(start);
    const endHour = parseInt(end);

    while (current < endHour) {
      const next = current + 1;
      result.push(
        `${String(current).padStart(2, '0')}:00 - ${String(next).padStart(2, '0')}:00`
      );
      current = next;
    }
  });

  return result;
};

export default function BorrowPage() {
  const location = useLocation();
  const navigate = useNavigate();

  const {
    bookingId,
    courtData = null,
    bookingTimes = [],
    courtAmount = 0,
    bookingDate = null
  } = location.state || {};

  const [equipments, setEquipments] = useState([]);
  const [selectedEquips, setSelectedEquips] = useState({});
  const [filter, setFilter] = useState(courtData?.category || "ทั้งหมด");
  const [usedStockMap, setUsedStockMap] = useState({});

  const holdUntil = location.state?.holdUntil;
  const [timeLeft, setTimeLeft] = useState("");

  const today = getLocalDateString();
  const safeBookingDate = bookingDate && bookingDate !== "" ? bookingDate : today;

  // ⏱ countdown
  useEffect(() => {
    if (!holdUntil) return;

    const interval = setInterval(() => {
      const now = new Date().getTime();
      const expireTime = new Date(holdUntil).getTime();
      const distance = expireTime - now;

      if (distance <= 0) {
        clearInterval(interval);
        alert("หมดเวลา กรุณาจองใหม่");
        navigate('/booking');
      } else {
        const m = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const s = Math.floor((distance % (1000 * 60)) / 1000);
        setTimeLeft(`${m}:${s}`);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [holdUntil, navigate]);

  // 🔥 fetch used stock (แก้ครบแล้ว)
  const fetchUsedStock = async () => {
    if (!bookingTimes?.length) return;

    const expandedTimes = expandTimeSlots(bookingTimes);

    // 1. หา booking ที่เวลา overlap
    const { data: slots } = await supabase
      .from('booking_time_slots')
      .select('booking_id')
      .in('time_slot', expandedTimes)
      .eq('booking_date', safeBookingDate);

    if (!slots || slots.length === 0) {
      setUsedStockMap({});
      return;
    }

    const bookingIds = [...new Set(slots.map(s => s.booking_id))];

    // 2. filter active booking
    const { data: activeBookings } = await supabase
      .from('bookings')
      .select('id')
      .in('id', bookingIds)
      .in('status', ['paid', 'waiting', 'pending']);

    if (!activeBookings?.length) {
      setUsedStockMap({});
      return;
    }

    const activeIds = activeBookings.map(b => b.id);

    // 3. ดึง equipment ที่ใช้
    const { data: usedEquips } = await supabase
      .from('booking_equipments')
      .select('equipment_id, quantity')
      .in('booking_id', activeIds);

    const map = {};
    usedEquips?.forEach(e => {
      map[e.equipment_id] = (map[e.equipment_id] || 0) + e.quantity;
    });

    setUsedStockMap(map);
  };

  // 🔄 fetch equipment
  useEffect(() => {
    const fetchEquip = async () => {
      let query = supabase.from('equipments').select('*');
      if (filter !== "ทั้งหมด") query = query.eq('sport_type', filter);

      const { data } = await query;
      setEquipments(data || []);
    };

    fetchEquip();

    const eqChannel = supabase
      .channel('equipments')
      .on('postgres_changes',
        { event: '*', schema: 'public', table: 'equipments' },
        fetchEquip
      )
      .subscribe();

    return () => supabase.removeChannel(eqChannel);
  }, [filter]);

  // 🔥 realtime used stock (ครบ)
  useEffect(() => {
    fetchUsedStock();

    const eq = supabase.channel('eq')
      .on('postgres_changes',
        { event: '*', schema: 'public', table: 'booking_equipments' },
        fetchUsedStock
      )
      .subscribe();

    const slot = supabase.channel('slot')
      .on('postgres_changes',
        { event: '*', schema: 'public', table: 'booking_time_slots' },
        fetchUsedStock
      )
      .subscribe();

    const book = supabase.channel('book')
      .on('postgres_changes',
        { event: 'UPDATE', schema: 'public', table: 'bookings' },
        fetchUsedStock
      )
      .subscribe();

    return () => {
      supabase.removeChannel(eq);
      supabase.removeChannel(slot);
      supabase.removeChannel(book);
    };
  }, [bookingTimes, safeBookingDate]);

  // 🔒 กัน qty เกิน
  useEffect(() => {
    setSelectedEquips(prev => {
      const updated = { ...prev };

      equipments.forEach(item => {
        const used = usedStockMap[item.id] || 0;
        const real = item.stock - used;

        if (updated[item.id]?.qty > real) {
          if (real <= 0) delete updated[item.id];
          else updated[item.id].qty = real;
        }
      });

      return updated;
    });
  }, [equipments, usedStockMap]);

  // ➕➖
  const updateQuantity = (item, delta) => {
    setSelectedEquips(prev => {
      const current = prev[item.id] || {
        id: item.id,
        qty: 0,
        price: Number(item.price_per_unit),
        name: item.name
      };

      const newQty = current.qty + delta;
      if (newQty < 0) return prev;

      const used = usedStockMap[item.id] || 0;
      const real = item.stock - used;

      if (newQty > real) {
        alert("ของไม่พอในช่วงเวลานี้");
        return prev;
      }

      return {
        ...prev,
        [item.id]: { ...current, qty: newQty }
      };
    });
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">เลือกอุปกรณ์</h1>

      <div className="grid gap-4">
        {equipments.map(item => {
          const used = usedStockMap[item.id] || 0;
          const real = item.stock - used;
          const qty = selectedEquips[item.id]?.qty || 0;

          return (
            <div key={item.id} className="border p-4 flex justify-between">
              <div>
                <h3>{item.name}</h3>
                <p>เหลือ {real} ชิ้น</p>
              </div>

              <div className="flex gap-2">
                <button onClick={() => updateQuantity(item, -1)}>-</button>
                <span>{qty}</span>
                <button onClick={() => updateQuantity(item, 1)}>+</button>
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-4 text-red-500">
        เวลาที่เหลือ: {timeLeft}
      </div>
    </div>
  );
}