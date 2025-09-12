import { useState } from "react";
import PostCard from "@/components/PostCard";
import NotificationBanner from "@/components/NotificationBanner";
import FloatingActionButton from "@/components/FloatingActionButton";
import { ScrollArea } from "@/components/ui/scroll-area";

export default function Home() {
  // Todo: remove mock functionality
  const [notifications, setNotifications] = useState([
    {
      id: "1",
      type: "event" as const,
      title: "Networking Event Tomorrow",
      message: "Monthly Networking Breakfast at 8 AM",
      timestamp: "10 minutes ago",
      isRead: false,
      actionLabel: "View Event"
    }
  ]);

  const [posts] = useState([
    {
      id: "1",
      author: {
        name: "Sarah Wilson",
        title: "Marketing Director at TechCorp",
        avatar: undefined
      },
      content: "Just completed an amazing project with the BPN community! The collaboration and support from fellow professionals has been incredible. Looking forward to sharing insights at next week's networking event.",
      timestamp: "2 hours ago",
      likes: 24,
      comments: 8,
      isLiked: false,
      expiresIn: "28 days"
    },
    {
      id: "2",
      author: {
        name: "Michael Chen", 
        title: "Senior Consultant",
        avatar: undefined
      },
      content: "Excited to announce that our team just secured a major partnership! Thanks to the connections made through BPN. Networking really works when you put in the effort.",
      timestamp: "5 hours ago",
      likes: 42,
      comments: 15,
      isLiked: true,
      expiresIn: "27 days"
    },
    {
      id: "3",
      author: {
        name: "Alice Johnson",
        title: "Product Manager at InnovateTech",
        avatar: undefined
      },
      content: "Looking for feedback on our new product launch strategy. Anyone with experience in B2B SaaS launches available for a quick chat?",
      timestamp: "1 day ago",
      likes: 18,
      comments: 12,
      isLiked: false,
      expiresIn: "26 days"
    }
  ]);

  const handleDismissNotification = (id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  return (
    <div className="flex-1 flex flex-col h-full">
      <header className="bg-card border-b border-border px-4 py-3">
        <h1 className="text-xl font-semibold" data-testid="page-title">
          Home Feed
        </h1>
      </header>

      <ScrollArea className="flex-1">
        <div className="p-4 space-y-4 pb-24">
          {/* Notifications */}
          {notifications.map((notification) => (
            <NotificationBanner
              key={notification.id}
              {...notification}
              onDismiss={() => handleDismissNotification(notification.id)}
              onAction={() => console.log(`Notification action: ${notification.title}`)}
            />
          ))}

          {/* Posts Feed */}
          <div className="space-y-4">
            {posts.map((post) => (
              <PostCard
                key={post.id}
                {...post}
                onLike={() => console.log(`Liked post: ${post.id}`)}
                onComment={() => console.log(`Comment on post: ${post.id}`)}
                onShare={() => console.log(`Share post: ${post.id}`)}
              />
            ))}
          </div>
        </div>
      </ScrollArea>

      <FloatingActionButton
        type="post"
        onClick={() => console.log("Create new post")}
      />
    </div>
  );
}