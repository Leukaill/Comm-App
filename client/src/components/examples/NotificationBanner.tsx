import NotificationBanner from '../NotificationBanner';
import { useState } from 'react';

export default function NotificationBannerExample() {
  const [notifications, setNotifications] = useState([
    {
      id: "1",
      type: "event" as const,
      title: "Networking Event Tomorrow",
      message: "Don't forget about the Monthly Networking Breakfast at 8 AM",
      timestamp: "10 minutes ago",
      isRead: false,
      actionLabel: "View Event"
    },
    {
      id: "2",
      type: "connection" as const,
      title: "New Connection Request",
      message: "Sarah Wilson wants to connect with you",
      timestamp: "1 hour ago",
      isRead: false,
      actionLabel: "Accept"
    },
    {
      id: "3",
      type: "note" as const,
      title: "New Note Available",
      message: "Professional Development Guidelines has been shared",
      timestamp: "2 hours ago",
      isRead: true,
      actionLabel: "Read Now"
    },
    {
      id: "4",
      type: "like" as const,
      title: "Your Post Got Likes",
      message: "5 people liked your recent post about project success",
      timestamp: "4 hours ago",
      isRead: true
    }
  ]);

  const handleDismiss = (id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  return (
    <div className="p-4 space-y-2 max-w-md">
      <h3 className="font-semibold mb-4">Notifications</h3>
      {notifications.map((notification) => (
        <NotificationBanner
          key={notification.id}
          {...notification}
          onDismiss={() => handleDismiss(notification.id)}
          onAction={() => console.log(`Action for ${notification.title}`)}
        />
      ))}
    </div>
  );
}