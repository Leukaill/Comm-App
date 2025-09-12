import { Users, Building2, MapPin, Award, TrendingUp, Heart } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface StatCard {
  icon: any;
  value: string;
  label: string;
  change: string;
  trend: "up" | "down" | "neutral";
  color: string;
}

const stats: StatCard[] = [
  {
    icon: Users,
    value: "50K+",
    label: "Active Members",
    change: "+12%",
    trend: "up",
    color: "text-blue-500"
  },
  {
    icon: Building2,
    value: "500+",
    label: "Partner Companies",
    change: "+8%", 
    trend: "up",
    color: "text-green-500"
  },
  {
    icon: MapPin,
    value: "85",
    label: "Countries",
    change: "+3",
    trend: "up", 
    color: "text-purple-500"
  },
  {
    icon: Award,
    value: "2.5K+",
    label: "Success Stories",
    change: "+25%",
    trend: "up",
    color: "text-yellow-500"
  },
  {
    icon: TrendingUp,
    value: "98%",
    label: "Satisfaction Rate",
    change: "Stable",
    trend: "neutral",
    color: "text-indigo-500"
  },
  {
    icon: Heart,
    value: "15K+",
    label: "Lives Impacted",
    change: "+30%",
    trend: "up",
    color: "text-red-500"
  }
];

export default function BPNStatsSection() {
  return (
    <div className="space-y-4">
      {/* Section header */}
      <div className="text-center space-y-2 sm:space-y-3">
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
          Our Impact
        </h2>
        <p className="text-muted-foreground text-sm sm:text-base">
          Real numbers, real impact across the globe
        </p>
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 sm:gap-4">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          
          return (
            <Card 
              key={index}
              data-testid={`card-stat-${stat.label.toLowerCase().replace(/\s+/g, '-')}`}
              className="hover-elevate active-elevate-2 bg-gradient-to-br from-card/95 to-card/80 backdrop-blur-sm border-border/50 shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <CardContent className="p-3 sm:p-4 lg:p-5">
                <div className="flex items-start justify-between">
                  <div className="space-y-2">
                    <div className={`p-2 rounded-lg bg-gradient-to-br from-background/50 to-background/30 ${stat.color}`}>
                      <Icon className="w-4 h-4 sm:w-5 sm:h-5" />
                    </div>
                    <div>
                      <div className="text-lg sm:text-xl lg:text-2xl font-bold text-foreground">
                        {stat.value}
                      </div>
                      <div className="text-xs sm:text-sm text-muted-foreground font-medium">
                        {stat.label}
                      </div>
                    </div>
                  </div>
                  
                  <Badge 
                    variant={stat.trend === "up" ? "default" : "secondary"}
                    className={`text-xs ${
                      stat.trend === "up" 
                        ? "bg-green-500/10 text-green-600 border-green-500/20" 
                        : "bg-muted/50 text-muted-foreground"
                    }`}
                  >
                    {stat.change}
                  </Badge>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}