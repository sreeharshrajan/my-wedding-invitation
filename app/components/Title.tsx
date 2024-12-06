import { Dancing_Script } from 'next/font/google';
const dancing = Dancing_Script({ subsets: ["latin"], weight: "400" });
export function Title({ bride, groom }: { bride: string, groom: string }) {
  
  return (
    <div className="flex flex-col items-center justify-center">
      <h1 className={`text-3xl font-extrabold text-[#009b79] ${dancing.className}`}>{groom}</h1>
      <p className={`text-lg mb-0 p-0 text-dark ${dancing.className}`}>with</p>
      <h1 className={`mb-2 mt-0 text-3xl font-extrabold text-[#009b79] ${dancing.className}`}>{bride}</h1>
    </div>
  );
}