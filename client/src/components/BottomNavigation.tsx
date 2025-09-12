import { Home, Calendar, FileText, Users, User } from "lucide-react";
import { cn } from "@/lib/utils";

interface BottomNavigationProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export default function BottomNavigation({ activeTab, onTabChange }: BottomNavigationProps) {
  const tabs = [
    { id: "home", icon: Home, label: "Home" },
    { id: "events", icon: Calendar, label: "Events" },
    { id: "notes", icon: FileText, label: "Notes" },
    { id: "network", icon: Users, label: "Network" },
    { id: "profile", icon: User, label: "Profile" },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-card/95 backdrop-blur-xl border-t border-border/50 safe-area-inset-bottom shadow-2xl shadow-primary/5">
      <div className="relative">
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-background/20 to-transparent pointer-events-none"></div>
        
        <div className="flex items-center justify-around px-1 py-2 relative">
          {tabs.map((tab, index) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            
            return (
              <button
                key={tab.id}
                onClick={() => onTabChange(tab.id)}
                data-testid={`tab-${tab.id}`}
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
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}