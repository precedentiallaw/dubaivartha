import { useState, useEffect } from 'react';
import { Search, X } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface SearchBarProps {
  onSearch: (query: string) => void;
  onClear: () => void;
  isSearching?: boolean;
  placeholder?: string;
  className?: string;
}

const SearchBar = ({ 
  onSearch, 
  onClear, 
  isSearching = false, 
  placeholder = "Search articles...",
  className 
}: SearchBarProps) => {
  const [query, setQuery] = useState('');
  const [isFocused, setIsFocused] = useState(false);

  // Debounced search
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (query.trim()) {
        onSearch(query);
      } else {
        onClear();
      }
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [query, onSearch, onClear]);

  const handleClear = () => {
    setQuery('');
    onClear();
  };

  return (
    <div className={cn("relative", className)}>
      <div className={cn(
        "relative flex items-center transition-all duration-200",
        isFocused && "ring-2 ring-brand-gradient/20 ring-offset-2 rounded-lg"
      )}>
        <Search className={cn(
          "absolute left-3 h-4 w-4 transition-colors",
          isFocused ? "text-primary" : "text-muted-foreground"
        )} />
        <Input
          type="text"
          placeholder={placeholder}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          className={cn(
            "pl-10 pr-10 h-11 border-0 bg-muted/50 focus-visible:ring-0 focus-visible:ring-offset-0",
            "placeholder:text-muted-foreground/60"
          )}
          disabled={isSearching}
        />
        {(query || isSearching) && (
          <div className="absolute right-3 flex items-center">
            {isSearching ? (
              <div className="w-4 h-4 border-2 border-primary/30 border-t-primary rounded-full animate-spin" />
            ) : (
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={handleClear}
                className="h-6 w-6 p-0 hover:bg-transparent"
              >
                <X className="h-3 w-3" />
              </Button>
            )}
          </div>
        )}
      </div>
      
      {/* Search suggestions could go here */}
      {isFocused && query && (
        <div className="absolute top-full left-0 right-0 z-50 mt-1 bg-card border rounded-lg shadow-lg p-2">
          <div className="text-xs text-muted-foreground">
            Press Enter to search for "{query}"
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchBar;