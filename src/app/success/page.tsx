'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import MainLayout from '@/components/layout/MainLayout';
import { useCartStore } from '@/lib/store/cart';

export default function SuccessPage() {
  const router = useRouter();
  const items = useCartStore(state => state.items);

  // Redirect to home if accessed directly without checkout
  useEffect(() => {
    if (items.length > 0) {
      router.push('/checkout');
    }
  }, [items, router]);

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

          <p className="text-gray-600 mb-8">
            Thank you for your purchase. Your order has been received and is being processed.
            You will receive an email confirmation shortly.
          </p>

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
