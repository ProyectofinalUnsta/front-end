import { useState } from 'react'
import '../global/MisArchivos.css'
import { Layout } from './Layout'
import FiltroArchivo from '../FiltroArchivos/FiltroArchivo';
import useHandleFiles from '../FiltroArchivos/hook/useHandleFiles';
import { formatSize } from '../Files/utils/formatSize';
import { formatDate } from '../Files/utils/formatDate';
import { MappedPresentations } from '../Files/components/MappedPresentations';
import { useGetEventsById } from '../hooks/useGetEventsById';
import endpoints from '../utils/endpoints';
import axios from 'axios';
import { useLogin } from '../hooks/useLogin';
import { MappedPresentationsByMe } from '../Files/components/MappedPresentationsByMe';
import { useRef } from 'react';


export default function MisArchivos() {
    const {porMi,loading,handlePresentacionesDelete} = useHandleFiles()
   const [error,setError] = useState(false)
   const {eventosinscripto,archivoscreados} = useGetEventsById()
  const {token} = useLogin()

    const getFileIcon = (fileType) => {
        switch(fileType.toLowerCase()) {
            case '.pdf': return '📄';
            case '.doc':
            case '.docx': return '📝';
            case '.ppt':
            case '.pptx': return '📊';
            case '.jpg':
            case '.jpeg':
            case '.png': return '🖼️';
            default: return '📁';
        }
    };

       const downloadPresentacion = async (ruta) => {
  try {
    const response = await axios.get(ruta, {
      headers: {
        Authorization: `Bearer ${token}`
      },
      responseType: 'blob'
    });

    const blob = new Blob([response.data]);
    const url = window.URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.href = url;

    // Opcional: intentá extraer el nombre del header
const contentDisposition = response.headers['content-disposition']
console.log(contentDisposition)
let filename;


  filename = contentDisposition
    .split('filename=')[1]
    .split(':')[0]
    .replace(/["']/g, '');
    console.log(contentDisposition)

    link.download = filename;
    document.body.appendChild(link);
    link.click();
    link.remove();
    window.URL.revokeObjectURL(url);
  } catch (err) {
    console.error("Error al descargar:", err);
  }
};

    // Crear un mapa de id a título de evento para referencia cruzada
    const idToTitle = (eventosinscripto || []).reduce((acc, ev) => {
        if (ev.event && ev.event._id && ev.event.title) {
            acc[ev.event._id] = ev.event.title;
        } else if (ev._id && ev.title) {
            acc[ev._id] = ev.title;
        }
        return acc;
    }, {});

    // Agrupar archivos inscriptos por evento usando el título correcto
    const archivosPorEvento = (eventosinscripto || []).reduce((acc, presentacion) => {
        let eventTitle = presentacion.event?.title;
        if (!eventTitle && presentacion.event && idToTitle[presentacion.event]) {
            eventTitle = idToTitle[presentacion.event];
        }
        if (!eventTitle) eventTitle = 'Evento sin nombre';
        if (!acc[eventTitle]) acc[eventTitle] = [];
        acc[eventTitle].push(presentacion);
        return acc;
    }, {});

    // Carrusel simple con scroll horizontal y flechas
    const CarruselArchivos = ({ archivos }) => {
        const scrollRef = useRef(null);
        const scroll = (dir) => {
            if (scrollRef.current) {
                scrollRef.current.scrollBy({ left: dir * 320, behavior: 'smooth' });
            }
        };
        return (
            <div style={{ position: 'relative', width: '100%' }}>
                <button onClick={() => scroll(-1)} className="carrusel-flecha left">◀</button>
                <div
                    ref={scrollRef}
                    style={{
                        display: 'flex',
                        overflowX: 'auto',
                        gap: '1.2rem',
                        padding: '1rem 0',
                        scrollSnapType: 'x mandatory',
                        scrollbarWidth: 'thin',
                        width: '100%',
                    }}
                >
                    {archivos.map((presentacion) => (
                        <div key={presentacion._id} className="archivo-card" style={{ minWidth: 300, maxWidth: 340, scrollSnapAlign: 'start' }}>
                            <div className="archivo-icon" style={{ fontSize: '2.5rem', textAlign: 'center' }}>
                                {getFileIcon(presentacion.filename)}
                            </div>
                            <div className="archivo-info">
                                <h3>Nombre: {presentacion.filename}</h3>
                                <p>Subido Por: {presentacion.user}</p>
                                <p>Gmail: {presentacion.gmail}</p>
                                <p>Evento: {presentacion.event?.title}</p>
                                <p>Fecha: {formatDate(presentacion.uploadDate)}</p>
                                <p>Tamaño: {formatSize(presentacion.fileSize)}</p>
                            </div>
                            <div className="archivo-actions">
                                <a
                                    onClick={() => downloadPresentacion(`${endpoints.presentaciones}download/${presentacion._id}`)}
                                    className="btn-download"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    Descargar
                                </a>
                            </div>
                        </div>
                    ))}
                </div>
                <button onClick={() => scroll(1)} className="carrusel-flecha right">▶</button>
                <style>{`
                    .carrusel-flecha {
                        position: absolute;
                        top: 50%;
                        transform: translateY(-50%);
                        background: #fff;
                        border: 1px solid #ddd;
                        border-radius: 50%;
                        width: 36px;
                        height: 36px;
                        font-size: 1.5rem;
                        cursor: pointer;
                        z-index: 2;
                        box-shadow: 0 2px 8px #0001;
                        opacity: 0.7;
                        transition: opacity 0.2s;
                    }
                    .carrusel-flecha.left { left: -18px; }
                    .carrusel-flecha.right { right: -18px; }
                    @media (max-width: 700px) {
                        .carrusel-flecha { display: none; }
                    }
                `}</style>
            </div>
        );
    };


    return (
        <Layout>
            <div className="mis-archivos-container">
                <div className="header">
                  
                    <h1 className="page-title">Archivos Disponibles</h1>
                    <div className="title-divider"></div>
                    <FiltroArchivo/>
                    <p className="page-subtitle">Descarga y gestiona todos los archivos de presentaciones</p>
                </div>

                {error && <div className="alert alert-error">{error}</div>}

                <div className="">
                {porMi == true ? <MappedPresentationsByMe/> : (
                    Object.keys(archivosPorEvento || {}).length === 0 ? (
                        loading ? <div className="loading">Cargando archivos...</div> : <div className="no-archivos">No hay archivos disponibles</div>
                    ) : (
                        Object.entries(archivosPorEvento).map(([evento, archivos]) => (
                            <div key={evento} style={{ marginBottom: '2.5rem' }}>
                                <h2 style={{ fontWeight: 700, fontSize: '1.2rem', margin: '1.2rem 0 0.5rem 0', color: '#2563eb' }}>{evento}</h2>
                                <CarruselArchivos archivos={archivos} />
                            </div>
                        ))
                    )
                )}
{/*                  
                    { loading ? (
                        <div className="loading">Cargando archivos...</div>
                    ) : archivos.length === 0 ? (
                        <div className="no-archivos">No hay archivos disponibles</div>
                    ) : (
                        archivos.map(archivo => (
                            <div key={archivo._id} className="archivo-card">
                                <div className="archivo-icon">
                                    {getFileIcon(archivo.fileType)}
                                </div>
                                <div className="archivo-info">
                                    <h3>{archivo.originalName}</h3>
                                    <p>Evento: {archivo.eventCode}</p>
                                    <p>Fecha: {formatDate(archivo.uploadDate)}</p>
                                    <p>Tamaño: {formatSize(archivo.size)}</p>
                                </div>
                                <div className="archivo-actions">
                                    <a 
                                        href={`https://back-end-fiq8.onrender.com${archivo.fileUrl}`}
                                        className="btn-download"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        Descargar
                                    </a>
                                </div>
                            </div>
                        ))
                    )} */}
                </div>
            </div>
        </Layout>
    );
} 

