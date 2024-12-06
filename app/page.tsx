"use client";
import { useEffect, useState } from 'react';
import { Content } from './components/Content';

export interface ContentProps {
  message?: string;
  date?: string;
  muhurtham?: string;
  venue?: string;
  bride?: {
    name?: string | undefined;
    parents?: string;
    address?: string;
    image?: string;
  };
  groom?: {
    name?: string | undefined;
    parents?: string;
    address?: string;
    image?: string;
  };
}

export default function Home() {
  const [data, setData] = useState([]);
  useEffect(() => {
    fetch('/api/details')
      .then((response) => response.json())
      .then((data) => setData(data))
      .catch((error) => console.error('Error fetching data:', error));
  }, []);
  return (
    <main className="card bg-white border border-gray-300 rounded-lg shadow-lg flex items-center justify-center text-center overflow-hidden  w-[calc(100vh*5/7)] h-screen md:h-screen md:w-[calc(100vh*5/7)] sm:w-full sm:h-full max-w-full max-h-full p-6 box-border relative m-4">
      <Content props={data as ContentProps} />
      <div className="flowers-top"></div>
      <div className="flowers-bottom"></div>
   </main>
  );
}
