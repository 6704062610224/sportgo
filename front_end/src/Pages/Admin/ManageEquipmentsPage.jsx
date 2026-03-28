// import { useEffect, useState } from "react";
// import { supabase } from "../../supabaseClient";

// const categories = [
//   "ทั้งหมด",
//   "ฟุตบอล",
//   "แบดมินตัน",
//   "บาสเกตบอล",
//   "ปิงปอง",
//   "วอลเลย์บอล"
// ];

// const ManageEquipmentsPage = () => {
//   const [equipments, setEquipments] = useState([]);
//   const [filter, setFilter] = useState("ทั้งหมด");
//   const [loading, setLoading] = useState(true);
//   const [editing, setEditing] = useState(null);

//   const fetchEquipments = async () => {
//     setLoading(true);
//     const { data, error } = await supabase
//       .from("equipments")
//       .select("*")
//       .order("sport_type", { ascending: true });

//     if (!error) setEquipments(data || []);
//     setLoading(false);
//   };

//   useEffect(() => {
//     fetchEquipments();

//     const channel = supabase
//       .channel("equipments-realtime")
//       .on(
//         "postgres_changes",
//         { event: "*", schema: "public", table: "equipments" },
//         () => fetchEquipments()
//       )
//       .subscribe();

//     return () => supabase.removeChannel(channel);
//   }, []);

//   const filteredEquipments =
//     filter === "ทั้งหมด"
//       ? equipments
//       : equipments.filter(e => e.sport_type === filter);

//   const adjustValue = (field, delta, min = 0) => {
//     setEditing(prev => ({
//       ...prev,
//       [field]: Math.max(min, (prev[field] || 0) + delta)
//     }));
//   };

//   return (
//     <div className="p-8 bg-[#FAFAFA] min-h-screen">
//       <h1 className="text-3xl font-bold text-gray-800 mb-6">
//         Manage Equipments
//       </h1>

//       {/* FILTER */}
//       <div className="flex gap-2 mb-8 flex-wrap">
//         {categories.map(cat => (
//           <button
//             key={cat}
//             onClick={() => setFilter(cat)}
//             className={`px-4 py-2 rounded-xl text-sm font-bold transition
//               ${filter === cat
//                 ? "bg-teal-600 text-white"
//                 : "bg-white shadow-sm text-gray-600 hover:bg-gray-50"
//               }`}
//           >
//             {cat}
//           </button>
//         ))}
//       </div>

//       {/* CONTENT */}
//       {loading ? (
//         <p className="text-gray-400">Loading...</p>
//       ) : filteredEquipments.length === 0 ? (
//         <p className="text-gray-400">ไม่พบอุปกรณ์</p>
//       ) : (
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
//           {filteredEquipments.map(eq => (
//             <div
//               key={eq.id}
//               className="bg-white rounded-xl border border-gray-100 shadow-sm p-4"
//             >
//               <img
//                 src={eq.image_url || "https://via.placeholder.com/300x200"}
//                 alt={eq.name}
//                 className="w-full h-40 object-contain rounded-lg bg-gray-50"
//               />
//               <div className="mt-3">
//                 <p className="text-xs uppercase text-gray-400 font-bold">
//                   {eq.sport_type}
//                 </p>
//                 <h3 className="font-bold text-gray-800">{eq.name}</h3>
//                 <p className="text-sm font-bold text-teal-600">
//                   ฿{Number(eq.price_per_unit).toLocaleString()}
//                 </p>
//                 <div className="mt-2 text-sm">
//                   <p>จำนวนทั้งหมด: <span className="font-bold">{eq.stock}</span></p>
//                   <p className={`font-bold ${eq.stock === 0 ? "text-red-500" : "text-green-600"}`}>
//                     {eq.stock === 0 ? "Out of stock" : "พร้อมใช้งาน"}
//                   </p>
//                 </div>
//                 <div className="flex gap-2 mt-4">
//                   <button
//                     className="flex-1 text-xs py-2 rounded bg-gray-100 hover:bg-gray-200 font-bold transition"
//                     onClick={() => setEditing({ ...eq })}
//                   >
//                     Edit
//                   </button>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       )}

//       {/* EDIT MODAL */}
//       {editing && (
//         <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
//           <div className="bg-white rounded-2xl w-[420px] shadow-xl overflow-hidden">

