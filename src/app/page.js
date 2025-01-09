'use client';
import { Suspense } from 'react';
import Loading from '@/components/Loading';
import Lenis from 'lenis';
import { Hero } from '@/components/sections/Hero';
import { TypewriterQuote } from '@/components/sections/TypewriterQuote';
import { DateVenue } from '@/components/sections/DateVenue';
import { ImageSlider } from '@/components/sections/ImageSlider';
import  WishTheCouple  from '@/components/sections/WishTheCouple';
import { useEffect } from 'react';

export default function Home() {

  useEffect(() => {
    const lenis = new Lenis()

    function raf(time) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }

    requestAnimationFrame(raf)
  }, [])


  return (
    <Suspense fallback={<Loading />}>
      <Hero />
      <TypewriterQuote />
      <DateVenue />
      <ImageSlider />
      <WishTheCouple />
    </Suspense>
  );
}

