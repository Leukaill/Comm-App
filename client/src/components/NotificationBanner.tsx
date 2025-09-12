import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { X, Bell, Calendar, FileText, Users, Heart } from "lucide-react";
import { cn } from "@/lib/utils";

interface NotificationBannerProps {
  id: string;
  type: "event" | "note" | "connection" | "like" | "general";
  title: string;
  message: string;
  timestamp: string;
  isRead: boolean;
  onDismiss: () => void;
  onAction?: () => void;
  actionLabel?: string;
}

export default function NotificationBanner({
  type,
  title,
  message,
  timestamp,
  isRead,
  onDismiss,
  onAction,
  actionLabel
}: NotificationBannerProps) {
  const getIcon = () => {
    switch (type) {
      case "event":
        return <Calendar size={20} className="text-blue-500" />;
      case "note":
        return <FileText size={20} className="text-green-500" />;
      case "connection":
        return <Users size={20} className="text-purple-500" />;
      case "like":
        return <Heart size={20} className="text-red-500" />;
      default:
        return <Bell size={20} className="text-gray-500" />;
    }
  };

  const getBgColor = () => {
    if (isRead) return "bg-muted/50";
    return "bg-card border-l-4 border-l-primary";
  };

  return (
    <Alert className={cn("mb-2 hover-elevate transition-all cursor-pointer", getBgColor())}>
      <div className="flex items-start gap-3 w-full">
        <div className="mt-0.5">
          {getIcon()}
        </div>
        
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <div className="flex-1 min-w-0">
              <h4 className={cn(
                "text-sm leading-tight mb-1",
                !isRead ? "font-semibold" : "font-medium"
              )}>
                {title}
              </h4>
              <AlertDescription className="text-xs text-muted-foreground">
                {message}
              </AlertDescription>
              <p className="text-xs text-muted-foreground mt-1">
                {timestamp}
              </p>
            </div>
            
            <Button
              variant="ghost"
              size="sm"
              onClick={(e) => {
                e.stopPropagation();
                onDismiss();
                console.log("Notification dismissed");
              }}
              data-testid="button-dismiss-notification"
              className="h-6 w-6 p-0"
            >
              <X size={14} />
            </Button>
          </div>
          
          {onAction && actionLabel && (
            <Button
              variant="outline"
              size="sm"
              onClick={(e) => {
                e.stopPropagation();
                onAction();
                console.log(`Notification action: ${actionLabel}`);
              }}
              data-testid="button-notification-action"
              className="mt-2 h-7 text-xs"
            >
              {actionLabel}
            </Button>
          )}
        </div>
      </div>
    </Alert>
  );
}