import { useState, useEffect } from 'react';
import axios from 'axios';
import '../global/MisArchivos.css';

const API_URL = 'https://back-end-fiq8.onrender.com/api/files';

export const AdminFiles = () => {
    const [archivos, setArchivos] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [showForm, setShowForm] = useState(false);
    const [formData, setFormData] = useState({
        gmail: '',
        eventCode: '',
        uploadCode: '',
        file: null
    });

    useEffect(() => {
        cargarArchivos();
    }, []);

    useEffect(() => {
        if (error || success) {
            const timer = setTimeout(() => {
                setError('');
                setSuccess('');
            }, 5000);
            return () => clearTimeout(timer);
        }
    }, [error, success]);

    const cargarArchivos = async () => {
        try {
            setLoading(true);
            const response = await axios.get(API_URL);
            setArchivos(response.data);
            setError('');
        } catch (err) {
            console.error('Error:', err);
            setError('Error al cargar los archivos');
        } finally {
            setLoading(false);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            if (file.size > 10 * 1024 * 1024) {
                setError('El archivo no debe superar los 10MB');
                e.target.value = '';
                return;
            }
            setFormData(prev => ({ ...prev, file }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        if (!formData.gmail || !formData.eventCode || !formData.uploadCode || !formData.file) {
            setError('Todos los campos son obligatorios');
            return;
        }

        const formDataToSend = new FormData();
        formDataToSend.append('file', formData.file);
        formDataToSend.append('gmail', formData.gmail);
        formDataToSend.append('eventCode', formData.eventCode);
        formDataToSend.append('uploadCode', formData.uploadCode);

        try {
            setLoading(true);
            const response = await axios.post(`${API_URL}/upload`, formDataToSend, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });
            
            setSuccess('Archivo subido exitosamente');
            setFormData({ gmail: '', eventCode: '', uploadCode: '', file: null });
            setShowForm(false);
            await cargarArchivos();
        } catch (err) {
            console.error('Error:', err);
            setError(err.response?.data?.error || 'Error al subir el archivo');
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm('¿Está seguro de eliminar este archivo?')) return;

        try {
            setLoading(true);
            await axios.delete(`${API_URL}/${id}`);
            setSuccess('Archivo eliminado exitosamente');
            await cargarArchivos();
        } catch (err) {
            console.error('Error:', err);
            setError('Error al eliminar el archivo');
        } finally {
            setLoading(false);
        }
    };

    const getFileIcon = (fileType) => {
        switch(fileType.toLowerCase()) {
            case '.pdf': return '📄';
            case '.doc':
            case '.docx': return '📝';
            case '.ppt':
            case '.pptx': return '📊';
            case '.jpg':
            case '.jpeg':
            case '.png': return '🖼️';
            default: return '📁';
        }
    };

    const formatDate = (date) => {
        return new Date(date).toLocaleDateString('es-ES', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    const formatSize = (bytes) => {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    };

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
                        {showForm ? 'Cancelar' : 'Subir Archivo'}
                    </button>
                </div>

                {error && <div className="alert alert-error">{error}</div>}
                {success && <div className="alert alert-success">{success}</div>}

                {showForm && (
                    <form onSubmit={handleSubmit} className="upload-form">
                        <div className="form-group">
                            <label htmlFor="gmail">Correo Gmail:</label>
                            <input
                                type="email"
                                id="gmail"
                                name="gmail"
                                value={formData.gmail}
                                onChange={handleInputChange}
                                placeholder="ejemplo@gmail.com"
                                disabled={loading}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="eventCode">Código del Evento:</label>
                            <input
                                type="text"
                                id="eventCode"
                                name="eventCode"
                                value={formData.eventCode}
                                onChange={handleInputChange}
                                placeholder="Ingrese el código del evento"
                                disabled={loading}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="uploadCode">Código de Subida:</label>
                            <input
                                type="text"
                                id="uploadCode"
                                name="uploadCode"
                                value={formData.uploadCode}
                                onChange={handleInputChange}
                                placeholder="Ingrese el código de subida"
                                disabled={loading}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="file">Archivo:</label>
                            <input
                                type="file"
                                id="file"
                                onChange={handleFileChange}
                                accept=".pdf,.doc,.docx,.ppt,.pptx,.jpg,.jpeg,.png"
                                disabled={loading}
                                required
                            />
                            <small>Formatos permitidos: PDF, DOC, DOCX, PPT, PPTX, JPG, PNG (Máx. 10MB)</small>
                        </div>
                        <button 
                            type="submit" 
                            className="btn-submit"
                            disabled={loading}
                        >
                            {loading ? 'Subiendo...' : 'Subir Archivo'}
                        </button>
                    </form>
                )}

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
                                        href={`https://back-end-fiq8.onrender.com/${archivo.fileUrl}`}
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
            </div>
        </>
    );
}; 