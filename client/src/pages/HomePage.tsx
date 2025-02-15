import { CTA } from "./HomePage/CTA";
import { Features } from "./HomePage/Features";
import { Hero } from "./HomePage/Hero";
import { FeatureAnnouncement } from "@/components/HeroSection/FeatureAnnouncement";

function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      <Hero />
      <FeatureAnnouncement />
      <Features />
      <CTA />
    </div>
  );
}

export default HomePage;
