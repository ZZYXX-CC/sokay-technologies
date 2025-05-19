export const dynamic = 'force-static';

import { redirect } from 'next/navigation';
import { Suspense } from 'react';
import { PageLoader } from '@/components/ui/page-loader';

// Static redirect function that runs on the server
export async function generateMetadata() {
  // This redirect happens at build time and prevents client-side code from running
  redirect('/checkout');
  
  // This return is just for TypeScript, it will never execute
  return {
    title: 'Redirecting to Checkout',
  };
}

// Loading component
function CheckoutLoading() {
  return (
    <div className="h-screen w-full flex items-center justify-center">
      <PageLoader size={40} />
    </div>
  );
}

export default function StoreCheckoutPage() {
  return (
    <Suspense fallback={<CheckoutLoading />}>
      <div className="h-screen w-full flex items-center justify-center">
        <p>Redirecting to checkout...</p>
        <noscript>
          <meta httpEquiv="refresh" content="0;url=/checkout" />
          <p>Click <a href="/checkout">here</a> if you are not redirected.</p>
        </noscript>
      </div>
    </Suspense>
  );
}