import { CTA } from "./HomePage/CTA";
import { Features } from "./HomePage/Features";
import { Hero } from "./HomePage/Hero";
import { FeatureAnnouncement } from "@/components/FeatureAnnouncement";

function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      <FeatureAnnouncement />
      <Hero />
      <Features />
      <CTA />
    </div>
  );
}

export default HomePage;
