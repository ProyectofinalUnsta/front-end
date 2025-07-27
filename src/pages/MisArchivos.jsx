// import { useState } from 'react';
// import '../global/MisArchivos.css';
// import { Layout } from './Layout';
// import FiltroArchivo from '../FiltroArchivos/FiltroArchivo';
// import useHandleFiles from '../FiltroArchivos/hook/useHandleFiles';
// import { formatSize } from '../Files/utils/formatSize';
// import { formatDate } from '../Files/utils/formatDate';
// import { useGetEventsById } from '../hooks/useGetEventsById';
// import endpoints from '../utils/endpoints';
// import axios from 'axios';
// import { useLogin } from '../hooks/useLogin';
// import { MappedPresentationsByMe } from '../Files/components/MappedPresentationsByMe';

// export default function MisArchivos() {
//     const { porMi, loading, handlePresentacionesDelete } = useHandleFiles();
//     const [error, setError] = useState(false);
//     const { eventosinscripto, archivoscreados } = useGetEventsById();
//     const { token } = useLogin();

//     // --- NUEVOS ESTADOS PARA LA VISTA PREVIA ---
//     const [previewUrl, setPreviewUrl] = useState(null);
//     const [isPreviewLoading, setIsPreviewLoading] = useState(false);
//     const [previewError, setPreviewError] = useState(null);
//     const [fileTypeToPreview, setFileTypeToPreview] = useState(null); // Nuevo estado para guardar el tipo de archivo

//     const getFileIcon = (fileType) => {
//         if (fileType.includes('pdf')) return '📄';
//         if (fileType.includes('doc') || fileType.includes('word')) return '📝';
//         if (fileType.includes('docx') || fileType.includes('word')) return '📝';
//         if (fileType.includes('pptx') || fileType.includes('powerpoint')) return '📊';
//         if (fileType.includes('ppt') || fileType.includes('powerpoint')) return '📊';
//         if (fileType.includes('image')) return '🖼️';
//         return '📁';
//     };

//     // --- FUNCIÓN PARA VISTA PREVIA ---
//     const handleVerArchivo = async (fileId, fileType) => {
//         setIsPreviewLoading(true);
//         setPreviewError(null);
//         setPreviewUrl(null); // Limpiar URL anterior por si acaso
//         setFileTypeToPreview(fileType); // Guarda el tipo de archivo

//         const downloadUrl = `${endpoints.presentaciones}download/${fileId}`;

//         try {
//             // For PDF and images, continue with blob method
//             if (fileType.includes('pdf') || fileType.includes('image')) {
//                 const response = await axios.get(downloadUrl, {
//                     headers: { Authorization: `Bearer ${token}` },
//                     responseType: 'blob',
//                 });
//                 const blob = new Blob([response.data], { type: response.headers['content-type'] });
//                 const objectUrl = URL.createObjectURL(blob);
//                 setPreviewUrl(objectUrl);
//             } else if (
//                 fileType.includes('doc') || fileType.includes('docx') ||
//                 fileType.includes('ppt') || fileType.includes('pptx')
//             ) {
//                const googleViewerUrl = `https://docs.google.com/viewer?url=${encodeURIComponent(downloadUrl)}&embedded=true`;
//                setPreviewUrl(googleViewerUrl);
//             } else {
//                 setPreviewError("Este tipo de archivo no tiene una vista previa disponible.");
//             }
//         } catch (err) {
//             console.error("Error al abrir el archivo:", err);
//             setPreviewError("No se pudo cargar la vista previa del archivo. Asegúrate de que el formato sea compatible (PDF, imágenes, Word, PowerPoint) o verifica tu conexión.");
//             setPreviewUrl(null); // Limpiar URL en caso de error
//         } finally {
//             setIsPreviewLoading(false);
//         }
//     };

