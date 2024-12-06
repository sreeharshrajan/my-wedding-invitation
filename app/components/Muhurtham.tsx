export function Muhurtham({ data }: { data: string }) {
  return (
    <div className="flex flex-col items-center justify-center m-2 ">
      <p className="text-xs text-dark">Muhurtham</p>
      <p className="text-l font-medium text-dark">{data}</p>
    </div>
  );
}