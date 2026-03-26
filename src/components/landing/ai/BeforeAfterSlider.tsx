import React, { useState, useEffect, useRef } from 'react';
import { MoveHorizontal } from 'lucide-react';

const BeforeAfterSlider = () => {
    const [sliderPosition, setSliderPosition] = useState(50);
    const [isDragging, setIsDragging] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);
    const imageRef = useRef<HTMLImageElement>(null);

    const handleMouseMove = (e: React.MouseEvent | MouseEvent) => {
      if (!isDragging || !containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const x = Math.max(0, Math.min(e.clientX - rect.left, rect.width));
      setSliderPosition((x / rect.width) * 100);
    };

    const handleTouchMove = (e: React.TouchEvent | TouchEvent) => {
      if (!isDragging || !containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const x = Math.max(0, Math.min(e.touches[0].clientX - rect.left, rect.width));
      setSliderPosition((x / rect.width) * 100);
    };

    useEffect(() => {
      const handleGlobalMove = (e: MouseEvent) => handleMouseMove(e as any);
      const handleGlobalUp = () => setIsDragging(false);

      if (isDragging) {
        window.addEventListener('mousemove', handleGlobalMove);
        window.addEventListener('mouseup', handleGlobalUp);
      }
      return () => {
        window.removeEventListener('mousemove', handleGlobalMove);
        window.removeEventListener('mouseup', handleGlobalUp);
      };
    }, [isDragging]);

    return (
      <div
        ref={containerRef}
        className="relative w-full h-full rounded-xl overflow-hidden cursor-ew-resize select-none group touch-none min-h-[160px]"
        onMouseDown={() => setIsDragging(true)}
        onTouchStart={() => setIsDragging(true)}
        onTouchMove={handleTouchMove as any}
        onTouchEnd={() => setIsDragging(false)}
      >
        {/* Base Image (After - Enhanced) */}
        <img
          ref={imageRef}
          src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=800&q=80"
          alt="Property photo after AI enhancement"
          className="absolute inset-0 w-full h-full object-cover pointer-events-none"
          loading="lazy"
          width="600"
          height="400"
        />
        <div className="absolute top-3 right-3 bg-blue-600/90 text-white text-[10px] font-bold px-2 py-1 rounded-md backdrop-blur-md z-10 shadow-sm">
          AFTER
        </div>

        {/* Overlay Image (Before - Raw) - Clipped */}
        <div
          className="absolute inset-0 overflow-hidden"
          style={{ width: `${sliderPosition}%` }}
        >
          <img
            src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=800&q=80"
            alt="Property photo before AI enhancement"
            className="absolute inset-0 w-full h-full object-cover max-w-none pointer-events-none filter brightness-75 contrast-75 sepia-[0.3]"
            style={{ width: containerRef.current ? containerRef.current.offsetWidth : '100%' }}
            loading="lazy"
            width="600"
            height="400"
          />
           <div className="absolute top-3 left-3 bg-black/60 text-white text-[10px] font-bold px-2 py-1 rounded-md backdrop-blur-md shadow-sm">
              BEFORE
           </div>
        </div>

        {/* Slider Handle */}
        <div
          className="absolute top-0 bottom-0 w-1 bg-white cursor-ew-resize shadow-[0_0_15px_rgba(0,0,0,0.5)] z-20"
          style={{ left: `${sliderPosition}%` }}
        >
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-white rounded-full shadow-lg flex items-center justify-center text-blue-600 border border-blue-50 dark:border-zinc-800">
             <MoveHorizontal size={16} />
          </div>
        </div>
      </div>
    );
};

export default BeforeAfterSlider;
