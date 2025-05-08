
import { useState, useEffect, useRef } from "react";

export function useTodoUtils() {
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [positions, setPositions] = useState(() => {
    const saved = localStorage.getItem('positions');
    if (saved) {
      try {
        return new Map(JSON.parse(saved));
      } catch (e) {
        console.error("Error al parsear positions:", e);
      }
    }
    return new Map();
  });

  const zoomLayerRef = useRef(null);
  const draggingId = useRef(null);
  const dragOffset = useRef({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [displayZoom, setDisplayZoom] = useState(0);
  const parentRef = useRef(null);
  const touchStartY = useRef(0);
  const isDraggingRef = useRef(false); // NUEVO: evita mover el offset mientras se arrastra una nota
  const touchStartRef = useRef(null);
  const handleWheel = (e) => {
    if (offset.y >= -30 && e.deltaY < 0) {
        setOffset({
            y:0
        })
      return;
    }
    if (e.ctrlKey && offset.y > 0) {
      const delta = -e.deltaY * 0.01;
      setZoom((z) => Math.min(Math.max(z + delta, 0.5), 3));
      return;
    } else {
        e.preventDefault();

        const SCROLL_STEP = 60;

      const directionY = Math.sign(e.deltaY);
      const directionX = Math.sign(e.deltaX);

      setOffset((prev) => ({
        x: Math.max(0, prev.x - directionX * SCROLL_STEP / zoom), // no mover a la izquierda
        y: prev.y - directionY * SCROLL_STEP / zoom,
      }));
    }
  };

  const zoomIn = () => {
    setZoom((z) => Math.min(z + 0.1, 3));
    setDisplayZoom((d) => d + 10);
  };

  const zoomOut = () => {
    setZoom((z) => Math.max(z - 0.1, 0.5));
    setDisplayZoom((d) => d - 10);
  };

  const handleStart = (e, id) => {
    if(e.target.id && e.target.id == 'Padre'){
        const touch = e.touches[0];
        touchStartRef.current = { x: touch.clientX, y: touch.clientY };
    }
    else {
        const isTouch = e.type === 'touchstart';
        const clientX = isTouch ? e.touches[0].clientX : e.clientX;
        const clientY = isTouch ? e.touches[0].clientY : e.clientY;
    
        const pos = positions.get(id) || { x: 0, y: 0 };
        draggingId.current = id;
        dragOffset.current = {
          x: clientX - pos.x,
          y: clientY - pos.y,
        };
    
        isDraggingRef.current = true;
        document.body.style.touchAction = 'none';
        document.body.style.userSelect = 'none';
    }
  
  };

  const handleMove = (e) => {
    e.preventDefault();
    const id = draggingId.current;
    if (!id) return;

    const isTouch = e.type === 'touchmove';
    const clientX = isTouch ? e.touches[0].clientX : e.clientX;
    const clientY = isTouch ? e.touches[0].clientY : e.clientY;

    const newPos = {
      x: clientX - dragOffset.current.x,
      y: clientY - dragOffset.current.y,
    };

    setPositions((prev) => {
      const updated = new Map(prev);
      updated.set(id, newPos);
      localStorage.setItem('positions', JSON.stringify(Array.from(updated.entries())));
      return updated;
    });

   
  };

  const handleTouchStart = (e) => {
    if(offset.y < 0){
        touchStartY.current = e.touches[0].clientY;
    }
  };

  const handleTouchMove = (e) => {
    if(e.target.id && e.target.id == 'Padre'){
    
        const touch = e.touches[0];
        const start = touchStartRef.current;
      
        if (start) {
          const dx = (touch.clientX - start.x) / zoom;
          const dy = (touch.clientY - start.y) / zoom;
            setOffset((prev) => ({
                x: Math.max(prev.x + dx, 0),
                y: Math.max(prev.y + dy, 0),
              }));
          touchStartRef.current = { x: touch.clientX, y: touch.clientY };
        }
        return
    }
    else {
    if (isDraggingRef.current) return;
    const touchEndY = e.touches[0].clientY;
    const deltaY = touchStartY.current - touchEndY;
    setOffset((prevPosition) => ({ ...prevPosition, y: prevPosition.y + deltaY }));
    touchStartY.current = touchEndY;
    }
  
  };

  const handleMouseUp = () => {
    draggingId.current = null;
    isDraggingRef.current = false;
    document.body.style.touchAction = '';
    document.body.style.userSelect = '';
  };

  useEffect(() => {
    const container = zoomLayerRef.current;
    if (!container) return;
    const wrappedTouchMove = (e) => {
      handleMove(e);
    };

    container.addEventListener('mousemove', handleMove, { passive: false });
    container.addEventListener('mouseup', handleMouseUp, { passive: false });
    container.addEventListener('touchmove', wrappedTouchMove, { passive: false });
    container.addEventListener('touchend', handleMouseUp, { passive: false });
    container.addEventListener('wheel', handleWheel, { passive: false });

    return () => {
      container.removeEventListener('mousemove', handleMove);
      container.removeEventListener('mouseup', handleMouseUp);
      container.removeEventListener('touchmove', wrappedTouchMove);
      container.removeEventListener('touchend', handleMouseUp);
      container.removeEventListener('wheel', handleWheel);
    };
  }, [zoom]);


  return {
    zoomLayerRef,
    handleTouchStart,
    handleTouchMove,
    handleWheel,
    handleStart,
    zoomIn,
    zoomOut,
    displayZoom,
    zoom,
    positions,
    draggingId,
    offset,
    parentRef,
  };
}
