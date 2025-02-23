import {
  lazy,
  // Suspense
} from "react";

const CTA = lazy(() => import("./HomePage/CTA"));
const Features = lazy(() => import("./HomePage/Features"));
const Hero = lazy(() => import("./HomePage/Hero"));
const FeatureAnnouncement = lazy(
  () => import("@/components/HeroSection/FeatureAnnouncement")
);
// const NewFeatures = lazy(() => import("./HomePage/NewFeatures"));

function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      <Hero />
      <FeatureAnnouncement />
      {/* <Suspense>
        <NewFeatures />
      </Suspense> */}
      <Features />
      <CTA />
    </div>
  );
}

export default HomePage;
