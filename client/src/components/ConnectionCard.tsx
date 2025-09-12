import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import UserAvatar from "./UserAvatar";
import { Badge } from "@/components/ui/badge";
import { MapPin, Briefcase } from "lucide-react";

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
            className="flex-1"
          >
            Message
          </Button>
        );
      case "pending":
        return (
          <Button 
            variant="secondary" 
            size="sm" 
            disabled
            className="flex-1"
          >
            Pending
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
            className="flex-1"
          >
            Connect
          </Button>
        );
    }
  };

  return (
    <Card className="hover-elevate transition-all" data-testid={`connection-card-${name.toLowerCase().replace(/\s+/g, '-')}`}>
      <CardContent className="p-4">
        <div className="flex items-start gap-3">
          <UserAvatar 
            name={name} 
            src={avatar} 
            size="lg"
            showStatus
            status="online"
          />
          
          <div className="flex-1 min-w-0 space-y-2">
            <div>
              <h3 className="font-semibold text-sm leading-tight truncate">
                {name}
              </h3>
              <div className="flex items-center gap-1 text-xs text-muted-foreground mt-1">
                <Briefcase size={12} />
                <span className="truncate">{title} at {company}</span>
              </div>
              <div className="flex items-center gap-1 text-xs text-muted-foreground mt-1">
                <MapPin size={12} />
                <span>{location}</span>
              </div>
            </div>
            
            {mutualConnections > 0 && (
              <p className="text-xs text-muted-foreground">
                {mutualConnections} mutual connection{mutualConnections !== 1 ? 's' : ''}
              </p>
            )}
            
            <div className="flex flex-wrap gap-1">
              {skills.slice(0, 3).map((skill) => (
                <Badge key={skill} variant="outline" className="text-xs">
                  {skill}
                </Badge>
              ))}
              {skills.length > 3 && (
                <Badge variant="outline" className="text-xs">
                  +{skills.length - 3}
                </Badge>
              )}
            </div>
            
            <div className="flex gap-2 pt-1">
              {getActionButton()}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}