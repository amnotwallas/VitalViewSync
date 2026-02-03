import { Footprints, MapPin, Moon, Activity as ActivityIcon } from "lucide-react";
import { StatCard } from "@/app/components/StatCard";
import { formatHours, formatDuration } from "@/utils/formatters";
import { useMetrics } from "@/hooks/useMetrics";
import { Skeleton } from "./ui/skeleton";

const Kpis: React.FC = () => {
  const { metrics, loading } = useMetrics();

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {[...Array(4)].map((_, idx) => (
          <div key={idx} className="p-4 bg-white rounded-2xl shadow-sm">
            <div className="flex items-start justify-between">
              <div className="space-y-2">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-10 w-32" />
                <Skeleton className="h-4 w-20" />
              </div>
              <Skeleton className="h-10 w-10 rounded-lg" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  const stats = [
    {
      color: "bg-indigo-500",
      title: "Pasos Totales",
      value: metrics?.steps || 0,
      unit: "pasos",
      icon: Footprints,
      // TODO: Replace with dynamic trend data from API
      trend: { value: 12, isUp: true },
    },
    {
      color: "bg-sky-500",
      title: "Distancia",
      value: metrics?.distance || 0,
      unit: "km",
      icon: MapPin,
      trend: { value: 5, isUp: true },
    },
    {
      color: "bg-purple-500",
      title: "Tiempo de Sueño",
      value: formatDuration(metrics?.sleep.totalSleep || 0),
      unit: "",
      icon: Moon,
      trend: { value: 8, isUp: false },
    },
    {
      color: "bg-red-500",
      title: "Ritmo Cardíaco",
      value: metrics?.heartRate || 0,
      unit: "bpm",
      icon: ActivityIcon,
      trend: { value: 2, isUp: true },
    },
  ];

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, idx) => (
          <StatCard key={stat.title} {...stat} delay={idx * 0.1} />
        ))}
      </div>
    </div>
  );
};

export default Kpis;