//             {/* HEADER */}
//             <div className="px-6 py-5">
//               <h2 className="text-lg font-medium text-gray-900 tracking-tight">แก้ไขอุปกรณ์</h2>
//               <p className="text-sm text-gray-400 mt-0.5">ปรับชื่อ รูปภาพ ราคา และจำนวนคงเหลือ</p>
//             </div>

//             {/* PRODUCT CARD */}
//             <div className="mx-6 mb-2 p-4 rounded-2xl bg-gray-50 flex items-center gap-4 border border-gray-100">
//               <div className="w-16 h-16 rounded-xl bg-white border border-gray-100 overflow-hidden flex-shrink-0">
//                 <img
//                   src={editing.image_url || "https://via.placeholder.com/150"}
//                   alt={editing.name}
//                   className="w-full h-full object-contain"
//                 />
//               </div>
//               <div>
//                 <p className="font-medium text-gray-900 text-sm">{editing.name}</p>
//                 <p className="text-xs text-gray-400 mt-0.5">{editing.sport_type}</p>
//                 <span className={`inline-block mt-1.5 text-xs px-2.5 py-0.5 rounded-full font-medium
//                   ${editing.stock === 0
//                     ? "bg-red-50 text-red-500"
//                     : "bg-emerald-50 text-emerald-600"
//                   }`}>
//                   {editing.stock === 0 ? "Out of stock" : "พร้อมใช้งาน"}
//                 </span>
//               </div>
//             </div>

//             {/* BODY */}
//             <div className="px-6 pt-4 pb-2 space-y-4 max-h-[50vh] overflow-y-auto">

//               {/* ชื่ออุปกรณ์ */}
//               <div>
//                 <label className="text-xs font-medium text-gray-500 block mb-1.5">ชื่ออุปกรณ์</label>
//                 <input
//                   type="text"
//                   className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-900 bg-gray-50 outline-none focus:ring-2 focus:ring-gray-200 transition"
//                   value={editing.name}
//                   onChange={e => setEditing({ ...editing, name: e.target.value })}
//                 />
//               </div>

//               {/* URL รูปภาพ */}
//               <div>
//                 <label className="text-xs font-medium text-gray-500 block mb-1.5">URL รูปภาพ</label>
//                 <input
//                   type="text"
//                   className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-900 bg-gray-50 outline-none focus:ring-2 focus:ring-gray-200 transition"
//                   value={editing.image_url || ""}
//                   onChange={e => setEditing({ ...editing, image_url: e.target.value })}
//                   placeholder="https://example.com/image.jpg"
//                 />
//                 <p className="text-xs text-gray-400 mt-1">วางลิงก์รูปภาพ รูป preview จะอัปเดตอัตโนมัติ</p>
//               </div>

//               {/* ราคา + จำนวน (2 คอลัมน์) */}
//               <div className="grid grid-cols-2 gap-4">
//                 <div>
//                   <label className="text-xs font-medium text-gray-500 block mb-1.5">ราคา (บาท)</label>
//                   <div className="flex items-center border border-gray-200 rounded-xl overflow-hidden bg-gray-50">
//                     <button
//                       type="button"
//                       onClick={() => adjustValue("price_per_unit", -10)}
//                       className="w-10 h-10 flex items-center justify-center text-gray-400 hover:bg-gray-100 transition text-lg flex-shrink-0"
//                     >
//                       −
//                     </button>
//                     <input
//                       type="number"
//                       className="flex-1 text-center outline-none bg-transparent text-sm font-medium text-gray-900 min-w-0"
//                       value={editing.price_per_unit}
//                       onChange={e => setEditing({ ...editing, price_per_unit: Number(e.target.value) })}
//                     />
//                     <button
//                       type="button"
//                       onClick={() => adjustValue("price_per_unit", 10)}
//                       className="w-10 h-10 flex items-center justify-center text-gray-400 hover:bg-gray-100 transition text-lg flex-shrink-0"
//                     >
//                       +
//                     </button>
//                   </div>
//                   <p className="text-xs text-gray-400 mt-1">ทีละ 10 บาท</p>
//                 </div>

