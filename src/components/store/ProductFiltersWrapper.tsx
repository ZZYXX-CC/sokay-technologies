'use client';

import React, { useState, useEffect } from 'react';
import ProductFilters from '@/components/store/ProductFilters';

export default function ProductFiltersWrapper() {
  // Instead of using useSearchParams for SSR, use window.location in a useEffect
  const [currentFilters, setCurrentFilters] = useState({
    search: '',
    category: '',
    minPrice: '' as const,
    maxPrice: '' as const,
    inStock: false,
  });
  
  // Parse URL parameters on client side only
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      setCurrentFilters({
        search: params.get('q') || '',
        category: params.get('category') || '',
        minPrice: params.get('min') ? Number(params.get('min')) : '' as const,
        maxPrice: params.get('max') ? Number(params.get('max')) : '' as const,
        inStock: params.get('inStock') === 'true',
      });
    }
  }, []);
  
  const handleFilterChange = (filters: {
    search: string;
    category: string;
    minPrice: number | '';
    maxPrice: number | '';
    inStock: boolean;
  }) => {
    // Build new query string
    const params = new URLSearchParams();
    if (filters.search) params.set('q', filters.search);
    if (filters.category) params.set('category', filters.category);
    if (filters.minPrice !== '') params.set('min', filters.minPrice.toString());
    if (filters.maxPrice !== '') params.set('max', filters.maxPrice.toString());
    if (filters.inStock) params.set('inStock', 'true');
    
    // Update URL using plain window.location instead of Next.js router
    const newPath = `/store${params.toString() ? '?' + params.toString() : ''}`;
    window.location.href = newPath;
  };
  
  return (
    <ProductFilters 
      initialFilters={currentFilters}
      onFilterChange={handleFilterChange}
    />
  );
}
