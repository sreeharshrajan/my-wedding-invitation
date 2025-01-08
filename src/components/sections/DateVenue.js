"use client";

import { useGsapAnimation } from "@/hooks/useGsapAnimation";
export const DateVenue = () => {
  useGsapAnimation('.date-venue', {
    opacity: 0,
    scale: 0.9,
    duration: 1
  });

  return (
    <section className="py-20 h-screen  flex items-center justify-center bg-white">
      <div className="container mx-auto px-4 text-center date-venue">
        <h3 className="text-4xl font-serif mb-6">Save the Date</h3>
        <p className="text-2xl text-gray-700 mb-4">March 15, 2025</p>
        <p className="text-xl text-gray-600">
          Grand Palace Convention Center<br />
          123 Wedding Lane, Dream City
        </p>
      </div>
    </section>
  );
};