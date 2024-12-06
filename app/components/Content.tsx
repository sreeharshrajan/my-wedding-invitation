import { Muhurtham } from "./Muhurtham";
import { Address } from "./Address";
import { Title } from "./Title";

export function Content({ props }: { props: object }) {
  return (
    <div className="flex flex-col items-center justify-center z-10">
      <Address props={props.groom} />
      <p className="text-sm text-dark mb-4">{props.message}</p>
      <Title bride={props.bride?.name} groom={props.groom?.name} />
      <Address props={props.bride} />
      <p className="text-normal my-2 text-dark">{props.date}</p>
      <Muhurtham data={props.muhurtham} />
      <p className="text-xs text-dark">At</p>
      <p className="text-sm text-dark">{props.venue}</p>
    </div>
  );
}