'use client';

export const dynamic = "force-dynamic";

import React, { Suspense } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Toaster } from '@/components/ui/sonner';
import ShoppingCart from '@/components/store/ShoppingCart';

// Use a simple anchor tag instead of next/link to avoid client-side navigation
function SimpleLink({ href, children, className }: { href: string, children: React.ReactNode, className?: string }) {
  return (
    <a href={href} className={className}>
      {children}
    </a>
  );
}

function CartLoading() {
  return <div className="animate-pulse bg-prussian_blue/90 h-80 rounded-lg"></div>;
}

// Navigation buttons component
function NavigationButtons() {
  return (
    <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
      <Button asChild variant="outline" className="border-light_blue-300/60 bg-light_blue-900/90 hover:bg-light_blue-800/90 transition-colors w-full sm:w-auto">
        <SimpleLink href="/store" className="flex items-center justify-center text-white font-medium">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Continue Shopping
        </SimpleLink>
      </Button>

      <Button asChild size="lg" className="bg-light_blue-500 hover:bg-light_blue-400 text-prussian_blue font-semibold border border-light_blue-200/50 w-full sm:w-auto">
        <SimpleLink href="/checkout">Proceed to Checkout</SimpleLink>
      </Button>
    </div>
  );
}

// Cart content component
function CartPageContent() {
  return (
    <div className="container px-4 pt-16 pb-24 md:pt-20 md:pb-32 mx-auto">
      <div className="bg-prussian_blue/90 rounded-lg shadow-lg p-8 border border-light_blue-500/30">
        <div className="mb-8">
          <Suspense fallback={<CartLoading />}>
            <ShoppingCart />
          </Suspense>
        </div>

        <NavigationButtons />
      </div>
    </div>
  );
}

export default function CartPage() {
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
        <Suspense fallback={
          <div className="container px-4 pt-16 pb-24 md:pt-20 md:pb-32 mx-auto">
            <div className="animate-pulse bg-prussian_blue/90 h-80 rounded-lg shadow-lg"></div>
          </div>
        }>
          <CartPageContent />
        </Suspense>
      </main>
      <Footer />
      <Toaster position="top-right" />
    </div>
  );
}