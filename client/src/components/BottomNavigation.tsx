import { Home, Calendar, Users, User, Menu } from "lucide-react";
import { Link, useLocation } from "wouter";
import { cn } from "@/lib/utils";
import { useState } from "react";
import MoreDrawer from "./MoreDrawer";

export default function BottomNavigation() {
  const [location] = useLocation();
  const [isMoreDrawerOpen, setIsMoreDrawerOpen] = useState(false);
  
  const allTabs = [
    { id: "events", path: "/events", icon: Calendar, label: "Events" },
    { id: "network", path: "/network", icon: Users, label: "Network" },
    { id: "home", path: "/", icon: Home, label: "Home", isCenter: true },
    { id: "profile", path: "/profile", icon: User, label: "Profile" },
    { id: "more", path: "", icon: Menu, label: "More", isDrawer: true },
  ];

  const renderTab = (tab: typeof allTabs[0]) => {
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
            data-testid={`tab-${tab.id}`}
            aria-label="Open more features"
            className="flex flex-col items-center justify-center p-3 transition-all duration-300 group relative"
          >
            <div className="flex items-center justify-center w-12 h-12 rounded-full transition-all duration-300 group-hover:bg-muted/20">
              <Icon 
                size={20} 
                className="text-muted-foreground transition-all duration-300 group-hover:scale-110 group-hover:text-foreground" 
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
          className="flex flex-col items-center justify-center p-2 transition-all duration-300 group relative"
        >
          {/* Glowing background circle for center button */}
          <div className={cn(
            "absolute inset-0 rounded-full transition-all duration-500",
            isActive 
              ? "bg-gradient-to-br from-primary via-primary to-primary/80 shadow-2xl shadow-primary/40" 
              : "bg-gradient-to-br from-primary/60 to-primary/40 shadow-lg shadow-primary/20 group-hover:shadow-xl group-hover:shadow-primary/30"
          )}>
            {/* Extra glow effect */}
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-white/20 to-transparent opacity-40"></div>
          </div>
          
          <div className="relative flex items-center justify-center w-14 h-14 rounded-full">
            <Icon 
              size={24} 
              className="text-white drop-shadow-md transition-all duration-300 group-hover:scale-110" 
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
        className="flex flex-col items-center justify-center p-3 transition-all duration-300 group relative"
      >
        <div className={cn(
          "flex items-center justify-center w-12 h-12 rounded-full transition-all duration-300",
          isActive 
            ? "bg-primary/10 text-primary" 
            : "text-muted-foreground group-hover:bg-muted/20 group-hover:text-foreground"
        )}>
          <Icon 
            size={20} 
            className="transition-all duration-300 group-hover:scale-110" 
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
          
          {/* Tab container */}
          <div className="relative flex items-center px-3 py-2 gap-1">
            {allTabs.map((tab) => renderTab(tab))}
          </div>
        </div>
      </div>
    </nav>
  );
}