import React, { useState, useEffect } from "react";
import { Sidebar } from "@/app/components/Sidebar";
import { Header } from "@/app/components/Header";
import { DashboardView } from "@/app/views/Dashboard";
import { Login } from "@/app/Login";
import { IS_MOCK } from "@/config/config";
import { TooltipProvider } from "@/app/components/ui/tooltip";

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState("dashboard");
  const [isAuthenticated, setIsAuthenticated] = useState(IS_MOCK || sessionStorage.getItem("isAuthenticated") === "true");

  const handleLoginSuccess = () => {
    setIsAuthenticated(true);
    sessionStorage.setItem("isAuthenticated", "true");
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem("isAuthenticated");
    // You might want to clear other user-related data here
  };

  if (!isAuthenticated) {
    return <Login onLoginSuccess={handleLoginSuccess} />;
  }

  const renderContent = () => {
    switch (currentView) {
      case "dashboard":
        return <DashboardView />;
      case "activity":
        return <div className="p-8 text-2xl font-bold">Aquí iría la vista de Actividad 🏃‍♂️</div>;
      case "health":
        return <div className="p-8 text-2xl font-bold">Aquí iría la vista de Salud ❤️</div>;
      case "profile":
        return <div className="p-8 text-2xl font-bold">Perfil 👤</div>;
      default:
        return <div className="p-8">Página en construcción: {currentView}</div>;
    }
  };

  return (
    <TooltipProvider>
      <div className="flex min-h-screen bg-slate-50 font-sans text-slate-900">
        <Sidebar
          activeItem={currentView}
          onNavigate={setCurrentView}
          onLogout={handleLogout}
        />
        <main className="flex-1 flex flex-col max-h-screen overflow-y-auto">
          <Header />
          {renderContent()}
        </main>
      </div>
    </TooltipProvider>
  );
};

export default App;
