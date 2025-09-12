import { Home, Calendar, ClipboardList, FileText, Menu } from "lucide-react";
import { Link, useLocation } from "wouter";
import { cn } from "@/lib/utils";
import { useState, useEffect, useRef } from "react";
import MoreDrawer from "./MoreDrawer";

export default function BottomNavigation() {
  const [location] = useLocation();
  const [isMoreDrawerOpen, setIsMoreDrawerOpen] = useState(false);
  const [activeTabIndex, setActiveTabIndex] = useState(2); // Default to home
  const tabsRef = useRef<(HTMLElement | null)[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  
  const allTabs = [
    { id: "events", path: "/events", icon: Calendar, label: "Events" },
    { id: "surveys", path: "/surveys", icon: ClipboardList, label: "Survey" },
    { id: "home", path: "/", icon: Home, label: "Home", isCenter: true },
    { id: "notes", path: "/notes", icon: FileText, label: "Notes" },
    { id: "more", path: "", icon: Menu, label: "More", isDrawer: true },
  ];

  // Track active tab changes
  useEffect(() => {
    const activeIndex = allTabs.findIndex(tab => tab.path === location);
    if (activeIndex !== -1) {
      setActiveTabIndex(activeIndex);
    }
  }, [location]);

  const renderTab = (tab: typeof allTabs[0], index: number) => {
    const Icon = tab.icon;
    const isActive = location === tab.path;
    const isCenterHome = tab.isCenter;
    
    // Handle drawer tab
    if (tab.isDrawer) {
      return (
        <MoreDrawer 
          key={tab.id}
          isOpen={isMoreDrawerOpen} 
          onOpenChange={setIsMoreDrawerOpen}
        >
          <button
            ref={(el) => (tabsRef.current[index] = el)}
            data-testid={`tab-${tab.id}`}
            aria-label="Open more features"
            className="flex flex-col items-center justify-center p-3 transition-all duration-500 ease-out group relative transform-gpu"
          >
            <div className="flex items-center justify-center w-12 h-12 rounded-full transition-all duration-500 ease-out group-hover:bg-muted/20 group-hover:scale-105 group-active:scale-95">
              <Icon 
                size={20} 
                className="text-muted-foreground transition-all duration-500 ease-out group-hover:scale-110 group-hover:text-foreground group-active:scale-90" 
              />
            </div>
          </button>
        </MoreDrawer>
      );
    }
    
    // Center home button with special styling
    if (isCenterHome) {
      return (
        <Link
          key={tab.id}
          href={tab.path}
          data-testid={`tab-${tab.id}`}
          aria-current={isActive ? "page" : undefined}
          className="flex flex-col items-center justify-center p-2 transition-all duration-500 ease-out group relative transform-gpu"
        >
          {/* Glowing background circle for center button */}
          <div className={cn(
            "absolute inset-0 rounded-full transition-all duration-700 ease-out",
            isActive 
              ? "bg-gradient-to-br from-primary via-primary to-primary/80 shadow-2xl shadow-primary/40 scale-100" 
              : "bg-gradient-to-br from-primary/60 to-primary/40 shadow-lg shadow-primary/20 group-hover:shadow-xl group-hover:shadow-primary/30 group-hover:scale-105 scale-95"
          )}>
            {/* Extra glow effect */}
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-white/20 to-transparent opacity-40 transition-opacity duration-500"></div>
            {/* Pulse effect when active */}
            {isActive && (
              <div className="absolute inset-0 rounded-full bg-primary/30 animate-ping opacity-20"></div>
            )}
          </div>
          
          <div 
            ref={(el) => (tabsRef.current[index] = el)}
            className="relative flex items-center justify-center w-14 h-14 rounded-full"
          >
            <Icon 
              size={24} 
              className={cn(
                "text-white drop-shadow-md transition-all duration-500 ease-out transform-gpu",
                isActive ? "scale-100" : "group-hover:scale-110 group-active:scale-90"
              )}
            />
          </div>
        </Link>
      );
    }
    
    // Regular tab
    return (
      <Link
        key={tab.id}
        href={tab.path}
        data-testid={`tab-${tab.id}`}
        aria-current={isActive ? "page" : undefined}
        className="flex flex-col items-center justify-center p-3 transition-all duration-500 ease-out group relative transform-gpu"
      >
        <div 
          ref={(el) => (tabsRef.current[index] = el)}
          className={cn(
            "flex items-center justify-center w-12 h-12 rounded-full transition-all duration-500 ease-out relative overflow-hidden",
            isActive 
              ? "bg-primary/15 text-primary shadow-lg shadow-primary/20 scale-110" 
              : "text-muted-foreground group-hover:bg-muted/20 group-hover:text-foreground group-hover:scale-105 group-active:scale-95"
          )}
        >
          {/* Active state shimmer effect */}
          {isActive && (
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out"></div>
          )}
          <Icon 
            size={20} 
            className={cn(
              "transition-all duration-500 ease-out transform-gpu relative z-10",
              isActive ? "scale-100" : "group-hover:scale-110 group-active:scale-90"
            )}
          />
        </div>
      </Link>
    );
  };

  return (
    <nav role="navigation" aria-label="Primary navigation" className="fixed bottom-0 left-0 right-0 safe-area-inset-bottom">
      <div className="flex justify-center pb-6 px-4">
        {/* Pill-shaped container */}
        <div className="relative">
          {/* Background pill with glassmorphism */}
          <div className="absolute inset-0 bg-white/90 dark:bg-black/40 backdrop-blur-xl rounded-full shadow-2xl shadow-black/10 dark:shadow-white/5 border border-white/20 dark:border-white/10"></div>
          
          {/* Sliding indicator */}
          <div 
            className="absolute top-2 bottom-2 transition-all duration-700 ease-[cubic-bezier(0.4,0,0.2,1)] pointer-events-none z-0"
            style={{
              left: `${(activeTabIndex * 20) + 12}%`,
              width: activeTabIndex === 2 ? '20%' : '16%', // Wider for center home button
              transform: 'translateX(-50%)',
            }}
          >
            <div className="w-full h-full rounded-full bg-gradient-to-r from-primary/5 via-primary/10 to-primary/5 border border-primary/20 shadow-inner"></div>
          </div>

          {/* Tab container */}
          <div ref={containerRef} className="relative flex items-center px-3 py-2 gap-1 z-10">
            {allTabs.map((tab, index) => renderTab(tab, index))}
          </div>
        </div>
      </div>
    </nav>
  );
}