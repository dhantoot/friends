import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import ScrollPicker from './common/ScrollPicker';

const BottomNav: React.FC = () => {
  const [isPressed, setIsPressed] = useState(false);
  const [isSKAuto, setIsSKAuto] = useState(false);

  return (
    <div className="fixed bottom-0 left-0 right-0 mx-auto w-full max-w-[460px] z-50 bg-[#171717]" style={{ paddingBottom: '0px' }}>
      <div className="relative w-full aspect-[460/104]">

        {/* Background Layer with Steel Gradient */}
        <div className="absolute inset-0 rounded-b-[2.5rem] overflow-hidden">
          <svg className="absolute inset-0 w-full h-full" viewBox="0 0 460 104" preserveAspectRatio="none">
            <defs>
              <linearGradient id="steelGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#392B28" />
                <stop offset="35%" stopColor="#4a3c3a" />
                <stop offset="65%" stopColor="#2f2f2f" />
                <stop offset="100%" stopColor="#292929" />
              </linearGradient>
            </defs>
            <path
              d="M9.60133 1.14214 C1.20133 1.54214 0.10133 8.97548 0.60133 12.6421 V104 H459.60067 V12.6421 C460.10067 8.97548 459.00067 1.54214 450.60067 1.14214 H297.601 C293.767 0.642142 285.501 2.24214 283.101 12.6421 C283.101 41.9131891 259.3720891 65.6421 230.101 65.6421 C200.8299109 65.6421 177.101 41.9131891 177.101 12.6421 C174.701 2.24214 166.435 0.642142 162.601 1.14214 Z"
              fill="url(#steelGradient)"
            />
          </svg>
        </div>

        {/* Floating Action Button (FAB) */}
        <button
          className="absolute top-[-28%] left-1/2 -translate-x-1/2 w-[18%] aspect-square rounded-full shadow-2xl transition-transform cursor-pointer group z-10 active:scale-95 animate-pulse overflow-hidden ring-1 ring-white/5"
          style={{
            background: 'linear-gradient(135deg, #9ca3af 0%, #6b7280 40%, #4b5563 60%, #1f2937 100%)',
            boxShadow: 'inset 0 1px 1px rgba(255,255,255,0.1), 0 20px 25px -5px rgba(0, 0, 0, 0.3)',
          }}
        />

        {/* Navigation Items */}
        <div className="absolute inset-0 w-full h-full flex justify-between items-center pointer-events-none">

          {/* Left Group */}
          <div className="flex flex-1 items-center justify-evenly pointer-events-auto mt-2">
            <div
              className="w-10 h-10 rounded-xl bg-cover bg-center border border-white/10 shadow-md cursor-pointer hover:scale-105 transition-transform"
              style={{ backgroundImage: "url('/nav-bg.png')" }}
            />

            <div
              onClick={() => setIsSKAuto(!isSKAuto)}
              className={cn(
                "w-16 h-10 transition-all duration-300 cursor-pointer flex flex-col items-center justify-center border border-white/10 mr-4",
                isSKAuto
                  ? "bg-black/60 shadow-[inset_0_2px_6px_rgba(0,0,0,0.8)]"
                  : "bg-[#2a2a2a] shadow-[0_4px_12px_rgba(0,0,0,0.6),inset_0_1px_1px_rgba(255,255,255,0.2)]"
              )}
              style={{ borderRadius: '8px 20px 20px 8px' }}
            >
              <span className={cn(
                "text-[14px] font-black tracking-tight transition-colors",
                isSKAuto ? "text-white/95" : "text-white"
              )}>
                SK
              </span>
              <span className={cn(
                "text-[6.5px] font-bold uppercase tracking-[0.05em] mt-0.5 transition-colors",
                isSKAuto ? "text-cyan-400/90" : "text-white/30"
              )}>
                {isSKAuto ? 'AUTO' : 'DEFAULT'}
              </span>
            </div>
          </div>

          {/* Spacer for FAB */}
          <div className="w-16 md:w-20" />

          {/* Right Group */}
          <div className="flex flex-1 items-center justify-evenly pointer-events-auto mt-2">
            {/* Scroll Picker */}
            <ScrollPicker
              values={['M', 'S', 'I']}
              onChange={(val) => console.log('Selected:', val)}
              className="ml-4"
            />

            {/* Beveled Button in Hole */}
            <div
              className="w-12 h-12 rounded-full bg-black/40 shadow-[inset_0_4px_8px_rgba(0,0,0,0.9)] flex items-center justify-center p-1.5 cursor-pointer group"
              onMouseDown={() => setIsPressed(true)}
              onMouseUp={() => setIsPressed(false)}
              onMouseLeave={() => setIsPressed(false)}
              onTouchStart={() => setIsPressed(true)}
              onTouchEnd={() => setIsPressed(false)}
            >
              <div
                className={cn(
                  "w-full h-full rounded-full transition-all duration-75 shadow-[0_2px_4px_rgba(0,0,0,0.5),_inset_0_1px_2px_rgba(255,255,255,0.2)]",
                  isPressed ? "scale-90 translate-y-[1px]" : "scale-100 translate-y-0"
                )}
                style={{ background: 'linear-gradient(145deg, #444444, #1a1a1a)' }}
              />
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};

export default BottomNav;
