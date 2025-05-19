'use client';

import React from 'react';
import { Product } from '@/lib/supabase/client';
import AddToCartButton from '@/components/store/AddToCartButton';

interface AddToCartButtonWrapperProps {
  product: Product;
}

export default function AddToCartButtonWrapper({ product }: AddToCartButtonWrapperProps) {
  return <AddToCartButton product={product} />;
}
