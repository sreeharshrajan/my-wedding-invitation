import type { Metadata } from "next";
import { Aleo } from 'next/font/google';
import Image from "next/image";
import "./assets/css/globals.css";

export const metadata: Metadata = {
  title: "Devipriya & Sreeharsh's Wedding",
  description: "Devipriya Weds Sreeharsh - January 19, 2025",
  icons: {
    icon: "/images/favicon.jpg",
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
       <div className="absolute bottom-[55%] right-[57%] z-10">
          <Image
            src="/images/flower_1.webp"
            alt="flower"
            width={195/4}
            height={166/4}
          />
        </div>
       <div className="absolute bottom-[35%] right-[38%] z-10">
          <Image
            src="/images/flower_2.webp"
            alt="flower"
            width={195/4}
            height={166/4}
          />
        </div>
        
       
      </body>
    </html>
  );
}

