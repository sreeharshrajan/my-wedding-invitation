
export function Address({ props }) {
  if (!props) return null;
  return (
    <div className="flex flex-col items-center justify-center">
      <p className="text-sm text-stone-900">{props.parents}</p>
      <p className="text-xs text-stone-900">{props.address}</p>
    </div>
  );
}

