export const dynamic = 'force-static';

import { redirect } from 'next/navigation';
import { Suspense } from 'react';
import { PageLoader } from '@/components/ui/page-loader';

// Static redirect function that runs on the server
export async function generateMetadata() {
  // This redirect happens at build time and prevents client-side code from running
  redirect('/success');
  
  // This return is just for TypeScript, it will never execute
  return {
    title: 'Redirecting to Order Confirmation',
  };
}

// Loading component
function OrderConfirmationLoading() {
  return (
    <div className="w-full h-[50vh] flex items-center justify-center">
      <PageLoader size={40} />
    </div>
  );
}

export default function OrderConfirmationPage() {
  return (
    <Suspense fallback={<OrderConfirmationLoading />}>
      <div className="h-screen w-full flex items-center justify-center">
        <p>Redirecting to order confirmation page...</p>
        <noscript>
          <meta httpEquiv="refresh" content="0;url=/success" />
          <p>Click <a href="/success">here</a> if you are not redirected.</p>
        </noscript>
      </div>
    </Suspense>
  );
}