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
    <Card className="hover-elevate transition-all" data-testid={`post-card-${author.name.toLowerCase().replace(/\s+/g, '-')}`}>
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3 flex-1 min-w-0">
            <UserAvatar 
              name={author.name} 
              src={author.avatar} 
              size="md"
              showStatus 
              status="online"
            />
            <div className="flex-1 min-w-0">
              <h4 className="font-medium text-sm truncate">{author.name}</h4>
              <p className="text-xs text-muted-foreground truncate">{author.title}</p>
              <p className="text-xs text-muted-foreground">{timestamp}</p>
            </div>
          </div>
          <Button variant="ghost" size="sm" data-testid="button-post-menu">
            <MoreHorizontal size={16} />
          </Button>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <p className="text-sm leading-relaxed">
          {content}
        </p>
        
        <div className="flex items-center justify-between text-xs text-muted-foreground border-t pt-3">
          <span>Expires in {expiresIn}</span>
          <span>{likeCount} likes • {comments} comments</span>
        </div>
        
        <div className="flex items-center justify-around border-t pt-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={handleLike}
            data-testid="button-like"
            className={cn(
              "flex items-center gap-2 flex-1",
              liked && "text-red-500"
            )}
          >
            <Heart size={16} className={liked ? "fill-current" : ""} />
            <span className="text-xs">Like</span>
          </Button>
          
          <Button
            variant="ghost"
            size="sm"
            onClick={() => {
              onComment();
              console.log("Comment clicked");
            }}
            data-testid="button-comment"
            className="flex items-center gap-2 flex-1"
          >
            <MessageCircle size={16} />
            <span className="text-xs">Comment</span>
          </Button>
          
          <Button
            variant="ghost"
            size="sm"
            onClick={() => {
              onShare();
              console.log("Share clicked");
            }}
            data-testid="button-share"
            className="flex items-center gap-2 flex-1"
          >
            <Share size={16} />
            <span className="text-xs">Share</span>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}