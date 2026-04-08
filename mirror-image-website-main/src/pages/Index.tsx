import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, Eye, Activity, ShieldCheck, Compass } from "lucide-react";

interface FeatureCardProps {
  to: string;
  icon: React.ReactNode;
  title: string;
  desc: string;
}

const FeatureCard = ({ to, icon, title, desc }: FeatureCardProps) => (
  <Link to={to}>
    <motion.div 
      whileHover={{ y: -10 }}
      className="bg-white/[0.03] backdrop-blur-xl border border-white/10 p-8 rounded-3xl hover:border-primary/50 transition-all group"
    >
      <div className="mb-6">{icon}</div>
      <h3 className="text-xl font-bold mb-3">{title}</h3>
      <p className="text-sm text-muted-foreground leading-relaxed mb-6">{desc}</p>
      <div className="flex items-center gap-2 text-primary font-bold text-xs uppercase tracking-widest">
        Launch Module <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
      </div>
    </motion.div>
  </Link>
);

const Index = () => {
  return (
    <div className="bg-[#0a0a0a] overflow-x-hidden min-h-screen text-white">
      <Navbar />
      <HeroSection />
      
      <main className="relative z-10 px-6 md:px-12 pb-24">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-[-100px]">
          <FeatureCard 
            to="/monitoring"
            icon={<Eye className="w-8 h-8 text-primary" />}
            title="Monitoring" 
            desc="Live webcam feed and 3D terrain reconstruction."
          />
          <FeatureCard 
            to="/telemetry"
            icon={<Compass className="w-8 h-8 text-primary" />}
            title="Telemetry" 
            desc="Real-time Pixhawk metrics, GPS, and system health."
          />
          <FeatureCard 
            to="/dashboard"
            icon={<Activity className="w-8 h-8 text-primary" />}
            title="Orchard Health" 
            desc="Deep analytics on mango tree growth and soil."
          />
          <FeatureCard 
            to="/webtest"
            icon={<ShieldCheck className="w-8 h-8 text-primary" />}
            title="AI Diagnosis" 
            desc="Upload leaf samples for instant disease detection."
          />
        </div>
      </main>

      <footer className="py-12 border-t border-white/5 bg-black/50 text-center">
        <p className="text-muted-foreground text-xs font-mono uppercase tracking-[0.2em]">
          Powered by MangoVision AI & Raspberry Pi Edge Computing
        </p>
      </footer>
    </div>
  );
};

export default Index;
