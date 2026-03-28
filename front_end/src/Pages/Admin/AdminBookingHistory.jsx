// import { useEffect, useState } from "react";
// import { supabase } from "../../supabaseClient";

// const AdminBookingHistory = () => {
//   const [history, setHistory] = useState([]);
//   const [filter, setFilter] = useState("all"); 
//   useEffect(() => {
//     const fetchHistory = async () => {
//       const today = new Date().toISOString().slice(0, 10);

//       const { data, error } = await supabase
//         .from("bookings")
//         .select(`
//           id,
//           booking_date,
//           receipt_url,
//           status,
//           users ( username, email ),
//           courts ( name, category ),
//           booking_equipments (
//             quantity,
//             equipments ( name )
//           )
//         `)
//         .lt("booking_date", `${today}T00:00:00`) // ✅ อดีต
//         .order("booking_date", { ascending: false });

//       if (!error && data) {
//         setHistory(data);
//       }
//     };

//     fetchHistory();
//   }, []);

//   // return (
//   //   <div className="p-10">
//   //     <h1 className="text-2xl font-bold mb-6">Booking History</h1>

//   //     <table className="w-full text-xs bg-white border">
//   //       <thead className="bg-gray-50 text-gray-400 font-bold">
//   //         <tr>
//   //           <th className="p-4">User</th>
//   //           <th className="p-4">Court</th>
//   //           <th className="p-4">Date</th>
//   //           <th className="p-4">Status</th>
//   //         </tr>
//   //       </thead>
//   //       <tbody>
//   //         {history.map(b => (
//   //           <tr key={b.id} className="border-t">
//   //             <td className="p-4">{b.users?.username}</td>
//   //             <td className="p-4">{b.courts?.name}</td>
//   //             <td className="p-4">{new Date(b.booking_date).toLocaleString()}</td>
//   //             <td className="p-4">{b.status}</td>
//   //           </tr>
//   //         ))}
//   //       </tbody>
//   //     </table>
//   //   </div>
//   // );
//   const filteredHistory = history.filter(b => {
//     if (filter === "all") return true;
//     if (filter === "court") return b.courts !== null;
//     if (filter === "equipment") return b.courts === null;
//     return true;
//   });
//   return (
//   <div className="max-w-6xl mx-auto p-6 bg-gray-50 min-h-screen">
//     <h1 className="text-3xl font-black text-gray-900 mb-8">
//       ประวัติการจอง (Admin)
//     </h1>
//     <div className="flex gap-3 mb-8">
//       <button
//         onClick={() => setFilter("all")}
//         className={`px-5 py-2 rounded-full font-bold text-sm ${
//           filter === "all"
//             ? "bg-teal-600 text-white"
//             : "bg-white shadow-sm text-gray-500"
//         }`}
//       >
//         ทั้งหมด
//       </button>

//       <button
//         onClick={() => setFilter("court")}
//         className={`px-5 py-2 rounded-full font-bold text-sm ${
//           filter === "court"
//             ? "bg-teal-600 text-white"
//             : "bg-white shadow-sm text-gray-500"
//         }`}
//       >
//         จองสนาม
//       </button>

//       <button
//         onClick={() => setFilter("equipment")}
//         className={`px-5 py-2 rounded-full font-bold text-sm ${
//           filter === "equipment"
//             ? "bg-teal-600 text-white"
//             : "bg-white shadow-sm text-gray-500"
//         }`}
//       >
//         ยืมอุปกรณ์
//       </button>
//     </div>
//     <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//       {filteredHistory.length > 0 ? filteredHistory.map(b => {
//         const dateText = b.booking_date
//           ? new Date(b.booking_date + "T00:00:00").toLocaleDateString("en-GB")
//           : "-";

//         return (
//           <div
//             key={b.id}
//             className="bg-white p-6 rounded-[2rem] shadow-sm border border-gray-100 hover:shadow-xl transition-all"
//           >
//             {/* Header */}
//             <div className="flex justify-between items-start mb-6">
//               <div>
//                 <h3 className="text-xl font-bold text-gray-800 mb-1">
//                   {b.courts?.name || "ไม่ระบุสนาม"}
//                 </h3>
//                 <p className="text-teal-600 font-bold text-sm uppercase">
//                   {b.courts?.category || "-"}
//                 </p>
//                 <p className="text-xs text-gray-400 mt-1">
//                   ผู้จอง: {b.users?.username} ({b.users?.email})
//                 </p>
//               </div>

