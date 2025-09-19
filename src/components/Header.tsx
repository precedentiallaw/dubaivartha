import { useState } from "react";
import { Menu, Search, Bell, Sun, Moon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import dubaiVarthaLogo from "@/assets/dubai-vartha-logo-official.png";

interface HeaderProps {
  onMenuClick: () => void;
  isDark: boolean;
  onThemeToggle: () => void;
}

const Header = ({ onMenuClick, isDark, onThemeToggle }: HeaderProps) => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between px-4">
        {/* Left section */}
        <div className="flex items-center space-x-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={onMenuClick}
            className="md:hidden"
          >
            <Menu className="h-5 w-5" />
          </Button>
          
          <div className="flex items-center space-x-3">
            <img 
              src={dubaiVarthaLogo} 
              alt="Dubai Vartha" 
              className="h-8 w-auto"
            />
            <div className="hidden md:block">
              <h1 className="text-xl font-bold gradient-text">Dubai Vartha</h1>
              <p className="text-xs text-muted-foreground">ദുബായ് വാർത്ത</p>
            </div>
          </div>
        </div>

        {/* Center - Search (Desktop) */}
        <div className="hidden md:flex flex-1 max-w-md mx-8">
          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search news..."
              className="pl-10 bg-muted/50 border-0 focus-visible:ring-2 focus-visible:ring-primary"
            />
          </div>
        </div>

        {/* Right section */}
        <div className="flex items-center space-x-2">
          {/* Mobile search toggle */}
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsSearchOpen(!isSearchOpen)}
            className="md:hidden"
          >
            <Search className="h-5 w-5" />
          </Button>
          
          {/* Notifications */}
          <Button variant="ghost" size="sm" className="relative">
            <Bell className="h-5 w-5" />
            <span className="absolute -top-1 -right-1 h-3 w-3 bg-breaking rounded-full text-xs"></span>
          </Button>
          
          {/* Theme toggle */}
          <Button variant="ghost" size="sm" onClick={onThemeToggle}>
            {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </Button>
        </div>
      </div>

      {/* Mobile search */}
      {isSearchOpen && (
        <div className="border-t px-4 py-3 md:hidden">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search news..."
              className="pl-10 bg-muted/50 border-0"
              autoFocus
            />
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;