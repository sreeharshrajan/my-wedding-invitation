"use client";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import gsap from "gsap";

export const Slider = () => {
  const [activeIndex, setActiveIndex] = useState(1);
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);
  const cardsWrapperRef = useRef(null);
  const infoWrapperRef = useRef(null);
  const backgroundRef = useRef(null);

  const minSwipeDistance = 50;

  const slides = [
    {
      url: "/images/prewedding/1.jpg",
      alt: "Pre-wedding photo 1",
      title: "प्यार",
      subtitle: "FRANCE",
      description: "Let your dreams come true",
    },
    {
      url: "/images/prewedding/2.jpg",
      alt: "Pre-wedding photo 2",
      title: "പ്രണയം",
      subtitle: "FRANCE",
      description: "City of eternal love",
    },
    {
      url: "/images/prewedding/5.jpg",
      alt: "Pre-wedding photo 3",
      title: "VENICE",
      subtitle: "ITALY",
      description: "Where romance meets history",
    },
  ];

  const onTouchStart = (e) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;

    const distance = touchStart - touchEnd;
    const isSwipe = Math.abs(distance) > minSwipeDistance;

    if (isSwipe) {
      if (distance > 0) {
        handleSwap("right");
      } else {
        handleSwap("left");
      }
    }
  };

  const getClass = (index) => {
    if (index === activeIndex) return "current--card";
    if (
      index === activeIndex - 1 ||
      (activeIndex === 0 && index === slides.length - 1)
    )
      return "previous--card";
    if (
      index === activeIndex + 1 ||
      (activeIndex === slides.length - 1 && index === 0)
    )
      return "next--card";
    return "";
  };

  const handleSwap = (direction) => {
    const timeline = gsap.timeline();

    timeline
      .to(".card-info.active .text", {
        duration: 0.4,
        stagger: 0.1,
        translateY: "-120px",
        opacity: 0,
      })
      .call(() => {
        if (direction === "right") {
          setActiveIndex((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
        } else {
          setActiveIndex((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
        }
      })
      .fromTo(
        ".card-info.active .text",
        {
          opacity: 0,
          translateY: "40px",
        },
        {
          duration: 0.4,
          stagger: 0.1,
          translateY: "0px",
          opacity: 1,
        }
      );
  };

  return (
    <div className="relative h-screen w-full overflow-hidden bg-gray-900">
      {/* Background Images */}
      <div ref={backgroundRef} className="absolute inset-0 z-0">
        {slides.map((slide, index) => (
          <div
            key={`bg-${index}`}
            className={`absolute inset-0 transition-opacity duration-700 ${index === activeIndex ? "opacity-100" : "opacity-0"
              }`}
          >
            <Image
              src={slide.url}
              alt={slide.alt}
              fill
              className="object-cover blur-md scale-110"
            />
            <div className="absolute inset-0 bg-black/50" />
          </div>
        ))}
      </div>

      {/* Cards */}
      <div
        ref={cardsWrapperRef}
        className="relative h-full flex items-center justify-center"
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
      >
        <div className="relative w-[300px] h-[400px] sm:px-4 lg:p-0">
          {slides.map((slide, index) => (
            <div
              key={index}
              className={`absolute w-[300px] h-[400px] transition-all duration-700 ease-out ${getClass(
                index
              )}`}
            >
              <div className="relative w-full h-full rounded-xl overflow-hidden shadow-2xl transform-gpu">
                <Image
                  src={slide.url}
                  alt={slide.alt}
                  fill
                  className="object-cover"
                />
                {/* Card Text Overlay */}
                <div className="absolute inset-0 flex flex-col hidden items-center justify-end pb-8 text-white text-center">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                  <h3 className="relative text-2xl font-bold mb-1 z-10">
                    {slide.title}
                  </h3>
                  <p className="relative text-sm tracking-wider z-10">
                    — {slide.subtitle} —
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Center Text Overlay */}
        <div
          ref={infoWrapperRef}
          className="absolute inset-0 hidden flex items-center justify-center pointer-events-none"
        >
          {slides.map((slide, index) => (
            <div
              key={`info-${index}`}
              className={`card-info absolute text-white text-center 
              }`}
            >
              <h2 className="text text-7xl font-bold mb-3">{slide.title}</h2>
              <p className="text text-2xl mb-4 tracking-widest">
                — {slide.subtitle} —
              </p>
              <p className="text text-lg font-light">{slide.description}</p>
            </div>
          ))}
        </div>

        {/* Navigation Buttons */}
        <button
          onClick={() => handleSwap("left")}
          className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/20 rounded-full p-4 transition-all duration-200"
          aria-label="Previous slide"
        >
          <ChevronLeft className="w-6 h-6 text-white" />
        </button>
        <button
          onClick={() => handleSwap("right")}
          className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/20 rounded-full p-4 transition-all duration-200"
          aria-label="Next slide"
        >
          <ChevronRight className="w-6 h-6 text-white" />
        </button>
      </div>

      <style jsx>{`
        .current--card {
          transform: translateX(0) scale(1) !important;
          opacity: 1;
          z-index: 30;
        }
        .previous--card {
          transform: translateX(-30%) scale(0.85) rotate(-4deg);
          opacity: 0.9;
          z-index: 20;
        }
        .next--card {
          transform: translateX(30%) scale(0.85) rotate(4deg);
          opacity: 0.9;
          z-index: 20;
        }
      `}</style>
    </div>
  );
};

export default Slider;
