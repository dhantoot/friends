import React from 'react';

const TopNav: React.FC = () => {
  return (
    <div className="fixed top-0 left-0 right-0 mx-auto w-full max-w-[460px] z-50 bg-transparent" style={{ paddingTop: '0px' }}>
      <div className="relative w-full aspect-[460/160]">
        {/* Background Layer with Mirrored Steel Gradient */}
        <div className="absolute inset-0 overflow-visible">
          <svg className="w-full h-full" viewBox="0 0 460 160" fill="none" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="topSteelGradient" x1="0%" y1="100%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#392B28" />
                <stop offset="35%" stopColor="#4a3c3a" />
                <stop offset="65%" stopColor="#2f2f2f" />
                <stop offset="100%" stopColor="#292929" />
              </linearGradient>
            </defs>
            <path
              d="M 0 159.9 V 10 C 0 4, 4 0, 10 0 H 450 C 456 0, 460 4, 460 10 V 159.9 C 452.8 113.9, 436.2 100.5, 416 100.5 H 294.4 C 272 100.5, 262.7 119.9, 232.5 119.9 C 202.3 119.9, 193 100.5, 170.6 100.5 H 44 C 23.8 100.5, 7.2 113.9, 0 159.9 Z"
              fill="url(#topSteelGradient)"
              stroke="rgba(255,255,255,0.05)"
              strokeWidth="0.5"
            />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default TopNav;
