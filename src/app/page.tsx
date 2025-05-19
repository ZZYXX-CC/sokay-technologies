'use client';

export const dynamic = "force-dynamic";

import { Suspense } from "react";
import MainLayout from "@/components/layout/MainLayout";
import { LandingHero } from "@/components/ui/landing-hero";
import HomeContent from "@/components/home/HomeContent";
import { PageLoader } from "@/components/ui/page-loader";

// HomePage component with Suspense boundary
function HomePage() {
  return (
    <>
      {/* Hero section is loaded immediately for better UX */}
      <LandingHero />

      {/* All dynamic content is now in the HomeContent client component */}
      <HomeContent />
    </>
  );
}

export default function Home() {
  return (
    <MainLayout>
      <Suspense fallback={
        <div className="h-screen w-full flex items-center justify-center">
          <PageLoader size={40} />
        </div>
      }>
        <HomePage />
      </Suspense>
    </MainLayout>
  );
}
