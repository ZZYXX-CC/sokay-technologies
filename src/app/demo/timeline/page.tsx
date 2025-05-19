'use client';

import { Suspense } from "react";
import { RadialOrbitalTimelineDemo } from "@/components/ui/radial-orbital-timeline-demo";
import { PageLoader } from "@/components/ui/page-loader";

export default function TimelineDemoPage() {
  return (
    <div className="w-full h-[calc(100vh-80px)] min-h-[600px] flex items-center justify-center">
      <Suspense fallback={
        <div className="flex items-center justify-center">
          <PageLoader size={40} />
        </div>
      }>
        <RadialOrbitalTimelineDemo />
      </Suspense>
    </div>
  );
}
