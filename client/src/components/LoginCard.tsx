import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { useState, useEffect } from "react";
import { ChevronLeft, Eye, EyeOff, Mail, Lock, User, ArrowRight, Facebook, Twitter, Chrome, Apple } from "lucide-react";
import { cn } from "@/lib/utils";
import GeometryBackground from "./GeometryBackground";
import { useTheme } from "./ThemeProvider";
import bpnLogoUrl from "@assets/logo_1757669896337.png";

interface LoginCardProps {
  onLogin: (email: string, password: string) => void;
  isLoading?: boolean;
}

type AuthScreen = 'welcome' | 'signin' | 'signup';

export default function LoginCard({ onLogin, isLoading = false }: LoginCardProps) {
  const [screen, setScreen] = useState<AuthScreen>('welcome');
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [agreeToTerms, setAgreeToTerms] = useState(false);
  
  // Auto-detect system theme for authentication page
  const { setTheme } = useTheme();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (screen === 'signin' && email && password) {
      onLogin(email, password);
      console.log("Login attempt:", { email });
    } else if (screen === 'signup' && email && password && fullName && agreeToTerms) {
      // TODO: Implement sign up logic
      onLogin(email, password);
      console.log("Sign up attempt:", { email, fullName });
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
      setScreen('signin');
      setTimeout(() => onLogin(user.email, user.password), 500);
    }
  };

  // Auto-detect system theme only if no user preference exists
  useEffect(() => {
    const existingTheme = localStorage.getItem("bpn-ui-theme");
    if (!existingTheme) {
      setTheme("system");
    }
  }, [setTheme]);

  const resetForm = () => {
    setEmail("");
    setPassword("");
    setConfirmPassword("");
    setFullName("");
    setShowPassword(false);
    setRememberMe(false);
    setAgreeToTerms(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden bg-gradient-to-br from-blue-600 via-purple-600 to-blue-800 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Premium Geometric Background */}
      <GeometryBackground className="opacity-30 dark:opacity-60" />

      {/* Content */}
      <div className="relative z-20 w-full max-w-md">
        {screen === 'welcome' && (
          <div className="text-center space-y-8 geometric-slide-in">
            {/* Logo */}
            <div className="flex justify-center mb-12">
              <div className="relative">
                <div className="absolute inset-0 w-20 h-20 bg-white/10 rounded-2xl blur-xl opacity-40"></div>
                <img 
                  src={bpnLogoUrl} 
                  alt="BPN" 
                  className="relative h-20 w-auto max-w-[140px] object-contain transition-all duration-300 hover:scale-105 filter drop-shadow-md"
                />
              </div>
            </div>

            {/* Welcome Text */}
            <div className="space-y-6">
              <h1 className="text-5xl font-bold text-[hsl(var(--geometric-neutral-800))] dark:text-[hsl(var(--geometric-neutral-900))] leading-tight">
                Welcome to BPN
              </h1>
              <p className="text-[hsl(var(--geometric-neutral-600))] dark:text-[hsl(var(--geometric-neutral-700))] text-lg leading-relaxed px-4">
                Professional networking reimagined
              </p>
            </div>

            {/* Action Buttons */}
            <div className="space-y-4 pt-12">
              <Button 
                onClick={() => { resetForm(); setScreen('signin'); }}
                className="w-full h-16 text-lg font-semibold bg-blue-600 hover:bg-blue-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02]"
                data-testid="button-signin-nav"
              >
                Sign In
              </Button>
              <Button 
                onClick={() => { resetForm(); setScreen('signup'); }}
                variant="outline"
                className="w-full h-16 text-lg font-semibold border-2 border-white/30 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 backdrop-blur-sm transition-all duration-300 hover:scale-[1.02]"
                data-testid="button-signup-nav"
              >
                Create Account
              </Button>
            </div>

            {/* Quick Demo Access */}
            <div className="pt-12 space-y-6">
              <p className="text-[hsl(var(--geometric-neutral-500))] text-sm">Quick Demo Access</p>
              <div className="grid grid-cols-2 gap-4">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleQuickLogin("beneficiary")}
                  data-testid="button-demo-beneficiary"
                  className="h-14 border border-[hsl(var(--geometric-neutral-200))] text-[hsl(var(--geometric-neutral-600))] hover:bg-[hsl(var(--geometric-neutral-100))] dark:border-[hsl(var(--geometric-neutral-700))] dark:text-[hsl(var(--geometric-neutral-400))] dark:hover:bg-[hsl(var(--geometric-neutral-100))]"
                  style={{ borderRadius: 'var(--radius-lg)' }}
                >
                  <div className="flex flex-col items-center gap-1">
                    <span className="text-sm font-semibold">Demo</span>
                    <span className="text-xs opacity-75">Beneficiary</span>
                  </div>
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleQuickLogin("manager")}
                  data-testid="button-demo-manager"
                  className="h-14 border border-[hsl(var(--geometric-neutral-200))] text-[hsl(var(--geometric-neutral-600))] hover:bg-[hsl(var(--geometric-neutral-100))] dark:border-[hsl(var(--geometric-neutral-700))] dark:text-[hsl(var(--geometric-neutral-400))] dark:hover:bg-[hsl(var(--geometric-neutral-100))]"
                  style={{ borderRadius: 'var(--radius-lg)' }}
                >
                  <div className="flex flex-col items-center gap-1">
                    <span className="text-sm font-semibold">Demo</span>
                    <span className="text-xs opacity-75">Manager</span>
                  </div>
                </Button>
              </div>
            </div>
          </div>
        )}

        {(screen === 'signin' || screen === 'signup') && (
          <Card 
            className="bg-white dark:bg-[hsl(var(--geometric-neutral-100))] border border-[hsl(var(--geometric-neutral-200))] dark:border-[hsl(var(--geometric-neutral-700))] geometric-slide-in"
            style={{
              boxShadow: 'var(--shadow-geometric-xl)',
              borderRadius: 'var(--radius-2xl)'
            }}
          >
            <CardHeader style={{ padding: 'var(--space-24)' }} className="space-y-6 pb-6">
              {/* Back Button */}
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setScreen('welcome')}
                className="self-start p-2 rounded-full hover:bg-[hsl(var(--geometric-neutral-100))] dark:hover:bg-[hsl(var(--geometric-neutral-200))] transition-colors"
                data-testid="button-back"
              >
                <ChevronLeft size={20} />
              </Button>

              {/* Title */}
              <div className="text-center space-y-3">
                <CardTitle 
                  className="font-bold text-[hsl(var(--geometric-neutral-800))] dark:text-[hsl(var(--geometric-neutral-900))]"
                  style={{ fontSize: 'var(--font-size-3xl)' }}
                >
                  {screen === 'signin' ? 'Welcome back' : 'Get Started'}
                </CardTitle>
                <p 
                  className="text-[hsl(var(--geometric-neutral-500))] dark:text-[hsl(var(--geometric-neutral-600))]"
                  style={{ fontSize: 'var(--font-size-sm)' }}
                >
                  {screen === 'signin' 
                    ? 'Sign in to your account' 
                    : 'Create your BPN account'
                  }
                </p>
              </div>
            </CardHeader>
            
            <CardContent style={{ padding: '0 var(--space-24) var(--space-24)' }} className="space-y-6">
              <form onSubmit={handleSubmit} className="space-y-6">
                {screen === 'signup' && (
                  <div className="space-y-2">
                    <Label 
                      htmlFor="fullName" 
                      className="font-medium text-[hsl(var(--geometric-neutral-700))] dark:text-[hsl(var(--geometric-neutral-800))]"
                      style={{ fontSize: 'var(--font-size-sm)' }}
                    >
                      Full Name
                    </Label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[hsl(var(--geometric-neutral-400))]" size={18} />
                      <Input
                        id="fullName"
                        type="text"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        placeholder="Enter your full name"
                        data-testid="input-fullname"
                        required
                        className="h-12 pl-10 pr-4 border border-[hsl(var(--geometric-neutral-300))] focus:border-[hsl(var(--geometric-primary))] dark:border-[hsl(var(--geometric-neutral-700))] dark:focus:border-[hsl(var(--geometric-primary))] transition-colors"
                        style={{ borderRadius: 'var(--radius-lg)' }}
                      />
                    </div>
                  </div>
                )}
                
                <div className="space-y-2">
                  <Label 
                    htmlFor="email" 
                    className="font-medium text-[hsl(var(--geometric-neutral-700))] dark:text-[hsl(var(--geometric-neutral-800))]"
                    style={{ fontSize: 'var(--font-size-sm)' }}
                  >
                    Email
                  </Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[hsl(var(--geometric-neutral-400))]" size={18} />
                    <Input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your email"
                      data-testid="input-email"
                      required
                      className="h-12 pl-10 pr-4 border border-[hsl(var(--geometric-neutral-300))] focus:border-[hsl(var(--geometric-primary))] dark:border-[hsl(var(--geometric-neutral-700))] dark:focus:border-[hsl(var(--geometric-primary))] transition-colors"
                      style={{ borderRadius: 'var(--radius-lg)' }}
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label 
                    htmlFor="password" 
                    className="font-medium text-[hsl(var(--geometric-neutral-700))] dark:text-[hsl(var(--geometric-neutral-800))]"
                    style={{ fontSize: 'var(--font-size-sm)' }}
                  >
                    Password
                  </Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[hsl(var(--geometric-neutral-400))]" size={18} />
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Enter your password"
                      data-testid="input-password"
                      required
                      className="h-12 pl-10 pr-12 border border-[hsl(var(--geometric-neutral-300))] focus:border-[hsl(var(--geometric-primary))] dark:border-[hsl(var(--geometric-neutral-700))] dark:focus:border-[hsl(var(--geometric-primary))] transition-colors"
                      style={{ borderRadius: 'var(--radius-lg)' }}
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-2 top-1/2 transform -translate-y-1/2 p-2 hover:bg-[hsl(var(--geometric-neutral-100))] dark:hover:bg-[hsl(var(--geometric-neutral-200))]"
                      data-testid="button-toggle-password"
                    >
                      {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                    </Button>
                  </div>
                </div>

                {screen === 'signup' && (
                  <div className="space-y-2">
                    <Label 
                      htmlFor="confirmPassword" 
                      className="font-medium text-gray-700 dark:text-gray-300"
                    >
                      Confirm Password
                    </Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                      <Input
                        id="confirmPassword"
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        placeholder="Confirm your password"
                        data-testid="input-confirm-password"
                        required
                        className={cn(
                          "h-12 pl-10 pr-4 border border-gray-200 dark:border-gray-700 focus:border-blue-500 dark:focus:border-blue-400 transition-colors",
                          password !== confirmPassword && confirmPassword && "border-red-500 focus:border-red-500"
                        )}
                      />
                    </div>
                    {password !== confirmPassword && confirmPassword && (
                      <p className="text-sm text-red-500 mt-1">Passwords do not match</p>
                    )}
                  </div>
                )}

                {screen === 'signin' && (
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Checkbox 
                        id="remember" 
                        checked={rememberMe}
                        onCheckedChange={(checked) => setRememberMe(checked as boolean)}
                        data-testid="checkbox-remember"
                      />
                      <Label 
                        htmlFor="remember" 
                        className="text-[hsl(var(--geometric-neutral-600))] dark:text-[hsl(var(--geometric-neutral-700))]"
                        style={{ fontSize: 'var(--font-size-sm)' }}
                      >
                        Remember me
                      </Label>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-[hsl(var(--geometric-primary))] hover:text-[hsl(var(--geometric-primary-dark))] p-0 h-auto"
                      style={{ fontSize: 'var(--font-size-sm)' }}
                      data-testid="button-forgot-password"
                    >
                      Forgot password?
                    </Button>
                  </div>
                )}

                {screen === 'signup' && (
                  <div className="flex items-start space-x-3">
                    <Checkbox 
                      id="terms" 
                      checked={agreeToTerms}
                      onCheckedChange={(checked) => setAgreeToTerms(checked as boolean)}
                      data-testid="checkbox-terms"
                      className="mt-1"
                    />
                    <Label 
                      htmlFor="terms" 
                      className="text-[hsl(var(--geometric-neutral-600))] dark:text-[hsl(var(--geometric-neutral-700))] leading-relaxed"
                      style={{ fontSize: 'var(--font-size-sm)' }}
                    >
                      I agree to the processing of{" "}
                      <Button variant="ghost" className="p-0 h-auto text-[hsl(var(--geometric-primary))] hover:text-[hsl(var(--geometric-primary-dark))] underline">
                        Personal data
                      </Button>
                    </Label>
                  </div>
                )}
                
                <Button 
                  type="submit" 
                  className={cn(
                    "w-full h-14 text-lg font-semibold bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02] disabled:hover:scale-100",
                    (screen === 'signin' && (!email || !password)) || 
                    (screen === 'signup' && (!email || !password || !fullName || !agreeToTerms || password !== confirmPassword)) ? 
                    "opacity-50 cursor-not-allowed" : ""
                  )}
                  disabled={
                    isLoading || 
                    (screen === 'signin' && (!email || !password)) ||
                    (screen === 'signup' && (!email || !password || !fullName || !agreeToTerms || password !== confirmPassword))
                  }
                  data-testid={screen === 'signin' ? "button-signin" : "button-signup"}
                >
                  {isLoading ? (
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      {screen === 'signin' ? 'Signing in...' : 'Creating account...'}
                    </div>
                  ) : (
                    <div className="flex items-center gap-2">
                      {screen === 'signin' ? 'Sign In' : 'Sign up'}
                      <ArrowRight size={16} />
                    </div>
                  )}
                </Button>
              </form>
              
              {/* Social Login */}
              <div className="space-y-6">
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-[hsl(var(--geometric-neutral-200))] dark:border-[hsl(var(--geometric-neutral-700))]"></div>
                  </div>
                  <div className="relative flex justify-center">
                    <span 
                      className="bg-white dark:bg-[hsl(var(--geometric-neutral-100))] px-4 text-[hsl(var(--geometric-neutral-500))]"
                      style={{ 
                        fontSize: 'var(--font-size-sm)',
                        padding: '0 var(--space-4)'
                      }}
                    >
                      {screen === 'signin' ? 'Sign in with' : 'Sign up with'}
                    </span>
                  </div>
                </div>
                
                <div className="grid grid-cols-4 gap-3">
                  {[
                    { name: 'Facebook', icon: Facebook, color: 'hover:bg-[hsl(var(--geometric-accent))] dark:hover:bg-[hsl(var(--geometric-accent))]' },
                    { name: 'Twitter', icon: Twitter, color: 'hover:bg-[hsl(var(--geometric-accent))] dark:hover:bg-[hsl(var(--geometric-accent))]' },
                    { name: 'Google', icon: Chrome, color: 'hover:bg-[hsl(var(--geometric-accent))] dark:hover:bg-[hsl(var(--geometric-accent))]' },
                    { name: 'Apple', icon: Apple, color: 'hover:bg-[hsl(var(--geometric-accent))] dark:hover:bg-[hsl(var(--geometric-accent))]' }
                  ].map((provider) => (
                    <Button
                      key={provider.name}
                      variant="outline"
                      size="sm"
                      className={cn(
                        "h-14 border border-[hsl(var(--geometric-neutral-200))] dark:border-[hsl(var(--geometric-neutral-700))] text-[hsl(var(--geometric-neutral-600))] dark:text-[hsl(var(--geometric-neutral-400))]",
                        provider.color
                      )}
                      style={{
                        borderRadius: 'var(--radius-lg)',
                        transition: 'all var(--motion-duration-normal) var(--motion-ease-out)'
                      }}
                      data-testid={`button-${provider.name.toLowerCase()}`}
                    >
                      <provider.icon size={20} />
                    </Button>
                  ))}
                </div>
              </div>
              
              {/* Switch between signin/signup */}
              <div className="text-center pt-6">
                <p 
                  className="text-[hsl(var(--geometric-neutral-600))] dark:text-[hsl(var(--geometric-neutral-700))]"
                  style={{ fontSize: 'var(--font-size-sm)' }}
                >
                  {screen === 'signin' ? "Don't have an account? " : "Already have an account? "}
                  <Button 
                    variant="ghost" 
                    onClick={() => {
                      resetForm();
                      setScreen(screen === 'signin' ? 'signup' : 'signin');
                    }}
                    className="p-0 h-auto text-[hsl(var(--geometric-primary))] hover:text-[hsl(var(--geometric-primary-dark))] underline"
                    style={{ fontSize: 'var(--font-size-sm)' }}
                    data-testid={screen === 'signin' ? "button-goto-signup" : "button-goto-signin"}
                  >
                    {screen === 'signin' ? 'Sign up' : 'Sign in'}
                  </Button>
                </p>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}