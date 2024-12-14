"use client";
import Head from 'next/head';
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
        setTimeout(() => { setLoading(false); }, 1000);
      })
      .catch((error) => {
        setLoading(false);
        console.error('Error fetching data:', error);
      });
  }, []);

  if (loading) {
    return <div className="card bg-white border border-gray-300 rounded-lg shadow-lg flex items-center justify-center text-center overflow-hidden w-[calc(100vh*5/7)] h-full md:h-[1600px] md:w-[calc(100vh*5/7)] sm:w-full sm:h-full max-w-full max-h-full p-6 box-border relative m-4">
      <svg className="animate-spin h-5 w-5 z-20 text-[#009b79]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth={4}></circle>
        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 2.042.786 3.899 2.071 5.291l2.929-2.929z"></path>
      </svg>
    </div>;
  }

  return (
    <>
      <Head>
        <title>Sreeharsh & Devipriya's Wedding</title>
        <meta property="og:title" content="Sreeharsh & Devipriya's Wedding" />
        <meta property="og:description" content="You are cordially invited to join us on the auspicious occasion of Sreeharsh and Devipriya's wedding on January 19, 2025." />
        <meta property="og:image" content="/images/og-image.jpg" />
        <meta property="og:url" content="https://sreeh-weds-devi.vercel.app/" />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>
      <main className="card bg-white border border-gray-300 rounded-lg shadow-lg flex items-center justify-center text-center overflow-hidden w-[calc(100vh*5/7)] h-screen md:h-screen md:w-[calc(100vh*5/7)] sm:w-full sm:h-full max-w-full max-h-full p-6 box-border relative m-4">
        <Content data={data} loading={loading} />
        <div className="flowers-top"></div>
        <div className="flowers-bottom"></div>
      </main>
    </>
  );
}