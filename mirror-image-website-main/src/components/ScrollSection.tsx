import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, type ReactNode } from "react";

interface ScrollSectionProps {
  children: ReactNode;
  backgroundImage: string;
  className?: string;
  overlayOpacity?: number;
}

const ScrollSection = ({
  children,
  backgroundImage,
  className = "",
  overlayOpacity = 0.5,
}: ScrollSectionProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);

  return (
    <section
      ref={ref}
      className={`relative min-h-screen flex items-center overflow-hidden ${className}`}
    >
      <motion.div
        className="absolute inset-0 w-full h-[120%] -top-[10%]"
        style={{ y }}
      >
        <img
          src={backgroundImage}
          alt=""
          className="w-full h-full object-cover"
          loading="lazy"
        />
      </motion.div>

      <div
        className="absolute inset-0"
        style={{ backgroundColor: `hsl(0 0% 0% / ${overlayOpacity})` }}
      />

      <motion.div
        className="relative z-10 w-full"
        style={{ opacity }}
      >
        {children}
      </motion.div>
    </section>
  );
};

export default ScrollSection;
