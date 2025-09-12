import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MapPin, Users } from "lucide-react";
import { cn } from "@/lib/utils";

// Import images
import networkingImage from "@assets/generated_images/Business_networking_event_photo_ca3a4065.png";
import workshopImage from "@assets/generated_images/Platform_technology_update_c5bd0381.png";
import summitImage from "@assets/generated_images/BPN_Summit_conference_event_460b63ec.png";
import partnershipImage from "@assets/generated_images/Business_partnership_program_ed21ecb5.png";
import celebrationImage from "@assets/generated_images/50K_members_milestone_celebration_5748fd5a.png";

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
  imageUrl?: string;
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
  imageUrl,
  onRSVP
}: EventCardProps) {
  // Parse date to get day and month for the date badge
  const parseDate = (dateStr: string) => {
    const parsedDate = new Date(dateStr);
    const day = parsedDate.getDate().toString();
    const month = parsedDate.toLocaleDateString('en-US', { month: 'short' }).toUpperCase();
    return { day, month };
  };

  const { day, month } = parseDate(date);

  // Map titles to imported images
  const getEventImage = () => {
    if (title.includes('Networking')) return networkingImage;
    if (title.includes('Workshop') || title.includes('Marketing')) return workshopImage;
    if (title.includes('Summit') || title.includes('Leadership')) return summitImage;
    if (title.includes('Review') || title.includes('Business')) return partnershipImage;
    if (title.includes('Social') || title.includes('Summer')) return celebrationImage;
    return networkingImage; // fallback
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
        return "Join";
    }
  };

  const getLocationDistance = () => {
    // Mock distance - in real app this would be calculated
    return `${Math.floor(Math.random() * 5) + 1} km`;
  };

  return (
    <Card 
      className={cn(
        "overflow-hidden hover-elevate transition-all duration-200 border-0 shadow-md",
        isUpcoming ? "shadow-lg" : "opacity-75"
      )} 
      data-testid={`event-card-${title.toLowerCase().replace(/\s+/g, '-')}`}
    >
      {/* Hero Image Section */}
      <div className="relative h-32 sm:h-40 md:h-44 bg-gradient-to-br from-blue-500 to-purple-600 overflow-hidden">
        <img 
          src={getEventImage()}
          alt={title}
          className="w-full h-full object-cover"
        />
        
        {/* Date Badge */}
        <div className="absolute top-3 left-3 bg-white rounded-lg p-2 shadow-md min-w-[48px] text-center">
          <div className="text-lg font-bold text-blue-600 leading-none">{day}</div>
          <div className="text-xs font-medium text-gray-600 leading-none mt-0.5">{month}</div>
        </div>

        {/* Category Badge */}
        {!isUpcoming && (
          <div className="absolute top-3 right-3">
            <Badge variant="secondary" className="bg-black/20 text-white border-0 backdrop-blur-sm">
              Past Event
            </Badge>
          </div>
        )}
      </div>

      {/* Content Section */}
      <CardContent className="p-3 sm:p-4 lg:p-5">
        <div className="space-y-3">
          {/* Title and Time */}
          <div>
            <h3 className="font-semibold text-base sm:text-lg md:text-xl leading-tight mb-1 sm:mb-2">
              {title}
            </h3>
            <p className="text-xs sm:text-sm md:text-base text-muted-foreground">
              {time}
            </p>
          </div>

          {/* Location and Distance */}
          <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
            <MapPin className="w-3 h-3 sm:w-4 sm:h-4" />
            <span className="truncate flex-1">{location}</span>
            <span className="text-blue-600 font-medium">{getLocationDistance()}</span>
          </div>

          {/* Attendees and Join Button */}
          <div className="flex items-center justify-between gap-3 pt-1">
            <div className="flex items-center gap-2">
              {/* Mock attendee avatars */}
              <div className="flex -space-x-2">
                <div className="w-6 h-6 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 border-2 border-white"></div>
                <div className="w-6 h-6 rounded-full bg-gradient-to-br from-green-400 to-green-600 border-2 border-white"></div>
                <div className="w-6 h-6 rounded-full bg-gradient-to-br from-purple-400 to-purple-600 border-2 border-white"></div>
              </div>
              <span className="text-sm font-medium text-blue-600">
                +{attendees} Attending
              </span>
            </div>

            {isUpcoming && (
              <Button
                onClick={() => {
                  const newStatus = rsvpStatus === "going" ? "none" : "going";
                  onRSVP(newStatus as "going");
                }}
                size="sm"
                className={cn(
                  "px-6 py-2 rounded-full font-medium transition-all",
                  rsvpStatus === "going" 
                    ? "bg-green-600 hover:bg-green-700 text-white" 
                    : "bg-blue-600 hover:bg-blue-700 text-white"
                )}
                data-testid="button-rsvp"
              >
                {getRSVPText()}
              </Button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}