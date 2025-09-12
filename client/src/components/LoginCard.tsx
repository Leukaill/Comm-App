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
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-primary/5 to-primary/10">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center space-y-4">
          <div className="flex justify-center">
            <img 
              src={bpnLogoUrl} 
              alt="BPN Logo" 
              className="h-16 w-16 rounded-lg"
            />
          </div>
          <div>
            <CardTitle className="text-2xl font-bold">Welcome to BPN</CardTitle>
            <p className="text-muted-foreground mt-2">
              Business Professionals Network
            </p>
          </div>
        </CardHeader>
        
        <CardContent className="space-y-4">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                data-testid="input-email"
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                data-testid="input-password"
                required
              />
            </div>
            
            <Button 
              type="submit" 
              className="w-full" 
              disabled={isLoading || !email || !password}
              data-testid="button-login"
            >
              {isLoading ? "Signing in..." : "Sign In"}
            </Button>
          </form>
          
          <div className="text-center">
            <p className="text-sm text-muted-foreground mb-3">
              Quick login for development:
            </p>
            <div className="space-y-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleQuickLogin("beneficiary")}
                data-testid="button-demo-beneficiary"
                className="w-full"
              >
                Demo Beneficiary
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleQuickLogin("manager")}
                data-testid="button-demo-manager"
                className="w-full"
              >
                Demo Manager
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