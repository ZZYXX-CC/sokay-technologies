"use client";

import Link from 'next/link';
import './marquee.css';
import NewsletterSection from '@/components/home/NewsletterSection';
import MainLayout from '@/components/layout/MainLayout';
import HeroSection from '@/components/about/HeroSection';
import TechnologySection from '@/components/about/TechnologySection';
import WhoWeAreSection from '@/components/about/WhoWeAreSection';

// Metadata needs to be in a separate file for client components
// We'll handle this with the layout.tsx file

export default function AboutPage() {

  return (
    <MainLayout>
      <div className="flex min-h-screen flex-col items-center bg-isabelline text-prussian_blue font-geist-sans">
        {/* Hero Section with Aurora Background */}
        <HeroSection />

      {/* CTA Banner */}
      <section className="w-full">
        <div className="marquee-container">
          <div className="marquee-content">
            {Array(12).fill(0).map((_, index) => (
              <div key={`first-${index}`} className="marquee-item">
                <Link href="/store" className="marquee-link">
                  try now
                </Link>
                <span className="marquee-dot">•</span>
              </div>
            ))}
          </div>

          <div className="marquee-content2">
            {Array(12).fill(0).map((_, index) => (
              <div key={`second-${index}`} className="marquee-item">
                <Link href="/store" className="marquee-link">
                  try now
                </Link>
                <span className="marquee-dot">•</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Who We Are Section */}
      <WhoWeAreSection />

      {/* Technology Grid Section with Enhanced Background */}
      <TechnologySection />

      {/* Newsletter Section */}
      <NewsletterSection />
      </div>
    </MainLayout>
  );
}
