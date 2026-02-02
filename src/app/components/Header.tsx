import CalendarPicker from "@/app/components/CalendarPicker";
import { useState } from "react";
import { Search } from "lucide-react";
import { motion } from "motion/react";
import { useUser } from "@/hooks/useUser";
import { Skeleton } from "./ui/skeleton";

export const Header: React.FC = () => {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const { user, loading } = useUser();

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-100 px-8 py-4 flex items-center justify-between">
        <div className="flex items-center gap-4 flex-1">
          <div className="relative w-full max-w-md hidden md:block">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Buscar métricas, consejos..."
              className="w-full pl-10 pr-4 py-2 bg-slate-100 border-none rounded-xl focus:ring-2 focus:ring-indigo-500 text-sm outline-none transition-all"
            />
          </div>
        </div>

        <div className="flex items-center gap-6">
          <CalendarPicker value={date} onChange={setDate} />

          {loading ? (
            <div className="flex items-center gap-3 pl-6 border-l border-slate-200">
              <div className="text-right hidden sm:block space-y-1">
                <Skeleton className="h-4 w-24 ml-auto" />
                <Skeleton className="h-3 w-16 ml-auto" />
              </div>
              <Skeleton className="h-10 w-10 rounded-full" />
            </div>
          ) : (
            <div className="flex items-center gap-3 pl-6 border-l border-slate-200">
              <div className="text-right hidden sm:block">
                <p className="text-sm font-bold text-slate-900 leading-none">
                  {user?.fullname}
                </p>
                <p className="text-xs text-slate-500 mt-1">
                  Nivel {user?.level} •{" "}
                  <strong className="font-extrabold">{user?.status}</strong>
                </p>
              </div>
              <img
                src={user?.avatar}
                alt="User Profile"
                className="w-10 h-10 rounded-full object-cover ring-2 ring-indigo-100"
              />
            </div>
          )}
        </div>
      </header>
    </motion.div>
  );
};

export default Header;
