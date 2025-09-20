import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { ArrowLeft, Share2, Heart, MessageCircle, Eye, Clock } from "lucide-react";
import { Article } from "@/hooks/useArticles";
import BookmarkButton from "@/components/features/BookmarkButton";
import ReadingProgress from "@/components/features/ReadingProgress";
import RelatedArticles from "@/components/features/RelatedArticles";
import { useArticles } from "@/hooks/useArticles";

interface ArticleDetailProps {
  article: Article;
  onBack: () => void;
  onRelatedArticleClick?: (article: Article) => void;
}

const ArticleDetail = ({ article, onBack, onRelatedArticleClick }: ArticleDetailProps) => {
  const { articles } = useArticles();
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
    <>
      <ReadingProgress content={article.content || ""} />
      <div className="max-w-4xl mx-auto px-4 py-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <Button variant="ghost" onClick={onBack} className="flex items-center space-x-2">
            <ArrowLeft className="h-4 w-4" />
            <span>Back</span>
          </Button>
          
          <div className="flex items-center space-x-2">
            <BookmarkButton article={article} />
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
      {onRelatedArticleClick && (
        <RelatedArticles
          currentArticle={article}
          allArticles={articles}
          onArticleClick={onRelatedArticleClick}
          className="mb-8"
        />
      )}

      {/* Comments Section */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center gap-2 mb-4">
            <MessageCircle className="h-5 w-5" />
            <h3 className="font-semibold">Comments (3)</h3>
          </div>
          <p className="text-muted-foreground text-sm">Comments feature coming soon...</p>
        </CardContent>
      </Card>
    </div>
    </>
  );
};

export default ArticleDetail;