//     // --- FUNCIÓN PARA CERRAR EL MODAL DE VISTA PREVIA Y LIBERAR MEMORIA ---
//     const closePreviewModal = () => {
//         if (previewUrl && (fileTypeToPreview.includes('pdf') || fileTypeToPreview.includes('image'))) {
//             URL.revokeObjectURL(previewUrl); // Libera la URL del objeto Blob de la memoria, solo para PDFs e imágenes
//         }
//         setPreviewUrl(null);
//         setPreviewError(null);
//         setIsPreviewLoading(false);
//         setFileTypeToPreview(null);
//     };

//     // --- FUNCIÓN PARA PANTALLA COMPLETA ---
//     const handleFullscreen = () => {
//         const container = document.getElementById("preview-container");
//         if (container) {
//             if (container.requestFullscreen) {
//                 container.requestFullscreen();
//             } else if (container.webkitRequestFullscreen) {
//                 container.webkitRequestFullscreen(); // Safari
//             } else if (container.msRequestFullscreen) {
//                 container.msRequestFullscreen(); // IE11
//             }
//         }
//     };

//     const downloadPresentacion = async (ruta) => {
//         try {
//             const response = await axios.get(ruta, {
//                 headers: {
//                     Authorization: `Bearer ${token}`
//                 },
//                 responseType: 'blob'
//             });

//             const blob = new Blob([response.data]);
//             const url = window.URL.createObjectURL(blob);

//             const link = document.createElement('a');
//             link.href = url;

//             const contentDisposition = response.headers['content-disposition'];
//             console.log(contentDisposition); // Para debug

//             let filename = "archivo"; // Default filename
//             if (contentDisposition) {
//                 const filenameMatch = contentDisposition.match(/filename\*?=['"]?([^"';]+)['"]?/i);
//                 if (filenameMatch && filenameMatch[1]) {
//                     filename = decodeURIComponent(filenameMatch[1].replace(/\"/g, ''));
//                 } else {
//                     // Fallback for older/different filename formats
//                     const oldFilenameMatch = contentDisposition.match(/filename=(.+)/);
//                     if (oldFilenameMatch && oldFilenameMatch[1]) {
//                         filename = oldFilenameMatch[1].replace(/["']/g, '');
//                     }
//                 }
//             } else {
//                 const presentationId = ruta.split('/').pop(); // Get ID from URL
//                 // You might want to fetch the actual filename from your 'presentacion' object
//                 // if it's not provided in content-disposition
//                 const presentacion = eventosinscripto.find(p => p._id === presentationId);
//                 if (presentacion) {
//                     filename = presentacion.filename;
//                 } else {
//                     filename = `archivo-${presentationId}`; // Fallback with ID
//                 }
//             }

//             console.log("Downloading as:", filename); // Para debug

//             link.download = filename;
//             document.body.appendChild(link);
//             link.click();
//             link.remove();
//             window.URL.revokeObjectURL(url);
//         } catch (err) {
//             console.error("Error al descargar:", err);
//             setError("Error al descargar el archivo. Por favor, inténtalo de nuevo."); // Mensaje de error para el usuario
//         }
//     };


//     return (
//         <Layout>
//             <div className="mis-archivos-container">
//                 <div className="header">
//                     <h1 className="page-title">Archivos Disponibles</h1>
//                     <div className="title-divider"></div>
//                     <FiltroArchivo />
//                     <p className="page-subtitle">Descarga y gestiona todos los archivos de presentaciones</p>
//                 </div>

//                 {error && <div className="alert alert-error">{error}</div>}

