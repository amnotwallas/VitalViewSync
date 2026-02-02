import { ArrowRight, Lightbulb } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";

interface TipProps {
  tip: string;
}

export const Tip: React.FC<TipProps> = ({ tip }) => {
  // 1. Estado para controlar si el tip está expandido o no
  const [isExpanded, setIsExpanded] = useState(false);

  // 2. Creamos un extracto del texto para mostrar cuando está colapsado
  const snippet = tip.length > 100 ? tip.substring(0, 100) + "..." : tip;

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.25, duration: 0.45, ease: "easeOut" }}
      className="relative bg-white rounded-3xl p-6 border border-slate-200 shadow-sm"
    >
      {/* 
        El layout ahora es un flex-col para apilar los elementos verticalmente.
        El padding se reduce un poco (p-6) para dar más espacio al contenido.
      */}
      <motion.div
        whileHover={{ y: -1 }}
        whileTap={{ scale: 0.99 }}
        className="flex flex-col gap-4 rounded-2xl p-6 bg-slate-50 border border-green-300 transition-colors cursor-pointer"
        onClick={() => setIsExpanded(!isExpanded)} // El click expande/contrae
        role="button"
        tabIndex={0}
      >
        {/* Encabezado del Tip */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-green-500 flex items-center justify-center shadow-sm shrink-0">
              <Lightbulb className="w-5 h-5 text-white" />
            </div>
            <div className="inline-flex items-center px-2 py-0.5 rounded-full text-base font-semibold bg-green-500 text-white">
              Tip AI
            </div>
          </div>
          {/* 3. La flecha ahora rota para indicar el estado expandido/colapsado */}
          <motion.div animate={{ rotate: isExpanded ? 90 : 0 }}>
            <ArrowRight className="w-5 h-5 text-green-600 shrink-0" />
          </motion.div>
        </div>

        {/* 
          Contenido del Tip. 
          Usamos AnimatePresence para una transición suave al mostrar el texto completo.
        */}
        <motion.div
          key={isExpanded ? "full" : "snippet"}
          initial={{ opacity: 0, y: -5 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="text-base font-medium text-slate-800 leading-relaxed" // 4. Se elimina 'truncate' y se añade 'leading-relaxed'
        >
          {isExpanded ? tip : snippet}
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export const SimpleTip: React.FC<TipProps> = ({ tip }) => {
  return (
    <motion.div
      whileHover={{ y: -1 }}
      whileTap={{ scale: 0.99 }}
      className="
        mt-4
        relative
        flex items-center justify-between gap-4
        rounded-2xl p-4
        bg-slate-50
        border border-slate-200
        hover:border-indigo-300
        transition-colors
      "
      role="button"
      tabIndex={0}
    >
      {/* acento lateral morado */}
      <div className="absolute left-0 top-3 bottom-3 w-1 rounded-full bg-indigo-500" />

      <div className="flex items-center gap-3 pl-2">
        {/* icono con más contraste */}
        <div
          className="
            w-10 h-10 rounded-full
            bg-indigo-500
            flex items-center justify-center
            shadow-sm
          "
        >
          <Lightbulb className="w-5 h-5 text-white" />
        </div>

        <div className="min-w-0">
          {/* badge más presente */}
          <div
            className="
              inline-flex items-center
              px-2 py-0.5 rounded-full
              text-[11px] font-semibold
              bg-indigo-100 text-indigo-700
            "
          >
            Consejo
          </div>

          <p className="mt-1 text-sm text-[14px] font-medium text-slate-900 truncate">
            {tip}
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export default { Tip, SimpleTip };
