import { ArrowLeft, Clock, Eye, Share2, Heart, MessageCircle, Bookmark } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Article } from "./ArticleCard";

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
            {article.category}
          </Badge>
          {article.isBreaking && (
            <Badge className="bg-breaking text-breaking-foreground breaking-animation">
              BREAKING NEWS
            </Badge>
          )}
        </div>

        <h1 className="text-3xl md:text-4xl font-bold mb-4 leading-tight">
          {article.title}
        </h1>

        {article.titleMalayalam && (
          <h2 className="text-xl md:text-2xl text-muted-foreground mb-4">
            {article.titleMalayalam}
          </h2>
        )}

        <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
          {article.excerpt}
        </p>

        <div className="flex items-center justify-between flex-wrap gap-4">
          <div className="flex items-center space-x-4 text-sm text-muted-foreground">
            <span>By <strong>{article.author}</strong></span>
            <div className="flex items-center space-x-1">
              <Clock className="h-4 w-4" />
              <span>{formatTimeAgo(article.publishedAt)}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Eye className="h-4 w-4" />
              <span>{formatViews(article.views)} views</span>
            </div>
            <span>{article.readTime} min read</span>
          </div>
        </div>
      </div>

      <Separator className="mb-6" />

      {/* Article Image */}
      <div className="mb-8">
        <img
          src={article.image}
          alt={article.title}
          className="w-full h-64 md:h-96 object-cover rounded-lg shadow-soft"
        />
      </div>

      {/* Article Content */}
      <div className="prose prose-lg max-w-none mb-8">
        <p>
          Dubai's announcement of a comprehensive new visa policy marks a significant step in the emirate's 
          efforts to strengthen its position as a global tourism and business hub. The new regulations, which 
          come into effect next month, promise to streamline the visa application process while enhancing 
          security measures.
        </p>

        <p>
          The policy introduces several key changes, including extended visa validity periods for tourists, 
          simplified application procedures for business visitors, and enhanced digital processing capabilities. 
          These changes are expected to attract millions of additional visitors annually.
        </p>

        <h3>Key Features of the New Policy</h3>

        <p>
          Among the most significant changes is the introduction of a new 10-year multiple-entry visa for 
          frequent visitors, designed specifically for business travelers and those with family connections 
          to the UAE. This visa category aims to facilitate long-term economic relationships and boost 
          Dubai's position as a regional business center.
        </p>

        <p>
          Tourism officials expect the new policy to contribute significantly to Dubai's goal of attracting 
          25 million visitors annually by 2025. The emirate has been consistently ranked among the world's 
          top tourist destinations, and these policy changes are designed to maintain its competitive edge.
        </p>

        <h3>Impact on Malayalam Community</h3>

        <p>
          The Malayalam-speaking community in the UAE, which represents one of the largest expatriate groups, 
          stands to benefit significantly from these changes. The new family reunion visa categories and 
          extended validity periods will make it easier for families to maintain connections across borders.
        </p>

        <p>
          Community leaders have welcomed the announcement, noting that the simplified procedures will 
          reduce bureaucratic challenges that have historically affected visa applications. The changes 
          are particularly beneficial for elderly parents visiting their children in the UAE.
        </p>
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