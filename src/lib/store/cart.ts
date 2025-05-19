import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Product } from '../supabase/client';

export type CartItem = {
  id: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
};

type CartStore = {
  items: CartItem[];
  addItem: (product: Product, quantity?: number) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  totalItems: () => number;
  totalPrice: () => number;
};

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      
      addItem: (product: Product, quantity = 1) => {
        const { items } = get();
        const existingItem = items.find(item => item.id === product.id);
        
        if (existingItem) {
          // Update quantity if item already exists
          set({
            items: items.map(item => 
              item.id === product.id 
                ? { ...item, quantity: item.quantity + quantity }
                : item
            )
          });
        } else {
          // Add new item
          set({
            items: [
              ...items,
              {
                id: product.id,
                name: product.name,
                price: product.price,
                image: product.images[0] || '',
                quantity
              }
            ]
          });
        }
      },
      
      removeItem: (id: string) => {
        const { items } = get();
        set({
          items: items.filter(item => item.id !== id)
        });
      },
      
      updateQuantity: (id: string, quantity: number) => {
        const { items } = get();
        if (quantity <= 0) {
          // Remove item if quantity is zero or negative
          set({
            items: items.filter(item => item.id !== id)
          });
        } else {
          // Update quantity
          set({
            items: items.map(item => 
              item.id === id ? { ...item, quantity } : item
            )
          });
        }
      },
      
      clearCart: () => {
        set({ items: [] });
      },
      
      totalItems: () => {
        const { items } = get();
        return items.reduce((total, item) => total + item.quantity, 0);
      },
      
      totalPrice: () => {
        const { items } = get();
        return items.reduce((total, item) => total + (item.price * item.quantity), 0);
      }
    }),
    {
      name: 'sokay-cart-storage', // Name for localStorage
    }
  )
);
