import React, { useRef, useEffect, useState } from "react";
import Card from "./Card";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Wall = ({ wishes }) => {
  const containerRef = useRef(null);
  const [columns, setColumns] = useState(3);
  const cardRefs = useRef([]);

  // Reset card refs array when wishes change
  useEffect(() => {
    cardRefs.current = cardRefs.current.slice(0, wishes.length);
  }, [wishes]);

  // Handle responsive columns
  useEffect(() => {
    const updateColumns = () => {
      if (!containerRef.current) return;
      const width = containerRef.current.offsetWidth;
      if (width < 640) setColumns(1);
      else if (width < 1024) setColumns(2);
      else setColumns(3);
    };

    updateColumns();
    window.addEventListener('resize', updateColumns);
    return () => window.removeEventListener('resize', updateColumns);
  }, []);

  // GSAP animations
  useEffect(() => {
    cardRefs.current.forEach((card, index) => {
      // Initial state
      gsap.set(card, {
        opacity: 0,
        y: 50,
      });

      // Create animation
      gsap.to(card, {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: "power3.out",
        scrollTrigger: {
          trigger: card,
          start: "top bottom-=100",
          toggleActions: "play none none reverse",
        },
        delay: index % columns * 0.1, // Stagger based on column position
      });
    });

    return () => {
      // Cleanup ScrollTrigger instances
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, [columns, wishes]);

  // Distribute wishes into columns
  const getColumnWishes = (columnIndex) => {
    return wishes.filter((_, index) => index % columns === columnIndex);
  };

  return (
    <div ref={containerRef} className="container mx-auto mb-10 xl:px-0">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: columns }, (_, columnIndex) => (
          <div key={columnIndex} className="flex flex-col gap-6">
            {getColumnWishes(columnIndex).map((wish, wishIndex) => (
              <div
                key={wish.id}
                ref={el => {
                  const globalIndex = wishIndex * columns + columnIndex;
                  cardRefs.current[globalIndex] = el;
                }}
                className="transform-gpu" // Enable GPU acceleration
              >
                <Card wish={wish} />
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Wall;