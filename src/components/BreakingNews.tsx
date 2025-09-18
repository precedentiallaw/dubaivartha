import { useState, useEffect } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface BreakingNewsItem {
  id: string;
  title: string;
  titleMalayalam?: string;
  time: string;
}

const breakingNewsItems: BreakingNewsItem[] = [
  {
    id: "1",
    title: "Dubai announces new visa policy for tourists",
    titleMalayalam: "ദുബായ് ടൂറിസ്റ്റുകൾക്കായി പുതിയ വിസാ നയം പ്രഖ്യാപിച്ചു",
    time: "2 min ago"
  },
  {
    id: "2", 
    title: "UAE celebrates National Day with grand festivities",
    titleMalayalam: "യുഎഇ ദേശീയ ദിനം ഗംഭീര ആഘോഷങ്ങളോടെ ആഘോഷിക്കുന്നു",
    time: "15 min ago"
  },
  {
    id: "3",
    title: "Kerala Chief Minister visits Dubai for investment talks",
    titleMalayalam: "നിക്ഷേപ ചർച്ചകൾക്കായി കേരള മുഖ്യമന്ത്രി ദുബായ് സന്ദർശിക്കുന്നു",
    time: "1 hour ago"
  }
];

interface BreakingNewsProps {
  className?: string;
}

const BreakingNews = ({ className }: BreakingNewsProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % breakingNewsItems.length);
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % breakingNewsItems.length);
  };

  const goToPrev = () => {
    setCurrentIndex((prev) => (prev - 1 + breakingNewsItems.length) % breakingNewsItems.length);
  };

  if (!isVisible) return null;

  const currentItem = breakingNewsItems[currentIndex];

  return (
    <div className={cn(
      "bg-breaking text-breaking-foreground py-3 px-4 relative overflow-hidden",
      className
    )}>
      {/* Animated background */}
      <div className="absolute inset-0 breaking-animation opacity-20"></div>
      
      <div className="container mx-auto flex items-center justify-between relative z-10">
        <div className="flex items-center space-x-4 flex-1">
          <div className="flex items-center space-x-2 flex-shrink-0">
            <div className="h-2 w-2 bg-white rounded-full animate-pulse"></div>
            <span className="font-bold text-sm">BREAKING NEWS</span>
          </div>
          
          <div className="flex-1 min-w-0">
            <div className="flex items-center space-x-3">
              <Button
                variant="ghost"
                size="sm"
                onClick={goToPrev}
                className="h-6 w-6 p-0 text-white hover:bg-white/20 flex-shrink-0"
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">
                  {currentItem.title}
                </p>
                {currentItem.titleMalayalam && (
                  <p className="text-xs opacity-90 truncate">
                    {currentItem.titleMalayalam}
                  </p>
                )}
              </div>
              
              <Button
                variant="ghost"
                size="sm"
                onClick={goToNext}
                className="h-6 w-6 p-0 text-white hover:bg-white/20 flex-shrink-0"
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
          
          <span className="text-xs opacity-75 flex-shrink-0">
            {currentItem.time}
          </span>
        </div>
        
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setIsVisible(false)}
          className="h-6 w-6 p-0 text-white hover:bg-white/20 ml-4 flex-shrink-0"
        >
          <X className="h-4 w-4" />
        </Button>
      </div>
      
      {/* Progress indicators */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/20">
        <div className="flex h-full">
          {breakingNewsItems.map((_, index) => (
            <div
              key={index}
              className={cn(
                "flex-1 h-full transition-all duration-300",
                index === currentIndex ? "bg-white" : "bg-white/40"
              )}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default BreakingNews;