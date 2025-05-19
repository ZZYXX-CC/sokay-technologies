'use client';

import React, { Suspense } from 'react';
import MainLayout from './MainLayout';
import { Loader2 } from 'lucide-react';

interface MainLayoutWrapperProps {
  children: React.ReactNode;
}

// Loading component
function MainLoading() {
  return (
    <div className="flex h-screen w-full items-center justify-center">
      <Loader2 className="h-8 w-8 animate-spin text-primary" />
    </div>
  );
}

// This component wraps MainLayout in a Suspense boundary
export default function MainLayoutWrapper({ children }: MainLayoutWrapperProps) {
  return (
    <Suspense fallback={<MainLoading />}>
      <MainLayout>{children}</MainLayout>
    </Suspense>
  );
}
