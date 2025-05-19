'use client';

import React from 'react';
import { ShoppingCart } from 'lucide-react';
import { useCartStore } from '@/lib/store/cart';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';

export default function FloatingCart() {
  const cart = useCartStore(state => state.items);
  const pathname = usePathname();
  
  // Calculate total quantity of items in cart
  const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
  
  // Don't show on checkout page or when cart is empty
  if (pathname.includes('/checkout') || pathname.includes('/cart') || totalItems === 0) {
    return null;
  }

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 20 }}
        className="fixed bottom-6 right-6 z-50"
      >
        <Link
          href="/cart"
          className="flex items-center justify-center bg-light_blue-500 text-prussian_blue h-14 w-14 rounded-full shadow-lg hover:bg-light_blue-400 transition-colors duration-300"
          aria-label="Go to shopping cart"
        >
          <div className="relative">
            <ShoppingCart className="h-6 w-6" />
            {totalItems > 0 && (
              <span className="absolute -top-2 -right-2 w-5 h-5 bg-prussian_blue text-isabelline text-xs flex items-center justify-center rounded-full">
                {totalItems > 99 ? '99+' : totalItems}
              </span>
            )}
          </div>
        </Link>
      </motion.div>
    </AnimatePresence>
  );
} 