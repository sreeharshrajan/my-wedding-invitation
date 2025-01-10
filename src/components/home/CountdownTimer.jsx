"use client";
import React, { useState, useEffect } from "react";

const CountdownTimer = ({ targetTime }) => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const updateTimer = () => {
      const now = new Date();
      const distance = targetTime - now;

      if (distance <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        clearInterval(timerInterval);
      } else {
        setTimeLeft({
          days: Math.floor(distance / (1000 * 60 * 60 * 24)),
          hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((distance % (1000 * 60)) / 1000),
        });
      }
    };

    const timerInterval = setInterval(updateTimer, 1000);
    updateTimer();

    return () => clearInterval(timerInterval);
  }, [targetTime]);

  return (
    <div className="w-full max-w-4xl mx-auto p-3 sm:p-4 md:p-6 lg:p-8">
      <div className="flex flex-wrap justify-center items-center gap-3 sm:gap-4">
        {Object.entries(timeLeft).map(([unit, value]) => (
          <div key={unit} className="flex flex-col items-center">
            <div className="bg-gray-100 rounded-lg p-2 sm:p-3 md:p-4 w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 flex items-center justify-center mb-1 sm:mb-2 shadow-lg transition-all duration-300">
              <span className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-gray-800">
                {value.toString().padStart(2, "0")}
              </span>
            </div>
            <span className="text-[10px] sm:text-xs md:text-sm lg:text-base uppercase tracking-wider text-white font-semibold">
              {unit}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CountdownTimer;