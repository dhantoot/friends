import React, { useEffect, useState } from 'react';
import { CheckCircle2, Save } from 'lucide-react';

interface ToastNotificationProps {
  id: number;
  message: string;
}

const ToastNotification: React.FC<ToastNotificationProps> = ({ id, message }) => {
  const [phase, setPhase] = useState<'enter' | 'hold' | 'exit'>('enter');

  useEffect(() => {
    // Enter → Hold after 300ms
    const holdTimer = setTimeout(() => setPhase('hold'), 300);
    // Hold → Exit after 2300ms
    const exitTimer = setTimeout(() => setPhase('exit'), 2300);
    return () => {
      clearTimeout(holdTimer);
      clearTimeout(exitTimer);
    };
  }, [id]);

  const isAdded = message.toLowerCase().includes('add');

  const enterStyle: React.CSSProperties = {
    transform: 'translateY(0px) scale(0.92)',
    opacity: 0,
    transition: 'transform 350ms cubic-bezier(0.34,1.56,0.64,1), opacity 300ms ease',
  };

  const holdStyle: React.CSSProperties = {
    transform: 'translateY(0px) scale(1)',
    opacity: 1,
    transition: 'transform 350ms cubic-bezier(0.34,1.56,0.64,1), opacity 300ms ease',
  };

  const exitStyle: React.CSSProperties = {
    transform: 'translateY(-10px) scale(0.9)',
    opacity: 0,
    transition: 'transform 400ms cubic-bezier(0.4,0,1,1), opacity 350ms ease',
  };

  const currentStyle = phase === 'enter' ? enterStyle : phase === 'hold' ? holdStyle : exitStyle;

  return (
    <div
      className="flex items-center gap-1.5 px-3 py-1 rounded-full"
      style={{
        ...currentStyle,
        background: 'rgba(253,253,253,0.92)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        border: '1px solid rgba(57,43,40,0.08)',
        boxShadow: isAdded
          ? '0 8px 28px -4px rgba(34,197,94,0.25), 0 2px 8px rgba(57,43,40,0.08), inset 0 1px 1px rgba(255,255,255,0.6)'
          : '0 8px 28px -4px rgba(57,43,40,0.18), 0 2px 8px rgba(57,43,40,0.08), inset 0 1px 1px rgba(255,255,255,0.6)',
      }}
    >
      {/* Icon */}
      <div
        className="flex items-center justify-center w-3.5 h-3.5 rounded-full shrink-0"
        style={{
          background: isAdded ? 'rgba(34,197,94,0.12)' : 'rgba(57,43,40,0.08)',
        }}
      >
        {isAdded ? (
          <CheckCircle2 className="w-2 h-2 text-green-500" strokeWidth={3} />
        ) : (
          <Save className="w-2 h-2 text-[#392B28]" strokeWidth={2.5} />
        )}
      </div>

      {/* Message */}
      <span
        className="text-[7px] font-black tracking-[2px] uppercase"
        style={{ color: isAdded ? 'rgb(22,163,74)' : '#392B28' }}
      >
        {message}
      </span>

      {/* Animated dot */}
      <div
        className="w-1 h-1 rounded-full shrink-0 animate-pulse"
        style={{
          background: isAdded ? 'rgb(34,197,94)' : 'rgb(57,43,40)',
          boxShadow: isAdded
            ? '0 0 4px rgba(34,197,94,0.6)'
            : '0 0 4px rgba(57,43,40,0.3)',
        }}
      />
    </div>
  );
};

export default ToastNotification;
