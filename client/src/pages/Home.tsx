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
      <header className="bg-card/95 backdrop-blur-xl border-b border-border/50 px-4 py-3 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-primary/5 opacity-50"></div>
        <div className="relative z-10 flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent" data-testid="page-title">
              BPN Hub
            </h1>
            <p className="text-xs text-muted-foreground font-medium">Latest updates & opportunities</p>
          </div>
          <Badge className="bg-gradient-to-r from-green-500/10 to-green-600/10 text-green-600 border-green-500/20">
            Live
          </Badge>
        </div>
      </header>

      <ScrollArea className="flex-1">
        <div className="p-4 space-y-6 pb-24">
          {/* Main Announcements Carousel */}
          <AnnouncementCarousel />

          {/* BPN Impact Stats */}
          <BPNStatsSection />

          {/* Quick Actions Grid */}
          <QuickActionsGrid />

          {/* Recent Highlights */}
          <div className="space-y-4">
            <div className="text-center space-y-2">
              <h2 className="text-2xl font-bold bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
                Recent Highlights
              </h2>
              <p className="text-muted-foreground text-sm">
                Key moments from our community
              </p>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              {/* Event Highlight */}
              <Card className="hover-elevate active-elevate-2 bg-gradient-to-br from-card/95 to-card/80 backdrop-blur-sm border-border/50 transition-all duration-300">
                <CardContent className="p-4">
                  <div className="flex items-start gap-3">
                    <div className="p-2 rounded-lg bg-blue-500/10">
                      <CalendarDays size={20} className="text-blue-600" />
                    </div>
                    <div className="flex-1 space-y-2">
                      <h3 className="font-semibold text-sm">Success Stories Summit</h3>
                      <p className="text-xs text-muted-foreground">
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
                <CardContent className="p-4">
                  <div className="flex items-start gap-3">
                    <div className="p-2 rounded-lg bg-green-500/10">
                      <Users size={20} className="text-green-600" />
                    </div>
                    <div className="flex-1 space-y-2">
                      <h3 className="font-semibold text-sm">New Partnerships</h3>
                      <p className="text-xs text-muted-foreground">
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
                <CardContent className="p-4">
                  <div className="flex items-start gap-3">
                    <div className="p-2 rounded-lg bg-yellow-500/10">
                      <Trophy size={20} className="text-yellow-600" />
                    </div>
                    <div className="flex-1 space-y-2">
                      <h3 className="font-semibold text-sm">Excellence Awards</h3>
                      <p className="text-xs text-muted-foreground">
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
                <CardContent className="p-4">
                  <div className="flex items-start gap-3">
                    <div className="p-2 rounded-lg bg-purple-500/10">
                      <Zap size={20} className="text-purple-600" />
                    </div>
                    <div className="flex-1 space-y-2">
                      <h3 className="font-semibold text-sm">Innovation Lab</h3>
                      <p className="text-xs text-muted-foreground">
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