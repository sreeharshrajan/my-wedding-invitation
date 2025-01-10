"use client";

import { useEffect, useState } from "react";
import { useGsapAnimation } from "@/hooks/useGsapAnimation";
import CountdownTimer from "@/components/common/CountdownTimer";

export const Hero = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const targetDate = new Date("2025-01-19T12:00:00");
  useEffect(() => {
    // Simulate a delay to ensure this isn't the first component loaded
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 1000); // Delay for 1 second

    return () => clearTimeout(timer);
  }, []);

  useGsapAnimation(".hero-text", {
    opacity: 0,
    y: 50,
    duration: 1.5,
    ease: "power3.out",
  });

  if (!isLoaded)
    return (
      <section className="h-screen flex items-center justify-center bg-[url('/hero-bg.jpg')] bg-cover bg-center"></section>
    );

  return (
    <section className="h-screen flex items-center justify-center bg-[url('/hero-bg.jpg')] bg-cover bg-center">
      <div className="text-center hero-text">
        <h5 className="mt-4 text-lg leading-8 text-white font-serif">
          We are getting married on January 19, 2025
        </h5>

        <h2 className="text-6xl md:text-8xl font-serif text-white">
          Deviprya & Sreeharsh
        </h2>

        <CountdownTimer targetTime={targetDate} />
      </div>
    </section>
  );
};
