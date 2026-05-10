import React, { memo } from 'react';
import { cn } from '@/lib/utils';
import { CheckCircle2, Moon } from 'lucide-react';

interface ProfileData {
  name: string;
  bio: string;
  followers: number;
  projects: number;
  imageUrl: string;
  height: string;
  bodyType: string;
  likes: string[];
  dislikes: string[];
  redFlags: string[];
  preference: string;
  status: 'online' | 'busy';
}

interface HeaderProps {
  className?: string;
  style?: React.CSSProperties;
  profile?: ProfileData;
  isEditable?: boolean;
  isEditing?: boolean;
  onToggleEdit?: () => void;
  onUpdateField?: (field: keyof ProfileData, value: any) => void;
  notifications?: { id: number, message: string }[];
}

const Header: React.FC<HeaderProps> = ({
  className,
  style,
  profile,
  isEditable,
  isEditing,
  onToggleEdit,
  onUpdateField,
}) => {
  const perfectPath = "M 68 1 H 17 C 7 1, 1 12, 1 19 V 306 C 1 319, 10 324, 14 324 H 95 C 109 322, 112 314, 124 304 C 134 296, 138 296, 148 304 C 160 314, 163 322, 177 324 H 258 C 262 324, 271 319, 271 306 V 19 C 271 12, 265 1, 255 1 H 204 C 200 1, 193 4, 191 11 C 189 18, 183 21, 181 21.5 H 91 C 88 21, 82 18, 81 11 C 79 4, 72 1, 68 1 Z";

  return (
    <div className={cn("relative w-full aspect-[272/325] bg-transparent pointer-events-none", className)} style={style}>
      {/* SVG Background Layer */}
      <svg className="absolute inset-0 w-full h-full drop-shadow-[0_20px_50px_rgba(57,43,40,0.15)] z-0" viewBox="0 0 272 325" fill="none">
        <defs>
          <clipPath id={`notch-clip-${isEditable ? 'edit' : 'view'}`}>
            <path d={perfectPath} />
          </clipPath>
        </defs>

        <image
          href={profile?.imageUrl || "/sophie.png"}
          x="0" y="0" width="272" height="325"
          preserveAspectRatio="xMidYMid slice"
          clipPath={`url(#notch-clip-${isEditable ? 'edit' : 'view'})`}
        />

        <path d={perfectPath} fill="#FDFDFD" fillOpacity="0.85" stroke="#ece9e2" strokeWidth="0.5" />
      </svg>

      {/* Shoulder Labels Layer */}
      <div className="absolute top-2 left-[62px] -translate-x-1/2 flex items-center gap-1.5 pointer-events-none whitespace-nowrap z-20">
        <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse shadow-[0_0_5px_rgba(34,197,94,0.5)]" />
        <span className="text-[9px] font-black text-[#392B28]/40 uppercase tracking-[2px]">
          {isEditable ? 'Your Rank' : 'Match 98%'}
        </span>
      </div>

      {/* Shoulder Controls Layer */}
      <div
        onPointerDown={(e) => { if (isEditable) { e.stopPropagation(); onToggleEdit?.(); } }}
        className={cn(
          "absolute top-2 right-[60px] translate-x-1/2 flex items-center gap-1.5 transition-all z-20",
          isEditable ? "pointer-events-auto cursor-pointer active:scale-95 px-3 py-1.5 rounded-full border shadow-sm" : "pointer-events-none",
          isEditable && (isEditing ? "bg-green-600 border-green-500 text-white" : "bg-[#FDFDFD]/90 border-[#ece9e2]")
        )}
      >
        {isEditable ? (
          <>
            <span className="text-[10px] font-black uppercase tracking-[1.5px]">{isEditing ? 'Save' : 'Edit'}</span>
            <div className={cn("w-1.5 h-1.5 rounded-full", isEditing ? "bg-white animate-pulse" : "bg-blue-500")} />
          </>
        ) : (
          <>
            <span className="text-[9px] font-black text-[#392B28]/40 uppercase tracking-[2px]">1.2 KM</span>
            <div className="w-1.5 h-1.5 bg-blue-500 rounded-full shadow-[0_0_5px_rgba(59,130,246,0.5)]" />
          </>
        )}
      </div>

      <div className="relative w-full h-full overflow-hidden rounded-[2.5rem] z-10 pointer-events-none">
        {!isEditable ? (
          /* Page 1: Discovery Style */
          <div className="absolute inset-x-0 bottom-0 top-[65px] px-2 pb-6 flex flex-col items-center z-10 pointer-events-none">
            <div className="text-[9px] uppercase tracking-[4px] text-[#392B28]/40 mb-1.5 font-bold">Profile Overview</div>

            <div className="flex items-center justify-center gap-2 mb-3 pointer-events-auto">
              <h2 className="text-[26px] font-black text-[#392B28] uppercase tracking-tight">{profile?.name}</h2>
              <div className={cn("flex items-center justify-center w-5 h-5 rounded-full shrink-0 shadow-sm", profile?.status === 'online' ? "bg-green-600" : "bg-blue-500")}>
                {profile?.status === 'online' ? <CheckCircle2 className="w-3 h-3 text-white fill-white" /> : <Moon className="w-2.5 h-2.5 text-white fill-white" />}
              </div>
            </div>

            {/* Height & Body */}
            <div className="w-full flex justify-between px-6 mb-6 pointer-events-auto">
              <div className="flex items-center gap-1.5 px-3 py-1 bg-[#392B28]/[0.05] rounded-full">
                <span className="text-[9px] font-bold text-[#392B28]/40 uppercase tracking-widest">Ht:</span>
                <span className="text-[11px] font-bold text-[#392B28]">{profile?.height}</span>
              </div>
              <div className="flex items-center gap-1.5 px-3 py-1 bg-[#392B28]/[0.05] rounded-full">
                <span className="text-[9px] font-bold text-[#392B28]/40 uppercase tracking-widest">Body:</span>
                <span className="text-[11px] font-bold text-[#392B28]">{profile?.bodyType}</span>
              </div>
            </div>

            {/* Vibe Tags (Likes & Red Flags) */}
            <div className="w-full flex justify-between px-6 mb-8 pointer-events-auto">
              {/* LIKES */}
              <div className="flex flex-col items-start w-[45%]">
                <span className="text-[9px] font-black text-green-500 uppercase tracking-[2px] mb-2">Likes</span>
                <div className="flex flex-wrap gap-1.5 justify-start">
                  {profile?.likes.slice(0, 3).map((like, idx) => (
                    <span key={`like-${idx}`} className="px-3 py-1 bg-[#392B28]/[0.05] rounded-full text-green-600 text-[11px] font-bold">
                      {like}
                    </span>
                  ))}
                </div>
              </div>

              {/* RED FLAGS */}
              <div className="flex flex-col items-end w-[45%] text-right">
                <span className="text-[9px] font-black text-red-400 uppercase tracking-[2px] mb-2">Red Flags</span>
                <div className="flex flex-wrap gap-1.5 justify-end">
                  {profile?.redFlags.slice(0, 2).map((flag, idx) => (
                    <span key={`flag-${idx}`} className="px-3 py-1 bg-[#392B28]/[0.05] rounded-full text-red-500 text-[11px] font-bold">
                      {flag}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Preference */}
            <div className="w-full text-center px-6 flex flex-col items-center pointer-events-auto">
              <div className="w-[30%] h-[0.5px] bg-[#392B28]/10 mb-3 rounded-full" />
              <span className="text-[9px] font-bold text-[#392B28]/30 uppercase tracking-[4px] block mb-2">Preference</span>
              <p className="text-[11px] font-semibold text-[#392B28]/90 leading-snug">"{profile?.preference}"</p>
            </div>
          </div>
        ) : (
          /* Page 2: Identity Style */
          <>
            <div className="absolute inset-x-0 bottom-0 top-[65px] px-2 pb-6 overflow-y-auto hide-scrollbar flex flex-col items-center z-10 pointer-events-none">
              {profile && (
                <div className="w-full flex flex-col items-center pointer-events-auto">
                  <div className="text-[9px] uppercase tracking-[4px] text-[#392B28]/40 mb-1.5 font-bold">Your Profile</div>

                  <div className="flex items-center justify-center gap-2 mb-3">
                    {isEditing ? (
                      <input className="bg-transparent border-b-2 border-[#392B28]/10 text-[26px] font-black text-[#392B28] text-center outline-none w-full uppercase tracking-tight" value={profile.name} onChange={(e) => onUpdateField?.('name', e.target.value)} />
                    ) : (
                      <h2 className="text-[26px] font-black text-[#392B28] uppercase tracking-tight text-center">{profile.name}</h2>
                    )}
                    {!isEditing && (
                      <div className={cn("flex items-center justify-center w-5 h-5 rounded-full shrink-0 shadow-sm", profile.status === 'online' ? "bg-green-600" : "bg-blue-500")}>
                        {profile.status === 'online' ? <CheckCircle2 className="w-3 h-3 text-white fill-white" /> : <Moon className="w-2.5 h-2.5 text-white fill-white" />}
                      </div>
                    )}
                  </div>

                  {/* Height & Body */}
                  <div className="w-full flex justify-between px-6 mb-6">
                    <div className="flex items-center gap-1.5 px-3 py-1 bg-[#392B28]/[0.05] rounded-full">
                      <span className="text-[9px] font-bold text-[#392B28]/40 uppercase tracking-widest">Ht:</span>
                      {isEditing ? (
                        <input className="bg-transparent border-b border-[#392B28]/20 text-[11px] font-bold text-[#392B28] w-8 outline-none text-center" value={profile.height} onChange={(e) => onUpdateField?.('height', e.target.value)} />
                      ) : (
                        <span className="text-[11px] font-bold text-[#392B28]">{profile.height}</span>
                      )}
                    </div>
                    <div className="flex items-center gap-1.5 px-3 py-1 bg-[#392B28]/[0.05] rounded-full">
                      <span className="text-[9px] font-bold text-[#392B28]/40 uppercase tracking-widest">Body:</span>
                      {isEditing ? (
                        <input className="bg-transparent border-b border-[#392B28]/20 text-[11px] font-bold text-[#392B28] w-12 outline-none text-center" value={profile.bodyType} onChange={(e) => onUpdateField?.('bodyType', e.target.value)} />
                      ) : (
                        <span className="text-[11px] font-bold text-[#392B28]">{profile.bodyType}</span>
                      )}
                    </div>
                  </div>

                  {/* Vibe Tags (Likes & Red Flags) */}
                  <div className="w-full flex justify-between px-6 mb-8">
                    {/* LIKES */}
                    <div className="flex flex-col items-start w-[45%]">
                      <span className="text-[9px] font-black text-green-500 uppercase tracking-[2px] mb-2">Likes</span>
                      {isEditing ? (
                        <input
                          className="bg-transparent border-b border-green-500/30 text-[10px] font-bold text-green-600 outline-none w-full placeholder:text-green-600/30"
                          value={profile.likes.join(', ')}
                          placeholder="Latte, Art..."
                          onChange={(e) => onUpdateField?.('likes', e.target.value.split(',').map(s => s.trim()).filter(Boolean))}
                        />
                      ) : (
                        <div className="flex flex-wrap gap-1.5 justify-start">
                          {profile.likes.slice(0, 3).map((like, idx) => (
                            <span key={`like-${idx}`} className="px-3 py-1 bg-[#392B28]/[0.05] rounded-full text-green-600 text-[11px] font-bold">
                              {like}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* RED FLAGS */}
                    <div className="flex flex-col items-end w-[45%] text-right">
                      <span className="text-[9px] font-black text-red-400 uppercase tracking-[2px] mb-2">Red Flags</span>
                      {isEditing ? (
                        <input
                          className="bg-transparent border-b border-red-500/30 text-[10px] font-bold text-red-500 outline-none w-full text-right placeholder:text-red-500/30"
                          value={profile.redFlags.join(', ')}
                          placeholder="Rude, Late..."
                          onChange={(e) => onUpdateField?.('redFlags', e.target.value.split(',').map(s => s.trim()).filter(Boolean))}
                        />
                      ) : (
                        <div className="flex flex-wrap gap-1.5 justify-end">
                          {profile.redFlags.slice(0, 2).map((flag, idx) => (
                            <span key={`flag-${idx}`} className="px-3 py-1 bg-[#392B28]/[0.05] rounded-full text-red-500 text-[11px] font-bold">
                              {flag}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Preference */}
                  <div className="w-full text-center px-6 flex flex-col items-center">
                    <div className="w-[30%] h-[0.5px] bg-[#392B28]/10 mb-3 rounded-full" />
                    <span className="text-[9px] font-bold text-[#392B28]/30 uppercase tracking-[4px] block mb-2">Preference</span>
                    {isEditing ? (
                      <textarea
                        className="bg-transparent border-b border-[#392B28]/20 text-[11px] font-semibold text-[#392B28]/90 text-center outline-none w-full resize-none min-h-[40px] hide-scrollbar"
                        value={profile.preference}
                        onChange={(e) => onUpdateField?.('preference', e.target.value)}
                      />
                    ) : (
                      <p className="text-[11px] font-semibold text-[#392B28]/90 leading-snug">"{profile.preference}"</p>
                    )}
                  </div>
                </div>
              )}
            </div>
          </>
        )}

        {/* --- HEADER-NATIVE NOTIFICATION ENGINE --- */}
        <div className="absolute inset-0 pointer-events-none z-40">
          {/* Identity UI Prompt */}
          {isEditing && (
            <div className="absolute top-2 inset-x-0 flex justify-center">
              <div className="px-3 py-1 bg-[#FDFDFD]/90 backdrop-blur-md border border-[#ece9e2] text-[#392B28] text-[7px] font-black tracking-[2px] rounded-full shadow-[0_8px_20px_-5px_rgba(57,43,40,0.12)] animate-bounce">
                Tap image to change
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default memo(Header);
