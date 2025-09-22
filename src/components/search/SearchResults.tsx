import { SearchResult } from '@/hooks/useSearch';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Clock, Eye, TrendingUp } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

interface SearchResultsProps {
  results: SearchResult[];
  onArticleClick: (article: SearchResult) => void;
  isSearching: boolean;
  searchQuery: string;
  error?: string | null;
}

const SearchResults = ({ 
  results, 
  onArticleClick, 
  isSearching, 
  searchQuery,
  error 
}: SearchResultsProps) => {
  if (isSearching) {
    return (
      <div className="space-y-4">
        {Array.from({ length: 3 }).map((_, i) => (
          <Card key={i} className="animate-pulse">
            <CardContent className="p-4">
              <div className="flex gap-4">
                <div className="w-24 h-16 bg-muted rounded-md flex-shrink-0" />
                <div className="flex-1 space-y-2">
                  <div className="h-4 bg-muted rounded w-3/4" />
                  <div className="h-3 bg-muted rounded w-1/2" />
                  <div className="h-3 bg-muted rounded w-1/4" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <Card className="border-destructive/20">
        <CardContent className="p-6 text-center">
          <div className="text-destructive mb-2">Search Error</div>
          <p className="text-sm text-muted-foreground">{error}</p>
        </CardContent>
      </Card>
    );
  }

  if (!searchQuery) {
    return (
      <Card>
        <CardContent className="p-6 text-center">
          <div className="text-muted-foreground">
            <TrendingUp className="h-8 w-8 mx-auto mb-2 opacity-50" />
            <p>Start typing to search articles...</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (results.length === 0) {
    return (
      <Card>
        <CardContent className="p-6 text-center">
          <div className="text-muted-foreground">
            <p>No articles found for "{searchQuery}"</p>
            <p className="text-sm mt-1">Try different keywords or check your spelling</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">
          Search Results for "{searchQuery}"
        </h3>
        <Badge variant="secondary">
          {results.length} result{results.length !== 1 ? 's' : ''}
        </Badge>
      </div>

      <div className="space-y-3">
        {results.map((article) => (
          <Card 
            key={article.id} 
            className="hover:shadow-md transition-shadow cursor-pointer"
            onClick={() => onArticleClick(article)}
          >
            <CardContent className="p-4">
              <div className="flex gap-4">
                {article.image_url && (
                  <div className="w-24 h-16 flex-shrink-0">
                    <img
                      src={article.image_url}
                      alt={article.title}
                      className="w-full h-full object-cover rounded-md"
                      loading="lazy"
                    />
                  </div>
                )}
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <h4 className="font-medium text-sm line-clamp-2 leading-tight">
                      {article.title}
                    </h4>
                    {article.is_breaking && (
                      <Badge variant="destructive" className="text-xs flex-shrink-0">
                        BREAKING
                      </Badge>
                    )}
                  </div>
                  
                  {article.excerpt && (
                    <p className="text-xs text-muted-foreground line-clamp-2 mb-2">
                      {article.excerpt}
                    </p>
                  )}
                  
                  <div className="flex items-center gap-4 text-xs text-muted-foreground">
                    {article.category && (
                      <Badge variant="outline" className="text-xs">
                        {article.category}
                      </Badge>
                    )}
                    
                    <div className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {formatDistanceToNow(new Date(article.published_at), { addSuffix: true })}
                    </div>
                    
                    {article.views && article.views > 0 && (
                      <div className="flex items-center gap-1">
                        <Eye className="h-3 w-3" />
                        {article.views}
                      </div>
                    )}
                    
                    <div className="flex items-center gap-1 ml-auto">
                      <TrendingUp className="h-3 w-3" />
                      <span>Relevance: {Math.round((article.search_rank || 0) * 100)}%</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default SearchResults;