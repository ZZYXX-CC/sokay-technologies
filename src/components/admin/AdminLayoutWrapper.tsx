'use client';

import React, { Suspense } from 'react';
import AdminLayout from './AdminLayout';
import { Loader2 } from 'lucide-react';

interface AdminLayoutWrapperProps {
  children: React.ReactNode;
}

// Loading component
function AdminLoading() {
  return (
    <div className="flex h-screen w-full items-center justify-center bg-gray-100">
      <Loader2 className="h-8 w-8 animate-spin text-primary" />
    </div>
  );
}

// This component wraps AdminLayout in a Suspense boundary
export default function AdminLayoutWrapper({ children }: AdminLayoutWrapperProps) {
  return (
    <Suspense fallback={<AdminLoading />}>
      <AdminLayout>{children}</AdminLayout>
    </Suspense>
  );
}
