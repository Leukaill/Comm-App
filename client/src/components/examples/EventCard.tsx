import EventCard from '../EventCard';
import { useState } from 'react';

export default function EventCardExample() {
  const [rsvpStatus, setRsvpStatus] = useState<"none" | "going" | "maybe" | "not_going">("none");

  const sampleEvents = [
    {
      id: "1",
      title: "Monthly Networking Breakfast",
      description: "Join fellow business professionals for coffee, networking, and meaningful connections to grow your professional network.",
      date: "Dec 15, 2024",
      time: "8:00 AM - 10:00 AM",
      location: "Downtown Business Center, Conference Room A",
      attendees: 45,
      maxAttendees: 60,
      rsvpStatus,
      category: "Networking",
      isUpcoming: true,
      onRSVP: setRsvpStatus
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
      onRSVP: () => console.log("Workshop RSVP")
    }
  ];

  return (
    <div className="p-4 space-y-4 max-w-md">
      {sampleEvents.map((event) => (
        <EventCard key={event.id} {...event} />
      ))}
    </div>
  );
}