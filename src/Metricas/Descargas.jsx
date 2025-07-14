import { useQuery } from "@tanstack/react-query";
import {
  LineChart,
  Line,
  ResponsiveContainer,
} from "recharts";
import { useDisertanteFilter } from "../hooks/useDisertanteFilter";

const graf = [
  { value: 12000 },
  { value: 12350 },
  { value: 12200 },
  { value: 12100 },
  { value: 12150 },
  { value: 12200 },
  { value: 12400 },
  { value: 15231 },
];

export default function DescargasMetrica({id,title}) {
const {handlePublicDownloads} = useDisertanteFilter()
const {data, isPending} = useQuery({
  queryKey:['metricas-descargas',id],
  queryFn:() => handlePublicDownloads(id)
})



  return (
    <div className="w-full h-[222px] max-w-sm rounded-xl shadow border p-4 bg-white flex flex-col gap-2">
      <div className="flex justify-between items-start">
        <div>
          <p className="text-sm text-gray-500"> {isPending ? 'Cargando..' : `Descargas Archivos ${title}`} </p>
          <h2 className="text-2xl font-bold text-black"> {isPending ? 'Cargando..' : `+${data?.descargas}`}</h2>
          <p className="text-sm text-gray-400">+20.1% from last month</p>
        </div>
      </div>

      <div className="w-full h-24 -mb-2">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={graf}>
            <Line
              type="monotone"
              dataKey="value"
              stroke="#000"
              strokeWidth={2}
              dot={{
                r: 4,
                stroke: "#000",
                strokeWidth: 2,
                fill: "#fff",
              }}
              activeDot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
