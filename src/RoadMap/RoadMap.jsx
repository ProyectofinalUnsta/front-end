

const steps = [
  {
    id: 1,
    title: "Crear evento",
    status: "completado",
    icon: "🟢",
    message: "Evento creado correctamente",
    date: "hace 3 días",
  },
  {
    id: 2,
    title: "Agregar ponentes",
    status: "en progreso",
    icon: "🟠",
    message: "Falta añadir 2 ponentes",
    date: "hace 1 día",
  },
  {
    id: 3,
    title: "Subir presentaciones",
    status: "pendiente",
    icon: "🔴",
    message: "Sin archivos subidos aún",
  },
  {
    id: 4,
    title: "Activar registro",
    status: "completado",
    icon: "🟢",
    message: "Formulario activo",
    date: "hoy",
  },
];

export default function Roadmap() {
  const completedSteps = steps.filter((step) => step.status === "completado").length;
  const progress = Math.round((completedSteps / steps.length) * 100);

  return (
    <div className="w-full max-w-xl mx-auto mt-8 p-4 border rounded-2xl shadow-md bg-white">
      <h2 className="text-xl font-semibold mb-4">📈 {completedSteps} de {steps.length} pasos completados ({progress}%)</h2>
      <div className="space-y-6 border-l-2 border-gray-300 pl-4">
        {steps.map((step) => (
          <div key={step.id} className="relative">
            <div className="absolute -left-5 top-1 text-lg">{step.icon}</div>
            <div className="flex flex-col">
              <span className="text-base font-medium">{step.title}</span>
              <span className="text-sm text-gray-600">{step.message}</span>
              {step.date && <span className="text-xs text-gray-400">{step.date}</span>}
              <div className="mt-2 flex gap-2">
                <button className="px-2 py-1 text-sm bg-gray-200 rounded">Editar</button>
                {step.status !== "completado" && (
                  <button className="px-2 py-1 text-sm bg-blue-500 text-white rounded">Completar</button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}