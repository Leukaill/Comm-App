import { Home, Calendar, ClipboardList, FileText, Users, User } from "lucide-react";
import { Link, useLocation } from "wouter";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarInset,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import BottomNavigation from "@/components/BottomNavigation";
import ThemeToggle from "@/components/ThemeToggle";
import bpnLogoUrl from "@assets/logo_1757669896337.png";

interface AppShellProps {
  children: React.ReactNode;
}

const navigationItems = [
  { path: "/", icon: Home, label: "Home" },
  { path: "/events", icon: Calendar, label: "Events" },
  { path: "/notes", icon: FileText, label: "Notes" },
  { path: "/network", icon: Users, label: "Network" },
  { path: "/surveys", icon: ClipboardList, label: "Survey" },
  { path: "/profile", icon: User, label: "Profile" },
];

function AppSidebar() {
  const [location] = useLocation();

  return (
    <Sidebar>
      <SidebarHeader className="border-b border-border/50">
        <div className="flex items-center gap-3 px-2 py-2">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-primary/15 to-primary/5 rounded-xl blur-lg opacity-60"></div>
            <img 
              src={bpnLogoUrl} 
              alt="BPN Logo" 
              className="relative h-8 w-auto max-w-[80px] object-contain transition-all duration-300 hover:scale-105 filter drop-shadow-md dark:invert dark:hue-rotate-180"
            />
          </div>
          <div className="flex flex-col">
            <span className="font-semibold text-sm bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
              BPN Hub
            </span>
            <span className="text-xs text-muted-foreground">Business Network</span>
          </div>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarMenu>
            {navigationItems.map((item) => {
              const Icon = item.icon;
              const isActive = location === item.path;
              
              return (
                <SidebarMenuItem key={item.path}>
                  <SidebarMenuButton 
                    asChild 
                    isActive={isActive}
                    tooltip={item.label}
                  >
                    <Link href={item.path}>
                      <Icon className="w-4 h-4" />
                      <span>{item.label}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              );
            })}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}

function DesktopHeader() {
  return (
    <header className="flex items-center justify-between p-4 bg-card/90 backdrop-blur-xl border-b border-border/50 relative overflow-hidden">
      {/* Subtle animated background */}
      <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-primary/5 opacity-50"></div>
      
      <div className="relative z-10 flex items-center gap-3">
        <SidebarTrigger />
        <div>
          <h1 className="text-xl font-bold bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
            BPN Hub
          </h1>
        </div>
      </div>
      
      <div className="relative z-10">
        <ThemeToggle />
      </div>
    </header>
  );
}

function MobileHeader() {
  return (
    <header className="flex items-center justify-between p-4 bg-card/90 backdrop-blur-xl border-b border-border/50 relative overflow-hidden safe-area-inset-top md:hidden">
      {/* Subtle animated background */}
      <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-primary/5 opacity-50"></div>
      
      <div className="relative z-10">
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-r from-primary/15 to-primary/5 rounded-xl blur-lg opacity-60"></div>
          <img 
            src={bpnLogoUrl} 
            alt="BPN Logo" 
            className="relative h-10 w-auto max-w-[100px] object-contain transition-all duration-300 hover:scale-105 filter drop-shadow-md dark:invert dark:hue-rotate-180"
          />
        </div>
      </div>
      
      <div className="relative z-10">
        <ThemeToggle />
      </div>
    </header>
  );
}

export default function AppShell({ children }: AppShellProps) {
  return (
    <SidebarProvider>
      <div className="flex flex-col h-screen bg-background">
        {/* Mobile header - only visible on mobile */}
        <MobileHeader />
        
        {/* Desktop layout with sidebar */}
        <div className="flex-1 flex min-h-0">
          {/* Sidebar - hidden on mobile, visible on desktop */}
          <div className="hidden md:block">
            <AppSidebar />
          </div>
          
          <SidebarInset className="flex-1 flex flex-col">
            {/* Desktop header - only visible on desktop */}
            <div className="hidden md:block">
              <DesktopHeader />
            </div>
            
            {/* Main content */}
            <main className="flex-1 relative overflow-hidden min-h-0 pb-[calc(env(safe-area-inset-bottom)+80px)] md:pb-0">
              {children}
            </main>
          </SidebarInset>
        </div>
        
        {/* Bottom navigation - only visible on mobile */}
        <div className="md:hidden">
          <BottomNavigation />
        </div>
      </div>
    </SidebarProvider>
  );
}