import {
  ArrowLeft,
  ArrowRight,
  SquareChartGantt,
  Trash2,
  Plus,
  Type,
  Mail,
  Calendar,
  Hash,
} from "lucide-react";
import Input from "../components/ui/Input";
import { useForm, useFieldArray, type SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router-dom";

type Variable = {
  variableName: string;
  variableDescription: string;
  variableType: string;
};

type Inputs = {
  name: string;
  description: string;
  variables: Variable[];
};

export default function CrearFlujo() {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<Inputs>({
    defaultValues: {
      variables: [
        { variableName: "", variableDescription: "", variableType: "" },
      ],
    },
  });

  const navigate = useNavigate();

  const { fields, append, remove } = useFieldArray({
    control,
    name: "variables",
  });

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    const existing = localStorage.getItem("flujos");
    const flujos = existing ? JSON.parse(existing) : [];

    const nuevoFlujo = {
      id: Date.now(),
      ...data,
    };

    const updatedFlujos = [...flujos, nuevoFlujo];
    localStorage.setItem("flujos", JSON.stringify(updatedFlujos));
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen pt-24 pb-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8 text-center">
          <div className="inline-flex p-3 rounded-2xl bg-orange-500/10 mb-4 shadow-lg shadow-orange-500/20">
            <SquareChartGantt className="w-8 h-8 text-orange-500" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Crear Nuevo Flujo
          </h1>
          <p className="text-gray-500 dark:text-gray-400">
            Configura los detalles y variables para tu nuevo asistente
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-6">
          {/* Main Info Card */}
          <div className="glass dark:glass-dark rounded-3xl p-8 border border-white/50 dark:border-white/10 shadow-xl">
            <h2 className="text-xl font-semibold mb-6 text-gray-900 dark:text-white flex items-center gap-2">
              <span className="w-1 h-6 bg-orange-500 rounded-full"></span>
              Información General
            </h2>

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5 ml-1">
                  Nombre del flujo
                </label>
                <Input
                  type="text"
                  placeholder="Ej: Asistente de Ventas"
                  {...register("name", { required: "Por favor agrega un nombre" })}
                  error={errors.name}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5 ml-1">
                  Descripción
                </label>
                <textarea
                  {...register("description", {
                    required: "Por favor agrega una descripción",
                  })}
                  placeholder="Describe el objetivo y contexto de este flujo..."
                  className={`w-full h-32 resize-none bg-white/50 dark:bg-gray-900/50 border ${errors.description ? "border-red-500" : "border-gray-200 dark:border-gray-700"
                    } rounded-xl p-4 focus:ring-2 focus:ring-orange-500/50 focus:border-orange-500 transition-all outline-none`}
                />
                {errors.description && (
                  <p className="text-red-500 text-sm mt-1 ml-1">
                    {errors.description.message}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Variables Card */}
          <div className="glass dark:glass-dark rounded-3xl p-8 border border-white/50 dark:border-white/10 shadow-xl">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white flex items-center gap-2">
                <span className="w-1 h-6 bg-blue-500 rounded-full"></span>
                Variables del Sistema
              </h2>
              <button
                type="button"
                onClick={() =>
                  append({
                    variableName: "",
                    variableDescription: "",
                    variableType: "",
                  })
                }
                className="text-sm font-medium text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1.5"
              >
                <Plus className="w-4 h-4" /> Agregar Variable
              </button>
            </div>

            <div className="space-y-4">
              {fields.map((field, index) => (
                <div
                  key={field.id}
                  className="p-4 bg-gray-50/50 dark:bg-gray-800/30 rounded-2xl border border-gray-100 dark:border-gray-700/50 hover:border-blue-200 dark:hover:border-blue-800 transition-colors relative group"
                >
                  <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-start">
                    <div className="md:col-span-3">
                      <Input
                        type="text"
                        placeholder="Nombre"
                        {...register(`variables.${index}.variableName` as const, {
                          required: "Requerido",
                        })}
                        error={errors.variables?.[index]?.variableName}
                      />
                    </div>

                    <div className="md:col-span-3">
                      <div className="relative">
                        <select
                          {...register(`variables.${index}.variableType` as const, {
                            required: "Requerido",
                          })}
                          className={`w-full h-[42px] bg-white dark:bg-gray-900 border ${errors.variables?.[index]?.variableType
                              ? "border-red-500"
                              : "border-gray-200 dark:border-gray-700"
                            } rounded-xl px-3 py-2 appearance-none focus:ring-2 focus:ring-blue-500/20 outline-none transition-all`}
                        >
                          <option value="">Tipo...</option>
                          <option value="text">Texto</option>
                          <option value="email">Email</option>
                          <option value="date">Fecha</option>
                          <option value="number">Número</option>
                        </select>
                        <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
                          <Type className="w-4 h-4" />
                        </div>
                      </div>
                    </div>

                    <div className="md:col-span-5">
                      <Input
                        type="text"
                        placeholder="Descripción de la variable"
                        {...register(
                          `variables.${index}.variableDescription` as const,
                          { required: "Requerido" }
                        )}
                        error={errors.variables?.[index]?.variableDescription}
                      />
                    </div>

                    <div className="md:col-span-1 flex justify-end md:justify-center pt-1">
                      <button
                        className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                        type="button"
                        onClick={() => remove(index)}
                        title="Eliminar"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center justify-between pt-4">
            <button
              type="button"
              className="flex items-center gap-2 px-6 py-3 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white font-medium transition-colors"
              onClick={() => navigate("/dashboard")}
            >
              <ArrowLeft className="w-5 h-5" /> Cancelar
            </button>
            <button
              type="submit"
              className="flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white px-8 py-3.5 rounded-xl shadow-lg shadow-orange-500/30 hover:shadow-orange-500/40 transition-all transform hover:-translate-y-0.5 font-medium"
            >
              Guardar Flujo <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
