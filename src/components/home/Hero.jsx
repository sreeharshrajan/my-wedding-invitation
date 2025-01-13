import { useEffect, useState } from "react";
import { gsap } from "gsap";
import CountdownTimer from "@/components/home/CountdownTimer";
import { ArrowDown } from "lucide-react";
import Link from "next/link";

const Hero = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const targetDate = new Date("2025-01-19T12:00:00");

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (isLoaded) {
      // Create animation timeline
      const tl = gsap.timeline();

      // Animate hero text elements
      tl.from(".hero-subtitle", {
        opacity: 0,
        y: 30,
        duration: 1,
        ease: "power3.out"
      })
        .from(".hero-title", {
          opacity: 0,
          y: 50,
          duration: 1.2,
          ease: "power3.out"
        }, "-=0.5"); // Start slightly before previous animation ends
    }
  }, [isLoaded]);

  if (!isLoaded) {
    return (
      <section className="relative h-screen flex items-center justify-center bg-[url('/images/hero_bg-2.jpg')] bg-cover bg-center bg-no-repeat">
        <div className="absolute inset-0 bg-black/40" />
      </section>
    );
  }

  return (
    <section className="relative h-screen bg-[url('/images/hero_bg-2.jpg')] bg-cover bg-center bg-no-repeat">
      <div className="absolute inset-0 bg-black/40" />

      {/* Countdown Timer positioned at top */}
      <div className="relative z-10 w-full flex justify-center pt-6 sm:pt-8">
        <CountdownTimer targetTime={targetDate} />
      </div>

      {/* Main Content */}
      <div className="relative z-10 h-full flex items-center justify-center">
        <div className="container mx-auto">
          <div className="text-center px-4 max-w-4xl mx-auto">
            <h5 className="hero-subtitle font-aleo text-xs sm:text-sm md:text-lg text-white tracking-wide opacity-90">
              We are getting married on January 19, 2025
            </h5>

            <h2 className="hero-title font-primary text-white mt-4 md:mt-6 text-4xl leading-tight sm:text-4xl md:text-lg lg:text-6xl xl:text-7xl">
              Deviprya &amp; Sreeharsh
            </h2>
          </div>
        </div>
      </div>

      {/* Down Arrow */}
      <Link href="#schedule" className="absolute bottom-14 left-1/2 transform -translate-x-1/2 z-10">
        <div className="animate-bounce">
          <ArrowDown className="w-6 h-6 text-white opacity-70 hover:opacity-100 transition-opacity cursor-pointer" />
        </div>
      </Link>
    </section>
  );
};

export default Hero;