//               {/* Status badge */}
//               <span
//                 className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase ${
//                   b.status === "paid"
//                     ? "bg-green-50 text-green-600"
//                     : b.status === "returned"
//                     ? "bg-blue-50 text-blue-600"
//                     : b.status === "rejected"
//                     ? "bg-red-50 text-red-500"
//                     : "bg-yellow-50 text-yellow-600"
//                 }`}
//               >
//                 {b.status}
//               </span>
//             </div>

//             {/* Detail */}
//             <div className="space-y-4 text-sm text-gray-600 bg-gray-50 p-4 rounded-2xl mb-6">
//               <div className="flex items-center gap-3">
//                 <span className="text-lg">📅</span>
//                 <span className="font-bold">{dateText}</span>
//               </div>
//               {b.booking_equipments?.length > 0 && (
//                 <div className="space-y-1">
//                   <p className="font-bold text-gray-700 flex items-center gap-2">
//                     👕 อุปกรณ์ที่ยืม
//                   </p>

//                   <ul className="list-disc list-inside text-sm text-gray-600">
//                     {b.booking_equipments.map((be, index) => (
//                       <li key={index}>
//                         {be.equipments?.name} x{be.quantity}
//                       </li>
//                     ))}
//                   </ul>
//                 </div>
//               )}
//               {b.receipt_url && (
//                 <div className="flex items-center gap-3">
//                   <span className="text-lg">🧾</span>
//                   <button
//                     onClick={() => window.open(b.receipt_url, "_blank")}
//                     className="text-teal-600 font-bold hover:underline"
//                   >
//                     view
//                   </button>
//                 </div>
//               )}
//             </div>

//             {/* Footer */}
//             <div className="border-t border-gray-50 pt-4 text-right">
//               <span className="text-xs text-gray-400 font-bold">
//                 Booking ID #{b.id}
//               </span>
//             </div>
//           </div>
//         );
//       }) : (
//         <div className="col-span-full py-20 text-center bg-white rounded-[3rem] border-2 border-dashed border-gray-100">
//           <p className="text-4xl mb-4">📭</p>
//           <p className="text-gray-400 font-bold">
//             ไม่พบประวัติการจอง
//           </p>
//         </div>
//       )}
//     </div>
//   </div>
// );
// };

// export default AdminBookingHistory;






// import { useEffect, useState } from "react";
// import { supabase } from "../../supabaseClient";

// const statusConfig = {
//   paid:      { label: "Paid",      class: "bg-emerald-50 text-emerald-600" },
//   returned:  { label: "Returned",  class: "bg-blue-50 text-blue-600" },
//   rejected:  { label: "Rejected",  class: "bg-red-50 text-red-500" },
//   cancelled: { label: "Cancelled", class: "bg-gray-100 text-gray-400" },
//   waiting:   { label: "Waiting",   class: "bg-yellow-50 text-yellow-600" },
//   pending:   { label: "Pending",   class: "bg-gray-100 text-gray-400" },
// };

// const AdminBookingHistory = () => {
//   const [history, setHistory] = useState([]);
//   const [filter, setFilter] = useState("all");
//   const [search, setSearch] = useState("");

//   useEffect(() => {
//     // const fetchHistory = async () => {
//     //   const today = new Date().toISOString().slice(0, 10);

//     //   const { data, error } = await supabase
//     //     .from("bookings")
//     //     .select(`
//     //       id,
//     //       booking_date,
//     //       total_price,
//     //       receipt_url,
//     //       status,
//     //       users ( username, email ),
//     //       courts ( name, category ),
//     //       booking_equipments (
//     //         quantity,
//     //         equipments ( name )
//     //       )
//     //     `)
//     //     // .lt("booking_date", `${today}T00:00:00`)
//     //     .order("booking_date", { ascending: false });

//     //   if (!error && data) setHistory(data);
//     // };
//     const fetchHistory = async () => {
//       const now = new Date();
//       const localDate = new Date(now.getTime() - (now.getTimezoneOffset() * 60000));
//       const today = localDate.toISOString().split('T')[0];

//       const ninetyDaysAgo = new Date(now.getTime() - (now.getTimezoneOffset() * 60000) - 90 * 24 * 60 * 60 * 1000);
//       const fromDate = ninetyDaysAgo.toISOString().split('T')[0];

//       const { data, error } = await supabase
//         .from("bookings")
//         .select(`
//           id,
//           booking_date,
//           total_price,
//           receipt_url,
//           status,
//           users ( username, email ),
//           courts ( name, category ),
//           booking_equipments (
//             quantity,
//             equipments ( name )
//           )
//         `)
//         .gte("booking_date", fromDate)
//         .order("booking_date", { ascending: false });

//       if (!error && data) setHistory(data);
//     };

