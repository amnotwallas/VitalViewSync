import ChallengesCard from "@/app/components/cardChallenges";
import Kpis from "@/app/components/Kpis";
import Welcome from "@/app/components/Welcome";
import { Tip } from "@/app/components/Tip";
import Activity from "@/app/components/Activity";
import SleepQuality from "@/app/components/SleepQuality";
import Awards from "@/app/components/Awards";


export const DashboardView: React.FC = () => (
  <div className="p-8">
    <Welcome />

    {/* Metrics Grid */}
    
    <Kpis />

    <div className="lg:items-start mt-8 grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
      <ChallengesCard />
      
      <Tip tip={"Intenta dormir 30 minutos más hoy..."} />
    </div>

    {/* Charts Section */}
    <div className=" lg:items-start grid grid-cols-1 lg:grid-cols-3 gap-8">
      
      <Activity />

      <SleepQuality />
    </div>

    {/* Bottom section */}
    <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-8">
      <Awards />
    </div>
    
  </div>
);

export default DashboardView;
