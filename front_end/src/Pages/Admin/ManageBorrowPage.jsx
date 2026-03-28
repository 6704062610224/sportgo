import React, { useEffect, useState } from "react";
import { supabase } from "../../supabaseClient";

const ManageBorrowPage = () => {
  const [bookings, setBookings] = useState([]);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");


  const fetchData = async () => {
    const { data } = await supabase
      .from("bookings")
      .select(`
        id,
        status,
        users(username),
        booking_date,
        court_id,
        booking_equipments(quantity, equipments(id,name))
      `)
      .eq("status", "paid")
      // .is("court_id",null);
        
    // setBookings(data || []);
    const filtered = (data || []).filter(b => b.booking_equipments.length > 0);
    setBookings(filtered);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleReturn = async (bookingId, bookingEquipments) => {
    const confirm = window.confirm("ยืนยันว่าคืนอุปกรณ์แล้ว?");
    if (!confirm) return;

    // ✅ คืน stock อุปกรณ์
    if (bookingEquipments && bookingEquipments.length > 0) {
      for (const item of bookingEquipments) {
        await supabase.rpc("increment_stock", {
          equip_id: item.equipments.id,
          amount: item.quantity
        });
      }
    }

    const { error } = await supabase
      .from("bookings")
      .update({
        status: "returned",
        returned_at: new Date().toISOString()
      })
      .eq("id", bookingId);

    if (!error) {
      alert("คืนอุปกรณ์สำเร็จ");
      fetchData();
    }
  };
  
  // ฟังก์ชัน highlight
  const highlight = (text, q) => {
    if (!q) return text;
    const idx = text.toLowerCase().indexOf(q.toLowerCase());
    if (idx < 0) return text;
    return (
      <>
        {text.slice(0, idx)}
        <mark style={{ background: "#FAC775", borderRadius: 2, padding: "0 1px" }}>
          {text.slice(idx, idx + q.length)}
        </mark>
        {text.slice(idx + q.length)}
      </>
    );
  };

  const filteredBookings = bookings
    .filter(b =>
      b.users?.username?.toLowerCase().includes(search.toLowerCase())
    )
    .filter(b => {
      const isEquipmentOnly = !b.court_id;
      let isOverdue = false;
      if (!isEquipmentOnly) {
        const today = new Date(); today.setHours(0, 0, 0, 0);
        const compareDate = new Date(b.booking_date); compareDate.setHours(0, 0, 0, 0);
        isOverdue = compareDate < today;
      }
      if (statusFilter === "inuse") return !isOverdue;
      if (statusFilter === "overdue") return isOverdue;
      return true;
    });
//   return (
//   <div className="p-6">
//     <h1 className="text-2xl font-bold mb-6">รายการยืมอุปกรณ์</h1>
//     {/* <div className="mb-4">
//       <input
//         type="text"
//         placeholder="ค้นหาชื่อผู้ใช้..."
//         value={search}
//         onChange={(e) => setSearch(e.target.value)}
//         className="w-full md:w-1/3 px-4 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
//       />
//     </div> */}
//     <div className="mb-4 flex flex-wrap gap-2 items-center">
//       {/* Search input */}
//       <div className="relative w-full md:w-72">
//         <svg className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" width="15" height="15" viewBox="0 0 16 16" fill="none">
//           <circle cx="6.5" cy="6.5" r="5" stroke="currentColor" strokeWidth="1.5"/>
//           <path d="M10.5 10.5L14 14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
//         </svg>
//         <input
//           type="text"
//           placeholder="ค้นหาชื่อผู้ใช้..."
//           value={search}
//           onChange={(e) => setSearch(e.target.value)}
//           className="w-full pl-9 pr-8 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
//         />
//         {search && (
//           <button onClick={() => setSearch("")} className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 text-lg leading-none">×</button>
//         )}
//       </div>

//       {/* Filter pills */}
//       {[
//         { key: "all", label: "ทั้งหมด" },
//         { key: "inuse", label: "In use" },
//         { key: "overdue", label: "Overdue" },
//       ].map(({ key, label }) => (
//         <button
//           key={key}
//           onClick={() => setStatusFilter(key)}
//           // className={`px-4 py-1.5 rounded-full text-sm border transition-colors ${
//           //   statusFilter === key
//           //     ? "bg-blue-100 border-blue-400 text-blue-700"
//           //     : "bg-white border-gray-200 text-gray-500 hover:border-blue-300"
//           // }`}
//           className={`px-4 py-1.5 rounded-full text-sm border transition-colors ${
//             statusFilter === key
//               ? key === "overdue"
//                 ? "bg-red-100 border-red-400 text-red-700"
//                 : key === "inuse"
//                 ? "bg-orange-100 border-orange-400 text-orange-600"
//                 : "bg-gray-100 border-gray-400 text-gray-700"
//               : "bg-white border-gray-200 text-gray-500 hover:border-gray-300"
//           }`}
//         >
//           {label}
//         </button>
//       ))}

//       {/* Result count */}
//       <span className="ml-auto text-sm text-gray-400">{filteredBookings.length} รายการ</span>
//     </div>
//     <div className="overflow-hidden rounded-lg  bg-white shadow-md">
//       {/* Header */}
//       {/* <div className="grid grid-cols-5 bg-blue-500 text-white text-sm font-semibold px-6 py-3">
//         <div>Customer</div>
//         <div>Borrowed Date</div>
//         <div>Items</div>
//         <div>Status</div>
//         <div className="text-right">Action</div>
//       </div> */}
//       <div
//         className="grid bg-blue-500 text-white text-sm font-semibold px-6 py-3"
//         style={{ gridTemplateColumns: "2fr 2fr 2fr 2fr 2fr 1fr" }}
//       >
//         <div>Customer</div>
//         <div>Borrowed Date</div>
//         <div>Equipment</div>
//         <div>Items</div>
//         <div>Status</div>
//         <div className="text-center">Action</div>
//       </div>

//       {/* Rows */}
//       {filteredBookings.map(b => {
//         // const borrowedDate = new Date(b.booking_date + "T00:00:00");
//         // const today = new Date();
//         // today.setHours(0, 0, 0, 0);

//         // const isOverdue = borrowedDate < today;
//         const borrowedDate = new Date(b.booking_date);

//         // 🔥 เช็คว่าเป็น "ยืมอุปกรณ์ล้วน"
//         const isEquipmentOnly = !b.court_id;

//         let isOverdue = false;

//         // ✅ เฉพาะ "จองสนาม" เท่านั้นที่ต้องเช็ค overdue
//         if (!isEquipmentOnly) {
//           const today = new Date();
//           today.setHours(0, 0, 0, 0);

//           const compareDate = new Date(borrowedDate);
//           compareDate.setHours(0, 0, 0, 0);

//           isOverdue = compareDate < today;
//         }
//         const totalItems = b.booking_equipments.reduce(
//           (sum, e) => sum + e.quantity,
//           0
//         );
//         const equipmentNames = b.booking_equipments
//           .map(e => e.equipments?.name)
//           .join(", ");
//         return (
//           // <div
//           //   key={b.id}
//           //   className="grid grid-cols-5 items-center px-6 py-4 border-t text-sm"
//           // >
//           //   {/* Customer */}
//           //   <div>{b.users?.username}</div>

//           //   {/* Borrowed Date */}
//           //   <div>
//           //     {borrowedDate.toLocaleDateString("en-GB")}
//           //   </div>

//           //   {/* Items */}
//           //   <div>{totalItems} items</div>

//           //   {/* Status */}
//           //   <div
//           //     className={`font-semibold ${
//           //       isOverdue ? "text-red-500" : "text-orange-400"
//           //     }`}
//           //   >
//           //     {isOverdue ? "Overdue" : "In use"}
//           //   </div>

//           //   {/* Action */}
//           //   <div className="text-right">
//           //     <button
//           //       onClick={() => handleReturn(b.id)}
//           //       className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded text-xs font-semibold"
//           //     >
//           //       Process Return
//           //     </button>
//           //   </div>
//           // </div>
//           <div
//             key={b.id}
//             className="grid items-center px-6 py-4 text-sm rounded-lg shadow-sm bg-white"
//             style={{ gridTemplateColumns: "2fr 2fr 2fr 2fr 2fr 1fr" }}
//           >
//             {/* Customer */}
//             {/* <div>{b.users?.username}</div> */}
//             <div>{highlight(b.users?.username || "", search)}</div>

//             {/* Borrowed Date */}
//             <div>{borrowedDate.toLocaleDateString("en-GB")}</div>

//             {/* Equipment */}
//             {/* <div className="text-gray-600 text-xs">
//               {equipmentNames || "-"}
//             </div> */}
//             <div className="text-gray-600 text-xs space-y-0.5">
//               {b.booking_equipments.length > 0
//                 ? b.booking_equipments.map((e, i) => (
//                     <div key={i}>
//                       {e.equipments?.name}{" "}
//                       <span className="font-bold text-gray-800">x{e.quantity}</span>
//                     </div>
//                   ))
//                 : <span className="text-gray-300">-</span>
//               }
//             </div>

//             {/* Items */}
//             <div>{totalItems} items</div>

//             {/* Status */}
//             <div
//               className={`font-semibold ${
//                 isOverdue ? "text-red-500" : "text-orange-400"
//               }`}
//             >
//               {isOverdue ? "Overdue" : "In use"}
//             </div>

//             {/* Action */}
//             <div className="flex justify-center items-center">
//               <button
//                 onClick={() => handleReturn(b.id, b.booking_equipments)}
//                 className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded text-xs font-semibold"
//               >
//                 Process Return
//               </button>
//             </div>
//           </div>
//         );
//       })}
//     </div>
//   </div>
// );
  return (
    <div className="flex-1 p-10 bg-[#FAFAFA] min-h-screen">
      
      {/* HEADER */}
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Manage Borrowing</h1>

      {/* STAT CARDS (เลียนแบบหน้า History) */}
      <div className="grid grid-cols-3 gap-4 mb-10">
        <div className="bg-white p-5 rounded-sm border border-gray-200 shadow-sm">
          <p className="text-gray-400 text-[10px] font-bold uppercase mb-1">รายการยืมทั้งหมด</p>
          <p className="text-2xl font-bold text-gray-800">{bookings.length}</p>
        </div>
        <div className="bg-white p-5 rounded-sm border border-gray-200 shadow-sm">
          <p className="text-gray-400 text-[10px] font-bold uppercase mb-1">กำลังใช้งาน (In Use)</p>
          <p className="text-2xl font-bold text-orange-500">
            {bookings.filter(b => {
              const compareDate = new Date(b.booking_date);
              compareDate.setHours(0,0,0,0);
              return compareDate >= new Date().setHours(0,0,0,0);
            }).length}
          </p>
        </div>
        <div className="bg-white p-5 rounded-sm border border-gray-200 shadow-sm">
          <p className="text-gray-400 text-[10px] font-bold uppercase mb-1">เกินกำหนด (Overdue)</p>
          <p className="text-2xl font-bold text-red-500">
             {bookings.filter(b => {
              const compareDate = new Date(b.booking_date);
              compareDate.setHours(0,0,0,0);
              return compareDate < new Date().setHours(0,0,0,0);
            }).length}
          </p>
        </div>
      </div>

      {/* TOOLBAR */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
        <div className="flex gap-6 border-b border-gray-100">
          {[
            { key: "all", label: "ทั้งหมด" },
            { key: "inuse", label: "In Use" },
            { key: "overdue", label: "Overdue" },
          ].map((f) => (
            <button
              key={f.key}
              onClick={() => setStatusFilter(f.key)}
              className={`pb-3 text-sm font-bold transition-all border-b-2 -mb-px ${
                statusFilter === f.key
                  ? "border-gray-900 text-gray-900"
                  : "border-transparent text-gray-400 hover:text-gray-600"
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>

        <div className="relative w-64">
          <input
            type="text"
            placeholder="ค้นหาชื่อผู้ใช้..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full px-4 py-2 rounded-lg border border-gray-200 bg-white text-xs outline-none focus:ring-1 focus:ring-gray-300"
          />
        </div>
      </div>

      {/* DATA TABLE (สไตล์เดียวกับ History) */}
      <div className="bg-white rounded-sm border border-gray-100 shadow-sm overflow-hidden">
        <table className="w-full text-left text-xs">
          <thead className="bg-gray-50 border-b border-gray-100 text-gray-400 font-bold">
            <tr>
              <th className="p-4 uppercase">Customer</th>
              <th className="p-4 uppercase">Borrowed Date</th>
              <th className="p-4 uppercase">Equipment Details</th>
              <th className="p-4 uppercase">Status</th>
              <th className="p-4 uppercase text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {filteredBookings.length === 0 ? (
              <tr>
                <td colSpan={5} className="p-20 text-center text-gray-400 font-bold">
                  ไม่พบรายการยืมอุปกรณ์
                </td>
              </tr>
            ) : (
              filteredBookings.map((b) => {
                const borrowedDate = new Date(b.booking_date);
                const isEquipmentOnly = !b.court_id;
                let isOverdue = false;
                if (!isEquipmentOnly) {
                  const today = new Date().setHours(0, 0, 0, 0);
                  const compareDate = new Date(borrowedDate).setHours(0, 0, 0, 0);
                  isOverdue = compareDate < today;
                }

                return (
                  <tr key={b.id} className="hover:bg-gray-50 transition-colors">
                    {/* Customer */}
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center text-gray-300 font-bold">
                          👤
                        </div>
                        <span className="font-bold text-gray-700">
                          {highlight(b.users?.username || "", search)}
                        </span>
                      </div>
                    </td>

                    {/* Date */}
                    <td className="p-4 text-gray-500 font-mono">
                      {borrowedDate.toLocaleDateString("en-GB")}
                    </td>

                    {/* Equipment Details */}
                    <td className="p-4">
                      <div className="space-y-1">
                        {b.booking_equipments.map((e, i) => (
                          <div key={i} className="text-gray-600">
                            {e.equipments?.name}{" "}
                            <span className="font-bold text-gray-900">x{e.quantity}</span>
                          </div>
                        ))}
                      </div>
                    </td>

                    {/* Status Badge */}
                    <td className="p-4">
                      <span
                        className={`px-3 py-1 rounded-full text-[10px] font-black uppercase ${
                          isOverdue 
                            ? "bg-red-50 text-red-500" 
                            : "bg-orange-50 text-orange-500"
                        }`}
                      >
                        {isOverdue ? "Overdue" : "In Use"}
                      </span>
                    </td>

                    {/* Action */}
                    <td className="p-4 text-right">
                      <button
                        onClick={() => handleReturn(b.id, b.booking_equipments)}
                        className="text-[10px] uppercase font-black tracking-widest px-4 py-2 border border-gray-200 rounded hover:bg-gray-900 hover:text-white transition-all"
                      >
                        Process Return
                      </button>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageBorrowPage;