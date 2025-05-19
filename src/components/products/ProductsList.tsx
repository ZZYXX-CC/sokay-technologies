'use client';

import { useState, useEffect } from 'react';
import { getProducts } from '@/lib/supabaseUtils';
import { Product } from '@/lib/types/database.types';

export default function ProductsList() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadProducts() {
      try {
        setLoading(true);
        const data = await getProducts();
        setProducts(data);
      } catch (err) {
        console.error('Error loading products:', err);
        setError('Failed to load products. Please try again later.');
      } finally {
        setLoading(false);
      }
    }

    loadProducts();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[200px]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md">
        {error}
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="text-center py-10">
        <h3 className="text-lg font-medium">No products found</h3>
        <p className="text-muted-foreground mt-2">
          Check back later for our latest products.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {products.map((product) => (
        <div
          key={product.id}
          className="group rounded-lg border border-border p-4 transition-all hover:border-primary"
        >
          <div className="aspect-square w-full overflow-hidden rounded-md bg-gray-100">
            {product.images && product.images.length > 0 ? (
              <img
                src={product.images[0]}
                alt={product.name}
                className="h-full w-full object-cover object-center group-hover:scale-105 transition-transform duration-300"
              />
            ) : (
              <div className="flex h-full items-center justify-center bg-gray-200">
                <span className="text-gray-400">No image</span>
              </div>
            )}
          </div>
          <div className="mt-4 flex justify-between">
            <div>
              <h3 className="text-lg font-medium">{product.name}</h3>
              <p className="mt-1 text-sm text-muted-foreground">
                {product.category}
              </p>
            </div>
            <p className="text-lg font-medium">
              ₦{product.price.toLocaleString()}
            </p>
          </div>
          <div className="mt-2">
            <span className={`text-sm ${product.in_stock ? 'text-green-600' : 'text-red-600'}`}>
              {product.in_stock ? 'In stock' : 'Out of stock'}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}
