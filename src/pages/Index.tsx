
import React, { useEffect } from "react";
import HeroSection from "@/components/HeroSection";
import FeatureSection from "@/components/FeatureSection";
import LocationSection from "@/components/LocationSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import DistributionSection from "@/components/DistributionSection";
import Footer from "@/components/Footer";

const Index = () => {
  useEffect(() => {
    // Update page title and meta
    document.title = "Bats Energy Drink | A Energia que Move o Futuro";
    
    // Smooth scroll behavior for the entire page
    document.documentElement.style.scrollBehavior = "smooth";
    
    return () => {
      document.documentElement.style.scrollBehavior = "auto";
    };
  }, []);

  return (
    <main className="relative min-h-screen bg-bats-dark text-white overflow-hidden">
      <HeroSection />
      <FeatureSection />
      <LocationSection />
      <TestimonialsSection />
      <DistributionSection />
      <Footer />
    </main>
  );
};

export default Index;
