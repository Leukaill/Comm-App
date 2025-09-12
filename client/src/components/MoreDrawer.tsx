import { useState } from "react";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { 
  FileText, 
  MessageSquare, 
  Bot, 
  ClipboardList, 
  History, 
  Users2,
  Users,
  User
} from "lucide-react";
import { Link } from "wouter";

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
      <SheetContent side="right" className="w-[90vw] sm:w-[400px] p-0">
        <SheetHeader className="p-6 pb-4 text-left">
          <SheetTitle className="text-xl font-semibold text-foreground">
            More Features
          </SheetTitle>
          <SheetDescription className="text-muted-foreground">
            Access additional BPN services and tools
          </SheetDescription>
        </SheetHeader>
        
        <ScrollArea className="h-[calc(100vh-120px)] px-6">
          <div className="space-y-6">
            {menuItems.map((section, sectionIndex) => (
              <div key={section.category}>
                <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3">
                  {section.category}
                </h3>
                <div className="space-y-2">
                  {section.items.map((item) => {
                    const Icon = item.icon;
                    return (
                      <Link 
                        key={item.id} 
                        href={item.path}
                        data-testid={`drawer-link-${item.id}`}
                      >
                        <Button
                          variant="ghost"
                          className="w-full justify-start h-auto p-4 text-left hover:bg-muted/50 transition-colors"
                          onClick={() => onOpenChange(false)}
                        >
                          <div className="flex items-start gap-3 w-full">
                            <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                              <Icon size={20} className="text-primary" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="font-medium text-foreground mb-1">
                                {item.label}
                              </div>
                              <div className="text-sm text-muted-foreground line-clamp-2">
                                {item.description}
                              </div>
                            </div>
                          </div>
                        </Button>
                      </Link>
                    );
                  })}
                </div>
                {sectionIndex < menuItems.length - 1 && (
                  <Separator className="mt-6" />
                )}
              </div>
            ))}
          </div>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
}