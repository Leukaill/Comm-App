import { useState } from "react";
import EventCard from "@/components/EventCard";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { CalendarIcon, List } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export default function Events() {
  const [selectedDate, setSelectedDate] = useState<Date>();
  const [showCalendar, setShowCalendar] = useState(false);
  
  // Todo: remove mock functionality
  const [upcomingEvents] = useState([
    {
      id: "1",
      title: "Monthly Networking Breakfast",
      description: "Join fellow business professionals for coffee, networking, and meaningful connections to grow your professional network.",
      date: "Dec 15, 2024",
      time: "8:00 AM - 10:00 AM",
      location: "Downtown Business Center",
      attendees: 45,
      maxAttendees: 60,
      rsvpStatus: "none" as const,
      category: "Networking",
      isUpcoming: true,
      imageUrl: "/attached_assets/generated_images/Business_networking_event_photo_ca3a4065.png"
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
      isUpcoming: true,
      imageUrl: "/attached_assets/generated_images/Platform_technology_update_c5bd0381.png"
    },
    {
      id: "3",
      title: "Leadership Summit 2024",
      description: "Annual summit featuring top business leaders sharing insights on leadership, strategy, and innovation.",
      date: "Jan 10, 2025",
      time: "9:00 AM - 6:00 PM",
      location: "Grand Conference Center",
      attendees: 180,
      maxAttendees: 200,
      rsvpStatus: "maybe" as const,
      category: "Conference",
      isUpcoming: true,
      imageUrl: "/attached_assets/generated_images/BPN_Summit_conference_event_460b63ec.png"
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
      isUpcoming: false,
      imageUrl: "/attached_assets/generated_images/Business_partnership_program_ed21ecb5.png"
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
      isUpcoming: false,
      imageUrl: "/attached_assets/generated_images/50K_members_milestone_celebration_5748fd5a.png"
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

  // Combine all events for calendar view
  const allEvents = [...upcomingEvents, ...pastEvents];

  // Get events for a specific date
  const getEventsForDate = (date: Date) => {
    return allEvents.filter(event => {
      const eventDate = new Date(event.date);
      return eventDate.toDateString() === date.toDateString();
    });
  };

  // Get dates that have events for calendar highlighting
  const getEventDates = () => {
    return allEvents.map(event => new Date(event.date));
  };

  const eventDates = getEventDates();

  return (
    <div className="flex-1 flex flex-col h-full bg-background">
      <header className="bg-card border-b border-border px-4 sm:px-6 lg:px-8 py-3 sm:py-4 shrink-0">
        <div className="flex items-center justify-between">
          <h1 className="text-xl sm:text-2xl lg:text-3xl font-semibold" data-testid="page-title">
            Events
          </h1>
          <Dialog open={showCalendar} onOpenChange={setShowCalendar}>
            <DialogTrigger asChild>
              <Button variant="outline" size="sm" data-testid="button-calendar">
                <CalendarIcon className="h-4 w-4 mr-2" />
                Calendar
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-md">
              <DialogHeader>
                <DialogTitle>Event Calendar</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={setSelectedDate}
                  modifiers={{
                    hasEvent: eventDates
                  }}
                  modifiersStyles={{
                    hasEvent: {
                      backgroundColor: 'hsl(var(--primary))',
                      color: 'hsl(var(--primary-foreground))',
                      fontWeight: 'bold'
                    }
                  }}
                  className="rounded-md border"
                  data-testid="event-calendar"
                />
                {selectedDate && (
                  <div className="space-y-2">
                    <h3 className="font-semibold text-sm">
                      Events on {selectedDate.toLocaleDateString()}
                    </h3>
                    {getEventsForDate(selectedDate).length > 0 ? (
                      <div className="space-y-2 max-h-40 overflow-y-auto">
                        {getEventsForDate(selectedDate).map((event) => (
                          <div
                            key={event.id}
                            className="p-2 border rounded-md text-sm space-y-1"
                            data-testid={`calendar-event-${event.id}`}
                          >
                            <div className="font-medium">{event.title}</div>
                            <div className="text-muted-foreground text-xs">
                              {event.time}
                            </div>
                            <div className="flex items-center gap-1">
                              <Badge variant="secondary" className="text-xs">
                                {event.category}
                              </Badge>
                              {event.isUpcoming && (
                                <Badge variant="outline" className="text-xs">
                                  Upcoming
                                </Badge>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-sm text-muted-foreground">
                        No events on this date
                      </p>
                    )}
                  </div>
                )}
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </header>

      <Tabs defaultValue="upcoming" className="flex-1 flex flex-col min-h-0">
        <div className="px-4 sm:px-6 lg:px-8 pt-3 pb-2 shrink-0">
          <TabsList className="grid w-full grid-cols-2 h-10 sm:h-11">
            <TabsTrigger value="upcoming" data-testid="tab-upcoming">
              Upcoming
            </TabsTrigger>
            <TabsTrigger value="past" data-testid="tab-past">
              Past Events
            </TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="upcoming" className="flex-1 min-h-0">
          <div className="h-full overflow-y-auto">
            <div className="container mx-auto max-w-screen-2xl p-4 sm:p-6 lg:p-8 space-y-4 sm:space-y-6 pb-[calc(env(safe-area-inset-bottom)+80px)] md:pb-6">
              {upcomingEvents.map((event) => (
                <EventCard
                  key={event.id}
                  {...event}
                  rsvpStatus={rsvpStatuses[event.id] || event.rsvpStatus}
                  onRSVP={(status) => handleRSVP(event.id, status)}
                />
              ))}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="past" className="flex-1 min-h-0">
          <div className="h-full overflow-y-auto">
            <div className="container mx-auto max-w-screen-2xl p-4 sm:p-6 lg:p-8 space-y-4 sm:space-y-6 pb-[calc(env(safe-area-inset-bottom)+80px)] md:pb-6">
              {pastEvents.map((event) => (
                <EventCard
                  key={event.id}
                  {...event}
                  rsvpStatus={rsvpStatuses[event.id] || event.rsvpStatus}
                  onRSVP={(status) => handleRSVP(event.id, status)}
                />
              ))}
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}