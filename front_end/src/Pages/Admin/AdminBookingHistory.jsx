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