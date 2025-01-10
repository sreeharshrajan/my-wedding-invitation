import { Muhurtham } from "./Muhurtham";
import { Address } from "./Address";
import { Title } from "./Title";
import Image from "next/image";

export function Content({ data, loading }) {
  const { message, date, muhurtham, venue, bride, groom } = data;
  return (
    <div className="flex flex-col items-center justify-center z-10">
      {loading ? (
        <div className=""></div>
      ) : (
        <>
          <Address props={groom ?? {}} />
          <p className="text-xs text-stone-900 my-2">{message}</p>
            <Title bride={bride?.name} groom={groom?.name} />
            <p className="mt-2"></p>
          <Address props={bride ?? {}} />
          <p className="text-normal my-2 text-stone-900">{date}</p>
          <Muhurtham data={muhurtham} />
          <p className="text-xs text-stone-900">At</p>
          <a
            className="flex items-center"
            href="https://maps.app.goo.gl/i12cpiwrsbJSGE9d7"
          >
            <p className="text-sm font-medium text-stone-900">{venue}</p>
          </a>
          <div className="absolute left-[40px] top-[260px] sm:bottom-[290px] sm:left-[35px] z-10 ">
            <Image
              src="/images/flower_1.webp"
              alt="flower"
              width={195 / 4}
              height={166 / 4}
            />
          </div>
          <div className="absolute bottom-[280px] right-[40px] sm:bottom-[180px] sm:right-[30px] z-10">
            <Image
              src="/images/flower_2.webp"
              alt="flower"
              width={195 / 5}
              height={166 / 5}
            />
          </div>
        </>
      )}
    </div>
  );
}

