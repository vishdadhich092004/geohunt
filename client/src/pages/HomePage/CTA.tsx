import { Button } from "@/components/ui/button";
import { useAuthContext } from "@/contexts/AuthContext";
import { ArrowRight, Globe } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useRef, useEffect, useState } from "react";

const CTA = () => {
  const { isAuthenticated } = useAuthContext();
  const navigate = useNavigate();
  const sectionRef = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.disconnect();
      }
    };
  }, []);

  const handlePlayNow = () => {
    if (isAuthenticated) {
      navigate("/user-choice");
    } else {
      navigate("/new-user");
    }
  };

  return (
    <div ref={sectionRef} className="relative py-24 overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 bg-primary/10" />
      <div
        className="absolute inset-0 bg-cover bg-center opacity-10"
        style={{
          backgroundImage:
            'url("https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?auto=format&fit=crop&q=80")',
        }}
      />

      {/* Animated grid overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#232323_1px,transparent_1px),linear-gradient(to_bottom,#232323_1px,transparent_1px)] bg-[size:2rem_2rem] opacity-20" />

      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-primary/10 rounded-full blur-[100px]" />
      <div className="absolute bottom-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-[100px]" />

      <div className="container mx-auto px-4 relative">
        <div className="max-w-3xl mx-auto text-center">
          <div
            className={`inline-flex items-center justify-center space-x-2 bg-white/5 px-6 py-2 rounded-2xl backdrop-blur-xl border border-white/10 hover:border-white/20 transition-all duration-500 mb-6 opacity-0 ${
              inView ? "animate-fade-in" : ""
            }`}
            style={{ animationDelay: "100ms", animationFillMode: "forwards" }}
          >
            <Globe className="w-5 h-5 text-primary" />
            <span className="text-white/80 font-medium">Join Now</span>
          </div>

          <h2
            className={`text-4xl md:text-5xl font-bold mb-6 opacity-0 ${
              inView ? "animate-fade-in" : ""
            }`}
            style={{ animationDelay: "200ms", animationFillMode: "forwards" }}
          >
            Ready to Start Your{" "}
            <span className="block bg-gradient-to-r from-primary to-primary/50 bg-clip-text text-transparent py-0.5">
              Geographic Adventure?
            </span>
          </h2>

          <p
            className={`text-xl text-muted-foreground mb-8 opacity-0 ${
              inView ? "animate-fade-in" : ""
            }`}
            style={{ animationDelay: "300ms", animationFillMode: "forwards" }}
          >
            Join thousands of players worldwide in the ultimate geography
            guessing game. Start playing for free today!
          </p>

          <Button
            onClick={handlePlayNow}
            size="lg"
            className={`opacity-0 ${
              inView ? "animate-fade-in" : ""
            } group bg-primary hover:bg-primary/90 text-white h-14 px-8 rounded-xl shadow-lg shadow-primary/20 hover:shadow-primary/30 transition-all`}
            style={{ animationDelay: "400ms", animationFillMode: "forwards" }}
          >
            Start Playing Free
            <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Button>

          {/* Floating elements */}
          <div className="absolute -top-10 -left-10 w-20 h-20 rounded-full border border-primary/20 opacity-20 animate-float" />
          <div
            className="absolute top-20 right-0 w-10 h-10 rounded-full border border-primary/20 opacity-20 animate-float"
            style={{ animationDelay: "1s" }}
          />
          <div
            className="absolute bottom-0 left-20 w-16 h-16 rounded-full border border-primary/20 opacity-20 animate-float"
            style={{ animationDelay: "2s" }}
          />
        </div>
      </div>
    </div>
  );
};

export default CTA;
