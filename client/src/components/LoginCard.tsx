import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { useState } from "react";
import { ChevronLeft, Eye, EyeOff, Mail, Lock, User, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
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
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden">
      {/* Stunning Flowing Background - Better than reference image */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-purple-600 to-blue-800">
        {/* Animated flowing shapes */}
        <div className="absolute inset-0 overflow-hidden">
          {/* Large flowing shapes */}
          <div className="absolute -top-1/2 -left-1/4 w-full h-full bg-gradient-to-br from-white/10 to-transparent rounded-full blur-3xl transform rotate-12 animate-pulse"></div>
          <div className="absolute -bottom-1/2 -right-1/4 w-full h-full bg-gradient-to-tl from-white/5 to-transparent rounded-full blur-3xl transform -rotate-12 animate-pulse delay-1000"></div>
          
          {/* Floating spheres */}
          <div className="absolute top-20 left-20 w-32 h-32 bg-white/20 rounded-full blur-2xl animate-bounce"></div>
          <div className="absolute top-1/3 right-16 w-24 h-24 bg-white/15 rounded-full blur-xl animate-pulse delay-500"></div>
          <div className="absolute bottom-1/3 left-1/4 w-20 h-20 bg-white/10 rounded-full blur-xl animate-bounce delay-700"></div>
          <div className="absolute bottom-20 right-1/3 w-16 h-16 bg-white/25 rounded-full blur-lg animate-pulse delay-300"></div>
          
          {/* Flowing abstract shapes */}
          <div className="absolute top-0 left-0 w-full h-full opacity-30">
            <svg viewBox="0 0 1000 1000" className="w-full h-full">
              <defs>
                <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="rgba(255,255,255,0.2)" />
                  <stop offset="100%" stopColor="rgba(255,255,255,0.05)" />
                </linearGradient>
              </defs>
              <path d="M200,300 Q400,100 600,300 T1000,300 L1000,1000 L0,1000 Z" fill="url(#grad1)" className="animate-pulse" />
            </svg>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 w-full max-w-md">
        {screen === 'welcome' && (
          <div className="text-center space-y-8 animate-in fade-in duration-700">
            {/* Logo */}
            <div className="flex justify-center mb-8">
              <div className="relative">
                <div className="absolute inset-0 bg-white/20 rounded-3xl blur-2xl"></div>
                <img 
                  src={bpnLogoUrl} 
                  alt="BPN" 
                  className="relative h-24 w-auto max-w-[160px] object-contain filter brightness-0 invert"
                />
              </div>
            </div>

            {/* Welcome Text */}
            <div className="space-y-4">
              <h1 className="text-4xl font-bold text-white mb-2">Welcome Back!</h1>
              <p className="text-white/80 text-lg leading-relaxed px-4">
                Connect with business professionals and grow your network
              </p>
            </div>

            {/* Action Buttons */}
            <div className="space-y-4 pt-8">
              <Button 
                onClick={() => { resetForm(); setScreen('signin'); }}
                className="w-full h-14 text-lg font-semibold bg-white text-blue-600 hover:bg-white/90 shadow-2xl hover:shadow-white/25 transition-all duration-300 hover:scale-105"
                data-testid="button-signin-nav"
              >
                Sign In
              </Button>
              <Button 
                onClick={() => { resetForm(); setScreen('signup'); }}
                variant="outline"
                className="w-full h-14 text-lg font-semibold border-2 border-white/30 text-white hover:bg-white/10 backdrop-blur-sm transition-all duration-300 hover:scale-105"
                data-testid="button-signup-nav"
              >
                Sign Up
              </Button>
            </div>

            {/* Quick Demo Access */}
            <div className="pt-8 space-y-4">
              <p className="text-white/60 text-sm">Quick Demo Access</p>
              <div className="grid grid-cols-2 gap-3">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleQuickLogin("beneficiary")}
                  data-testid="button-demo-beneficiary"
                  className="h-12 border border-white/20 text-white/80 hover:bg-white/10 backdrop-blur-sm transition-all duration-300 hover:scale-105"
                >
                  <div className="flex flex-col items-center">
                    <span className="text-sm font-semibold">Demo</span>
                    <span className="text-xs text-white/60">Beneficiary</span>
                  </div>
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleQuickLogin("manager")}
                  data-testid="button-demo-manager"
                  className="h-12 border border-white/20 text-white/80 hover:bg-white/10 backdrop-blur-sm transition-all duration-300 hover:scale-105"
                >
                  <div className="flex flex-col items-center">
                    <span className="text-sm font-semibold">Demo</span>
                    <span className="text-xs text-white/60">Manager</span>
                  </div>
                </Button>
              </div>
            </div>
          </div>
        )}

        {(screen === 'signin' || screen === 'signup') && (
          <Card className="backdrop-blur-xl bg-white/95 dark:bg-black/80 border-white/20 shadow-2xl animate-in slide-in-from-right duration-500">
            <CardHeader className="space-y-4 pb-6">
              {/* Back Button */}
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setScreen('welcome')}
                className="self-start p-2 rounded-full hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
                data-testid="button-back"
              >
                <ChevronLeft size={20} />
              </Button>

              {/* Title */}
              <div className="text-center space-y-2">
                <CardTitle className="text-2xl font-bold text-gray-900 dark:text-white">
                  {screen === 'signin' ? 'Welcome back' : 'Get Started'}
                </CardTitle>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  {screen === 'signin' 
                    ? 'Sign in to your account' 
                    : 'Create your BPN account'
                  }
                </p>
              </div>
            </CardHeader>
            
            <CardContent className="space-y-6">
              <form onSubmit={handleSubmit} className="space-y-5">
                {screen === 'signup' && (
                  <div className="space-y-2">
                    <Label htmlFor="fullName" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      Full Name
                    </Label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                      <Input
                        id="fullName"
                        type="text"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        placeholder="Enter your full name"
                        data-testid="input-fullname"
                        required
                        className="h-12 pl-10 pr-4 border border-gray-200 dark:border-gray-700 focus:border-blue-500 dark:focus:border-blue-400 transition-colors"
                      />
                    </div>
                  </div>
                )}
                
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Email
                  </Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                    <Input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your email"
                      data-testid="input-email"
                      required
                      className="h-12 pl-10 pr-4 border border-gray-200 dark:border-gray-700 focus:border-blue-500 dark:focus:border-blue-400 transition-colors"
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="password" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Password
                  </Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Enter your password"
                      data-testid="input-password"
                      required
                      className="h-12 pl-10 pr-12 border border-gray-200 dark:border-gray-700 focus:border-blue-500 dark:focus:border-blue-400 transition-colors"
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-2 top-1/2 transform -translate-y-1/2 p-2 hover:bg-gray-100 dark:hover:bg-gray-800"
                      data-testid="button-toggle-password"
                    >
                      {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                    </Button>
                  </div>
                </div>

                {screen === 'signup' && (
                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword" className="text-sm font-medium text-gray-700 dark:text-gray-300">
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
                        className="h-12 pl-10 pr-4 border border-gray-200 dark:border-gray-700 focus:border-blue-500 dark:focus:border-blue-400 transition-colors"
                      />
                    </div>
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
                      <Label htmlFor="remember" className="text-sm text-gray-600 dark:text-gray-400">
                        Remember me
                      </Label>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-sm text-blue-600 hover:text-blue-700 dark:text-blue-400 p-0 h-auto"
                      data-testid="button-forgot-password"
                    >
                      Forgot password?
                    </Button>
                  </div>
                )}

                {screen === 'signup' && (
                  <div className="flex items-start space-x-2">
                    <Checkbox 
                      id="terms" 
                      checked={agreeToTerms}
                      onCheckedChange={(checked) => setAgreeToTerms(checked as boolean)}
                      data-testid="checkbox-terms"
                      className="mt-1"
                    />
                    <Label htmlFor="terms" className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                      I agree to the processing of{" "}
                      <Button variant="ghost" className="p-0 h-auto text-blue-600 hover:text-blue-700 dark:text-blue-400 underline">
                        Personal data
                      </Button>
                    </Label>
                  </div>
                )}
                
                <Button 
                  type="submit" 
                  className={cn(
                    "w-full h-12 text-base font-semibold bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02] disabled:hover:scale-100",
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
              <div className="space-y-4">
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-200 dark:border-gray-700"></div>
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="bg-white dark:bg-black px-4 text-gray-500 dark:text-gray-400">
                      {screen === 'signin' ? 'Sign in with' : 'Sign up with'}
                    </span>
                  </div>
                </div>
                
                <div className="grid grid-cols-4 gap-3">
                  {[
                    { name: 'Facebook', icon: '📘', color: 'hover:bg-blue-50 dark:hover:bg-blue-900/20' },
                    { name: 'Twitter', icon: '🐦', color: 'hover:bg-sky-50 dark:hover:bg-sky-900/20' },
                    { name: 'Google', icon: '🔍', color: 'hover:bg-red-50 dark:hover:bg-red-900/20' },
                    { name: 'Apple', icon: '🍎', color: 'hover:bg-gray-50 dark:hover:bg-gray-900/20' }
                  ].map((provider) => (
                    <Button
                      key={provider.name}
                      variant="outline"
                      size="sm"
                      className={cn(
                        "h-12 border border-gray-200 dark:border-gray-700 transition-all duration-300 hover:scale-105",
                        provider.color
                      )}
                      data-testid={`button-${provider.name.toLowerCase()}`}
                    >
                      <span className="text-lg">{provider.icon}</span>
                    </Button>
                  ))}
                </div>
              </div>
              
              {/* Switch between signin/signup */}
              <div className="text-center pt-4">
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {screen === 'signin' ? "Don't have an account? " : "Already have an account? "}
                  <Button 
                    variant="ghost" 
                    onClick={() => {
                      resetForm();
                      setScreen(screen === 'signin' ? 'signup' : 'signin');
                    }}
                    className="p-0 h-auto text-sm text-blue-600 hover:text-blue-700 dark:text-blue-400 underline"
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