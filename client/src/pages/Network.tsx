import { useState } from "react";
import ConnectionCard from "@/components/ConnectionCard";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

export default function Network() {
  const [searchQuery, setSearchQuery] = useState("");
  
  // Todo: remove mock functionality
  const [allConnections] = useState([
    {
      id: "1",
      name: "Alice Johnson",
      title: "Product Manager",
      company: "InnovateTech",
      location: "San Francisco, CA",
      mutualConnections: 5,
      skills: ["Product Strategy", "UX Design", "Analytics", "Leadership"],
      status: "none" as const
    },
    {
      id: "2",
      name: "Robert Smith",
      title: "Business Development",
      company: "Growth Partners", 
      location: "New York, NY",
      mutualConnections: 12,
      skills: ["Sales", "Partnerships", "Strategy"],
      status: "connected" as const
    },
    {
      id: "3",
      name: "Emma Davis",
      title: "Financial Analyst",
      company: "Capital Advisors",
      location: "Chicago, IL",
      mutualConnections: 3,
      skills: ["Financial Modeling", "Analysis", "Excel"],
      status: "pending" as const
    },
    {
      id: "4",
      name: "Michael Chen",
      title: "Senior Consultant",
      company: "Strategic Solutions",
      location: "Los Angeles, CA",
      mutualConnections: 8,
      skills: ["Consulting", "Project Management", "Business Analysis"],
      status: "connected" as const
    },
    {
      id: "5",
      name: "Sarah Wilson",
      title: "Marketing Director", 
      company: "TechCorp",
      location: "Seattle, WA",
      mutualConnections: 15,
      skills: ["Digital Marketing", "Brand Strategy", "Content"],
      status: "none" as const
    },
    {
      id: "6",
      name: "David Brown",
      title: "Software Engineer",
      company: "DevCorp",
      location: "Austin, TX",
      mutualConnections: 2,
      skills: ["React", "Node.js", "Cloud Architecture"],
      status: "pending" as const
    }
  ]);

  const [connectionStatuses, setConnectionStatuses] = useState<Record<string, "none" | "pending" | "connected">>({});

  const filteredConnections = allConnections.filter(connection =>
    connection.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    connection.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    connection.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
    connection.skills.some(skill => skill.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const suggestedConnections = filteredConnections.filter(c => 
    (connectionStatuses[c.id] || c.status) === "none"
  );
  const myConnections = filteredConnections.filter(c => 
    (connectionStatuses[c.id] || c.status) === "connected"
  );
  const pendingConnections = filteredConnections.filter(c => 
    (connectionStatuses[c.id] || c.status) === "pending"
  );

  const handleConnect = (connectionId: string) => {
    setConnectionStatuses(prev => ({
      ...prev,
      [connectionId]: "pending"
    }));
    console.log(`Connection request sent to: ${connectionId}`);
  };

  const handleMessage = (connectionId: string) => {
    console.log(`Opening message thread with: ${connectionId}`);
    // Todo: navigate to message thread
  };

  return (
    <div className="flex-1 flex flex-col h-full">
      <header className="bg-card border-b border-border px-4 sm:px-6 py-3 sm:py-4 space-y-3">
        <h1 className="text-lg sm:text-xl font-semibold" data-testid="page-title">
          Network
        </h1>
        
        <div className="relative">
          <Search className="w-4 h-4 sm:w-5 sm:h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search professionals..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            data-testid="input-search-network"
            className="pl-10"
          />
        </div>
      </header>

      <Tabs defaultValue="suggestions" className="flex-1 flex flex-col">
        <div className="px-4 pt-2">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="suggestions" data-testid="tab-suggestions">
              Suggestions
            </TabsTrigger>
            <TabsTrigger value="connections" data-testid="tab-connections">
              My Network ({myConnections.length})
            </TabsTrigger>
            <TabsTrigger value="pending" data-testid="tab-pending">
              Pending ({pendingConnections.length})
            </TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="suggestions" className="flex-1 mt-0">
          <ScrollArea className="h-full">
            <div className="p-4 space-y-4 pb-24">
              {suggestedConnections.length > 0 ? (
                suggestedConnections.map((connection) => (
                  <ConnectionCard
                    key={connection.id}
                    {...connection}
                    status={connectionStatuses[connection.id] || connection.status}
                    onConnect={() => handleConnect(connection.id)}
                    onMessage={() => handleMessage(connection.id)}
                  />
                ))
              ) : (
                <div className="text-center py-8">
                  <p className="text-muted-foreground">No suggestions found</p>
                </div>
              )}
            </div>
          </ScrollArea>
        </TabsContent>

        <TabsContent value="connections" className="flex-1 mt-0">
          <ScrollArea className="h-full">
            <div className="p-4 space-y-4 pb-24">
              {myConnections.length > 0 ? (
                myConnections.map((connection) => (
                  <ConnectionCard
                    key={connection.id}
                    {...connection}
                    status={connectionStatuses[connection.id] || connection.status}
                    onConnect={() => handleConnect(connection.id)}
                    onMessage={() => handleMessage(connection.id)}
                  />
                ))
              ) : (
                <div className="text-center py-8">
                  <p className="text-muted-foreground">No connections yet</p>
                </div>
              )}
            </div>
          </ScrollArea>
        </TabsContent>

        <TabsContent value="pending" className="flex-1 mt-0">
          <ScrollArea className="h-full">
            <div className="p-4 space-y-4 pb-24">
              {pendingConnections.length > 0 ? (
                pendingConnections.map((connection) => (
                  <ConnectionCard
                    key={connection.id}
                    {...connection}
                    status={connectionStatuses[connection.id] || connection.status}
                    onConnect={() => handleConnect(connection.id)}
                    onMessage={() => handleMessage(connection.id)}
                  />
                ))
              ) : (
                <div className="text-center py-8">
                  <p className="text-muted-foreground">No pending connections</p>
                </div>
              )}
            </div>
          </ScrollArea>
        </TabsContent>
      </Tabs>
    </div>
  );
}