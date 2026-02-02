import { calculatePercentage } from "@/utils/formatters";
import { formatDuration } from "@/utils/formatters";
import { motion } from "framer-motion";

function radiusFromValue(v: number, vMin: number, vMax: number) {
  const rMin = 30;
  const rMax = 62;
  if (vMax === vMin) return (rMin + rMax) / 2;
  const t = (v - vMin) / (vMax - vMin);
  return rMin + t * (rMax - rMin);
}

type Bubble = {
  label: string;
  value: number;
  color: string;
  subtext?: string;
};

const savedJson = localStorage.getItem("metrics");
const parsedMetrics = savedJson ? JSON.parse(savedJson) : null;
const sleepData = {
  totalSleep: parsedMetrics?.sleep?.total || 0,
  deepSleep: parsedMetrics?.sleep?.deep || 0,
  lightSleep: parsedMetrics?.sleep?.light || 0,
  remSleep: parsedMetrics?.sleep?.rem || 0,
};

  const data: Bubble[] = [
    {
      label: "Sueño Profundo",
      // 1. Cálculo dinámico del valor
      value: calculatePercentage(sleepData.deepSleep, sleepData.totalSleep),
      color: "#6366f1",
      // 2. ¡Texto dinámico también! Nada escrito a mano.
      subtext: formatDuration(sleepData.deepSleep),
    },
    {
      label: "Sueño Ligero",
      value: calculatePercentage(sleepData.lightSleep, sleepData.totalSleep),
      color: "#818cf8",
      subtext: formatDuration(sleepData.lightSleep),
    },
    {
      label: "REM",
      value: calculatePercentage(sleepData.remSleep, sleepData.totalSleep),
      color: "#c7d2fe",
      subtext: formatDuration(sleepData.remSleep),
    },
  ];

export const SleepBubbles: React.FC = () => {


  const vals = data.map((d) => d.value);
  const vMin = Math.min(...vals);
  const vMax = Math.max(...vals);

  const r0 = radiusFromValue(data[0].value, vMin, vMax);
  const r1 = radiusFromValue(data[1].value, vMin, vMax);
  const r2 = radiusFromValue(data[2].value, vMin, vMax);

  // “bubble chart” look: slight overlap, but controlled
  const overlap = 14; // increase => more overlap, decrease => more separation
  const d01 = r0 + r1 - overlap;
  const d02 = r0 + r2 - overlap;
  const d12 = r1 + r2 - overlap;

  // positions in a local coordinate system
  const p0 = { x: 0, y: 0 };
  const p1 = { x: d01, y: -Math.round(r0 * 0.1) };

  // place bubble 2 below/right; compute y to satisfy distances
  const x2 = Math.round(r0 * 0.35); // tweak for composition
  const yFrom0 = Math.sqrt(Math.max(0, d02 * d02 - x2 * x2));
  const dx1 = x2 - p1.x;
  const yFrom1 = Math.sqrt(Math.max(0, d12 * d12 - dx1 * dx1));
  const p2 = { x: x2, y: Math.ceil(Math.max(yFrom0, yFrom1)) };

  const bubbles = [
    { ...data[0], r: r0, pos: p0, z: 10, text: "text-white", font: "text-lg" },
    {
      ...data[1],
      r: r1,
      pos: p1,
      z: 20,
      text: "text-white",
      font: "text-lg",
    },
    {
      ...data[2],
      r: r2,
      pos: p2,
      z: 30,
      text: "text-indigo-900",
      font: "text-sm",
    },
  ];

  // --- INICIO: CÁLCULO DEL CONTENEDOR DINÁMICO ---
  // Obtenemos los límites de todas las burbujas para crear una caja contenedora
  const allX = bubbles.map((b) => [b.pos.x - b.r, b.pos.x + b.r]).flat();
  const allY = bubbles.map((b) => [b.pos.y - b.r, b.pos.y + b.r]).flat();

  const minX = Math.min(...allX);
  const maxX = Math.max(...allX);
  const minY = Math.min(...allY);
  const maxY = Math.max(...allY);

  const containerWidth = maxX - minX;
  const containerHeight = maxY - minY;
  // --- FIN: CÁLCULO DEL CONTENEDOR DINÁMICO ---

  return (
    <>
      <div className="w-full">
        {/* Contenedor de burbujas con tamaño dinámico */}
        <div
          className="relative mx-auto"
          style={{
            width: Math.round(containerWidth),
            height: Math.round(containerHeight),
          }}
        >
          {bubbles.map((b) => (
            <div
              key={b.label}
              className="absolute"
              style={{
                // Ajustamos la posición para que sea relativa al nuevo contenedor dinámico
                left: Math.round(b.pos.x - b.r - minX),
                top: Math.round(b.pos.y - b.r - minY),
                zIndex: b.z,
                width: Math.round(b.r * 2),
                height: Math.round(b.r * 2),
              }}
            >
              {/* Círculo */}
              <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.6, type: "spring" }}
                className="w-full h-full rounded-full shadow-lg"
                style={{ backgroundColor: b.color }}
              />

              {/* Etiqueta siempre encima */}
              <div className="absolute inset-0 flex items-center justify-center z-50 pointer-events-none">
                <span className={`font-bold ${b.font} ${b.text}`}>
                  {b.value}%
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Leyenda */}
      <div className="flex flex-col gap-2 w-full mt-4">
        {data.map((item) => (
          <div
            key={item.label}
            className="flex items-center gap-3 px-3 py-2 rounded-xl bg-slate-50/50 hover:bg-slate-100/50 transition-colors"
          >
            <div
              className="w-2 h-8 rounded-full shrink-0"
              style={{ backgroundColor: item.color }}
            />
            <div className="flex-1 min-w-0">
              <div className="flex justify-between items-baseline mb-0.5">
                <span className="text-xs font-bold text-slate-700 truncate">
                  {item.label}
                </span>
                <span className="text-xs font-black text-slate-900 ml-2">
                  {item.value}%
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-[12px] font-medium text-slate-400 uppercase tracking-wider">
                  {item.subtext}
                </span>
                <div className="w-12 h-1 bg-slate-200/50 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${item.value}%` }}
                    className="h-full"
                    style={{ backgroundColor: item.color }}
                  />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};
