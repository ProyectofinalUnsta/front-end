import { useRef } from 'react';
import confetti from 'canvas-confetti';

// Custom hook para manejar el disparo de confeti
// useCanvasConfetti.ts

export const useCanvasConfetti = () => {
  const sectionRef = useRef(null);

  const fireConfetti = () => {
    confetti({
      particleCount: 200,
      spread: 100,
      colors: ['#ff6347', '#32cd32', '#1e90ff'],
    });
  };

  return { sectionRef, fireConfetti };
};


