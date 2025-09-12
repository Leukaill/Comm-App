import { Calendar, Users, FileText, MessageSquare, Award, MapPin, Phone, Mail } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface QuickAction {
  id: string;
  icon: any;
  title: string;
  subtitle: string;
  color: string;
  bgGradient: string;
  route?: string;
  action: () => void;
}

const quickActions: QuickAction[] = [
  {
    id: "upcoming-events",
    icon: Calendar,
    title: "Events",
    subtitle: "3 upcoming",
    color: "text-blue-600",
    bgGradient: "from-blue-500/10 to-blue-600/5",
    route: "events",
    action: () => console.log("Navigate to events")
  },
  {
    id: "connect-members",
    icon: Users,
    title: "Connect",
    subtitle: "Find professionals",
    color: "text-green-600", 
    bgGradient: "from-green-500/10 to-green-600/5",
    route: "network",
    action: () => console.log("Navigate to network")
  },
  {
    id: "notes-resources",
    icon: FileText,
    title: "Resources",
    subtitle: "Guides & docs",
    color: "text-purple-600",
    bgGradient: "from-purple-500/10 to-purple-600/5", 
    action: () => console.log("Navigate to notes")
  },
  {
    id: "support-chat",
    icon: MessageSquare,
    title: "Support",
    subtitle: "Get help",
    color: "text-orange-600",
    bgGradient: "from-orange-500/10 to-orange-600/5",
    action: () => console.log("Open support")
  },
  {
    id: "achievements",
    icon: Award,
    title: "Achievements",
    subtitle: "Your progress",
    color: "text-yellow-600",
    bgGradient: "from-yellow-500/10 to-yellow-600/5",
    action: () => console.log("View achievements")
  },
  {
    id: "locations",
    icon: MapPin,
    title: "Locations",
    subtitle: "Find nearby",
    color: "text-red-600",
    bgGradient: "from-red-500/10 to-red-600/5",
    action: () => console.log("View locations")
  },
  {
    id: "contact-us",
    icon: Phone,
    title: "Contact",
    subtitle: "Reach out",
    color: "text-indigo-600",
    bgGradient: "from-indigo-500/10 to-indigo-600/5",
    action: () => console.log("Contact us")
  },
  {
    id: "newsletter",
    icon: Mail,
    title: "Newsletter",
    subtitle: "Stay updated",
    color: "text-pink-600",
    bgGradient: "from-pink-500/10 to-pink-600/5",
    action: () => console.log("Subscribe newsletter")
  }
];

export default function QuickActionsGrid() {
  return (
    <div className="space-y-4">
      {/* Section header */}
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-bold bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
          Quick Actions
        </h2>
        <p className="text-muted-foreground text-sm">
          Access key features instantly
        </p>
      </div>

      {/* Actions grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {quickActions.map((action) => {
          const Icon = action.icon;
          
          return (
            <Card 
              key={action.id}
              data-testid={`card-action-${action.id}`}
              className="hover-elevate active-elevate-2 cursor-pointer transition-all duration-300"
              onClick={action.action}
            >
              <CardContent className="p-4">
                <div className={cn(
                  "relative overflow-hidden rounded-lg bg-gradient-to-br",
                  action.bgGradient
                )}>
                  <div className="p-4 text-center space-y-3">
                    {/* Icon */}
                    <div className="flex justify-center">
                      <div className={cn(
                        "p-3 rounded-xl bg-white/50 dark:bg-black/20 backdrop-blur-sm",
                        action.color
                      )}>
                        <Icon size={24} />
                      </div>
                    </div>
                    
                    {/* Content */}
                    <div className="space-y-1">
                      <h3 className="font-semibold text-foreground">
                        {action.title}
                      </h3>
                      <p className="text-xs text-muted-foreground">
                        {action.subtitle}
                      </p>
                    </div>
                  </div>
                  
                  {/* Subtle pattern overlay */}
                  <div className="absolute inset-0 opacity-5 bg-gradient-to-br from-white to-transparent pointer-events-none"></div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}