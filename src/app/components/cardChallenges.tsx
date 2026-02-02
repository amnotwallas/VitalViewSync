import { Footprints } from "lucide-react";
import { motion } from "motion/react";
import { useChallenges } from "@/hooks/useChallenges";

const ChallengesCard: React.FC = () => {
  const savedJson = localStorage.getItem("metrics");
  const parsedMetrics = savedJson ? JSON.parse(savedJson) : null;
  const steps = parsedMetrics?.steps || "0";

  const { challenges } = useChallenges();
  const goal = challenges?.goal || 0;
  const lineProgress =
    goal > 0 ? Math.min(100, Math.floor((parseInt(steps) / goal) * 100)) : 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.6 }}
      className="bg-slate-900 text-white p-8 rounded-3xl overflow-hidden relative"
    >
      <div className="relative z-10">
        <h3 className="text-xl font-bold mb-2">Próximo Reto: Maratón 10K</h3>
        <p className="text-slate-400 mb-6">
          Quedan 12 días para tu primera carrera oficial. ¡Sigue así!
        </p>
        <div className="w-full bg-slate-800 rounded-full h-2.5 mb-2">
          <motion.div
            className="bg-indigo-500 h-2.5 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${lineProgress}%` }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          />
        </div>
        <div className="flex justify-between text-xs text-slate-400">
          <span>{steps} km completados</span>
          <span>Meta: {goal} km</span>
        </div>
      </div>
      <div className="absolute -right-8 -bottom-8 opacity-10">
        <Footprints className="w-48 h-48 rotate-12" />
      </div>
    </motion.div>
  );
};

export default ChallengesCard;
