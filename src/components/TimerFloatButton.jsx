import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import endpoints from '../utils/endpoints';
import axios from 'axios';
import { FaClock } from 'react-icons/fa';

function parseFechaHora(fechaStr, horaStr) {
  if (!fechaStr || !horaStr) return null;
  let fechaISO = '';
  // Aceptar YYYY-MM-DD, YYYY/MM/DD, DD/MM/YYYY, DD-MM-YYYY, "Julio 22, 2025", etc.
  if (/\d{4}-\d{2}-\d{2}/.test(fechaStr)) {
    fechaISO = fechaStr;
  } else if (/\d{4}\/\d{2}\/\d{2}/.test(fechaStr)) {
    fechaISO = fechaStr.replace(/\//g, '-');
  } else if (/\d{2}\/\d{2}\/\d{4}/.test(fechaStr)) {
    // DD/MM/YYYY
    const [d, m, y] = fechaStr.split('/');
    fechaISO = `${y}-${m.padStart(2,'0')}-${d.padStart(2,'0')}`;
  } else if (/\d{2}-\d{2}-\d{4}/.test(fechaStr)) {
    // DD-MM-YYYY
    const [d, m, y] = fechaStr.split('-');
    fechaISO = `${y}-${m.padStart(2,'0')}-${d.padStart(2,'0')}`;
  } else {
    // Si es formato "Julio 22, 2025" (con o sin tilde)
    const meses = [
      "enero","febrero","marzo","abril","mayo","junio","julio","agosto","septiembre","octubre","noviembre","diciembre",
      "eneró","febreró","marzó","abríl","mayó","júnio","júlio","agósto","setiembre","octúbre","noviémbre","diciémbre"
    ];
    const partes = fechaStr.toLowerCase().replace(/,/g, '').normalize('NFD').replace(/[ -]/g, '').split(' ');
    let mes = meses.findIndex(m => partes[0].startsWith(m.slice(0,3)));
    if (mes >= 12) mes -= 12; // Si es con tilde, corrige el índice
    if (mes >= 0) {
      fechaISO = `${partes[2]}-${(mes+1).toString().padStart(2,'0')}-${partes[1].padStart(2,'0')}`;
    }
  }
  let horaInicio = horaStr.split('-')[0].trim();
  let [h, m] = horaInicio.split(':');
  let ampm = m && m.match(/am|pm/i);
  m = m ? m.replace(/am|pm/i, '') : '00';
  h = parseInt(h,10);
  m = parseInt(m,10);
  // Ajuste: si la hora es mayor a 12 y tiene PM, ignorar el PM y usar la hora como 24h
  if (ampm) {
    if (/pm/i.test(ampm[0])) {
      if (h > 12) {
        // 19:00 PM => 19:00
        // No sumar 12
      } else if (h < 12) {
        h += 12;
      }
    }
    if (/am/i.test(ampm[0]) && h === 12) h = 0;
  }
  if (!fechaISO || isNaN(h) || isNaN(m)) return null;
  const fechaHora = new Date(`${fechaISO}T${h.toString().padStart(2,'0')}:${m.toString().padStart(2,'0')}:00`);
  if (isNaN(fechaHora.getTime())) return null;
  return fechaHora;
}

function getTimeDiff(futureDate) {
  const now = new Date();
  const diff = futureDate - now;
  if (diff <= 0) return null;
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diff / (1000 * 60)) % 60);
  const seconds = Math.floor((diff / 1000) % 60);
  return { days, hours, minutes, seconds };
}

