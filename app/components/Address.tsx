export function Address({ props }: { props: any }) {
  return (
    <div className="flex flex-col items-center justify-center">
      <p className="text-normal text-dark">{props?.parents}</p>
      <p className="text-sm text-dark">{props?.address}</p>
    </div>
  );
}