import React from 'react';

export default function HomePage() {
  return (
    <div className="p-8 flex flex-col items-center">
      <div className="w-full max-w-4xl bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
        <div className="flex justify-between items-center mb-4">
          <h2 className="font-bold">June 2025</h2>
          <div className="flex gap-2">
            <button className="p-1 border rounded">{"<"}</button>
            <button className="p-1 border rounded">{">"}</button>
          </div>
        </div>
        {/* จำลองปฏิทิน */}
        <div className="grid grid-cols-7 gap-2 text-center text-sm">
          {['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'].map(d => <div key={d} className="font-bold py-2">{d}</div>)}
          {Array.from({ length: 30 }, (_, i) => (
            <div key={i} className={`p-4 border rounded-lg hover:bg-teal-50 cursor-pointer ${i+1 === 26 ? 'bg-teal-500 text-white' : ''}`}>
              {i + 1}
            </div>
          ))}
        </div>
      </div>
      <div className="w-full max-w-4xl mt-8 grid grid-cols-3 gap-4">
        <div className="h-32 bg-gray-200 rounded-xl flex items-center justify-center">รูปข่าวสารกีฬา</div>
        <div className="h-32 bg-gray-200 rounded-xl flex items-center justify-center">รูปข่าวสารกีฬา</div>
        <div className="h-32 bg-gray-200 rounded-xl flex items-center justify-center">รูปข่าวสารกีฬา</div>
      </div>
    </div>
  );
}
