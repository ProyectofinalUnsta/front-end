import { useState } from 'react';
import { getMisEventosInscripto } from '../utils/peticiones';
import { Card } from '../Productos/components/Card';
import { BackArrowIcon } from '../icons/BackArrowIcon';
import '../Productos/style/carddetails.css';
import '../pages/MisEventos.css';
import { useNavigate } from 'react-router-dom';

export default function VerMisIncripciones() {
  const [gmail, setGmail] = useState(localStorage.getItem('Inscripto-Gmail') || '');
  const [eventos, setEventos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleBuscar = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const res = await getMisEventosInscripto(gmail);
      setEventos(res.data);
      if (res.data.length === 0) setError('No tienes eventos inscriptos con ese gmail.');
    } catch (err) {
      setError('Error al buscar eventos.');
      setEventos([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="event-page-container" style={{minHeight:'100vh',display:'flex',flexDirection:'column',justifyContent:'flex-start',alignItems:'center',paddingTop:'2.5rem'}}>
      <div style={{width:'100%',maxWidth:'500px',margin:'0 auto 2.5rem auto',display:'flex',flexDirection:'column',alignItems:'center'}}>
        <button className="back-button-pro" onClick={() => navigate('/')} style={{alignSelf:'center',marginBottom:'2.5rem',marginTop:'0'}}>
          <BackArrowIcon /> Volver al Home
        </button>
        <form onSubmit={handleBuscar} style={{width:'100%',display:'flex',flexDirection:'column',alignItems:'center',gap:'1.2rem',background:'#fff',borderRadius:'14px',boxShadow:'0 2px 8px rgba(37,99,235,0.08)',padding:'2rem 1.5rem',border:'2px solid #2563eb',marginBottom:'1.5rem'}}>
          <label htmlFor="gmail-input" style={{fontWeight:'700',fontSize:'1.1rem',color:'#2563eb',marginBottom:'0.2rem',letterSpacing:'0.5px',display:'flex',alignItems:'center',gap:'0.5rem'}}>
            <span style={{display:'inline-block',verticalAlign:'middle'}}>
              <svg width="22" height="22" fill="none" viewBox="0 0 24 24"><rect width="24" height="24" rx="4" fill="#dc2626"/><path d="M6 8l6 5 6-5" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/><rect x="6" y="8" width="12" height="8" rx="2" stroke="#fff" strokeWidth="1.5"/></svg>
            </span>
            Ingresá tu correo electrónico
          </label>
          <input
            id="gmail-input"
            type="email"
            placeholder="ejemplo@gmail.com"
            value={gmail}
            onChange={e => setGmail(e.target.value)}
            required
            style={{padding:'1.1rem 1.2rem',borderRadius:'10px',border:'2px solid #dc2626',fontSize:'1.15rem',width:'100%',outline:'none',boxShadow:'0 1px 6px rgba(220,38,38,0.07)',transition:'border 0.2s'}}
          />
          <button type="submit" disabled={loading} style={{padding:'0.9rem 2.2rem',borderRadius:'10px',fontSize:'1.1rem',background:'linear-gradient(135deg, #dc2626, #2563eb)',color:'#fff',border:'none',fontWeight:'700',boxShadow:'0 2px 8px rgba(37,99,235,0.08)',transition:'background 0.2s',width:'100%'}}> 
            {loading ? 'Buscando...' : 'Buscar eventos'}
          </button>
        </form>
        {gmail && <p className="email-display">Eventos registrados para: {gmail}</p>}
        {error && <p className="error-message">{error}</p>}
      </div>
      <div className="eventos-grid">
        {eventos.length === 0 && !loading && !error ? (
          <p className="no-eventos">No tienes eventos registrados</p>
        ) : (
          eventos.map(evento => (
            <div key={evento._id} className="evento-card">
              <Card products={evento} />
            </div>
          ))
        )}
      </div>
    </div>
  );
} 