
import { useState, useEffect } from "react";
import BookingCalendar from "../../components/BookingCalendar";

export default function HomePage() {
  const images = [
    "https://i.pinimg.com/1200x/ac/ea/bd/aceabd555e4f6a1e4d2c6151383397f5.jpg",
    "https://i.pinimg.com/1200x/cc/b4/ed/ccb4ed99cad4201e54e18085d132812b.jpg",
    "https://i.pinimg.com/1200x/0f/ad/ee/0fadee641661bfb0a1e1bed51d2a5c94.jpg",
    "https://i.pinimg.com/1200x/8d/74/09/8d7409f39ced59cbdf9c73b476f0ba5a.jpg"
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 3000); // เปลี่ยนรูปทุก 3 วินาที

    return () => clearInterval(interval);
  }, []);

  const handleSelectDate = (date) => {
    console.log("เลือกวันที่:", date);
  };

  return (
    <div className="p-8 flex justify-center">
      <div className="w-full max-w-7xl bg-white rounded-2xl shadow border overflow-hidden">

        {/* รูปสนาม (Slider) */}
        <div className="h-125 relative">
          <img
            src={images[currentIndex]}
            className="w-full h-full object-cover transition-opacity duration-800"
          />
        </div>

        {/* ปฏิทิน */}
        <div className="p-6">
          <BookingCalendar onSelectDate={handleSelectDate} />
        </div>

      </div>
    </div>
  );
}