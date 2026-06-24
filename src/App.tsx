import { useEffect, useRef, useState } from 'react'
import { cn } from '@/lib/utils';

import MilkyBackground from './components/common/MilkyBackground'
import { StatusBar } from '@capacitor/status-bar'
import Header from './components/Header';
import BottomNav0 from './components/BottomNav0';
import ProfileCard from './components/ProfileCard';
import ToastNotification from './components/ToastNotification';
import { Bell, Camera, MessageCircle, Check, X, User, Image as ImageIcon } from 'lucide-react';
import { Item, ItemMedia, ItemContent, ItemTitle, ItemDescription } from './components/common/Item';
import { Sheet, PhotoUploadZone } from './components/common/Sheet';
import { ChatBox } from './components/common/ChatBox';

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

interface FeedUpdate {
  id: string;
  type: 'request' | 'view' | 'like' | 'comment' | 'follow' | 'message' | 'system' | 'security';
  title: string;
  description: string;
  userImage?: string;
  isRead?: boolean;
  isRemoving?: boolean;
}

const profiles: ProfileData[] = [
  { name: "Sophie", bio: "Product Designer & Coffee addict.", followers: 312, projects: 48, imageUrl: "/sophie.png", height: "5'6\"", bodyType: "Athletic", likes: ["Design", "Latte", "Travel"], dislikes: ["Late replies", "Cold pizza"], redFlags: ["No bio", "Arrogance"], preference: "Gentlemen with ambition and a good sense of humor.", status: 'online' },
  { name: "Elena", bio: "Architect who loves sustainable living.", followers: 1205, projects: 89, imageUrl: "/sophie_portrait_2_1778268215566.png", height: "5'8\"", bodyType: "Slim", likes: ["Yoga", "Vegan food", "Jazz"], dislikes: ["Traffic", "Loud chewing"], redFlags: ["Rudeness", "Smoking"], preference: "Intellectuals who care about the planet.", status: 'busy' },
  { name: "Marcus", bio: "Tech entrepreneur and amateur chef.", followers: 842, projects: 15, imageUrl: "/sophie_portrait_3_1778268320261.png", height: "6'1\"", bodyType: "Broad", likes: ["Cooking", "AI", "Sailing"], dislikes: ["Closed-mindedness", "Winter"], redFlags: ["Unreliability", "Laziness"], preference: "Creative spirits who love to experiment.", status: 'online' },
  { name: "Julian", bio: "Film director & vintage car enthusiast.", followers: 450, projects: 22, imageUrl: "/sophie_portrait_4_1778268332917.png", height: "5'11\"", bodyType: "Athletic", likes: ["Cinema", "Road trips", "Jazz"], dislikes: ["Fast food", "Tardiness"], redFlags: ["No passion", "Dishonesty"], preference: "Artistic minds with a classic touch.", status: 'busy' },
  { name: "Aria", bio: "Musician and poet finding beauty in chaos.", followers: 5020, projects: 104, imageUrl: "/sophie.png", height: "5'4\"", bodyType: "Petite", likes: ["Poetry", "Indie Music", "Rain"], dislikes: ["Small talk", "Early mornings"], redFlags: ["Closed off", "Judgmental"], preference: "Someone who listens and feels deeply.", status: 'online' },
  { name: "Leo", bio: "Fitness coach & outdoor adventurer.", followers: 930, projects: 5, imageUrl: "/sophie_portrait_2_1778268215566.png", height: "6'2\"", bodyType: "Muscular", likes: ["Hiking", "Meal prep", "Dogs"], dislikes: ["Excuses", "Negativity"], redFlags: ["Couch potato", "Smoking"], preference: "An active partner ready for any trail.", status: 'online' },
  { name: "Maya", bio: "Data scientist who knits on the weekend.", followers: 112, projects: 8, imageUrl: "/sophie_portrait_3_1778268320261.png", height: "5'7\"", bodyType: "Average", likes: ["Python", "Knitting", "Tea"], dislikes: ["Bugs", "Loud clubs"], redFlags: ["Arrogance", "Interrupting"], preference: "A thoughtful geek with a soft side.", status: 'busy' },
  { name: "David", bio: "Journalist chasing the next big story.", followers: 2340, projects: 65, imageUrl: "/sophie_portrait_4_1778268332917.png", height: "5'10\"", bodyType: "Slim", likes: ["Writing", "Coffee", "Politics"], dislikes: ["Fake news", "Decaf"], redFlags: ["Apathy", "Ignorance"], preference: "Curious individuals who love debate.", status: 'online' },
  { name: "Chloe", bio: "Fashion stylist always on the move.", followers: 8800, projects: 120, imageUrl: "/sophie.png", height: "5'9\"", bodyType: "Slender", likes: ["Fashion", "Paris", "Wine"], dislikes: ["Tacky shoes", "Bad lighting"], redFlags: ["Cheap tippers", "Rude to staff"], preference: "Someone with impeccable taste and manners.", status: 'busy' },
  { name: "Sam", bio: "Chef experimenting with fusion cuisine.", followers: 430, projects: 18, imageUrl: "/sophie_portrait_2_1778268215566.png", height: "5'8\"", bodyType: "Stocky", likes: ["Spices", "Knives", "Farmers Markets"], dislikes: ["Microwave meals", "Chain restaurants"], redFlags: ["Picky eaters", "Allergies (kidding)"], preference: "A foodie willing to try anything once.", status: 'online' },
  { name: "Nina", bio: "Botanist surrounding herself with plants.", followers: 670, projects: 33, imageUrl: "/sophie_portrait_3_1778268320261.png", height: "5'5\"", bodyType: "Curvy", likes: ["Ferns", "Sunlight", "Reading"], dislikes: ["Plastic plants", "Winter"], redFlags: ["Killing succulents", "Impatience"], preference: "A grounded soul who appreciates nature.", status: 'online' },
  { name: "Ethan", bio: "Software engineer by day, gamer by night.", followers: 89, projects: 4, imageUrl: "/sophie_portrait_4_1778268332917.png", height: "6'0\"", bodyType: "Average", likes: ["Gaming", "Sci-Fi", "Pizza"], dislikes: ["Lag", "Spoilers"], redFlags: ["Toxic behavior", "Console wars"], preference: "A Player 2 for co-op campaigns.", status: 'busy' },
  { name: "Zara", bio: "Yoga instructor seeking mindfulness.", followers: 3200, projects: 40, imageUrl: "/sophie.png", height: "5'6\"", bodyType: "Athletic", likes: ["Meditation", "Incense", "Vegan Baking"], dislikes: ["Stress", "Traffic"], redFlags: ["Anger issues", "Selfishness"], preference: "A peaceful spirit with good energy.", status: 'online' },
  { name: "Lucas", bio: "Mechanic who loves classic American muscle.", followers: 150, projects: 12, imageUrl: "/sophie_portrait_2_1778268215566.png", height: "6'3\"", bodyType: "Broad", likes: ["Cars", "Rock Music", "BBQ"], dislikes: ["EVs", "Rust"], redFlags: ["Can't change a tire", "Pretentious"], preference: "Someone who isn't afraid to get their hands dirty.", status: 'online' },
  { name: "Emma", bio: "Veterinarian dedicated to all creatures.", followers: 980, projects: 55, imageUrl: "/sophie_portrait_3_1778268320261.png", height: "5'4\"", bodyType: "Slim", likes: ["Animals", "Hiking", "Books"], dislikes: ["Animal cruelty", "Littering"], redFlags: ["Allergic to dogs", "Hates cats"], preference: "A compassionate partner with a big heart.", status: 'busy' }
];

