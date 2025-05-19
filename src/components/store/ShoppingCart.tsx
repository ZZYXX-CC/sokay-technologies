'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Trash2, Plus, Minus, ArrowLeft, ShoppingBag } from 'lucide-react';
import { useCartStore } from '@/lib/store/cart';

export default function ShoppingCart() {
  const items = useCartStore(state => state.items);
  const removeItem = useCartStore(state => state.removeItem);
  const updateQuantity = useCartStore(state => state.updateQuantity);
  const totalPrice = useCartStore(state => state.totalPrice);

  // Track local input values to avoid input field reset on every keystroke
  const [inputValues, setInputValues] = useState<Record<string, string>>({});

  // Handle manual quantity input
  const handleQuantityChange = (id: string, value: string) => {
    setInputValues({ ...inputValues, [id]: value });
    
    // Only update the cart if the value is a valid number
    const numValue = parseInt(value);
    if (!isNaN(numValue) && numValue > 0) {
      updateQuantity(id, numValue);
    }
  };

  // Handle blur to correct invalid inputs
  const handleBlur = (id: string, currentQuantity: number) => {
    const value = inputValues[id];
    const numValue = parseInt(value);
    
    // Reset to current quantity if invalid
    if (isNaN(numValue) || numValue <= 0) {
      setInputValues({ ...inputValues, [id]: currentQuantity.toString() });
    }
  };

  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 bg-prussian_blue/90 rounded-lg shadow-lg p-8 border border-light_blue-500/30">
        <div className="bg-light_blue-900/90 p-6 rounded-full mb-4 border border-light_blue-500/30">
          <ShoppingBag className="h-12 w-12 text-white" />
        </div>
        <h2 className="text-2xl font-semibold mb-2 text-white">Your cart is empty</h2>
        <p className="text-white mb-6">Looks like you haven't added any products to your cart yet.</p>
        <Button asChild className="bg-light_blue-500 hover:bg-light_blue-400 text-prussian_blue font-semibold border border-light_blue-200/50">
          <Link href="/store">Continue Shopping</Link>
        </Button>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-2xl font-bold mb-4 text-white">Shopping Cart</h2>
        <p className="text-white">{items.length} {items.length === 1 ? 'item' : 'items'} in your cart</p>
      </div>

      <div className="rounded-lg overflow-hidden mb-6 bg-prussian_blue/90 shadow-lg border border-light_blue-500/30">
        <div className="hidden md:grid grid-cols-12 gap-4 p-4 bg-light_blue-900/90 border-b border-light_blue-300/40">
          <div className="col-span-6">
            <span className="font-medium text-white text-lg">Product</span>
          </div>
          <div className="col-span-2 text-center">
            <span className="font-medium text-white text-lg">Price</span>
          </div>
          <div className="col-span-2 text-center">
            <span className="font-medium text-white text-lg">Quantity</span>
          </div>
          <div className="col-span-2 text-right">
            <span className="font-medium text-white text-lg">Subtotal</span>
          </div>
        </div>

        <div className="divide-y divide-light_blue-300/40">
          {items.map((item) => (
            <div key={item.id} className="grid grid-cols-1 md:grid-cols-12 gap-4 p-4 items-center">
              {/* Product - Mobile view will be stacked */}
              <div className="col-span-6 flex items-center space-x-4">
                <div className="relative h-20 w-20 bg-light_blue-500/40 rounded flex-shrink-0">
                  {/* Placeholder for product image */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-white font-bold text-lg">{item.name.charAt(0)}</span>
                  </div>
                </div>
                <div className="flex-grow min-w-0">
                  <h3 className="font-semibold text-white text-lg truncate">{item.name}</h3>
                  <button
                    onClick={() => removeItem(item.id)}
                    className="text-red-300 text-sm flex items-center mt-1 hover:text-red-400 transition-colors font-medium"
                  >
                    <Trash2 className="h-3 w-3 mr-1" />
                    Remove
                  </button>
                </div>
              </div>

              {/* Mobile layout for Price, Quantity, and Subtotal */}
              <div className="md:hidden grid grid-cols-3 gap-2 w-full items-center">
                <div className="text-left">
                  <div className="text-white text-sm mb-1">Price</div>
                  <div className="text-white font-medium">₦{item.price.toLocaleString()}</div>
                </div>
                
                <div className="text-center">
                  <div className="text-white text-sm mb-1">Quantity</div>
                  <div className="flex items-center justify-center">
                    <button
                      onClick={() => {
                        const newQuantity = item.quantity - 1;
                        updateQuantity(item.id, newQuantity);
                        setInputValues({ ...inputValues, [item.id]: newQuantity.toString() });
                      }}
                      disabled={item.quantity <= 1}
                      className="h-8 w-8 flex items-center justify-center rounded-l border border-light_blue-300/60 bg-light_blue-900/80 disabled:opacity-50 hover:bg-light_blue-800/90 transition-colors"
                    >
                      <Minus className="h-3 w-3 text-white" />
                    </button>
                    
                    <Input
                      type="text"
                      value={inputValues[item.id] !== undefined ? inputValues[item.id] : item.quantity}
                      onChange={(e) => handleQuantityChange(item.id, e.target.value)}
                      onBlur={() => handleBlur(item.id, item.quantity)}
                      className="w-10 text-center h-8 px-0 py-0 bg-light_blue-900/80 text-white border-y border-light_blue-300/60 rounded-none focus:border-light_blue-300/80 font-bold"
                      aria-label="Quantity"
                    />
                    
                    <button
                      onClick={() => {
                        const newQuantity = item.quantity + 1;
                        updateQuantity(item.id, newQuantity);
                        setInputValues({ ...inputValues, [item.id]: newQuantity.toString() });
                      }}
                      className="h-8 w-8 flex items-center justify-center rounded-r border border-light_blue-300/60 bg-light_blue-900/80 hover:bg-light_blue-800/90 transition-colors"
                    >
                      <Plus className="h-3 w-3 text-white" />
                    </button>
                  </div>
                </div>
                
                <div className="text-right">
                  <div className="text-white text-sm mb-1">Subtotal</div>
                  <div className="text-white font-medium">₦{(item.price * item.quantity).toLocaleString()}</div>
                </div>
              </div>

              {/* Desktop layout */}
              {/* Price - desktop only */}
              <div className="col-span-2 text-center hidden md:block">
                <span className="text-white font-medium text-lg">₦{item.price.toLocaleString()}</span>
              </div>

              {/* Quantity - desktop only */}
              <div className="col-span-2 hidden md:block">
                <div className="flex items-center justify-center">
                  <button
                    onClick={() => {
                      const newQuantity = item.quantity - 1;
                      updateQuantity(item.id, newQuantity);
                      setInputValues({ ...inputValues, [item.id]: newQuantity.toString() });
                    }}
                    disabled={item.quantity <= 1}
                    className="h-8 w-8 flex items-center justify-center rounded-l border border-light_blue-300/60 bg-light_blue-900/80 disabled:opacity-50 hover:bg-light_blue-800/90 transition-colors"
                  >
                    <Minus className="h-3 w-3 text-white" />
                  </button>
                  
                  <Input
                    type="text"
                    value={inputValues[item.id] !== undefined ? inputValues[item.id] : item.quantity}
                    onChange={(e) => handleQuantityChange(item.id, e.target.value)}
                    onBlur={() => handleBlur(item.id, item.quantity)}
                    className="w-10 text-center h-8 px-0 py-0 bg-light_blue-900/80 text-white border-y border-light_blue-300/60 rounded-none focus:border-light_blue-300/80 font-bold"
                    aria-label="Quantity"
                  />
                  
                  <button
                    onClick={() => {
                      const newQuantity = item.quantity + 1;
                      updateQuantity(item.id, newQuantity);
                      setInputValues({ ...inputValues, [item.id]: newQuantity.toString() });
                    }}
                    className="h-8 w-8 flex items-center justify-center rounded-r border border-light_blue-300/60 bg-light_blue-900/80 hover:bg-light_blue-800/90 transition-colors"
                  >
                    <Plus className="h-3 w-3 text-white" />
                  </button>
                </div>
              </div>

              {/* Subtotal - desktop only */}
              <div className="col-span-2 text-right hidden md:block">
                <span className="font-semibold text-white text-lg">₦{(item.price * item.quantity).toLocaleString()}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-light_blue-900/90 p-4 rounded-lg w-full md:w-auto md:ml-auto border border-light_blue-500/40 shadow-lg">
        <div className="flex justify-between items-center mb-2">
          <span className="text-white font-medium">Subtotal:</span>
          <span className="font-medium text-white text-lg">₦{totalPrice().toLocaleString()}</span>
        </div>
        <div className="flex justify-between items-center mb-2">
          <span className="text-white font-medium">Shipping:</span>
          <span className="font-medium text-white text-lg">Calculated at checkout</span>
        </div>
        <div className="border-t border-light_blue-300/40 pt-2 mt-2">
          <div className="flex justify-between items-center">
            <span className="font-medium text-white text-lg">Total:</span>
            <span className="text-xl font-bold text-white">₦{totalPrice().toLocaleString()}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
