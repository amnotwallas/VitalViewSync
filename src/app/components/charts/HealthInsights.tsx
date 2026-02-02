import { motion } from "framer-motion";
import { Flame, Activity, GlassWater } from "lucide-react";

interface HealthInsightsProps {
  calories: number;
  activeMinutes: number;
  hydration: number;
}

export const HealthInsights: React.FC<HealthInsightsProps> = ({
  calories,
  activeMinutes,
  hydration,
}) => {
  const insights = [
    {
      label: "Calorías Quemadas",
      value: calories.toLocaleString(), // Formateamos el número (2450 -> 2,450)
      unit: "kcal",
      trend: "+12%",
      icon: Flame,
      color: "text-orange-500",
      bg: "bg-orange-50",
    },
    {
      label: "Minutos Activos",
      value: activeMinutes,
      unit: "min",
      trend: "+5%",
      icon: Activity,
      color: "text-emerald-500",
      bg: "bg-emerald-50",
    },
    {
      label: "Hidratación Recomendada",
      value: hydration.toFixed(1),
      unit: "L",
      trend: "90%",
      icon: GlassWater,
      color: "text-blue-500",
      bg: "bg-blue-50",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-8">
      {insights.map((item, idx) => (
        <motion.div
          key={item.label}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 + idx * 0.1 }}
          className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm flex items-center gap-4"
        >
          <div className={`p-3 rounded-xl ${item.bg}`}>
            <item.icon className={`w-5 h-5 ${item.color}`} />
          </div>
          <div>
            <div className="flex justify-between items-center mb-1 gap-2">
              <p className="text-xs font-medium text-slate-500 uppercase tracking-wider">
                {item.label}
              </p>
              <div
                className={`
                  inline-flex items-center
                  px-2 py-0.5 rounded-full
                  text-[11px] font-semibold
                  bg-blue-50
                  text-blue-500
                `}
              >
                Hoy
              </div>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-xl font-bold text-slate-900">
                {item.value}
              </span>

              <span className="text-xs text-slate-400">{item.unit}</span>
            </div>
            {/* Opcional: Mostrar el trend aquí si quieres */}
          </div>
        </motion.div>
      ))}
    </div>
  );
};
