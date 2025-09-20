import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Bookmark, BookmarkCheck } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Article } from '@/hooks/useArticles';

interface BookmarkButtonProps {
  article: Article;
  variant?: "default" | "ghost" | "outline";
  size?: "default" | "sm" | "lg";
  className?: string;
}

const BookmarkButton = ({ 
  article, 
  variant = "ghost", 
  size = "sm",
  className = ""
}: BookmarkButtonProps) => {
  const [isBookmarked, setIsBookmarked] = useState(false);
  const { toast } = useToast();

  // Load bookmark status from localStorage
  useEffect(() => {
    const bookmarks = getBookmarks();
    setIsBookmarked(bookmarks.some(bookmark => bookmark.id === article.id));
  }, [article.id]);

  const getBookmarks = (): Article[] => {
    try {
      const stored = localStorage.getItem('dubai-vartha-bookmarks');
      return stored ? JSON.parse(stored) : [];
    } catch (error) {
      console.error('Error loading bookmarks:', error);
      return [];
    }
  };

  const saveBookmarks = (bookmarks: Article[]) => {
    try {
      localStorage.setItem('dubai-vartha-bookmarks', JSON.stringify(bookmarks));
    } catch (error) {
      console.error('Error saving bookmarks:', error);
    }
  };

  const toggleBookmark = () => {
    const bookmarks = getBookmarks();
    
    if (isBookmarked) {
      // Remove bookmark
      const updatedBookmarks = bookmarks.filter(bookmark => bookmark.id !== article.id);
      saveBookmarks(updatedBookmarks);
      setIsBookmarked(false);
      
      toast({
        title: "Bookmark removed",
        description: "Article removed from your bookmarks",
      });
    } else {
      // Add bookmark
      const updatedBookmarks = [...bookmarks, article];
      saveBookmarks(updatedBookmarks);
      setIsBookmarked(true);
      
      toast({
        title: "Article bookmarked",
        description: "Added to your reading list",
      });
    }
  };

  return (
    <Button
      variant={variant}
      size={size}
      onClick={toggleBookmark}
      className={`${className} transition-colors`}
      aria-label={isBookmarked ? "Remove bookmark" : "Add bookmark"}
    >
      {isBookmarked ? (
        <BookmarkCheck className="h-4 w-4 text-brand-blue" fill="currentColor" />
      ) : (
        <Bookmark className="h-4 w-4" />
      )}
    </Button>
  );
};

export default BookmarkButton;