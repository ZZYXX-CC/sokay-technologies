"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { Menu, X, ShoppingBag, Home, Store, Users, Phone } from "lucide-react";
import Link from "next/link";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { LoadingLink } from "@/components/ui/page-loader";
import { useCartStore } from '@/lib/store/cart';

interface MenuItem {
  name: string;
  href: string;
  icon?: React.ReactNode;
}

interface MobileMenuProps {
  menuItems: MenuItem[];
  logo: React.ReactNode;
  isScrolled: boolean;
}

export const MobileMenu: React.FC<MobileMenuProps> = ({
  menuItems,
  logo,
  isScrolled
}) => {
  const items = useCartStore(state => state.items);
  const totalItems = items.reduce((total, item) => total + item.quantity, 0);
  const [open, setOpen] = React.useState(false);

  // Map icons to menu items
  const menuItemsWithIcons = menuItems.map(item => {
    let icon;
    switch (item.name) {
      case 'Home':
        icon = <Home className="h-5 w-5 text-white group-hover:text-white transition-colors" />;
        break;
      case 'Store':
        icon = <Store className="h-5 w-5 text-white group-hover:text-white transition-colors" />;
        break;
      case 'About':
        icon = <Users className="h-5 w-5 text-white group-hover:text-white transition-colors" />;
        break;
      case 'Contact':
        icon = <Phone className="h-5 w-5 text-white group-hover:text-white transition-colors" />;
        break;
      default:
        icon = <Home className="h-5 w-5 text-white group-hover:text-white transition-colors" />;
    }
    return { ...item, icon };
  });

  return (
    <div className="lg:hidden">
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className="text-white hover:bg-gray-800/50 relative z-20 transition-colors"
          >
            <Menu className="h-5 w-5" />
          </Button>
        </SheetTrigger>
        
        <SheetContent
          side="right"
          hideCloseButton={true}
          className="text-white border-l border-gray-800/80 p-0 w-full sm:max-w-md"
          style={{
            background: `url(/images/hero/bg.jpg)`,
            backgroundSize: 'cover',
            backgroundPosition: 'center 25%',
            backgroundRepeat: 'no-repeat'
          }}
        >
          <div className="flex flex-col h-full">
            <div className="flex items-center justify-between p-5 border-b border-gray-700/60 bg-[#12263a]/70 backdrop-blur-sm">
              {logo}
              <div 
                className="cursor-pointer"
                onClick={() => setOpen(false)}
              >
                <X className="h-5 w-5 text-white hover:text-gray-300" />
              </div>
            </div>

            <div className="flex-1 overflow-y-auto py-8 px-5 bg-gradient-to-b from-[#12263a]/60 to-[#12263a]/40">
              <nav className="flex flex-col space-y-7">
                {menuItemsWithIcons.map((item, index) => (
                  <motion.div
                    key={item.name}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.2, delay: index * 0.06 }}
                  >
                    <LoadingLink
                      href={item.href}
                      className="flex items-center group p-3 rounded-xl hover:bg-[#93b7be]/20 transition-all"
                      onClick={() => setOpen(false)}
                    >
                      <div className="flex justify-center items-center bg-[#12263a]/80 rounded-full p-2 mr-4 group-hover:bg-[#93b7be]/30 transition-colors">
                        {item.icon}
                      </div>
                      <span className="text-white group-hover:text-white font-medium text-lg tracking-wide">
                        {item.name}
                      </span>
                    </LoadingLink>
                  </motion.div>
                ))}
              </nav>
            </div>

            <div className="border-t border-gray-700/60 p-5 space-y-5 bg-[#12263a]/70 backdrop-blur-sm">
              <div className="flex items-center justify-between">
                <p className="text-gray-300 font-medium">Your Cart</p>
                <LoadingLink
                  href="/cart"
                  className="relative p-3 rounded-full bg-[#12263a]/60 hover:bg-[#93b7be]/20 transition-colors"
                  onClick={() => setOpen(false)}
                >
                  <ShoppingBag className="w-5 h-5 text-white" strokeWidth={1.5} />
                  {totalItems > 0 && (
                    <span className="absolute -top-1 -right-1 flex items-center justify-center w-5 h-5 text-[10px] font-medium text-white bg-[#93b7be] rounded-full">
                      {totalItems}
                    </span>
                  )}
                </LoadingLink>
              </div>

              <Button
                asChild
                className="w-full bg-[#93b7be] hover:bg-[#699ba5] text-[#12263a] border border-[#93b7be] hover:border-[#699ba5] transition-colors py-6 font-semibold rounded-xl shadow-lg shadow-[#93b7be]/20"
              >
                <LoadingLink 
                  href={totalItems > 0 ? "/cart" : "/store"}
                  onClick={() => setOpen(false)}
                >
                  <span className="flex items-center justify-center gap-2">
                    <ShoppingBag size={18} />
                    {totalItems > 0 ? "Go to Cart" : "Shop Now"}
                  </span>
                </LoadingLink>
              </Button>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default MobileMenu;
