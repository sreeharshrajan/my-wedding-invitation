"use client"
import React, { useState, useEffect } from "react";

const CountdownTimer = ({ targetTime }) => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    const timerInterval = setInterval(() => {
      const now = new Date();
      const distance = targetTime - now;

      if (distance <= 0) {
        clearInterval(timerInterval);
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      } else {
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        setTimeLeft({ days, hours, minutes, seconds });
      }
    }, 1000);

    return () => clearInterval(timerInterval);
  }, [targetTime]);

  return (
    <div className="w-full max-w-4xl mx-auto p-8">
      <div className="flex justify-center items-center gap-4">
        {Object.entries(timeLeft).map(([unit, value]) => (
          <div key={unit} className="flex flex-col items-center">
            <div className="bg-gray-100 rounded-lg p-4 w-20 h-20 flex items-center justify-center mb-2 shadow-lg">
              <span className="text-4xl font-bold text-gray-800">
                {value.toString().padStart(2, '0')}
              </span>
            </div>
            <span className="text-sm uppercase tracking-wider text-white font-semibold">
              {unit}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CountdownTimer;