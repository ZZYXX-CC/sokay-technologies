'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import MainLayout from '@/components/layout/MainLayout';
import { useCartStore } from '@/lib/store/cart';

export default function SuccessPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [orderRef, setOrderRef] = useState<string | null>(null);
  const items = useCartStore(state => state.items);
  const itemCount = useCartStore(state => state.totalItems());

  // Get the order reference from URL
  useEffect(() => {
    const ref = searchParams?.get('ref');
    if (ref) {
      setOrderRef(ref);
    }
  }, [searchParams]);

  // Redirect to home if accessed directly without checkout
  useEffect(() => {
    // If there's no reference and the cart is not empty, this page was likely accessed incorrectly
    if (!orderRef && itemCount > 0) {
      router.push('/checkout');
    }
    // If there's no reference and cart is empty, something went wrong
    else if (!orderRef && itemCount === 0) {
      // Give them 5 seconds to see the page before redirecting
      const timer = setTimeout(() => {
        router.push('/');
      }, 5000);
      
      return () => clearTimeout(timer);
    }
  }, [orderRef, itemCount, router]);

  return (
    <MainLayout>
      <div className="container px-4 py-16 mx-auto">
        <div className="max-w-md mx-auto text-center">
          <div className="flex justify-center mb-6">
            <div className="rounded-full bg-green-100 p-3">
              <CheckCircle className="h-12 w-12 text-green-600" />
            </div>
          </div>

          <h1 className="text-3xl font-bold mb-4">Order Successful!</h1>

          <p className="text-gray-600 mb-4">
            Thank you for your purchase. Your order has been received and is being processed.
            You will receive an email confirmation shortly.
          </p>
          
          {orderRef && (
            <div className="mb-8 p-4 bg-blue-50 rounded-lg border border-blue-100">
              <p className="font-medium text-blue-800">
                Order Reference: <span className="font-bold">{orderRef}</span>
              </p>
              <p className="text-sm text-blue-600 mt-1">
                Please save this reference for future inquiries
              </p>
            </div>
          )}

          <div className="space-y-4">
            <Button asChild size="lg" className="w-full">
              <Link href="/store">Continue Shopping</Link>
            </Button>

            <Button asChild variant="outline" className="w-full">
              <Link href="/">Return to Home</Link>
            </Button>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
