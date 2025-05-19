"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ShoppingBag } from 'lucide-react';
import { Button } from '@/components/ui/button';
// Commented out - using Zustand cart implementation instead
// import { useCart } from '@/context/CartContext';
import { useCartStore } from '@/lib/store/cart';
import { cn } from '@/lib/utils';
import { LoadingLink } from '@/components/ui/page-loader';
// Theme toggle removed
import MobileMenu from '@/components/ui/mobile-menu';

// We'll pass these menu items to the MobileMenu component
// The icons will be added inside the MobileMenu component
const menuItems = [
    { name: 'Home', href: '/' },
    { name: 'Store', href: '/store' },
    { name: 'About', href: '/about' },
    { name: 'Contact', href: '/contact' },
];

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  // Using Zustand cart implementation instead of context
  // const { state: cartState } = useCart();
  // const totalItems = cartState.items.reduce((total, item) => total + item.quantity, 0);
  const items = useCartStore(state => state.items);
  const totalItems = items.reduce((total, item) => total + item.quantity, 0);

  useEffect(() => {
    const handleScroll = () => {
        setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Logo component to reuse in both desktop and mobile views
  const Logo = () => (
    <LoadingLink
      href="/"
      aria-label="home"
      className="flex items-center space-x-2">
      <div className="relative w-12 h-12 flex items-center justify-center rounded-full bg-gray-200/20 dark:bg-gray-900/20">
        <div className="absolute inset-0 rounded-full bg-gradient-to-r from-gray-300/20 to-gray-400/20 dark:from-gray-700/20 dark:to-gray-900/20 blur-sm"></div>
        <div className="relative w-10 h-10 flex items-center justify-center">
          <Image
            src="/images/logo/Sokay-logo-1.svg"
            alt="Sokay Technologies"
            width={40}
            height={40}
            className="object-contain"
          />
        </div>
      </div>
    </LoadingLink>
  );

  return (
    <header>
      <nav className="fixed z-50 w-full px-2">
        <div className={cn('mx-auto mt-0 max-w-6xl px-6 transition-all duration-300 lg:px-12',
          isScrolled && 'bg-background/80 max-w-4xl rounded-2xl border border-gray-800 dark:border-gray-800 border-gray-200 backdrop-blur-lg lg:px-5')}>
          <div className="relative flex flex-wrap items-center justify-between gap-6 py-3 lg:gap-0 lg:py-4">
            {/* Logo - visible on all screen sizes */}
            <div className="flex w-full justify-between lg:w-auto">
              <Logo />

              {/* Mobile Menu */}
              <MobileMenu
                menuItems={menuItems}
                logo={<Logo />}
                isScrolled={isScrolled}
              />
            </div>

            {/* Desktop Navigation */}
            <div className="absolute inset-0 m-auto hidden size-fit lg:block">
              <ul className="flex gap-8 text-sm">
                {menuItems.map((item, index) => (
                  <li key={index}>
                    <LoadingLink
                      href={item.href}
                      className="text-gray-300 hover:text-white font-medium transition-colors py-2 px-3 rounded-lg hover:bg-gray-800/30 inline-block">
                      <span>{item.name}</span>
                    </LoadingLink>
                  </li>
                ))}
              </ul>
            </div>

            {/* Desktop Right Side Actions */}
            <div className="hidden lg:flex lg:w-fit lg:gap-6">
              <div className="flex items-center gap-3">
                <LoadingLink href="/cart" className={cn(
                  isScrolled ? 'hidden' : 'block',
                  'relative p-2 rounded-full bg-transparent hover:bg-gray-800/50 transition-colors'
                )}>
                  <ShoppingBag className="w-5 h-5 text-gray-300 dark:text-gray-200" strokeWidth={1.5} />
                  {totalItems > 0 && (
                    <span className="absolute -top-1 -right-1 flex items-center justify-center w-5 h-5 text-[10px] font-medium text-white bg-[#93b7be] rounded-full">
                      {totalItems}
                    </span>
                  )}
                </LoadingLink>
                {/* Theme toggle removed */}
                <Button
                  asChild
                  size="sm"
                  variant="link"
                  className={cn(
                    isScrolled ? 'inline-flex' : 'hidden',
                    'text-[#93b7be] hover:text-[#699ba5] font-medium border-0 shadow-none transition-colors px-6'
                  )}>
                  <LoadingLink href={totalItems > 0 ? "/cart" : "/store"}>
                    <span className="flex items-center gap-2">
                      <ShoppingBag size={16} />
                      {totalItems > 0 ? "Go to Cart" : "Shop Now"}
                    </span>
                  </LoadingLink>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}
