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
    <Button
      onClick={() => {
        onClick();
        console.log(`${getLabel()} clicked`);
      }}
      data-testid={`fab-${type}`}
      className={cn(
        "fixed bottom-20 right-4 h-14 w-14 rounded-full shadow-lg hover:shadow-xl transition-all z-50",
        "hover:scale-105 active:scale-95",
        className
      )}
      size="icon"
    >
      {getIcon()}
      <span className="sr-only">{getLabel()}</span>
    </Button>
  );
}