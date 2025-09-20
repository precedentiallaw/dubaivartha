import { useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Clock, Eye } from 'lucide-react';
import { Article } from '@/hooks/useArticles';

interface RelatedArticlesProps {
  currentArticle: Article;
  allArticles: Article[];
  onArticleClick: (article: Article) => void;
  className?: string;
}

const RelatedArticles = ({ 
  currentArticle, 
  allArticles, 
  onArticleClick,
  className = ""
}: RelatedArticlesProps) => {
  
  const relatedArticles = useMemo(() => {
    return allArticles
      .filter(article => article.id !== currentArticle.id)
      .filter(article => {
        // Match by category
        if (article.category && currentArticle.category) {
          return article.category.toLowerCase() === currentArticle.category.toLowerCase();
        }
        // Match by keywords in title
        const currentWords = currentArticle.title.toLowerCase().split(' ');
        const articleWords = article.title.toLowerCase().split(' ');
        const commonWords = currentWords.filter(word => 
          word.length > 3 && articleWords.includes(word)
        );
        return commonWords.length > 0;
      })
      .slice(0, 4); // Limit to 4 related articles
  }, [currentArticle, allArticles]);

  if (relatedArticles.length === 0) {
    return null;
  }

  const formatTimeAgo = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${diffInHours}h ago`;
    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays < 7) return `${diffInDays}d ago`;
    return date.toLocaleDateString();
  };

  const formatViews = (views: number | null) => {
    if (!views) return '0';
    if (views >= 1000000) return `${(views / 1000000).toFixed(1)}M`;
    if (views >= 1000) return `${(views / 1000).toFixed(1)}K`;
    return views.toString();
  };

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className="text-lg">Related Articles</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {relatedArticles.map((article) => (
          <div
            key={article.id}
            onClick={() => onArticleClick(article)}
            className="flex gap-3 p-3 rounded-lg hover:bg-card-hover cursor-pointer transition-colors group"
          >
            {/* Article Image */}
            {article.image_url && (
              <div className="flex-shrink-0">
                <img
                  src={article.image_url}
                  alt={article.title}
                  className="w-16 h-16 object-cover rounded-md"
                />
              </div>
            )}
            
            {/* Article Content */}
            <div className="flex-1 min-w-0">
              {/* Category Badge */}
              {article.category && (
                <Badge variant="secondary" className="mb-1 text-xs">
                  {article.category}
                </Badge>
              )}
              
              {/* Title */}
              <h4 className="font-medium text-sm line-clamp-2 group-hover:text-primary transition-colors">
                {article.title}
              </h4>
              
              {/* Metadata */}
              <div className="flex items-center gap-3 mt-2 text-xs text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  <span>{formatTimeAgo(article.published_at)}</span>
                </div>
                {article.views && (
                  <div className="flex items-center gap-1">
                    <Eye className="h-3 w-3" />
                    <span>{formatViews(article.views)}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export default RelatedArticles;