'use client';

import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Search, SlidersHorizontal, X, Filter } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Slider } from '@/components/ui/slider';

// Updated categories based on Sokay's product lineup
const categories = [
  { id: 'all', name: 'All Categories' },
  { id: 'microphones', name: 'Microphones' },
  { id: 'audio-interfaces', name: 'Audio Interfaces' },
  { id: 'headphones', name: 'Headphones' },
  { id: 'accessories', name: 'Accessories' },
];

interface ProductFiltersProps {
  initialFilters?: {
    search: string;
    category: string;
    minPrice: number | '';
    maxPrice: number | '';
    inStock: boolean;
  };
  onFilterChange: (filters: {
    search: string;
    category: string;
    minPrice: number | '';
    maxPrice: number | '';
    inStock: boolean;
  }) => void;
}

export default function ProductFilters({ initialFilters, onFilterChange }: ProductFiltersProps) {
  const [isFiltersOpen, setIsFiltersOpen] = React.useState(false);
  const [search, setSearch] = React.useState(initialFilters?.search || '');
  const [category, setCategory] = React.useState(initialFilters?.category || 'all');
  const [minPrice, setMinPrice] = React.useState<number | ''>(initialFilters?.minPrice !== undefined ? initialFilters.minPrice : '');
  const [maxPrice, setMaxPrice] = React.useState<number | ''>(initialFilters?.maxPrice !== undefined ? initialFilters.maxPrice : '');
  const [inStock, setInStock] = React.useState(initialFilters?.inStock || false);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const handleCategoryChange = (value: string) => {
    setCategory(value);
  };

  const handleMinPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value === '' ? '' : Number(e.target.value);
    setMinPrice(value);
  };

  const handleMaxPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value === '' ? '' : Number(e.target.value);
    setMaxPrice(value);
  };

  const handleInStockChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInStock(e.target.checked);
  };

  const applyFilters = () => {
    onFilterChange({
      search,
      category,
      minPrice,
      maxPrice,
      inStock,
    });
  };

  const resetFilters = () => {
    setSearch('');
    setCategory('all');
    setMinPrice('');
    setMaxPrice('');
    setInStock(false);
    onFilterChange({
      search: '',
      category: 'all',
      minPrice: '',
      maxPrice: '',
      inStock: false,
    });
  };

  return (
    <div className="mb-8">
      {/* Search Bar */}
      <div className="relative mb-4">
        <Input
          type="text"
          placeholder="Search products..."
          value={search}
          onChange={handleSearchChange}
          className="pl-10 pr-4"
        />
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
        <Button
          variant="ghost"
          size="sm"
          className="absolute right-2 top-1/2 transform -translate-y-1/2"
          onClick={applyFilters}
        >
          Search
        </Button>
      </div>

      {/* Filters Toggle Button (Mobile) */}
      <div className="flex items-center justify-between mb-4 md:hidden">
        <Button
          variant="outline"
          size="sm"
          onClick={() => setIsFiltersOpen(!isFiltersOpen)}
          className="flex items-center gap-2"
        >
          <SlidersHorizontal className="h-4 w-4" />
          Filters
        </Button>
        {(search || category !== 'all' || minPrice !== '' || maxPrice !== '' || inStock) && (
          <Button variant="ghost" size="sm" onClick={resetFilters} className="text-red-500">
            Clear Filters
          </Button>
        )}
      </div>

      {/* Filters (Desktop) */}
      <div className={`${isFiltersOpen ? 'block' : 'hidden'} md:block space-y-4`}>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {/* Category Filter */}
          <div>
            <Label htmlFor="category">Category</Label>
            <Select value={category} onValueChange={handleCategoryChange}>
              <SelectTrigger id="category">
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((cat) => (
                  <SelectItem key={cat.id} value={cat.id}>
                    {cat.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Price Range Filters */}
          <div>
            <Label htmlFor="minPrice">Min Price (₦)</Label>
            <Input
              id="minPrice"
              type="number"
              placeholder="Min"
              value={minPrice}
              onChange={handleMinPriceChange}
              min={0}
            />
          </div>
          <div>
            <Label htmlFor="maxPrice">Max Price (₦)</Label>
            <Input
              id="maxPrice"
              type="number"
              placeholder="Max"
              value={maxPrice}
              onChange={handleMaxPriceChange}
              min={0}
            />
          </div>

          {/* In Stock Filter */}
          <div className="flex items-end">
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="inStock"
                checked={inStock}
                onChange={handleInStockChange}
                className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
              />
              <Label htmlFor="inStock">In Stock Only</Label>
            </div>
          </div>
        </div>

        {/* Filter Actions */}
        <div className="flex justify-end space-x-2">
          <Button variant="outline" onClick={resetFilters}>
            Reset
          </Button>
          <Button onClick={applyFilters}>Apply Filters</Button>
        </div>
      </div>
    </div>
  );
}
