import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "@/components/ThemeProvider";
import { useState } from "react";

// Pages
import Login from "@/pages/Login";
import Home from "@/pages/Home";
import Events from "@/pages/Events";
import Notes from "@/pages/Notes";
import Network from "@/pages/Network";
import Profile from "@/pages/Profile";
import NotFound from "@/pages/not-found";

// Components
import BottomNavigation from "@/components/BottomNavigation";
import ThemeToggle from "@/components/ThemeToggle";

function AuthenticatedApp() {
  const [activeTab, setActiveTab] = useState("home");

  const getCurrentPage = () => {
    switch (activeTab) {
      case "home":
        return <Home />;
      case "events":
        return <Events />;
      case "notes":
        return <Notes />;
      case "network":
        return <Network />;
      case "profile":
        return <Profile />;
      default:
        return <Home />;
    }
  };

  return (
    <div className="flex flex-col h-screen bg-background">
      {/* Enhanced Header with glassmorphism */}
      <header className="flex items-center justify-between p-4 bg-card/90 backdrop-blur-xl border-b border-border/50 relative overflow-hidden">
        {/* Subtle animated background */}
        <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-primary/5 opacity-50"></div>
        
        <div className="flex items-center gap-3 relative z-10">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-primary/30 to-primary/10 rounded-lg blur-md"></div>
            <img 
              src="/assets/generated_images/BPN_professional_logo_design_2993b4ca.png" 
              alt="BPN" 
              className="relative h-10 w-10 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110"
            />
          </div>
          <div className="space-y-0.5">
            <span className="font-bold text-xl bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">BPN</span>
            <div className="text-xs text-muted-foreground font-medium">Professional Network</div>
          </div>
        </div>
        
        <div className="relative z-10">
          <ThemeToggle />
        </div>
      </header>

      {/* Main content */}
      <main className="flex-1 overflow-hidden">
        {getCurrentPage()}
      </main>

      {/* Bottom navigation */}
      <BottomNavigation 
        activeTab={activeTab} 
        onTabChange={setActiveTab} 
      />
    </div>
  );
}

function App() {
  // Todo: remove mock functionality - implement real authentication
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleLogin = (email: string, password: string) => {
    console.log("Login successful:", { email });
    setIsAuthenticated(true);
  };

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme="light" storageKey="bpn-ui-theme">
        <TooltipProvider>
          <div className="min-h-screen bg-background">
            {isAuthenticated ? (
              <AuthenticatedApp />
            ) : (
              <Login onLogin={handleLogin} />
            )}
          </div>
          <Toaster />
        </TooltipProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
