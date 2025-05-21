import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import './MisArchivos.css';

export const MisArchivos = () => {
  const [archivos, setArchivos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }

    const obtenerArchivos = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const datosEjemplo = [
          {
            id: 1,
            nombre: 'Presentación.pdf',
            evento: 'Conferencia de Tecnología 2024',
            fechaSubida: new Date(),
            tipo: 'PDF',
            url: '#'
          },
          {
            id: 2,
            nombre: 'Documento.docx',
            evento: 'Seminario de Innovación',
            fechaSubida: new Date(),
            tipo: 'Word',
            url: '#'
          }
        ];
        setArchivos(datosEjemplo);
      } catch (error) {
        console.error('Error al obtener los archivos:', error);
        setError('No se pudieron cargar los archivos. Por favor, intenta de nuevo más tarde.');
      } finally {
        setLoading(false);
      }
    };

    obtenerArchivos();
  }, [user, navigate]);

  const getTipoIcono = (tipo) => {
    switch (tipo.toLowerCase()) {
      case 'pdf':
        return '📄';
      case 'word':
        return '📝';
      case 'excel':
        return '📊';
      case 'imagen':
        return '🖼️';
      default:
        return '📁';
    }
  };

  if (loading) {
    return (
      <div className="mis-archivos-container">
        <div className="loading-spinner">Cargando archivos...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="mis-archivos-container">
        <div className="error-message">
          <h3>⚠️ Error</h3>
          <p>{error}</p>
          <button onClick={() => window.location.reload()} className="btn-retry">
            Intentar de nuevo
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="mis-archivos-container">
      <header className="archivos-header">
        <h2>Mis Archivos</h2>
        <p className="archivos-descripcion">
          Aquí encontrarás todos los archivos que has subido a tus eventos
        </p>
      </header>

      <div className="archivos-grid">
        {archivos.map((archivo) => (
          <div key={archivo.id} className="archivo-card">
            <div className="archivo-icon">
              {getTipoIcono(archivo.tipo)}
            </div>
            <div className="archivo-info">
              <h3>{archivo.nombre}</h3>
              <p className="evento-nombre">
                <span className="label">Evento:</span> {archivo.evento}
              </p>
              <p className="fecha-subida">
                <span className="label">Subido:</span> {new Date(archivo.fechaSubida).toLocaleDateString()}
              </p>
              <p className="tipo-archivo">
                <span className="label">Tipo:</span> {archivo.tipo}
              </p>
            </div>
            <div className="archivo-acciones">
              <button
                onClick={() => window.open(archivo.url, '_blank')}
                className="btn-ver"
              >
                Ver archivo
              </button>
              <button
                onClick={() => {/* Implementar función de descarga */}}
                className="btn-descargar"
              >
                Descargar
              </button>
            </div>
          </div>
        ))}
        {archivos.length === 0 && (
          <div className="no-archivos">
            <span className="no-archivos-icon">📂</span>
            <p>No has subido ningún archivo aún.</p>
            <button
              onClick={() => navigate('/Eventos')}
              className="btn-explorar"
            >
              Explorar eventos
            </button>
          </div>
        )}
      </div>
    </div>
  );
}; 