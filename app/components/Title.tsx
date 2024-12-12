import { Dancing_Script } from 'next/font/google';
import {AnimatedTitle} from "./AnimatedTitle";

const dancing = Dancing_Script({ subsets: ["latin"], weight: "400" });


export function Title({ bride, groom }: { bride?: string | undefined, groom?: string | undefined }) {
  return (
    <div className="flex flex-col items-center justify-center">
      <AnimatedTitle text={groom || ''} className="" />
      <p className={`text-lg mb-0 p-0 text-dark ${dancing.className}`}>with</p>
      <AnimatedTitle text={bride || ''} className="mb-2 mt-0" />
    </div>
  );
}

export default Title;
