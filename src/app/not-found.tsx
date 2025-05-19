'use client';

import React, { Suspense } from 'react';
import { Button } from '@/components/ui/button';
import { Home, Loader2 } from 'lucide-react';
import { PageLoader } from '@/components/ui/page-loader';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Toaster } from '@/components/ui/sonner';

// Simple anchor tag component to avoid client-side navigation
function SimpleLink({ href, children, className }: { href: string, children: React.ReactNode, className?: string }) {
  return (
    <a href={href} className={className}>
      {children}
    </a>
  );
}

// Loading component for content
function LoadingFallback() {
  return (
    <div className="flex h-[30vh] w-full items-center justify-center">
      <Loader2 className="h-8 w-8 animate-spin text-primary" />
    </div>
  );
}

// Page loading component
function PageLoadingFallback() {
  return (
    <div className="flex h-screen w-full items-center justify-center">
      <PageLoader size={40} />
    </div>
  );
}

// Content component
function NotFoundContent() {
  return (
    <div className="flex flex-col items-center justify-center text-center">
      <h1 className="text-5xl md:text-6xl font-bold text-light_blue-500 mb-4">404</h1>
      <h2 className="text-2xl md:text-3xl font-semibold text-white mb-4">Page Not Found</h2>
      <p className="text-lg text-white mb-8 max-w-md">
        The page you are looking for might have been removed or is temporarily unavailable.
      </p>
      <Button asChild size="lg" className="bg-light_blue-500 hover:bg-light_blue-400 text-prussian_blue font-semibold border border-light_blue-200/50">
        <SimpleLink href="/" className="flex items-center">
          <Home className="mr-2 h-5 w-5" />
          Go to Homepage
        </SimpleLink>
      </Button>
    </div>
  );
}

// Main component with layout
function NotFoundPage() {
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
        <div className="container px-4 py-32 mx-auto">
          <div className="bg-prussian_blue/90 rounded-lg shadow-lg p-12 border border-light_blue-500/30">
            <Suspense fallback={<LoadingFallback />}>
              <NotFoundContent />
            </Suspense>
          </div>
        </div>
      </main>
      <Footer />
      <Toaster position="top-right" />
    </div>
  );
}

// Export with top-level Suspense boundary
export default function NotFound() {
  return (
    <Suspense fallback={<PageLoadingFallback />}>
      <NotFoundPage />
    </Suspense>
  );
}