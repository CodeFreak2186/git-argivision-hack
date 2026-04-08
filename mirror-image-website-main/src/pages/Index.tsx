import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import FoundationSection from "@/components/FoundationSection";
import NetworkSection from "@/components/NetworkSection";
import BreedersSection from "@/components/BreedersSection";
import FieldSection from "@/components/FieldSection";
import TestingSection from "@/components/TestingSection";

const Index = () => {
  return (
    <div className="bg-background overflow-x-hidden">
      <Navbar />
      <HeroSection />
      <FoundationSection />
      <NetworkSection />
      <BreedersSection />
      <FieldSection />
      <TestingSection />

      <footer className="py-8 border-t border-border text-center">
        <p className="text-muted-foreground text-xs uppercase font-mono tracking-widest">
          MangoVision AI Operations :: Remote Intelligence Center
        </p>
      </footer>
    </div>
  );
};

export default Index;
