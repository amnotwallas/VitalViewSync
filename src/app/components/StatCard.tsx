import React from 'react';
import { motion } from 'motion/react';
import { TrendingUp, TrendingDown, LucideIcon } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipTrigger, TooltipProvider } from '@/app/components/ui/tooltip';

interface StatCardProps {
  title: string;
  value: string | number;
  unit?: string;
  icon: LucideIcon;
  trend?: {
    value: number;
    isUp: boolean;
  };
  color: string;
  delay?: number;
}

export const StatCard: React.FC<StatCardProps> = ({ 
  title, 
  value, 
  unit, 
  icon: Icon, 
  trend, 
  color,
  delay = 0 
}) => {
  const trendText = trend ? `${trend.isUp ? 'Incrementó' : 'Disminuyó'} un ${trend.value}% respecto a la semana pasada.` : 'No hay datos de tendencia.';

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay }}
            className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex flex-col justify-between cursor-pointer"
          >
            <div className="flex justify-between items-start mb-4">
              <div className={`p-3 rounded-xl ${color} bg-opacity-10`}>
                <Icon className={`w-6 h-6 ${color}`} />
              </div>
              {trend && (
                <div className={`flex items-center text-sm font-semibold ${trend.isUp ? 'text-emerald-600' : 'text-rose-600'}`}>
                  {trend.isUp ? <TrendingUp className="w-4 h-4 mr-1" /> : <TrendingDown className="w-4 h-4 mr-1" />}
                  {trend.value}%
                </div>
              )}
            </div>
            <div>
              <p className="text-slate-500 text-sm font-medium mb-1">{title}</p>
              <div className="flex items-baseline gap-2">
                <h3 className="text-3xl font-bold text-slate-900">{value}</h3>
                {unit && <span className="text-slate-400 font-medium">{unit}</span>}
              </div>
            </div>
          </motion.div>
        </TooltipTrigger>
        <TooltipContent>
          <p>{trendText}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};
