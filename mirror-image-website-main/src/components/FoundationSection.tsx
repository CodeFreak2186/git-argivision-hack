import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import ScrollSection from "./ScrollSection";
import mangoOrchard from "@/assets/mango-orchard.png";

const FoundationSection = () => {
  const textRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(textRef, { once: true, margin: "-100px" });

  return (
    <ScrollSection backgroundImage={mangoOrchard} overlayOpacity={0.4} id-section="foundation">
      <div className="container mx-auto px-6 md:px-12" ref={textRef} id="foundation">
        <div className="max-w-2xl">
          <motion.h2
            className="text-5xl md:text-7xl lg:text-8xl font-bold text-foreground leading-none"
            initial={{ opacity: 0, x: -80 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            YOUR FARM AT<br />A GLANCE.
          </motion.h2>

          <motion.p
            className="mt-6 text-muted-foreground text-sm md:text-base max-w-lg font-light leading-relaxed"
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
          >
            MONITOR MANGO HEALTH, TRACK INSIGHTS AND GET REAL TIME UPDATES AND ALERTS FROM YOUR ORCHARD.
          </motion.p>
        </div>
      </div>
    </ScrollSection>
  );
};

export default FoundationSection;
