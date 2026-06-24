import React, { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';
import { X } from 'lucide-react';

interface SheetProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  description?: string;
  children: React.ReactNode;
}

export const Sheet: React.FC<SheetProps> = ({ isOpen, onClose, title, description, children }) => {
  const [shouldRender, setShouldRender] = useState(isOpen);
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setShouldRender(true);
      // Small delay ensures the browser paints the 'translate-y-full' state first
      const timer = setTimeout(() => setAnimate(true), 50);
      return () => clearTimeout(timer);
    } else {
      setAnimate(false);
    }
  }, [isOpen]);

  const onAnimationEnd = () => {
    if (!isOpen) setShouldRender(false);
  };

  if (!shouldRender) return null;

  return (
    <div className="fixed inset-0 z-[500] flex flex-col justify-end pointer-events-none overflow-hidden">
      {/* Backdrop */}
      <div 
        className={cn(
          "absolute inset-0 bg-[#392B28]/40 backdrop-blur-[4px] transition-opacity duration-700 pointer-events-auto",
          animate ? "opacity-100" : "opacity-0"
        )}
        onClick={onClose}
      />
      
      {/* Sheet Content */}
      <div 
        className={cn(
          "relative w-full max-h-[85vh] bg-[#F5F5F0] shadow-[0_-20px_50px_rgba(0,0,0,0.15)] rounded-t-[2.5rem] transition-transform duration-[800ms] ease-[cubic-bezier(0.23,1,0.32,1)] pointer-events-auto flex flex-col will-change-transform",
          animate ? "translate-y-0" : "translate-y-full"
        )}
        onTransitionEnd={onAnimationEnd}
      >
        {/* Handle */}
        <div className="flex-none flex justify-center py-5">
          <div className="w-12 h-1.5 rounded-full bg-[#392B28]/10" />
        </div>

        {/* Header */}
        <div className="px-8 pb-6 flex items-start justify-between">
          <div>
            {title && <h2 className="text-[22px] font-black text-[#392B28] leading-tight tracking-tight">{title}</h2>}
            {description && <p className="text-[13px] font-medium text-[#392B28]/50 mt-1">{description}</p>}
          </div>
          <button 
            onClick={onClose}
            className="w-10 h-10 rounded-full bg-[#392B28]/5 flex items-center justify-center text-[#392B28]/40 active:scale-90 transition-transform"
          >
            <X className="w-5 h-5" strokeWidth={3} />
          </button>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto px-8 pb-12 hide-scrollbar">
          <div className={cn(
            "transition-all duration-700 delay-200 transform",
            animate ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          )}>
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

interface PhotoUploadProps {
  label: string;
  description?: string;
  icon: React.ReactNode;
  previewUrl?: string;
  onUpload: () => void;
}

export const PhotoUploadZone: React.FC<PhotoUploadProps> = ({ label, description, icon, previewUrl, onUpload }) => (
  <div className="flex flex-col gap-2 mb-6">
    <div className="flex flex-col ml-1">
      <span className="text-[10px] font-black uppercase tracking-[2px] text-[#392B28]/30">{label}</span>
      {description && <span className="text-[10px] font-medium text-[#392B28]/40 mt-0.5">{description}</span>}
    </div>
    <div 
      onClick={onUpload}
      className={cn(
        "relative w-full aspect-video rounded-[1.5rem] border-2 border-dashed border-[#392B28]/10 bg-[#392B28]/[0.02] flex flex-col items-center justify-center transition-all cursor-pointer hover:bg-[#392B28]/[0.04] active:scale-[0.98]",
        previewUrl && "border-none"
      )}
    >
      {previewUrl ? (
        <>
          <img src={previewUrl} alt={label} className="absolute inset-0 w-full h-full object-cover rounded-[1.5rem]" />
          <div className="absolute inset-0 bg-[#392B28]/20 rounded-[1.5rem] flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
            <div className="bg-white/90 backdrop-blur px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-widest text-[#392B28]">
              Change Photo
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="w-12 h-12 rounded-2xl bg-white shadow-sm flex items-center justify-center mb-3">
            {icon}
          </div>
          <span className="text-[11px] font-bold text-[#392B28]/60">Tap to upload</span>
        </>
      )}
    </div>
  </div>
);
