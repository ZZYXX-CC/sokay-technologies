'use client';

import React from 'react';
import MainLayout from '@/components/layout/MainLayout';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { CheckCircle2 } from 'lucide-react';
import { useCartStore } from '@/lib/store/cart';
import StoreHero from '@/components/store/StoreHero';

export default function OrderConfirmationPage() {
  const items = useCartStore(state => state.items);
  const totalPrice = useCartStore(state => state.totalPrice);

  return (
    <MainLayout>
      <StoreHero>
        <div className="max-w-xl mx-auto mb-12 px-4 flex flex-col items-center animate-fade-in-up">
          <CheckCircle2 className="w-20 h-20 text-green-500 mb-6" />
          <h1 className="text-3xl font-bold mb-4 text-center text-shadow-sm">Thank you for your order!</h1>
        <p className="text-lg text-muted-foreground mb-8 text-center">
          Your order has been received and is being processed.<br />
          You will receive a confirmation email soon.
        </p>
        {/* Order Summary */}
        <div className="w-full bg-card/80 backdrop-blur-sm rounded-xl shadow p-4 mb-8">
          <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
          {items.length === 0 ? (
            <div className="text-muted-foreground text-center">No items in your order.</div>
          ) : (
            <ul className="divide-y">
              {items.map(item => (
                <li key={item.id} className="flex justify-between items-center py-2">
                  <span className="font-medium">{item.name} <span className="text-xs text-muted-foreground">x{item.quantity}</span></span>
                  <span className="font-semibold">₦{(item.price * item.quantity).toLocaleString()}</span>
                </li>
              ))}
            </ul>
          )}
          <div className="flex justify-between items-center mt-4 border-t pt-2">
            <span className="font-semibold">Total:</span>
            <span className="text-lg font-bold text-primary">₦{totalPrice().toLocaleString()}</span>
          </div>
        </div>
        <Button asChild size="lg" className="px-8">
          <Link href="/store">Back to Store</Link>
        </Button>
        </div>
      </StoreHero>
    </MainLayout>
  );
}