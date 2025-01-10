'use client';
import { useEffect, useState } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import Loader from '@/components/ui/Loader';


export function NavigationLoader() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, [pathname, searchParams]);

  if (!isLoading) return null;

  return <Loader />;
}