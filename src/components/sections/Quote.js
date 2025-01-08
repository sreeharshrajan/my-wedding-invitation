"use client";

import { useGsapAnimation } from "@/hooks/useGsapAnimation";
export const Quote = () => {
  useGsapAnimation('.quote', {
    opacity: 0,
    y: 30,
    duration: 1
  });

  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <blockquote className="quote text-2xl md:text-3xl text-center font-serif text-gray-700 italic">
          "Two souls with but a single thought, two hearts that beat as one"
        </blockquote>
      </div>
    </section>
  );
};