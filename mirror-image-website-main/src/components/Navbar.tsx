import { motion } from "framer-motion";
import { Leaf } from "lucide-react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <motion.nav
      className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-12 py-4 shadow-sm"
      initial={{ y: -80 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      style={{ background: "linear-gradient(to bottom, hsl(0 0% 0% / 0.9), hsl(0 0% 5% / 0.5))" }}
    >
      <Link to="/" className="flex items-center gap-2">
        <Leaf className="w-6 h-6 text-primary" />
        <span className="font-bold text-lg tracking-widest text-foreground" style={{ fontFamily: "'Oswald', sans-serif" }}>
          MANGOVISION AI
        </span>
      </Link>

      <div className="hidden md:flex items-center gap-8">
        <Link to="/" className="text-sm text-muted-foreground hover:text-foreground transition-colors font-medium">Home</Link>
        <Link to="/dashboard" className="text-sm text-muted-foreground hover:text-foreground transition-colors font-medium">Dashboard</Link>
        <Link to="/monitoring" className="text-sm text-muted-foreground hover:text-foreground transition-colors font-medium">Monitoring</Link>
        <Link to="/telemetry" className="text-sm text-muted-foreground hover:text-foreground transition-colors font-medium">Telemetry</Link>
        <Link to="/webtest" className="text-sm text-muted-foreground hover:text-foreground transition-colors font-medium">Web Test</Link>
      </div>

      <button className="bg-primary text-primary-foreground px-5 py-2 text-sm font-medium rounded hover:opacity-90 transition-opacity">
        PROFILE 
      </button>
    </motion.nav>
  );
};

export default Navbar;
