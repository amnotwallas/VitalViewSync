import React, { useState, useMemo } from "react";
import { useActivity } from "@/hooks/useActivity";
import { BiometricDataArray } from "@/models/BiometricData"; // Import the BiometricData type
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Button } from "../ui/button"; // Assuming shadcn/ui Button component is available

type TimeRange = "today" | "weekly" | "monthly"; // Updated to match useActivity hook output

const ActivityChart: React.FC<{ data: BiometricDataArray }> = ({ data }) => {
  return (
    <div className="h-[300px] w-full mt-4">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          data={data}
          margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
        >
          <defs>
            <linearGradient id="colorSteps" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#6366f1" stopOpacity={0.1} />
              <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="colorCal" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.1} />
              <stop offset="95%" stopColor="#f59e0b" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid
            strokeDasharray="3 3"
            vertical={false}
            stroke="#f1f5f9"
          />
          <XAxis
            dataKey="name"
            axisLine={false}
            tickLine={false}
            tick={{ fill: "#64748b", fontSize: 12 }}
            dy={10}
          />
          <YAxis
            yAxisId="left"
            axisLine={false}
            tickLine={false}
            tick={{ fill: "#64748b", fontSize: 12 }}
          />
          <YAxis
            yAxisId="right"
            orientation="right"
            axisLine={false}
            tickLine={false}
            tick={{ fill: "#64748b", fontSize: 12 }}
          />
          <Tooltip
            contentStyle={{
              borderRadius: "12px",
              border: "none",
              boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
            }}
            labelStyle={{ fontWeight: "bold", marginBottom: "4px" }}
          />
          <Area
            yAxisId="left"
            type="monotone"
            dataKey="steps"
            name="Pasos"
            stroke="#6366f1"
            strokeWidth={3}
            fillOpacity={1}
            fill="url(#colorSteps)"
          />
          <Area
            yAxisId="left"
            type="monotone"
            dataKey="calories"
            name="Calorías"
            stroke="#f59e0b"
            strokeWidth={2}
            strokeDasharray="5 5"
            fillOpacity={1}
            fill="url(#colorCal)"
          />
          <Area
            yAxisId="right"
            type="monotone"
            dataKey="distance"
            name="Distancia (km)"
            stroke="#0ea5e9"
            strokeWidth={3}
            fillOpacity={0}
            fill="transparent"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export const Charts: React.FC = () => {
  const [timeRange, setTimeRange] = useState<TimeRange>("today");
  const { data, isLoading, error } = useActivity(); // Use the custom hook

  const chartData: BiometricDataArray = useMemo(() => {
    if (!data) return [];
    switch (timeRange) {
      case "today":
        return data.today;
      case "weekly":
        return data.weekly;
      case "monthly":
        return data.monthly;
      default:
        return [];
    }
  }, [timeRange, data]);

  if (isLoading) {
    return <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm text-center">Loading activity data...</div>;
  }

  if (error) {
    return <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm text-center text-red-500">Error: {error}</div>;
  }

  if (!data) {
    return <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm text-center">No activity data available.</div>;
  }

  return (
    <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4 mr-4 hidden sm:flex">
          <div className="flex items-center gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-indigo-500" />
            <span className="text-xs font-medium text-slate-500">Pasos</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-sky-500" />
            <span className="text-xs font-medium text-slate-500">
              Distancia
            </span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-amber-500" />
            <span className="text-xs font-medium text-slate-500">Calorías</span>
          </div>
        </div>
        {/* --- 3. BOTONES DE SELECCIÓN --- */}
        <div className="flex items-center gap-2 p-1 bg-slate-50 rounded-full">
          <Button
            variant={timeRange === 'today' ? 'default' : 'outline'}
            onClick={() => setTimeRange("today")}
            className="px-4 py-1.5 text-sm font-semibold rounded-full transition-colors"
          >
            Hoy
          </Button>
          <Button
            variant={timeRange === 'weekly' ? 'default' : 'outline'}
            onClick={() => setTimeRange("weekly")}
            className="px-4 py-1.5 text-sm font-semibold rounded-full transition-colors"
          >
            Semana
          </Button>
          <Button
            variant={timeRange === 'monthly' ? 'default' : 'outline'}
            onClick={() => setTimeRange("monthly")}
            className="px-4 py-1.5 text-sm font-semibold rounded-full transition-colors"
          >
            Mes
          </Button>
        </div>
      </div>
      {/* --- 4. PASAR DATOS A LA GRÁFICA --- */}
      <ActivityChart data={chartData} />
    </div>
  );
};

