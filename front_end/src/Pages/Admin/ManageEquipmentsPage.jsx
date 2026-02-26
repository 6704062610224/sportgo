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
    
    // realtime
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

  const handleDelete = async (id) => {
    const confirm = window.confirm("ยืนยันการลบอุปกรณ์?");
    if (!confirm) return;

    const { error } = await supabase
      .from("equipments")
      .delete()
      .eq("id", id);

    if (!error) fetchEquipments();
  };
  const adjustValue = (field, delta, min = 0) => {
    setEditing(prev => ({
      ...prev,
      [field]: Math.max(min, (prev[field] || 0) + delta)
    }));
  };
  return (
    <div className="p-8 bg-[#FAFAFA] min-h-screen">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">
        Manage Equipments
      </h1>

      {/* FILTER */}
      <div className="flex gap-2 mb-8 flex-wrap">
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setFilter(cat)}
            className={`px-4 py-2 rounded-full text-sm font-bold transition
              ${
                filter === cat
                  ? "bg-teal-600 text-white"
                  : "bg-white shadow-sm  text-gray-600 hover:bg-gray-50"
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
              className="bg-white rounded-xl border border-gray-100 shadow-sm p-4"
            >
              {/* IMAGE */}
              <img
                src={eq.image_url || "https://via.placeholder.com/300x200"}
                alt={eq.name}
                className="w-full h-40 object-contain rounded-lg bg-gray-50"
              />

              {/* INFO */}
              <div className="mt-3">
                <p className="text-xs uppercase text-gray-400 font-bold">
                  {eq.sport_type}
                </p>

                <h3 className="font-bold text-gray-800">
                  {eq.name}
                </h3>

                <p className="text-sm font-bold text-teal-600">
                  ฿{Number(eq.price_per_unit).toLocaleString()}
                </p>

                <div className="mt-2 text-sm">
                  <p>
                    จำนวนทั้งหมด:{" "}
                    <span className="font-bold">{eq.stock}</span>
                  </p>

                  <p
                    className={`font-bold ${
                      eq.stock === 0
                        ? "text-red-500"
                        : "text-green-600"
                    }`}
                  >
                    {eq.stock === 0
                      ? "Out of stock"
                      : "พร้อมใช้งาน"}
                  </p>
                </div>

                {/* ACTION */}
                <div className="flex gap-2 mt-4">
                  <button
                    className="flex-1 text-xs py-2 rounded bg-gray-100 hover:bg-gray-200 font-bold"
                    onClick={() => setEditing({ ...eq })}
                  >
                    Edit
                  </button>
{/*                   
                  <button
                    className="flex-1 text-xs py-2 rounded bg-red-100 text-red-600 hover:bg-red-200 font-bold"
                    onClick={() => handleDelete(eq.id)}
                  >
                    Delete
                  </button> */}
                </div>
              </div>
            </div>
            
          ))}
        </div>
        
      )}
      {/* ===== EDIT MODAL ===== */}
      {editing && (
  <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
    <div className="bg-white rounded-2xl w-[420px] shadow-xl overflow-hidden">
      
      {/* HEADER */}
      <div className="px-6 py-4 border-b">
        <h2 className="text-xl font-bold text-gray-800">
          แก้ไขอุปกรณ์
        </h2>
        <p className="text-sm text-gray-400">
          ปรับราคาและจำนวนคงเหลือ
        </p>
      </div>

      {/* BODY */}
      <div className="p-6 space-y-4">
        
        {/* IMAGE */}
        <div className="text-center">
          <h3 className="text-lg font-bold text-gray-800">
            {editing.name}
          </h3>
          <p className="text-sm text-gray-400">
            {editing.sport_type}
          </p>
        </div>
        <div className="flex justify-center">
          
          <img
            src={editing.image_url || "https://via.placeholder.com/150"}
            alt={editing.name}
            className="w-40 h-40 object-contain bg-gray-50 rounded-xl"
          />
        </div>

        {/* NAME */}
        {/* <div>
          <label className="text-sm font-bold text-gray-600">
            ชื่ออุปกรณ์
          </label>
          <input
            className="w-full mt-1 border rounded-lg p-2 bg-gray-100 text-gray-500"
            value={editing.name}
            disabled
          />
        </div> */}

        {/* PRICE */}
        {/* <div>
          <label className="text-sm font-bold text-gray-600">
            ราคา (บาท)
          </label>
          <input
            type="number"
            className="w-full mt-1 border rounded-lg p-2 focus:ring-2 focus:ring-teal-500 outline-none"
            value={editing.price_per_unit}
            onChange={e =>
              setEditing({
                ...editing,
                price_per_unit: Number(e.target.value)
              })
            }
          />
        </div> */}
        <div>
  <label className="text-sm font-bold text-gray-600">
    ราคา (บาท)
  </label>

  <div className="flex items-center mt-1 border rounded-lg overflow-hidden">
      <button
        type="button"
        onClick={() => adjustValue("price_per_unit", -10)}
        className="px-4 py-2 bg-gray-100 hover:bg-gray-200 font-bold"
      >
        −
      </button>

      <input
        type="number"
        className="flex-1 text-center outline-none"
        value={editing.price_per_unit}
        onChange={e =>
          setEditing({
            ...editing,
            price_per_unit: Number(e.target.value)
          })
        }
      />

      <button
        type="button"
        onClick={() => adjustValue("price_per_unit", 10)}
        className="px-4 py-2 bg-gray-100 hover:bg-gray-200 font-bold"
      >
        +
      </button>
    </div>

    <p className="text-xs text-gray-400 mt-1">
      ปรับครั้งละ 10 บาท
    </p>
  </div>

        {/* STOCK */}
        {/* <div>
          <label className="text-sm font-bold text-gray-600">
            จำนวนคงเหลือ
          </label>
          <input
            type="number"
            className="w-full mt-1 border rounded-lg p-2 focus:ring-2 focus:ring-teal-500 outline-none"
            value={editing.stock}
            onChange={e =>
              setEditing({
                ...editing,
                stock: Number(e.target.value)
              })
            }
          />
        </div> */}
        <div>
  <label className="text-sm font-bold text-gray-600">
    จำนวนคงเหลือ
  </label>

  <div className="flex items-center mt-1 border rounded-lg overflow-hidden">
    <button
      type="button"
      onClick={() => adjustValue("stock", -1)}
      className="px-4 py-2 bg-gray-100 hover:bg-gray-200 font-bold"
    >
      −
    </button>

    <input
      type="number"
      className="flex-1 text-center outline-none"
      value={editing.stock}
      onChange={e =>
        setEditing({
          ...editing,
          stock: Number(e.target.value)
        })
      }
    />

    <button
      type="button"
      onClick={() => adjustValue("stock", 1)}
      className="px-4 py-2 bg-gray-100 hover:bg-gray-200 font-bold"
    >
      +
    </button>
  </div>

  <p className="text-xs text-gray-400 mt-1">
    ปรับครั้งละ 1 ชิ้น
  </p>
</div>
      </div>

      {/* FOOTER */}
      <div className="px-6 py-4 bg-gray-50 flex gap-3">
        <button
          className="flex-1 py-2 rounded-lg font-bold bg-gray-200 hover:bg-gray-300 transition"
          onClick={() => setEditing(null)}
        >
          
          ยกเลิก
        </button>

        <button
          className="flex-1 py-2 rounded-lg font-bold
             bg-teal-600 text-white
             hover:bg-teal-700
             active:scale-95 transition"
          onClick={async () => {
            const { error } = await supabase
              .from("equipments")
              .update({
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