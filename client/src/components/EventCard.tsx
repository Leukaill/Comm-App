import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, MapPin, Users, Clock } from "lucide-react";
import { cn } from "@/lib/utils";

interface EventCardProps {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  attendees: number;
  maxAttendees?: number;
  rsvpStatus: "none" | "going" | "maybe" | "not_going";
  category: string;
  isUpcoming: boolean;
  onRSVP: (status: "going" | "maybe" | "not_going") => void;
}

export default function EventCard({
  title,
  description,
  date,
  time,
  location,
  attendees,
  maxAttendees,
  rsvpStatus,
  category,
  isUpcoming,
  onRSVP
}: EventCardProps) {
  const getCategoryColor = () => {
    const colors = {
      "Networking": "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300",
      "Workshop": "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300", 
      "Conference": "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300",
      "Social": "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300"
    };
    return colors[category as keyof typeof colors] || colors.Networking;
  };

  const getRSVPButtonVariant = () => {
    switch (rsvpStatus) {
      case "going":
        return "default";
      case "maybe":
        return "secondary";
      case "not_going":
        return "outline";
      default:
        return "outline";
    }
  };

  const getRSVPText = () => {
    switch (rsvpStatus) {
      case "going":
        return "Going";
      case "maybe":
        return "Maybe";
      case "not_going":
        return "Not Going";
      default:
        return "RSVP";
    }
  };

  return (
    <Card className="hover-elevate transition-all" data-testid={`event-card-${title.toLowerCase().replace(/\s+/g, '-')}`}>
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-2">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <Badge variant="secondary" className={cn("text-xs", getCategoryColor())}>
                {category}
              </Badge>
              {!isUpcoming && (
                <Badge variant="outline" className="text-xs">
                  Past Event
                </Badge>
              )}
            </div>
            <h3 className="font-semibold text-base leading-tight">
              {title}
            </h3>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <p className="text-sm text-muted-foreground line-clamp-2">
          {description}
        </p>
        
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-sm">
            <Calendar size={16} className="text-muted-foreground" />
            <span>{date}</span>
          </div>
          
          <div className="flex items-center gap-2 text-sm">
            <Clock size={16} className="text-muted-foreground" />
            <span>{time}</span>
          </div>
          
          <div className="flex items-center gap-2 text-sm">
            <MapPin size={16} className="text-muted-foreground" />
            <span className="truncate">{location}</span>
          </div>
          
          <div className="flex items-center gap-2 text-sm">
            <Users size={16} className="text-muted-foreground" />
            <span>
              {attendees} attending
              {maxAttendees && ` (${maxAttendees} max)`}
            </span>
          </div>
        </div>
        
        {isUpcoming && (
          <div className="flex gap-2 pt-2">
            <Button
              variant={getRSVPButtonVariant()}
              size="sm"
              onClick={() => {
                const newStatus = rsvpStatus === "going" ? "none" : "going";
                onRSVP(newStatus as "going");
                console.log(`RSVP: ${newStatus}`);
              }}
              data-testid="button-rsvp"
              className="flex-1"
            >
              {getRSVPText()}
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}