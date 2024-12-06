interface AddressProps {
  parents?: string;
  address?: string;
}

export function Address({ props }: { props: AddressProps }) {
   if (!props) return null; 
  return (
    <div className="flex flex-col items-center justify-center">
      <p className="text-sm text-dark">{props?.parents}</p>
      <p className="text-xs text-dark">{props?.address}</p>
    </div>
  );
}
