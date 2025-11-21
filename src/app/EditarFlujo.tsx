import { ArrowLeft, Save, Trash2, Plus, SquareChartGantt, Type } from "lucide-react";
import Input from "../components/ui/Input";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useForm, useFieldArray, type SubmitHandler } from "react-hook-form";

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

export default function EditarFlujo() {
  const { id } = useParams();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<Flujo>();

  const { fields, append, remove } = useFieldArray({
    control,
    name: "variables",
  });

  // 🧠 Cargar datos del flujo seleccionado
  useEffect(() => {
    const flujosData = localStorage.getItem("flujos");

    if (!flujosData) {
      alert("⚠️ No se encontraron flujos en el almacenamiento.");
      return;
    }

    try {
      const flujos: Flujo[] = JSON.parse(flujosData);

      if (!Array.isArray(flujos)) {
        throw new Error("El formato de los flujos es inválido.");
      }

      const flujo = flujos.find((f) => f.id === Number(id));

      if (!flujo) {
        alert("❌ No se encontró el flujo con el ID proporcionado.");
        navigate("/dashboard");
        return;
      }

      reset(flujo);
    } catch (error) {
      console.error("❌ Error al parsear los flujos:", error);
      alert(
        "⚠️ No se pudieron cargar los datos. El formato en localStorage es inválido."
      );
      navigate("/dashboard");
    }
  }, [id, reset, navigate]);

  // 💾 Guardar los cambios
  const onSubmit: SubmitHandler<Flujo> = (data) => {
    const flujosData = localStorage.getItem("flujos");
    if (!flujosData) return;

    try {
      const flujos: Flujo[] = JSON.parse(flujosData);
      const actualizados = flujos.map((f) =>
        f.id === Number(id) ? { ...f, ...data } : f
      );

      localStorage.setItem("flujos", JSON.stringify(actualizados));
      alert("✅ Flujo actualizado correctamente");
      navigate("/dashboard");
    } catch (error) {
      console.error("❌ Error al guardar los cambios:", error);
      alert("Ocurrió un error al guardar los cambios del flujo.");
    }
  };

  return (
    <div className="min-h-screen pt-24 pb-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8 text-center">
          <div className="inline-flex p-3 rounded-2xl bg-blue-500/10 mb-4 shadow-lg shadow-blue-500/20">
            <SquareChartGantt className="w-8 h-8 text-blue-500" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Editar Flujo
          </h1>
          <p className="text-gray-500 dark:text-gray-400">
            Modifica los detalles y variables de tu asistente
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-6">
          {/* Main Info Card */}
          <div className="glass dark:glass-dark rounded-3xl p-8 border border-white/50 dark:border-white/10 shadow-xl">
            <h2 className="text-xl font-semibold mb-6 text-gray-900 dark:text-white flex items-center gap-2">
              <span className="w-1 h-6 bg-blue-500 rounded-full"></span>
              Información General
            </h2>

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5 ml-1">
                  Nombre del flujo
                </label>
                <Input
                  type="text"
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
                  className={`w-full h-32 resize-none bg-white/50 dark:bg-gray-900/50 border ${errors.description ? "border-red-500" : "border-gray-200 dark:border-gray-700"
                    } rounded-xl p-4 focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all outline-none`}
                />
              </div>
            </div>
          </div>

          {/* Variables Card */}
          <div className="glass dark:glass-dark rounded-3xl p-8 border border-white/50 dark:border-white/10 shadow-xl">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white flex items-center gap-2">
                <span className="w-1 h-6 bg-orange-500 rounded-full"></span>
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
                className="text-sm font-medium text-orange-600 dark:text-orange-400 hover:bg-orange-50 dark:hover:bg-orange-900/20 px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1.5"
              >
                <Plus className="w-4 h-4" /> Agregar Variable
              </button>
            </div>

            <div className="space-y-4">
              {fields.map((field, index) => (
                <div
                  key={field.id}
                  className="p-4 bg-gray-50/50 dark:bg-gray-800/30 rounded-2xl border border-gray-100 dark:border-gray-700/50 hover:border-orange-200 dark:hover:border-orange-800 transition-colors relative group"
                >
                  <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-start">
                    <div className="md:col-span-3">
                      <Input
                        type="text"
                        placeholder="Nombre"
                        {...register(`variables.${index}.variableName` as const)}
                        error={errors.variables?.[index]?.variableName}
                      />
                    </div>

                    <div className="md:col-span-3">
                      <div className="relative">
                        <select
                          {...register(`variables.${index}.variableType` as const)}
                          className="w-full h-[42px] bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl px-3 py-2 appearance-none focus:ring-2 focus:ring-orange-500/20 outline-none transition-all"
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
                        placeholder="Descripción"
                        {...register(`variables.${index}.variableDescription` as const)}
                        error={errors.variables?.[index]?.variableDescription}
                      />
                    </div>

                    <div className="md:col-span-1 flex justify-end md:justify-center pt-1">
                      <button
                        type="button"
                        onClick={() => remove(index)}
                        className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
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
              onClick={() => navigate("/dashboard")}
              className="flex items-center gap-2 px-6 py-3 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white font-medium transition-colors"
            >
              <ArrowLeft className="w-5 h-5" /> Cancelar
            </button>
            <button
              type="submit"
              className="flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white px-8 py-3.5 rounded-xl shadow-lg shadow-blue-500/30 hover:shadow-blue-500/40 transition-all transform hover:-translate-y-0.5 font-medium"
            >
              <Save className="w-5 h-5" /> Guardar Cambios
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
