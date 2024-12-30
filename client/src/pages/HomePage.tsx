import { CTA } from "./HomePage/CTA";
import { Features } from "./HomePage/Features";
import { Hero } from "./HomePage/Hero";
import { Navbar } from "./HomePage/Navbar";

function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <Hero />
      <Features />
      <CTA />
    </div>
  );
}

export default HomePage;
