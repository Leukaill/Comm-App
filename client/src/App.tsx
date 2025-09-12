import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "@/components/ThemeProvider";
import { useState } from "react";
import { AnimatePresence } from "framer-motion";

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
import AppShell from "@/components/AppShell";
import PageTransition from "@/components/PageTransition";

function AuthenticatedApp() {
  return (
    <AppShell>
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
    </AppShell>
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
