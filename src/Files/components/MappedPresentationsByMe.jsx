import { useGetEventsById } from "../../hooks/useGetEventsById"
import { useLogin } from "../../hooks/useLogin"
import useFiles from "../hook/useFiles"
import { formatDate } from "../utils/formatDate"
import { formatSize } from "../utils/formatSize"
import { getFileIcon } from "../utils/getFileIcon"
import axios from "axios"
import endpoints from "../../utils/endpoints"
import { useRef } from "react";

export const MappedPresentationsByMe = () => {
    const {token} = useLogin()
    const {archivoscreados} = useGetEventsById()
    console.log(archivoscreados)
    const {loading,handlePresentacionesDelete} = useFiles()

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

    // Agrupar archivos por evento
    const archivosPorEvento = archivoscreados.reduce((acc, presentacion) => {
        const eventTitle = presentacion.event?.title || 'Sin evento';
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
                                <button
                                    onClick={() => handlePresentacionesDelete(presentacion._id)}
                                    className="btn-delete"
                                    disabled={loading}
                                >
                                    Eliminar
                                </button>
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
        <div style={{ width: '100%', margin: '0 auto' }}>
            {loading && !archivoscreados.length ? (
                <div className="loading">Cargando archivos...</div>
            ) : Object.keys(archivosPorEvento).length === 0 ? (
                <div className="no-archivos">No hay archivos disponibles</div>
            ) : (
                Object.entries(archivosPorEvento).map(([evento, archivos]) => (
                    <div key={evento} style={{ marginBottom: '2.5rem' }}>
                        <h2 style={{ fontWeight: 700, fontSize: '1.2rem', margin: '1.2rem 0 0.5rem 0', color: '#2563eb' }}>{evento}</h2>
                        <CarruselArchivos archivos={archivos} />
                    </div>
                ))
            )}
        </div>
    );
}