import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Eye, FileText, Image, FileIcon } from "lucide-react";
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

  const getCategoryColor = () => {
    const colors = {
      "Training": "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300",
      "Policy": "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
      "Update": "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300",
      "General": "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300"
    };
    return colors[category as keyof typeof colors] || colors.General;
  };

  return (
    <Card 
      className={cn(
        "hover-elevate cursor-pointer transition-all",
        !isRead && "border-l-4 border-l-primary"
      )}
      onClick={onClick}
      data-testid={`note-card-${title.toLowerCase().replace(/\s+/g, '-')}`}
    >
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-2">
          <div className="flex items-center gap-2 flex-1 min-w-0">
            {getTypeIcon()}
            <h3 className={cn(
              "font-medium text-sm leading-tight truncate",
              !isRead && "font-semibold"
            )}>
              {title}
            </h3>
          </div>
          <Badge variant="secondary" className={cn("text-xs shrink-0", getCategoryColor())}>
            {category}
          </Badge>
        </div>
      </CardHeader>
      
      <CardContent className="pt-0">
        <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
          {content}
        </p>
        
        <div className="flex items-center justify-between">
          <div className="flex flex-wrap gap-1">
            {tags.slice(0, 2).map((tag) => (
              <Badge key={tag} variant="outline" className="text-xs">
                {tag}
              </Badge>
            ))}
            {tags.length > 2 && (
              <Badge variant="outline" className="text-xs">
                +{tags.length - 2}
              </Badge>
            )}
          </div>
          
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <div className="flex items-center gap-1">
              <Eye size={12} />
              <span>{readCount}</span>
            </div>
            <span>{createdAt}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}