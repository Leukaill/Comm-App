import { useState } from "react";
import EventCard from "@/components/EventCard";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function Events() {
  // Todo: remove mock functionality
  const [upcomingEvents] = useState([
    {
      id: "1",
      title: "Monthly Networking Breakfast",
      description: "Join fellow business professionals for coffee, networking, and meaningful connections to grow your professional network.",
      date: "Dec 15, 2024",
      time: "8:00 AM - 10:00 AM",
      location: "Downtown Business Center, Conference Room A",
      attendees: 45,
      maxAttendees: 60,
      rsvpStatus: "none" as const,
      category: "Networking",
      isUpcoming: true
    },
    {
      id: "2",
      title: "Digital Marketing Workshop",
      description: "Learn the latest digital marketing strategies and tools to grow your business online presence.",
      date: "Dec 20, 2024",
      time: "2:00 PM - 5:00 PM", 
      location: "Innovation Hub, Workshop Room 2",
      attendees: 28,
      maxAttendees: 30,
      rsvpStatus: "going" as const,
      category: "Workshop",
      isUpcoming: true
    },
    {
      id: "3",
      title: "Leadership Summit 2024",
      description: "Annual summit featuring top business leaders sharing insights on leadership, strategy, and innovation.",
      date: "Jan 10, 2025",
      time: "9:00 AM - 6:00 PM",
      location: "Grand Conference Center, Main Hall",
      attendees: 180,
      maxAttendees: 200,
      rsvpStatus: "maybe" as const,
      category: "Conference",
      isUpcoming: true
    }
  ]);

  const [pastEvents] = useState([
    {
      id: "4",
      title: "Q3 Business Review",
      description: "Quarterly review of business performance and strategic planning for Q4.",
      date: "Sep 15, 2024",
      time: "1:00 PM - 4:00 PM",
      location: "BPN Headquarters, Board Room",
      attendees: 32,
      rsvpStatus: "going" as const,
      category: "General",
      isUpcoming: false
    },
    {
      id: "5",
      title: "Summer Networking Social",
      description: "Casual networking event with food, drinks, and great conversations.",
      date: "Aug 20, 2024",
      time: "6:00 PM - 9:00 PM",
      location: "Rooftop Terrace, City Tower",
      attendees: 85,
      rsvpStatus: "going" as const,
      category: "Social",
      isUpcoming: false
    }
  ]);

  const [rsvpStatuses, setRsvpStatuses] = useState<Record<string, "none" | "going" | "maybe" | "not_going">>({});

  const handleRSVP = (eventId: string, status: "going" | "maybe" | "not_going") => {
    setRsvpStatuses(prev => ({
      ...prev,
      [eventId]: status
    }));
    console.log(`RSVP for event ${eventId}: ${status}`);
  };

  return (
    <div className="flex-1 flex flex-col h-full">
      <header className="bg-card border-b border-border px-4 py-3">
        <h1 className="text-xl font-semibold" data-testid="page-title">
          Events
        </h1>
      </header>

      <Tabs defaultValue="upcoming" className="flex-1 flex flex-col">
        <div className="px-4 pt-2">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="upcoming" data-testid="tab-upcoming">
              Upcoming
            </TabsTrigger>
            <TabsTrigger value="past" data-testid="tab-past">
              Past Events
            </TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="upcoming" className="flex-1 mt-0">
          <ScrollArea className="h-full">
            <div className="p-4 space-y-4 pb-24">
              {upcomingEvents.map((event) => (
                <EventCard
                  key={event.id}
                  {...event}
                  rsvpStatus={rsvpStatuses[event.id] || event.rsvpStatus}
                  onRSVP={(status) => handleRSVP(event.id, status)}
                />
              ))}
            </div>
          </ScrollArea>
        </TabsContent>

        <TabsContent value="past" className="flex-1 mt-0">
          <ScrollArea className="h-full">
            <div className="p-4 space-y-4 pb-24">
              {pastEvents.map((event) => (
                <EventCard
                  key={event.id}
                  {...event}
                  rsvpStatus={rsvpStatuses[event.id] || event.rsvpStatus}
                  onRSVP={(status) => handleRSVP(event.id, status)}
                />
              ))}
            </div>
          </ScrollArea>
        </TabsContent>
      </Tabs>
    </div>
  );
}