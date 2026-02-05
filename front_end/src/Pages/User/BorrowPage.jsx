import React, { useState } from 'react';

const BorrowPage = () => {
  // ข้อมูลอุปกรณ์ตัวอย่าง
  const [equipments] = useState([
    { id: 1, name: "ลูกฟุตบอล (Nike)", category: "ฟุตบอล", price: 20, stock: 10, image: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=200" },
    { id: 2, name: "ไม้แบตมินตัน (Yonex)", category: "แบตมินตัน", price: 50, stock: 8, image: "https://images.unsplash.com/photo-1613912305664-672462319200?w=200" },
    { id: 3, name: "ลูกบาสเกตบอล", category: "บาสเกตบอล", price: 30, stock: 0, image: "https://images.unsplash.com/photo-1519861531153-f351f0a482aa?w=200" },
  ]);

  const [cart, setCart] = useState([]);

  // ฟังก์ชันเพิ่มเข้าตะกร้า
  const addToCart = (item) => {
    if (item.stock === 0) return;
    // เพิ่ม timestamp เล็กน้อยเพื่อให้ id ในตะกร้าไม่ซ้ำกันกรณีเพิ่มชิ้นเดิมซ้ำๆ
    const itemWithUniqueId = { ...item, cartId: Date.now() + Math.random() };
    setCart([...cart, itemWithUniqueId]);
  };

  // ฟังก์ชันลบออกจากตะกร้า (ใช้ cartId ในการระบุตัวที่จะลบ)
  const removeFromCart = (cartId) => {
    setCart(cart.filter(item => item.cartId !== cartId));
  };

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold mb-8 text-gray-800">ยืมอุปกรณ์กีฬา</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* รายการอุปกรณ์ */}
        <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-4">
          {equipments.map(item => (
            <div key={item.id} className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex gap-4 transition-transform hover:scale-[1.02]">
              <img src={item.image} alt={item.name} className="w-24 h-24 object-cover rounded-xl" />
              <div className="flex-1">
                <h3 className="font-bold text-gray-800">{item.name}</h3>
                <p className="text-sm text-gray-400">{item.category}</p>
                <div className="mt-2 flex justify-between items-center">
                  <span className="text-teal-600 font-bold">฿{item.price} / ชิ้น</span>
                  <span className={`text-xs font-medium ${item.stock > 0 ? 'text-green-500' : 'text-red-500'}`}>
                    {item.stock > 0 ? `คงเหลือ ${item.stock}` : 'หมด'}
                  </span>
                </div>
                <button 
                  onClick={() => addToCart(item)}
                  disabled={item.stock === 0}
                  className="w-full mt-3 bg-teal-500 hover:bg-teal-600 text-white py-1.5 rounded-lg text-sm font-semibold transition-colors disabled:bg-gray-300"
                >
                  + เพิ่มรายการ
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* สรุปรายการยืม (Cart) */}
        <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100 h-fit sticky top-20">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-gray-800">รายการที่เลือก</h2>
            <span className="bg-teal-100 text-teal-600 text-xs font-bold px-2.5 py-1 rounded-full">
              {cart.length} ชิ้น
            </span>
          </div>

          {cart.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-4xl mb-2">🛒</div>
              <p className="text-gray-400 text-sm">ยังไม่มีรายการที่เลือก</p>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="max-h-[400px] overflow-y-auto pr-2">
                {cart.map((item) => (
                  <div key={item.cartId} className="flex justify-between items-center py-3 border-b border-gray-50 last:border-0 group">
                    <div className="flex flex-col">
                      <span className="text-sm font-medium text-gray-700">{item.name}</span>
                      <span className="text-xs text-teal-600 font-bold">฿{item.price}</span>
                    </div>
                    <button 
                      onClick={() => removeFromCart(item.cartId)}
                      className="p-2 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all opacity-0 group-hover:opacity-100"
                      title="ลบรายการนี้"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </div>
                ))}
              </div>

              <div className="pt-4 border-t-2 border-dashed border-gray-100">
                <div className="flex justify-between font-bold text-lg text-gray-800">
                  <span>ยอดรวมมัดจำ</span>
                  <span className="text-teal-600 underline decoration-teal-200 decoration-4">
                    ฿{cart.reduce((sum, item) => sum + item.price, 0)}
                  </span>
                </div>
                <button className="w-full bg-gray-900 hover:bg-black text-white py-3.5 rounded-xl mt-6 font-bold shadow-lg shadow-gray-200 transition-all active:scale-[0.98]">
                  ยืนยันการยืม
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BorrowPage;