import useFiles from "../hook/useFiles"
import endpoints from "../../utils/endpoints"
import { formatDate } from "../utils/formatDate"
import { formatSize } from "../utils/formatSize"
import { getFileIcon } from "../utils/getFileIcon"
import axios from "axios"
import { useLogin } from "../../hooks/useLogin"

export const MappedPresentations = () => {
    const {presentaciones,loading,handlePresentacionesDelete} = useFiles()

    const {token} = useLogin()

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


    return( 
             <div className="archivos-grid">
                    {loading && !presentaciones.length ? (
                        <div className="loading">Cargando archivos...</div>
                    ) : presentaciones.length === 0 ? (
                        <div className="no-archivos">No hay archivos disponibles</div>
                    ) : (
                        presentaciones.map(presentacion => (
                            <div key={presentacion._id} className="archivo-card">
                                <div className="archivo-icon">
                                    {getFileIcon(presentacion.fileType)}
                                </div>
                                <div className="archivo-info">
                                    <h3>Nombre: {presentacion.filename}</h3>
                                    {/* <p>Evento: {presentacion.event}</p> */}
                                    <p>Subido Por: {presentacion.user}</p>
                                    <p>Gmail:{presentacion.gmail} </p>
                                    <p>Evento: {presentacion.event?.title} </p>
                                    <p>Fecha: {formatDate(presentacion.uploadDate)}</p>
                                    <p>Tamaño: {formatSize(presentacion.fileSize)}</p>
                                </div>
                                <div className="archivo-actions">
                                    <a 
                                        onClick={()=> downloadPresentacion(`${endpoints.presentaciones}download/${presentacion._id}`)}
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
                        ))
                    )}
                </div>
    )
}