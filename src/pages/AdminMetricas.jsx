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
    <div style={{minHeight:'100vh',background:'linear-gradient(135deg, #e0e7ff 0%, #f7f8fa 100%)',padding:'0 0 40px 0'}}>
      <div className='flex flex-col gap-6 max-w-[1000px] mx-auto pt-20 pb-10' style={{background:'#fff',borderRadius:22,boxShadow:'0 8px 40px rgba(37,99,235,0.13)',marginTop:48}}>
        <div style={{display:'flex',justifyContent:'center',width:'100%',marginBottom:32}}>
          <button
            className='w-80'
            onClick={()=>navigate('/Admin')}
            style={{
              background:'linear-gradient(90deg, #2563eb 0%, #dc2626 100%)',
              color:'#fff',
              border:'none',
              borderRadius:8,
              padding:'9px 22px',
              fontWeight:700,
              cursor:'pointer',
              boxShadow:'0 4px 16px #2563eb22',
              transition:'background .2s',
              fontSize:16,
              letterSpacing:0.5,
            }}
          >
            ← Volver al panel admin
          </button>
        </div>
        <h1 style={{textAlign:'center',fontWeight:900,fontSize:'2.2rem',color:'#2563eb',marginBottom:0,letterSpacing:'-1px'}}>Métricas de tus eventos</h1>
        <header className='w-full flex flex-row gap-4 items-center justify-center h-15 bg-white shadow rounded-lg p-4' style={{margin:'0 auto',maxWidth:600}}>
          <aside className='flex flex-row items-center gap-2'>
            <FilterIcon/>
            <span style={{fontWeight:700,fontSize:'1.1rem',color:'#374151'}}>Filtrar evento</span>
          </aside>
          <select
            className="h-11 w-64 p-2 bg-gray-100 rounded-xl shadow border-2 border-blue-200 focus:border-blue-500 outline-none text-base font-semibold"
            name="misEventos"
            onChange={(e) => handlefilterEvent(e.target.value)}
            style={{marginLeft:12}}
          >
            {eventoscreados?.length === 1 ? (
              <option key={eventoscreados[0]._id} value={eventoscreados[0].title}>
                {eventoscreados[0].title}
              </option>
            ) : eventoscreados?.length > 1 ? (
              <>
                {eventoscreados?.map((miseventos) => (
                  <option key={miseventos._id} value={miseventos.title}>
                    {miseventos.title}
                  </option>
                ))}
              </>
            ) : (
              <option value="">No hay Eventos!</option>
            )}
          </select>
        </header>
        <section className='w-full flex justify-center items-center h-15 bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg shadow' style={{padding:'1.2rem 0',margin:'0 auto',maxWidth:600}}>
          <h2 className='text font-bold text-xl' style={{color:'#2563eb',letterSpacing:'-0.5px'}}>
            { filteredEvents?.title ? filteredEvents?.title : 'No hay Eventos!' }
          </h2>
        </section>
        <div className='w-full flex flex-col md:flex-row gap-6 chartsContainer mb-4 mt-4 justify-center items-stretch'>
          <div style={{flex:1,background:'#f1f5ff',borderRadius:14,boxShadow:'0 2px 12px #2563eb11',padding:'1.5rem',minWidth:280}}>
            <h3 style={{fontWeight:700,color:'#2563eb',marginBottom:12,fontSize:'1.1rem'}}>Inscriptos</h3>
            <Inscriptos keyword={keyword} />
          </div>
          <div style={{flex:1,background:'#f1f5ff',borderRadius:14,boxShadow:'0 2px 12px #2563eb11',padding:'1.5rem',minWidth:280}}>
            <h3 style={{fontWeight:700,color:'#2563eb',marginBottom:12,fontSize:'1.1rem'}}>Descargas</h3>
            <DescargasMetrica id={id} title={filteredEvents?.title}/>
          </div>
        </div>
        <div className='w-full bg-gradient-to-r from-blue-50 to-blue-100 rounded-xl shadow p-6 mt-2 mb-4'>
          <h3 style={{fontWeight:700,color:'#2563eb',marginBottom:16,fontSize:'1.1rem'}}>Permisos y roles</h3>
          <PermisosTable id={id}/> 
        </div>
      </div>
    </div>
  )
} 