export function TimerFloatButton() {
  const [eventos, setEventos] = useState([]);
  const [show, setShow] = useState(false);
  const [now, setNow] = useState(Date.now());
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`${endpoints.get}eventos`)
      .then(res => {
        const eventosConFecha = (res.data || []).map(ev => ({
          ...ev,
          fechaObj: parseFechaHora(ev.fecha, ev.hora)
        })).filter(ev => ev.fechaObj && ev.fechaObj > new Date());
        eventosConFecha.sort((a, b) => a.fechaObj - b.fechaObj);
        setEventos(eventosConFecha.slice(0, 3));
      });
  }, []);

  useEffect(() => {
    if (!show) return;
    const interval = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(interval);
  }, [show]);

  return (
    <>
      <div
        className="timer-float-btn"
        onMouseEnter={() => setShow(true)}
        onMouseLeave={() => setShow(false)}
        onTouchStart={() => setShow(v => !v)}
        style={{
          position: 'fixed',
          bottom: '2.2rem',
          right: '2.2rem',
          zIndex: 9999,
          background: '#fff',
          borderRadius: '50%',
          boxShadow: '0 4px 24px rgba(37,99,235,0.13)',
          width: 60,
          height: 60,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          border: '2px solid #2563eb',
          transition: 'box-shadow 0.2s',
        }}
        title="Próximos eventos"
      >
        <FaClock size={28} color="#2563eb" />
        {show && (
          <div
            className="timer-float-popup"
            style={{
              position: 'absolute',
              right: 70,
              bottom: 0,
              minWidth: 270,
              background: '#fff',
              borderRadius: 14,
              boxShadow: '0 4px 24px rgba(37,99,235,0.13)',
              padding: '1.1rem 1.2rem',
              display: 'flex',
              flexDirection: 'column',
              gap: '1.1rem',
              border: '1.5px solid #2563eb',
              zIndex: 10000,
            }}
          >
            <div style={{fontWeight:700, color:'#2563eb', fontSize:'1.08rem', marginBottom: '0.2rem'}}>Próximos eventos</div>
            {eventos.length === 0 && <div style={{color:'#6b7280'}}>No hay eventos próximos</div>}
            {eventos.map(ev => {
              const diff = getTimeDiff(ev.fechaObj);
              return (
                <div key={ev._id} style={{display:'flex',flexDirection:'column',gap:'0.2rem'}}>
                  <span style={{fontWeight:600, color:'#1e293b', fontSize:'1.01rem'}}>{ev.title}</span>
                  <span style={{color:'#64748b', fontSize:'0.97rem'}}>{ev.lugar} - {ev.fecha}</span>
                  {diff ? (
                    <span style={{color:'#2563eb', fontWeight:500, fontSize:'0.98rem'}}>
                      Faltan {diff.days}d {diff.hours}h {diff.minutes}m {diff.seconds}s
                    </span>
                  ) : (
                    <span style={{color:'#dc2626', fontWeight:500, fontSize:'0.98rem'}}>¡Ya comenzó!</span>
                  )}
                  <button
                    onClick={() => navigate(`/Eventos/${ev._id}`)}
                    style={{
                      marginTop: '0.4rem',
                      background: '#2563eb',
                      color: '#fff',
                      border: 'none',
                      borderRadius: 7,
                      padding: '0.38rem 1.1rem',
                      fontWeight: 600,
                      fontSize: '0.97rem',
                      cursor: 'pointer',
                      boxShadow: '0 2px 8px rgba(37,99,235,0.10)',
                      transition: 'background 0.18s',
                    }}
                  >
                    Ver evento
                  </button>
                </div>
              );
            })}
          </div>
        )}
      </div>
      <style>{`
      @media (max-width: 700px) {
        .timer-float-btn {
          right: 1rem !important;
          bottom: 1rem !important;
          width: 48px !important;
          height: 48px !important;
        }
        .timer-float-popup {
          min-width: 180px !important;
          padding: 0.7rem 0.6rem !important;
          right: 54px !important;
        }
        .timer-float-popup button {
          font-size: 0.92rem !important;
          padding: 0.32rem 0.7rem !important;
        }
      }
      @media (max-width: 400px) {
        .timer-float-btn {
          right: 0.3rem !important;
          bottom: 0.3rem !important;
          width: 40px !important;
          height: 40px !important;
        }
        .timer-float-popup {
          min-width: 120px !important;
          padding: 0.4rem 0.3rem !important;
          right: 44px !important;
        }
      }
      `}</style>
    </>
  );
} 