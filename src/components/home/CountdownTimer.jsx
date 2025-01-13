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
    <div className="w-auto inline-block px-4 py-3 backdrop-blur-md bg-rose-500/10 rounded-full border border-rose-500/20 shadow-lg">
      <div className="flex items-center gap-3 sm:gap-4 px-2">
        {Object.entries(timeLeft).map(([unit, value]) => (
          <div key={unit} className="flex flex-col items-center">
            <div className=" flex items-center justify-center shadow-sm transition-all duration-300 hover:bg-rose-500/30">
              <span className="text-base sm:text-md font-bold text-white">
                {value.toString().padStart(2, "0")}
              </span>
            </div>
            <span className="text-[10px] uppercase tracking-wider text-white/80 font-medium">
              {unit}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CountdownTimer;