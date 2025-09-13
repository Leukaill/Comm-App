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
      <SheetContent side="right" className="w-[90vw] sm:w-[420px] p-0 bg-gradient-to-br from-background via-background to-muted/20">
        {/* Enhanced Header with Profile Section */}
        <div className="relative overflow-hidden">
          {/* Animated Background */}
          <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-primary/5 to-transparent opacity-60"></div>
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-primary/20 to-transparent rounded-full blur-3xl"></div>
          
          <SheetHeader className="relative p-6 pb-4 text-left">
            {/* User Profile Section */}
            <div className="flex items-center gap-4 mb-4 p-4 rounded-xl bg-card/50 backdrop-blur-sm border border-border/50">
              <UserAvatar 
                name="John Doe" 
                size="lg" 
                showStatus={true} 
                status="online"
                className="ring-2 ring-primary/20 ring-offset-2 ring-offset-background"
              />
              <div className="flex-1">
                <div className="font-semibold text-lg text-foreground">John Doe</div>
                <div className="text-sm text-muted-foreground">Senior Business Analyst</div>
                <Badge variant="secondary" className="mt-1 text-xs">
                  <Sparkles className="w-3 h-3 mr-1" />
                  Premium Member
                </Badge>
              </div>
            </div>
            
            <SheetTitle className="text-2xl font-bold bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent">
              Explore More
            </SheetTitle>
            <SheetDescription className="text-muted-foreground text-base">
              Discover powerful tools and connect with the BPN community
            </SheetDescription>
          </SheetHeader>
        </div>
        
        <ScrollArea className="h-[calc(100vh-280px)] px-6">
          <div className="space-y-8">
            {menuItems.map((section, sectionIndex) => (
              <div key={section.category} className="animate-in slide-in-from-bottom-4 duration-500" style={{ animationDelay: `${sectionIndex * 100}ms` }}>
                {/* Enhanced Section Header */}
                <div className="flex items-center gap-3 mb-4">
                  <div className="flex-1">
                    <h3 className="text-sm font-bold text-foreground uppercase tracking-wider bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                      {section.category}
                    </h3>
                    <div className="h-[2px] bg-gradient-to-r from-primary/40 to-transparent rounded-full mt-1 w-16"></div>
                  </div>
                </div>
                
                {/* Enhanced Menu Items */}
                <div className="space-y-3">
                  {section.items.map((item, itemIndex) => {
                    const Icon = item.icon;
                    return (
                      <Link 
                        key={item.id} 
                        href={item.path}
                        data-testid={`drawer-link-${item.id}`}
                      >
                        <div className={cn(
                          "group relative overflow-hidden rounded-xl transition-all duration-300 hover:scale-[1.02] hover:shadow-lg",
                          "bg-gradient-to-br from-card/80 to-card/40 backdrop-blur-sm",
                          "border border-border/50 hover:border-primary/30",
                          "animate-in slide-in-from-right-4 duration-500"
                        )} style={{ animationDelay: `${(sectionIndex * 100) + (itemIndex * 50)}ms` }}>
                          {/* Hover Glow Effect */}
                          <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-transparent to-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                          
                          <Button
                            variant="ghost"
                            className="relative w-full justify-start h-auto p-5 text-left hover:bg-transparent border-0 shadow-none group"
                            onClick={() => onOpenChange(false)}
                          >
                            <div className="flex items-center gap-4 w-full">
                              {/* Enhanced Icon Container */}
                              <div className="relative flex-shrink-0">
                                <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-primary/10 rounded-xl blur-lg group-hover:blur-xl transition-all duration-300"></div>
                                <div className="relative w-12 h-12 rounded-xl bg-gradient-to-br from-primary/15 to-primary/5 flex items-center justify-center group-hover:scale-110 transition-transform duration-300 border border-primary/20">
                                  <Icon size={22} className="text-primary group-hover:scale-110 transition-transform duration-300" />
                                </div>
                              </div>
                              
                              {/* Enhanced Content */}
                              <div className="flex-1 min-w-0">
                                <div className="font-semibold text-foreground mb-1 group-hover:text-primary transition-colors duration-200">
                                  {item.label}
                                </div>
                                <div className="text-sm text-muted-foreground line-clamp-2 group-hover:text-muted-foreground/80 transition-colors duration-200">
                                  {item.description}
                                </div>
                              </div>
                              
                              {/* Arrow Indicator */}
                              <ChevronRight 
                                size={18} 
                                className="text-muted-foreground/40 group-hover:text-primary group-hover:translate-x-1 transition-all duration-300" 
                              />
                            </div>
                          </Button>
                        </div>
                      </Link>
                    );
                  })}
                </div>
                
                {/* Enhanced Separator */}
                {sectionIndex < menuItems.length - 1 && (
                  <div className="relative mt-8">
                    <Separator className="opacity-30" />
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/20 to-transparent h-px"></div>
                  </div>
                )}
              </div>
            ))}
            
            {/* Action Buttons at Bottom */}
            <div className="space-y-3 pt-4 animate-in slide-in-from-bottom-4 duration-500" style={{ animationDelay: '600ms' }}>
              <Button 
                variant="outline" 
                className="w-full justify-start gap-3 p-4 h-auto hover:bg-muted/50 transition-colors group"
              >
                <Settings size={18} className="text-muted-foreground group-hover:text-foreground transition-colors" />
                <span className="font-medium">Settings & Preferences</span>
              </Button>
              
              <Button 
                variant="ghost" 
                className="w-full justify-start gap-3 p-4 h-auto text-muted-foreground hover:text-destructive hover:bg-destructive/5 transition-colors group"
              >
                <LogOut size={18} className="group-hover:scale-110 transition-transform" />
                <span className="font-medium">Sign Out</span>
              </Button>
            </div>
          </div>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
}