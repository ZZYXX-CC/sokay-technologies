'use client';

import React, { Suspense } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Home } from 'lucide-react';
import MainLayout from '@/components/layout/MainLayout';

function NotFoundContent() {
  return (
    <div className="flex flex-col items-center justify-center text-center">
      <h1 className="text-5xl md:text-6xl font-bold text-light_blue-500 mb-4">404</h1>
      <h2 className="text-2xl md:text-3xl font-semibold text-white mb-4">Page Not Found</h2>
      <p className="text-lg text-white mb-8 max-w-md">
        The page you are looking for might have been removed or is temporarily unavailable.
      </p>
      <Button asChild size="lg" className="bg-light_blue-500 hover:bg-light_blue-400 text-prussian_blue font-semibold border border-light_blue-200/50">
        <Link href="/" className="flex items-center">
          <Home className="mr-2 h-5 w-5" /> 
          Go to Homepage
        </Link>
      </Button>
    </div>
  );
}

export default function NotFound() {
  return (
    <MainLayout>
      <div className="container px-4 py-32 mx-auto">
        <div className="bg-prussian_blue/90 rounded-lg shadow-lg p-12 border border-light_blue-500/30">
          <Suspense fallback={<div className="animate-pulse h-60 bg-prussian_blue/70 rounded-lg"></div>}>
            <NotFoundContent />
          </Suspense>
        </div>
      </div>
    </MainLayout>
  );
} 