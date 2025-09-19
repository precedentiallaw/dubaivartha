import { Clock, Eye, Share2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export interface Article {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  content: string | null;
  image_url: string | null;
  published_at: string;
  updated_at: string;
  created_at: string;
  author: string | null;
  category: string | null;
  source_url: string | null;
  is_breaking: boolean | null;
  read_time: number | null;
  views: number | null;
  cached_at: string | null;
}

interface ArticleCardProps {
  article: Article;
  variant?: "default" | "featured" | "compact";
  onClick: (article: Article) => void;
}

const ArticleCard = ({ article, variant = "default", onClick }: ArticleCardProps) => {
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

  if (variant === "featured") {
    return (
      <Card className="overflow-hidden hover-lift cursor-pointer group" onClick={() => onClick(article)}>
        <div className="relative">
          <img
            src={displayImage}
            alt={displayTitle}
            className="w-full h-64 md:h-80 object-cover group-hover:scale-105 transition-transform duration-300"
          />
          {displayIsBreaking && (
            <Badge className="absolute top-4 left-4 bg-breaking text-breaking-foreground breaking-animation">
              BREAKING
            </Badge>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
          <div className="absolute bottom-4 left-4 right-4">
            <Badge variant="secondary" className="mb-2">
              {displayCategory}
            </Badge>
            <h2 className="text-xl md:text-2xl font-bold text-white mb-2">
              {displayTitle}
            </h2>
            <p className="text-white/90 text-sm mb-3 line-clamp-2">{displayExcerpt}</p>
            <div className="flex items-center text-white/80 text-sm space-x-4">
              <div className="flex items-center space-x-1">
                <Clock className="h-4 w-4" />
                <span>{formatTimeAgo(article.published_at)}</span>
              </div>
              <div className="flex items-center space-x-1">
                <Eye className="h-4 w-4" />
                <span>{formatViews(displayViews)}</span>
              </div>
            </div>
          </div>
        </div>
      </Card>
    );
  }

  if (variant === "compact") {
    return (
      <Card className="overflow-hidden hover-lift cursor-pointer" onClick={() => onClick(article)}>
        <CardContent className="p-4">
          <div className="flex space-x-3">
            <img
              src={displayImage}
              alt={displayTitle}
              className="w-20 h-20 object-cover rounded-md flex-shrink-0"
            />
            <div className="flex-1">
              <div className="flex items-center space-x-2 mb-2">
                <Badge variant="outline" className="text-xs">
                  {displayCategory}
                </Badge>
                {displayIsBreaking && (
                  <Badge className="text-xs bg-breaking text-breaking-foreground">
                    BREAKING
                  </Badge>
                )}
              </div>
              <h3 className="font-semibold text-sm leading-tight mb-1 line-clamp-2">
                {displayTitle}
              </h3>
              <div className="flex items-center text-muted-foreground text-xs space-x-3">
                <span>{formatTimeAgo(article.published_at)}</span>
                <span>{formatViews(displayViews)} views</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="overflow-hidden hover-lift cursor-pointer group" onClick={() => onClick(article)}>
      <div className="relative">
        <img
          src={displayImage}
          alt={displayTitle}
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        {displayIsBreaking && (
          <Badge className="absolute top-3 left-3 bg-breaking text-breaking-foreground breaking-animation">
            BREAKING
          </Badge>
        )}
      </div>
      <CardContent className="p-4">
        <div className="flex items-center justify-between mb-2">
          <Badge variant="outline">{displayCategory}</Badge>
          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
            <Share2 className="h-4 w-4" />
          </Button>
        </div>
        
        <h3 className="font-semibold text-lg mb-2 line-clamp-2 group-hover:text-primary transition-colors">
          {displayTitle}
        </h3>
        
        <p className="text-muted-foreground text-sm mb-3 line-clamp-2">
          {displayExcerpt}
        </p>
        
        <div className="flex items-center justify-between text-sm text-muted-foreground">
          <div className="flex items-center space-x-3">
            <div className="flex items-center space-x-1">
              <Clock className="h-4 w-4" />
              <span>{formatTimeAgo(article.published_at)}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Eye className="h-4 w-4" />
              <span>{formatViews(displayViews)}</span>
            </div>
          </div>
          <span className="text-xs">{displayReadTime} min read</span>
        </div>
      </CardContent>
    </Card>
  );
};

export default ArticleCard;