function App() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [currentView, setCurrentView] = useState<'activity' | 'discovery' | 'profile'>('discovery');
  const [activeActivityTab, setActiveActivityTab] = useState<'moments' | 'chat'>('moments');
  const [activeDiscoveryTab, setActiveDiscoveryTab] = useState<'updates' | 'moments'>('updates');
  const [notifications, setNotifications] = useState<{id: number, message: string}[]>([]);
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [currentUser, setCurrentUser] = useState<ProfileData>(profiles[0]);
  const [isPhotoSheetOpen, setIsPhotoSheetOpen] = useState(false);
  const [scrollX, setScrollX] = useState(0);
  const [feedUpdates, setFeedUpdates] = useState<FeedUpdate[]>([
    { id: '1', type: 'request', title: 'Elena sent a request', description: 'Wants to connect with you', userImage: '/sophie_portrait_2_1778268215566.png' },
    { id: '2', type: 'view', title: 'New Profile View', description: 'Sophie checked your moments 5m ago', userImage: '/sophie.png', isRead: false },
    { id: '3', type: 'like', title: 'Marcus liked your bio', description: '"Architecture who loves sustainable..."', userImage: '/sophie_portrait_3_1778268320261.png' },
    { id: '4', type: 'request', title: 'Julian sent a request', description: 'Vintage car enthusiast', userImage: '/sophie_portrait_4_1778268332917.png' },
    { id: '5', type: 'comment', title: 'Aria commented on your post', description: '"This is so beautiful!"', userImage: '/sophie.png', isRead: false },
    { id: '6', type: 'system', title: 'System Update', description: 'Your weekly stats are ready to view' },
    { id: '7', type: 'follow', title: 'Leo is now following you', description: 'Fitness coach & adventurer', userImage: '/sophie_portrait_2_1778268215566.png' },
    { id: '8', type: 'message', title: 'Maya sent a message', description: '"Hey! Are you available this weekend?"', userImage: '/sophie_portrait_3_1778268320261.png', isRead: false },
    { id: '9', type: 'view', title: 'David viewed your profile', description: 'Journalist chasing the next story', userImage: '/sophie_portrait_4_1778268332917.png' },
    { id: '10', type: 'comment', title: 'Chloe shared a new moment', description: 'Fashion stylist always on the move', userImage: '/sophie.png' },
    { id: '11', type: 'like', title: 'Sam liked your photo', description: '"Sunset at the beach"', userImage: '/sophie_portrait_2_1778268215566.png' },
    { id: '12', type: 'security', title: 'Security Alert', description: 'New login detected from Safari on Mac' },
  ]);

  const scrollRef = useRef<HTMLDivElement>(null);
  const touchStartRef = useRef<number | null>(null);
  const isDraggingRef = useRef(false);
  const dragStartXRef = useRef(0);
  const dragScrollLeftRef = useRef(0);

  useEffect(() => {
    const configureStatusBar = async () => {
      try {
        await StatusBar.setOverlaysWebView({ overlay: true });
        await StatusBar.hide();
      } catch (error) {
        // Silently ignore on web platform
        console.log('StatusBar configuration skipped (web environment)');
      }
    };
    configureStatusBar();
  }, []);

  const triggerNotification = (message: string) => {
    const id = Date.now();
    setNotifications(prev => [...prev, { id, message }]);
    setTimeout(() => {
      setNotifications(prev => prev.filter(n => n.id !== id));
    }, 3000);
  };

  const handleActionNotification = (id: string, action: 'accepted' | 'denied') => {
    const notification = feedUpdates.find(n => n.id === id);
    if (notification) {
      triggerNotification(`Request ${action}`);
      
      // Mark for removal to trigger animation
      setFeedUpdates(prev => prev.map(n => n.id === id ? { ...n, isRemoving: true } : n));
      
      // Wait for animation to finish before filtering out
      setTimeout(() => {
        setFeedUpdates(prev => prev.filter(n => n.id !== id));
      }, 500);
    }
  };

  const handleUpdateProfile = (field: keyof ProfileData, value: any) => {
    setCurrentUser(prev => ({ ...prev, [field]: value }));
  };

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const scrollLeft = e.currentTarget.scrollLeft;
    requestAnimationFrame(() => {
      setScrollX(scrollLeft);
      const newIndex = Math.round(scrollLeft / 176);
      if (newIndex !== activeIndex && newIndex >= 0 && newIndex < profiles.length) {
        setActiveIndex(newIndex);
      }
    });
  };

  // Manual drag-to-scroll handlers (works from any part of the card)
  const handleCarouselPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    const el = scrollRef.current;
    if (!el) return;

    // Interrupt any ongoing smooth scroll animation
    el.scrollTo({ left: el.scrollLeft, behavior: 'auto' });

    isDraggingRef.current = true;
    dragStartXRef.current = e.clientX;
    dragScrollLeftRef.current = el.scrollLeft;
    el.setPointerCapture(e.pointerId);
    el.style.scrollSnapType = 'none'; // disable snap during drag
    el.style.cursor = 'grabbing';
  };

  const handleCarouselPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDraggingRef.current || !scrollRef.current) return;
    e.preventDefault();
    const dx = e.clientX - dragStartXRef.current;
    const newScrollLeft = dragScrollLeftRef.current - dx;
    scrollRef.current.scrollLeft = newScrollLeft;
    
    requestAnimationFrame(() => {
      setScrollX(newScrollLeft);
      const newIndex = Math.round(newScrollLeft / 176);
      if (newIndex !== activeIndex && newIndex >= 0 && newIndex < profiles.length) {
        setActiveIndex(newIndex);
      }
    });
  };

  const handleCarouselPointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDraggingRef.current || !scrollRef.current) return;
    isDraggingRef.current = false;
    scrollRef.current.releasePointerCapture(e.pointerId);
    // Re-enable snap and snap to nearest card
    scrollRef.current.style.scrollSnapType = 'x mandatory';
    scrollRef.current.style.cursor = '';
    const nearest = Math.round(scrollRef.current.scrollLeft / 176) * 176;
    scrollRef.current.scrollTo({ left: nearest, behavior: 'smooth' });
  };

  const handlePointerDown = (e: React.PointerEvent) => {
    touchStartRef.current = e.clientY;
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    if (touchStartRef.current === null) return;
    const deltaY = touchStartRef.current - e.clientY;
    
    if (Math.abs(deltaY) > 50) {
      // Check if we should ignore this swipe because it's an internal scroll
      const target = e.target as HTMLElement;
      const scrollable = target.closest('.overflow-y-auto');
      if (scrollable) {
        const { scrollTop, scrollHeight, clientHeight } = scrollable;
        if (deltaY > 0 && scrollTop + clientHeight < scrollHeight - 5) {
          touchStartRef.current = null;
          return;
        }
        if (deltaY < 0 && scrollTop > 5) {
          touchStartRef.current = null;
          return;
        }
      }

      if (deltaY > 0) { // Swiping UP
        if (currentView === 'discovery') setCurrentView('activity');
        else if (currentView === 'profile') setCurrentView('discovery');
      } else if (deltaY < 0) { // Swiping DOWN
        if (currentView === 'discovery') setCurrentView('profile');
        else if (currentView === 'activity') setCurrentView('discovery');
      }
    }
    touchStartRef.current = null;
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartRef.current = e.touches[0].clientY;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartRef.current === null) return;
    const deltaY = touchStartRef.current - e.changedTouches[0].clientY;
    
    if (Math.abs(deltaY) > 50) {
      // Check if we should ignore this swipe because it's an internal scroll
      const target = e.target as HTMLElement;
      const scrollable = target.closest('.overflow-y-auto');
      if (scrollable) {
        const { scrollTop, scrollHeight, clientHeight } = scrollable;
        if (deltaY > 0 && scrollTop + clientHeight < scrollHeight - 5) {
          touchStartRef.current = null;
          return;
        }
        if (deltaY < 0 && scrollTop > 5) {
          touchStartRef.current = null;
          return;
        }
      }

      if (deltaY > 0) { // Swiping UP
        if (currentView === 'discovery') setCurrentView('activity');
        else if (currentView === 'profile') setCurrentView('discovery');
      } else if (deltaY < 0) { // Swiping DOWN
        if (currentView === 'discovery') setCurrentView('profile');
        else if (currentView === 'activity') setCurrentView('discovery');
      }
    }
    touchStartRef.current = null;
  };



  return (
    <div 
      className="flex flex-col h-[100dvh] w-screen bg-transparent relative overflow-hidden"
      onPointerDown={handlePointerDown}
      onPointerUp={handlePointerUp}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* Background with explicit Z-index */}
      <div className="absolute inset-0 z-0">
        <MilkyBackground />
      </div>

      {/* Main Perspective Page Container */}
      <div 
        className={cn(
          "relative flex-1 w-full transition-transform duration-700 ease-[cubic-bezier(0.23,1,0.32,1)] z-10",
          currentView === 'activity' ? "-translate-y-full" : 
          currentView === 'profile' ? "translate-y-full" : "translate-y-0"
        )}
        style={{ background: 'transparent' }}
      >
        {/* PAGE 0: My Profile (Now Swiped Down to see) */}
        <div className={cn(
          "absolute bottom-full inset-x-0 h-full flex flex-col overflow-hidden bg-transparent transition-all duration-700",
          currentView === 'profile' ? "opacity-100 visible z-20" : "opacity-0 invisible z-0"
        )}>
          {/* Header Area - Notifications passed down */}
          <div className="flex-none z-50 pt-[env(safe-area-inset-top)] mt-2 px-2 w-full max-w-[460px] mx-auto">
            <Header 
              profile={currentUser} 
              isEditable={true}
              isEditing={isEditingProfile}
              onToggleEdit={() => {
                if (isEditingProfile) triggerNotification("Saved");
                setIsEditingProfile(!isEditingProfile);
              }}
              onUpdateField={handleUpdateProfile}
              notifications={notifications}
              dense={true}
            />
          </div>

          {/* Tabs Area */}
          <div className="flex-none px-6 mt-2 pointer-events-auto">
            <div className="relative flex bg-[#392B28]/[0.05] p-1 rounded-2xl w-full max-w-[320px] mx-auto overflow-hidden">
              {/* Sliding Background */}
              <div 
                className={cn(
                  "absolute inset-y-1 w-[calc(50%-4px)] bg-[#FDFDFD] rounded-xl shadow-sm transition-transform duration-300 ease-out",
                  activeDiscoveryTab === 'moments' ? "translate-x-full" : "translate-x-0"
                )}
              />
              
              <button 
                onClick={() => setActiveDiscoveryTab('updates')}
                className={cn(
                  "relative flex-1 py-2 flex items-center justify-center gap-1.5 text-[10px] font-black uppercase tracking-[2px] transition-colors duration-300",
                  activeDiscoveryTab === 'updates' ? "text-[#392B28]" : "text-[#392B28]/30"
                )}
              >
                <Bell className="w-3 h-3" strokeWidth={3} />
                Updates
              </button>
              <button 
                onClick={() => setActiveDiscoveryTab('moments')}
                className={cn(
                  "relative flex-1 py-2 flex items-center justify-center gap-1.5 text-[10px] font-black uppercase tracking-[2px] transition-colors duration-300",
                  activeDiscoveryTab === 'moments' ? "text-[#392B28]" : "text-[#392B28]/30"
                )}
              >
                <Camera className="w-3 h-3" strokeWidth={3} />
                Moments
              </button>
            </div>
          </div>

          {/* Tab Content Area */}
          <div className="flex-1 flex flex-col overflow-y-auto hide-scrollbar pointer-events-auto mt-2">
            {activeDiscoveryTab === 'updates' ? (
              <div className="px-4 pb-32 flex flex-col gap-2">
                {feedUpdates.map((update) => (
                  <Item 
                    key={update.id} 
                    className={cn(
                      "transition-all duration-300 ease-in-out",
                      update.type === 'request' && "bg-[#FDFDFD]/60 border-[#392B28]/10 shadow-sm",
                      update.isRemoving && "opacity-0 scale-95 pointer-events-none"
                    )}
                    style={update.isRemoving ? { 
                      maxHeight: '0px', 
                      paddingTop: '0px', 
                      paddingBottom: '0px', 
                      marginTop: '0px', 
                      marginBottom: '-8px', // Adjust based on gap
                      overflow: 'hidden',
                      borderWidth: '0px'
                    } : {}}
                  >
                    <ItemMedia variant={update.userImage ? "image" : "image"} className={!update.userImage ? "bg-[#392B28]/[0.05]" : ""}>
                      {update.userImage ? (
                        <img src={update.userImage} alt={update.title} className="w-full h-full object-cover" />
                      ) : (
                        <Bell className="w-5 h-5 text-[#392B28]/40" />
                      )}
                    </ItemMedia>
                    <ItemContent>
                      <ItemTitle>{update.title}</ItemTitle>
                      <ItemDescription>{update.description}</ItemDescription>
                    </ItemContent>
                    
                    {update.type === 'request' && (
                      <div className="flex items-center gap-2 px-1">
                        <button 
                          onClick={(e) => { e.stopPropagation(); handleActionNotification(update.id, 'accepted'); }}
                          className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center text-white shadow-sm active:scale-90 transition-transform"
                        >
                          <Check className="w-4 h-4" strokeWidth={3} />
                        </button>
                        <button 
                          onClick={(e) => { e.stopPropagation(); handleActionNotification(update.id, 'denied'); }}
                          className="w-8 h-8 rounded-full bg-[#392B28]/5 flex items-center justify-center text-[#392B28]/40 border border-[#392B28]/5 active:scale-90 transition-transform"
                        >
                          <X className="w-4 h-4" strokeWidth={3} />
                        </button>
                      </div>
                    )}

                    {update.isRead === false && (
                      <div className="w-1.5 h-1.5 rounded-full bg-blue-500 mr-2" />
                    )}
                  </Item>
                ))}

                {/* End of List Indicator */}
                <div className="flex items-center justify-center py-4">
                  <div className="w-2 h-2 rounded-full bg-[#392B28]/10 shadow-[inset_0_1px_1px_rgba(0,0,0,0.1)]" />
                </div>
              </div>
            ) : (
              <div className="p-6 flex flex-col items-center justify-center text-[#392B28]/60 py-12 text-center">
                <div className="w-12 h-12 rounded-full bg-[#392B28]/[0.05] flex items-center justify-center mb-4">
                  <Camera className="w-6 h-6 text-[#392B28]/20" />
                </div>
                <div className="text-[12px] uppercase tracking-[4px] font-bold mb-2 opacity-40">Your Moments</div>
                <p className="text-[11px] leading-relaxed max-w-[200px]">
                  Post your first moment using the upload button below.
                </p>
              </div>
            )}
          </div>
        </div>

        {/* PAGE 1: Discovery Feed */}
        <div className={cn(
          "absolute inset-0 flex flex-col overflow-hidden bg-transparent transition-all duration-700 pb-32",
          currentView === 'discovery' ? "opacity-100 visible z-20" : "opacity-0 invisible z-0"
        )}>
          {/* Header Area - Notifications passed down */}
          <div className="flex-none z-50 pt-[env(safe-area-inset-top)] mt-2 px-2 w-full max-w-[460px] mx-auto pointer-events-none">
            <Header profile={profiles[activeIndex]} notifications={notifications} />
          </div>

          {/* Card Area */}
          <div className="flex-1 w-full flex items-center justify-center overflow-hidden" style={{ background: 'transparent' }}>
            <div 
              ref={scrollRef}
              onScroll={handleScroll}
              onPointerDown={handleCarouselPointerDown}
              onPointerMove={handleCarouselPointerMove}
              onPointerUp={handleCarouselPointerUp}
              onPointerCancel={handleCarouselPointerUp}
              className="w-full overflow-x-scroll flex items-center gap-4 hide-scrollbar snap-x snap-mandatory py-4 pointer-events-auto touch-pan-x"
              style={{ paddingLeft: 'calc(50% - 80px)', paddingRight: 'calc(50% - 80px)', background: 'transparent', cursor: 'grab', touchAction: 'pan-x' }}
            >
              {profiles.map((profile, i) => {
                const cardCenter = i * 176;
                const distance = Math.abs(scrollX - cardCenter);
                const progress = Math.min(distance / 176, 1);
                
                const scale = 1 - (progress * 0.15); // Scales down to 0.85
                const opacity = 1 - (progress * 0.6); // Fades down to 0.4

                return (
                  <div 
                    key={i} 
                    className="flex-shrink-0 snap-center origin-center transition-none"
                    style={{
                      transform: `scale(${scale}) translateZ(0)`,
                      opacity: opacity,
                      background: 'transparent',
                      willChange: 'transform, opacity'
                    }}
                  >
                    <ProfileCard 
                      profile={profile} 
                      onFollow={() => triggerNotification("Added")}
                    />
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* PAGE 2: Activity Feed (Now Swiped Up to see) */}
        <div className={cn(
          "absolute top-full inset-x-0 h-full flex flex-col overflow-hidden bg-transparent transition-all duration-700",
          currentView === 'activity' ? "opacity-100 visible z-20" : "opacity-0 invisible z-0"
        )}>
          {/* Header Area */}
          <div className="flex-none z-50 pt-[env(safe-area-inset-top)] mt-2 px-2 w-full max-w-[460px] mx-auto pointer-events-none">
            <Header 
              profile={profiles[activeIndex]} 
              notifications={notifications}
              dense={true}
            />
          </div>
          
          {/* Tabs Area */}
          <div className="flex-none px-6 mt-4 pointer-events-auto">
            <div className="relative flex bg-[#392B28]/[0.05] p-1 rounded-2xl w-full max-w-[320px] mx-auto overflow-hidden">
              {/* Sliding Background */}
              <div 
                className={cn(
                  "absolute inset-y-1 w-[calc(50%-4px)] bg-[#FDFDFD] rounded-xl shadow-sm transition-transform duration-300 ease-out",
                  activeActivityTab === 'chat' ? "translate-x-full" : "translate-x-0"
                )}
              />
              
              <button 
                onClick={() => setActiveActivityTab('moments')}
                className={cn(
                  "relative flex-1 py-2 flex items-center justify-center gap-1.5 text-[10px] font-black uppercase tracking-[2px] transition-colors duration-300",
                  activeActivityTab === 'moments' ? "text-[#392B28]" : "text-[#392B28]/30"
                )}
              >
                <Camera className="w-3 h-3" strokeWidth={3} />
                Moments
              </button>
              <button 
                onClick={() => setActiveActivityTab('chat')}
                className={cn(
                  "relative flex-1 py-2 flex items-center justify-center gap-1.5 text-[10px] font-black uppercase tracking-[2px] transition-colors duration-300",
                  activeActivityTab === 'chat' ? "text-[#392B28]" : "text-[#392B28]/30"
                )}
              >
                <MessageCircle className="w-3 h-3" strokeWidth={3} />
                Chat
              </button>
            </div>
          </div>
          
          <div className="flex-1 flex flex-col overflow-y-auto hide-scrollbar pointer-events-auto pt-4">
            {activeActivityTab === 'moments' ? (
              <div className="p-6 flex flex-col gap-4">
                <div className="flex flex-col items-center justify-center text-[#392B28]/60 py-12 text-center">
                  <div className="w-12 h-12 rounded-full bg-[#392B28]/[0.05] flex items-center justify-center mb-4">
                    <Camera className="w-6 h-6 text-[#392B28]/20" />
                  </div>
                  <div className="text-[12px] uppercase tracking-[4px] font-bold mb-2 opacity-40">{profiles[activeIndex].name}'s Moments</div>
                  <p className="text-[11px] leading-relaxed max-w-[200px]">
                    {profiles[activeIndex].name} hasn't shared any moments today. Check back later!
                  </p>
                </div>
              </div>
            ) : (
              <ChatBox recipientName={profiles[activeIndex].name} />
            )}
          </div>
        </div>
      </div>

      {/* Fixed Toast Overlay - above everything, respects status bar */}
      <div
        className="fixed inset-x-0 top-0 z-[999] flex flex-col items-center gap-2 pointer-events-none"
        style={{ paddingTop: 'calc(env(safe-area-inset-top) + 8px)' }}
      >
        {notifications.map((n) => (
          <ToastNotification key={n.id} id={n.id} message={n.message} />
        ))}
      </div>

      {/* Bottom Nav Area */}
      <div className={cn(
        "fixed bottom-0 inset-x-0 z-[100] transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)]",
        currentView === 'activity' ? "translate-y-full opacity-0 pointer-events-none" : "translate-y-0 opacity-100"
      )}>
        <BottomNav0 
          fabOnly={currentView === 'profile'} 
          onFabClick={() => {
            if (currentView === 'profile') setIsPhotoSheetOpen(true);
            else triggerNotification("Call Action Triggered");
          }}
        />
      </div>

      {/* Photo Upload Sheet */}
      <Sheet
        isOpen={isPhotoSheetOpen}
        onClose={() => setIsPhotoSheetOpen(false)}
        title="Update Profile Photos"
        description="Personalize your identity across the app"
      >
        <div className="flex flex-col gap-2 mt-4">
          <PhotoUploadZone 
            label="Discovery Avatar"
            description="Shown on your main discovery card"
            icon={<User className="w-6 h-6 text-[#392B28]/40" />}
            previewUrl={currentUser.imageUrl}
            onUpload={() => triggerNotification("Avatar Upload Simulation")}
          />
          
          <PhotoUploadZone 
            label="Header Background"
            description="Visible on your profile and activity pages"
            icon={<ImageIcon className="w-6 h-6 text-[#392B28]/40" />}
            previewUrl="/sophie.png" 
            onUpload={() => triggerNotification("Header Upload Simulation")}
          />

          <button 
            onClick={() => {
              setIsPhotoSheetOpen(false);
              triggerNotification("Profile Photos Updated");
            }}
            className="w-full py-4 mt-4 bg-[#392B28] text-white rounded-[1.5rem] font-black uppercase tracking-[3px] text-[12px] shadow-lg active:scale-[0.98] transition-all"
          >
            Save Changes
          </button>
        </div>
      </Sheet>
    </div>
  )
}

export default App
