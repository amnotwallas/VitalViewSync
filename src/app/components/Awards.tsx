import { Flame } from "lucide-react";
import { motion } from "motion/react";

const Awards: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.6 }}
      className="bg-indigo-600 text-white p-8 rounded-3xl overflow-hidden relative"
    >
      <div className="relative z-10">
        <h3 className="text-xl font-bold mb-2">Gana Premios Reales</h3>
        <p className="text-indigo-100 mb-6">
          Canjea tus puntos por descuentos.
        </p>
        <button className="bg-white text-indigo-600 px-6 py-2 rounded-full font-bold text-sm hover:bg-indigo-50 transition-colors">
          Ver Catálogo
        </button>
      </div>
      <div className="absolute -right-12 -bottom-12 opacity-20">
        <Flame className="w-56 h-56 -rotate-12" />
      </div>
    </motion.div>
  );
};

export default Awards;