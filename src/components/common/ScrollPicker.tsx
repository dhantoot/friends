import React, { useRef, useState, useEffect } from 'react';
import { cn } from '@/lib/utils';

interface ScrollPickerProps {
  values?: string[];
  onChange?: (value: string) => void;
  className?: string;
}

const ScrollPicker: React.FC<ScrollPickerProps> = ({ 
  values = ['M', 'S', 'I'],
  onChange,
  className
}) => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);
  const extendedValues = [...values, ...values, ...values, ...values, ...values];
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeftState, setScrollLeftState] = useState(0);
  const touchStartXRef = useRef(0);
  const touchScrollLeftRef = useRef(0);

  const handleScroll = () => {
    if (!scrollRef.current) return;
    const container = scrollRef.current;
    const itemWidth = container.offsetWidth / 3;
    const currentScroll = container.scrollLeft;
    
    // Infinite Scroll Jump Logic (using 5x list for larger buffer)
    const setWidth = values.length * itemWidth;
    let jumped = false;
    
    if (currentScroll < setWidth) {
      container.style.scrollBehavior = 'auto';
      container.scrollLeft = currentScroll + setWidth;
      jumped = true;
    } else if (currentScroll > setWidth * 3) {
      container.style.scrollBehavior = 'auto';
      container.scrollLeft = currentScroll - setWidth;
      jumped = true;
    }

    if (jumped) {
      // Restore smooth scroll
      requestAnimationFrame(() => {
        if (container) container.style.scrollBehavior = 'smooth';
      });
    }

    const index = (Math.round(container.scrollLeft / itemWidth) + 1) % values.length;
    if (index !== selectedIndex && index >= 0) {
      setSelectedIndex(index);
      onChange?.(values[index]);
    }
  };

  // Mouse Drag Logic
  const onMouseDown = (e: React.MouseEvent) => {
    if (!scrollRef.current) return;
    setIsDragging(true);
    setStartX(e.pageX - scrollRef.current.offsetLeft);
    setScrollLeftState(scrollRef.current.scrollLeft);
    scrollRef.current.style.scrollBehavior = 'auto';
  };

  const onMouseLeave = () => {
    setIsDragging(false);
    if (scrollRef.current) scrollRef.current.style.scrollBehavior = 'smooth';
  };
  
  const onMouseUp = () => {
    setIsDragging(false);
    if (scrollRef.current) scrollRef.current.style.scrollBehavior = 'smooth';
  };

  const onMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !scrollRef.current) return;
    e.preventDefault();
    const x = e.pageX - scrollRef.current.offsetLeft;
    const walk = (x - startX) * 0.25; // slowed down
    scrollRef.current.scrollLeft = scrollLeftState - walk;
  };

  // Touch drag handlers (slowed down for mobile)
  const onTouchStart = (e: React.TouchEvent) => {
    if (!scrollRef.current) return;
    touchStartXRef.current = e.touches[0].pageX;
    touchScrollLeftRef.current = scrollRef.current.scrollLeft;
    scrollRef.current.style.scrollBehavior = 'auto';
  };

  const onTouchMove = (e: React.TouchEvent) => {
    if (!scrollRef.current) return;
    const dx = touchStartXRef.current - e.touches[0].pageX;
    // 0.4 multiplier = slower scroll on mobile
    scrollRef.current.scrollLeft = touchScrollLeftRef.current + dx * 0.4;
  };

  const onTouchEnd = () => {
    if (!scrollRef.current) return;
    scrollRef.current.style.scrollBehavior = 'smooth';
    const itemWidth = scrollRef.current.offsetWidth / 3;
    const nearest = Math.round(scrollRef.current.scrollLeft / itemWidth) * itemWidth;
    scrollRef.current.scrollTo({ left: nearest, behavior: 'smooth' });
  };

  // Wheel listener
  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;

    const handleWheel = (e: WheelEvent) => {
      if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
        e.preventDefault();
        container.style.scrollBehavior = 'auto';
        container.scrollLeft += e.deltaY * 0.1; // Significantly reduced wheel sensitivity for slow scroll
        // Restore smooth scroll after a short delay
        const timer = setTimeout(() => {
          if (container) container.style.scrollBehavior = 'smooth';
        }, 150);
        return () => clearTimeout(timer);
      }
    };

    container.addEventListener('wheel', handleWheel, { passive: false });
    return () => container.removeEventListener('wheel', handleWheel);
  }, []);

  // Center on mount (scroll so that selected item is in the center)
  useEffect(() => {
    if (scrollRef.current) {
      const itemWidth = scrollRef.current.offsetWidth / 3;
      // To have the i-th item in the center, we scroll to (i-1) * itemWidth
      scrollRef.current.scrollLeft = (values.length * 2 + selectedIndex - 1) * itemWidth;
    }
  }, []);

  return (
    <div className={cn(
      "relative w-20 h-10 rounded-full border border-[#392B28]/10 bg-[#FDFDFD]",
      "shadow-[0_4px_10px_rgba(57,43,40,0.12),inset_0_1px_1px_rgba(255,255,255,1)]",
      "overflow-hidden group transition-all duration-300 hover:border-[#392B28]/20 hover:translate-y-[-1px]",
      className
    )}>
      {/* Selection Highlight / Glow (Soft horizontal glow) */}
      <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-6 bg-[#392B28]/5 blur-md pointer-events-none" />
      
      <div 
        ref={scrollRef}
        onScroll={handleScroll}
        onMouseDown={onMouseDown}
        onMouseLeave={onMouseLeave}
        onMouseUp={onMouseUp}
        onMouseMove={onMouseMove}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
        className={cn(
          "h-full flex overflow-x-scroll snap-x snap-mandatory scroll-smooth hide-scrollbar cursor-grab",
          isDragging && "cursor-grabbing"
        )}
        style={{ 
          scrollbarWidth: 'none', 
          msOverflowStyle: 'none',
          WebkitOverflowScrolling: 'touch' 
        }}
      >
        <style dangerouslySetInnerHTML={{ __html: `
          .hide-scrollbar::-webkit-scrollbar { display: none; }
        ` }} />
        
        {extendedValues.map((val, i) => {
          const isSelected = i % values.length === selectedIndex;
          
          return (
            <div 
              key={`${val}-${i}`}
              className="relative h-full w-[33.333%] flex-shrink-0 flex items-center justify-center snap-center select-none"
              onClick={() => {
                if (scrollRef.current && !isDragging) {
                  const itemWidth = scrollRef.current.offsetWidth / 3;
                  scrollRef.current.scrollTo({
                    left: i * itemWidth,
                    behavior: 'smooth'
                  });
                }
              }}
            >
              {/* Moving Separator Lines */}
              <div className="absolute inset-y-2 left-0 w-px bg-[#392B28]/5" />
              <div className="absolute inset-y-2 right-0 w-px bg-[#392B28]/5" />
              
              <span className={cn(
                "transition-all duration-500 select-none",
                isSelected 
                  ? "text-[18px] font-black text-[#392B28] scale-125 tracking-tighter drop-shadow-[0_2px_4px_rgba(0,0,0,0.1)]" 
                  : "text-[9px] font-bold text-[#392B28]/50 scale-90 tracking-widest uppercase"
              )}>
                {val}
              </span>
            </div>
          );
        })}
      </div>

      {/* Glass Reflection / Gradient Overlay (Curvature Effect) */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Side Vignettes */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#FDFDFD]/30 via-transparent to-[#FDFDFD]/30" />
        {/* Horizontal Curvature Highlight */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#392B28]/5 via-white/20 to-[#392B28]/5" />
      </div>
    </div>
  );
};

export default ScrollPicker;
