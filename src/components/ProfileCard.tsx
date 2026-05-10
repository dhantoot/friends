import React from 'react';
import { CheckCircle2, User2, CheckSquare, Moon, Plus } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ProfileCardProps {
  className?: string;
  style?: React.CSSProperties;
  profile?: {
    name: string;
    imageUrl: string;
    status: 'online' | 'busy';
  };
  onFollow?: () => void;
}

const ProfileCard: React.FC<ProfileCardProps> = ({ className, style, profile, onFollow }) => {
  return (
    <div
      className={cn(
        "relative w-[160px] h-full min-h-[180px] max-h-[300px] rounded-[2rem] overflow-hidden bg-[#FDFDFD]",
        "shadow-[0_12px_30px_rgba(57,43,40,0.12),inset_0_1px_1px_rgba(255,255,255,0.4)]",
        "border border-[#392B28]/10",
        className
      )}
      style={{...style, touchAction: 'pan-x', WebkitUserSelect: 'none', userSelect: 'none', pointerEvents: 'auto'} as React.CSSProperties}
    >
      {/* Profile Image - Now Full Background */}
      <div 
        className="absolute inset-0 overflow-hidden pointer-events-none"
        style={{ WebkitTouchCallout: 'none' } as React.CSSProperties}
      >
        <img
          src={profile?.imageUrl || "/sophie.png"}
          alt={profile?.name || "Profile"}
          draggable={false}
          className="w-full h-full object-cover pointer-events-none select-none"
        />
        {/* Immersive Fade / Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#FDFDFD] via-[#FDFDFD]/40 to-transparent" />
      </div>

      {/* Content Area - Now Floating at bottom */}
      <div className="absolute bottom-0 left-0 right-0 px-4 pt-4 pb-6 flex flex-col pointer-events-none">
        {/* Name & Status Badge */}
        <div className="flex items-center gap-1.5 mb-1.5 pointer-events-auto">
          <h2 className="text-[16px] font-black text-[#392B28] tracking-tight truncate">
            {profile?.name || "Sophie Bennett"}
          </h2>
          <div className={cn(
            "flex items-center justify-center w-4 h-4 rounded-full shrink-0 transition-colors shadow-sm",
            profile?.status === 'online' ? "bg-green-600" : "bg-blue-500"
          )}>
            {profile?.status === 'online' ? (
              <CheckCircle2 className="w-2.5 h-2.5 text-white fill-white" strokeWidth={3} />
            ) : (
              <Moon className="w-2 h-2 text-white fill-white" strokeWidth={3} />
            )}
          </div>
        </div>

        {/* Stats and Follow Button */}
        <div className="flex items-center justify-between mt-auto">
          <div className="flex items-center gap-2">
            {/* Followers Stat */}
            <div className="flex items-center gap-1">
              <User2 className="w-2.5 h-2.5 text-[#392B28]/60" />
              <span className="text-[#392B28] text-[9px] font-black">312</span>
            </div>
            {/* Projects Stat */}
            <div className="flex items-center gap-1">
              <CheckSquare className="w-2.5 h-2.5 text-[#392B28]/60" />
              <span className="text-[#392B28] text-[9px] font-black">48</span>
            </div>
          </div>

          {/* Add Button */}
          <button 
            onClick={(e) => { e.stopPropagation(); onFollow?.(); }}
            className="pointer-events-auto flex items-center justify-center gap-1 bg-[#FDFDFD] hover:bg-[#F5F5F0] text-[#392B28] font-black text-[9px] px-3 py-1.5 rounded-lg shadow-[0_2px_8px_rgba(57,43,40,0.12),inset_0_1px_1px_white] transition-all active:scale-95"
          >
            <Plus className="w-2.5 h-2.5 text-[#392B28]" strokeWidth={4} />
            Add
          </button>
        </div>
      </div>

      {/* Glossy Overlay */}
      <div className="absolute inset-0 pointer-events-none rounded-[2rem] ring-1 ring-inset ring-white/10" />
    </div>
  );
};

export default ProfileCard;
