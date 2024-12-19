import { Muhurtham } from "./Muhurtham";
import { Address } from "./Address";
import { Title } from "./Title";
import Image from "next/image";

export interface ContentProps {
  title?: string;
  date?: string;
  description?: string;
  message?: string;
  muhurtham?: string;
  venue?: string;
  location?: string;
  bride?: {
    name?: string;
    image?: string;
    address?: string;
    parents?: string;
  };
  groom?: {
    name?: string;
    image?: string;
    address?: string;
    parents?: string;
  };
}

interface ContentComponentProps {
  data: ContentProps;
  loading: boolean;
}

export const Content: React.FC<ContentComponentProps> = ({ data, loading }) => {
  const { message, date, muhurtham, venue, bride, groom } = data;
  return (
    <div className="flex flex-col items-center justify-center z-10">
      {loading ? <div className=""></div> :
        <>
          <Address props={groom ?? {}} />
          <p className="text-xs text-dark my-2">{message}</p>
          <Title bride={bride?.name} groom={groom?.name} />
          <Address props={bride ?? {}} />
          <p className="text-normal my-2 text-dark">{date}</p>
          <Muhurtham data={muhurtham} />
          <p className="text-xs text-dark">At</p>
          {/* <Image src="/images/googlemaps.svg" alt="map" width={25} height={25} /> */}

          <a className="flex items-center" href="https://maps.app.goo.gl/i12cpiwrsbJSGE9d7">
            {/* <span>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-dark" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 2C8.686 2 6 4.686 6 8c0 5.25 6 11 6 11s6-5.75 6-11c0-3.314-2.686-6-6-6zm0 8a2 2 0 110-4 2 2 0 010 4z" />
              </svg>
            </span>   */}
            <p className="text-sm font-medium text-dark">{venue}</p>
          </a>
          <div className="absolute left-[20px] bottom-[230px] sm:bottom-[290px] sm:left-[35px] z-10">
            <Image
              src="/images/flower_1.webp"
              alt="flower"
              width={195 / 4}
              height={166 / 4}
            />
          </div>
          <div className="absolute bottom-[135px] right-[10px] sm:bottom-[180px] sm:right-[30px] z-10">
            <Image
              src="/images/flower_2.webp"
              alt="flower"
              width={195 / 5}
              height={166 / 5}
            />
          </div>
        </>
      }
    </div>
  );
}

