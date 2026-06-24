import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import { PhoneCall, ImagePlus } from 'lucide-react';
import ScrollPicker from './common/ScrollPicker';

interface BottomNav0Props {
  className?: string;
  style?: React.CSSProperties;
  fabOnly?: boolean;
  onFabClick?: () => void;
}

const BottomNav: React.FC<BottomNav0Props> = ({ className, style, fabOnly, onFabClick }) => {
  const [isPressed, setIsPressed] = useState(false);
  const [isSmartMode, setIsSmartMode] = useState(false);
  const [isBFFMode, setIsBFFMode] = useState(false);
  const [isAvailable, setIsAvailable] = useState(false);

  return (
    <div className={cn("relative w-full overflow-visible", className)} style={style}>
      <div className="relative w-full overflow-visible" style={{ height: '80px' }}>

        {/* Global Ambient Glow Layer - Spans entire width, blooming from the top edge */}
        {isAvailable && (
          <div className="absolute -top-20 inset-x-0 h-40 pointer-events-none flex justify-center items-end z-0 overflow-visible">
            <div className="w-full h-full bg-green-500/30 rounded-[100%] blur-[60px] animate-pulse" />
            <div className="absolute w-[120%] h-full bg-green-400/10 rounded-[100%] blur-[80px] animate-ping duration-[3000ms]" />
          </div>
        )}

        {/* Background Layer with Soft Milky Card Gradient */}
        <div className={cn(
          "absolute inset-0 overflow-visible transition-all duration-700 ease-[cubic-bezier(0.23,1,0.32,1)]",
          fabOnly ? "opacity-0 translate-y-10 pointer-events-none" : "opacity-100 translate-y-0"
        )}>
          <svg className="absolute inset-0 w-full h-full" viewBox="0 0 460 104" preserveAspectRatio="none">
            <defs>
              <linearGradient id="bottomMilkyGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#FDFDFD" stopOpacity="0.98" />
                <stop offset="50%" stopColor="#F5F5F0" stopOpacity="0.95" />
                <stop offset="100%" stopColor="#F0EDE5" stopOpacity="0.92" />
              </linearGradient>
            </defs>
            <path
              d="M9.6 1.1 C1.2 1.5 0.1 9 0.6 12.6 V80 C0.6 94 10 104 24 104 H436 C450 104 459.6 94 459.6 80 V12.6 C460.1 9 459 1.5 450.6 1.1 H297.6 C293.7 0.6 285.5 2.2 283.1 12.6 C283.1 41.9 259.4 65.6 230.1 65.6 C200.8 65.6 177.1 41.9 177.1 12.6 C174.7 2.2 166.4 0.6 162.6 1.1 Z"
              fill="url(#bottomMilkyGradient)"
              stroke="#ece9e2"
              strokeWidth="0.8"
            />
          </svg>
        </div>

        {/* Floating Action Button (FAB) - Refined for Milky Theme */}
        <button
          onClick={onFabClick}
          className="absolute top-[-28%] left-1/2 -translate-x-1/2 w-[18%] aspect-square rounded-full transition-transform cursor-pointer group z-10 active:scale-95 animate-pulse overflow-hidden ring-1 ring-[#392B28]/10 flex items-center justify-center"
          style={{
            background: 'linear-gradient(135deg, #FDFDFD 0%, #F5F5F0 40%, #E5E2D9 100%)',
            boxShadow: 'inset 0 1px 2px rgba(255,255,255,0.8), 0 15px 30px -5px rgba(57, 43, 40, 0.2)',
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-transparent to-[#392B28]/5 opacity-0 group-hover:opacity-100 transition-opacity" />
          {fabOnly ? (
            <ImagePlus className="w-7 h-7 text-[#392B28] relative z-10 drop-shadow-[0_2px_2px_rgba(0,0,0,0.1)]" strokeWidth={2.5} />
          ) : (
            <PhoneCall className="w-7 h-7 text-[#392B28] relative z-10 drop-shadow-[0_2px_2px_rgba(0,0,0,0.1)]" strokeWidth={2.5} />
          )}
        </button>

        {/* Navigation Items */}
        {/* Navigation Items */}
        <div className={cn(
          "absolute inset-0 w-full h-full flex justify-between items-center pointer-events-none transition-all duration-700 ease-[cubic-bezier(0.23,1,0.32,1)]",
          fabOnly ? "opacity-0 translate-y-10" : "opacity-100 translate-y-0"
        )}>

          {/* Left Group */}
          <div className="flex flex-1 items-center justify-evenly pointer-events-auto mt-2 px-2">
            {/* Vibe Mode Switcher (BFF / DATE) */}
            <div
              onClick={() => setIsBFFMode(!isBFFMode)}
              className={cn(
                "w-16 h-10 transition-all duration-300 cursor-pointer flex flex-col items-center justify-center border border-[#392B28]/10",
                isBFFMode
                  ? "bg-[#392B28]/10 shadow-[inset_0_2px_4px_rgba(0,0,0,0.1)]"
                  : "bg-[#FDFDFD]/80 shadow-[0_4px_8px_rgba(57,43,40,0.08),inset_0_1px_1px_rgba(255,255,255,0.8)]"
              )}
              style={{ borderRadius: '20px 8px 8px 20px' }}
            >
              <span className={cn(
                "text-[14px] font-black tracking-tight transition-colors",
                isBFFMode ? "text-[#392B28]" : "text-[#392B28]/80"
              )}>
                VB
              </span>
              <span className={cn(
                "text-[6.5px] font-bold uppercase tracking-[0.05em] mt-0.5 transition-colors",
                isBFFMode ? "text-[#B5A492]" : "text-[#392B28]/30"
              )}>
                {isBFFMode ? 'BFF' : 'DATE'}
              </span>
            </div>

            {/* AI Smart Mode Toggle */}
            <div
              onClick={() => setIsSmartMode(!isSmartMode)}
              className={cn(
                "w-16 h-10 transition-all duration-300 cursor-pointer flex flex-col items-center justify-center border border-[#392B28]/10",
                isSmartMode
                  ? "bg-[#392B28]/10 shadow-[inset_0_2px_4px_rgba(0,0,0,0.1)]"
                  : "bg-[#FDFDFD]/80 shadow-[0_4px_8px_rgba(57,43,40,0.08),inset_0_1px_1px_rgba(255,255,255,0.8)]"
              )}
              style={{ borderRadius: '8px 20px 20px 8px' }}
            >
              <span className={cn(
                "text-[14px] font-black tracking-tight transition-colors",
                isSmartMode ? "text-[#392B28]" : "text-[#392B28]/80"
              )}>
                AI
              </span>
              <span className={cn(
                "text-[6.5px] font-bold uppercase tracking-[0.05em] mt-0.5 transition-colors",
                isSmartMode ? "text-[#B5A492]" : "text-[#392B28]/30"
              )}>
                {isSmartMode ? 'SMART' : 'ORGANIC'}
              </span>
            </div>
          </div>

          {/* Spacer for FAB */}
          <div className="w-16 md:w-20" />

          {/* Right Group */}
          <div className="flex flex-1 items-center justify-evenly pointer-events-auto mt-2 px-2">
            {/* Scroll Picker with Updated Gender Labels */}
            <ScrollPicker
              values={['M', 'F', 'G', 'T', 'O']}
              onChange={(val) => console.log('Gender Preference:', val)}
              className="mx-2"
            />

            {/* Availability Toggle Button - Last Nav Item */}
            <div className="relative">
              <div
                className="w-11 h-11 rounded-full bg-[#392B28]/5 shadow-[inset_0_3px_6px_rgba(0,0,0,0.05)] flex items-center justify-center p-1.5 cursor-pointer group relative z-20"
                onMouseDown={() => setIsPressed(true)}
                onMouseUp={() => setIsPressed(false)}
                onMouseLeave={() => setIsPressed(false)}
                onTouchStart={() => setIsPressed(true)}
                onTouchEnd={() => setIsPressed(false)}
                onClick={() => setIsAvailable(!isAvailable)}
              >
                <div
                  className={cn(
                    "w-full h-full rounded-full transition-all duration-300",
                    isPressed ? "scale-95" : "scale-100",
                    isAvailable 
                      ? "bg-green-500 shadow-[inset_0_3px_5px_rgba(0,0,0,0.15),_0_0_10px_rgba(34,197,94,0.3)] border border-green-600/20" 
                      : "bg-gradient-to-br from-[#FDFDFD] to-[#E5E2D9] shadow-[0_2px_4px_rgba(57,43,40,0.1),_inset_0_1px_2px_rgba(255,255,255,0.9)] border border-[#392B28]/5"
                  )}
                />
              </div>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};

export default BottomNav;
