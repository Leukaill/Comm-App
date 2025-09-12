import { Home, Calendar, ClipboardList, FileText, Menu } from "lucide-react";
import { Link, useLocation } from "wouter";
import { cn } from "@/lib/utils";
import { useState, useEffect, useRef } from "react";
import MoreDrawer from "./MoreDrawer";

export default function BottomNavigation() {
  const [location] = useLocation();
  const [isMoreDrawerOpen, setIsMoreDrawerOpen] = useState(false);
  const [indicatorStyle, setIndicatorStyle] = useState({ left: 0, width: 0 });
  const tabsRef = useRef<(HTMLElement | null)[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  
  const allTabs = [
    { id: "events", path: "/events", icon: Calendar, label: "Events" },
    { id: "surveys", path: "/surveys", icon: ClipboardList, label: "Survey" },
    { id: "home", path: "/", icon: Home, label: "Home" },
    { id: "notes", path: "/notes", icon: FileText, label: "Notes" },
    { id: "more", path: "", icon: Menu, label: "More", isDrawer: true },
  ];

  // Update indicator position when route changes
  useEffect(() => {
    const updateIndicator = () => {
      const activeIndex = allTabs.findIndex(tab => tab.path === location);
      if (activeIndex !== -1 && tabsRef.current[activeIndex] && containerRef.current) {
        const activeTab = tabsRef.current[activeIndex];
        const container = containerRef.current;
        const tabRect = activeTab.getBoundingClientRect();
        const containerRect = container.getBoundingClientRect();
        
        setIndicatorStyle({
          left: tabRect.left - containerRect.left + 4,
          width: tabRect.width - 8,
        });
      }
    };

    // Add small delay to ensure DOM is ready
    const timeoutId = setTimeout(updateIndicator, 50);
    return () => clearTimeout(timeoutId);
  }, [location]);

  // Handle resize
  useEffect(() => {
    const handleResize = () => {
      const activeIndex = allTabs.findIndex(tab => tab.path === location);
      if (activeIndex !== -1 && tabsRef.current[activeIndex] && containerRef.current) {
        const activeTab = tabsRef.current[activeIndex];
        const container = containerRef.current;
        const tabRect = activeTab.getBoundingClientRect();
        const containerRect = container.getBoundingClientRect();
        
        setIndicatorStyle({
          left: tabRect.left - containerRect.left + 4,
          width: tabRect.width - 8,
        });
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [location]);

  const renderTab = (tab: typeof allTabs[0], index: number) => {
    const Icon = tab.icon;
    const isActive = location === tab.path;
    
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
            className="flex items-center justify-center w-12 h-12 rounded-full transition-all duration-200 ease-out group active:scale-90"
          >
            <Icon 
              size={22} 
              className={cn(
                "transition-all duration-200 ease-out",
                "text-zinc-400 hover:text-white hover:scale-110 group-active:scale-90"
              )}
            />
          </button>
        </MoreDrawer>
      );
    }
    
    // Regular tab (uniform styling for all tabs including home)
    return (
      <Link
        key={tab.id}
        href={tab.path}
        data-testid={`tab-${tab.id}`}
        aria-current={isActive ? "page" : undefined}
        className="flex items-center justify-center w-12 h-12 rounded-full transition-all duration-200 ease-out relative group active:scale-90"
      >
        <div ref={(el) => (tabsRef.current[index] = el)}>
          <Icon 
            size={22} 
            className={cn(
              "transition-all duration-200 ease-out",
              isActive 
                ? "text-white scale-110 drop-shadow-lg" 
                : "text-zinc-400 hover:text-white hover:scale-110 group-active:scale-90"
            )}
          />
        </div>
      </Link>
    );
  };

  return (
    <nav role="navigation" aria-label="Primary navigation" className="fixed bottom-0 inset-x-0 pb-[calc(env(safe-area-inset-bottom)+12px)] flex justify-center">
      <div className="relative">
        {/* Background pill */}
        <div className="bg-zinc-900/85 backdrop-blur-xl border border-white/10 rounded-full px-2 py-2 shadow-lg">
          {/* Sliding indicator */}
          <div 
            className="absolute top-1 bottom-1 rounded-full bg-white/12 transition-all duration-300 ease-out pointer-events-none shadow-lg"
            style={{
              left: indicatorStyle.left,
              width: indicatorStyle.width,
              transform: indicatorStyle.width > 0 ? 'scale(1)' : 'scale(0.8)',
              opacity: indicatorStyle.width > 0 ? 1 : 0,
            }}
          />

          {/* Tab container */}
          <div ref={containerRef} className="relative flex items-center gap-1 z-10">
            {allTabs.map((tab, index) => renderTab(tab, index))}
          </div>
        </div>
      </div>
    </nav>
  );
}