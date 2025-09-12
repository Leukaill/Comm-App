import { Button } from "@/components/ui/button";
import { Plus, Edit, MessageCircle } from "lucide-react";
import { cn } from "@/lib/utils";

interface FloatingActionButtonProps {
  type: "post" | "note" | "message";
  onClick: () => void;
  className?: string;
}

export default function FloatingActionButton({ type, onClick, className }: FloatingActionButtonProps) {
  const getIcon = () => {
    switch (type) {
      case "post":
        return <Plus size={24} />;
      case "note":
        return <Edit size={24} />;
      case "message":
        return <MessageCircle size={24} />;
      default:
        return <Plus size={24} />;
    }
  };

  const getLabel = () => {
    switch (type) {
      case "post":
        return "New Post";
      case "note":
        return "New Note";
      case "message":
        return "New Message";
      default:
        return "New";
    }
  };

  return (
    <div className="fixed bottom-20 right-4 z-50">
      {/* Glow effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-primary to-primary/80 rounded-full blur-xl opacity-40 animate-pulse"></div>
      
      <Button
        onClick={() => {
          onClick();
          console.log(`${getLabel()} clicked`);
        }}
        data-testid={`fab-${type}`}
        className={cn(
          "relative h-16 w-16 rounded-full shadow-2xl shadow-primary/30 hover:shadow-3xl hover:shadow-primary/50 transition-all duration-300 z-10",
          "bg-gradient-to-r from-primary via-primary to-primary/90 hover:from-primary/90 hover:via-primary hover:to-primary",
          "hover:scale-110 active:scale-95 group",
          "border-4 border-white/20 dark:border-black/20",
          className
        )}
        size="icon"
      >
        {/* Icon with enhanced animation */}
        <div className="relative">
          {getIcon()}
          <div className="absolute inset-0 bg-white/20 rounded-full opacity-0 group-hover:opacity-100 group-hover:animate-ping"></div>
        </div>
        <span className="sr-only">{getLabel()}</span>
        
        {/* Ripple effect on click */}
        <div className="absolute inset-0 rounded-full bg-white/30 opacity-0 group-active:opacity-100 group-active:animate-ping"></div>
      </Button>
    </div>
  );
}