//                 <div>
//                   <label className="text-xs font-medium text-gray-500 block mb-1.5">จำนวนคงเหลือ</label>
//                   <div className="flex items-center border border-gray-200 rounded-xl overflow-hidden bg-gray-50">
//                     <button
//                       type="button"
//                       onClick={() => adjustValue("stock", -1)}
//                       className="w-10 h-10 flex items-center justify-center text-gray-400 hover:bg-gray-100 transition text-lg flex-shrink-0"
//                     >
//                       −
//                     </button>
//                     <input
//                       type="number"
//                       className="flex-1 text-center outline-none bg-transparent text-sm font-medium text-gray-900 min-w-0"
//                       value={editing.stock}
//                       onChange={e => setEditing({ ...editing, stock: Number(e.target.value) })}
//                     />
//                     <button
//                       type="button"
//                       onClick={() => adjustValue("stock", 1)}
//                       className="w-10 h-10 flex items-center justify-center text-gray-400 hover:bg-gray-100 transition text-lg flex-shrink-0"
//                     >
//                       +
//                     </button>
//                   </div>
//                   <p className="text-xs text-gray-400 mt-1">ทีละ 1 ชิ้น</p>
//                 </div>
//               </div>

//             </div>

//             {/* FOOTER */}
//             <div className="px-6 pb-6 pt-5 flex gap-3">
//               <button
//                 className="flex-1 py-3 rounded-xl border border-gray-200 bg-white text-gray-500 text-sm font-medium hover:bg-gray-50 transition"
//                 onClick={() => setEditing(null)}
//               >
//                 ยกเลิก
//               </button>
//               <button
//                 className="grow py-3 rounded-xl bg-gray-900 text-white text-sm font-medium hover:bg-gray-800 active:scale-95 transition-all"
//                 onClick={async () => {
//                   const { error } = await supabase
//                     .from("equipments")
//                     .update({
//                       name: editing.name,
//                       image_url: editing.image_url,
//                       price_per_unit: editing.price_per_unit,
//                       stock: editing.stock,
//                     })
//                     .eq("id", editing.id);

//                   if (error) {
//                     alert(error.message);
//                   } else {
//                     setEditing(null);
//                     fetchEquipments();
//                   }
//                 }}
//               >
//                 บันทึกการเปลี่ยนแปลง
//               </button>
//             </div>

//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default ManageEquipmentsPage;






import { useEffect, useState } from "react";
import { supabase } from "../../supabaseClient";

const categories = [
  "ทั้งหมด",
  "ฟุตบอล",
  "แบดมินตัน",
  "บาสเกตบอล",
  "ปิงปอง",
  "วอลเลย์บอล"
];

