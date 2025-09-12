import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import bpnLogoUrl from "@assets/generated_images/BPN_professional_logo_design_2993b4ca.png";

interface LoginCardProps {
  onLogin: (email: string, password: string) => void;
  isLoading?: boolean;
}

export default function LoginCard({ onLogin, isLoading = false }: LoginCardProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email && password) {
      onLogin(email, password);
      console.log("Login attempt:", { email });
    }
  };

  // Todo: remove mock functionality - for development only
  const handleQuickLogin = (userType: string) => {
    const mockUsers = {
      "beneficiary": { email: "john.doe@example.com", password: "demo123" },
      "manager": { email: "sarah.wilson@bpn.org", password: "demo123" }
    };
    
    const user = mockUsers[userType as keyof typeof mockUsers];
    if (user) {
      setEmail(user.email);
      setPassword(user.password);
      onLogin(user.email, user.password);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-primary/10 via-primary/5 to-secondary/10 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-secondary/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>
      
      <Card className="w-full max-w-md backdrop-blur-sm bg-card/95 border-border/50 shadow-2xl shadow-primary/10 hover:shadow-primary/20 transition-all duration-500 hover:scale-[1.02]">
        <CardHeader className="text-center space-y-6 pb-6">
          <div className="flex justify-center">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-primary to-primary/80 rounded-2xl blur-xl opacity-30 animate-pulse"></div>
              <img 
                src={bpnLogoUrl} 
                alt="BPN Logo" 
                className="relative h-20 w-20 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110"
              />
            </div>
          </div>
          <div className="space-y-2">
            <CardTitle className="text-3xl font-bold bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
              Welcome to BPN
            </CardTitle>
            <p className="text-muted-foreground text-sm font-medium">
              Business Professionals Network
            </p>
            <div className="w-16 h-0.5 bg-gradient-to-r from-primary/50 to-primary mx-auto rounded-full"></div>
          </div>
        </CardHeader>
        
        <CardContent className="space-y-6 px-6">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-3">
              <Label htmlFor="email" className="text-sm font-semibold text-foreground/90">Email</Label>
              <div className="relative group">
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  data-testid="input-email"
                  required
                  className="h-12 pl-4 pr-4 border-2 border-border/50 focus:border-primary/50 bg-background/50 backdrop-blur-sm transition-all duration-300 hover:border-primary/30 focus:shadow-lg focus:shadow-primary/10"
                />
                <div className="absolute inset-0 rounded-md bg-gradient-to-r from-primary/5 to-transparent opacity-0 group-focus-within:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
              </div>
            </div>
            
            <div className="space-y-3">
              <Label htmlFor="password" className="text-sm font-semibold text-foreground/90">Password</Label>
              <div className="relative group">
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  data-testid="input-password"
                  required
                  className="h-12 pl-4 pr-4 border-2 border-border/50 focus:border-primary/50 bg-background/50 backdrop-blur-sm transition-all duration-300 hover:border-primary/30 focus:shadow-lg focus:shadow-primary/10"
                />
                <div className="absolute inset-0 rounded-md bg-gradient-to-r from-primary/5 to-transparent opacity-0 group-focus-within:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
              </div>
            </div>
            
            <Button 
              type="submit" 
              className="w-full h-12 text-base font-semibold bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary shadow-lg hover:shadow-xl hover:shadow-primary/25 transition-all duration-300 hover:scale-[1.02] disabled:hover:scale-100" 
              disabled={isLoading || !email || !password}
              data-testid="button-login"
            >
              {isLoading ? (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  Signing in...
                </div>
              ) : (
                "Sign In"
              )}
            </Button>
          </form>
          
          <div className="text-center relative">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-border/30"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="bg-card px-4 text-muted-foreground font-medium">Quick Demo Access</span>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-3 mt-4">
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleQuickLogin("beneficiary")}
                data-testid="button-demo-beneficiary"
                className="h-10 border-2 border-primary/20 hover:border-primary/40 hover:bg-primary/5 transition-all duration-300 hover:scale-105 group"
              >
                <div className="flex flex-col items-center">
                  <span className="text-xs font-semibold group-hover:text-primary transition-colors">Demo</span>
                  <span className="text-xs text-muted-foreground">Beneficiary</span>
                </div>
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleQuickLogin("manager")}
                data-testid="button-demo-manager"
                className="h-10 border-2 border-secondary/20 hover:border-secondary/40 hover:bg-secondary/5 transition-all duration-300 hover:scale-105 group"
              >
                <div className="flex flex-col items-center">
                  <span className="text-xs font-semibold group-hover:text-secondary-foreground transition-colors">Demo</span>
                  <span className="text-xs text-muted-foreground">Manager</span>
                </div>
              </Button>
            </div>
          </div>
          
          <div className="text-center pt-4 border-t">
            <p className="text-xs text-muted-foreground">
              Don't have an account?{" "}
              <Button 
                variant="ghost" 
                className="p-0 h-auto text-xs underline"
                data-testid="button-register"
              >
                Register here
              </Button>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}