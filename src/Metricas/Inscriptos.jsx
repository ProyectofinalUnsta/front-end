import { useQuery } from "@tanstack/react-query";
import {
  AreaChart,
  Area,
  ResponsiveContainer,
} from "recharts";
import { useDisertanteFilter } from "../hooks/useDisertanteFilter";

const graf = [
  { value: 100 },
  { value: 400 },
  { value: 200 },
  { value: 500 },
  { value: 100 },
  { value: 150 },
];

export default function Inscriptos({keyword}) {

const {getListaInscriptosMetricas} = useDisertanteFilter()
const {data,isPending,error} = useQuery({
  queryKey:['metricas-inscriptos',keyword],
  queryFn:() => getListaInscriptosMetricas(keyword)
})

console.log(data)



  return (
    <div className="w-full h-[222px] max-w-sm rounded-xl shadow border p-4 bg-white flex flex-col gap-2">
    
       <>
      <div className="flex justify-between items-start">
        <div>
          <p className="text-sm text-gray-500">Inscriptos {isPending ? 'Cargando..' : data?.nombreEvento} </p>
          <h2 className="text-2xl font-bold text-black">+ {isPending ? 'Cargando..' : data?.cantidadInscriptos}</h2>
          <p className="text-sm text-gray-400">+180.1% from last month</p>
        </div>
      </div>

      <div className="w-full h-24 -mb-2">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={graf}>
            <defs>
              <linearGradient id="areaFill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#000" stopOpacity={0.1} />
                <stop offset="100%" stopColor="#000" stopOpacity={0.05} />
              </linearGradient>
            </defs>
            <Area
              type="monotone"
              dataKey="value"
              stroke="#000"
              strokeWidth={2}
              fill="url(#areaFill)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
</> 
    </div>
  );
}
