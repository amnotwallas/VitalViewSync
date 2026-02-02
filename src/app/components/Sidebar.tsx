import React from "react";
import {
  LayoutDashboard,
  Activity,
  Heart,
  Moon,
  Settings,
  LogOut,
  Goal,
} from "lucide-react";

// Definimos los items fuera para no recrearlos en cada render
const MENU_ITEMS = [
  { id: "dashboard", icon: LayoutDashboard, label: "Dashboard" },
  { id: "activity", icon: Activity, label: "Actividad" },
  { id: "health", icon: Heart, label: "Salud" },
  { id: "sleep", icon: Moon, label: "Sueño" },
  { id: "goals", icon: Goal, label: "Metas" },
];

interface SidebarProps {
  activeItem?: string;
  onNavigate?: (id: string) => void;
  onLogout?: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  activeItem = "dashboard",
  onNavigate,
  onLogout,
}) => {
  const handleNavigation = (id: string) => {
    if (onNavigate) {
      onNavigate(id);
    }
  };

  return (
    <aside className="hidden lg:flex flex-col w-64 h-screen bg-white border-r border-slate-100 sticky top-0">
      <div className="p-8">
        <div className="flex items-center gap-2 mb-10">
          <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
            <Activity className="text-white w-5 h-5" />
          </div>
          <h1 className="text-xl font-bold text-slate-900 tracking-tight">
            VitalSync
          </h1>
        </div>

        <nav className="space-y-1">
          {MENU_ITEMS.map((item) => {
            const isActive = activeItem === item.id;

            return (
              <button
                key={item.id}
                onClick={() => handleNavigation(item.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group ${
                  isActive
                    ? "bg-indigo-50 text-indigo-600 font-semibold shadow-sm"
                    : "text-slate-500 hover:bg-slate-50 hover:text-slate-900"
                }`}
              >
                <item.icon
                  className={`w-5 h-5 ${isActive ? "text-indigo-600" : "text-slate-400 group-hover:text-slate-600"}`}
                />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>
      </div>

      <div className="mt-auto p-4 border-t border-slate-100">
        <div className="space-y-1 mt-4">
          <button
            onClick={() => handleNavigation("settings")}
            className="w-full flex items-center gap-3 px-4 py-2 text-slate-500 hover:text-slate-900 transition-colors hover:bg-slate-50 rounded-lg"
          >
            <Settings className="w-5 h-5 text-slate-400" />
            <span>Ajustes</span>
          </button>
          <button
            onClick={onLogout}
            className="w-full flex items-center gap-3 px-4 py-2 text-rose-500 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
          >
            <LogOut className="w-5 h-5" />
            <span>Cerrar sesión</span>
          </button>
        </div>
      </div>
    </aside>
  );
};
