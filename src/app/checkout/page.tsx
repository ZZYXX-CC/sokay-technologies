'use client';

import React from 'react';
import Link from 'next/link';
import MainLayout from '@/components/layout/MainLayout';
import CheckoutForm from '@/components/store/CheckoutForm';
import { Button } from '@/components/ui/button';
import { ArrowLeft, ShoppingBag } from 'lucide-react';
import { useCartStore } from '@/lib/store/cart';

export default function CheckoutPage() {
  const items = useCartStore(state => state.items);
  const totalPrice = useCartStore(state => state.totalPrice);

  return (
    <MainLayout>
      <div className="container px-4 pt-16 pb-24 md:pt-20 md:pb-32 mx-auto">
        <div className="bg-prussian_blue/90 rounded-lg shadow-lg p-8 border border-light_blue-500/30">
          <h1 className="text-3xl font-bold mb-8 text-white">Checkout</h1>

          {items.length === 0 ? (
            <div className="text-center py-12 bg-prussian_blue/90 rounded-lg shadow-lg p-8 border border-light_blue-500/30">
              <div className="bg-light_blue-900/90 p-6 rounded-full mb-6 w-24 h-24 flex items-center justify-center mx-auto border border-light_blue-500/30">
                <ShoppingBag className="h-12 w-12 text-white" />
              </div>
              <p className="text-lg mb-6 text-white font-medium">Your cart is empty. Add some products to proceed with checkout.</p>
              <Button asChild className="bg-light_blue-500 hover:bg-light_blue-400 text-prussian_blue border border-light_blue-300/40 font-bold">
                <Link href="/store">Browse Products</Link>
              </Button>
            </div>
          ) : (
            <>
              <div className="mb-6">
                <div className="flex gap-4">
                  <Button asChild variant="outline" className="mb-4 border-light_blue-300/60 bg-light_blue-900/90 hover:bg-light_blue-800/90 transition-colors">
                    <Link href="/cart" className="flex items-center text-white font-medium">
                      <ArrowLeft className="h-4 w-4 mr-2" />
                      Back to Cart
                    </Link>
                  </Button>
                  
                  <Button asChild variant="outline" className="mb-4 border-light_blue-300/60 bg-light_blue-900/90 hover:bg-light_blue-800/90 transition-colors">
                    <Link href="/store" className="flex items-center text-white font-medium">
                      <ArrowLeft className="h-4 w-4 mr-2" />
                      Continue Shopping
                    </Link>
                  </Button>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Order Summary */}
                <div className="lg:col-span-1">
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
                </div>

                {/* Checkout Form */}
                <div className="lg:col-span-2">
                  <div className="bg-prussian_blue/90 p-6 rounded-lg border border-light_blue-500/40 shadow-lg">
                    <CheckoutForm />
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </MainLayout>
  );
}
