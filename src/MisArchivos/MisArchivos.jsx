import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';
import endpoints from '../utils/endpoints';
import './MisArchivos.css';

export const MisArchivos = () => {
  const { user } = useAuth();
  const [gmail, setGmail] = useState('');
  const [archivos, setArchivos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [buscado, setBuscado] = useState(false);

  // Si el usuario está logueado, usar su email directamente
  React.useEffect(() => {
    if (user && user.email) {
      setGmail(user.email);
      setBuscado(true);
    }
  }, [user]);

  // Buscar archivos cuando hay gmail válido y se ha buscado
  React.useEffect(() => {
    if (!gmail || !buscado) return;
    const fetchArchivos = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await axios.get(`${endpoints.presentaciones}mispresentaciones/${gmail}`);
        setArchivos(res.data || []);
      } catch (err) {
        setError('No se pudieron cargar los archivos.');
        setArchivos([]);
      } finally {
        setLoading(false);
      }
    };
    fetchArchivos();
  }, [gmail, buscado]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!gmail || !/^[^@\s]+@gmail\.com$/.test(gmail)) {
      setError('Por favor ingresa un Gmail válido.');
      return;
    }
    setBuscado(true);
  };

  const getTipoIcono = (tipo) => {
    if (!tipo) return '📁';
    const t = tipo.toLowerCase();
    if (t.includes('pdf')) return '📄';
    if (t.includes('word') || t.includes('doc')) return '📝';
    if (t.includes('excel') || t.includes('xls')) return '📊';
    if (t.includes('image') || t.includes('jpg') || t.includes('png')) return '🖼️';
    return '📁';
  };

  return (
    <div className="mis-archivos-container">
      <header className="archivos-header">
        <h2>Mis Archivos</h2>
        <p className="archivos-descripcion">
          Aquí encontrarás todos los archivos que has subido a tus eventos
        </p>
      </header>

      {/* Si el usuario NO está logueado, mostrar el formulario */}
      {!user && (
        <form onSubmit={handleSubmit} style={{ maxWidth: 400, margin: '2rem auto', textAlign: 'center' }}>
          <label htmlFor="gmail-input" style={{ fontWeight: 500, fontSize: '1.1rem' }}>Ingresa tu Gmail para ver tus archivos:</label>
          <input
            id="gmail-input"
            type="email"
            value={gmail}
            onChange={e => setGmail(e.target.value)}
            placeholder="tucorreo@gmail.com"
            style={{ width: '100%', padding: '0.7rem', margin: '1rem 0', borderRadius: 6, border: '1px solid #ddd' }}
            autoFocus
            required
          />
          <button type="submit" className="btn-ver">Ver mis archivos</button>
          {error && <div className="alert alert-error" style={{ marginTop: 10 }}>{error}</div>}
        </form>
      )}

      {/* Si está logueado, mostrar el Gmail autocompletado y deshabilitado */}
      {user && (
        <div style={{ maxWidth: 400, margin: '1rem auto', textAlign: 'center' }}>
          <label style={{ fontWeight: 500, fontSize: '1.1rem' }}>Gmail:</label>
          <input
            type="email"
            value={user.email}
            disabled
            style={{ width: '100%', padding: '0.7rem', margin: '1rem 0', borderRadius: 6, border: '1px solid #ddd', background: '#f3f4f6' }}
          />
        </div>
      )}

      {/* Estado de carga y errores */}
      {loading && (
        <div className="loading-spinner">Cargando archivos...</div>
      )}
      {error && buscado && gmail && (
        <div className="error-message">
          <h3>⚠️ Error</h3>
          <p>{error}</p>
        </div>
      )}

      {/* Mostrar archivos si hay Gmail, se buscó y no está cargando */}
      {gmail && buscado && !loading && !error && (
        <div className="archivos-grid">
          {archivos.length > 0 ? archivos.map((archivo) => (
            <div key={archivo._id || archivo.id} className="archivo-card">
              <div className="archivo-icon">
                {getTipoIcono(archivo.fileType || archivo.tipo)}
              </div>
              <div className="archivo-info">
                <h3>{archivo.originalName || archivo.nombre}</h3>
                <p className="evento-nombre">
                  <span className="label">Evento:</span> {archivo.event?.title || archivo.evento || 'Sin evento'}
                </p>
                <p className="fecha-subida">
                  <span className="label">Subido:</span> {archivo.uploadDate ? new Date(archivo.uploadDate).toLocaleDateString() : (archivo.fechaSubida ? new Date(archivo.fechaSubida).toLocaleDateString() : '')}
                </p>
                <p className="tipo-archivo">
                  <span className="label">Tipo:</span> {archivo.fileType || archivo.tipo}
                </p>
              </div>
              <div className="archivo-acciones">
                {archivo._id && (
                  <button
                    onClick={() => window.open(`${endpoints.presentaciones}download/${archivo._id}`, '_blank')}
                    className="btn-ver"
                  >
                    Ver archivo
                  </button>
                )}
              </div>
            </div>
          )) : (
            <div className="no-archivos">
              <span className="no-archivos-icon">📂</span>
              <p>No has subido ningún archivo aún.</p>
              <button
                onClick={() => window.location.href = '/Eventos'}
                className="btn-explorar"
              >
                Explorar eventos
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}; 
