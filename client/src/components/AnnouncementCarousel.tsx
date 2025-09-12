import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, Calendar, Trophy, Megaphone, AlertCircle } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface AnnouncementSlide {
  id: string;
  type: "event" | "achievement" | "announcement" | "alert";
  title: string;
  description: string;
  image: string;
  date: string;
  actionLabel?: string;
  priority: "high" | "medium" | "low";
}

import summitImage from "@assets/generated_images/BPN_Summit_conference_event_460b63ec.png";
import milestoneImage from "@assets/generated_images/50K_members_milestone_celebration_5748fd5a.png";
import partnershipImage from "@assets/generated_images/Business_partnership_program_ed21ecb5.png";
import updateImage from "@assets/generated_images/Platform_technology_update_c5bd0381.png";

const mockSlides: AnnouncementSlide[] = [
  {
    id: "1",
    type: "event",
    title: "Annual BPN Summit 2024",
    description: "Join 500+ professionals for networking, insights, and growth opportunities",
    image: summitImage,
    date: "Dec 15, 2024",
    actionLabel: "Register Now",
    priority: "high"
  },
  {
    id: "2", 
    type: "achievement",
    title: "50,000 Members Milestone!",
    description: "Celebrating our growing community of business professionals worldwide",
    image: milestoneImage,
    date: "Nov 28, 2024",
    actionLabel: "Celebrate",
    priority: "medium"
  },
  {
    id: "3",
    type: "announcement", 
    title: "New Partnership Program",
    description: "Introducing exclusive benefits for premium members and corporate partners",
    image: partnershipImage,
    date: "Nov 20, 2024",
    actionLabel: "Learn More",
    priority: "medium"
  },
  {
    id: "4",
    type: "alert",
    title: "Platform Update Tonight",
    description: "Scheduled maintenance from 11 PM - 1 AM EST. New features coming!",
    image: updateImage,
    date: "Tonight",
    actionLabel: "Details",
    priority: "high"
  }
];

const typeConfig = {
  event: { icon: Calendar, color: "bg-blue-500", label: "Event" },
  achievement: { icon: Trophy, color: "bg-yellow-500", label: "Achievement" },
  announcement: { icon: Megaphone, color: "bg-green-500", label: "News" },
  alert: { icon: AlertCircle, color: "bg-red-500", label: "Alert" }
};

export default function AnnouncementCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  // Auto-play functionality
  useEffect(() => {
    if (!isAutoPlaying) return;
    
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % mockSlides.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % mockSlides.length);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000); // Resume auto-play after 10s
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + mockSlides.length) % mockSlides.length);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const currentSlideData = mockSlides[currentSlide];
  const config = typeConfig[currentSlideData.type];
  const Icon = config.icon;

  return (
    <div className="relative w-full">
      <Card className="overflow-hidden bg-gradient-to-br from-card/95 to-card/80 backdrop-blur-sm border-border/50 shadow-2xl shadow-primary/10">
        <CardContent className="p-0 relative">
          {/* Main slide container */}
          <div className="relative h-64 md:h-80 overflow-hidden">
            {/* Background image with overlay */}
            <div 
              className="absolute inset-0 bg-cover bg-center transition-all duration-700 ease-in-out transform"
              style={{ 
                backgroundImage: `url(${currentSlideData.image})`,
                transform: `scale(${isAutoPlaying ? '1.05' : '1'})` 
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent"></div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
            </div>

            {/* Content overlay */}
            <div className="relative z-10 h-full flex flex-col justify-end p-6 text-white">
              {/* Type badge */}
              <div className="flex items-center gap-2 mb-3">
                <div className={cn("p-1.5 rounded-lg", config.color)}>
                  <Icon size={16} className="text-white" />
                </div>
                <Badge variant="secondary" className="bg-white/20 text-white border-white/30 backdrop-blur-sm">
                  {config.label}
                </Badge>
                {currentSlideData.priority === "high" && (
                  <Badge variant="destructive" className="bg-red-500/80 text-white border-red-400/50">
                    Priority
                  </Badge>
                )}
              </div>

              {/* Title and description */}
              <h3 className="text-2xl md:text-3xl font-bold mb-2 leading-tight drop-shadow-lg">
                {currentSlideData.title}
              </h3>
              <p className="text-lg opacity-90 mb-4 leading-relaxed drop-shadow-md max-w-2xl">
                {currentSlideData.description}
              </p>

              {/* Date and action */}
              <div className="flex items-center justify-between">
                <span className="text-sm opacity-75 font-medium">
                  {currentSlideData.date}
                </span>
                {currentSlideData.actionLabel && (
                  <Button 
                    variant="secondary" 
                    size="sm"
                    className="bg-white/20 text-white border-white/30 backdrop-blur-sm"
                    data-testid={`button-announcement-action-${currentSlideData.id}`}
                  >
                    {currentSlideData.actionLabel}
                  </Button>
                )}
              </div>
            </div>

            {/* Navigation arrows */}
            <Button
              variant="ghost"
              size="icon"
              onClick={prevSlide}
              className="absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-black/30 text-white border-0 backdrop-blur-sm"
              data-testid="button-carousel-prev"
            >
              <ChevronLeft size={20} />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={nextSlide}
              className="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-black/30 text-white border-0 backdrop-blur-sm"
              data-testid="button-carousel-next"
            >
              <ChevronRight size={20} />
            </Button>
          </div>

          {/* Slide indicators */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex gap-2">
            {mockSlides.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={cn(
                  "w-2 h-2 rounded-full transition-all duration-300",
                  index === currentSlide 
                    ? "bg-white w-6" 
                    : "bg-white/50 hover:bg-white/70"
                )}
                data-testid={`button-slide-indicator-${index}`}
              />
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}