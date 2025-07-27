import { useGetEventsById } from "../../hooks/useGetEventsById";
import useFiles from "../hook/useFiles";
import { FileField } from "./FieldsFile";
import { FieldFile } from "./FieldsFile";
import { useEffect, useState } from "react";
import { SucessPopUp } from "./SucessPopUp";
import { useNavigate } from "react-router-dom";

export const FormUploadPresentaciones = () => {
  const {
    handlePresentacionesSubmit,
    loading,
    handleInputChange,
    handleFileChange,
    handleSelectChange,
    formsData,
    success,
    setSuccess,
  } = useFiles();
  const { eventoscreados, isloading } = useGetEventsById();
  const navigate = useNavigate();
  const [showPopup, setShowPopup] = useState(false);

  // --- NUEVO ESTADO PARA LA VISTA PREVIA DEL ARCHIVO ---
  const [selectedFile, setSelectedFile] = useState(null); // Para almacenar el archivo seleccionado
  const [previewUrl, setPreviewUrl] = useState(null); // Para almacenar la URL de vista previa

  // Modifica handleFileChange para guardar el archivo y generar la URL de vista previa
  const handleFileChangeWithPreview = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(file); // Guarda el archivo en el estado local del componente
      setPreviewUrl(URL.createObjectURL(file)); // Genera la URL de vista previa
    } else {
      setSelectedFile(null);
      setPreviewUrl(null);
    }
    // Llama a la función original de useFiles para manejar el cambio del archivo
    handleFileChange(event);
  };

  // Efecto para limpiar la URL de vista previa cuando el componente se desmonte
  // o cuando un nuevo archivo sea seleccionado (la URL anterior debe ser revocada)
  useEffect(() => {
    return () => {
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl); // Libera la memoria
      }
    };
  }, [previewUrl]); // Se ejecuta cuando previewUrl cambia o el componente se desmonta

  // Efecto para mostrar el popup de éxito y navegar
  useEffect(() => {
    if (success) {
      setShowPopup(true);
      const timer = setTimeout(() => {
        setShowPopup(false);
        setSuccess("");
        navigate("/Admin/Archivos");
      }, 3500);
      return () => clearTimeout(timer);
    }
  }, [success, setSuccess, navigate]);

  return (
    <>
      {showPopup && <SucessPopUp />}
      <form
        onSubmit={handlePresentacionesSubmit}
        className="upload-form"
        disabled={isloading}
      >
        <div className="form-group">
          <label htmlFor="select">Evento</label>
          <select
            name="select"
            id="select"
            onChange={(e) => handleSelectChange(e)}
          >
            {
              /* Agrega una opción por defecto si no hay un evento seleccionado */
              eventoscreados.length === 0 ? (
                <option value="">Cargando eventos...</option>
              ) : (
                <>
                  <option value="">Selecciona un evento</option>{" "}
                  {/* Opción por defecto */}
                  {eventoscreados.map((evento) => (
                    <option
                      key={evento._id}
                      value={JSON.stringify({
                        _id: evento._id,
                        title: evento.title,
                      })}
                    >
                      {evento.title}
                    </option>
                  ))}
                </>
              )
            }
          </select>
        </div>

        <FieldFile
          type={"text"}
          id={"eventCode"}
          name={"eventCode"}
          label={"Nombre Evento"}
          value={formsData.nombreEvento}
          readOnly={true} // Se asume que este campo se llena automáticamente
          // Se asume que 'loading' aquí es para indicar si el campo está cargando su valor
          // Si no, puedes quitar 'loading={true}' ya que es un prop para los inputs
        />

        <FieldFile
          type={"text"}
          id={"eventCode"}
          name={"eventCode"}
          label={"Código del Evento"}
          value={formsData.eventId}
          readOnly={true} // Se asume que este campo se llena automáticamente
          // Si no, puedes quitar 'loading={true}'
        />

        <FieldFile
          type={"text"}
          id={"user"}
          name={"user"}
          label={"Nombre y apellido"}
          loading={loading}
          event={handleInputChange}
          value={formsData.user}
        />

        {/* Paso la nueva función handleFileChangeWithPreview al componente FileField */}
        <FileField event={handleFileChangeWithPreview} loading={loading} />

        {/* --- VISTA PREVIA DEL ARCHIVO --- */}
        {selectedFile && previewUrl && (
          <div className="file-preview-container">
            <h4>Vista Previa del Archivo:</h4>
            <p>Nombre: {selectedFile.name}</p>
            <p>Tipo: {selectedFile.type || "Desconocido"}</p>
            <p>Tamaño: {(selectedFile.size / 1024 / 1024).toFixed(2)} MB</p>

            {selectedFile.type.startsWith("image/") && (
              <img
                src={previewUrl}
                alt="Vista previa"
                className="file-preview-image"
              />
            )}

            {selectedFile.type.includes("pdf") && (
              <iframe
                src={previewUrl}
                title="Vista previa PDF"
                className="file-preview-iframe"
              ></iframe>
            )}
            {/* Opcional: Para otros tipos de archivo, puedes mostrar un mensaje o un icono genérico */}
            {!selectedFile.type.startsWith("image/") &&
              !selectedFile.type.includes("pdf") && (
                <div className="file-preview-placeholder">
                  <p>
                    No hay vista previa disponible para este tipo de archivo.
                  </p>
                  {/* Puedes añadir un icono genérico aquí */}
                </div>
              )}
            <button
              type="button"
              onClick={() => {
                setSelectedFile(null);
                setPreviewUrl(null);
              }}
              className="btn-clear-preview"
            >
              Salir de la vista
            </button>
          </div>
        )}
        {/* --- FIN VISTA PREVIA --- */}

        <button type="submit" className="btn-submit" disabled={loading}>
          {loading ? "Subiendo..." : "Subir Archivo"}
        </button>
      </form>
    </>
  );
};
