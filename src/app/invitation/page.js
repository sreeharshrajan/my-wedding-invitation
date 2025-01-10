"use client";
import Image from "next/image";
import { useEffect, useState } from 'react';
import { Content } from '@/components/invitation/Content';

export default function Page() {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetch('/api/details')
      .then(response => response.json())
      .then(fetchedData => {
        setData(fetchedData);
        setTimeout(() => setLoading(false), 1000);
      })
      .catch(error => {
        setLoading(false);
        console.error('Error fetching data:', error);
      });
  }, []);

  if (loading) {
    return (
      <div className="card bg-white border border-gray-300 rounded-lg shadow-lg flex items-center justify-center text-center overflow-hidden w-[calc(100vh*5/7)] h-full md:h-[1600px] md:w-[calc(100vh*5/7)] sm:w-full sm:h-full max-w-full max-h-full p-6 box-border relative m-4">
        {/* <svg className="animate-spin h-5 w-5 z-20 text-[#009b79]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth={4}></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 2.042.786 3.899 2.071 5.291l2.929-2.929z"></path>
        </svg> */}
        <div className="absolute left-[40px] top-[260px] sm:bottom-[290px] sm:left-[35px] z-10 animate-bounce">
          <Image
            src="/images/flower_1.webp"
            alt="flower"
            width={195 / 4}
            height={166 / 4}
          />
        </div>
        <div className="absolute bottom-[280px] right-[40px] sm:bottom-[180px] sm:right-[30px] z-10  animate-bounce">
          <Image
            src="/images/flower_2.webp"
            alt="flower"
            width={195 / 4}
            height={166 / 4}
          />
        </div>
      </div>
    );
  }

  return (
    <section className="card bg-white border border-gray-300 rounded-lg shadow-lg flex items-center justify-center text-center overflow-hidden w-[calc(100vh*5/7)] h-screen md:h-screen md:w-[calc(100vh*5/7)] sm:w-full sm:h-full max-w-full max-h-full p-6 box-border relative m-4">
      <Content data={data} />
      <div className="flowers-top"></div>
      <div className="flowers-bottom"></div>
    </section>
  );
}

