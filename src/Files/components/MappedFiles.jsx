import useFiles from "../hook/useFiles"
import endpoints from "../../utils/endpoints"
import { formatDate } from "../utils/formatDate"
import { formatSize } from "../utils/formatSize"
import { getFileIcon } from "../utils/getFileIcon"
export const MappedFiles = () => {
    const {archivos,loading,handleDelete} = useFiles()
    
    return( 
             <div className="archivos-grid">
                    {loading && !archivos.length ? (
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
                                    <p>Gmail: {archivo.gmail}</p>
                                    <p>Fecha: {formatDate(archivo.uploadDate)}</p>
                                    <p>Tamaño: {formatSize(archivo.size)}</p>
                                </div>
                                <div className="archivo-actions">
                                    <a 
                                        href={`${endpoints.keepserveralive}${archivo.fileUrl}`}
                                        className="btn-download"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        Descargar
                                    </a>
                                    <button
                                        onClick={() => handleDelete(archivo._id)}
                                        className="btn-delete"
                                        disabled={loading}
                                    >
                                        Eliminar
                                    </button>
                                </div>
                            </div>
                        ))
                    )}
                </div>
    )
}