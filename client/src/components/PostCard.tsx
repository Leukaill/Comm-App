import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import UserAvatar from "./UserAvatar";
import { Heart, MessageCircle, Share, MoreHorizontal } from "lucide-react";
import { cn } from "@/lib/utils";
import { useState } from "react";

interface PostCardProps {
  id: string;
  author: {
    name: string;
    avatar?: string;
    title: string;
  };
  content: string;
  timestamp: string;
  likes: number;
  comments: number;
  isLiked: boolean;
  expiresIn: string;
  onLike: () => void;
  onComment: () => void;
  onShare: () => void;
}

export default function PostCard({
  author,
  content,
  timestamp,
  likes,
  comments,
  isLiked,
  expiresIn,
  onLike,
  onComment,
  onShare
}: PostCardProps) {
  const [liked, setLiked] = useState(isLiked);
  const [likeCount, setLikeCount] = useState(likes);

  const handleLike = () => {
    setLiked(!liked);
    setLikeCount(prev => liked ? prev - 1 : prev + 1);
    onLike();
    console.log("Post liked:", !liked);
  };

  return (
    <Card className="hover-elevate transition-all duration-300 hover:shadow-lg hover:shadow-primary/5 border-border/50 bg-card/95 backdrop-blur-sm group" data-testid={`post-card-${author.name.toLowerCase().replace(/\s+/g, '-')}`}>
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3 flex-1 min-w-0">
            <div className="relative">
              <UserAvatar 
                name={author.name} 
                src={author.avatar} 
                size="md"
                showStatus 
                status="online"
                className="ring-2 ring-primary/10 group-hover:ring-primary/20 transition-all duration-300"
              />
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>
            <div className="flex-1 min-w-0 space-y-0.5">
              <h4 className="font-semibold text-sm truncate text-foreground group-hover:text-primary transition-colors duration-300">{author.name}</h4>
              <p className="text-xs text-muted-foreground truncate font-medium">{author.title}</p>
              <p className="text-xs text-muted-foreground/80">{timestamp}</p>
            </div>
          </div>
          <Button variant="ghost" size="sm" data-testid="button-post-menu" className="opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-primary/10">
            <MoreHorizontal size={16} />
          </Button>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-5">
        <p className="text-sm leading-relaxed text-foreground/90 font-medium">
          {content}
        </p>
        
        <div className="flex items-center justify-between text-xs text-muted-foreground border-t border-border/30 pt-3">
          <div className="flex items-center gap-1">
            <div className="w-1.5 h-1.5 bg-primary/60 rounded-full animate-pulse"></div>
            <span className="font-medium">Expires in {expiresIn}</span>
          </div>
          <span className="font-medium">{likeCount} likes • {comments} comments</span>
        </div>
        
        <div className="flex items-center justify-around border-t border-border/30 pt-3 bg-gradient-to-r from-background/50 to-muted/20 -mx-6 px-6 py-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={handleLike}
            data-testid="button-like"
            className={cn(
              "flex items-center gap-2 flex-1 h-9 transition-all duration-300 hover:scale-105",
              liked 
                ? "text-red-500 bg-red-50 hover:bg-red-100 dark:bg-red-950 dark:hover:bg-red-900" 
                : "hover:bg-primary/10 hover:text-primary"
            )}
          >
            <Heart size={16} className={cn(
              "transition-all duration-300",
              liked ? "fill-current scale-110" : "hover:scale-110"
            )} />
            <span className="text-xs font-semibold">Like</span>
          </Button>
          
          <Button
            variant="ghost"
            size="sm"
            onClick={() => {
              onComment();
              console.log("Comment clicked");
            }}
            data-testid="button-comment"
            className="flex items-center gap-2 flex-1 h-9 transition-all duration-300 hover:scale-105 hover:bg-blue-50 hover:text-blue-600 dark:hover:bg-blue-950 dark:hover:text-blue-400"
          >
            <MessageCircle size={16} className="transition-transform duration-300 hover:scale-110" />
            <span className="text-xs font-semibold">Comment</span>
          </Button>
          
          <Button
            variant="ghost"
            size="sm"
            onClick={() => {
              onShare();
              console.log("Share clicked");
            }}
            data-testid="button-share"
            className="flex items-center gap-2 flex-1 h-9 transition-all duration-300 hover:scale-105 hover:bg-green-50 hover:text-green-600 dark:hover:bg-green-950 dark:hover:text-green-400"
          >
            <Share size={16} className="transition-transform duration-300 hover:scale-110" />
            <span className="text-xs font-semibold">Share</span>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}