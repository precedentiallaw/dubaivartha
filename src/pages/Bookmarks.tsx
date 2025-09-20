import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Trash2, BookmarkX } from 'lucide-react';
import ArticleCard from '@/components/ArticleCard';
import { Article } from '@/hooks/useArticles';
import { useToast } from '@/hooks/use-toast';

interface BookmarksProps {
  onBack: () => void;
  onArticleClick: (article: Article) => void;
}

const Bookmarks = ({ onBack, onArticleClick }: BookmarksProps) => {
  const [bookmarks, setBookmarks] = useState<Article[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    loadBookmarks();
  }, []);

  const loadBookmarks = () => {
    try {
      const stored = localStorage.getItem('dubai-vartha-bookmarks');
      const bookmarkData = stored ? JSON.parse(stored) : [];
      setBookmarks(bookmarkData);
    } catch (error) {
      console.error('Error loading bookmarks:', error);
      setBookmarks([]);
    }
  };

  const removeBookmark = (articleId: string) => {
    const updatedBookmarks = bookmarks.filter(bookmark => bookmark.id !== articleId);
    setBookmarks(updatedBookmarks);
    
    try {
      localStorage.setItem('dubai-vartha-bookmarks', JSON.stringify(updatedBookmarks));
      toast({
        title: "Bookmark removed",
        description: "Article removed from your bookmarks",
      });
    } catch (error) {
      console.error('Error saving bookmarks:', error);
    }
  };

  const clearAllBookmarks = () => {
    setBookmarks([]);
    
    try {
      localStorage.removeItem('dubai-vartha-bookmarks');
      toast({
        title: "All bookmarks cleared",
        description: "Your reading list has been emptied",
      });
    } catch (error) {
      console.error('Error clearing bookmarks:', error);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm" onClick={onBack}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back
            </Button>
            <div>
              <h1 className="text-2xl font-bold">Your Bookmarks</h1>
              <p className="text-sm text-muted-foreground">
                {bookmarks.length} saved article{bookmarks.length !== 1 ? 's' : ''}
              </p>
            </div>
          </div>
          
          {bookmarks.length > 0 && (
            <Button
              variant="outline"
              size="sm"
              onClick={clearAllBookmarks}
              className="text-destructive hover:text-destructive"
            >
              <Trash2 className="h-4 w-4 mr-2" />
              Clear All
            </Button>
          )}
        </div>

        {/* Bookmarks Content */}
        {bookmarks.length === 0 ? (
          <div className="text-center py-16">
            <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
              <BookmarkX className="h-8 w-8 text-muted-foreground" />
            </div>
            <h2 className="text-xl font-semibold mb-2">No bookmarks yet</h2>
            <p className="text-muted-foreground mb-6 max-w-md mx-auto">
              Start building your reading list by bookmarking articles you want to read later.
            </p>
            <Button onClick={onBack}>
              Browse Articles
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {bookmarks.map((article) => (
              <div key={article.id} className="relative group">
                <ArticleCard
                  article={article}
                  onClick={onArticleClick}
                />
                {/* Remove bookmark button */}
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => removeBookmark(article.id)}
                  className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Bookmarks;