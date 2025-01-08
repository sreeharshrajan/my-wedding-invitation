"use client";

import { useGsapAnimation } from "@/hooks/useGsapAnimation";
export const Hero = () => {
  useGsapAnimation('.hero-text', {
    opacity: 0,
    y: 50,
    duration: 1.5,
    ease: 'power3.out'
  });

  return (
    <section className="h-screen flex items-center justify-center bg-[url('/hero-bg.jpg')] bg-cover bg-center">
      <div className="text-center hero-text">
        <h1 className="text-5xl md:text-7xl font-serif text-white mb-4">The Wedding of</h1>
        <h2 className="text-6xl md:text-8xl font-serif text-white">Deviprya & Sreeharsh</h2>
      </div>
    </section>
  );
};