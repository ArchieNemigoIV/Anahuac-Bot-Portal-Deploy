import { useNavigate, useLocation } from "react-router-dom";
import { Bot, Home, Settings, LogOut } from "lucide-react";

export default function NavBar() {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("username");
    navigate("/login");
  };

  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="fixed top-4 left-0 right-0 z-50 flex justify-center px-4">
      <nav className="glass dark:glass-dark rounded-2xl shadow-lg shadow-orange-500/10 px-6 py-3 w-full max-w-5xl flex justify-between items-center backdrop-blur-xl border border-white/20 dark:border-white/5 transition-all duration-300">
        {/* Logo */}
        <div
          className="flex items-center gap-3 cursor-pointer group"
          onClick={() => navigate("/dashboard")}
        >
          <div className="p-2 bg-orange-500/10 rounded-xl group-hover:bg-orange-500/20 transition-colors">
            <Bot className="w-6 h-6 text-orange-500" />
          </div>
          <span className="text-xl font-bold text-gray-900 dark:text-white tracking-tight group-hover:text-orange-500 transition-colors">
            Anahuac <span className="text-orange-500">IA</span>
          </span>
        </div>

        {/* Navegación principal */}
        <div className="flex items-center gap-1 bg-gray-100/50 dark:bg-gray-800/50 p-1 rounded-xl">
          <button
            onClick={() => navigate("/dashboard")}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
              isActive("/dashboard")
                ? "bg-white dark:bg-gray-700 text-orange-500 shadow-sm"
                : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 hover:bg-white/50 dark:hover:bg-gray-700/50"
            }`}
          >
            <Home className="w-4 h-4" />
            Inicio
          </button>
          <button
            onClick={() => navigate("/crear")}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
              isActive("/crear")
                ? "bg-white dark:bg-gray-700 text-orange-500 shadow-sm"
                : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 hover:bg-white/50 dark:hover:bg-gray-700/50"
            }`}
          >
            <Settings className="w-4 h-4" />
            Crear Flujo
          </button>
        </div>

        {/* Botón de Cerrar Sesión */}
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors duration-200"
        >
          <LogOut className="w-4 h-4" />
          <span className="hidden sm:inline">Salir</span>
        </button>
      </nav>
    </div>
  );
}