//     fetchHistory();
//   }, []);

//   const filteredHistory = history.filter(b => {
//     const matchType =
//       filter === "all" ? true :
//       filter === "court" ? b.courts !== null :
//       filter === "equipment" ? b.courts === null : true;

//     const matchSearch =
//       search === "" ? true :
//       b.users?.username?.toLowerCase().includes(search.toLowerCase()) ||
//       b.users?.email?.toLowerCase().includes(search.toLowerCase()) ||
//       String(b.id).includes(search);

//     return matchType && matchSearch;
//   });

//   return (
//     <div className="p-8 bg-[#FAFAFA] min-h-screen">

//       {/* HEADER */}
//       <div className="mb-8">
//         <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Booking History</h1>
//         <p className="text-sm text-gray-400 mt-1">ประวัติการจองย้อนหลังทั้งหมด</p>
//       </div>

//       {/* TOOLBAR */}
//       <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
//         <div className="flex gap-2">
//           {[
//             { key: "all",       label: "ทั้งหมด" },
//             { key: "court",     label: "จองสนาม" },
//             { key: "equipment", label: "ยืมอุปกรณ์" },
//           ].map(f => (
//             <button
//               key={f.key}
//               onClick={() => setFilter(f.key)}
//               className={`px-4 py-2 rounded-full text-sm font-medium transition ${
//                 filter === f.key
//                   ? "bg-gray-900 text-white"
//                   : "bg-white border border-gray-200 text-gray-500 hover:bg-gray-50"
//               }`}
//             >
//               {f.label}
//             </button>
//           ))}
//         </div>

//         {/* SEARCH */}
//         <input
//           type="text"
//           placeholder="ค้นหา user, email, booking ID..."
//           value={search}
//           onChange={e => setSearch(e.target.value)}
//           className="px-4 py-2 rounded-xl border border-gray-200 bg-white text-sm outline-none focus:ring-2 focus:ring-gray-200 w-72"
//         />
//       </div>
      
//       {/* SUMMARY */}
//       {filteredHistory.length > 0 && (
//         <div className="mt-4 flex justify-between items-center text-xs text-gray-400 px-1">
//           <span>ทั้งหมด {filteredHistory.length} รายการ</span>
//           {/* <span>
//             รวม ฿{filteredHistory
//               .filter(b => b.status === "paid" || b.status === "returned")
//               .reduce((sum, b) => sum + Number(b.total_price ?? 0), 0)
//               .toLocaleString()} (paid + returned)
//           </span> */}
//           <span>
//             รายได้ 90 วันย้อนหลัง: ฿{filteredHistory
//               .filter(b => b.status === "paid" || b.status === "returned")
//               .reduce((sum, b) => sum + Number(b.total_price ?? 0), 0)
//               .toLocaleString()}
//           </span>
//         </div>
//       )}
//       {/* TABLE */}
//       <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm">
//         <table className="w-full text-sm text-left">
//           <thead className="border-b border-gray-100">
//             <tr className="text-xs text-gray-400 font-medium uppercase tracking-wider">
//               <th className="px-6 py-4">ผู้จอง</th>
//               <th className="px-6 py-4">ประเภท</th>
//               <th className="px-6 py-4">สนาม / อุปกรณ์</th>
//               <th className="px-6 py-4">วันที่</th>
//               <th className="px-6 py-4">ราคา</th>
//               <th className="px-6 py-4">สลิป</th>
//               <th className="px-6 py-4">สถานะ</th>
//               <th className="px-6 py-4 text-right">ID</th>
//             </tr>
//           </thead>
//           <tbody className="divide-y divide-gray-50">
//             {filteredHistory.length === 0 ? (
//               <tr>
//                 <td colSpan={8} className="px-6 py-20 text-center text-gray-400">
//                   ไม่พบประวัติการจอง
//                 </td>
//               </tr>
//             ) : filteredHistory.map(b => {
//               const dateText = b.booking_date
//                 ? new Date(b.booking_date + "T00:00:00").toLocaleDateString("th-TH")
//                 : "-";

//               const equipText = b.booking_equipments?.length > 0
//                 ? b.booking_equipments.map(e => `${e.equipments?.name} x${e.quantity}`).join(", ")
//                 : null;

//               const status = statusConfig[b.status] || { label: b.status, class: "bg-gray-100 text-gray-400" };

