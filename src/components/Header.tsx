import { useState } from "react";
import { Menu, Search, Bell, Sun, Moon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import dubaiVarthaLogo from "@/assets/dubai-vartha-logo-official.png";
import { useNavigate } from "react-router-dom";

interface HeaderProps {
  onMenuClick: () => void;
  isDark: boolean;
  onThemeToggle: () => void;
}

const Header = ({ onMenuClick, isDark, onThemeToggle }: HeaderProps) => {
  const navigate = useNavigate();
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const handleSearchClick = () => {
    navigate('/search');
  };

  const handleLogoClick = () => {
    navigate('/');
  };

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
          
          <div className="flex items-center space-x-3 cursor-pointer" onClick={handleLogoClick}>
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
          <div className="relative w-full cursor-pointer" onClick={handleSearchClick}>
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search news..."
              className="pl-10 bg-muted/50 border-0 focus-visible:ring-2 focus-visible:ring-primary cursor-pointer"
              readOnly
            />
          </div>
        </div>

        {/* Right section */}
        <div className="flex items-center space-x-2">
          {/* Mobile search toggle */}
          <Button
            variant="ghost"
            size="sm"
            onClick={handleSearchClick}
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

    </header>
  );
};

export default Header;