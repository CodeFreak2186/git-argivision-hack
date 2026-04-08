import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import ScrollSection from "./ScrollSection";
import seedling from "@/assets/seedling.jpg";

const BreedersSection = () => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <ScrollSection backgroundImage={seedling} overlayOpacity={0.45} id-section="breeders">
      <div className="container mx-auto px-6 md:px-12" ref={ref} id="breeders">
        <div className="max-w-2xl">
          <motion.h2
            className="text-5xl md:text-7xl lg:text-8xl font-bold text-foreground leading-none"
            initial={{ opacity: 0, x: -80 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            REAL TIME <br />MANGO <br />MONITORING.
          </motion.h2>

          <motion.p
            className="mt-6 text-muted-foreground text-sm md:text-base max-w-lg font-light leading-relaxed"
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            ANALYZE DRONE CAPTURED IMAGES TO DETECT MANGO DISEASES EARLY, ASSESS ORCHARD HEALTH, AND MAKE INFORMED DECISIONS WITH REAL-TIME INSIGHTS.
          </motion.p>
        </div>
      </div>
    </ScrollSection>
  );
};

export default BreedersSection;