const ManageEquipmentsPage = () => {
  const [equipments, setEquipments] = useState([]);
  const [filter, setFilter] = useState("ทั้งหมด");
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(null);

  const fetchEquipments = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("equipments")
      .select("*")
      .order("sport_type", { ascending: true });

    if (!error) setEquipments(data || []);
    setLoading(false);
  };

  useEffect(() => {
    fetchEquipments();

    const channel = supabase
      .channel("equipments-realtime")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "equipments" },
        () => fetchEquipments()
      )
      .subscribe();

    return () => supabase.removeChannel(channel);
  }, []);

  const filteredEquipments =
    filter === "ทั้งหมด"
      ? equipments
      : equipments.filter(e => e.sport_type === filter);

  const adjustValue = (field, delta, min = 0) => {
    setEditing(prev => ({
      ...prev,
      [field]: Math.max(min, (prev[field] || 0) + delta)
    }));
  };

  return (
    <div className="flex-1 p-10 bg-[#FAFAFA] min-h-screen">

      {/* HEADER */}
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Manage Equipments</h1>

      {/* STAT CARDS */}
      {/* <div className="grid grid-cols-3 gap-4 mb-10">
        <div className="bg-white p-5 rounded-sm border border-gray-200 shadow-sm">
          <p className="text-gray-400 text-[10px] font-bold uppercase mb-1">อุปกรณ์ทั้งหมด</p>
          <p className="text-2xl font-bold text-gray-800">{equipments.length}</p>
        </div>
        <div className="bg-white p-5 rounded-sm border border-gray-200 shadow-sm">
          <p className="text-gray-400 text-[10px] font-bold uppercase mb-1">พร้อมใช้งาน</p>
          <p className="text-2xl font-bold text-gray-800">
            {equipments.filter(e => e.stock > 0).length}
          </p>
        </div>
        <div className="bg-white p-5 rounded-sm border border-gray-200 shadow-sm">
          <p className="text-gray-400 text-[10px] font-bold uppercase mb-1">หมดสต็อก</p>
          <p className="text-2xl font-bold text-gray-800">
            {equipments.filter(e => e.stock === 0).length}
          </p>
        </div>
      </div> */}

      {/* FILTER TABS */}
      <div className="flex gap-6 border-b border-gray-100 mb-6">
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setFilter(cat)}
            className={`pb-3 text-sm font-bold transition-all border-b-2 -mb-px ${
              filter === cat
                ? "border-gray-900 text-gray-900"
                : "border-transparent text-gray-400 hover:text-gray-600"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* CONTENT */}
      {loading ? (
        <p className="text-gray-400">Loading...</p>
      ) : filteredEquipments.length === 0 ? (
        <p className="text-gray-400">ไม่พบอุปกรณ์</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredEquipments.map(eq => (
            <div
              key={eq.id}
              className="bg-white rounded-sm border border-gray-100 shadow-sm p-4"
            >
              <img
                src={eq.image_url || "https://via.placeholder.com/300x200"}
                alt={eq.name}
                className="w-full h-40 object-contain rounded-sm bg-gray-50"
              />
              <div className="mt-3">
                <p className="text-[10px] uppercase text-gray-400 font-bold">
                  {eq.sport_type}
                </p>
                <h3 className="font-bold text-gray-700">{eq.name}</h3>
                <p className="text-sm font-bold text-gray-800">
                  ฿{Number(eq.price_per_unit).toLocaleString()}
                </p>
                <div className="mt-2 text-xs text-gray-500">
                  <p>จำนวนทั้งหมด: <span className="font-bold text-gray-700">{eq.stock}</span></p>
                  <span className={`inline-block mt-1 px-3 py-0.5 rounded-full text-[10px] font-black uppercase
                    ${eq.stock === 0
                      ? "bg-red-50 text-red-500"
                      : "bg-green-50 text-green-600"
                    }`}>
                    {eq.stock === 0 ? "Out of stock" : "พร้อมใช้งาน"}
                  </span>
                </div>
                <div className="flex gap-2 mt-4">
                  <button
                    className="flex-1 text-xs py-2 rounded-sm border border-gray-200 bg-white text-gray-500 font-bold hover:bg-gray-50 transition"
                    onClick={() => setEditing({ ...eq })}
                  >
                    Edit
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* EDIT MODAL */}
      {editing && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white rounded-sm w-[420px] shadow-xl overflow-hidden">

            {/* HEADER */}
            <div className="px-6 py-5 border-b border-gray-100">
              <h2 className="text-lg font-bold text-gray-800 tracking-tight">แก้ไขอุปกรณ์</h2>
              <p className="text-xs text-gray-400 mt-0.5">ปรับชื่อ รูปภาพ ราคา และจำนวนคงเหลือ</p>
            </div>

            {/* PRODUCT CARD */}
            <div className="mx-6 mt-5 mb-2 p-4 rounded-sm bg-gray-50 flex items-center gap-4 border border-gray-100">
              <div className="w-16 h-16 rounded-sm bg-white border border-gray-100 overflow-hidden flex-shrink-0">
                <img
                  src={editing.image_url || "https://via.placeholder.com/150"}
                  alt={editing.name}
                  className="w-full h-full object-contain"
                />
              </div>
              <div>
                <p className="font-bold text-gray-700 text-sm">{editing.name}</p>
                <p className="text-[10px] text-gray-400 mt-0.5">{editing.sport_type}</p>
                <span className={`inline-block mt-1.5 text-[10px] px-2.5 py-0.5 rounded-full font-black uppercase
                  ${editing.stock === 0
                    ? "bg-red-50 text-red-500"
                    : "bg-green-50 text-green-600"
                  }`}>
                  {editing.stock === 0 ? "Out of stock" : "พร้อมใช้งาน"}
                </span>
              </div>
            </div>

            {/* BODY */}
            <div className="px-6 pt-4 pb-2 space-y-4 max-h-[50vh] overflow-y-auto">

              {/* ชื่ออุปกรณ์ */}
              <div>
                <label className="text-[10px] font-bold text-gray-400 uppercase block mb-1.5">ชื่ออุปกรณ์</label>
                <input
                  type="text"
                  className="w-full border border-gray-200 rounded-sm px-4 py-2.5 text-sm text-gray-900 bg-gray-50 outline-none focus:ring-1 focus:ring-gray-300 transition"
                  value={editing.name}
                  onChange={e => setEditing({ ...editing, name: e.target.value })}
                />
              </div>

              {/* URL รูปภาพ */}
              <div>
                <label className="text-[10px] font-bold text-gray-400 uppercase block mb-1.5">URL รูปภาพ</label>
                <input
                  type="text"
                  className="w-full border border-gray-200 rounded-sm px-4 py-2.5 text-sm text-gray-900 bg-gray-50 outline-none focus:ring-1 focus:ring-gray-300 transition"
                  value={editing.image_url || ""}
                  onChange={e => setEditing({ ...editing, image_url: e.target.value })}
                  placeholder="https://example.com/image.jpg"
                />
                <p className="text-[10px] text-gray-400 mt-1">วางลิงก์รูปภาพ รูป preview จะอัปเดตอัตโนมัติ</p>
              </div>

              {/* ราคา + จำนวน */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-[10px] font-bold text-gray-400 uppercase block mb-1.5">ราคา (บาท)</label>
                  <div className="flex items-center border border-gray-200 rounded-sm overflow-hidden bg-gray-50">
                    <button
                      type="button"
                      onClick={() => adjustValue("price_per_unit", -10)}
                      className="w-10 h-10 flex items-center justify-center text-gray-400 hover:bg-gray-100 transition text-lg flex-shrink-0"
                    >
                      −
                    </button>
                    <input
                      type="number"
                      className="flex-1 text-center outline-none bg-transparent text-sm font-bold text-gray-700 min-w-0"
                      value={editing.price_per_unit}
                      onChange={e => setEditing({ ...editing, price_per_unit: Number(e.target.value) })}
                    />
                    <button
                      type="button"
                      onClick={() => adjustValue("price_per_unit", 10)}
                      className="w-10 h-10 flex items-center justify-center text-gray-400 hover:bg-gray-100 transition text-lg flex-shrink-0"
                    >
                      +
                    </button>
                  </div>
                  <p className="text-[10px] text-gray-400 mt-1">ทีละ 10 บาท</p>
                </div>

                <div>
                  <label className="text-[10px] font-bold text-gray-400 uppercase block mb-1.5">จำนวนคงเหลือ</label>
                  <div className="flex items-center border border-gray-200 rounded-sm overflow-hidden bg-gray-50">
                    <button
                      type="button"
                      onClick={() => adjustValue("stock", -1)}
                      className="w-10 h-10 flex items-center justify-center text-gray-400 hover:bg-gray-100 transition text-lg flex-shrink-0"
                    >
                      −
                    </button>
                    <input
                      type="number"
                      className="flex-1 text-center outline-none bg-transparent text-sm font-bold text-gray-700 min-w-0"
                      value={editing.stock}
                      onChange={e => setEditing({ ...editing, stock: Number(e.target.value) })}
                    />
                    <button
                      type="button"
                      onClick={() => adjustValue("stock", 1)}
                      className="w-10 h-10 flex items-center justify-center text-gray-400 hover:bg-gray-100 transition text-lg flex-shrink-0"
                    >
                      +
                    </button>
                  </div>
                  <p className="text-[10px] text-gray-400 mt-1">ทีละ 1 ชิ้น</p>
                </div>
              </div>

            </div>

            {/* FOOTER */}
            <div className="px-6 pb-6 pt-5 flex gap-3">
              <button
                className="flex-1 py-3 rounded-sm border border-gray-200 bg-white text-gray-500 text-sm font-bold hover:bg-gray-50 transition"
                onClick={() => setEditing(null)}
              >
                ยกเลิก
              </button>
              <button
                className="grow py-3 rounded-sm bg-gray-900 text-white text-sm font-bold hover:bg-gray-800 active:scale-95 transition-all"
                onClick={async () => {
                  const { error } = await supabase
                    .from("equipments")
                    .update({
                      name: editing.name,
                      image_url: editing.image_url,
                      price_per_unit: editing.price_per_unit,
                      stock: editing.stock,
                    })
                    .eq("id", editing.id);

                  if (error) {
                    alert(error.message);
                  } else {
                    setEditing(null);
                    fetchEquipments();
                  }
                }}
              >
                บันทึกการเปลี่ยนแปลง
              </button>
            </div>

          </div>
        </div>
      )}
    </div>
  );
};

export default ManageEquipmentsPage;