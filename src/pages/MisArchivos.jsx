import { useState, useEffect } from 'react'
import '../global/MisArchivos.css'
import { Layout } from './Layout'
import axios from 'axios'

const API_URL = 'http://localhost:3000/api/files';

export default function MisArchivos() {
    const [archivos, setArchivos] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        cargarArchivos();
    }, []);

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
        <Layout>
            <div className="mis-archivos-container">
                <div className="header">
                    <h1>Archivos Disponibles</h1>
                </div>

                {error && <div className="alert alert-error">{error}</div>}

                <div className="archivos-grid">
                    {loading ? (
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
                                        href={`http://localhost:3000${archivo.fileUrl}`}
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
            </div>
        </Layout>
    );
} 