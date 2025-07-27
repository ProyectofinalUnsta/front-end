import React, { useState } from 'react'; // Importa useState
import { useGetEventsById } from "../../hooks/useGetEventsById";
import { useLogin } from "../../hooks/useLogin";
import useFiles from "../hook/useFiles";
import { formatDate } from "../utils/formatDate";
import { formatSize } from "../utils/formatSize";
import axios from "axios";
import endpoints from "../../utils/endpoints";

export const MappedPresentationsByMe = () => {
    const { token } = useLogin();
    const { archivoscreados } = useGetEventsById();
    console.log(archivoscreados);
    const { loading, handlePresentacionesDelete } = useFiles();

    // --- NUEVOS ESTADOS PARA LA VISTA PREVIA ---
    const [previewUrl, setPreviewUrl] = useState(null); // URL del archivo para la vista previa
    const [isPreviewLoading, setIsPreviewLoading] = useState(false); // Estado de carga de la vista previa
    const [previewError, setPreviewError] = useState(null); // Mensaje de error para la vista previa
    const [fileTypeToPreview, setFileTypeToPreview] = useState(null); // Para saber qué tipo de archivo se está previsualizando

    // Función para manejar la descarga (sin cambios principales, solo corrección de filename)
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

            const contentDisposition = response.headers['content-disposition'];
            let filename = "archivo_descargado"; // Nombre de archivo predeterminado

            if (contentDisposition) {
                // Regex más robusto para extraer el nombre del archivo
                const filenameMatch = contentDisposition.match(/filename\*?=['"]?([^"';]+)['"]?/i);
                if (filenameMatch && filenameMatch[1]) {
                    filename = decodeURIComponent(filenameMatch[1].replace(/\"/g, ''));
                }
            } else {
                 // Si content-disposition no está presente, intenta obtener el nombre de 'archivoscreados'
                 // Esto asume que 'ruta' contiene el ID del archivo al final.
                const fileId = ruta.split('/').pop();
                const presentacion = archivoscreados.find(a => a._id === fileId);
                if (presentacion) {
                    filename = presentacion.filename;
                }
            }
            
            link.download = filename;
            document.body.appendChild(link);
            link.click();
            link.remove();
            window.URL.revokeObjectURL(url);
        } catch (err) {
            console.error("Error al descargar:", err);
            // Puedes añadir un estado de error para mostrar un mensaje al usuario
        }
    };

    // --- NUEVA FUNCIÓN PARA LA VISTA PREVIA ---
    const handlePreview = async (fileId, fileType) => {
        setIsPreviewLoading(true);
        setPreviewError(null);
        setPreviewUrl(null); // Limpiar URL anterior por si acaso
        setFileTypeToPreview(fileType); // Guardar el tipo de archivo para manejar URL.revokeObjectURL

        const downloadUrl = `${endpoints.presentaciones}download/${fileId}`;

        try {
            if (fileType.includes('pdf') || fileType.includes('image')) {
                // Para PDF e imágenes, usa Blob y ObjectURL
                const response = await axios.get(downloadUrl, {
                    headers: { Authorization: `Bearer ${token}` },
                    responseType: 'blob',
                });
                const blob = new Blob([response.data], { type: response.headers['content-type'] });
                const objectUrl = URL.createObjectURL(blob);
                setPreviewUrl(objectUrl);
            } else if (fileType.includes('doc') || fileType.includes('docx') ||
                       fileType.includes('ppt') || fileType.includes('pptx')) {
                // Para Word y PowerPoint, usa el visor de Google Docs
                const googleViewerUrl = `https://docs.google.com/viewer?url=${encodeURIComponent(downloadUrl)}&embedded=true`;
                setPreviewUrl(googleViewerUrl);
            } else {
                setPreviewError("Este tipo de archivo no tiene una vista previa disponible.");
            }
        } catch (err) {
            console.error("Error al cargar la vista previa:", err);
            setPreviewError("No se pudo cargar la vista previa. El archivo puede estar dañado o no es compatible.");
            setPreviewUrl(null); // Limpiar URL en caso de error
        } finally {
            setIsPreviewLoading(false);
        }
    };

    // Función para cerrar el modal de vista previa
    const closePreviewModal = () => {
        // Solo revocar ObjectURL si el tipo de archivo es PDF o imagen
        // Los enlaces de Google Viewer no necesitan ser revocados
        if (previewUrl && (fileTypeToPreview?.includes('pdf') || fileTypeToPreview?.includes('image'))) {
            URL.revokeObjectURL(previewUrl);
        }
        setPreviewUrl(null);
        setPreviewError(null);
        setIsPreviewLoading(false);
        setFileTypeToPreview(null);
    };

    // Función para abrir la vista previa en pantalla completa
    const handleFullscreen = () => {
        const container = document.getElementById("preview-container");
        if (container) {
            if (container.requestFullscreen) {
                container.requestFullscreen();
            } else if (container.webkitRequestFullscreen) { // Safari
                container.webkitRequestFullscreen();
            } else if (container.msRequestFullscreen) { // IE/Edge
                container.msRequestFullscreen();
            }
        }
    };

 const getTipoIcono = (tipo) => {
    if (!tipo) return '📁';
    const t = tipo.toLowerCase();
    if (t.includes('pdf')) return '📄';
    if (t.includes('word') || t.includes('doc')) return '📝';
    if (t.includes('excel') || t.includes('xls')) return '📊';
    if (t.includes('image') || t.includes('jpg') || t.includes('png')) return '🖼️';
    return '📁';
  };

    return (
        <>
            <div className="archivos-grid">
    {loading && !archivoscreados?.length ? ( // Usa optional chaining aquí también por seguridad
        <div className="loading">Cargando archivos...</div>
    ) : archivoscreados?.length === 0 ? ( // Usa optional chaining
        <div className="no-archivos">No hay archivos disponibles</div>
    ) : (
        archivoscreados.map(presentacion => (
            <div key={presentacion._id} className="archivo-card">
                <div className="archivo-icon">
                    {getTipoIcono(presentacion.fileType)}
                </div>
                <div className="archivo-info">
                    <h3>Nombre: {presentacion.filename}</h3>
                    <p>Subido Por: {presentacion.user}</p>
                    <p>Gmail:{presentacion.gmail} </p>
                    <p>Evento: {presentacion.event?.title} </p> {/* Optional chaining por si 'event' es nulo */}
                    <p>Fecha: {formatDate(presentacion.uploadDate)}</p>
                    <p>Tamaño: {formatSize(presentacion.fileSize)}</p>
                </div>
                <div className="archivo-actions">
                    {/* Botón para Descargar */}
                    <button
                        onClick={() => downloadPresentacion(`${endpoints.presentaciones}download/${presentacion._id}`)}
                        className="event-file-download-pro download-button" // Comentario de JavaScript válido fuera del atributo o en una línea separada
                        title="Descargar archivo"
                    >
                        Descargar
                    </button>
                    {/* Botón para Vista Previa */}
                    <button
                        onClick={() => handlePreview(presentacion._id, presentacion.fileType)}
                        className="event-file-download-pro preview-button" // Comentario de JavaScript válido
                        disabled={isPreviewLoading && fileTypeToPreview === presentacion.fileType}
                        title="Ver vista previa"
                    >
                        {isPreviewLoading && fileTypeToPreview === presentacion.fileType ? 'Cargando...' : 'Vista Previa'}
                    </button>
                    {/* Botón para Eliminar */}
                    <button
                        onClick={() => handlePresentacionesDelete(presentacion._id)}
                        className="event-file-download-pro delete-button" // Comentario de JavaScript válido
                        disabled={loading}
                        title="Eliminar archivo"
                    >
                        Eliminar
                    </button>
                </div>
            </div>
        ))
    )}
</div>

            {/* --- MODAL DE VISTA PREVIA (condicional) --- */}
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
                            // Renderiza un iframe para PDF, Word, PPT o una imagen
                            <iframe
                                src={previewUrl}
                                title="Vista previa del archivo"
                                width="100%"
                                height="100%"
                                style={{ border: 'none' }}
                                allowFullScreen // Permite que el iframe entre en modo de pantalla completa
                            />
                        )}

                        <div className="preview-buttons">
                            <button
                                onClick={closePreviewModal}
                                className="event-file-download-pro delete-button" // Misma clase o una nueva para botones del modal
                            >
                                Cerrar
                            </button>
                            {previewUrl && !previewError && ( // Solo muestra el botón de pantalla completa si hay algo para previsualizar
                                <button
                                    onClick={handleFullscreen}
                                    className="event-file-download-pro preview-button"
                                >
                                    Pantalla completa
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

