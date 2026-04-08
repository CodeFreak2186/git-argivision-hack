import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import ScrollSection from "./ScrollSection";
import networkGreen from "@/assets/network-green.jpg";

const NetworkSection = () => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <ScrollSection backgroundImage={networkGreen} overlayOpacity={0.3}>
      <div className="container mx-auto px-6 md:px-12" ref={ref}>
        <div className="flex flex-col items-center text-center">
          <motion.div
            className="w-24 h-24 rounded-full border-2 border-primary flex items-center justify-center mb-8"
            initial={{ scale: 0, opacity: 0 }}
            animate={isInView ? { scale: 1, opacity: 1 } : {}}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <span className="text-xs text-primary font-medium uppercase tracking-wider">Simulate</span>
          </motion.div>

          <motion.h2
            className="text-5xl md:text-7xl font-bold text-foreground leading-none"
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            WHERE DATA MEETS REAL-TIME<br />FIELS INTELLIGENCE.
          </motion.h2>

          <motion.p
            className="mt-6 text-muted-foreground text-sm max-w-md font-light"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            SEAMLESSLY MOVE FROM DASHBOARD INSIGHTS TO LIVE MANGO MONITORING AND AI DRIVEN ANALYSIS.
          </motion.p>
        </div>
      </div>
    </ScrollSection>
  );
};

export default NetworkSection;
