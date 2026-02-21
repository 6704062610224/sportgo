import React, { useEffect, useState } from "react";
import { supabase } from "../../supabaseClient";

const ManageBorrowPage = () => {
  const [bookings, setBookings] = useState([]);

  const fetchData = async () => {
    const { data } = await supabase
      .from("bookings")
      .select(`
        id,
        status,
        users(username),
        booking_equipments(quantity, equipments(name))
      `)
      .eq("status", "paid")
      .is("court_id",null);

    setBookings(data || []);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleReturn = async (bookingId) => {
    const confirm = window.confirm("ยืนยันว่าคืนอุปกรณ์แล้ว?");
    if (!confirm) return;

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

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">รายการยืมอุปกรณ์</h1>

      {bookings.map(b => (
        <div key={b.id} className="border p-4 rounded mb-3">
          <p>ผู้ยืม: {b.users?.username}</p>
          <p>
            อุปกรณ์:
            {b.booking_equipments.map(e =>
              ` ${e.equipments.name} x${e.quantity}`
            )}
          </p>

          <button
            onClick={() => handleReturn(b.id)}
            className="mt-2 bg-blue-600 text-white px-4 py-2 rounded"
          >
            คืนอุปกรณ์
          </button>
        </div>
      ))}
    </div>
  );
};

export default ManageBorrowPage;