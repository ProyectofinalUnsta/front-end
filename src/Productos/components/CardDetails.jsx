import { DateIcon } from "../../icons/DateIcon";
import { PlaceIcon } from "../../icons/PlaceIcon";
import { RelojIcon } from "../../icons/RelojIcon";
import { BackArrowIcon } from "../../icons/BackArrowIcon";
import { useNavigate } from "react-router-dom";
import { useNavegacion } from "../../hooks/useNavegacion";
import useInscriptos from "../../hooks/useInscriptos";
import { useState, useEffect } from "react";
import endpoints from "../../utils/endpoints";
import axios from "axios";
import { formatDate } from "../../Files/utils/formatDate";
import { formatSize } from "../../Files/utils/formatSize";
import { EventRegistrationPopup } from "../../components/EventRegistrationPopup";
import "../style/carddetails.css";
import { useLogin } from "../../hooks/useLogin";
import { useLocation } from "react-router-dom";
import { FaWhatsapp } from "react-icons/fa";
import { FaRegCalendarPlus } from "react-icons/fa";

export const CardDetails = ({
  _id,
  lugar,
  fecha,
  hora,
  title,
  descripcion,
  imagen,
}) => {
  const { inscripto } = useInscriptos({ _id, title });
  const [openregistromodal, setOpenRegistroModal] = useState(false);
  const [archivos, setArchivos] = useState([]);
  const [loading, setLoading] = useState(false);
  const { handlenavigate } = useNavegacion();
  const navigate = useNavigate();
  const ruta = "/Eventos/CargarDatos";
  const { token } = useLogin();
  const gmail = localStorage.getItem("Inscripto-Gmail");
  const [showImageModal, setShowImageModal] = useState(false);
  const [bajaLoading, setBajaLoading] = useState(false);
  const location = useLocation();
  const [copied, setCopied] = useState(false);

  // --- Nuevos estados para la vista previa con iframe ---
  const [previewUrl, setPreviewUrl] = useState(null);
  const [isPreviewLoading, setIsPreviewLoading] = useState(false); // Para mostrar carga en el modal
  const [previewError, setPreviewError] = useState(null); // Para errores en la vista previa
  const [fileTypeForPreview, setFileTypeForPreview] = useState(null); // Nuevo estado para guardar el tipo de archivo

  // Obtener el link absoluto de la sección de eventos (no del evento específico)
  const PUBLIC_URL = "https://eventum.lat";
  const LOCAL_URL = typeof window !== "undefined" ? window.location.origin : "";
  const eventosUrl =
    import.meta.env.MODE === "production"
      ? `${PUBLIC_URL}/Eventos/`
      : `${LOCAL_URL}/Eventos/`;

  const handleShare = async () => {
    try {
      await navigator.clipboard.writeText(eventosUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      alert("No se pudo copiar el enlace");
    }
  };

  useEffect(() => {
    if (!_id) return;
    const fetchArchivos = async () => {
      setLoading(true);
      try {
        const res = await axios.get(`${endpoints.presentaciones}`);
        const archivosEvento = res.data.filter(
          (a) => String(a.event) === String(_id) || a.event?._id === _id
        );
        setArchivos(archivosEvento);
      } catch (err) {
        console.error("Error al obtener archivos:", err);
        setArchivos([]);
      } finally {
        setLoading(false);
      }
    };
    fetchArchivos();
  }, [_id]);

  // --- Función para manejar la vista previa del archivo ---
  const handleVerArchivo = async (fileId, fileType) => { // Agregamos fileType como parámetro
    setIsPreviewLoading(true);
    setPreviewError(null);
    setPreviewUrl(null); // Limpiar la URL anterior
    setFileTypeForPreview(fileType); // Guardamos el tipo de archivo

    const downloadUrl = `${endpoints.presentaciones}download/${fileId}`;

    try {
      // Si es PDF o imagen, usamos el método Blob existente
      if (fileType.includes('pdf') || fileType.includes('image')) {
        const response = await axios.get(downloadUrl, {
          headers: { Authorization: `Bearer ${token}` },
          responseType: "blob",
        });
        const blob = new Blob([response.data], { type: response.headers['content-type'] });
        const objectUrl = URL.createObjectURL(blob);
        setPreviewUrl(objectUrl);
      } else if (
        fileType.includes('doc') || fileType.includes('docx') ||
        fileType.includes('ppt') || fileType.includes('pptx')
      ) {
         const googleViewerUrl = `https://docs.google.com/viewer?url=${encodeURIComponent(downloadUrl)}&embedded=true`;
        setPreviewUrl(googleViewerUrl);
      } else {
        setPreviewError("Este tipo de archivo no tiene una vista previa disponible en el navegador.");
        setPreviewUrl(null);
      }
    } catch (err) {
      console.error("Error al abrir el archivo:", err);
      setPreviewError("No se pudo cargar la vista previa del archivo. Asegúrate de que el formato sea compatible o verifica tu conexión.");
      setPreviewUrl(null); // Limpia la URL en caso de error
    } finally {
      setIsPreviewLoading(false);
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
      const contentDisposition = response.headers["content-disposition"];
      let filename;
      if (contentDisposition) {
        // Mejorar la extracción del nombre de archivo del header
        const filenameMatch = contentDisposition.match(/filename\*?=['"]?([^"';]+)['"]?/i);
        if (filenameMatch && filenameMatch[1]) {
          filename = decodeURIComponent(filenameMatch[1].replace(/\"/g, ''));
        } else {
          // Fallback para otros formatos de filename
          const oldFilenameMatch = contentDisposition.match(/filename=(.+)/);
          if (oldFilenameMatch && oldFilenameMatch[1]) {
            filename = oldFilenameMatch[1].replace(/["']/g, '');
          }
        }
      } else {
        // Fallback si no hay content-disposition (idealmente tu backend lo enviaría)
        filename = "archivo";
      }
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
    } catch (err) {
      console.error("Error al descargar el archivo:", err);
      alert("Error al descargar el archivo");
    }
  };

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

  // Función para cerrar el modal de vista previa y limpiar la URL
  const closePreviewModal = () => {
    // Solo revoca la URL del objeto Blob si no es una URL de Google Viewer
    if (previewUrl && (fileTypeForPreview.includes('pdf') || fileTypeForPreview.includes('image'))) {
      URL.revokeObjectURL(previewUrl);
    }
    setPreviewUrl(null);
    setPreviewError(null);
    setIsPreviewLoading(false);
    setFileTypeForPreview(null); // Resetea el tipo de archivo
  };

  // Baja de evento
  const handleBaja = async () => {
    setBajaLoading(true);
    try {
      await axios.delete(`${endpoints.inscripciones}baja`, {
        data: { gmail, idEvento: _id },
        headers: { Authorization: `Bearer ${token}` },
      });
      window.location.reload();
    } catch (err) {
      console.error("Error al darse de baja:", err);
      alert("Error al darse de baja");
    } finally {
      setBajaLoading(false);
    }
  };

  // --- Google Calendar ---
  // Función para parsear fecha y hora a objeto Date
  function parseFechaHora(fechaStr, horaStr) {
    // Ejemplo fecha: "Mayo 19, 2000" o "2024-07-20"
    // Ejemplo hora: "11:11 AM - 11:12 AM" o "14:00 - 15:00"
    if (!fechaStr || !horaStr) return null;
    let fechaISO = '';
    // Intentar parsear fecha a formato YYYY-MM-DD
    if (/\d{4}-\d{2}-\d{2}/.test(fechaStr)) {
      fechaISO = fechaStr;
    } else {
      // Si es formato "Mayo 19, 2000"
      const meses = ["enero","febrero","marzo","abril","mayo","junio","julio","agosto","septiembre","octubre","noviembre","diciembre"];
      const partes = fechaStr.toLowerCase().replace(/,/g, '').split(' ');
      const mes = meses.findIndex(m => partes[0].startsWith(m.slice(0,3)));
      if (mes >= 0) {
        fechaISO = `${partes[2]}-${(mes+1).toString().padStart(2,'0')}-${partes[1].padStart(2,'0')}`;
      }
    }
    // Tomar la hora de inicio (antes del guion)
    let horaInicio = horaStr.split('-')[0].trim();
    // Si es formato 11:11 AM, convertir a 24h
    let [h, m] = horaInicio.split(':');
    let ampm = m.match(/am|pm/i);
    m = m.replace(/am|pm/i, '');
    h = parseInt(h,10);
    m = parseInt(m,10);
    if (ampm) {
      if (/pm/i.test(ampm[0]) && h < 12) h += 12;
      if (/am/i.test(ampm[0]) && h === 12) h = 0;
    }
    const fechaHora = new Date(`${fechaISO}T${h.toString().padStart(2,'0')}:${m.toString().padStart(2,'0')}:00`);
    return fechaHora;
  }

  // Generar link de Google Calendar
  const fechaInicio = parseFechaHora(fecha, hora);
  let fechaFin = null;
  if (fechaInicio && hora && hora.includes('-')) {
    // Calcular fechaFin usando la hora de fin
    let horaFin = hora.split('-')[1].trim();
    let [h, m] = horaFin.split(':');
    let ampm = m.match(/am|pm/i);
    m = m.replace(/am|pm/i, '');
    h = parseInt(h,10);
    m = parseInt(m,10);
    if (ampm) {
      if (/pm/i.test(ampm[0]) && h < 12) h += 12;
      if (/am/i.test(ampm[0]) && h === 12) h = 0;
    }
    fechaFin = new Date(fechaInicio);
    fechaFin.setHours(h, m, 0, 0);
  }
  // Formato Google Calendar: YYYYMMDDTHHmmssZ
  function toGCalFormat(date) {
    if (!date) return '';
    const y = date.getUTCFullYear();
    const mo = (date.getUTCMonth()+1).toString().padStart(2,'0');
    const d = date.getUTCDate().toString().padStart(2,'0');
    const h = date.getUTCHours().toString().padStart(2,'0');
    const mi = date.getUTCMinutes().toString().padStart(2,'0');
    const s = date.getUTCSeconds().toString().padStart(2,'0');
    return `${y}${mo}${d}T${h}${mi}${s}Z`;
  }
  const gcalStart = toGCalFormat(fechaInicio);
  const gcalEnd = toGCalFormat(fechaFin || fechaInicio);
  const gcalUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(title)}&dates=${gcalStart}/${gcalEnd}&details=${encodeURIComponent(descripcion)}&location=${encodeURIComponent(lugar)}`;

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
            src={
              imagen ||
              "https://kzmo4ra0ji5m2etf47ef.lite.vusercontent.net/placeholder.svg?height=400&width=600"
            }
            alt="Imagen del evento"
            style={{ cursor: "pointer" }}
            onClick={() => setShowImageModal(true)}
          />
        </div>
        <div
          className="event-header-info-pro"
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            width: "100%",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "1rem",
              width: "100%",
              flexWrap: "wrap",
            }}
          >
            <h1 className="event-title-pro" style={{ flex: 1, margin: 0 }}>
              {title}
            </h1>
            <div
              style={{ display: "flex", alignItems: "center", gap: "0.3rem" }}
            >
              {/* Botón Google Calendar */}
              <a
                href={gcalUrl}
                target="_blank"
                rel="noopener noreferrer"
                title="Agregar a Google Calendar"
                style={{
                  background: '#f3f4f6',
                  color: '#2563eb',
                  border: '1.5px solid #2563eb',
                  borderRadius: '7px',
                  padding: '0.32rem 0.7rem',
                  fontWeight: 500,
                  fontSize: '0.97rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.4rem',
                  boxShadow: 'none',
                  cursor: 'pointer',
                  transition: 'background 0.18s, color 0.18s, border 0.18s',
                  textDecoration: 'none',
                  minHeight: '32px',
                  minWidth: 'auto',
                }}
                onMouseOver={e => {
                  e.currentTarget.style.background = '#2563eb';
                  e.currentTarget.style.color = '#fff';
                  e.currentTarget.style.border = '1.5px solid #2563eb';
                }}
                onMouseOut={e => {
                  e.currentTarget.style.background = '#f3f4f6';
                  e.currentTarget.style.color = '#2563eb';
                  e.currentTarget.style.border = '1.5px solid #2563eb';
                }}
              >
                <FaRegCalendarPlus size={16} />
                <span className="gcal-btn-text">Google Calendar</span>
              </a>
              {/* Botón compartir y WhatsApp existentes */}
              <button
                onClick={handleShare}
                title={copied ? "¡Enlace copiado!" : "Compartir evento"}
                style={{
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  padding: "0.2rem",
                  borderRadius: "50%",
                  transition: "background 0.2s",
                  position: "relative",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <svg
                  width="22"
                  height="22"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#2563eb"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  style={{ verticalAlign: "middle" }}
                >
                  <circle cx="18" cy="5" r="3" />
                  <circle cx="6" cy="12" r="3" />
                  <circle cx="18" cy="19" r="3" />
                  <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
                  <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
                </svg>
                {copied && (
                  <span
                    style={{
                      position: "absolute",
                      top: "-2.2rem",
                      right: 0,
                      background: "#2563eb",
                      color: "#fff",
                      padding: "0.3rem 0.7rem",
                      borderRadius: "6px",
                      fontSize: "0.95rem",
                      fontWeight: 600,
                      whiteSpace: "nowrap",
                      zIndex: 10,
                      boxShadow: "0 2px 8px rgba(37,99,235,0.10)",
                    }}
                  >
                    ¡Enlace copiado!
                  </span>
                )}
              </button>
              <a
                href={`https://wa.me/?text=${encodeURIComponent(
                  "¡No te pierdas los mejores eventos de la comunidad!\n\n" +
                  "Consulta la agenda, inscríbete y participa >>>  " + eventosUrl
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                title="Compartir por WhatsApp"
                style={{
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  padding: "0.2rem",
                  borderRadius: "50%",
                  transition: "background 0.2s",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <FaWhatsapp
                  size={22}
                  color="#25D366"
                  style={{ verticalAlign: "middle" }}
                />
              </a>
            </div>
          </div>
          <div className="event-meta-pro" style={{ marginTop: "0.5rem" }}>
            <span>
              <DateIcon /> {fecha}
            </span>
            <span>
              <RelojIcon /> {hora}
            </span>
            <span>
              <PlaceIcon /> {lugar}
            </span>
          </div>
        </div>
      </div>

      {/* Descripción */}
      <div className="event-description-pro">
        <h2>Descripción</h2>
        <p style={{ wordBreak: "break-word", whiteSpace: "pre-line" }}>
          {descripcion}
        </p>
      </div>

      {/* Acciones */}
      <div className="event-actions-pro">
        <button
          className="disertante-event-btn-pro"
          onClick={() => handlenavigate({ ruta, params: { _id, title } })}
        >
          Ingresa como disertante
        </button>
        {inscripto === false ? (
          <button
            className="register-event-btn-pro"
            onClick={() => setOpenRegistroModal(!openregistromodal)}
          >
            Registrarse en el evento
          </button>
        ) : (
          <>
            <button className="register-event-btn-pro" disabled>
              Ya estás inscripto
            </button>
            <button
              className="event-unsubscribe-btn-pro"
              style={{
                marginLeft: 8,
                background: "#fff",
                color: "#1e2c93ff",
                border: "1px solid #532fd3ff",
                fontSize: 13,
                padding: "4px 10px",
                borderRadius: 6,
                opacity: 0.7,
                cursor: bajaLoading ? "not-allowed" : "pointer",
              }}
              onClick={handleBaja}
              disabled={bajaLoading}
              title="Darse de baja del evento"
            >
              {bajaLoading ? "Procesando..." : "Darse de baja"}
            </button>
          </>
        )}
      </div>

      {/* Archivos del evento */}
      {inscripto === true && (
        <div className="event-files-section-pro">
          <h3>
            <span role="img" aria-label="archivos">
              📁
            </span>{" "}
            Archivos del evento
          </h3>
          {loading ? (
            <div className="event-files-loading-pro">Cargando archivos...</div>
          ) : archivos.length === 0 ? (
            <div className="event-files-empty-pro">
              No hay archivos disponibles
            </div>
          ) : (
            <ul className="event-files-list-pro">
              {archivos.map((archivo) => (
                <li key={archivo._id} className="event-file-item-pro">
                  <span className="event-file-name-pro">
                    {archivo.originalName}
                  </span>
                  <span className="event-file-date-pro">
                    {formatDate(archivo.uploadDate)}
                  </span>
                  <span className="event-file-size-pro">
                    {formatSize(archivo.fileSize)}
                  </span>
                  <div style={{ display: 'flex', gap: '8px' }}>
                    {/* Botón "Vista previa" - MODIFICADO */}
                    <button
                      onClick={() => handleVerArchivo(archivo._id, archivo.fileType)} // Pasa también el tipo de archivo
                      className="event-file-download-pro"
                      disabled={isPreviewLoading}
                      title="Vista previa del archivo"
                    >
                      {isPreviewLoading ? "Cargando..." : "Ver"}
                    </button>
                    {/* Botón "Descargar" */}
                    <button
                      className="event-file-download-pro"
                      onClick={() =>
                        downloadPresentacion(
                          `${endpoints.presentaciones}download/${archivo._id}`
                        )
                      }
                      title="Descargar archivo"
                    >
                      Descargar
                    </button>

                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}

      <EventRegistrationPopup
        Modal={openregistromodal}
        closeModal={() => setOpenRegistroModal(false)}
        _id={_id}
        title={title}
      />

      {/* Modal de imagen grande */}
      {showImageModal && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            background: "rgba(29, 73, 166, 0.76)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 1000,
          }}
          onClick={() => setShowImageModal(false)}
        >
          <img
            src={
              imagen ||
              "https://kzmo4ra0ji5m2etf47ef.lite.vusercontent.net/placeholder.svg?height=400&width=600"
            }
            alt="Imagen grande del evento"
            style={{
              maxWidth: "90vw",
              maxHeight: "90vh",
              borderRadius: "10px",
              boxShadow: "0 0 20px #000",
            }}
          />
        </div>
      )}

      {/* --- Modal de Vista Previa con Iframe --- */}
      {previewUrl && (
        <div className="preview-modal-overlay">
          <div className="preview-modal-content" id="preview-container">
            {/* Mensaje de carga o error */}
            {isPreviewLoading && (
              <div className="preview-loading-text">Cargando vista previa...</div>
            )}
            {previewError && (
              <div className="preview-error-text" style={{ color: 'red', marginBottom: '10px' }}>{previewError}</div>
            )}

            {/* Iframe solo se muestra si hay una URL y no hay error */}
            {previewUrl && !previewError && (
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
                className="event-file-download-pro"
              >
                Cerrar
              </button>
              {previewUrl && !previewError && ( // Solo muestra el botón si hay algo que previsualizar
                <button onClick={handleFullscreen} className="event-file-download-pro">
                  Pantalla completa
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};