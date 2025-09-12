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
    const activeIndex = allTabs.findIndex(tab => tab.path === location);
    if (activeIndex !== -1 && tabsRef.current[activeIndex] && containerRef.current) {
      const activeTab = tabsRef.current[activeIndex];
      const container = containerRef.current;
      const tabRect = activeTab.getBoundingClientRect();
      const containerRect = container.getBoundingClientRect();
      
      setIndicatorStyle({
        left: tabRect.left - containerRect.left + 4, // 4px padding adjustment
        width: tabRect.width - 8, // 8px total padding
      });
    }
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
            className="flex items-center justify-center w-12 h-12 rounded-full transition-colors duration-200 ease-out"
          >
            <Icon 
              size={22} 
              className={cn(
                "transition-colors duration-200 ease-out",
                "text-zinc-400 hover:text-white"
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
        className="flex items-center justify-center w-12 h-12 rounded-full transition-colors duration-200 ease-out relative"
      >
        <div ref={(el) => (tabsRef.current[index] = el)}>
          <Icon 
            size={22} 
            className={cn(
              "transition-colors duration-200 ease-out",
              isActive ? "text-white" : "text-zinc-400 hover:text-white"
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
            className="absolute top-1 bottom-1 rounded-full bg-white/8 transition-[left,width] duration-200 ease-out pointer-events-none"
            style={{
              left: indicatorStyle.left,
              width: indicatorStyle.width,
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