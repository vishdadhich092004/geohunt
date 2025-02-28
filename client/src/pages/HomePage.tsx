import { lazy, Suspense } from "react";
import { Loader2 } from "lucide-react";

const CTA = lazy(() => import("./HomePage/CTA"));
const Features = lazy(() => import("./HomePage/Features"));
const Hero = lazy(() => import("./HomePage/Hero"));
const NewFeatures = lazy(() => import("./HomePage/NewFeatures"));

function HomePage() {
  return (
    <div className="min-h-screen bg-background text-foreground overflow-hidden">
      <Hero />
      <Suspense
        fallback={
          <div className="flex items-center justify-center min-h-[50vh] bg-gradient-to-br from-zinc-900 via-black to-zinc-900">
            <Loader2 className="w-10 h-10 text-primary animate-spin" />
          </div>
        }
      >
        <NewFeatures />
      </Suspense>
      <Features />
      <CTA />
    </div>
  );
}

export default HomePage;
