import React, { useMemo } from 'react';

interface MilkyBackgroundProps {
  theme?: 'none' | 'calm' | 'velvet' | 'milky';
}

const MilkyBackground: React.FC<MilkyBackgroundProps> = ({ theme = 'milky' }) => {
  const particles = useMemo(() => {
    return Array.from({ length: 30 }).map((_, i) => ({
      id: i,
      left: `${Math.random() * 100}vw`,
      size: `${1 + Math.random() * 2}px`,
      duration: `${6 + Math.random() * 10}s`,
      delay: `${Math.random() * 10}s`,
      color: theme === 'velvet' 
        ? ['#ff78b444', '#dda0dd33', '#ffffff22'][Math.floor(Math.random() * 3)] 
        : theme === 'calm'
        ? ['#14a09644', '#d5c2ae33', '#ffffff22'][Math.floor(Math.random() * 3)]
        : theme === 'milky'
        ? ['#00000011', '#00000008', '#00000004'][Math.floor(Math.random() * 3)]
        : ['#ffffff11', '#ffffff08', '#ffffff04'][Math.floor(Math.random() * 3)]
    }));
  }, [theme]);

  const backgroundStyle = useMemo(() => {
    if (theme === 'none') return { background: 'transparent' };
    
    if (theme === 'velvet') {
      return {
        background: `
          radial-gradient(ellipse 80% 60% at 20% 10%, #4A364A 0%, transparent 60%),
          radial-gradient(ellipse 60% 80% at 80% 90%, #362836 0%, transparent 55%),
          radial-gradient(ellipse 100% 50% at 50% 50%, #2A1F2A 0%, transparent 60%),
          linear-gradient(160deg, #362836 0%, #4A364A 40%, #362836 100%)
        `
      };
    }

    if (theme === 'milky') {
      return {
        background: `
          radial-gradient(ellipse 80% 60% at 20% 10%, #C4B4A4 0%, transparent 60%),
          radial-gradient(ellipse 60% 80% at 80% 90%, #B5A492 0%, transparent 55%),
          radial-gradient(ellipse 100% 50% at 50% 50%, #A39181 0%, transparent 60%),
          linear-gradient(160deg, #A39181 0%, #C4B4A4 40%, #B5A492 100%)
        `
      };
    }

    return {
      background: `
        radial-gradient(ellipse 80% 60% at 20% 10%, #1c1c1c 0%, transparent 60%),
        radial-gradient(ellipse 60% 80% at 80% 90%, #1a1a1a 0%, transparent 55%),
        radial-gradient(ellipse 100% 50% at 50% 50%, #171717 0%, transparent 60%),
        linear-gradient(160deg, #171717 0%, #1c1c1c 40%, #171717 100%)
      `
    };
  }, [theme]);

  const isActive = theme !== 'none';

  return (
    <div className={`fixed inset-0 z-[-1] overflow-hidden pointer-events-none transition-colors duration-1000 ${theme === 'velvet' ? 'bg-[#362836]' : theme === 'milky' ? 'bg-[#B5A492]' : theme === 'none' ? 'bg-transparent' : 'bg-[#171717]'}`}>
      {/* Canvas Gradients */}
      <div
        className="absolute inset-0 transition-opacity duration-1000"
        style={{ ...backgroundStyle, opacity: isActive ? 1 : 0 }}
      />

      {/* Drifting Blobs (Animation Bubbles) */}
      <div className={`absolute inset-0 overflow-hidden transition-opacity duration-1000 ${isActive ? 'opacity-100' : 'opacity-0'}`}>
        <div
          className="absolute w-[800px] h-[800px] rounded-full animate-drift-1 opacity-60"
          style={{
            background: theme === 'velvet' 
              ? 'radial-gradient(circle, #ff78b4 0%, transparent 75%)' 
              : theme === 'milky'
              ? 'radial-gradient(circle, #FFFFFF 0%, transparent 75%)'
              : 'radial-gradient(circle, #222222 0%, transparent 75%)',
            top: '-250px',
            left: '-200px',
          }}
        />
        <div
          className="absolute w-[700px] h-[700px] rounded-full animate-drift-2 opacity-50"
          style={{
            background: theme === 'velvet' 
              ? 'radial-gradient(circle, #DDA0DD 0%, transparent 75%)' 
              : theme === 'milky'
              ? 'radial-gradient(circle, #F5F5F0 0%, transparent 75%)'
              : 'radial-gradient(circle, #333333 0%, transparent 75%)',
            bottom: '-200px',
            right: '-150px',
          }}
        />
        <div
          className="absolute w-[300px] h-[300px] rounded-full animate-drift-3 opacity-70"
          style={{
            background: theme === 'velvet' 
              ? 'radial-gradient(circle, #4A2C4A 0%, transparent 70%)' 
              : theme === 'milky'
              ? 'radial-gradient(circle, #FDFDFD 0%, transparent 70%)'
              : 'radial-gradient(circle, #111111 0%, transparent 70%)',
            top: '40%',
            left: '60%',
          }}
        />
      </div>

      {/* Floating Particles (Small Bubbles) */}
      <div className="absolute inset-0">
        {particles.map((p) => (
          <div
            key={p.id}
            className={`absolute rounded-full animate-float-up transition-opacity duration-700 ${isActive ? 'opacity-100' : 'opacity-0'}`}
            style={{
              left: p.left,
              bottom: '-4px',
              width: p.size,
              height: p.size,
              backgroundColor: p.color,
              animationDuration: p.duration,
              animationDelay: p.delay,
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default MilkyBackground;
