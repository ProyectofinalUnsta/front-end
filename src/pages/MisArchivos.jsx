import { useState } from 'react';
import '../global/MisArchivos.css';
import { Layout } from './Layout';
import FiltroArchivo from '../FiltroArchivos/FiltroArchivo';
import useHandleFiles from '../FiltroArchivos/hook/useHandleFiles';
import { formatSize } from '../Files/utils/formatSize';
import { formatDate } from '../Files/utils/formatDate';
// import { MappedPresentations } from '../Files/components/MappedPresentations'; // No se usa directamente aquí
import { useGetEventsById } from '../hooks/useGetEventsById';
import endpoints from '../utils/endpoints';
import axios from 'axios';
import { useLogin } from '../hooks/useLogin';
import { MappedPresentationsByMe } from '../Files/components/MappedPresentationsByMe';

export default function MisArchivos() {
    const { porMi, loading, handlePresentacionesDelete } = useHandleFiles();
    const [error, setError] = useState(false);
    const { eventosinscripto, archivoscreados } = useGetEventsById();
    const { token } = useLogin();

    // --- NUEVOS ESTADOS PARA LA VISTA PREVIA ---
    const [previewUrl, setPreviewUrl] = useState(null);
    const [isPreviewLoading, setIsPreviewLoading] = useState(false);
    const [previewError, setPreviewError] = useState(null);

    const getFileIcon = (fileType) => {
        // Asegúrate de que fileType pueda ser el mimetype completo (ej. 'application/pdf')
        // o la extensión (ej. '.pdf'). Si es mimetype, ajústalo.
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
        setPreviewUrl(null); // Limpiar URL anterior por si acaso

        const url = `${endpoints.presentaciones}download/${fileId}`;

        try {
            const response = await axios.get(url, {
                headers: { Authorization: `Bearer ${token}` },
                responseType: 'blob', // Importante para manejar archivos binarios
            });

            // Crear un Object URL del blob. El navegador usará el Content-Type de la respuesta HTTP
            // que viene del backend para renderizar el Blob correctamente en el iframe.
            const blob = new Blob([response.data], { type: response.headers['content-type'] });
            const objectUrl = URL.createObjectURL(blob);
            setPreviewUrl(objectUrl);
        } catch (err) {
            console.error("Error al abrir el archivo:", err);
            setPreviewError("No se pudo cargar la vista previa del archivo. Asegúrate de que el formato sea compatible (PDF, imágenes, etc.) o verifica tu conexión.");
            setPreviewUrl(null); // Limpiar URL en caso de error
        } finally {
            setIsPreviewLoading(false);
        }
    };

    // --- FUNCIÓN PARA CERRAR EL MODAL DE VISTA PREVIA Y LIBERAR MEMORIA ---
    const closePreviewModal = () => {
        if (previewUrl) {
            URL.revokeObjectURL(previewUrl); // Libera la URL del objeto Blob de la memoria
        }
        setPreviewUrl(null);
        setPreviewError(null);
        setIsPreviewLoading(false);
    };

    // --- FUNCIÓN PARA PANTALLA COMPLETA ---
    const handleFullscreen = () => {
        const container = document.getElementById("preview-container");
        if (container) {
            if (container.requestFullscreen) {
                container.requestFullscreen();
            } else if (container.webkitRequestFullscreen) {
                container.webkitRequestFullscreen(); // Safari
            } else if (container.msRequestFullscreen) {
                container.msRequestFullscreen(); // IE11
            }
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

            // Optional: try to extract filename from header
            const contentDisposition = response.headers['content-disposition'];
            console.log(contentDisposition); // Para debug

            let filename = "archivo"; // Default filename
            if (contentDisposition) {
                const filenameMatch = contentDisposition.match(/filename\*?=['"]?([^"';]+)['"]?/i);
                if (filenameMatch && filenameMatch[1]) {
                    filename = decodeURIComponent(filenameMatch[1].replace(/\"/g, ''));
                } else {
                    // Fallback for older/different filename formats
                    const oldFilenameMatch = contentDisposition.match(/filename=(.+)/);
                    if (oldFilenameMatch && oldFilenameMatch[1]) {
                        filename = oldFilenameMatch[1].replace(/["']/g, '');
                    }
                }
            } else {
                   const presentationId = ruta.split('/').pop(); // Get ID from URL
            }

            console.log("Downloading as:", filename); // Para debug

            link.download = filename;
            document.body.appendChild(link);
            link.click();
            link.remove();
            window.URL.revokeObjectURL(url);
        } catch (err) {
            console.error("Error al descargar:", err);
            setError("Error al descargar el archivo. Por favor, inténtalo de nuevo."); // Mensaje de error para el usuario
        }
    };


    return (
        <Layout>
            <div className="mis-archivos-container">
                <div className="header">
                    <h1 className="page-title">Archivos Disponibles</h1>
                    <div className="title-divider"></div>
                    <FiltroArchivo />
                    <p className="page-subtitle">Descarga y gestiona todos los archivos de presentaciones</p>
                </div>

                {error && <div className="alert alert-error">{error}</div>}

                <div className="">
                    {porMi == true ? <MappedPresentationsByMe /> : <div className="archivos-grid">
                        {loading && !eventosinscripto.length ? (
                            <div className="loading">Cargando archivos...</div>
                        ) : eventosinscripto?.length === 0 ? (
                            <div className="no-archivos">No hay archivos disponibles</div>
                        ) : (
                            eventosinscripto?.map(presentacion => (
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
                                        {/* --- BOTÓN DE DESCARGAR --- */}
                                        <button
                                            onClick={() => downloadPresentacion(`${endpoints.presentaciones}download/${presentacion._id}`)}
                                            className="event-file-download-pro"
                                            title="Descargar archivo"
                                        >
                                            Descargar
                                        </button>
                                        {/* --- NUEVO BOTÓN DE VISTA PREVIA --- */}
                                        <button
                                            onClick={() => handleVerArchivo(presentacion._id)}
                                            className="event-file-download-pro" // Puedes darle una clase diferente para estilos
                                            disabled={isPreviewLoading}
                                            title="Ver vista previa"
                                        >
                                            {isPreviewLoading ? 'Cargando...' : 'Vista Previa'}
                                        </button>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>}
                </div>
            </div>

            {/* --- MODAL DE VISTA PREVIA --- */}
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
                                className="event-file-download-pro" // Clase específica para cerrar
                            >
                                Cerrar
                            </button>
                            <button
                                onClick={handleFullscreen}
                                className="event-file-download-pro" // Clase específica para pantalla completa
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