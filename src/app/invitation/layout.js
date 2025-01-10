import Link from "next/link";
import { Aleo } from 'next/font/google';
import Image from "next/image";


const aleo = Aleo({ subsets: ["latin"], weight: "400" });

export default function Layout({ children }) {
  return (
    <main className={`${aleo.className} flex items-center justify-center dark:bg-zinc-800 bg-gray-100 max-h-[1600px] min-h-full h-screen py-4 sm:p-8`}>
      {children}
      <Link href="/" className="bg-white p-1 rounded-bl-lg absolute right-[0px] top-[0px] ">
        <Image
          src="/images/arrow-left.svg"
          alt="arrow-left"
          width={30}
          height={30}
          className='z-10'
        />
      </Link>
    </main>
  );
}

