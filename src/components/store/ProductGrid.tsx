'use client';

import React from 'react';
import { Product } from '@/lib/supabase/client';
import ProductCard from './ProductCard';
import { PackageSearch, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

interface ProductGridProps {
  products: Product[];
  isLoading?: boolean;
  onQuickView?: (product: Product) => void;
}

export default function ProductGrid({ products, isLoading = false, onQuickView }: ProductGridProps) {
  if (isLoading) {
    return (
      <div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {Array.from({ length: 8 }).map((_, index) => (
            <div key={index} className="h-[450px] bg-gray-100 rounded-lg overflow-hidden">
              <div className="w-full aspect-square bg-gray-200 animate-pulse" />
              <div className="p-5 space-y-3">
                <div className="h-6 bg-gray-200 rounded animate-pulse" />
                <div className="h-4 bg-gray-200 rounded w-3/4 animate-pulse" />
                <div className="h-4 bg-gray-200 rounded w-1/2 animate-pulse" />
                <div className="h-10 bg-gray-200 rounded mt-4 animate-pulse" />
              </div>
            </div>
          ))}
        </div>
        <div className="flex justify-center mt-8">
          <Loader2 className="h-8 w-8 text-blue-600 animate-spin" />
        </div>
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="text-center py-16 bg-gray-50 rounded-lg border border-gray-200">
        <PackageSearch className="h-16 w-16 text-gray-400 mx-auto mb-4" />
        <h3 className="text-xl font-medium text-gray-900 mb-2">No products found</h3>
        <p className="text-gray-600 mb-6 max-w-md mx-auto">
          We couldn't find any products matching your criteria. Try adjusting your filters or search terms.
        </p>
        <div className="flex justify-center gap-4">
          <Button asChild variant="outline">
            <Link href="/store">Clear Filters</Link>
          </Button>
          <Button asChild>
            <Link href="/store">Browse All Products</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div>
      <p className="text-sm text-gray-500 mb-6">Showing {products.length} products</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <ProductCard 
            key={product.id} 
            product={product}
            onQuickView={onQuickView ? () => onQuickView(product) : undefined}
          />
        ))}
      </div>
    </div>
  );
}
