import Navbar from "@/components/Navbar";
import { motion } from "framer-motion";
import { Activity, Droplets, Thermometer, Wind, ShieldCheck, Calendar } from "lucide-react";

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      <Navbar />
      <div className="pt-24 px-6 md:px-12 pb-12">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-7xl mx-auto"
        >
          <header className="mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-2">Orchard Dashboard</h1>
            <p className="text-muted-foreground">Real-time stats and health overview of your mango plantation.</p>
          </header>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <StatCard icon={<Activity className="text-green-500" />} label="Overall Health" value="94%" trend="+2% from last week" />
            <StatCard icon={<Thermometer className="text-orange-500" />} label="Avg Temp" value="28°C" trend="Optimal range" />
            <StatCard icon={<Droplets className="text-blue-500" />} label="Soil Moisture" value="62%" trend="-5% - Needs water" />
            <StatCard icon={<Wind className="text-cyan-500" />} label="Air Quality" value="Good" trend="PM2.5: 12" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-8">
              <section className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-md">
                <h3 className="text-xl font-semibold mb-6 flex items-center gap-2">
                  <Activity className="w-5 h-5 text-primary" />
                  Tree Growth Analysis
                </h3>
                <div className="h-64 flex items-end gap-4 px-4">
                  {[40, 60, 45, 80, 55, 90, 70, 85, 95, 100].map((h, i) => (
                    <motion.div 
                      key={i}
                      initial={{ height: 0 }}
                      animate={{ height: `${h}%` }}
                      transition={{ delay: i * 0.1 }}
                      className="flex-1 bg-gradient-to-t from-primary/20 to-primary rounded-t-sm"
                    />
                  ))}
                </div>
                <div className="flex justify-between mt-4 text-xs text-muted-foreground px-2">
                  <span>Jan</span><span>Mar</span><span>May</span><span>Jul</span><span>Sep</span><span>Nov</span>
                </div>
              </section>

              <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                  <h3 className="text-lg font-semibold mb-4">Soil Nutrition</h3>
                  <ul className="space-y-4">
                    <ProgressBar label="Nitrogen (N)" value={75} color="bg-orange-500" />
                    <ProgressBar label="Phosphorus (P)" value={45} color="bg-yellow-500" />
                    <ProgressBar label="Potassium (K)" value={90} color="bg-green-500" />
                  </ul>
                </div>
                <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                  <h3 className="text-lg font-semibold mb-4">Disease Risk</h3>
                  <div className="flex items-center justify-center h-32 relative">
                    <div className="w-32 h-32 rounded-full border-4 border-white/10 flex items-center justify-center">
                      <span className="text-2xl font-bold text-green-500">LOW</span>
                    </div>
                    <motion.div 
                      className="absolute inset-0 border-4 border-green-500 rounded-full"
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 0.8 }}
                      style={{ clipPath: 'polygon(50% 50%, -100% -100%, 200% -100%)' }}
                    />
                  </div>
                  <p className="text-center text-xs text-muted-foreground mt-4">No significant threats detected in the last 48h</p>
                </div>
              </section>
            </div>

            <div className="space-y-8">
              <section className="bg-white/5 border border-white/10 rounded-2xl p-6">
                <h3 className="text-xl font-semibold mb-6 flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-primary" />
                  Maintenance Schedule
                </h3>
                <div className="space-y-6">
                  <ScheduleItem 
                    icon={<ShieldCheck className="text-red-500" />} 
                    title="Pest Spraying" 
                    time="Tomorrow, 06:00 AM" 
                    desc="Block B - Anthracnose protection" 
                  />
                  <ScheduleItem 
                    icon={<Droplets className="text-blue-500" />} 
                    title="Irrigation" 
                    time="Today, 08:00 PM" 
                    desc="Zone 4 - Automatic drip" 
                  />
                  <ScheduleItem 
                    icon={<Activity className="text-yellow-500" />} 
                    title="Manual Inspection" 
                    time="Friday, 10:00 AM" 
                    desc="Quarterly health audit" 
                  />
                </div>
              </section>

              <section className="bg-gradient-to-br from-primary/20 to-transparent border border-primary/20 rounded-2xl p-6">
                <h3 className="text-lg font-semibold mb-2">Drone Status</h3>
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
                  <span className="text-sm">Active & Connected</span>
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Drone-01 is currently scanning Block C. Battery at 82%. Estimated completion: 14 mins.
                </p>
              </section>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

const StatCard = ({ icon, label, value, trend }: any) => (
  <div className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-sm">
    <div className="flex items-center gap-3 mb-4">
      {icon}
      <span className="text-sm font-medium text-muted-foreground">{label}</span>
    </div>
    <div className="text-3xl font-bold mb-1">{value}</div>
    <div className="text-xs text-muted-foreground">{trend}</div>
  </div>
);

const ProgressBar = ({ label, value, color }: any) => (
  <div className="space-y-2">
    <div className="flex justify-between text-xs">
      <span>{label}</span>
      <span>{value}%</span>
    </div>
    <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
      <motion.div 
        initial={{ width: 0 }}
        animate={{ width: `${value}%` }}
        className={`h-full ${color}`}
      />
    </div>
  </div>
);

const ScheduleItem = ({ icon, title, time, desc }: any) => (
  <div className="flex gap-4">
    <div className="mt-1">{icon}</div>
    <div>
      <div className="text-sm font-semibold">{title}</div>
      <div className="text-[10px] text-primary uppercase font-bold mb-1">{time}</div>
      <div className="text-xs text-muted-foreground">{desc}</div>
    </div>
  </div>
);

export default Dashboard;
