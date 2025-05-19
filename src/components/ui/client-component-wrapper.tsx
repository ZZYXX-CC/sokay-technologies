'use client';

import React, { Suspense, ReactNode } from 'react';
import { Loader2 } from 'lucide-react';
import { PageLoader } from './page-loader';

interface ClientComponentWrapperProps {
  children: ReactNode;
  fallback?: ReactNode;
}

/**
 * A wrapper component that ensures client components using hooks like useSearchParams
 * are properly wrapped in a Suspense boundary.
 * 
 * This component should be used at the top level of any page that uses client-side
 * navigation hooks like useSearchParams, usePathname, etc.
 */
export function ClientComponentWrapper({ 
  children, 
  fallback 
}: ClientComponentWrapperProps) {
  const defaultFallback = (
    <div className="flex h-screen w-full items-center justify-center">
      <PageLoader size={40} />
    </div>
  );

  return (
    <Suspense fallback={fallback || defaultFallback}>
      {children}
    </Suspense>
  );
}
