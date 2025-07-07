import { useState } from "react";
import "../global/MisArchivos.css";
import { Layout } from "./Layout";
import FiltroArchivo from "../FiltroArchivos/FiltroArchivo";
import useHandleFiles from "../FiltroArchivos/hook/useHandleFiles";
import { formatSize } from "../Files/utils/formatSize";
import { formatDate } from "../Files/utils/formatDate";
import { MappedPresentations } from "../Files/components/MappedPresentations";
import { useGetEventsById } from "../hooks/useGetEventsById";
import endpoints from "../utils/endpoints";
import axios from "axios";
import { useLogin } from "../hooks/useLogin";
import { MappedPresentationsByMe } from "../Files/components/MappedPresentationsByMe";

export default function MisArchivos() {
  const { porMi, loading, handlePresentacionesDelete } = useHandleFiles();
  const [error, setError] = useState(false);
  const { eventosinscripto, archivoscreados } = useGetEventsById();
  const { token } = useLogin();

  const getFileIcon = (fileType) => {
    switch (fileType.toLowerCase()) {
      case ".pdf":
        return "📄";
      case ".doc":
      case ".docx":
        return "📝";
      case ".ppt":
      case ".pptx":
        return "📊";
      case ".jpg":
      case ".jpeg":
      case ".png":
        return "🖼️";
      default:
        return "📁";
    }
  };

  const downloadPresentacion = async (ruta) => {
    try {
      const response = await axios.get(ruta, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        responseType: "blob",
      });

      const blob = new Blob([response.data]);
      const url = window.URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = url;

      // Opcional: intentá extraer el nombre del header
      const contentDisposition = response.headers["content-disposition"];
      console.log(contentDisposition);
      let filename;

      filename = contentDisposition
        .split("filename=")[1]
        .split(":")[0]
        .replace(/["']/g, "");
      console.log(contentDisposition);

      link.download = filename;
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
    } catch (err) {
      console.error("Error al descargar:", err);
    }
  };
  return (
    <Layout>
      <div className="mis-archivos-container">
        <div className="header">
          <h1 className="page-title">Archivos Disponibles</h1>
          <div className="title-divider"></div>
          <FiltroArchivo />
          <p className="page-subtitle">
            Descarga y gestiona todos los archivos de presentaciones
          </p>
        </div>

        {error && <div className="alert alert-error">{error}</div>}

        <div className="archivos-grid">
          {porMi == true ? (
            <MappedPresentationsByMe />
          ) : (
            <div className="archivos-grid">
              {loading && !eventosinscripto.length ? (
                <div className="loading">Cargando archivos...</div>
              ) : eventosinscripto?.length === 0 ? (
                <div className="no-archivos">No hay archivos disponibles</div>
              ) : (
                eventosinscripto?.map((presentacion) => (
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
                        onClick={() =>
                          downloadPresentacion(
                            `${endpoints.presentaciones}download/${presentacion._id}`
                          )
                        }
                        className="btn-download"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Descargar
                      </a>
                    </div>
                  </div>
                ))
              )}
            </div>
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
