import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import UserAvatar from "@/components/UserAvatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Edit, MapPin, Briefcase, Calendar, Users, Settings, LogOut } from "lucide-react";

export default function Profile() {
  // Todo: remove mock functionality
  const [userProfile] = useState({
    name: "John Doe",
    title: "Senior Business Analyst",
    company: "Business Solutions Inc.",
    location: "New York, NY", 
    email: "john.doe@example.com",
    joinDate: "March 2023",
    bio: "Experienced business analyst with a passion for data-driven decision making and process optimization. Always looking to connect with like-minded professionals.",
    skills: ["Business Analysis", "Data Analytics", "Project Management", "Strategy", "SQL", "Excel"],
    connections: 127,
    posts: 23,
    eventsAttended: 15
  });

  const [recentActivity] = useState([
    {
      id: "1",
      type: "event",
      description: "Attended Monthly Networking Breakfast",
      timestamp: "2 days ago"
    },
    {
      id: "2", 
      type: "post",
      description: "Shared insights about project management",
      timestamp: "5 days ago"
    },
    {
      id: "3",
      type: "connection",
      description: "Connected with Sarah Wilson",
      timestamp: "1 week ago"
    },
    {
      id: "4",
      type: "note",
      description: "Read Professional Development Guidelines",
      timestamp: "1 week ago"
    }
  ]);

  const handleEditProfile = () => {
    console.log("Edit profile clicked");
    // Todo: navigate to edit profile page
  };

  const handleSettings = () => {
    console.log("Settings clicked");
    // Todo: navigate to settings page
  };

  const handleLogout = () => {
    console.log("Logout clicked");
    // Todo: implement logout functionality
  };

  return (
    <div className="flex-1 flex flex-col h-full">
      <header className="bg-card border-b border-border px-4 py-3">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-semibold" data-testid="page-title">
            Profile
          </h1>
          <div className="flex gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleSettings}
              data-testid="button-settings"
            >
              <Settings size={20} />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleLogout}
              data-testid="button-logout"
            >
              <LogOut size={20} />
            </Button>
          </div>
        </div>
      </header>

      <ScrollArea className="flex-1">
        <div className="p-4 space-y-6 pb-24">
          {/* Profile Header */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <UserAvatar 
                  name={userProfile.name}
                  size="lg"
                  showStatus
                  status="online"
                />
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <div className="flex-1 min-w-0">
                      <h2 className="text-xl font-bold" data-testid="text-user-name">
                        {userProfile.name}
                      </h2>
                      <div className="flex items-center gap-1 text-muted-foreground text-sm mt-1">
                        <Briefcase size={14} />
                        <span>{userProfile.title}</span>
                      </div>
                      <div className="flex items-center gap-1 text-muted-foreground text-sm mt-1">
                        <span>{userProfile.company}</span>
                      </div>
                      <div className="flex items-center gap-1 text-muted-foreground text-sm mt-1">
                        <MapPin size={14} />
                        <span>{userProfile.location}</span>
                      </div>
                    </div>
                    
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={handleEditProfile}
                      data-testid="button-edit-profile"
                    >
                      <Edit size={16} className="mr-1" />
                      Edit
                    </Button>
                  </div>
                  
                  <p className="text-sm text-muted-foreground mb-3">
                    {userProfile.bio}
                  </p>
                  
                  <div className="flex items-center gap-1 text-muted-foreground text-sm mb-3">
                    <Calendar size={14} />
                    <span>Joined {userProfile.joinDate}</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4">
            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-primary">{userProfile.connections}</div>
                <div className="text-sm text-muted-foreground">Connections</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-primary">{userProfile.posts}</div>
                <div className="text-sm text-muted-foreground">Posts</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-primary">{userProfile.eventsAttended}</div>
                <div className="text-sm text-muted-foreground">Events</div>
              </CardContent>
            </Card>
          </div>

          {/* Skills */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Skills</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {userProfile.skills.map((skill) => (
                  <Badge key={skill} variant="secondary">
                    {skill}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Recent Activity */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Recent Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {recentActivity.map((activity) => (
                  <div key={activity.id} className="flex items-center gap-3 text-sm">
                    <div className="w-2 h-2 bg-primary rounded-full flex-shrink-0" />
                    <div className="flex-1">
                      <span>{activity.description}</span>
                      <span className="text-muted-foreground ml-2">
                        {activity.timestamp}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </ScrollArea>
    </div>
  );
}