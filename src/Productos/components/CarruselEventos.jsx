import React, { useEffect, useRef, useState } from 'react';
import { Card } from './Card';
import '../../Productos/style/carrusel.css';
import { getitems } from '../../utils/peticiones';

const getSlidesToShow = (width) => {
  if (width <= 600) return 1;
  if (width <= 900) return 2;
  return 3;
};

const ArrowLeft = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M15.5 19L8.5 12L15.5 5"/></svg>
);
const ArrowRight = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M8.5 5L15.5 12L8.5 19"/></svg>
);

export const CarruselEventos = () => {
  const [eventos, setEventos] = useState([]);
  const [current, setCurrent] = useState(0);
  const [slidesToShow, setSlidesToShow] = useState(getSlidesToShow(window.innerWidth));
  const intervalRef = useRef(null);
  const carruselRef = useRef(null);

  useEffect(() => {
    getitems().then(setEventos);
  }, []);

  useEffect(() => {
    const handleResize = () => setSlidesToShow(getSlidesToShow(window.innerWidth));
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      setCurrent((prev) => (prev + 1) % (eventos.length || 1));
    }, 3500);
    return () => clearInterval(intervalRef.current);
  }, [eventos.length]);

  // Swipe para mobile
  useEffect(() => {
    let startX = 0;
    let endX = 0;
    const handleTouchStart = (e) => { startX = e.touches[0].clientX; };
    const handleTouchMove = (e) => { endX = e.touches[0].clientX; };
    const handleTouchEnd = () => {
      if (startX - endX > 50) next();
      if (endX - startX > 50) prev();
    };
    const node = carruselRef.current;
    if (node) {
      node.addEventListener('touchstart', handleTouchStart);
      node.addEventListener('touchmove', handleTouchMove);
      node.addEventListener('touchend', handleTouchEnd);
    }
    return () => {
      if (node) {
        node.removeEventListener('touchstart', handleTouchStart);
        node.removeEventListener('touchmove', handleTouchMove);
        node.removeEventListener('touchend', handleTouchEnd);
      }
    };
  });

  const prev = () => setCurrent((prev) => (prev - 1 + eventos.length) % eventos.length);
  const next = () => setCurrent((prev) => (prev + 1) % eventos.length);

  // Calcular los eventos a mostrar
  const getVisible = () => {
    if (eventos.length <= slidesToShow) return eventos;
    let start = current;
    let end = (current + slidesToShow) % eventos.length;
    if (end > start) return eventos.slice(start, end);
    return [...eventos.slice(start), ...eventos.slice(0, end)];
  };

  return (
    <div className="carrusel-eventos-container">
      <h2 className="carrusel-title">Eventos destacados de la comunidad</h2>
      <div className="carrusel-eventos" ref={carruselRef}>
        {getVisible().map((evento, idx) => (
          <div className="carrusel-slide" key={evento._id || idx}>
            <Card products={evento} />
          </div>
        ))}
      </div>
      {eventos.length > slidesToShow && (
        <>
          <button className="carrusel-arrow left" onClick={prev} aria-label="Anterior">
            <ArrowLeft />
          </button>
          <button className="carrusel-arrow right" onClick={next} aria-label="Siguiente">
            <ArrowRight />
          </button>
        </>
      )}
      <div className="carrusel-dots">
        {eventos.map((_, idx) => (
          <span
            key={idx}
            className={`carrusel-dot ${idx === current ? 'active' : ''}`}
            onClick={() => setCurrent(idx)}
          />
        ))}
      </div>
    </div>
  );
}; 