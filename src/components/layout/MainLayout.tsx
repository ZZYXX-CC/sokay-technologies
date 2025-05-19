"use client";

import React from 'react';
import dynamic from 'next/dynamic';
import Header from './Header';
import Footer from './Footer';
import { Toaster } from '@/components/ui/sonner';

// Dynamically import the performance monitor to avoid affecting production performance
const PerformanceMonitor = dynamic(
  () => import('@/components/ui/performance-monitor').then(mod => ({ default: mod.PerformanceMonitor })),
  { ssr: false }
);

interface MainLayoutProps {
  children: React.ReactNode;
}

export default function MainLayout({ children }: MainLayoutProps) {
  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground m-0 p-0" 
         style={{ 
           backgroundImage: 'url(/images/gradient-bg.jpg)',
           backgroundSize: 'cover',
           backgroundPosition: 'center',
           backgroundAttachment: 'fixed'
         }}>
      <Header />
      <main className="flex-grow">{children}</main>
      <Footer />
      <Toaster position="top-right" />
      {/* Performance monitor only loads in development */}
      {process.env.NODE_ENV === 'development' && <PerformanceMonitor />}
    </div>
  );
}
