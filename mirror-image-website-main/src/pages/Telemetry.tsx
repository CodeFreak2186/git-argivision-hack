import Navbar from "@/components/Navbar";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { 
  Signal, Cpu, Battery, Compass, ArrowUp, ArrowRight, 
  MapPin, Activity, Gauge, Wifi, Satellite, Settings
} from "lucide-react";

const Telemetry = () => {
  const [isConnected, setIsConnected] = useState(false);
  const [data, setData] = useState({
    altitude: 0,
    battery: 98,
    health: "Normal",
    status: "Active",
    heading: 45,
    pitch: 1.2,
    roll: -0.5,
    gnss_satellites: 12,
    climb_rate: 0.1,
    ground_speed: 1.5,
    flight_mode: "AUTO",
    vibration: "Low",
    cpu_load: 34,
    link_quality: 92
  });

  useEffect(() => {
    const interval = setInterval(async () => {
      try {
        const response = await fetch('http://localhost:5000/get_telemetry');
        const result = await response.json();
        setData(prev => ({
          ...prev,
          ...result
        }));
        setIsConnected(true);
      } catch (err) {
        setIsConnected(false);
        console.error("Telemetry fetch failed", err);
      }
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-[#070707] text-white">
      <Navbar />
      <div className="pt-24 px-6 md:px-12 pb-24 max-w-7xl mx-auto">
        
        <header className="mb-12 flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
          <div>
            <div className={`flex items-center gap-2 text-xs font-mono mb-2 ${isConnected ? 'text-primary' : 'text-red-500'}`}>
              <span className={`w-2 h-2 rounded-full ${isConnected ? 'bg-primary animate-ping' : 'bg-red-500'}`} />
              {isConnected ? 'SYSTEM_LINK_ESTABLISHED :: PIXHAWK_CONNECTED' : 'SYSTEM_OFFLINE :: CHECK_PI_SERVER'}
            </div>
            <h1 className="text-4xl font-bold tracking-tight uppercase font-mono text-primary">DRONE_TELEMETRY</h1>
            <p className="text-muted-foreground mt-2">Extended diagnostics and Pixhawk internal metrics.</p>
          </div>
          <div className="flex gap-4">
            <div className="bg-white/5 border border-white/10 px-4 py-2 rounded-xl flex items-center gap-3">
              <Wifi className="w-4 h-4 text-green-500" />
              <div className="text-[10px] font-mono">
                <div className="text-muted-foreground">LINK</div>
                <div className="text-white">RSSI: -64dBm</div>
              </div>
            </div>
            <div className="bg-white/5 border border-white/10 px-4 py-2 rounded-xl flex items-center gap-3">
              <Satellite className="w-4 h-4 text-primary" />
              <div className="text-[10px] font-mono">
                <div className="text-muted-foreground">GNSS</div>
                <div className="text-white">SATS: {data.gnss_satellites}</div>
              </div>
            </div>
          </div>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <DataCard label="FLIGHT MODE" value={data.flight_mode} color="text-primary" />
          <DataCard label="ALTITUDE" value={`${data.altitude}m`} color="text-white" />
          <DataCard label="BATTERY" value={`${data.battery}%`} color="text-yellow-500" />
          <DataCard label="HEALTH" value={data.health} color="text-green-500" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Internal Metrics */}
          <div className="lg:col-span-2 space-y-8">
            <section className="bg-white/[0.03] border border-white/10 rounded-3xl p-8 backdrop-blur-xl">
              <h3 className="text-lg font-mono font-bold mb-8 flex items-center gap-3 border-b border-white/5 pb-4">
                <Cpu className="w-5 h-5 text-primary" /> CORE_METRICS
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                <div className="space-y-6">
                   <MetricRow label="CPU Load" value={`${data.cpu_load}%`} progress={data.cpu_load} />
                   <MetricRow label="Link Quality" value={`${data.link_quality}%`} progress={data.link_quality} />
                   <MetricRow label="Climb Rate" value={`${data.climb_rate} m/s`} progress={data.climb_rate * 10} />
                   <MetricRow label="Ground Speed" value={`${data.ground_speed} m/s`} progress={data.ground_speed * 5} />
                </div>
                <div className="space-y-6">
                   <div className="bg-black/40 p-6 rounded-2xl border border-white/5">
                      <div className="text-[10px] text-muted-foreground uppercase mb-4 tracking-widest font-mono">Attitude Matrix</div>
                      <div className="flex justify-between items-center text-sm font-mono mb-4">
                         <span>PITCH</span>
                         <span className="text-primary">{data.pitch}°</span>
                      </div>
                      <div className="flex justify-between items-center text-sm font-mono mb-4">
                         <span>ROLL</span>
                         <span className="text-primary">{data.roll}°</span>
                      </div>
                      <div className="flex justify-between items-center text-sm font-mono">
                         <span>HEADING</span>
                         <span className="text-primary">{data.heading}°</span>
                      </div>
                   </div>
                </div>
              </div>
            </section>

            <section className="bg-white/[0.03] border border-white/10 rounded-3xl p-8 backdrop-blur-xl">
              <h3 className="text-lg font-mono font-bold mb-8 flex items-center gap-3 border-b border-white/5 pb-4">
                <MapPin className="w-5 h-5 text-primary" /> POSITION_DIAGNOSTICS
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
                 <div className="p-6 bg-black/40 rounded-2xl border border-white/5">
                    <div className="text-[10px] text-muted-foreground mb-1 uppercase">Longitude</div>
                    <div className="text-lg font-mono">77.20902 E</div>
                 </div>
                 <div className="p-6 bg-black/40 rounded-2xl border border-white/5">
                    <div className="text-[10px] text-muted-foreground mb-1 uppercase">Latitude</div>
                    <div className="text-lg font-mono">28.61394 N</div>
                 </div>
                 <div className="p-6 bg-black/40 rounded-2xl border border-white/5">
                    <div className="text-[10px] text-muted-foreground mb-1 uppercase">GPS_FIX</div>
                    <div className="text-lg font-mono text-green-500">3D_FIX</div>
                 </div>
              </div>
            </section>
          </div>

          {/* Right Panel */}
          <div className="space-y-8">
            <section className="bg-primary/5 border border-primary/20 rounded-3xl p-8 backdrop-blur-xl">
              <h3 className="text-lg font-mono font-bold mb-6 flex items-center gap-3">
                <Settings className="w-5 h-5 text-primary" /> SYSTEM_TASKS
              </h3>
              <div className="space-y-4">
                <TaskItem label="Pixhawk Calibration" status="COMPLETE" />
                <TaskItem label="RTL Parameters" status="UPLOADED" />
                <TaskItem label="Geofence Check" status="ACTIVE" />
                <TaskItem label="Vibration Filter" status="NOMINAL" />
              </div>
            </section>

            <div className="bg-white/5 border border-white/10 rounded-3xl p-8 overflow-hidden relative">
               <div className="absolute -right-8 -bottom-8 opacity-10">
                  <Compass className="w-48 h-48 text-primary" />
               </div>
               <h4 className="text-sm font-mono font-bold mb-4 uppercase tracking-widest text-muted-foreground">Orientation Visual</h4>
               <div className="flex justify-center items-center py-8">
                  <motion.div 
                    animate={{ rotate: data.heading }}
                    className="w-32 h-32 rounded-full border-2 border-primary/30 flex items-center justify-center relative"
                  >
                    <div className="w-1 h-12 bg-primary rounded-full absolute -top-1" />
                    <Compass className="w-12 h-12 text-primary" />
                  </motion.div>
               </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const DataCard = ({ label, value, color }: any) => (
  <div className="bg-white/[0.03] border border-white/10 p-6 rounded-2xl backdrop-blur-xl">
    <div className="text-[10px] text-muted-foreground uppercase tracking-widest font-mono mb-2">{label}</div>
    <div className={`text-2xl font-bold font-mono ${color}`}>{value}</div>
  </div>
);

const MetricRow = ({ label, value, progress }: any) => (
  <div className="space-y-2">
    <div className="flex justify-between text-xs font-mono">
      <span className="text-muted-foreground">{label}</span>
      <span className="text-primary uppercase">{value}</span>
    </div>
    <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden">
      <motion.div 
        initial={{ width: 0 }}
        animate={{ width: `${Math.min(100, progress)}%` }}
        className="h-full bg-primary"
      />
    </div>
  </div>
);

const TaskItem = ({ label, status }: any) => (
  <div className="flex justify-between items-center py-3 border-b border-white/5">
    <span className="text-xs text-white/70 font-mono tracking-tighter uppercase">{label}</span>
    <span className="text-[10px] font-bold text-primary bg-primary/10 px-2 py-0.5 rounded border border-primary/20">{status}</span>
  </div>
);

export default Telemetry;
