import { useEffect, useState } from "react";
import { Trash2, Edit, MoreVertical, Box, Calendar, Type, Hash, Mail } from "lucide-react";
import { Link } from "react-router-dom";

type Variable = {
  variableName: string;
  variableDescription: string;
  variableType: string;
};

type Flujo = {
  id: number;
  name: string;
  description: string;
  variables: Variable[];
};

export default function BotList() {
  const [listFlujos, setListFlujos] = useState<Flujo[]>([]);

  useEffect(() => {
    const flujosData = localStorage.getItem("flujos");
    if (flujosData) {
      try {
        setListFlujos(JSON.parse(flujosData));
      } catch (error) {
        console.error("❌ Error al parsear flujos del localStorage:", error);
      }
    }
  }, []);

  const handleDelete = (id: number) => {
    if (confirm("¿Seguro que deseas eliminar este flujo?")) {
      const nuevos = listFlujos.filter((f) => f.id !== id);
      setListFlujos(nuevos);
      localStorage.setItem("flujos", JSON.stringify(nuevos));
    }
  };

  const getIconForType = (type: string) => {
    switch (type) {
      case "date": return <Calendar className="w-3 h-3" />;
      case "number": return <Hash className="w-3 h-3" />;
      case "email": return <Mail className="w-3 h-3" />;
      default: return <Type className="w-3 h-3" />;
    }
  };

  if (listFlujos.length === 0) {
    return (
      <div className="glass dark:glass-dark rounded-2xl p-12 text-center border border-dashed border-gray-300 dark:border-gray-700">
        <div className="w-16 h-16 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
          <Box className="w-8 h-8 text-gray-400" />
        </div>
        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-1">No hay flujos creados</h3>
        <p className="text-gray-500 dark:text-gray-400 mb-6">Comienza creando tu primer flujo de conversación.</p>
        <Link
          to="/crear"
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-orange-500 hover:bg-orange-600 text-white rounded-xl font-medium transition-colors shadow-lg shadow-orange-500/20"
        >
          Crear Flujo
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {listFlujos.map((flujo) => (
        <div
          key={flujo.id}
          className="glass dark:glass-dark rounded-2xl p-6 border border-white/50 dark:border-white/5 hover:border-orange-500/30 dark:hover:border-orange-500/30 transition-all duration-300 group relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-32 h-32 bg-orange-500/5 rounded-full blur-3xl -mr-16 -mt-16 transition-opacity opacity-0 group-hover:opacity-100" />

          <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 relative z-10">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                  {flujo.name}
                </h3>
                <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400 border border-orange-200 dark:border-orange-800">
                  {flujo.variables.length} variables
                </span>
              </div>

              <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-2 leading-relaxed">
                {flujo.description}
              </p>

              {flujo.variables.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-4">
                  {flujo.variables.slice(0, 4).map((v, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gray-50 dark:bg-gray-800/50 border border-gray-100 dark:border-gray-700 text-xs text-gray-600 dark:text-gray-400"
                    >
                      {getIconForType(v.variableType)}
                      <span className="font-medium">{v.variableName}</span>
                    </div>
                  ))}
                  {flujo.variables.length > 4 && (
                    <div className="px-3 py-1.5 rounded-lg bg-gray-50 dark:bg-gray-800/50 border border-gray-100 dark:border-gray-700 text-xs text-gray-500">
                      +{flujo.variables.length - 4} más
                    </div>
                  )}
                </div>
              )}
            </div>

            <div className="flex items-center gap-3 self-start">
              <Link
                to={`/editar/${flujo.id}`}
                className="p-2.5 text-gray-500 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-xl transition-colors"
                title="Editar"
              >
                <Edit className="w-5 h-5" />
              </Link>
              <button
                onClick={() => handleDelete(flujo.id)}
                className="p-2.5 text-gray-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-xl transition-colors"
                title="Eliminar"
              >
                <Trash2 className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
