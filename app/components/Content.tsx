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
    <div className="flex flex-col items-center justify-center z-10 space-y-2 w-full">
      {loading ? <div className=""></div> :
        <>
          <Address props={groom ?? {}} />
          <p className="text-xs text-dark my-2">{message}</p>
          <Title bride={bride?.name} groom={groom?.name} />
          <Address props={bride ?? {}} />
          <p className="text-normal my-2 text-dark">{date}</p>
          <Muhurtham data={muhurtham} />
          <p className="text-xs text-dark">At</p>
          <div className="w-3/4 justify-center items-center flex-col flex">
            
          <Image src="/images/googlemaps.svg" alt="map" width={30} height={30} />
          <a className="flex items-center" href="https://maps.app.goo.gl/i12cpiwrsbJSGE9d7">
            <p className="text-sm font-medium text-dark">{venue}</p>
          </a>
        </div>


          <div className="absolute left-[40px] top-[155px] sm:top-[200px] sm:left-[50px] z-10">
            <Image
              src="/images/flower_1.webp"
              alt="flower"
              width={195 / 4}
              height={166 / 4}
            />
          </div>
          <div className="absolute bottom-[120px] right-[20px] sm:bottom-[170px] sm:right-[35px] z-10">
            <Image
              src="/images/flower_2.webp"
              alt="flower"
              width={195 / 4}
              height={166 / 4}
            />
          </div>
        </>
      }
    </div>
  );
}

