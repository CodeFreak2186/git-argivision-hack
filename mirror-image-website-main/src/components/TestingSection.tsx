import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import ScrollSection from "./ScrollSection";
import testingData from "@/assets/testing-data.jpg";
import mangoLeaf from "@/assets/mango-leaf.png";

const TestingSection = () => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <>
      <ScrollSection backgroundImage={testingData} overlayOpacity={0.3} id-section="testing">
        <div className="container mx-auto px-6 md:px-12" ref={ref} id="testing">
          <div className="max-w-2xl">
            <motion.h2
              className="text-5xl md:text-7xl lg:text-8xl font-bold text-foreground leading-none"
              initial={{ opacity: 0, x: -80 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8 }}
            >
              SMART FARMING<br />KNOWLEDGE<br />HUB.
            </motion.h2>

            <motion.p
              className="mt-6 text-muted-foreground text-sm md:text-base max-w-lg font-light leading-relaxed"
              initial={{ opacity: 0, x: -40 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              LEARN WHAT TO SO ,WHEN TO DO,AND HOW TO IMPROVE YOUR MANGO YIELD WITH EXPERT RECOMMENDATIONS.
            </motion.p>
          </div>
        </div>
      </ScrollSection>

      <FinalSection />
    </>
  );
};

const FinalSection = () => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <ScrollSection backgroundImage={mangoLeaf} overlayOpacity={0.4}>
      <div className="container mx-auto px-6 md:px-12" ref={ref}>
        <div className="flex flex-col items-center text-center">
          <motion.h2
            className="text-5xl md:text-7xl lg:text-8xl font-bold text-foreground leading-none text-glow-green"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 1 }}
          >
            PROFILE.
          </motion.h2>

          <motion.p
            className="mt-6 text-muted-foreground text-base max-w-md font-light"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            THIS IS MY PROFILE 
          </motion.p>

          {/* Updated button wrapped in an anchor tag */}
          <motion.a
            href="https://farmkey.in/?srsltid=AfmBOoqAzwLFY-S3dhPG_9Tczb3hQM7cNy8uzzMoWFsRPfCuonSUUTCV"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-10 inline-block bg-primary text-primary-foreground px-8 py-3 text-sm font-medium rounded hover:opacity-90 transition-opacity uppercase tracking-wider"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            Explore Seeds
          </motion.a>
        </div>
      </div>
    </ScrollSection>
  );
};

export default TestingSection;