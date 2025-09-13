import { useState } from "react";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import UserAvatar from "@/components/UserAvatar";
import { 
  FileText, 
  MessageSquare, 
  Bot, 
  ClipboardList, 
  History, 
  Users2,
  Users,
  User,
  ChevronRight,
  Sparkles,
  Settings,
  LogOut
} from "lucide-react";
import { Link } from "wouter";
import { cn } from "@/lib/utils";

interface MoreDrawerProps {
  children: React.ReactNode;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function MoreDrawer({ children, isOpen, onOpenChange }: MoreDrawerProps) {
  const menuItems = [
    {
      category: "Account & Profile",
      items: [
        { 
          id: "profile", 
          path: "/profile", 
          icon: User, 
          label: "Profile", 
          description: "Manage your account and personal information"
        }
      ]
    },
    {
      category: "Networking & Connections",
      items: [
        { 
          id: "network", 
          path: "/network", 
          icon: Users, 
          label: "Connect", 
          description: "Browse and connect with business professionals"
        }
      ]
    },
    {
      category: "Surveys & Feedback",
      items: [
        { 
          id: "survey-history", 
          path: "/survey-history", 
          icon: History, 
          label: "Survey History", 
          description: "View your past survey responses"
        }
      ]
    },
    {
      category: "Community & Support",
      items: [
        { 
          id: "social-feed", 
          path: "/social-feed", 
          icon: Users2, 
          label: "Social Feed", 
          description: "Posts and updates from entrepreneurs"
        },
        { 
          id: "chatbot", 
          path: "/chatbot", 
          icon: Bot, 
          label: "BPN Assistant", 
          description: "Ask questions about BPN services and programs"
        }
      ]
    }
  ];

  return (
    <Sheet open={isOpen} onOpenChange={onOpenChange}>
      <SheetTrigger asChild>
        {children}
      </SheetTrigger>
      <SheetContent side="right" className="w-[90vw] sm:w-[420px] p-0 bg-background border-l">
        {/* Professional Header */}
        <div className="border-b border-border bg-card/50 geometric-slide-in"
             role="region" aria-label="Account overview">
          
          <SheetHeader className="p-6 text-left">
            {/* Professional Profile Section */}
            <div className="flex items-center gap-4 mb-4">
              <UserAvatar 
                name="John Doe" 
                size="lg" 
                showStatus={true} 
                status="online"
                className="ring-2 ring-primary/10 ring-offset-2 ring-offset-background"
              />
              <div className="flex-1">
                <div className="font-semibold text-lg text-foreground">John Doe</div>
                <div className="text-sm text-muted-foreground mb-1">Senior Business Analyst</div>
                <Badge variant="secondary" className="text-xs font-medium">
                  Professional Plan
                </Badge>
              </div>
            </div>
            
            <SheetTitle className="text-2xl font-semibold text-foreground mb-2">
              Account Center
            </SheetTitle>
            <SheetDescription className="text-muted-foreground">
              Manage your profile and access business tools
            </SheetDescription>
          </SheetHeader>
        </div>
        
        <ScrollArea className="h-[calc(100vh-280px)] px-6">
          <div className="space-y-6 pb-6">
            {menuItems.map((section, sectionIndex) => (
              <div key={section.category} 
                   className="geometric-slide-in"
                   style={{ 
                     animationDelay: `${sectionIndex * 75}ms`
                   }}>
                {/* Clean Section Header */}
                <div className="mb-3">
                  <h3 className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                    {section.category}
                  </h3>
                </div>
                
                {/* Professional Menu Items */}
                <div className="space-y-1">
                  {section.items.map((item, itemIndex) => {
                    const Icon = item.icon;
                    return (
                      <Link 
                        key={item.id} 
                        href={item.path}
                        data-testid={`drawer-link-${item.id}`}
                      >
                        <Button
                          variant="ghost"
                          className="w-full justify-start h-12 gap-3 px-3 hover:bg-muted transition-colors duration-150 focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-1"
                          onClick={() => onOpenChange(false)}
                          aria-label={`Navigate to ${item.label}: ${item.description}`}
                        >
                          <Icon size={18} className="text-muted-foreground flex-shrink-0" />
                          <div className="flex-1 min-w-0 text-left">
                            <div className="font-medium text-sm text-foreground truncate">
                              {item.label}
                            </div>
                            {item.description && (
                              <div className="text-xs text-muted-foreground truncate">
                                {item.description}
                              </div>
                            )}
                          </div>
                          <ChevronRight 
                            size={16} 
                            className="text-muted-foreground flex-shrink-0 opacity-50 group-hover:opacity-100 transition-opacity duration-150" 
                          />
                        </Button>
                      </Link>
                    );
                  })}
                </div>
                
                {/* Clean Separator */}
                {sectionIndex < menuItems.length - 1 && (
                  <Separator className="my-4" />
                )}
              </div>
            ))}
            
            {/* Professional Footer Actions */}
            <div className="mt-6 pt-4 border-t border-border space-y-2 geometric-slide-in"
                 style={{ 
                   animationDelay: `${(menuItems.length * 75) + 150}ms`
                 }}>
              <Button 
                variant="outline" 
                className="w-full justify-start gap-3 h-11 hover:bg-muted transition-colors duration-150 focus-visible:ring-2 focus-visible:ring-primary"
                aria-label="Open account settings"
              >
                <Settings size={16} className="text-muted-foreground" />
                <span className="font-medium text-sm">Settings</span>
              </Button>
              
              <Button 
                variant="ghost" 
                className="w-full justify-start gap-3 h-11 text-muted-foreground hover:text-destructive hover:bg-destructive/5 transition-colors duration-150 focus-visible:ring-2 focus-visible:ring-destructive"
                aria-label="Sign out of your account"
              >
                <LogOut size={16} />
                <span className="font-medium text-sm">Sign Out</span>
              </Button>
            </div>
          </div>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
}