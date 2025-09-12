import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import UserAvatar from "./UserAvatar";
import { Badge } from "@/components/ui/badge";
import { MapPin, Briefcase, Users } from "lucide-react";

interface ConnectionCardProps {
  id: string;
  name: string;
  title: string;
  company: string;
  location: string;
  avatar?: string;
  mutualConnections: number;
  skills: string[];
  status: "none" | "pending" | "connected";
  onConnect: () => void;
  onMessage?: () => void;
}

export default function ConnectionCard({
  name,
  title,
  company,
  location,
  avatar,
  mutualConnections,
  skills,
  status,
  onConnect,
  onMessage
}: ConnectionCardProps) {
  const getActionButton = () => {
    switch (status) {
      case "connected":
        return (
          <Button 
            variant="outline" 
            size="sm" 
            onClick={onMessage}
            data-testid="button-message"
            className="flex-1 h-9 font-semibold border-2 border-green-200 text-green-700 hover:bg-green-50 hover:border-green-300 hover:scale-105 transition-all duration-300 dark:border-green-800 dark:text-green-400 dark:hover:bg-green-950"
          >
            💬 Message
          </Button>
        );
      case "pending":
        return (
          <Button 
            variant="secondary" 
            size="sm" 
            disabled
            className="flex-1 h-9 font-semibold bg-orange-50 text-orange-600 border-2 border-orange-200 dark:bg-orange-950 dark:text-orange-400 dark:border-orange-800"
          >
            ⏳ Pending
          </Button>
        );
      default:
        return (
          <Button 
            variant="default" 
            size="sm" 
            onClick={() => {
              onConnect();
              console.log(`Connect request sent to ${name}`);
            }}
            data-testid="button-connect"
            className="flex-1 h-9 font-semibold bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary shadow-lg hover:shadow-xl hover:shadow-primary/30 transition-all duration-300 hover:scale-105"
          >
            🤝 Connect
          </Button>
        );
    }
  };

  return (
    <Card className="hover-elevate transition-all duration-300 hover:shadow-xl hover:shadow-primary/10 border-border/50 bg-card/95 backdrop-blur-sm group overflow-hidden relative" data-testid={`connection-card-${name.toLowerCase().replace(/\s+/g, '-')}`}>
      {/* Subtle gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      
      <CardContent className="p-5 relative">
        <div className="flex items-start gap-4">
          <div className="relative">
            <UserAvatar 
              name={name} 
              src={avatar} 
              size="lg"
              showStatus
              status="online"
              className="ring-2 ring-primary/10 group-hover:ring-primary/20 transition-all duration-300 shadow-lg"
            />
            {/* Professional badge indicator */}
            <div className="absolute -top-1 -right-1 w-5 h-5 bg-gradient-to-r from-primary to-primary/80 rounded-full flex items-center justify-center shadow-lg">
              <Briefcase size={10} className="text-primary-foreground" />
            </div>
          </div>
          
          <div className="flex-1 min-w-0 space-y-3">
            <div className="space-y-1.5">
              <h3 className="font-bold text-base leading-tight truncate text-foreground group-hover:text-primary transition-colors duration-300">
                {name}
              </h3>
              <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                <div className="w-1.5 h-1.5 bg-primary/60 rounded-full"></div>
                <span className="truncate font-medium">{title}</span>
              </div>
              <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                <div className="w-1.5 h-1.5 bg-secondary/60 rounded-full"></div>
                <span className="truncate">{company}</span>
              </div>
              <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                <MapPin size={12} className="text-primary/60" />
                <span>{location}</span>
              </div>
            </div>
            
            {mutualConnections > 0 && (
              <div className="flex items-center gap-1.5 text-xs">
                <Users size={12} className="text-primary/60" />
                <span className="text-primary font-medium">
                  {mutualConnections} mutual connection{mutualConnections !== 1 ? 's' : ''}
                </span>
              </div>
            )}
            
            <div className="flex flex-wrap gap-1.5">
              {skills.slice(0, 3).map((skill) => (
                <Badge 
                  key={skill} 
                  variant="secondary" 
                  className="text-xs font-medium bg-primary/10 text-primary border-primary/20 hover:bg-primary/20 transition-colors duration-300"
                >
                  {skill}
                </Badge>
              ))}
              {skills.length > 3 && (
                <Badge 
                  variant="outline" 
                  className="text-xs bg-muted/50 border-muted-foreground/20"
                >
                  +{skills.length - 3} more
                </Badge>
              )}
            </div>
            
            <div className="flex gap-2 pt-2">
              {getActionButton()}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}