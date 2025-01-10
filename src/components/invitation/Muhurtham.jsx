export function Muhurtham({ data }) {
  return (
    <div className="flex flex-col items-center justify-center m-2">
      <p className="text-xs text-stone-900">Muhurtham</p>
      <p className="text-l font-medium text-stone-900">{data && <span>{data}</span>}</p>
    </div>
  );
}


