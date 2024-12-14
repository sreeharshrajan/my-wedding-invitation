import type { Metadata } from "next";
import { Aleo } from 'next/font/google';
import "./assets/css/globals.css";

export const metadata: Metadata = {
  title: "Sreeharsh & Devipriya's Wedding",
  description: "You are cordially invited to join us on the auspicious occasion of Sreeharsh and Devipriya's wedding on January 19, 2025.",
  icons: {
    icon: "/images/favicon.jpg",
  },
  openGraph: {
    title: "Sreeharsh & Devipriya's Wedding",
    description: "You are cordially invited to join us on the auspicious occasion of Sreeharsh and Devipriya's wedding on January 19, 2025.",
    url: "https://sreeh-weds-devi.vercel.app/",
    siteName: "Sreeharsh & Devipriya's Wedding",
    images: [
      {
        url: "/images/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Sreeharsh & Devipriya's Wedding",
        type: "image/jpeg",
      },
    ],
  },
};

const aleo = Aleo({ subsets: ["latin"], weight: "400" });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${aleo.className} flex items-center justify-center dark:bg-zinc-800 bg-gray-100 max-h-[1600px] min-h-full py-4 sm:p-8`}>
        {children}
      
        
       
      </body>
    </html>
  );
}

