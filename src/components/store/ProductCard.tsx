'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Product } from '@/lib/supabase/client';
import { useCartStore } from '@/lib/store/cart';
import { toast } from 'sonner';
import { productFeatures } from '@/lib/data/products';
import { Badge } from '@/components/ui/badge';
import { Check, ShoppingCart, Eye, Heart, Plus, Minus, Trash2 } from 'lucide-react';
import { motion } from 'framer-motion';

interface ProductCardProps {
  product: Product;
  onQuickView?: () => void;
}

export default function ProductCard({ product, onQuickView }: ProductCardProps) {
  const items = useCartStore(state => state.items);
  const addItem = useCartStore(state => state.addItem);
  const updateQuantity = useCartStore(state => state.updateQuantity);
  const [isHovered, setIsHovered] = useState(false);

  // Check if product is in cart and get its quantity
  const cartItem = items.find(item => item.id === product.id);
  const isInCart = !!cartItem;
  const quantity = cartItem?.quantity || 0;

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem(product, 1);
    toast.success(`Added ${product.name} to cart`);
  };

  const handleIncreaseQuantity = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (isInCart) {
      updateQuantity(product.id, quantity + 1);
      toast.success(`Added another ${product.name} to cart`);
    }
  };

  const handleDecreaseQuantity = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (isInCart && quantity > 1) {
      updateQuantity(product.id, quantity - 1);
    }
  };

  const handleGoToCheckout = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    window.location.href = '/cart';
  };

  const handleQuickView = (e: React.MouseEvent) => {
    if (onQuickView) {
      e.preventDefault();
      e.stopPropagation();
      onQuickView();
    }
  };

  // Get features for this product
  const features = productFeatures[product.slug] || [];

  return (
    <motion.div
      whileHover={{ y: -5 }}
      transition={{ type: 'spring', stiffness: 300 }}
    >
      <Card
        className="h-full overflow-hidden bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-xl transition-all duration-300"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
      <div className="relative">
        {/* Stock badge */}
        <div className="absolute top-3 right-3 z-10">
            <Badge className={`${product.in_stock ? 'bg-green-500 hover:bg-green-600' : 'bg-red-500 hover:bg-red-600'}`}>
            {product.in_stock ? 'In Stock' : 'Out of Stock'}
          </Badge>
        </div>

          {/* Quick action buttons */}
          <div className={`absolute right-3 top-12 z-10 flex flex-col gap-2 transition-opacity duration-300 ${isHovered ? 'opacity-100' : 'opacity-0'}`}>
            <Button
              size="icon"
              variant="secondary"
              className="h-8 w-8 rounded-full shadow-md bg-white text-gray-700 hover:text-red-500"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                toast.info('Wishlist feature coming soon');
              }}
            >
              <Heart className="h-4 w-4" />
              <span className="sr-only">Add to wishlist</span>
            </Button>
            {onQuickView && (
              <Button
                size="icon"
                variant="secondary"
                className="h-8 w-8 rounded-full shadow-md bg-white text-gray-700 hover:text-blue-500"
                onClick={handleQuickView}
              >
                <Eye className="h-4 w-4" />
                <span className="sr-only">Quick view</span>
              </Button>
            )}
          </div>

        {/* Product image with hover effect */}
        <Link href={`/product/${product.slug}`} className="block">
          <div className="aspect-square relative overflow-hidden bg-gray-50">
            {product.images && product.images.length > 0 ? (
                <div className="relative h-full w-full transition-transform duration-500 group-hover:scale-110">
                <Image
                  src={product.images[0]}
                  alt={product.name}
                  fill
                    className={`object-contain p-4 transition-all duration-500 ${isHovered ? 'scale-110' : 'scale-100'}`}
                />
              </div>
            ) : (
              <div className="absolute inset-0 bg-gray-200 flex items-center justify-center">
                <span className="text-gray-600">No image</span>
              </div>
            )}
          </div>
        </Link>
      </div>

      <CardContent className="p-5">
        <Link href={`/product/${product.slug}`} className="block">
            {/* Category tag */}
            <div className="mb-2">
              <span className="text-xs font-medium text-blue-600 uppercase tracking-wider">
                {product.category.replace('-', ' ')}
              </span>
            </div>

          <h3 className="text-lg font-bold mb-2 line-clamp-1 group-hover:text-blue-600 transition-colors">
            {product.name}
          </h3>

          {/* Product features */}
          {features.length > 0 && (
            <ul className="mb-3 space-y-1">
              {features.slice(0, 3).map((feature, index) => (
                <li key={index} className="flex items-center text-sm text-gray-600">
                  <Check className="h-4 w-4 mr-2 text-green-500 flex-shrink-0" />
                  <span className="line-clamp-1">{feature}</span>
                </li>
              ))}
            </ul>
          )}

          <p className="text-gray-500 text-sm mb-3 line-clamp-2">{product.description}</p>
          <p className="text-xl font-bold text-blue-600">₦{product.price.toLocaleString()}</p>
        </Link>
      </CardContent>

      <CardFooter className="p-5 pt-0 flex gap-2">
        {!isInCart ? (
          // Not in cart - show Add to Cart button
          <Button
            onClick={handleAddToCart}
            className={`flex-1 ${product.in_stock ? 'bg-blue-600 hover:bg-blue-700' : 'bg-gray-400 cursor-not-allowed'}`}
            disabled={!product.in_stock}
          >
            <ShoppingCart className="h-4 w-4 mr-2" />
            {product.in_stock ? 'Add to Cart' : 'Out of Stock'}
          </Button>
        ) : (
          // In cart - show action buttons with dropdown for quantity
          <div className="flex-1 flex flex-col gap-2">
            <div className="flex gap-2">
              <Button
                onClick={() => updateQuantity(product.id, 0)} // Remove item completely
                variant="destructive"
                size="sm"
                className="flex-none"
              >
                <Trash2 className="h-4 w-4 mr-1" />
                Remove
              </Button>

              <div className="flex-1 flex items-center justify-end gap-1">
                <Button
                  onClick={handleDecreaseQuantity}
                  variant="outline"
                  size="icon"
                  className="h-8 w-8 p-0"
                  disabled={quantity <= 1}
                >
                  <Minus className="h-3 w-3" />
                </Button>

                <span className="w-8 text-center text-sm font-medium">{quantity}</span>

                <Button
                  onClick={handleIncreaseQuantity}
                  variant="outline"
                  size="icon"
                  className="h-8 w-8 p-0"
                >
                  <Plus className="h-3 w-3" />
                </Button>
              </div>
            </div>

            <Button
              onClick={handleGoToCheckout}
              className="w-full bg-green-600 hover:bg-green-700 text-white"
            >
              View Cart
            </Button>
          </div>
        )}

        <Button variant="outline" asChild className="flex-none border-blue-200 hover:bg-blue-50 hover:text-blue-700">
          <Link href={`/product/${product.slug}`}>
            View
          </Link>
        </Button>
      </CardFooter>
    </Card>
    </motion.div>
  );
}
