'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Plus, Minus, ShoppingCart, Heart, Trash2 } from 'lucide-react';
import { Product } from '@/lib/supabase/client';
import { useCartStore } from '@/lib/store/cart';
import { toast } from 'sonner';

interface AddToCartButtonProps {
  product: Product;
}

export default function AddToCartButton({ product }: AddToCartButtonProps) {
  const items = useCartStore(state => state.items);
  const addItem = useCartStore(state => state.addItem);
  const updateQuantity = useCartStore(state => state.updateQuantity);

  // Check if product is in cart and get its quantity
  const cartItem = items.find(item => item.id === product.id);
  const isInCart = !!cartItem;

  // Use cart quantity if product is in cart, otherwise use local state
  const [localQuantity, setLocalQuantity] = useState(1);
  const quantity = isInCart ? cartItem.quantity : localQuantity;

  const [isWishlisted, setIsWishlisted] = useState(false);

  const handleIncrement = () => {
    if (isInCart) {
      updateQuantity(product.id, quantity + 1);
    } else {
      setLocalQuantity(prev => prev + 1);
    }
  };

  const handleDecrement = () => {
    if (quantity > 1) {
      if (isInCart) {
        updateQuantity(product.id, quantity - 1);
      } else {
        setLocalQuantity(prev => prev - 1);
      }
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    if (!isNaN(value) && value > 0) {
      if (isInCart) {
        updateQuantity(product.id, value);
      } else {
        setLocalQuantity(value);
      }
    }
  };

  const handleAddToCart = () => {
    if (isInCart) {
      // If already in cart, update quantity
      updateQuantity(product.id, quantity);
      toast.success(`Updated ${product.name} quantity in cart`);
    } else {
      // Add new item to cart
      addItem(product, localQuantity);
      toast.success(`Added ${localQuantity} ${localQuantity === 1 ? 'item' : 'items'} to cart`);
    }
  };

  const handleGoToCheckout = () => {
    window.location.href = '/cart';
  };

  const toggleWishlist = () => {
    setIsWishlisted(!isWishlisted);
    if (!isWishlisted) {
      toast.success(`${product.name} added to wishlist`);
    } else {
      toast.success(`${product.name} removed from wishlist`);
    }
  };

  return (
    <div className="space-y-4">
      {/* Quantity selector */}
      <div className="flex items-center">
        <div className="flex items-center border rounded-md shadow-sm">
          <Button
            type="button"
            variant="ghost"
            size="icon"
            onClick={handleDecrement}
            disabled={quantity <= 1}
            className="h-12 w-12 rounded-l-md border-r"
          >
            <Minus className="h-4 w-4" />
          </Button>
          <Input
            type="text"
            value={quantity}
            onChange={handleInputChange}
            className="h-12 w-16 text-center border-0 focus-visible:ring-0 focus-visible:ring-offset-0"
          />
          <Button
            type="button"
            variant="ghost"
            size="icon"
            onClick={handleIncrement}
            className="h-12 w-12 rounded-r-md border-l"
          >
            <Plus className="h-4 w-4" />
          </Button>
        </div>
        <span className="ml-3 text-sm text-gray-500">
          {product.in_stock ? 'Available' : 'Out of Stock'}
        </span>
      </div>

      {/* Action buttons */}
      {!isInCart ? (
        // Not in cart - show standard buttons
        <div className="space-y-4">
          <div className="flex gap-2">
            <Button
              onClick={handleAddToCart}
              disabled={!product.in_stock}
              className="flex-1 h-12 bg-blue-600 hover:bg-blue-700 text-white"
            >
              <ShoppingCart className="h-5 w-5 mr-2" />
              Add to Cart
            </Button>

            <Button
              onClick={toggleWishlist}
              variant="outline"
              className="h-12 w-12 p-0 flex items-center justify-center"
            >
              <Heart
                className={`h-5 w-5 ${isWishlisted ? 'fill-red-500 text-red-500' : ''}`}
              />
            </Button>
          </div>

          {/* Buy now button */}
          {product.in_stock && (
            <Button
              className="w-full h-12 bg-gray-900 hover:bg-black text-white"
              onClick={() => {
                // Add to cart first, then go to checkout
                handleAddToCart();
                handleGoToCheckout();
              }}
            >
              View Cart
            </Button>
          )}
        </div>
      ) : (
        // In cart - show cart management options
        <div className="space-y-4">
          <div className="flex gap-2">
            <Button
              onClick={() => updateQuantity(product.id, 0)} // Remove item completely
              variant="destructive"
              className="flex-none h-12 px-4"
            >
              <Trash2 className="h-5 w-5 mr-2" />
              Remove
            </Button>

            <Button
              onClick={handleAddToCart}
              className="flex-1 h-12 bg-blue-600 hover:bg-blue-700 text-white"
            >
              <ShoppingCart className="h-5 w-5 mr-2" />
              Update Cart
            </Button>

            <Button
              onClick={toggleWishlist}
              variant="outline"
              className="h-12 w-12 p-0 flex items-center justify-center"
            >
              <Heart
                className={`h-5 w-5 ${isWishlisted ? 'fill-red-500 text-red-500' : ''}`}
              />
            </Button>
          </div>

          {/* Checkout button */}
          {product.in_stock && (
            <Button
              className="w-full h-12 bg-green-600 hover:bg-green-700 text-white"
              onClick={handleGoToCheckout}
            >
              View Cart
            </Button>
          )}
        </div>
      )}
    </div>
  );
}
