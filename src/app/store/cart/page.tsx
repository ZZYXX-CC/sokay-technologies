'use client';

import React from 'react';
import { useCartStore } from '@/lib/store/cart';
import MainLayout from '@/components/layout/MainLayout';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Trash2, Plus, Minus } from 'lucide-react';
import StoreHero from '@/components/store/StoreHero';

export default function StoreCartPage() {
  const items = useCartStore(state => state.items);
  const removeItem = useCartStore(state => state.removeItem);
  const updateQuantity = useCartStore(state => state.updateQuantity);
  const totalPrice = useCartStore(state => state.totalPrice);

  return (
    <MainLayout>
      <StoreHero>
        <div className="max-w-2xl mx-auto mb-12 px-4 animate-fade-in-up">
        {items.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16">
            <span className="text-2xl text-muted-foreground mb-4">Your cart is empty.</span>
            <Button asChild>
              <Link href="/store">Continue Shopping</Link>
            </Button>
          </div>
        ) : (
          <>
            <div className="rounded-2xl shadow-lg bg-card p-4 mb-6 divide-y">
              {items.map(item => (
                <div key={item.id} className="flex items-center gap-4 py-4">
                  <div className="w-16 h-16 bg-muted rounded-xl flex items-center justify-center overflow-hidden">
                    <img src={item.image} alt={item.name} className="object-contain w-full h-full" />
                  </div>
                  <div className="flex-1">
                    <div className="font-semibold text-lg">{item.name}</div>
                    <div className="text-muted-foreground text-sm">₦{item.price.toLocaleString()}</div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button onClick={() => updateQuantity(item.id, item.quantity - 1)} disabled={item.quantity <= 1} className="p-1 rounded border bg-background disabled:opacity-50"><Minus className="w-4 h-4" /></button>
                    <span className="w-8 text-center">{item.quantity}</span>
                    <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="p-1 rounded border bg-background"><Plus className="w-4 h-4" /></button>
                  </div>
                  <div className="w-20 text-right font-semibold">₦{(item.price * item.quantity).toLocaleString()}</div>
                  <button onClick={() => removeItem(item.id)} className="ml-2 text-red-500 hover:text-red-700"><Trash2 className="w-4 h-4" /></button>
                </div>
              ))}
            </div>
            <div className="flex flex-col items-end mb-6">
              <div className="text-lg font-semibold mb-2">Subtotal: <span className="text-primary">₦{totalPrice().toLocaleString()}</span></div>
              <div className="text-sm text-muted-foreground mb-2">Shipping calculated at checkout</div>
              <Button asChild size="lg" className="px-8 mt-2">
                <Link href="/checkout">Proceed to Checkout</Link>
              </Button>
            </div>
          </>
        )}
        </div>
      </StoreHero>
    </MainLayout>
  );
}