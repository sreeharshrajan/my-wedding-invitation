"use client"

import { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const useGsapAnimation = (selector, animation) => {
  useEffect(() => {
    gsap.from(selector, {
      ...animation,
      scrollTrigger: {
        trigger: selector,
        start: 'top center',
        toggleActions: 'restart none none reverse',
        ...animation.scrollTrigger
      }
    });
  }, [selector, animation]);
};