'use client';

import React, { Suspense } from 'react';
import { PageLoader } from '@/components/ui/page-loader';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Toaster } from '@/components/ui/sonner';
import SuccessContent from '@/components/store/SuccessContent';

// Loading component
function SuccessLoading() {
  return (
    <div className="container px-4 py-16 mx-auto flex items-center justify-center h-[50vh]">
      <PageLoader size={40} />
    </div>
  );
}

export default function SuccessPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground m-0 p-0"
         style={{
           backgroundImage: 'url(/images/gradient-bg.jpg)',
           backgroundSize: 'cover',
           backgroundPosition: 'center',
           backgroundAttachment: 'fixed'
         }}>
      <Header />
      <main className="flex-grow">
        <Suspense fallback={<SuccessLoading />}>
          <SuccessContent />
        </Suspense>
      </main>
      <Footer />
      <Toaster position="top-right" />
    </div>
  );
}
