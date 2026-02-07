import { motion } from "motion/react";
import { SleepBubbles } from "@/app/components/charts/SleepBubbles";
import { SimpleTip } from "@/app/components/Tip";
import { formatDuration } from "@/utils/formatters";
import { Metrics } from "@/models/Metrics";

interface SleepQualityProps {
  metrics: Metrics | null;
  loading: boolean;
}

const SleepQuality: React.FC<SleepQualityProps> = ({ metrics, loading }) => {
  const value = formatDuration(metrics?.sleep?.totalSleep || 0);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5 }}
      className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100"
    >
      <h3 className="text-lg font-bold text-slate-900 mb-2">
        Calidad del Sueño
      </h3>
      <p className="text-sm text-slate-500 mb-8">
        Desglose de la noche anterior
      </p>

      <div className="flex items-center gap-2">
        <span className="text-sm font-semibold text-slate-600">Total:</span>
        <div className="flex items-baseline gap-1">
          <h3 className="text-3xl font-bold text-slate-900">{value}</h3>
        </div>
      </div>

      <SleepBubbles metrics={metrics} loading={loading} />
      <SimpleTip tip={"Duerme 30 min más hoy"} />
    </motion.div>
  );
};

export default SleepQuality;
