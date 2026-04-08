import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import heroMango from "@/assets/hero-mango.png";

const HeroSection = () => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.2]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <section
      ref={ref}
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      <motion.div className="absolute inset-0" style={{ scale }}>
        <img
          src={heroMango}
          alt="Mango revolutionized"
          className="w-full h-full object-cover"
          width={1920}
          height={1080}
        />
      </motion.div>

      <div className="absolute inset-0 hero-gradient" />

      <motion.div
        className="relative z-10 text-center px-6"
        style={{ y: textY, opacity: textOpacity }}
      >
        <motion.h1
          className="text-6xl md:text-8xl lg:text-9xl font-bold text-foreground text-glow-green leading-none"
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
        >
          MANGO<br />VISION
        </motion.h1>

        <motion.p
          className="mt-6 text-muted-foreground text-sm md:text-base max-w-md mx-auto font-light"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.7 }}
        >
         AI-Powered Smart Farming System - Detect mango diseases early, analyze orchard health, and make better decisions using real-time drone insights.
        </motion.p>
      </motion.div>

      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <div className="w-6 h-10 border-2 border-muted-foreground rounded-full flex justify-center pt-2">
          <div className="w-1 h-2 bg-primary rounded-full" />
        </div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
