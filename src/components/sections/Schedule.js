"use client";

import { useGsapAnimation } from "@/hooks/useGsapAnimation";

export const Schedule = () => {
  const scheduleData = [
    { time: '10:00 AM', event: 'Wedding Ceremony' },
    { time: '11:30 AM', event: 'Lunch Reception' },
    { time: '2:00 PM', event: 'Photo Session' }
  ];

  useGsapAnimation('.schedule-item', {
    opacity: 0,
    x: -50,
    duration: 0.8,
    stagger: 0.2
  });

  return (
    <section className="py-20 schedule-section">
      <div className="container mx-auto px-4">
        <h3 className="text-4xl font-serif text-center mb-12">Schedule</h3>
        <div className="max-w-2xl mx-auto">
          {scheduleData.map((item, index) => (
            <div key={index} className="schedule-item flex items-center justify-between mb-8 p-4 bg-white rounded-lg shadow-md">
              <span className="text-xl font-serif">{item.time}</span>
              <span className="text-lg text-gray-700">{item.event}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};