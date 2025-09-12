import AnnouncementCarousel from "@/components/AnnouncementCarousel";
import BPNStatsSection from "@/components/BPNStatsSection";
import QuickActionsGrid from "@/components/QuickActionsGrid";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CalendarDays, Users, Trophy, Zap } from "lucide-react";

export default function Home() {
  return (
    <div className="flex-1 flex flex-col h-full bg-gradient-to-br from-background via-background to-primary/5">
      {/* Header */}
      <header className="bg-card/95 backdrop-blur-xl border-b border-border/50 px-4 sm:px-6 lg:px-8 py-3 sm:py-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-primary/5 opacity-50"></div>
        <div className="relative z-10 flex items-center justify-between">
          <div>
            <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent" data-testid="page-title">
              BPN Hub
            </h1>
            <p className="text-xs sm:text-sm text-muted-foreground font-medium">Latest updates & opportunities</p>
          </div>
          <Badge className="bg-gradient-to-r from-green-500/10 to-green-600/10 text-green-600 border-green-500/20">
            Live
          </Badge>
        </div>
      </header>

      <ScrollArea className="flex-1">
        <div className="container mx-auto max-w-screen-2xl p-4 sm:p-6 lg:p-8 space-y-6 sm:space-y-8 pb-[calc(env(safe-area-inset-bottom)+80px)] md:pb-8">
          {/* Main Announcements Carousel */}
          <AnnouncementCarousel />

          {/* BPN Impact Stats */}
          <BPNStatsSection />

          {/* Quick Actions Grid */}
          <QuickActionsGrid />

          {/* Recent Highlights */}
          <div className="space-y-4">
            <div className="text-center space-y-2 sm:space-y-3">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
                Recent Highlights
              </h2>
              <p className="text-muted-foreground text-sm sm:text-base">
                Key moments from our community
              </p>
            </div>

            <div className="grid gap-4 sm:gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {/* Event Highlight */}
              <Card className="hover-elevate active-elevate-2 bg-gradient-to-br from-card/95 to-card/80 backdrop-blur-sm border-border/50 transition-all duration-300">
                <CardContent className="p-4 sm:p-5 lg:p-6">
                  <div className="flex items-start gap-3">
                    <div className="p-2 rounded-lg bg-blue-500/10">
                      <CalendarDays className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600" />
                    </div>
                    <div className="flex-1 space-y-2">
                      <h3 className="font-semibold text-sm sm:text-base">Success Stories Summit</h3>
                      <p className="text-xs sm:text-sm text-muted-foreground">
                        300+ professionals shared their journeys
                      </p>
                      <Badge variant="secondary" className="text-xs">
                        Last Month
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Community Highlight */}
              <Card className="hover-elevate active-elevate-2 bg-gradient-to-br from-card/95 to-card/80 backdrop-blur-sm border-border/50 transition-all duration-300">
                <CardContent className="p-4 sm:p-5 lg:p-6">
                  <div className="flex items-start gap-3">
                    <div className="p-2 rounded-lg bg-green-500/10">
                      <Users className="w-5 h-5 sm:w-6 sm:h-6 text-green-600" />
                    </div>
                    <div className="flex-1 space-y-2">
                      <h3 className="font-semibold text-sm sm:text-base">New Partnerships</h3>
                      <p className="text-xs sm:text-sm text-muted-foreground">
                        50+ corporate partners joined this quarter
                      </p>
                      <Badge variant="secondary" className="text-xs">
                        This Quarter
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Achievement Highlight */}
              <Card className="hover-elevate active-elevate-2 bg-gradient-to-br from-card/95 to-card/80 backdrop-blur-sm border-border/50 transition-all duration-300">
                <CardContent className="p-4 sm:p-5 lg:p-6">
                  <div className="flex items-start gap-3">
                    <div className="p-2 rounded-lg bg-yellow-500/10">
                      <Trophy className="w-5 h-5 sm:w-6 sm:h-6 text-yellow-600" />
                    </div>
                    <div className="flex-1 space-y-2">
                      <h3 className="font-semibold text-sm sm:text-base">Excellence Awards</h3>
                      <p className="text-xs sm:text-sm text-muted-foreground">
                        25 outstanding members recognized globally
                      </p>
                      <Badge variant="secondary" className="text-xs">
                        Awards Night
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Innovation Highlight */}
              <Card className="hover-elevate active-elevate-2 bg-gradient-to-br from-card/95 to-card/80 backdrop-blur-sm border-border/50 transition-all duration-300">
                <CardContent className="p-4 sm:p-5 lg:p-6">
                  <div className="flex items-start gap-3">
                    <div className="p-2 rounded-lg bg-purple-500/10">
                      <Zap className="w-5 h-5 sm:w-6 sm:h-6 text-purple-600" />
                    </div>
                    <div className="flex-1 space-y-2">
                      <h3 className="font-semibold text-sm sm:text-base">Innovation Lab</h3>
                      <p className="text-xs sm:text-sm text-muted-foreground">
                        10 startup ideas funded through BPN network
                      </p>
                      <Badge variant="secondary" className="text-xs">
                        This Year
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </ScrollArea>
    </div>
  );
}