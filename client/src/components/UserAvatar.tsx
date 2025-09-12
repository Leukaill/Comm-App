import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface UserAvatarProps {
  src?: string;
  name: string;
  size?: "sm" | "md" | "lg";
  showStatus?: boolean;
  status?: "online" | "away" | "busy" | "offline";
  className?: string;
}

export default function UserAvatar({ 
  src, 
  name, 
  size = "md", 
  showStatus = false, 
  status = "offline",
  className 
}: UserAvatarProps) {
  const sizeClasses = {
    sm: "h-8 w-8 sm:h-9 sm:w-9", // Responsive: slightly larger on small screens+
    md: "h-10 w-10 sm:h-11 sm:w-11 md:h-12 md:w-12", // Responsive scaling
    lg: "h-16 w-16 sm:h-[4.5rem] sm:w-[4.5rem] md:h-20 md:w-20" // Responsive scaling for large
  };

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <div className={cn("relative", className)}>
      <Avatar className={sizeClasses[size]}>
        <AvatarImage src={src} alt={name} />
        <AvatarFallback className="bg-primary text-primary-foreground font-medium">
          {getInitials(name)}
        </AvatarFallback>
      </Avatar>
      
      {showStatus && (
        <div className={cn(
          "absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full border-2 border-background",
          status === "online" && "bg-status-online",
          status === "away" && "bg-status-away", 
          status === "busy" && "bg-status-busy",
          status === "offline" && "bg-status-offline"
        )} />
      )}
    </div>
  );
}