//               return (
//                 <tr key={b.id} className="hover:bg-gray-50/50 transition-colors">
//                   <td className="px-6 py-4">
//                     <p className="font-medium text-gray-800">{b.users?.username ?? "-"}</p>
//                     <p className="text-xs text-gray-400">{b.users?.email ?? "-"}</p>
//                   </td>
//                   <td className="px-6 py-4">
//                     <span className="px-2.5 py-1 rounded-lg bg-gray-100 text-gray-600 text-xs font-medium">
//                       {b.courts ? "จองสนาม" : "ยืมอุปกรณ์"}
//                     </span>
//                   </td>
//                   <td className="px-6 py-4 text-gray-600 max-w-[200px]">
//                     <p className="truncate">{b.courts?.name ?? equipText ?? "-"}</p>
//                     {b.courts && <p className="text-xs text-gray-400">{b.courts.category}</p>}
//                   </td>
//                   <td className="px-6 py-4 text-gray-600 whitespace-nowrap">{dateText}</td>
//                   <td className="px-6 py-4 font-medium text-gray-800">
//                     ฿{Number(b.total_price ?? 0).toLocaleString()}
//                   </td>
//                   <td className="px-6 py-4">
//                     {b.receipt_url ? (
//                       <button
//                         onClick={() => window.open(b.receipt_url, "_blank")}
//                         className="text-xs font-medium text-teal-600 hover:underline"
//                       >
//                         ดูสลิป
//                       </button>
//                     ) : (
//                       <span className="text-gray-300 text-xs">-</span>
//                     )}
//                   </td>
//                   <td className="px-6 py-4">
//                     <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase ${status.class}`}>
//                       {status.label}
//                     </span>
//                   </td>
//                   <td className="px-6 py-4 text-right text-xs text-gray-300 font-mono">
//                     #{b.id}
//                   </td>
//                 </tr>
//               );
//             })}
//           </tbody>
//         </table>
//       </div>
      
//     </div>
//   );
// };

// export default AdminBookingHistory;









import { useEffect, useState } from "react";
import { supabase } from "../../supabaseClient";

const statusConfig = {
  paid:      { label: "Paid",      class: "bg-green-50 text-green-600" },
  returned:  { label: "Returned",  class: "bg-blue-50 text-blue-600" },
  rejected:  { label: "Rejected",  class: "bg-red-50 text-red-500" },
  cancelled: { label: "Cancelled", class: "bg-red-50 text-red-600" },
  waiting:   { label: "Waiting",   class: "bg-yellow-50 text-yellow-600" },
  pending:   { label: "Pending",   class: "bg-gray-100 text-gray-500" },
};

