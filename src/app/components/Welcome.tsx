import { motion } from "motion/react";
import { useUser } from "@/hooks/useUser";

export const Welcome: React.FC = () => {
  const { user, loading } = useUser();
  const { steps, goal } = { steps: 6400, goal: 10000 }; // Example values
  const percentGoal = Math.min(100, Math.floor((steps / goal) * 100));

  const welcomeMessage = loading ? "Bienvenido de nuevo..." : `Bienvenido de nuevo, ${user?.name} 👋`;

  return (
    <div className="mb-8">
      <motion.h2
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="text-2xl font-bold text-slate-900"
      >
        {welcomeMessage}
      </motion.h2>
      <p className="text-slate-500 mt-1">
        {`Has alcanzado el ${percentGoal}% de tu objetivo de hoy. ¡Sigue así!`}
      </p>
    </div>
  );
};

export default Welcome;