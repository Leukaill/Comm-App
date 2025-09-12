import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MapPin, Users, Calendar, Clock, FileText } from "lucide-react";
import { cn } from "@/lib/utils";

interface EventDetailProps {
  event?: {
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
    imageUrl?: string;
  } | null;
  onRSVP?: (status: "going" | "maybe" | "not_going") => void;
}

export default function EventDetail({ event, onRSVP }: EventDetailProps) {
  if (!event) {
    return (
      <div className="flex-1 flex items-center justify-center min-h-[400px] bg-muted/20 rounded-lg border-2 border-dashed border-muted-foreground/20">
        <div className="text-center space-y-3">
          <Calendar className="h-12 w-12 mx-auto text-muted-foreground/40" />
          <div className="space-y-1">
            <h3 className="text-lg font-semibold text-muted-foreground">Select an event</h3>
            <p className="text-sm text-muted-foreground/70">Choose an event from the list to view details</p>
          </div>
        </div>
      </div>
    );
  }

  const getRSVPText = () => {
    switch (event.rsvpStatus) {
      case "going": return "Going";
      case "maybe": return "Maybe";
      case "not_going": return "Not Going";
      default: return "Join Event";
    }
  };

  const getRSVPVariant = () => {
    switch (event.rsvpStatus) {
      case "going": return "default";
      case "maybe": return "secondary";
      case "not_going": return "outline";
      default: return "default";
    }
  };

  return (
    <div className="flex-1 space-y-4 sm:space-y-6">
      {/* Event Header Image */}
      <div className="relative h-48 sm:h-64 lg:h-80 rounded-lg overflow-hidden bg-gradient-to-br from-blue-500 to-purple-600">
        {event.imageUrl && (
          <img 
            src={event.imageUrl} 
            alt={event.title}
            className="w-full h-full object-cover"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
        <div className="absolute bottom-4 left-4 right-4 text-white">
          <div className="flex items-start justify-between gap-4">
            <div className="space-y-2">
              <Badge variant="secondary" className="bg-white/20 text-white border-white/30 backdrop-blur-sm">
                {event.category}
              </Badge>
              <h1 className="text-2xl sm:text-3xl font-bold leading-tight">{event.title}</h1>
            </div>
            {!event.isUpcoming && (
              <Badge variant="outline" className="bg-black/30 text-white border-white/50 backdrop-blur-sm">
                Past Event
              </Badge>
            )}
          </div>
        </div>
      </div>

      {/* Event Details Cards */}
      <div className="grid gap-4 sm:gap-6">
        {/* Quick Info */}
        <Card>
          <CardContent className="p-4 sm:p-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <Calendar className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <div className="text-sm text-muted-foreground">Date</div>
                  <div className="font-semibold">{event.date}</div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <Clock className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <div className="text-sm text-muted-foreground">Time</div>
                  <div className="font-semibold">{event.time}</div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <MapPin className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <div className="text-sm text-muted-foreground">Location</div>
                  <div className="font-semibold">{event.location}</div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <Users className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <div className="text-sm text-muted-foreground">Attendees</div>
                  <div className="font-semibold">
                    {event.attendees}{event.maxAttendees && ` / ${event.maxAttendees}`}
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Description */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-lg">
              <FileText className="h-5 w-5" />
              About This Event
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <p className="text-muted-foreground leading-relaxed">{event.description}</p>
          </CardContent>
        </Card>

        {/* RSVP Section */}
        {event.isUpcoming && onRSVP && (
          <Card>
            <CardContent className="p-4 sm:p-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-semibold mb-1">Will you attend this event?</h3>
                  <p className="text-sm text-muted-foreground">Let others know if you're coming</p>
                </div>
                <div className="flex gap-2">
                  <Button
                    variant={event.rsvpStatus === "going" ? "default" : "outline"}
                    size="sm"
                    onClick={() => onRSVP("going")}
                    className={cn(
                      "transition-all",
                      event.rsvpStatus === "going" && "bg-green-600 hover:bg-green-700"
                    )}
                  >
                    Going
                  </Button>
                  <Button
                    variant={event.rsvpStatus === "maybe" ? "secondary" : "outline"}
                    size="sm"
                    onClick={() => onRSVP("maybe")}
                  >
                    Maybe
                  </Button>
                  <Button
                    variant={event.rsvpStatus === "not_going" ? "secondary" : "outline"}
                    size="sm"
                    onClick={() => onRSVP("not_going")}
                  >
                    Can't Go
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}