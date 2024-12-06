import type { Metadata } from "next";
import { Aleo } from 'next/font/google';
import "./assets/css/globals.css";

export const metadata: Metadata = {
  title: "Devipriya & Sreeharsh's Wedding",
  description: "Devipriya Weds Sreeharsh - January 19, 2025",
};

const aleo = Aleo({ subsets: ["latin"], weight: "400" });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${aleo.className} flex items-center justify-center dark:bg-zinc-800 bg-gray-100 h-screen py-4 sm:p-8`}>
        {children}
        {/* <div className="fixed bottom-0 right-0">
          <Image
            src="/images/flowers_bottom.webp"
            alt="flower"
            width={1753}
            height={499}
          />
        </div>
         <div className="fixed top-0 right-0">
          <Image
            src="/images/flowers_top.webp"
            alt="flower"
            width={1753}
            height={499}
          />
        </div>
         <div className="fixed bottom-0 right-0">
          <Image
            src="/images/flowers_right.webp"
            alt="flower"
            width={615}
            height={2480}
          />
        </div> */}
      </body>
    </html>
  );
}
