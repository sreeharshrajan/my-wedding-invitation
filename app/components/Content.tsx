import { Muhurtham } from "./Muhurtham";
import { Address } from "./Address";
import { Title } from "./Title";

interface ContentProps {
  message?: string;
  date?: string;
  muhurtham?: string;
  venue?: string;
  bride?: {
    name?: string | undefined;
    parents?: string;
    address?: string;
  };
  groom?: {
    name?: string | undefined;
    parents?: string;
    address?: string;
  };
}

export function Content({
  props: {
    message,
    date,
    muhurtham,
    venue,
    bride,
    groom,
  },
}: {
  props: ContentProps;
}) {
  return (
    <div className="flex flex-col items-center justify-center z-10">
      <Address props={groom ?? {}} />
      <p className="text-sm text-dark mb-4">{message}</p>
      <Title bride={bride?.name} groom={groom?.name} />
      <Address props={bride ?? {}} />
      <p className="text-normal my-2 text-dark">{date}</p>
      <Muhurtham data={muhurtham} />
      <p className="text-xs text-dark">At</p>
      <p className="text-sm text-dark">{venue}</p>
    </div>
  );
}

