import { DateIcon } from '../../icons/DateIcon'
import { PlaceIcon } from '../../icons/PlaceIcon'
import { RelojIcon } from '../../icons/RelojIcon'
import { BackArrowIcon } from '../../icons/BackArrowIcon'
import { useNavigate } from 'react-router-dom'
import { useNavegacion } from '../../hooks/useNavegacion'
import useInscriptos from '../../hooks/useInscriptos'
import { useState, useEffect } from 'react'
import endpoints from '../../utils/endpoints'
import axios from 'axios'
import { formatDate } from '../../Files/utils/formatDate'
import { formatSize } from '../../Files/utils/formatSize'
import { EventRegistrationPopup } from '../../components/EventRegistrationPopup'
import '../style/carddetails.css'
import { deburr } from 'lodash'
import { useLogin } from '../../hooks/useLogin'

export const CardDetails = ({_id, lugar, fecha, hora, title, descripcion, imagen}) => {
  const {inscripto} = useInscriptos({_id, title})
  const [openregistromodal, setOpenRegistroModal] = useState(false)
  const [archivos, setArchivos] = useState([])
  const [loading, setLoading] = useState(false)
  const {handlenavigate} = useNavegacion()
  const navigate = useNavigate()
  const ruta = '/Eventos/CargarDatos'
  const { token } = useLogin()
  const gmail = localStorage.getItem('Inscripto-Gmail')
  const [showImageModal, setShowImageModal] = useState(false)
  const [bajaLoading, setBajaLoading] = useState(false)

  useEffect(() => {
    if(!_id) return
    const fetchArchivos = async () => {
      setLoading(true)
      try {
        // Buscar archivos por eventId (relación por _id)
        const res = await axios.get(`${endpoints.presentaciones}`)
        // Filtrar presentaciones cuyo campo event sea igual al _id del evento
        const archivosEvento = res.data.filter(a => String(a.event) === String(_id) || a.event?._id === _id)
        setArchivos(archivosEvento)
      } catch (err) {
        setArchivos([])
      } finally {
        setLoading(false)
      }
    }
    fetchArchivos()
  }, [_id])

  const downloadPresentacion = async (ruta) => {
    try {
      const response = await axios.get(ruta, {
        headers: {
          Authorization: `Bearer ${token}`
        },
        responseType: 'blob'
      })
      const blob = new Blob([response.data])
      const url = window.URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.href = url
      const contentDisposition = response.headers['content-disposition']
      let filename
      if(contentDisposition) {
        filename = contentDisposition.split('filename=')[1]?.split(':')[0]?.replace(/["']/g, '') || 'archivo'
      } else {
        filename = 'archivo'
      }
      link.download = filename
      document.body.appendChild(link)
      link.click()
      link.remove()
      window.URL.revokeObjectURL(url)
    } catch (err) {
      alert('Error al descargar el archivo')
    }
  }

  // Baja de evento
  const handleBaja = async () => {
    setBajaLoading(true)
    try {
      await axios.delete(`${endpoints.inscripciones}baja`, {
        data: { gmail, idEvento: _id },
        headers: { Authorization: `Bearer ${token}` }
      })
      window.location.reload()
    } catch (err) {
      alert('Error al darse de baja')
    } finally {
      setBajaLoading(false)
    }
  }

  return (
    <div className="event-details-main-container">
      {/* Botón volver */}
      <button className="back-button-pro" onClick={() => navigate(-1)}>
        <BackArrowIcon /> Volver
      </button>

      {/* Header del evento */}
      <div className="event-header-pro">
        <div className="event-image-pro">
          <img 
            src={imagen || "https://kzmo4ra0ji5m2etf47ef.lite.vusercontent.net/placeholder.svg?height=400&width=600"} 
            alt="Imagen del evento" 
            style={{cursor:'pointer'}} 
            onClick={()=>setShowImageModal(true)}
          />
        </div>
        <div className="event-header-info-pro">
          <h1 className="event-title-pro">{title}</h1>
          <div className="event-meta-pro">
            <span><DateIcon /> {fecha}</span>
            <span><RelojIcon /> {hora}</span>
            <span><PlaceIcon /> {lugar}</span>
          </div>
        </div>
      </div>

      {/* Descripción */}
      <div className="event-description-pro">
        <h2>Descripción</h2>
        <p style={{wordBreak:'break-word',whiteSpace:'pre-line'}}>{descripcion}</p>
      </div>

      {/* Acciones */}
      <div className="event-actions-pro">
        <button className="disertante-event-btn-pro" onClick={()=>handlenavigate({ruta,params:{_id,title}})}>
          Ingresa como disertante
        </button>
        {inscripto === false ?  (
          <button className="register-event-btn-pro" onClick={() => setOpenRegistroModal(!openregistromodal)}>
            Registrarse en el evento
          </button>
        ) : (
          <>
            <button className="register-event-btn-pro" disabled>
              Ya estás inscripto
            </button>
            <button 
              className="event-unsubscribe-btn-pro"
              style={{marginLeft:8,background:'#fff',color:'#d32f2f',border:'1px solid #d32f2f',fontSize:13,padding:'4px 10px',borderRadius:6,opacity:0.7,cursor:bajaLoading?'not-allowed':'pointer'}}
              onClick={handleBaja}
              disabled={bajaLoading}
              title="Darse de baja del evento"
            >
              {bajaLoading ? 'Procesando...' : 'Darse de baja'}
            </button>
             
          </>
        )}
      </div>

      {/* Archivos del evento */}
      {inscripto === true && (
      <div className="event-files-section-pro">
        <h3><span role="img" aria-label="archivos">📁</span> Archivos del evento</h3>
        {loading ? (
          <div className="event-files-loading-pro">Cargando archivos...</div>
        ) : archivos.length === 0 ? (
          <div className="event-files-empty-pro">No hay archivos disponibles</div>
        ) : (
          <ul className="event-files-list-pro">
            {archivos.map(archivo => (
              <li key={archivo._id} className="event-file-item-pro">
                <span className="event-file-name-pro">{archivo.originalName}</span>
                <span className="event-file-date-pro">{formatDate(archivo.uploadDate)}</span>
                <span className="event-file-size-pro">{formatSize(archivo.fileSize)}</span>
                <button className="event-file-download-pro" onClick={()=>downloadPresentacion(`${endpoints.presentaciones}download/${archivo._id}`)}>Descargar</button>
              </li>
            ))}
          </ul>
        )}
      </div>
      )}

      <EventRegistrationPopup Modal={openregistromodal} closeModal={() => setOpenRegistroModal(false)} _id={_id} title={title} />

      {/* Modal de imagen grande */}
      {showImageModal && (
        <div 
          style={{
            position:'fixed',top:0,left:0,width:'100vw',height:'100vh',background:'rgba(0,0,0,0.8)',display:'flex',alignItems:'center',justifyContent:'center',zIndex:1000
          }}
          onClick={()=>setShowImageModal(false)}
        >
          <img 
            src={imagen || "https://kzmo4ra0ji5m2etf47ef.lite.vusercontent.net/placeholder.svg?height=400&width=600"} 
            alt="Imagen grande del evento" 
            style={{maxWidth:'90vw',maxHeight:'90vh',borderRadius:'10px',boxShadow:'0 0 20px #000'}}
          />
        </div>
      )}
    </div>
  )
}
