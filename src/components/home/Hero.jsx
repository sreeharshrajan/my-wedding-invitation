import { useEffect, useState } from "react";
import { useGsapAnimation } from "@/hooks/useGsapAnimation";
import CountdownTimer from "@/components/home/CountdownTimer";

const Hero = () => {
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

  if (!isLoaded) {
    return (
      <section className="h-screen flex items-center justify-center bg-[url('/images/hero_bg-2.jpg')] bg-cover bg-center" />
    );
  }

  return (
    <section className="h-screen flex items-center justify-center bg-[url('/images/hero_bg-2.jpg')] bg-cover bg-center">
      <div className="text-center hero-text px-4 sm:px-6 md:px-8">
        <h5 className="mt-4 text-sm sm:text-base md:text-lg lg:text-xl leading-6 sm:leading-7 md:leading-8 text-white font-serif">
          We are getting married on January 19, 2025
        </h5>

        <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-8xl font-serif text-white mt-2 sm:mt-3 md:mt-4">
          Deviprya &amp; Sreeharsh
        </h2>

        <CountdownTimer targetTime={targetDate} />
      </div>
    </section>
  );
};

export default Hero;