//                 <div className="">
//                     {porMi == true ? <MappedPresentationsByMe /> : <div className="archivos-grid">
//                         {loading && !eventosinscripto.length ? (
//                             <div className="loading">Cargando archivos...</div>
//                         ) : eventosinscripto?.length === 0 ? (
//                             <div className="no-archivos">No hay archivos disponibles</div>
//                         ) : (
//                             eventosinscripto?.map(presentacion => (
//                                 <div key={presentacion._id} className="archivo-card">
//                                     <div className="archivo-icon">
//                                         {getFileIcon(presentacion.fileType)}
//                                     </div>
//                                     <div className="archivo-info">
//                                         <h3>Nombre: {presentacion.filename}</h3>
//                                         <p>Subido Por: {presentacion.user}</p>
//                                         <p>Gmail:{presentacion.gmail} </p>
//                                         <p>Evento: {presentacion.event?.title}</p>
//                                         <p>Fecha: {formatDate(presentacion.uploadDate)}</p>
//                                         <p>Tamaño: {formatSize(presentacion.fileSize)}</p>
//                                     </div>
//                                     <div className="archivo-actions">
//                                         {/* --- BOTÓN DE DESCARGAR --- */}
//                                         <button
//                                             onClick={() => downloadPresentacion(`${endpoints.presentaciones}download/${presentacion._id}`)}
//                                             className="event-file-download-pro"
//                                             title="Descargar archivo"
//                                         >
//                                             Descargar
//                                         </button>
//                                         {/* --- NUEVO BOTÓN DE VISTA PREVIA --- */}
//                                         <button
//                                             onClick={() => handleVerArchivo(presentacion._id, presentacion.fileType)}
//                                             className="event-file-download-pro" // Puedes darle una clase diferente para estilos
//                                             disabled={isPreviewLoading}
//                                             title="Ver vista previa"
//                                         >
//                                             {isPreviewLoading && fileTypeToPreview === presentacion.fileType ? 'Cargando...' : 'Vista Previa'}
//                                         </button>
//                                     </div>
//                                 </div>
//                             ))
//                         )}
//                     </div>}

//                 </div>
//             </div>

//             {/* --- MODAL DE VISTA PREVIA --- */}
//             {previewUrl && (
//                 <div className="preview-modal-overlay">
//                     <div className="preview-modal-content" id="preview-container">
//                         {isPreviewLoading && (
//                             <div className="preview-loading-text">Cargando vista previa...</div>
//                         )}
//                         {previewError && (
//                             <div className="preview-error-text" style={{ color: 'red', marginBottom: '10px' }}>{previewError}</div>
//                         )}

//                         {previewUrl && !previewError && (
//                             <iframe
//                                 src={previewUrl}
//                                 title="Vista previa del archivo"
//                                 width="100%"
//                                 height="100%"
//                                 style={{ border: 'none' }}
//                                 allowFullScreen // Permite que el iframe entre en modo de pantalla completa
//                             />
//                         )}

//                         <div className="preview-buttons">
//                             <button
//                                 onClick={closePreviewModal}
//                                 className="event-file-download-pro"
//                             >
//                                 Cerrar
//                             </button>
//                             {previewUrl && !previewError && ( // Solo muestra el botón de pantalla completa si hay algo para previsualizar
//                                 <button
//                                     onClick={handleFullscreen}
//                                     className="event-file-download-pro"
//                                 >
//                                     Pantalla completa
//                                 </button>
//                             )}
//                         </div>
//                     </div>
//                 </div>
//             )}
//         </Layout>
//     );
// }
import { useState } from 'react';
import '../global/MisArchivos.css';
import { Layout } from './Layout';
import FiltroArchivo from '../FiltroArchivos/FiltroArchivo';
import useHandleFiles from '../FiltroArchivos/hook/useHandleFiles';
import { formatSize } from '../Files/utils/formatSize';
import { formatDate } from '../Files/utils/formatDate';
// import { useGetEventsById } from '../hooks/useGetEventsById'; // No se está usando directamente aquí
import endpoints from '../utils/endpoints';
import axios from 'axios';
import { MappedPresentationsByMe } from '../Files/components/MappedPresentationsByMe';
import { getArchivosEvetnoInscripto } from '../utils/peticiones';

