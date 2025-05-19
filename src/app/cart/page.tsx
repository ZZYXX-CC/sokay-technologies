'use client';

import React, { Suspense } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import MainLayout from '@/components/layout/MainLayout';
import ShoppingCart from '@/components/store/ShoppingCart';

function CartLoading() {
  return <div className="animate-pulse bg-prussian_blue/90 h-80 rounded-lg"></div>;
}

export default function CartPage() {
  return (
    <MainLayout>
      <div className="container px-4 pt-16 pb-24 md:pt-20 md:pb-32 mx-auto">
        <div className="bg-prussian_blue/90 rounded-lg shadow-lg p-8 border border-light_blue-500/30">
          <div className="mb-8">
            <Suspense fallback={<CartLoading />}>
              <ShoppingCart />
            </Suspense>
          </div>
          
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <Button asChild variant="outline" className="border-light_blue-300/60 bg-light_blue-900/90 hover:bg-light_blue-800/90 transition-colors w-full sm:w-auto">
              <Link href="/store" className="flex items-center justify-center text-white font-medium">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Continue Shopping
              </Link>
            </Button>
            
            <Button asChild size="lg" className="bg-light_blue-500 hover:bg-light_blue-400 text-prussian_blue font-semibold border border-light_blue-200/50 w-full sm:w-auto">
              <Link href="/checkout">Proceed to Checkout</Link>
            </Button>
          </div>
        </div>
      </div>
    </MainLayout>
  );
} 