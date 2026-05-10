import { useEffect, useRef, useState } from 'react'
import { cn } from '@/lib/utils';

import MilkyBackground from './components/common/MilkyBackground'
import { StatusBar } from '@capacitor/status-bar'
import Header from './components/Header';
import BottomNav0 from './components/BottomNav0';
import ProfileCard from './components/ProfileCard';
import ToastNotification from './components/ToastNotification';

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
  const [currentView, setCurrentView] = useState<'discovery' | 'profile'>('discovery');
  const [notifications, setNotifications] = useState<{id: number, message: string}[]>([]);
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [currentUser, setCurrentUser] = useState<ProfileData>(profiles[0]);
  const [scrollX, setScrollX] = useState(0);

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

  const handleUpdateProfile = (field: keyof ProfileData, value: string | string[]) => {
    setCurrentUser(prev => ({ ...prev, [field]: value }));
  };

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const scrollLeft = e.currentTarget.scrollLeft;
    setScrollX(scrollLeft);
    
    // Each card is 160px wide + 16px gap = 176px interval
    const newIndex = Math.round(scrollLeft / 176);
    if (newIndex !== activeIndex && newIndex >= 0 && newIndex < profiles.length) {
      setActiveIndex(newIndex);
    }
  };

  // Manual drag-to-scroll handlers (works from any part of the card)
  const handleCarouselPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    const el = scrollRef.current;
    if (!el) return;
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
    scrollRef.current.scrollLeft = dragScrollLeftRef.current - dx;
    // Update scroll tracking
    const scrollLeft = scrollRef.current.scrollLeft;
    setScrollX(scrollLeft);
    const newIndex = Math.round(scrollLeft / 176);
    if (newIndex !== activeIndex && newIndex >= 0 && newIndex < profiles.length) {
      setActiveIndex(newIndex);
    }
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
      if (deltaY > 0 && currentView === 'discovery') {
        setCurrentView('profile');
      } else if (deltaY < 0 && currentView === 'profile') {
        setCurrentView('discovery');
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
      if (deltaY > 0 && currentView === 'discovery') {
        setCurrentView('profile');
      } else if (deltaY < 0 && currentView === 'profile') {
        setCurrentView('discovery');
      }
    }
    touchStartRef.current = null;
  };

  const sidePadding = typeof window !== 'undefined' ? (window.innerWidth - 160) / 2 : 100;

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
          currentView === 'profile' ? "-translate-y-full" : "translate-y-0"
        )}
        style={{ background: 'transparent' }}
      >
        {/* PAGE 1: Discovery Feed */}
        <div className={cn(
          "absolute inset-0 flex flex-col overflow-hidden bg-transparent transition-all duration-700",
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
              style={{ paddingLeft: `${sidePadding}px`, paddingRight: `${sidePadding}px`, background: 'transparent', cursor: 'grab', touchAction: 'pan-x' }}
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
                      transform: `scale(${scale})`,
                      opacity: opacity,
                      background: 'transparent'
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

        {/* PAGE 2: My Profile */}
        <div className={cn(
          "absolute top-full inset-x-0 h-full flex flex-col overflow-hidden bg-transparent transition-all duration-700",
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
            />
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
      <div className="flex-none z-[100]">
        <BottomNav0 />
      </div>
    </div>
  )
}

export default App
