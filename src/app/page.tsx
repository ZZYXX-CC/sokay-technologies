import MainLayout from "@/components/layout/MainLayout";
import { LandingHero } from "@/components/ui/landing-hero";
import HomeContent from "@/components/home/HomeContent";

export default function Home() {
  return (
    <MainLayout>
      {/* Hero section is loaded immediately for better UX */}
      <LandingHero />

      {/* All dynamic content is now in the HomeContent client component */}
      <HomeContent />
    </MainLayout>
  );
}
