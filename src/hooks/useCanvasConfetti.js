import { useEffect, useRef } from 'react';
import confetti from 'canvas-confetti';

// Custom hook para manejar el disparo de confeti
export const useCanvasConfetti = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    // Verificar si la referencia de la sección está disponible
    if (sectionRef.current) {
      const sectionRect = sectionRef.current.getBoundingClientRect();

      // Calcular el centro de la sección

      // Lanzar el confeti desde el centro de la sección
      confetti({
        particleCount: 200,
        spread: 100,
        colors: ['#ff6347', '#32cd32', '#1e90ff'],
      });
    }
    confetti()
  }, []); // El array vacío asegura que esto solo suceda al montar el componente

  return sectionRef; // Devuelve la referencia para usarla en el componente
};


