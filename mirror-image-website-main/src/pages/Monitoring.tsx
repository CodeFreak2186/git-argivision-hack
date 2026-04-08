import Navbar from "@/components/Navbar";
import { motion } from "framer-motion";
import { Video, Box, Maximize2, Settings, Zap, Signal } from "lucide-react";
import { useEffect, useState } from "react";

const Monitoring = () => {
  const [telemetry, setTelemetry] = useState({
    altitude: 0,
    battery: 100,
    health: "Connecting...",
    status: "Standby",
    flight_mode: "STABILIZE"
  });

  useEffect(() => {
    const interval = setInterval(async () => {
      try {
        const response = await fetch('http://localhost:5000/get_telemetry');
        if (response.ok) {
          const data = await response.json();
          setTelemetry(data);
        }
      } catch (err) {
        console.error("Telemetry fetch failed. Ensure server is running at http://localhost:5000");
      }
    }, 1000);
    return () => clearInterval(interval);
  }, []);
  
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      <Navbar />
      <div className="pt-24 px-6 md:px-12 pb-12 h-screen flex flex-col">
        <header className="mb-8 flex justify-between items-end">
          <div>
            <h1 className="text-4xl font-bold flex items-center gap-3">
              Drone Live Monitoring
              <span className="flex items-center gap-2 bg-red-500/10 text-red-500 text-xs px-3 py-1 rounded-full border border-red-500/20 animate-pulse">
                <span className="w-2 h-2 bg-red-500 rounded-full" /> LIVE
              </span>
            </h1>
            <p className="text-muted-foreground mt-1">Real-time telemetry and visual feedback from Drone-01.</p>
          </div>
          <div className="flex gap-4">
             <div className="bg-white/5 px-4 py-2 rounded-lg border border-white/10 flex items-center gap-3">
                <Signal className="w-4 h-4 text-green-500" />
                <span className="text-xs font-mono">28.6139° N, 77.2090° E</span>
             </div>
          </div>
        </header>

        <div className="flex-1 grid grid-cols-1 lg:grid-cols-3 gap-6 min-h-0">
          {/* Main Feed Container */}
          <div className="lg:col-span-2 relative group overflow-hidden rounded-3xl border border-white/10 bg-black">
             {/* 1. Video Layer */}
             <div className="absolute inset-0 bg-[#0f0f0f] flex items-center justify-center">
                <div className="text-center">
                  <Video className="w-12 h-12 text-white/10 mx-auto mb-4" />
                  <p className="text-white/30 text-sm font-light">Waiting for Raspberry Pi video stream...</p>
                  <code className="text-[10px] text-primary/50 block mt-2 opacity-50 tracking-tighter">ENDPOINT: WS://PI_IP:5000/FEED</code>
                </div>
             </div>
             
             {/* 2. Scanning Effect Overlay */}
             <div className="absolute inset-0 pointer-events-none overflow-hidden">
                <motion.div 
                  initial={{ top: '-10%' }}
                  animate={{ top: '110%' }}
                  transition={{ duration: 5, repeat: Infinity, ease: 'linear' }}
                  className="w-full h-1/3 bg-gradient-to-b from-transparent via-primary/5 to-transparent z-20 border-t border-primary/20"
                />
             </div>

             {/* 3. Controls UI Overlay */}
             <div className="absolute inset-0 pointer-events-none p-6 flex flex-col justify-between">
                <div className="flex justify-between items-start pointer-events-auto">
                   <div className="bg-black/80 backdrop-blur-xl px-4 py-3 rounded-2xl border border-white/10">
                      <div className="text-[10px] text-muted-foreground uppercase mb-1 tracking-widest font-bold">Battery</div>
                      <div className="flex items-center gap-2">
                         <Zap className="w-4 h-4 text-yellow-500" />
                         <span className="font-bold text-lg">{telemetry.battery}%</span>
                      </div>
                   </div>
                   <div className="bg-black/80 backdrop-blur-xl p-3 rounded-2xl border border-white/10 flex gap-4">
                      <button className="hover:text-primary transition-colors"><Maximize2 className="w-4 h-4" /></button>
                      <button className="hover:text-primary transition-colors"><Settings className="w-4 h-4" /></button>
                   </div>
                </div>
                
                <div className="bg-black/60 backdrop-blur-md p-5 rounded-2xl border border-white/10 self-start pointer-events-auto max-w-xs">
                   <div className="text-xs font-mono space-y-2">
                      <div className="flex justify-between gap-12 border-b border-white/5 pb-1">
                        <span className="text-muted-foreground">ALTITUDE</span> 
                        <span className="text-primary font-bold">{telemetry.altitude}m</span>
                      </div>
                      <div className="flex justify-between gap-12 border-b border-white/5 pb-1">
                        <span className="text-muted-foreground">HEALTH</span> 
                        <span className="text-primary font-bold uppercase">{telemetry.health}</span>
                      </div>
                      <div className="flex justify-between gap-12 border-b border-white/5 pb-1">
                        <span className="text-muted-foreground">MODE</span> 
                        <span className="text-primary font-bold uppercase">{telemetry.flight_mode}</span>
                      </div>
                      <div className="flex justify-between gap-12">
                        <span className="text-muted-foreground">STATUS</span> 
                        <span className="text-primary font-bold uppercase">{telemetry.status}</span>
                      </div>
                   </div>
                </div>
             </div>
          </div>

          {/* Right Panel: 3D View and Intelligence */}
          <div className="flex flex-col gap-6">
             <div className="flex-1 bg-white/[0.03] border border-white/10 rounded-3xl p-6 relative overflow-hidden flex flex-col">
                <h3 className="text-lg font-semibold flex items-center gap-2 mb-4">
                  <Box className="w-5 h-5 text-primary" />
                  3D Field Reconstruction
                </h3>
                <div className="flex-1 flex flex-col items-center justify-center border border-white/5 rounded-2xl bg-black/40 relative">
                   {/* Perspective Grid */}
                   <div 
                     className="absolute inset-0 opacity-10"
                     style={{
                        backgroundImage: `linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)`,
                        backgroundSize: '40px 40px',
                        perspective: '800px',
                        transform: 'rotateX(65deg) scale(2.5)',
                        transformOrigin: 'center bottom'
                     }}
                   />
                   
                   {/* Marker */}
                   <motion.div 
                     animate={{ 
                        x: [0, 60, -60, 0],
                        y: [0, -40, 40, 0]
                     }}
                     transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
                     className="relative z-10 text-center"
                   >
                     <div className="w-20 h-20 bg-primary/10 rounded-2xl flex items-center justify-center border border-primary/40 backdrop-blur-sm mb-3">
                        <Box className="w-10 h-10 text-primary" />
                     </div>
                     <div className="text-[9px] font-mono text-primary bg-black/90 border border-primary/20 px-3 py-1 rounded-full uppercase tracking-tighter">X-RAY_PROJECTION_ACTIVE</div>
                   </motion.div>

                   <div className="absolute top-4 right-4 flex flex-col gap-2 items-end">
                      <div className="w-24 h-1.5 bg-white/5 rounded-full overflow-hidden">
                        <motion.div 
                           animate={{ width: ['0%', '100%'] }}
                           transition={{ duration: 10, repeat: Infinity }}
                           className="h-full bg-primary" 
                        />
                      </div>
                      <div className="text-[8px] font-mono opacity-40 text-white uppercase">RECONSTITUTING_MESH...</div>
                   </div>
                </div>
                <p className="text-[10px] text-muted-foreground mt-4 leading-relaxed opacity-60">
                  Dynamic mesh generation in progress. Analyzing vegetation density and canopy health across Block C-14.
                </p>
             </div>

             <div className="h-48 bg-gradient-to-br from-primary/10 to-transparent border border-white/10 rounded-3xl p-6">
                <h4 className="text-xs font-bold mb-4 uppercase text-muted-foreground tracking-widest">Signal Intelligence</h4>
                <div className="space-y-4">
                   <StatusRow label="UPLINK" status="940 Mbps" color="text-green-500" />
                   <StatusRow label="FRAME_SYNC" status="LOCKED" color="text-primary" />
                   <StatusRow label="ENCODING" status="H.265 / UHD" color="text-yellow-500" />
                </div>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

interface StatusRowProps {
  label: string;
  status: string;
  color: string;
}

const StatusRow = ({ label, status, color }: StatusRowProps) => (
  <div className="flex justify-between items-center text-[10px] font-mono">
    <span className="text-muted-foreground">{label}</span>
    <span className={`font-bold ${color}`}>{status}</span>
  </div>
);

export default Monitoring;
