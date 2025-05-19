'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function StoreCheckoutPage() {
  const router = useRouter();

  useEffect(() => {
    // Redirect to the main checkout page
    router.replace('/checkout');
  }, [router]);

  // Return null as this is just a redirect page
  return null;
}