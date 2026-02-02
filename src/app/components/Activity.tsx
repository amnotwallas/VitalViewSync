import { motion } from "motion/react";
import { Charts } from "@/app/components/charts/ActivityChart";
import { HealthInsights } from "@/app/components/charts/HealthInsights";

const Activity: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4 }}
      className="lg:col-span-2 bg-white p-8 rounded-3xl shadow-sm border border-slate-100"
    >
      <div className="flex justify-between items-center mb-8">
        <div>
          <h3 className="text-lg font-bold text-slate-900">Actividad</h3>
          <p className="text-sm text-slate-500">Pasos, distancia y calorías</p>
        </div>
      </div>
      <Charts />
      <HealthInsights calories={2450} activeMinutes={45} hydration={1.8} />
    </motion.div>
  );
};

export default Activity;
