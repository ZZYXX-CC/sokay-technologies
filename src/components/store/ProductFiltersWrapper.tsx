'use client';

import React, { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import ProductFilters from '@/components/store/ProductFilters';

export default function ProductFiltersWrapper() {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  const handleFilterChange = (filters: {
    search: string;
    category: string;
    minPrice: number | '';
    maxPrice: number | '';
    inStock: boolean;
  }) => {
    // In a real app, this would update the URL and trigger a new server request
    // For now, we'll just log the filters
    console.log('Filters changed:', filters);
    
    // Build new query string
    const params = new URLSearchParams();
    if (filters.search) params.set('q', filters.search);
    if (filters.category) params.set('category', filters.category);
    if (filters.minPrice !== '') params.set('min', filters.minPrice.toString());
    if (filters.maxPrice !== '') params.set('max', filters.maxPrice.toString());
    if (filters.inStock) params.set('inStock', 'true');
    
    // Update URL
    const newPath = `/store${params.toString() ? '?' + params.toString() : ''}`;
    router.push(newPath);
  };
  
  // Extract current filter values from URL
  const currentFilters = {
    search: searchParams.get('q') || '',
    category: searchParams.get('category') || '',
    minPrice: searchParams.get('min') ? Number(searchParams.get('min')) : '' as const,
    maxPrice: searchParams.get('max') ? Number(searchParams.get('max')) : '' as const,
    inStock: searchParams.get('inStock') === 'true',
  };
  
  return (
    <ProductFilters 
      initialFilters={currentFilters}
      onFilterChange={handleFilterChange}
    />
  );
}
