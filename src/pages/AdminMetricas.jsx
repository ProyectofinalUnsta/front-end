import './adminmetricas.css'
import { useNavigate } from 'react-router-dom'
import { PermisosTable } from '../Metricas/PermisosTable'
import  Inscriptos  from '../Metricas/Inscriptos'
import DescargasMetrica from '../Metricas/Descargas'
import { FilterIcon } from '../icons/FilterIcon'
import { useGetEventsById } from '../hooks/useGetEventsById'
import { useDisertanteFilter } from '../hooks/useDisertanteFilter'


export default function AdminMetricas() {
  const navigate = useNavigate()
    const {eventoscreados} = useGetEventsById()
  const {filteredEvents,handlefilterEvent,id,keyword} = useDisertanteFilter()


  return (
    <div style={{height:'auto',background:'#f7f8fa'}}>
      <div className='flex flex-col gap-4 max-w-[800px] mx-auto pt-8'>
        <button
        className='w-80'
          onClick={()=>navigate('/Admin')}
          style={{
            background:'#1976d2',color:'#fff',border:'none',borderRadius:6,padding:'8px 18px',fontWeight:600,marginBottom:24,cursor:'pointer',boxShadow:'0 2px 8px #0001',transition:'background .2s',fontSize:16
          }}
        >
          ← Volver al panel admin
        </button>
        <header className='pl-4 w-full flex flex-row gap-3 items-center h-15 bg-white shadow rounded-lg'>
          <aside className='flex flex-row itmes-center gap-2'>
          <FilterIcon/>
          <h2 className='text font-normal text-md'>Filtrar</h2>
          </aside>
         <select className='h-10 w-60 p-1 bg-gray-100 rounded-xl shadow' name="misEventos" id="" onChange={(e)=>handlefilterEvent(e.target.value)}>
          {eventoscreados.map(miseventos => (
             <option key={miseventos._id} value={miseventos.title}>{miseventos.title}</option>
          ))}
         
         </select>
        </header>
        <section className='w-full flex justify-center items-center h-15 bg-white'>
           <h2 className='text font-semibold text-lg'>{filteredEvents?.title} </h2>
        </section>
        {/* <AdminMetrics/> */}
        <div className='w-full  chartsContainer mb-4 mt-4 gap-4 '>
        <Inscriptos keyword={keyword} />
        <DescargasMetrica id={id} title={filteredEvents?.title}/>
        </div>
        <div className='w-auto m-4 pb-4'>
          <PermisosTable id={id}/>
        </div>
      </div>
    </div>
  )
} 