const AdminBookingHistory = () => {
  const [history, setHistory] = useState([]);
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchHistory = async () => {
      const now = new Date();
      const localDate = new Date(now.getTime() - (now.getTimezoneOffset() * 60000));
      const ninetyDaysAgo = new Date(now.getTime() - (now.getTimezoneOffset() * 60000) - 90 * 24 * 60 * 60 * 1000);
      const fromDate = ninetyDaysAgo.toISOString().split('T')[0];

      const { data, error } = await supabase
        .from("bookings")
        .select(`
          id,
          booking_date,
          total_price,
          receipt_url,
          status,
          users ( username, email ),
          courts ( name, category ),
          booking_equipments (
            quantity,
            equipments ( name )
          )
        `)
        .gte("booking_date", fromDate)
        .order("booking_date", { ascending: false });

      if (!error && data) setHistory(data);
    };

    fetchHistory();
  }, []);

  const filteredHistory = history.filter(b => {
    const matchType =
      filter === "all" ? true :
      filter === "court" ? b.courts !== null :
      filter === "equipment" ? b.courts === null : true;

    const matchSearch =
      search === "" ? true :
      b.users?.username?.toLowerCase().includes(search.toLowerCase()) ||
      b.users?.email?.toLowerCase().includes(search.toLowerCase()) ||
      String(b.id).includes(search);

    return matchType && matchSearch;
  });

  const totalRevenue = filteredHistory
    .filter(b => b.status === "paid" || b.status === "returned")
    .reduce((sum, b) => sum + Number(b.total_price ?? 0), 0);

  return (
    <div className="flex-1 p-10 bg-[#FAFAFA] min-h-screen">

      {/* HEADER */}
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Booking History</h1>

      {/* STAT CARDS — เหมือน Dashboard */}
      <div className="grid grid-cols-3 gap-4 mb-10">
        <div className="bg-white p-5 rounded-sm border border-gray-200 shadow-sm">
          <p className="text-gray-400 text-[10px] font-bold uppercase mb-1">รายการทั้งหมด (90 วัน)</p>
          <p className="text-2xl font-bold text-gray-800">{filteredHistory.length}</p>
        </div>
        <div className="bg-white p-5 rounded-sm border border-gray-200 shadow-sm">
          <p className="text-gray-400 text-[10px] font-bold uppercase mb-1">รายได้ 90 วันย้อนหลัง</p>
          <p className="text-2xl font-bold text-gray-800">฿{totalRevenue.toLocaleString()}</p>
        </div>
        <div className="bg-white p-5 rounded-sm border border-gray-200 shadow-sm">
          <p className="text-gray-400 text-[10px] font-bold uppercase mb-1">สำเร็จ (paid + returned)</p>
          <p className="text-2xl font-bold text-gray-800">
            {filteredHistory.filter(b => b.status === "paid" || b.status === "returned").length}
          </p>
        </div>
      </div>

      {/* TOOLBAR — เหมือน Dashboard */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
        <div className="flex gap-6 border-b border-gray-100">
          {[
            { key: "all",       label: "ทั้งหมด" },
            { key: "court",     label: "จองสนาม" },
            { key: "equipment", label: "ยืมอุปกรณ์" },
          ].map(f => (
            <button
              key={f.key}
              onClick={() => setFilter(f.key)}
              className={`pb-3 text-sm font-bold transition-all border-b-2 -mb-px ${
                filter === f.key
                  ? "border-gray-900 text-gray-900"
                  : "border-transparent text-gray-400 hover:text-gray-600"
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>

        <input
          type="text"
          placeholder="ค้นหา user, email, booking ID..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="px-4 py-2 rounded-lg border border-gray-200 bg-white text-xs outline-none focus:ring-1 focus:ring-gray-300 w-64"
        />
      </div>

      {/* TABLE — เหมือน Dashboard */}
      <div className="bg-white rounded-sm border border-gray-100 shadow-sm overflow-hidden">
        <table className="w-full text-left text-xs">
          <thead className="bg-gray-50 border-b border-gray-100 text-gray-400 font-bold">
            <tr>
              <th className="p-4 uppercase">Author</th>
              <th className="p-4 uppercase">Type</th>
              <th className="p-4 uppercase">Court / Equipment</th>
              <th className="p-4 uppercase">Date</th>
              <th className="p-4 uppercase">Amount</th>
              <th className="p-4 uppercase">Receipt</th>
              <th className="p-4 uppercase">Status</th>
              <th className="p-4 uppercase text-right">ID</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {filteredHistory.length === 0 ? (
              <tr>
                <td colSpan={8} className="p-20 text-center text-gray-400">
                  ไม่พบประวัติการจอง
                </td>
              </tr>
            ) : filteredHistory.map(b => {
              const dateText = b.booking_date
                ? new Date(b.booking_date + "T00:00:00").toLocaleDateString("th-TH")
                : "-";

              const equipText = b.booking_equipments?.length > 0
                ? b.booking_equipments.map(e => `${e.equipments?.name} x${e.quantity}`).join(", ")
                : null;

              const status = statusConfig[b.status] || { label: b.status, class: "bg-gray-100 text-gray-500" };

              return (
                <tr key={b.id} className="hover:bg-gray-50 transition-colors">
                  <td className="p-4 flex items-center gap-3">
                    <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center text-gray-300 flex-shrink-0">
                      👤
                    </div>
                    <div>
                      <p className="font-bold text-gray-700">{b.users?.username ?? "-"}</p>
                      <p className="text-[10px] text-gray-400">{b.users?.email ?? "-"}</p>
                    </div>
                  </td>
                  <td className="p-4 text-gray-500">
                    {b.courts ? "จองสนาม" : "ยืมอุปกรณ์"}
                  </td>
                  <td className="p-4 text-gray-500 max-w-[200px]">
                    <p className="truncate">{b.courts?.name ?? equipText ?? "-"}</p>
                    {b.courts && <p className="text-[10px] text-gray-400">{b.courts.category}</p>}
                  </td>
                  <td className="p-4 text-gray-500 whitespace-nowrap">{dateText}</td>
                  <td className="p-4">
                    <span className="font-mono font-bold text-gray-700">
                      ฿{Number(b.total_price ?? 0).toLocaleString()}
                    </span>
                  </td>
                  <td className="p-4">
                    {b.receipt_url ? (
                      <button
                        onClick={() => window.open(b.receipt_url, "_blank")}
                        className="text-teal-500 font-bold hover:underline"
                      >
                        View
                      </button>
                    ) : (
                      <span className="text-gray-300">-</span>
                    )}
                  </td>
                  <td className="p-4">
                    <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase ${status.class}`}>
                      {status.label}
                    </span>
                  </td>
                  <td className="p-4 text-right text-gray-300 font-mono">
                    #{b.id}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

    </div>
  );
};

export default AdminBookingHistory;