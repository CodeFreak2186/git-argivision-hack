import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import ScrollSection from "./ScrollSection";
import mangoOrchard from "@/assets/mango-orchard.png";

const FieldSection = () => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <ScrollSection backgroundImage={mangoOrchard} overlayOpacity={0.35} id-section="field">
      <div className="container mx-auto px-6 md:px-12" ref={ref} id="field">
        <div className="max-w-2xl">
          <motion.h2
            className="text-5xl md:text-7xl lg:text-8xl font-bold text-foreground leading-none"
            initial={{ opacity: 0, x: -80 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            
            GROW SMARTER <br />WITH AI.
          </motion.h2>

          <motion.p
            className="mt-6 text-muted-foreground text-sm md:text-base max-w-lg font-light leading-relaxed"
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            GET PERSONALIZED MANGO RECOMMENDATIONS BASED ON THE GROWTH FACTORS.
          </motion.p>

          <motion.div
            className="mt-8 flex gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            <div className="w-16 h-16 rounded-full border border-muted-foreground flex items-center justify-center">
              <span className="text-[10px] text-muted-foreground uppercase tracking-wider">get recomendation</span>
            </div>
          </motion.div>
        </div>
      </div>
    </ScrollSection>
  );
};

export default FieldSection;
