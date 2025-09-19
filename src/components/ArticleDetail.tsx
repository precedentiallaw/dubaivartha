import { ArrowLeft, Clock, Eye, Share2, Heart, MessageCircle, Bookmark } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Article } from "@/hooks/useArticles";

interface ArticleDetailProps {
  article: Article;
  onBack: () => void;
}

const ArticleDetail = ({ article, onBack }: ArticleDetailProps) => {
  const formatTimeAgo = (dateString: string) => {
    const now = new Date();
    const published = new Date(dateString);
    const diffInHours = Math.floor((now.getTime() - published.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return "Just now";
    if (diffInHours < 24) return `${diffInHours}h ago`;
    return `${Math.floor(diffInHours / 24)}d ago`;
  };

  const formatViews = (views: number) => {
    if (views >= 1000000) return `${(views / 1000000).toFixed(1)}M`;
    if (views >= 1000) return `${(views / 1000).toFixed(1)}K`;
    return views.toString();
  };

  // Provide defaults for optional fields
  const displayTitle = article.title;
  const displayExcerpt = article.excerpt || '';
  const displayImage = article.image_url || '/placeholder.svg';
  const displayCategory = article.category || 'General';
  const displayAuthor = article.author || 'Dubai Vartha';
  const displayViews = article.views || 0;
  const displayReadTime = article.read_time || 5;
  const displayIsBreaking = article.is_breaking || false;
  const displayContent = article.content || displayExcerpt;

  return (
    <div className="max-w-4xl mx-auto px-4 py-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <Button variant="ghost" onClick={onBack} className="flex items-center space-x-2">
          <ArrowLeft className="h-4 w-4" />
          <span>Back</span>
        </Button>
        
        <div className="flex items-center space-x-2">
          <Button variant="ghost" size="sm">
            <Bookmark className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="sm">
            <Share2 className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Article Header */}
      <div className="mb-6">
        <div className="flex items-center space-x-3 mb-4">
          <Badge variant="default" className="bg-brand-gradient">
            {displayCategory}
          </Badge>
          {displayIsBreaking && (
            <Badge className="bg-breaking text-breaking-foreground breaking-animation">
              BREAKING NEWS
            </Badge>
          )}
        </div>

        <h1 className="text-3xl md:text-4xl font-bold mb-4 leading-tight">
          {displayTitle}
        </h1>

        <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
          {displayExcerpt}
        </p>

        <div className="flex items-center justify-between flex-wrap gap-4">
          <div className="flex items-center space-x-4 text-sm text-muted-foreground">
            <span>By <strong>{displayAuthor}</strong></span>
            <div className="flex items-center space-x-1">
              <Clock className="h-4 w-4" />
              <span>{formatTimeAgo(article.published_at)}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Eye className="h-4 w-4" />
              <span>{formatViews(displayViews)} views</span>
            </div>
            <span>{displayReadTime} min read</span>
          </div>
        </div>
      </div>

      <Separator className="mb-6" />

      {/* Article Image */}
      {displayImage !== '/placeholder.svg' && (
        <div className="mb-8">
          <img
            src={displayImage}
            alt={displayTitle}
            className="w-full h-64 md:h-96 object-cover rounded-lg shadow-soft"
          />
        </div>
      )}

      {/* Article Content */}
      <div className="prose prose-lg max-w-none mb-8">
        <div 
          className="text-foreground leading-relaxed"
          dangerouslySetInnerHTML={{ __html: displayContent }}
        />
      </div>

      {/* Article Actions */}
      <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg mb-8">
        <div className="flex items-center space-x-4">
          <Button variant="ghost" size="sm" className="flex items-center space-x-2">
            <Heart className="h-4 w-4" />
            <span>Like</span>
            <span className="text-muted-foreground">(24)</span>
          </Button>
          <Button variant="ghost" size="sm" className="flex items-center space-x-2">
            <MessageCircle className="h-4 w-4" />
            <span>Comment</span>
            <span className="text-muted-foreground">(8)</span>
          </Button>
        </div>
        <Button variant="ghost" size="sm" className="flex items-center space-x-2">
          <Share2 className="h-4 w-4" />
          <span>Share</span>
        </Button>
      </div>

      {/* Related Articles */}
      <div>
        <h3 className="text-xl font-semibold mb-4">Related Articles</h3>
        <div className="grid gap-4">
          {/* Related articles would be loaded here */}
          <div className="text-muted-foreground text-center py-8">
            Loading related articles...
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArticleDetail;