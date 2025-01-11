'use client';
import Image from "next/image";
import { useEffect, Suspense } from 'react';
import Loader from '@/components/ui/Loader';
import Lenis from 'lenis';
import Hero from '@/components/home/Hero';
import Quote from '@/components/home/Quote';
import Schedule from '@/components/home/Schedule';
import Slider from '@/components/home/Slider';
import WishWall from '@/components/home/WishWall';
import Footer from "@/components/ui/Footer";

export default function Home() {
  useEffect(() => {
    const lenis = new Lenis()

    function raf(time) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }

    requestAnimationFrame(raf)
  }, [])


  // return (
  //   <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-aleo)]">
  //   </div>
  // );
  return (
    <>
      <Hero />
      <Quote />
      <Schedule />
      <Slider />
      <WishWall />
      <Footer />
    </>
  );
}
