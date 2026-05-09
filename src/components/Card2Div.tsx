import React from 'react';

interface Card2DivProps {
  className?: string;
  style?: React.CSSProperties;
}

const Card2Div: React.FC<Card2DivProps> = ({ className, style }) => {
  return (
    <div className={`relative w-full aspect-[366/170] px-[2.6%] ${className}`} style={style}>
      {/* Background Layer with Soft Milky Card Gradient following BottomDiv pattern */}
      <div className="absolute inset-0 overflow-visible">
        <svg className="w-full h-full" viewBox="0 0 366 170" fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="card2Gradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#FDFDFD" stopOpacity="0.98" />
              <stop offset="50%" stopColor="#F5F5F0" stopOpacity="0.95" />
              <stop offset="100%" stopColor="#F0EDE5" stopOpacity="0.92" />
            </linearGradient>
          </defs>
          <path
            d="M 25 1 H 123 C 133 1, 135 10, 140 15 C 158 40, 208 40, 226 15 C 231 10, 233 1, 243 1 H 341 C 355 1, 365 11, 365 25 V 145 C 365 159, 355 169, 341 169 H 250 C 240 169, 236 159, 236 143 C 236 127, 224 122, 216 122 H 150 C 142 122, 130 127, 130 143 C 130 159, 126 169, 116 169 H 25 C 11 169, 1 159, 1 145 V 25 C 1 11, 11 1, 25 1 Z"
            fill="url(#card2Gradient)"
            stroke="rgba(57, 43, 40, 0.15)"
            strokeWidth="0.8"
          />
        </svg>
      </div>

      {/* Content Area */}
      <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
        <div className="text-[10px] uppercase tracking-[4px] text-[#392B28]/40 mb-2 font-semibold">
          System Updated
        </div>
        <div className="text-2xl font-extrabold text-[#392B28] tracking-tighter">
          Symmetrical V2
        </div>
      </div>
    </div>
  );
};

export default Card2Div;