export default function MisArchivos() {
    const { porMi, loading: loadingPorMiFiles } = useHandleFiles(); // Renombrado para evitar conflicto
    const [error, setError] = useState(false);
    const [archivos, setArchivos] = useState([]);
    const [gmail, setGmail] = useState('');
    const [buscado, setBuscado] = useState(false);
    const [previewUrl, setPreviewUrl] = useState(null);
    const [isPreviewLoading, setIsPreviewLoading] = useState(false);
    const [previewError, setPreviewError] = useState(null);
    const [fileTypeToPreview, setFileTypeToPreview] = useState(null);
    const [loadingArchivosInscriptos, setLoadingArchivosInscriptos] = useState(false); // Estado para la carga de archivos inscriptos

    // Asume que obtienes el token de alguna parte (ej. localStorage, contexto de autenticación)
    // Reemplaza 'tu_token_aqui' con la forma real de obtener el token
    const token = localStorage.getItem('token'); // Ejemplo: si lo guardas en localStorage

    // Pedir archivos solo si hay gmail y se buscó
    const handleBuscarArchivos = async (e) => {
        e.preventDefault();
        setError(false);
        setBuscado(false); // Restablecer buscado antes de la nueva búsqueda
        setArchivos([]);
        if (!gmail || !/^[^@\s]+@gmail\.com$/.test(gmail)) {
            setError('Por favor ingresa un Gmail válido.');
            return;
        }
        try {
            setLoadingArchivosInscriptos(true); // Iniciar carga
            setBuscado(true);
            const res = await getArchivosEvetnoInscripto(gmail);
            setArchivos(res.data || []);
            if (res.data?.length === 0) { // Usar optional chaining y verificar la longitud
                setError('No tienes archivos inscriptos con ese gmail.');
            }
        } catch (err) {
            console.error("Error al buscar archivos:", err);
            setError('No se pudieron cargar los archivos para ese Gmail.');
            setArchivos([]);
        } finally {
            setLoadingArchivosInscriptos(false); // Finalizar carga
        }
    };

    const getFileIcon = (fileType) => {
        if (!fileType) return '📁'; // Manejar caso de fileType undefined
        if (fileType.includes('pdf')) return '📄';
        if (fileType.includes('doc') || fileType.includes('word')) return '📝'; // doc/docx
        if (fileType.includes('ppt') || fileType.includes('powerpoint')) return '📊'; // ppt/pptx
        if (fileType.includes('image')) return '🖼️';
        return '📁';
    };

    // --- FUNCIÓN PARA VISTA PREVIA ---
    const handleVerArchivo = async (fileId, fileType) => {
        setIsPreviewLoading(true);
        setPreviewError(null);
        setPreviewUrl(null); // Limpiar URL anterior por si acaso
        setFileTypeToPreview(fileType); // Guarda el tipo de archivo

        const downloadUrl = `${endpoints.presentaciones}download/${fileId}`;

        try {
            if (fileType.includes('pdf') || fileType.includes('image')) {
                const response = await axios.get(downloadUrl, {
                    headers: { Authorization: `Bearer ${token}` }, // Asegúrate de que 'token' esté definido
                    responseType: 'blob',
                });
                const blob = new Blob([response.data], { type: response.headers['content-type'] });
                const objectUrl = URL.createObjectURL(blob);
                setPreviewUrl(objectUrl);
            } else if (
                fileType.includes('doc') || fileType.includes('docx') ||
                fileType.includes('ppt') || fileType.includes('pptx')
            ) {
                // Usar Google Docs Viewer para Word y PowerPoint
                const googleViewerUrl = `https://docs.google.com/viewer?url=${encodeURIComponent(downloadUrl)}&embedded=true`;
                setPreviewUrl(googleViewerUrl);
            } else {
                setPreviewError("Este tipo de archivo no tiene una vista previa disponible.");
            }
        } catch (err) {
            console.error("Error al abrir el archivo:", err);
            setPreviewError("No se pudo cargar la vista previa del archivo. Asegúrate de que el formato sea compatible (PDF, imágenes, Word, PowerPoint) o verifica tu conexión.");
            setPreviewUrl(null); // Limpiar URL en caso de error
        } finally {
            setIsPreviewLoading(false);
        }
    };

    const closePreviewModal = () => {
        // Solo revocar ObjectURL si el tipo de archivo es PDF o imagen (porque Google Viewer no usa Blob local)
        if (previewUrl && (fileTypeToPreview?.includes('pdf') || fileTypeToPreview?.includes('image'))) {
            URL.revokeObjectURL(previewUrl);
        }
        setPreviewUrl(null);
        setPreviewError(null);
        setIsPreviewLoading(false);
        setFileTypeToPreview(null);
    };

    const handleFullscreen = () => {
        const container = document.getElementById("preview-container");
        if (container) {
            if (container.requestFullscreen) {
                container.requestFullscreen();
            } else if (container.webkitRequestFullscreen) {
                container.webkitRequestFullscreen();
            } else if (container.msRequestFullscreen) {
                container.msFullscreenElement(); // O .msRequestFullscreen()
            }
        }
    };

    const downloadPresentacion = async (ruta) => {
        try {
            const response = await axios.get(ruta, {
                responseType: 'blob',
                headers: { Authorization: `Bearer ${token}` }, // Asegúrate de que 'token' esté definido
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
            } else {
                const presentationId = ruta.split('/').pop();
                // Aquí, 'archivos' es la fuente de datos actual.
                const presentacion = archivos.find(p => p._id === presentationId);
                if (presentacion) {
                    filename = presentacion.filename;
                } else {
                    filename = `archivo-${presentationId}`;
                }
            }
            link.download = filename;
            document.body.appendChild(link);
            link.click();
            link.remove();
            window.URL.revokeObjectURL(url);
        } catch (err) {
            console.error("Error al descargar el archivo:", err);
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
                            disabled={loadingArchivosInscriptos} // Deshabilitar mientras se busca
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
                            <span className="btn-text">{loadingArchivosInscriptos ? 'Buscando...' : 'Ver mis archivos'}</span>
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

                <div className="archivos-section-content"> {/* Nuevo div para contener las dos posibles secciones de archivos */}
                    {porMi === true ? (
                        // Renderiza MappedPresentationsByMe si porMi es true
                        <MappedPresentationsByMe />
                    ) : (
                        // Renderiza la lista de archivos inscriptos si porMi no es true
                        <div className="archivos-grid">
                            {loadingArchivosInscriptos ? (
                                <div className="loading">Cargando archivos...</div>
                            ) : (
                                <>
                                    {archivos.length === 0 ? (
                                        buscado && !error ? ( // Solo mostrar este mensaje si ya se buscó y no hay error
                                            <div className="no-archivos">No hay archivos disponibles para este Gmail.</div>
                                        ) : ( // Mensaje inicial si no se ha buscado todavía
                                            <div className="no-archivos">Ingresa tu Gmail para buscar archivos.</div>
                                        )
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
                                                        <p>Gmail: {presentacion.gmail} </p>
                                                        <p>Evento: {presentacion.event?.title}</p> {/* Uso seguro de optional chaining */}
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
                                                            onClick={() => handleVerArchivo(presentacion._id, presentacion.fileType)}
                                                            className="event-file-download-pro"
                                                            disabled={isPreviewLoading && fileTypeToPreview === presentacion.fileType} // Deshabilitar solo el botón que se está cargando
                                                            title="Ver vista previa"
                                                        >
                                                            {isPreviewLoading && fileTypeToPreview === presentacion.fileType ? 'Cargando...' : 'Vista Previa'}
                                                        </button>
                                                    </div>
                                                </div>
                                            ))
                                    )}
                                </>
                            )}
                        </div>
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
                                allowFullScreen
                            />
                        )}

                        <div className="preview-buttons">
                            <button
                                onClick={closePreviewModal}
                                className="event-file-download-pro"
                            >
                                Cerrar
                            </button>
                            {previewUrl && !previewError && (
                                <button
                                    onClick={handleFullscreen}
                                    className="event-file-download-pro"
                                >
                                    Pantalla completa
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </Layout>
    );
}