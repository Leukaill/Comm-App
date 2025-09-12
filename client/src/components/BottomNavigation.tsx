import { Home, Calendar, Users, User, Menu } from "lucide-react";
import { Link, useLocation } from "wouter";
import { cn } from "@/lib/utils";
import { useState } from "react";
import MoreDrawer from "./MoreDrawer";

export default function BottomNavigation() {
  const [location] = useLocation();
  const [isMoreDrawerOpen, setIsMoreDrawerOpen] = useState(false);
  
  const leftTabs = [
    { id: "home", path: "/", icon: Home, label: "Home" },
    { id: "events", path: "/events", icon: Calendar, label: "Events" },
  ];
  
  const rightTabs = [
    { id: "network", path: "/network", icon: Users, label: "Network" },
    { id: "profile", path: "/profile", icon: User, label: "Profile" },
  ];

  const renderTabGroup = (tabs: typeof leftTabs) => {
    return tabs.map((tab) => {
      const Icon = tab.icon;
      const isActive = location === tab.path;
      
      return (
        <Link
          key={tab.id}
          href={tab.path}
          data-testid={`tab-${tab.id}`}
          aria-current={isActive ? "page" : undefined}
          className={cn(
            "flex flex-col items-center gap-1.5 px-3 py-2 rounded-xl transition-all duration-300 min-h-[64px] flex-1 relative group",
            isActive 
              ? "text-primary transform scale-105" 
              : "text-muted-foreground hover:text-foreground hover:scale-105"
          )}
        >
          {/* Active background with glow */}
          {isActive && (
            <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-primary/10 rounded-xl blur-sm"></div>
          )}
          
          {/* Icon container with enhanced effects */}
          <div className={cn(
            "relative flex items-center justify-center w-8 h-8 rounded-lg transition-all duration-300",
            isActive 
              ? "bg-primary/10 shadow-lg shadow-primary/25" 
              : "group-hover:bg-muted/50"
          )}>
            <Icon 
              size={20} 
              className={cn(
                "transition-all duration-300",
                isActive 
                  ? "text-primary drop-shadow-sm" 
                  : "group-hover:scale-110"
              )} 
            />
          </div>
          
          <span className={cn(
            "text-xs font-semibold transition-all duration-300",
            isActive ? "text-primary" : ""
          )}>
            {tab.label}
          </span>
          
          {/* Active indicator */}
          {isActive && (
            <div className="absolute -bottom-0.5 left-1/2 transform -translate-x-1/2 w-8 h-1 bg-gradient-to-r from-primary/50 via-primary to-primary/50 rounded-full shadow-lg shadow-primary/50"></div>
          )}
          
          {/* Ripple effect on tap */}
          <div className="absolute inset-0 rounded-xl bg-primary/10 opacity-0 group-active:opacity-100 transition-opacity duration-150"></div>
        </Link>
      );
    });
  };

  return (
    <nav role="navigation" aria-label="Primary navigation" className="fixed bottom-0 left-0 right-0 bg-card/95 backdrop-blur-xl border-t border-border/50 safe-area-inset-bottom shadow-2xl shadow-primary/5">
      <div className="relative">
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-background/20 to-transparent pointer-events-none"></div>
        
        {/* Bottom padding for floating button */}
        <div className="pb-3">
          <div className="flex items-center justify-between px-1 py-2 relative">
            {/* Left tab group */}
            <div className="flex flex-1 justify-around">
              {renderTabGroup(leftTabs)}
            </div>
            
            {/* Center spacing for floating button */}
            <div className="w-16"></div>
            
            {/* Right tab group */}
            <div className="flex flex-1 justify-around">
              {renderTabGroup(rightTabs)}
            </div>
          </div>
        </div>
        
        {/* Floating More Button - Centered and Elevated */}
        <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 -translate-y-3">
          <MoreDrawer 
            isOpen={isMoreDrawerOpen} 
            onOpenChange={setIsMoreDrawerOpen}
          >
            <button
              data-testid="button-more-center"
              aria-label="Open more features"
              className={cn(
                "relative w-14 h-14 rounded-full transition-all duration-300 group",
                "bg-gradient-to-br from-primary/90 to-primary",
                "ring-2 ring-white/60 dark:ring-white/20",
                "shadow-lg shadow-primary/20 backdrop-blur-sm",
                "hover:scale-105 active:scale-95",
                "focus:outline-none focus:ring-4 focus:ring-primary/30"
              )}
            >
              {/* Subtle glow effect */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-primary/40 to-primary/20 blur opacity-60 group-hover:opacity-80 transition-opacity duration-300"></div>
              
              {/* Icon */}
              <div className="relative flex items-center justify-center w-full h-full">
                <Menu 
                  size={24} 
                  className="text-primary-foreground transition-all duration-300 group-hover:scale-110 drop-shadow-sm" 
                />
              </div>
              
              {/* Ripple effect */}
              <div className="absolute inset-0 rounded-full bg-white/20 opacity-0 group-active:opacity-100 transition-opacity duration-150"></div>
            </button>
          </MoreDrawer>
        </div>
      </div>
    </nav>
  );
}