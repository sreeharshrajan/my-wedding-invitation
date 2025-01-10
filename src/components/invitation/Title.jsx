import { Dancing_Script } from 'next/font/google';
import AnimatedTitle from "@/components/invitation/AnimatedTitle";

const dancing = Dancing_Script({ subsets: ["latin"], weight: "400" });

export function Title({ bride, groom }) {
  return (
    <div className="flex flex-col items-center justify-center">
      <AnimatedTitle text={groom || ''} className={dancing.className} />
      <p className="text-lg mb-0 p-0 text-stone-900">with</p>
      <AnimatedTitle text={bride || ''} className={dancing.className} />
    </div>
  );
}

export default Title;

