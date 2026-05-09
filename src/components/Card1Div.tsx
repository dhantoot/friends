import React from 'react';

interface Card1DivProps {
  className?: string;
  style?: React.CSSProperties;
}

const Card1Div: React.FC<Card1DivProps> = ({ className, style }) => {
  return (
    <div className={`relative w-full aspect-[460/160] ${className}`} style={style}>
      {/* Background Layer with Soft Milky Card Gradient */}
      <div className="absolute inset-0 overflow-visible">
        <svg className="w-full h-full" viewBox="0 0 460 160" fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="divCardGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#FDFDFD" stopOpacity="0.98" />
              <stop offset="50%" stopColor="#F5F5F0" stopOpacity="0.95" />
              <stop offset="100%" stopColor="#F0EDE5" stopOpacity="0.92" />
            </linearGradient>
          </defs>
          <path
            d="M 430 0.5 H 30 C 20 0.5, 13.2 7, 13.2 17 V 100.6 C 13.2 146.6, 29.8 160, 50 160 H 168.1 C 190.5 160, 199.8 140.6, 230 140.6 C 260.2 140.6, 269.5 160, 291.9 160 H 410 C 430.2 160, 446.8 146.6, 446.8 100.6 V 17 C 446.8 7, 440 0.5, 430 0.5 Z"
            fill="url(#divCardGradient)"
            stroke="rgba(57, 43, 40, 0.15)"
            strokeWidth="0.8"
          />
        </svg>
      </div>
    </div>
  );
};

export default Card1Div;
