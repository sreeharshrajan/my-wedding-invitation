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
      const tl = gsap.timeline();

      tl.from(".hero-subtitle", {
        opacity: 0,
        y: 30,
        duration: 1,
        ease: "power3.out"
      }).from(".hero-title", {
        opacity: 0,
        y: 50,
        duration: 1.2,
        ease: "power3.out"
      }, "-=0.5");
    }
  }, [isLoaded]);

  if (!isLoaded) {
    return (
      <section className="relative min-h-screen flex items-center justify-center bg-[url('/images/hero_bg-2.jpg')] bg-cover bg-center bg-no-repeat">
        <div className="absolute inset-0 bg-black/40" />
      </section>
    );
  }

  return (
    <section className="relative min-h-screen bg-[url('/images/hero_bg-2.jpg')] bg-cover bg-center bg-no-repeat">
      <div className="absolute inset-0 bg-black/40" />

      {/* Countdown Timer */}
      <div className="relative z-10 w-full flex justify-center py-6 lg:py-10">
        <CountdownTimer targetTime={targetDate} />
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex items-center justify-center min-h-[calc(100vh-280px)]">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto space-y-2 md:space-y-6">
            <h5 className="hero-subtitle font-aleo text-white tracking-wide opacity-90 text-sm md:text-base lg:text-lg">
              We are getting married on January 19, 2025
            </h5>

            <h2 className="hero-title font-primary text-white text-4xl md:text-5xl lg:text-6xl xl:text-7xl leading-tight">
              Deviprya &amp; Sreeharsh
            </h2>
          </div>
        </div>
      </div>

      {/* Down Arrow */}
      <div className="relative z-10 flex justify-center">
        <Link
          href="#schedule"
          className="inline-block animate-bounce hover:opacity-100 transition-opacity"
        >
          <ArrowDown size={30} className=" text-white opacity-70" />
        </Link>
      </div>
    </section>
  );
};

export default Hero;