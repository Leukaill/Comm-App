import { useState } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ClipboardList, Clock, Award, Users } from "lucide-react";

export default function Survey() {
  // Todo: remove mock functionality
  const [availableSurveys] = useState([
    {
      id: "1",
      title: "Business Growth Assessment",
      description: "Help us understand your business goals and challenges to provide better support and resources.",
      category: "Business Development",
      estimatedTime: "5-7 minutes",
      rewards: "20 BPN Points",
      deadline: "Dec 31, 2024",
      participants: 145,
      maxParticipants: 200,
      status: "active" as const
    },
    {
      id: "2", 
      title: "Member Satisfaction Survey",
      description: "Share your feedback about BPN services, events, and community experience.",
      category: "Feedback",
      estimatedTime: "3-5 minutes", 
      rewards: "15 BPN Points",
      deadline: "Jan 15, 2025",
      participants: 89,
      maxParticipants: 150,
      status: "active" as const
    },
    {
      id: "3",
      title: "Skills Development Needs",
      description: "Identify training and workshop topics that would benefit your professional development.",
      category: "Training",
      estimatedTime: "8-10 minutes",
      rewards: "25 BPN Points", 
      deadline: "Dec 20, 2024",
      participants: 67,
      maxParticipants: 100,
      status: "active" as const
    }
  ]);

  const [completedSurveys] = useState([
    {
      id: "4",
      title: "Q3 Networking Feedback",
      description: "Feedback on quarterly networking events and suggested improvements.",
      category: "Events",
      completedDate: "Nov 15, 2024",
      rewards: "15 BPN Points",
      status: "completed" as const
    },
    {
      id: "5", 
      title: "Digital Platform Usage",
      description: "Survey about how members use the BPN digital platform and mobile app.",
      category: "Technology",
      completedDate: "Oct 28, 2024",
      rewards: "20 BPN Points",
      status: "completed" as const
    }
  ]);

  const handleStartSurvey = (surveyId: string) => {
    console.log(`Starting survey: ${surveyId}`);
    // Todo: navigate to survey form
  };

  const handleViewResults = (surveyId: string) => {
    console.log(`Viewing results for survey: ${surveyId}`);
    // Todo: navigate to survey results
  };

  return (
    <div className="flex-1 flex flex-col h-full bg-background">
      <header className="bg-card border-b border-border px-4 py-4 shrink-0">
        <h1 className="text-xl font-semibold" data-testid="page-title">
          Surveys
        </h1>
        <p className="text-sm text-muted-foreground mt-1">
          Complete surveys to earn BPN Points and help improve our services
        </p>
      </header>

      <Tabs defaultValue="available" className="flex-1 flex flex-col min-h-0">
        <div className="px-4 pt-3 pb-2 shrink-0">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="available" data-testid="tab-available">
              Available ({availableSurveys.length})
            </TabsTrigger>
            <TabsTrigger value="completed" data-testid="tab-completed">
              Completed ({completedSurveys.length})
            </TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="available" className="flex-1 min-h-0">
          <div className="h-full overflow-y-auto">
            <div className="p-4 space-y-4 pb-24">
              {availableSurveys.map((survey) => (
                <Card 
                  key={survey.id} 
                  className="hover-elevate transition-all duration-200"
                  data-testid={`survey-card-${survey.id}`}
                >
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-2">
                          <Badge variant="secondary" className="text-xs">
                            {survey.category}
                          </Badge>
                          <Badge variant="outline" className="text-xs text-green-600">
                            {survey.rewards}
                          </Badge>
                        </div>
                        <CardTitle className="text-base leading-tight">
                          {survey.title}
                        </CardTitle>
                      </div>
                      <ClipboardList className="text-primary" size={20} />
                    </div>
                  </CardHeader>
                  
                  <CardContent className="space-y-4">
                    <p className="text-sm text-muted-foreground">
                      {survey.description}
                    </p>
                    
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Clock size={14} />
                        <span>{survey.estimatedTime}</span>
                      </div>
                      
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Users size={14} />
                        <span>{survey.participants}/{survey.maxParticipants} participants</span>
                      </div>
                      
                      <div className="text-sm text-muted-foreground">
                        <strong>Deadline:</strong> {survey.deadline}
                      </div>
                    </div>
                    
                    <div className="flex gap-2 pt-2">
                      <Button
                        onClick={() => handleStartSurvey(survey.id)}
                        className="flex-1"
                        data-testid={`button-start-${survey.id}`}
                      >
                        Start Survey
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="completed" className="flex-1 min-h-0">
          <div className="h-full overflow-y-auto">
            <div className="p-4 space-y-4 pb-24">
              {completedSurveys.length > 0 ? (
                completedSurveys.map((survey) => (
                  <Card 
                    key={survey.id} 
                    className="opacity-75 hover:opacity-100 transition-opacity"
                    data-testid={`completed-survey-${survey.id}`}
                  >
                    <CardHeader className="pb-3">
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-2">
                            <Badge variant="secondary" className="text-xs">
                              {survey.category}
                            </Badge>
                            <Badge variant="outline" className="text-xs text-green-600">
                              Earned: {survey.rewards}
                            </Badge>
                          </div>
                          <CardTitle className="text-base leading-tight">
                            {survey.title}
                          </CardTitle>
                        </div>
                        <Award className="text-green-600" size={20} />
                      </div>
                    </CardHeader>
                    
                    <CardContent className="space-y-4">
                      <p className="text-sm text-muted-foreground">
                        {survey.description}
                      </p>
                      
                      <div className="text-sm text-muted-foreground">
                        <strong>Completed:</strong> {survey.completedDate}
                      </div>
                      
                      <div className="flex gap-2 pt-2">
                        <Button
                          variant="outline"
                          onClick={() => handleViewResults(survey.id)}
                          className="flex-1"
                          data-testid={`button-view-results-${survey.id}`}
                        >
                          View Results
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))
              ) : (
                <div className="text-center py-8">
                  <p className="text-muted-foreground">No completed surveys yet</p>
                </div>
              )}
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}