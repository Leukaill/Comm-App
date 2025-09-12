import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Eye, FileText, Image, FileIcon, Clock, Users } from "lucide-react";
import { cn } from "@/lib/utils";

interface NoteCardProps {
  id: string;
  title: string;
  content: string;
  category: string;
  tags: string[];
  type: "text" | "image" | "pdf";
  isRead: boolean;
  readCount: number;
  createdAt: string;
  onClick?: () => void;
}

export default function NoteCard({
  title,
  content,
  category,
  tags,
  type,
  isRead,
  readCount,
  createdAt,
  onClick
}: NoteCardProps) {
  const getTypeIcon = () => {
    switch (type) {
      case "image":
        return <Image size={16} />;
      case "pdf":
        return <FileIcon size={16} />;
      default:
        return <FileText size={16} />;
    }
  };

  const getCategoryStyle = () => {
    const styles = {
      "Training": {
        badge: "bg-gradient-to-r from-blue-500/20 to-blue-600/20 text-blue-700 dark:text-blue-300 border-blue-500/30",
        card: "border-l-blue-500 bg-gradient-to-br from-blue-500/5 via-background to-background"
      },
      "Policy": {
        badge: "bg-gradient-to-r from-green-500/20 to-green-600/20 text-green-700 dark:text-green-300 border-green-500/30",
        card: "border-l-green-500 bg-gradient-to-br from-green-500/5 via-background to-background"
      },
      "Update": {
        badge: "bg-gradient-to-r from-orange-500/20 to-orange-600/20 text-orange-700 dark:text-orange-300 border-orange-500/30",
        card: "border-l-orange-500 bg-gradient-to-br from-orange-500/5 via-background to-background"
      },
      "General": {
        badge: "bg-gradient-to-r from-gray-500/20 to-gray-600/20 text-gray-700 dark:text-gray-300 border-gray-500/30",
        card: "border-l-gray-500 bg-gradient-to-br from-gray-500/5 via-background to-background"
      }
    };
    return styles[category as keyof typeof styles] || styles.General;
  };

  const categoryStyle = getCategoryStyle();

  return (
    <Card 
      className={cn(
        "group cursor-pointer transition-all duration-300 hover:scale-[1.02] hover:shadow-xl border-l-4 backdrop-blur-sm",
        "hover:shadow-primary/10 border border-border/50",
        categoryStyle.card,
        !isRead && "shadow-lg ring-1 ring-primary/20"
      )}
      onClick={onClick}
      data-testid={`note-card-${title.toLowerCase().replace(/\s+/g, '-')}`}
    >
      {/* Unread indicator */}
      {!isRead && (
        <div className="absolute top-3 right-3 w-3 h-3 bg-primary rounded-full animate-pulse shadow-lg"></div>
      )}

      <CardHeader className="pb-3 sm:pb-4 p-3 sm:p-6 relative">
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-start gap-3 flex-1 min-w-0">
            <div className={cn(
              "p-2 rounded-lg transition-colors",
              !isRead ? "bg-primary/15" : "bg-muted/50"
            )}>
              <div className="text-primary">
                {getTypeIcon()}
              </div>
            </div>
            <div className="flex-1 min-w-0">
              <h3 className={cn(
                "font-semibold text-sm sm:text-base leading-tight mb-1",
                !isRead ? "text-foreground" : "text-muted-foreground"
              )}>
                {title}
              </h3>
              <p className="text-xs sm:text-sm text-muted-foreground line-clamp-2 leading-relaxed">
                {content}
              </p>
            </div>
          </div>
          <Badge 
            variant="secondary" 
            className={cn("text-xs shrink-0 font-medium border", categoryStyle.badge)}
          >
            {category}
          </Badge>
        </div>
      </CardHeader>
      
      <CardContent className="pt-0 px-3 sm:px-6 pb-3 sm:pb-6">
        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-4">
          {tags.slice(0, 3).map((tag) => (
            <Badge 
              key={tag} 
              variant="outline" 
              className="text-xs bg-muted/30 hover:bg-muted/50 transition-colors border-border/50"
            >
              {tag}
            </Badge>
          ))}
          {tags.length > 3 && (
            <Badge 
              variant="outline" 
              className="text-xs bg-muted/30 border-border/50 text-muted-foreground"
            >
              +{tags.length - 3} more
            </Badge>
          )}
        </div>
        
        {/* Stats */}
        <div className="flex items-center justify-between pt-2 border-t border-border/30">
          <div className="flex items-center gap-4 text-xs text-muted-foreground">
            <div className="flex items-center gap-1.5">
              <Users size={14} className="text-primary/70" />
              <span className="font-medium">{readCount} readers</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Clock size={14} className="text-primary/70" />
              <span>{createdAt}</span>
            </div>
          </div>
          
          {!isRead && (
            <div className="text-xs font-medium text-primary bg-primary/10 px-2 py-1 rounded-full">
              New
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}