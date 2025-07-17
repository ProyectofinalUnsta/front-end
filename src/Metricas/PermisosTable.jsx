import { useState } from "react"
import './permiso.css'
import { useQuery } from "@tanstack/react-query"
import { useDisertanteFilter } from "../hooks/useDisertanteFilter"


export const PermisosTable = ({id}) => {
const {getListaDisertantesMetricas} = useDisertanteFilter()

  const {data,isPending,error} = useQuery({
    queryKey: ['disertantes-metricas',id],
    queryFn:async () => await getListaDisertantesMetricas(id),
  })

  const [page, setPage] = useState(1);

  const itemsPerPage = 4;

  const lista = data?.lista ?? [];

  const paginatedItems = lista.slice((page - 1) * itemsPerPage, page * itemsPerPage);

  const totalPages = Math.ceil(lista.length / itemsPerPage);

const nextPage = () => {
  if(page >= totalPages) return
  setPage(page + 1)
}

const forwardPage = () => {
   if(page == 1) return
 setPage(page - 1)
}


    const [activeToolTip,setActiveToolTip] = useState(false)
   const [copy,setCopy] = useState({value:false,message:'Copiado!'})
  const url = `https://www.eventum.lat/Eventos/CargarDatos/${id}`
   const handleCopy = async () => {
    if(copy.value) return
     await navigator.clipboard.writeText(url);
    setCopy(state => ({...state,value:!state.value}))

   }

return(
    <div className="w-auto h-auto DisertanteLista flex flex-col gap-4 bg-white shadow rounded-xl z-0">
      <header className="flex flex-col gap-2">
        <h2 className="font-semibold text-2xl font-sans"> Disertantes</h2>
        <small className="text-thin text-gray-500 font-sans">Gestiona tus disertantes.</small>
        <div className="w-full h-12 flex flex-row justify-between items-center text-center">
         <input className="h-3/4 w-3/4 text-sm pl-2 mt-2 border-1 border-gray-300 rounded-lg" type="text" value={url} disabled/>
        <button className="h-3/4 w-1/6 mt-1 rounded-lg text-xs md:text-sm text-black font-semibold border-1 border-gray-300 hover:bg-gray-400 transition" onClick={()=>handleCopy()}>{copy.value == true ? copy.message : 'Copiar'}</button>
        </div>
      
      </header>
     <section className="border border-gray-200 rounded-lg h-58 overflow-y-scroll">
  <div className="w-full grillalistadisertante  border-b border-gray-200 hover:bg-[#e5e5e533]">
    <h2 className=" nombregrilla flex items-center text labelsText font-sans font-semibold">Nombre</h2>
    <h2 className=" mailgrilla flex items-center text labelsText  font-semibold">Gmail</h2>
    <h2 className=" actionsgrilla text labelsText  font-semibold">Acciones</h2>
  </div>


{isPending ? (<div className="px-4 py-6 text-center text-sm text-gray-500">
    Cargando..
  </div> ) : (data.total == 0 || !data?.length ? 
     <div className="px-4 py-6 text-center text-sm text-gray-500">
    Aún no hay disertantes.
  </div>
   :  paginatedItems?.map((disertante, index) => (
    <aside
      key={index}
      className="w-full h-[49px] grillalistadisertante  sm:grid-cols-10 gap-0 px-4 py-2 border-t border-gray-100 hover:bg-[#e5e5e533]"
    >
      <h2 className="nombregrilla flex items-center rowText text-[#222] overflow-hidden">
        {disertante.fullName}
      </h2>
      <h2 className="mailgrilla flex items-center rowText overflow-hidden">{disertante.gmail}</h2>

      <div className="actionsgrilla f relative ">
        <span
          onClick={() =>
            setActiveToolTip(activeToolTip === index ? null : index)
          }
          className="hover:bg-[#e6e6e6] pb-2 px-2 rounded-lg cursor-pointer"
        >
          ...
        </span>

        {activeToolTip === index && (
          <div className="absolute top-full mt-1 right-[9.3rem] z-10">
            <PermisosToolTip />
          </div>
        )}
      </div>
    </aside> )))}

{error ? <div className="px-4 py-6 text-center text-sm text-gray-500">
    Error al traer disertantes
  </div> : null }
</section>

<footer className="w-full grid grid-cols-8 md:grid-cols-10 h-8 pl-2">
<h2 className="text h-full flex items-center text-sm font col-span-3  md:col-span-4 text-gray-600 font-normal">{data?.lista?.length ? data.lista.length : 0} Disertantes</h2>
<h2 className="text h-full flex items-center text-sm font col-span-2  md:col-span-4 text-gray-600 font-normal">{page} / {totalPages}</h2>
<aside className=" h-full col-span-1 md:col-span-2 flex flex-row items-center gap-2">
<button className="px-2 py-1 rounded-lg text-gray-400  border-1 border-gray-300 transition  hover:bg-[#999] hover:text-white" onClick={()=>forwardPage()}>Prev</button>
<button className="px-2 py-1 rounded-lg text-gray-400 border-1 border-gray-300 transition   hover:bg-[#111] hover:text-white" onClick={()=>nextPage()}>Next</button>
</aside>
</footer>
    </div>
)
}


export const PermisosToolTip = () => {
    return(
        <div className="z-50 absolute w-40 bg-white p-2 rounded-xl border-1 border-gray-300 flex flex-col gap-2"> 
         <header className="w-full">
            <h2 className="pl-2 text-black font-semibold">Acciones</h2>
         </header>
         <aside className="w-full flex flex-col gap-2 ">
            <h2 className="p-2 rounded-lg text   hover:hover:bg-[#eeeeee]">Eliminar</h2>
            <h2 className="p-2 rounded-lg text hover:hover:bg-[#eeeeee]">Desactivar</h2>
         </aside>
        </div>
    )
} 