'use client';

export const dynamic = "force-dynamic";

import React, { Suspense } from 'react';
import CheckoutForm from '@/components/store/CheckoutForm';
import { Button } from '@/components/ui/button';
import { ArrowLeft, ShoppingBag } from 'lucide-react';
import { useCartStore } from '@/lib/store/cart';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Toaster } from '@/components/ui/sonner';

// Use a simple anchor tag instead of next/link to avoid client-side navigation
// that would trigger useSearchParams
function SimpleLink({ href, children, className }: { href: string, children: React.ReactNode, className?: string }) {
  return (
    <a href={href} className={className}>
      {children}
    </a>
  );
}

// Loading fallback
function CheckoutLoading() {
  return (
    <div className="container px-4 pt-16 pb-24 md:pt-20 md:pb-32 mx-auto">
      <div className="bg-prussian_blue/90 rounded-lg shadow-lg p-8 border border-light_blue-500/30">
        <h1 className="text-3xl font-bold mb-8 text-white">Checkout</h1>
        <div className="animate-pulse">
          <div className="h-8 bg-light_blue-900/60 rounded mb-4"></div>
          <div className="h-64 bg-light_blue-900/60 rounded"></div>
        </div>
      </div>
    </div>
  );
}

// Cart summary component
function CartSummary() {
  const items = useCartStore(state => state.items);
  const totalPrice = useCartStore(state => state.totalPrice);

  return (
    <div className="bg-prussian_blue/90 p-6 rounded-lg border border-light_blue-500/40 shadow-lg">
      <h2 className="text-xl font-bold mb-4 text-white">Order Summary</h2>

      <div className="space-y-4 mb-4">
        {items.map((item) => (
          <div key={item.id} className="flex justify-between">
            <div>
              <span className="font-medium text-white">{item.name}</span>
              <span className="text-white ml-2">x{item.quantity}</span>
            </div>
            <span className="text-white font-medium">₦{(item.price * item.quantity).toLocaleString()}</span>
          </div>
        ))}
      </div>

      <div className="border-t border-light_blue-300/40 pt-4 mt-4">
        <div className="flex justify-between mb-2">
          <span className="text-white font-medium">Subtotal</span>
          <span className="text-white font-medium">₦{totalPrice().toLocaleString()}</span>
        </div>
        <div className="flex justify-between mb-2">
          <span className="text-white font-medium">Shipping</span>
          <span className="text-white font-medium">Calculated at next step</span>
        </div>
        <div className="flex justify-between font-bold text-lg mt-4">
          <span className="text-white">Total</span>
          <span className="text-white">₦{totalPrice().toLocaleString()}</span>
        </div>
      </div>
    </div>
  );
}

// Empty cart component
function EmptyCart() {
  return (
    <div className="text-center py-12 bg-prussian_blue/90 rounded-lg shadow-lg p-8 border border-light_blue-500/30">
      <div className="bg-light_blue-900/90 p-6 rounded-full mb-6 w-24 h-24 flex items-center justify-center mx-auto border border-light_blue-500/30">
        <ShoppingBag className="h-12 w-12 text-white" />
      </div>
      <p className="text-lg mb-6 text-white font-medium">Your cart is empty. Add some products to proceed with checkout.</p>
      <Button asChild className="bg-light_blue-500 hover:bg-light_blue-400 text-prussian_blue border border-light_blue-300/40 font-bold">
        <SimpleLink href="/store">Browse Products</SimpleLink>
      </Button>
    </div>
  );
}

// Checkout content component
function CheckoutContent() {
  const items = useCartStore(state => state.items);

  return (
    <div className="container px-4 pt-16 pb-24 md:pt-20 md:pb-32 mx-auto">
      <div className="bg-prussian_blue/90 rounded-lg shadow-lg p-8 border border-light_blue-500/30">
        <h1 className="text-3xl font-bold mb-8 text-white">Checkout</h1>

        {items.length === 0 ? (
          <EmptyCart />
        ) : (
          <>
            <div className="mb-6">
              <div className="flex gap-4">
                <Button asChild variant="outline" className="mb-4 border-light_blue-300/60 bg-light_blue-900/90 hover:bg-light_blue-800/90 transition-colors">
                  <SimpleLink href="/cart" className="flex items-center text-white font-medium">
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Back to Cart
                  </SimpleLink>
                </Button>

                <Button asChild variant="outline" className="mb-4 border-light_blue-300/60 bg-light_blue-900/90 hover:bg-light_blue-800/90 transition-colors">
                  <SimpleLink href="/store" className="flex items-center text-white font-medium">
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Continue Shopping
                  </SimpleLink>
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Order Summary */}
              <div className="lg:col-span-1">
                <Suspense fallback={<div className="animate-pulse h-48 bg-light_blue-900/60 rounded"></div>}>
                  <CartSummary />
                </Suspense>
              </div>

              {/* Checkout Form */}
              <div className="lg:col-span-2">
                <div className="bg-prussian_blue/90 p-6 rounded-lg border border-light_blue-500/40 shadow-lg">
                  <Suspense fallback={<div className="animate-pulse h-96 bg-light_blue-900/60 rounded"></div>}>
                    <CheckoutForm />
                  </Suspense>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default function CheckoutPage() {
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
        <Suspense fallback={<CheckoutLoading />}>
          <CheckoutContent />
        </Suspense>
      </main>
      <Footer />
      <Toaster position="top-right" />
    </div>
  );
}
