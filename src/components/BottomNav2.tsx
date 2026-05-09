import React from 'react';

const BottomNav2: React.FC = () => {
  return (
    <div className="fixed bottom-0 left-0 right-0 mx-auto w-full max-w-[460px] z-50 bg-transparent" style={{ paddingBottom: '0px' }}>
      <div className="relative w-full aspect-[460/160]">
        {/* Background Layer with Steel Gradient */}
        <div className="absolute inset-0 overflow-visible">
          <svg className="w-full h-full" viewBox="0 0 460 160" fill="none" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="steelGradient2" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#392B28" />
                <stop offset="35%" stopColor="#4a3c3a" />
                <stop offset="65%" stopColor="#2f2f2f" />
                <stop offset="100%" stopColor="#292929" />
              </linearGradient>
            </defs>
            <path
              d="M 0 0.1 V 150 C 0 156, 4 160, 10 160 H 450 C 456 160, 460 156, 460 150 V 0.1 C 452.8 46.1, 436.2 59.5, 416 59.5 H 294.4 C 272 59.5, 262.7 40.1, 232.5 40.1 C 202.3 40.1, 193 59.5, 170.6 59.5 H 44 C 23.8 59.5, 7.2 46.1, 0 0.1 Z"
              fill="url(#steelGradient2)"
              stroke="rgba(255,255,255,0.05)"
              strokeWidth="0.5"
            />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default BottomNav2;
