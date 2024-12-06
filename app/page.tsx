"use client";
import { useEffect, useState } from 'react';
import { Content } from './components/Content';

export interface ContentProps {
  message?: string;
  date?: string;
  muhurtham?: string;
  venue?: string;
  bride?: {
    name?: string;
    parents?: string;
    address?: string;
    image?: string;
  };
  groom?: {
    name?: string;
    parents?: string;
    address?: string;
    image?: string;
  };
}

export default function Home() {
  const [data, setData] = useState<ContentProps>({});
  const [loading, setLoading] = useState<boolean>(true);
  
  useEffect(() => {
    setLoading(true);
    fetch('/api/details')
      .then((response) => response.json())
      .then((fetchedData: ContentProps) => {
        setData(fetchedData);
        setTimeout(() => { setLoading(false); }, 2000);
      })
      .catch((error) => {
        setLoading(false); 
        console.error('Error fetching data:', error);
      });
  }, []);

  if (loading) {
    return  <div className="card bg-white border border-gray-300 rounded-lg shadow-lg flex items-center justify-center text-center overflow-hidden w-[calc(100vh*5/7)] h-screen md:h-screen md:w-[calc(100vh*5/7)] sm:w-full sm:h-full max-w-full max-h-full p-6 box-border relative m-4"></div>;
  }

  return (
    <main className="card bg-white border border-gray-300 rounded-lg shadow-lg flex items-center justify-center text-center overflow-hidden w-[calc(100vh*5/7)] h-screen md:h-screen md:w-[calc(100vh*5/7)] sm:w-full sm:h-full max-w-full max-h-full p-6 box-border relative m-4">
      <Content data={data} loading={loading} />
      <div className="flowers-top"></div>
      <div className="flowers-bottom"></div>
    </main>
  );
}