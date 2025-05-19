"use client";

import dynamic from 'next/dynamic';
import { Suspense } from 'react';
import { PageLoader } from "@/components/ui/page-loader";

// Dynamic imports for components
const ProductShowcaseOrbital = dynamic(
  () => import("@/components/home/ProductShowcaseOrbital"),
  {
    loading: () => (
      <div className="pt-32 pb-16 bg-background h-[600px] sm:h-[600px] md:h-[700px] flex items-center justify-center">
        <PageLoader size={40} />
      </div>
    ),
    ssr: true
  }
);

const ShuffleTestimonials = dynamic(
  () => import("@/components/ui/shuffle-testimonials"),
  {
    loading: () => (
      <div className="py-24 bg-background h-[400px] flex items-center justify-center">
        <PageLoader size={35} />
      </div>
    ),
    ssr: true
  }
);

const NewsletterSection = dynamic(
  () => import("@/components/home/NewsletterSection"),
  {
    loading: () => (
      <div className="py-16 bg-gray-950 h-[300px] flex items-center justify-center">
        <PageLoader size={30} />
      </div>
    ),
    ssr: true
  }
);

export default function HomeContent() {
  return (
    <>
      {/* Other sections are loaded dynamically */}
      <Suspense fallback={
        <div className="pt-32 pb-16 bg-background h-[600px] sm:h-[600px] md:h-[700px] flex items-center justify-center">
          <PageLoader size={40} />
        </div>
      }>
        <ProductShowcaseOrbital />
      </Suspense>

      <Suspense fallback={
        <div className="py-24 bg-background h-[400px] flex items-center justify-center">
          <PageLoader size={35} />
        </div>
      }>
        <ShuffleTestimonials />
      </Suspense>

      <Suspense fallback={
        <div className="py-16 bg-gray-950 h-[300px] flex items-center justify-center">
          <PageLoader size={30} />
        </div>
      }>
        <NewsletterSection />
      </Suspense>
    </>
  );
}
