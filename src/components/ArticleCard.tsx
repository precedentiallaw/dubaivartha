import { Clock, Eye, Share2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export interface Article {
  id: string;
  title: string;
  titleMalayalam?: string;
  excerpt: string;
  image: string;
  category: string;
  publishedAt: string;
  readTime: number;
  views: number;
  isBreaking?: boolean;
  author: string;
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

  if (variant === "featured") {
    return (
      <Card className="overflow-hidden hover-lift cursor-pointer group" onClick={() => onClick(article)}>
        <div className="relative">
          <img
            src={article.image}
            alt={article.title}
            className="w-full h-64 md:h-80 object-cover group-hover:scale-105 transition-transform duration-300"
          />
          {article.isBreaking && (
            <Badge className="absolute top-4 left-4 bg-breaking text-breaking-foreground breaking-animation">
              BREAKING
            </Badge>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
          <div className="absolute bottom-4 left-4 right-4">
            <Badge variant="secondary" className="mb-2">
              {article.category}
            </Badge>
            <h2 className="text-xl md:text-2xl font-bold text-white mb-2">
              {article.title}
            </h2>
            {article.titleMalayalam && (
              <p className="text-white/90 text-sm mb-3">{article.titleMalayalam}</p>
            )}
            <div className="flex items-center text-white/80 text-sm space-x-4">
              <div className="flex items-center space-x-1">
                <Clock className="h-4 w-4" />
                <span>{formatTimeAgo(article.publishedAt)}</span>
              </div>
              <div className="flex items-center space-x-1">
                <Eye className="h-4 w-4" />
                <span>{formatViews(article.views)}</span>
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
              src={article.image}
              alt={article.title}
              className="w-20 h-20 object-cover rounded-md flex-shrink-0"
            />
            <div className="flex-1">
              <div className="flex items-center space-x-2 mb-2">
                <Badge variant="outline" className="text-xs">
                  {article.category}
                </Badge>
                {article.isBreaking && (
                  <Badge className="text-xs bg-breaking text-breaking-foreground">
                    BREAKING
                  </Badge>
                )}
              </div>
              <h3 className="font-semibold text-sm leading-tight mb-1 line-clamp-2">
                {article.title}
              </h3>
              <div className="flex items-center text-muted-foreground text-xs space-x-3">
                <span>{formatTimeAgo(article.publishedAt)}</span>
                <span>{formatViews(article.views)} views</span>
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
          src={article.image}
          alt={article.title}
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        {article.isBreaking && (
          <Badge className="absolute top-3 left-3 bg-breaking text-breaking-foreground breaking-animation">
            BREAKING
          </Badge>
        )}
      </div>
      <CardContent className="p-4">
        <div className="flex items-center justify-between mb-2">
          <Badge variant="outline">{article.category}</Badge>
          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
            <Share2 className="h-4 w-4" />
          </Button>
        </div>
        
        <h3 className="font-semibold text-lg mb-2 line-clamp-2 group-hover:text-primary transition-colors">
          {article.title}
        </h3>
        
        {article.titleMalayalam && (
          <p className="text-muted-foreground text-sm mb-2 line-clamp-1">
            {article.titleMalayalam}
          </p>
        )}
        
        <p className="text-muted-foreground text-sm mb-3 line-clamp-2">
          {article.excerpt}
        </p>
        
        <div className="flex items-center justify-between text-sm text-muted-foreground">
          <div className="flex items-center space-x-3">
            <div className="flex items-center space-x-1">
              <Clock className="h-4 w-4" />
              <span>{formatTimeAgo(article.publishedAt)}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Eye className="h-4 w-4" />
              <span>{formatViews(article.views)}</span>
            </div>
          </div>
          <span className="text-xs">{article.readTime} min read</span>
        </div>
      </CardContent>
    </Card>
  );
};

export default ArticleCard;