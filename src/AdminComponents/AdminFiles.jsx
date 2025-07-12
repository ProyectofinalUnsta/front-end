import '../global/MisArchivos.css';
import useFiles from '../Files/hook/useFiles';
import { FormUploadPresentaciones } from '../Files/components/FormUploadPresentaciones';
import { MappedPresentationsByMe } from '../Files/components/MappedPresentationsByMe';
import { SucessPopUp } from '../Files/components/SucessPopUp';

export const AdminFiles = () => {
  const {loading,showForm,setShowForm,success,error} = useFiles()

  return (
    <>
      <header className="panel-admin-title">
        <h2>Administración de Archivos</h2>
      </header>
      <div className="mis-archivos-container">
        <div className="header">
          <button 
            className="btn-primary"
            onClick={() => setShowForm(!showForm)}
            disabled={loading}
          >
            {showForm ? 'Cancelar' : 'Cargar Archivo'}
          </button>
        </div>

        {error && <div className="alert alert-error">{error}</div>}
        {/* Popup de éxito eliminado de aquí */}

        {showForm && (
          <FormUploadPresentaciones/>
        )}
        <MappedPresentationsByMe/>
      </div>
    </>
  );
}; 