
import React, { useEffect, useRef } from 'react';
import { Dancing_Script } from 'next/font/google';
import { gsap } from 'gsap';

const dancing = Dancing_Script({ subsets: ["latin"], weight: "400" });

export const AnimatedTitle: React.FC<{ text: string, className: string }> = ({ text, className }) => {
  const textRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (textRef.current) {
      const chars = textRef.current.textContent?.split('') || [];
      
      // Clear out the text
      textRef.current.textContent = '';
      
      // Create spans for each character
      chars.forEach((char) => {
        const span = document.createElement('span');
        span.textContent = char;
        span.style.opacity = '0';
        span.style.display = 'inline-block';
        textRef.current?.appendChild(span);
      });

      // Animate each character
      gsap.fromTo(
        textRef.current.children,
        { 
          opacity: 0,
          y: 50,
          rotationX: -90
        },
        { 
          opacity: 1,
          y: 0,
          rotationX: 0,
          duration: 0.8,
          stagger: 0.05,
          ease: 'back.out(1.7)'
        }
      );
    }
  }, [text]);

  return (
    <h1 ref={textRef} className={`text-3xl font-extrabold text-[#009b79] ${dancing.className} ${className}`}>
      {text}
    </h1>
  );
};
