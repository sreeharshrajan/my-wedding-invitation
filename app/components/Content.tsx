import { Muhurtham } from "./Muhurtham";
import { Address } from "./Address";
import { Title } from "./Title";

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
      {loading ? <div className="text-center text-xl"></div> :
        <>
          <Address props={groom ?? {}} />
          <p className="text-sm text-dark mb-4">{message}</p>
          <Title bride={bride?.name} groom={groom?.name} />
          <Address props={bride ?? {}} />
          <p className="text-normal my-2 text-dark">{date}</p>
          <Muhurtham data={muhurtham} />
          <p className="text-xs text-dark">At</p>
          <p className="text-sm text-dark">{venue}</p>
        </>
      }
    </div>
  );
}

