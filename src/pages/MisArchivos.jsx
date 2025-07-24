import { useState } from 'react';
import '../global/MisArchivos.css';
import { Layout } from './Layout';
import FiltroArchivo from '../FiltroArchivos/FiltroArchivo';
import useHandleFiles from '../FiltroArchivos/hook/useHandleFiles';
import { formatSize } from '../Files/utils/formatSize';
import { formatDate } from '../Files/utils/formatDate';
import endpoints from '../utils/endpoints';
import axios from 'axios';
import { MappedPresentationsByMe } from '../Files/components/MappedPresentationsByMe';
import { getArchivosEvetnoInscripto } from '../utils/peticiones';

export default function MisArchivos() {
    const { porMi, loading } = useHandleFiles();
    const [error, setError] = useState(false);
    const [archivos, setArchivos] = useState([]);
    const [gmail, setGmail] = useState('');
    const [buscado, setBuscado] = useState(false);
    const [previewUrl, setPreviewUrl] = useState(null);
    const [isPreviewLoading, setIsPreviewLoading] = useState(false);
    const [previewError, setPreviewError] = useState(null);

    // Pedir archivos solo si hay gmail y se buscó
    const handleBuscarArchivos = async (e) => {
        e.preventDefault();
        setError(false);
        setBuscado(false);
        setArchivos([]);
        if (!gmail || !/^[^@\s]+@gmail\.com$/.test(gmail)) {
            setError('Por favor ingresa un Gmail válido.');
            return;
        }
        try {
            setBuscado(true);
            const res = await getArchivosEvetnoInscripto(gmail);
            setArchivos(res.data || []);
        } catch (err) {
            setError('No se pudieron cargar los archivos para ese Gmail.');
            setArchivos([]);
        }
    };

    const getFileIcon = (fileType) => {
        if (!fileType) return '📁';
        if (fileType.includes('pdf')) return '📄';
        if (fileType.includes('doc') || fileType.includes('word')) return '📝';
        if (fileType.includes('docx') || fileType.includes('word')) return '📝';
        if (fileType.includes('pptx') || fileType.includes('powerpoint')) return '📊';
        if (fileType.includes('ppt') || fileType.includes('powerpoint')) return '📊';
        if (fileType.includes('image')) return '🖼️';
        return '📁';
    };

    // --- FUNCIÓN PARA VISTA PREVIA ---
    const handleVerArchivo = async (fileId) => {
        setIsPreviewLoading(true);
        setPreviewError(null);
        setPreviewUrl(null);
        const url = `${endpoints.presentaciones}download/${fileId}`;
        try {
            const response = await axios.get(url, {
                responseType: 'blob',
            });
            const blob = new Blob([response.data], { type: response.headers['content-type'] });
            const objectUrl = URL.createObjectURL(blob);
            setPreviewUrl(objectUrl);
        } catch (err) {
            setPreviewError("No se pudo cargar la vista previa del archivo. Asegúrate de que el formato sea compatible (PDF, imágenes, etc.) o verifica tu conexión.");
            setPreviewUrl(null);
        } finally {
            setIsPreviewLoading(false);
        }
    };

    const closePreviewModal = () => {
        if (previewUrl) {
            URL.revokeObjectURL(previewUrl);
        }
        setPreviewUrl(null);
        setPreviewError(null);
        setIsPreviewLoading(false);
    };

    const handleFullscreen = () => {
        const container = document.getElementById("preview-container");
        if (container) {
            if (container.requestFullscreen) {
                container.requestFullscreen();
            } else if (container.webkitRequestFullscreen) {
                container.webkitRequestFullscreen();
            } else if (container.msRequestFullscreen) {
                container.msRequestFullscreen();
            }
        }
    };

    const downloadPresentacion = async (ruta) => {
        try {
            const response = await axios.get(ruta, {
                responseType: 'blob'
            });
            const blob = new Blob([response.data]);
            const url = window.URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            const contentDisposition = response.headers['content-disposition'];
            let filename = "archivo";
            if (contentDisposition) {
                const filenameMatch = contentDisposition.match(/filename\*?=['"]?([^"';]+)['"]?/i);
                if (filenameMatch && filenameMatch[1]) {
                    filename = decodeURIComponent(filenameMatch[1].replace(/\"/g, ''));
                } else {
                    const oldFilenameMatch = contentDisposition.match(/filename=(.+)/);
                    if (oldFilenameMatch && oldFilenameMatch[1]) {
                        filename = oldFilenameMatch[1].replace(/["']/g, '');
                    }
                }
            }
            link.download = filename;
            document.body.appendChild(link);
            link.click();
            link.remove();
            window.URL.revokeObjectURL(url);
        } catch (err) {
            setError("Error al descargar el archivo. Por favor, inténtalo de nuevo.");
        }
    };

    return (
        <Layout>
            <div className="mis-archivos-container">
                <div className="header">
                    <h1 className="page-title">Archivos Disponibles</h1>
                    <div className="title-divider"></div>
                    <form onSubmit={handleBuscarArchivos} style={{ maxWidth: 400, margin: '2rem auto', textAlign: 'center' }}>
                        <label htmlFor="gmail-input" style={{ fontWeight: 500, fontSize: '1.1rem' }}>Ingresa tu Gmail para ver tus archivos:</label>
                        <input
                            id="gmail-input"
                            type="email"
                            value={gmail}
                            onChange={e => setGmail(e.target.value)}
                            placeholder="tucorreo@gmail.com"
                            style={{ width: '100%', padding: '0.7rem', margin: '1rem 0', borderRadius: 6, border: '1px solid #ddd', fontSize: '1rem', boxSizing: 'border-box' }}
                            autoFocus
                            required
                        />
                        <button
                            type="submit"
                            className="btn-ver-animado"
                            style={{
                                width: '100%',
                                padding: '0.9rem 0',
                                borderRadius: '8px',
                                fontWeight: 700,
                                fontSize: '1.1rem',
                                background: 'linear-gradient(90deg, #2563eb 0%, #dc2626 100%)',
                                color: '#fff',
                                border: 'none',
                                boxShadow: '0 4px 16px rgba(37,99,235,0.10)',
                                cursor: 'pointer',
                                transition: 'transform 0.18s cubic-bezier(.4,2,.6,1), box-shadow 0.18s',
                                marginBottom: '0.5rem',
                                letterSpacing: '0.5px',
                                position: 'relative',
                                overflow: 'hidden',
                            }}
                            onMouseDown={e => e.currentTarget.style.transform = 'scale(0.97)'}
                            onMouseUp={e => e.currentTarget.style.transform = 'scale(1)'}
                            onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
                        >
                            <span className="btn-text">Ver mis archivos</span>
                            <span className="btn-anim-bg"></span>
                        </button>
                        {error && <div className="alert alert-error" style={{ marginTop: 10 }}>{error}</div>}
                    </form>
                    <style>{`
.btn-ver-animado {
    position: relative;
    overflow: hidden;
    z-index: 1;
}
.btn-ver-animado .btn-anim-bg {
    content: '';
    position: absolute;
    left: -50%;
    top: 0;
    width: 200%;
    height: 100%;
    background: linear-gradient(90deg, #2563eb 0%, #dc2626 100%);
    opacity: 0.12;
    z-index: 0;
    transition: left 0.4s cubic-bezier(.4,2,.6,1);
}
.btn-ver-animado:hover .btn-anim-bg {
    left: 0;
    opacity: 0.18;
}
.btn-ver-animado:active {
    transform: scale(0.97);
    box-shadow: 0 2px 8px rgba(37,99,235,0.13);
}
@media (max-width: 600px) {
    .btn-ver-animado {
        font-size: 1rem;
        padding: 0.8rem 0;
        border-radius: 7px;
    }
    .btn-ver-animado .btn-text {
        font-size: 1rem;
    }
}
@media (max-width: 400px) {
    .btn-ver-animado {
        font-size: 0.95rem;
        padding: 0.7rem 0;
        border-radius: 6px;
    }
    .btn-ver-animado .btn-text {
        font-size: 0.95rem;
    }
}
`}</style>
                    {buscado && !error && <FiltroArchivo />}
                    {porMi !== true && (
                        <p className="page-subtitle">Descarga y gestiona todos los archivos de presentaciones</p>
                    )}
                </div>

                {error && typeof error === 'string' && <div className="alert alert-error">{error}</div>}

                <div className="">
                    {buscado && !error && (
                        porMi === true ? null : (
                            <div className="archivos-grid">
                                {loading ? (
                                    <div className="loading">Cargando archivos...</div>
                                ) : archivos.length === 0 ? (
                                    <div className="no-archivos">No hay archivos disponibles para este Gmail</div>
                                ) : (
                                    archivos
                                        .sort((a, b) => new Date(b.uploadDate) - new Date(a.uploadDate))
                                        .map(presentacion => (
                                            <div key={presentacion._id} className="archivo-card">
                                                <div className="archivo-icon">
                                                    {getFileIcon(presentacion.fileType)}
                                                </div>
                                                <div className="archivo-info">
                                                    <h3>Nombre: {presentacion.filename}</h3>
                                                    <p>Subido Por: {presentacion.user}</p>
                                                    <p>Gmail:{presentacion.gmail} </p>
                                                    <p>Evento: {presentacion.event?.title}</p>
                                                    <p>Fecha: {formatDate(presentacion.uploadDate)}</p>
                                                    <p>Tamaño: {formatSize(presentacion.fileSize)}</p>
                                                </div>
                                                <div className="archivo-actions">
                                                    <button
                                                        onClick={() => downloadPresentacion(`${endpoints.presentaciones}download/${presentacion._id}`)}
                                                        className="event-file-download-pro"
                                                        title="Descargar archivo"
                                                    >
                                                        Descargar
                                                    </button>
                                                    <button
                                                        onClick={() => handleVerArchivo(presentacion._id)}
                                                        className="event-file-download-pro"
                                                        disabled={isPreviewLoading}
                                                        title="Ver vista previa"
                                                    >
                                                        {isPreviewLoading ? 'Cargando...' : 'Vista Previa'}
                                                    </button>
                                                </div>
                                            </div>
                                        ))
                                )}
                            </div>
                        )
                    )}
                </div>
            </div>

            {previewUrl && (
                <div className="preview-modal-overlay">
                    <div className="preview-modal-content" id="preview-container">
                        {isPreviewLoading && (
                            <div className="preview-loading-text">Cargando vista previa...</div>
                        )}
                        {previewError && (
                            <div className="preview-error-text" style={{ color: 'red', marginBottom: '10px' }}>{previewError}</div>
                        )}

                        {previewUrl && !previewError && (
                            <iframe
                                src={previewUrl}
                                title="Vista previa del archivo"
                                width="100%"
                                height="100%"
                                style={{ border: 'none' }}
                            />
                        )}

                        <div className="preview-buttons">
                            <button
                                onClick={closePreviewModal}
                                className="event-file-download-pro"
                            >
                                Cerrar
                            </button>
                            <button
                                onClick={handleFullscreen}
                                className="event-file-download-pro"
                            >
                                Pantalla completa
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </Layout>
    );
}