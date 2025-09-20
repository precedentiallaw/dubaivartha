import { useState } from "react";
import { Home, MapPin, Globe, Play, Instagram, TrendingUp, Users, Bookmark } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const categories = [
  { id: "home", label: "Home", labelMalayalam: "ഹോം", icon: Home },
  { id: "dubai", label: "Dubai", labelMalayalam: "ദുബായ്", icon: MapPin },
  { id: "uae", label: "UAE", labelMalayalam: "യുഎഇ", icon: MapPin },
  { id: "kerala", label: "Kerala", labelMalayalam: "കേരളം", icon: MapPin },
  { id: "gcc", label: "GCC", labelMalayalam: "ജിസിസി", icon: Globe },
  { id: "world", label: "World", labelMalayalam: "ലോകം", icon: Globe },
  { id: "videos", label: "Videos", labelMalayalam: "വീഡിയോസ്", icon: Play },
  { id: "social", label: "Social", labelMalayalam: "സോഷ്യൽ", icon: Instagram },
  { id: "trending", label: "Trending", labelMalayalam: "ട്രെൻഡിംഗ്", icon: TrendingUp },
  { id: "bookmarks", label: "Bookmarks", labelMalayalam: "ബുക്ക്മാർക്കുകൾ", icon: Bookmark },
  { id: "about", label: "About", labelMalayalam: "കുറിച്ച്", icon: Users },
];

interface NavigationProps {
  activeCategory: string;
  onCategoryChange: (category: string) => void;
  isOpen: boolean;
  onClose: () => void;
}

const Navigation = ({ activeCategory, onCategoryChange, isOpen, onClose }: NavigationProps) => {
  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 md:hidden"
          onClick={onClose}
        />
      )}

      {/* Navigation sidebar */}
      <nav
        className={cn(
          "fixed left-0 top-16 z-50 h-[calc(100vh-4rem)] w-64 transform border-r bg-card transition-transform duration-300 ease-in-out md:translate-x-0",
          isOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="flex flex-col space-y-1 p-4">
          {categories.map((category) => {
            const Icon = category.icon;
            const isActive = activeCategory === category.id;
            
            return (
              <Button
                key={category.id}
                variant={isActive ? "default" : "ghost"}
                className={cn(
                  "w-full justify-start space-x-3 h-12 px-4",
                  isActive && "bg-brand-gradient text-white hover:opacity-90"
                )}
                onClick={() => {
                  onCategoryChange(category.id);
                  onClose();
                }}
              >
                <Icon className="h-5 w-5" />
                <div className="flex flex-col items-start">
                  <span className="text-sm font-medium">{category.label}</span>
                  <span className="text-xs opacity-75">{category.labelMalayalam}</span>
                </div>
              </Button>
            );
          })}
        </div>

        {/* Breaking News Section */}
        <div className="border-t p-4">
          <div className="rounded-lg bg-breaking/10 p-3 border border-breaking/20">
            <div className="flex items-center space-x-2">
              <div className="h-2 w-2 rounded-full bg-breaking breaking-animation"></div>
              <span className="text-xs font-semibold text-breaking">BREAKING NEWS</span>
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Stay updated with the latest breaking news from Dubai and UAE
            </p>
          </div>
        </div>
      </nav>

      {/* Desktop navigation bar */}
      <div className="hidden md:block border-b bg-card">
        <div className="container px-4">
          <div className="flex space-x-1 overflow-x-auto py-2">
            {categories.map((category) => {
              const Icon = category.icon;
              const isActive = activeCategory === category.id;
              
              return (
                <Button
                  key={category.id}
                  variant={isActive ? "default" : "ghost"}
                  size="sm"
                  className={cn(
                    "flex-shrink-0 space-x-2",
                    isActive && "bg-brand-gradient text-white hover:opacity-90"
                  )}
                  onClick={() => onCategoryChange(category.id)}
                >
                  <Icon className="h-4 w-4" />
                  <span>{category.label}</span>
                </Button>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default Navigation;