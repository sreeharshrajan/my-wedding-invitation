'use client';
import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import gsap from 'gsap';

export const CinematicSlider = () => {
  const [activeIndex, setActiveIndex] = useState(1);
  const cardsWrapperRef = useRef(null);
  const infoWrapperRef = useRef(null);
  const backgroundRef = useRef(null);

  const slides = [
    {
      url: '/prewed-1.jpg',
      alt: 'Pre-wedding photo 1',
      title: 'CHAMONIX',
      subtitle: 'FRANCE',
      description: 'Let your dreams come true'
    },
    {
      url: '/prewed-2.jpg',
      alt: 'Pre-wedding photo 2',
      title: 'PARIS',
      subtitle: 'FRANCE',
      description: 'City of eternal love'
    },
    {
      url: '/prewed-3.jpg',
      alt: 'Pre-wedding photo 3',
      title: 'VENICE',
      subtitle: 'ITALY',
      description: 'Where romance meets history'
    }
  ];

  const getClass = (index) => {
    if (index === activeIndex) return 'current--card';
    if (index === activeIndex - 1 || (activeIndex === 0 && index === slides.length - 1)) return 'previous--card';
    if (index === activeIndex + 1 || (activeIndex === slides.length - 1 && index === 0)) return 'next--card';
    return '';
  };

  const handleSwap = (direction) => {
    const timeline = gsap.timeline();

    // Fade out current text
    timeline.to('.card-info.active .text', {
      duration: 0.4,
      stagger: 0.1,
      translateY: '-120px',
      opacity: 0
    });

    // Update state after text fade out
    timeline.call(() => {
      if (direction === 'right') {
        setActiveIndex((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
      } else {
        setActiveIndex((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
      }
    });

    // Fade in new text
    timeline.fromTo(
      '.card-info.active .text',
      {
        opacity: 0,
        translateY: '40px'
      },
      {
        duration: 0.4,
        stagger: 0.1,
        translateY: '0px',
        opacity: 1
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
            className={`absolute inset-0 transition-opacity duration-700 ${index === activeIndex ? 'opacity-100' : 'opacity-0'
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
      <div ref={cardsWrapperRef} className="relative h-full flex items-center justify-center">
        <div className="relative w-[300px] h-[400px]">
          {slides.map((slide, index) => (
            <div
              key={index}
              className={`absolute w-[300px] h-[400px] transition-all duration-700 ease-out ${getClass(index)}`}
            >
              <div className="relative w-full h-full rounded-xl overflow-hidden shadow-2xl transform-gpu">
                <Image
                  src={slide.url}
                  alt={slide.alt}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-black/20" />
              </div>
            </div>
          ))}
        </div>

        {/* Text Overlays */}
        <div ref={infoWrapperRef} className="absolute inset-0 flex items-center justify-center">
          {slides.map((slide, index) => (
            <div
              key={`info-${index}`}
              className={`card-info absolute text-white text-center transition-opacity duration-700 ${index === activeIndex ? 'active opacity-100' : 'opacity-0'
                }`}
            >
              <h2 className="text text-6xl font-bold mb-2">{slide.title}</h2>
              <p className="text text-xl mb-4">— {slide.subtitle} —</p>
              <p className="text text-lg italic">{slide.description}</p>
            </div>
          ))}
        </div>

        {/* Navigation Buttons */}
        <button
          onClick={() => handleSwap('left')}
          className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/20 rounded-full p-4 transition-all duration-200"
          aria-label="Previous slide"
        >
          <ChevronLeft className="w-6 h-6 text-white" />
        </button>
        <button
          onClick={() => handleSwap('right')}
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
          transform: translateX(-30%) scale(0.85);
          opacity: 0.9;
          z-index: 20;
        }
        .next--card {
          transform: translateX(30%) scale(0.85);
          opacity: 0.9;
          z-index: 20;
        }
      `}</style>
    </div>
  );
};

export default CinematicSlider;