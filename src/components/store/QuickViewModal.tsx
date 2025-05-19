'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Product } from '@/lib/supabase/client';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Check, Star, X, ShoppingCart, Plus, Minus, Trash2 } from 'lucide-react';
import { productFeatures } from '@/lib/data/products';
import { useCartStore } from '@/lib/store/cart';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';

interface QuickViewModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
  bottomSheet?: boolean;
}

export default function QuickViewModal({ product, isOpen, onClose, bottomSheet }: QuickViewModalProps) {
  const items = useCartStore(state => state.items);
  const addItem = useCartStore(state => state.addItem);
  const updateQuantity = useCartStore(state => state.updateQuantity);

  // Check if product is in cart and get its quantity
  const cartItem = product ? items.find(item => item.id === product.id) : null;
  const isInCart = !!cartItem;
  const quantity = cartItem?.quantity || 0;

  const handleAddToCart = () => {
    if (product) {
      addItem(product, 1);
      toast.success(`Added ${product.name} to cart`);
    }
  };

  const handleGoToCheckout = () => {
    window.location.href = '/cart';
  };

  if (!product) return null;

  // Get features for this product
  const features = productFeatures[product.slug] || [];

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent
        className={cn(
          'max-w-4xl p-0 overflow-hidden bg-isabelline rounded-lg',
          bottomSheet &&
            'fixed bottom-0 left-0 right-0 w-full max-w-none rounded-t-2xl rounded-b-none md:max-w-2xl md:left-1/2 md:-translate-x-1/2 md:rounded-2xl md:bottom-8 animate-[slideUp_0.3s_ease]',
        )}
        style={bottomSheet ? { margin: 0 } : {}}
      >
        <DialogHeader className="p-6 pb-0">
          <div className="flex justify-between items-start">
            <div>
              <DialogTitle className="text-2xl font-bold text-prussian_blue">{product.name}</DialogTitle>
              <DialogDescription className="text-prussian_blue-400 mt-1">
                <span className="font-medium text-prussian_blue text-lg">₦{product.price.toLocaleString()}</span>
                <span className="ml-2">
                  <Badge className={`${product.in_stock ? 'bg-light_blue-100 text-light_blue-700' : 'bg-red-100 text-red-700'}`}>
                    {product.in_stock ? 'In Stock' : 'Out of Stock'}
                  </Badge>
                </span>
              </DialogDescription>
            </div>
            <Button size="icon" variant="ghost" onClick={onClose} className="text-prussian_blue hover:text-prussian_blue-400">
              <X className="h-4 w-4" />
            </Button>
          </div>
        </DialogHeader>

        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Product image */}
            <div className="aspect-square relative bg-white rounded-lg overflow-hidden border border-isabelline-400">
              {product.images && product.images.length > 0 ? (
                <Image
                  src={product.images[0]}
                  alt={product.name}
                  fill
                  className="object-contain p-4"
                />
              ) : (
                <div className="absolute inset-0 bg-isabelline-300 flex items-center justify-center">
                  <span className="text-prussian_blue-400">No image</span>
                </div>
              )}
            </div>

            {/* Product details */}
            <div>
              {/* Rating */}
              <div className="flex items-center mb-4">
                <div className="flex">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className="h-4 w-4 text-yellow-400 fill-yellow-400"
                    />
                  ))}
                </div>
                <span className="ml-2 text-sm text-prussian_blue-400">5.0 (12 reviews)</span>
              </div>

              {/* Description */}
              <p className="text-prussian_blue-600 mb-4">{product.description}</p>

              {/* Features */}
              {features.length > 0 && (
                <div className="mb-6">
                  <h3 className="text-sm font-semibold mb-2 text-prussian_blue">Key Features</h3>
                  <ul className="space-y-2">
                    {features.map((feature, index) => (
                      <li key={index} className="flex items-start">
                        <Check className="h-4 w-4 text-light_blue-500 mr-2 flex-shrink-0 mt-0.5" />
                        <span className="text-sm text-prussian_blue-500">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Actions */}
              <div className="flex flex-col gap-3 mt-6">
                {!isInCart ? (
                  // Not in cart - show Add to Cart button
                  <div className="flex flex-col gap-3">
                    <div className="flex gap-3">
                      <Button
                        onClick={handleAddToCart}
                        className="flex-1 bg-light_blue-500 text-prussian_blue hover:bg-light_blue-400"
                        disabled={!product.in_stock}
                      >
                        <ShoppingCart className="h-4 w-4 mr-2" />
                        Add to Cart
                      </Button>
                      <Button variant="outline" asChild className="border-light_blue-300 text-prussian_blue hover:bg-light_blue-100">
                        <Link href={`/product/${product.slug}`}>
                          View Full Details
                        </Link>
                      </Button>
                    </div>
                    <Button 
                      asChild
                      className="w-full bg-light_blue-500 hover:bg-light_blue-400 text-prussian_blue"
                    >
                      <Link href="/cart">
                        View Cart
                      </Link>
                    </Button>
                  </div>
                ) : (
                  // In cart - show cart management options
                  <>
                    <div className="flex gap-3">
                      <Button
                        onClick={() => updateQuantity(product.id, 0)} // Remove item completely
                        variant="destructive"
                        className="flex-none"
                      >
                        <Trash2 className="h-4 w-4 mr-1" />
                        Remove
                      </Button>

                      <div className="flex-1 flex items-center justify-end gap-1">
                        <Button
                          onClick={() => quantity > 1 && updateQuantity(product.id, quantity - 1)}
                          variant="outline"
                          size="icon"
                          className="h-9 w-9 p-0"
                          disabled={quantity <= 1}
                        >
                          <Minus className="h-3 w-3" />
                        </Button>

                        <span className="w-8 text-center text-sm font-medium">{quantity}</span>

                        <Button
                          onClick={() => updateQuantity(product.id, quantity + 1)}
                          variant="outline"
                          size="icon"
                          className="h-9 w-9 p-0"
                        >
                          <Plus className="h-3 w-3" />
                        </Button>
                      </div>

                      <Button variant="outline" asChild className="border-light_blue-300 text-prussian_blue hover:bg-light_blue-100">
                        <Link href={`/product/${product.slug}`}>
                          View Details
                        </Link>
                      </Button>
                    </div>

                    <Button
                      asChild
                      className="w-full bg-light_blue-500 hover:bg-light_blue-400 text-prussian_blue"
                    >
                      <Link href="/cart">
                        View Cart
                      </Link>
                    </Button>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

// Add slideUp animation for bottom sheet
// In your global CSS (e.g., globals.css):
// @keyframes slideUp { from { transform: translateY(100%); } to { transform: translateY(0); } }