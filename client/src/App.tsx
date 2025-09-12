import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "@/components/ThemeProvider";
import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import bpnLogoUrl from "@assets/logo_1757669896337.png";

// Pages
import Login from "@/pages/Login";
import Home from "@/pages/Home";
import Events from "@/pages/Events";
import Notes from "@/pages/Notes";
import Network from "@/pages/Network";
import Survey from "@/pages/Survey";
import Profile from "@/pages/Profile";
import NotFound from "@/pages/not-found";

// Components
import BottomNavigation from "@/components/BottomNavigation";
import ThemeToggle from "@/components/ThemeToggle";
import PageTransition from "@/components/PageTransition";

function AuthenticatedApp() {
  return (
    <div className="flex flex-col h-screen bg-background">
      {/* Enhanced Header with glassmorphism */}
      <header className="flex items-center justify-between p-4 bg-card/90 backdrop-blur-xl border-b border-border/50 relative overflow-hidden safe-area-inset-top">
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

      {/* Main content with smooth page transitions */}
      <main className="flex-1 overflow-hidden relative">
        <AnimatePresence mode="wait">
          <Switch>
            <Route path="/" component={() => <PageTransition><Home /></PageTransition>} />
            <Route path="/events" component={() => <PageTransition><Events /></PageTransition>} />
            <Route path="/notes" component={() => <PageTransition><Notes /></PageTransition>} />
            <Route path="/network" component={() => <PageTransition><Network /></PageTransition>} />
            <Route path="/surveys" component={() => <PageTransition><Survey /></PageTransition>} />
            <Route path="/profile" component={() => <PageTransition><Profile /></PageTransition>} />
            <Route component={() => <PageTransition><NotFound /></PageTransition>} />
          </Switch>
        </AnimatePresence>
      </main>

      {/* Bottom navigation */}
      <BottomNavigation />
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
