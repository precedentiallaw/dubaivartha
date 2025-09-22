import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useSearch } from '@/hooks/useSearch';
import SearchBar from '@/components/search/SearchBar';
import SearchResults from '@/components/search/SearchResults';
import { Article } from '@/hooks/useArticles';

interface SearchPageProps {
  onBack: () => void;
  onArticleClick: (article: Article) => void;
}

const Search = ({ onBack, onArticleClick }: SearchPageProps) => {
  const {
    searchResults,
    isSearching,
    searchError,
    searchQuery,
    performSearch,
    clearSearch
  } = useSearch();

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-40 border-b bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/60">
        <div className="container px-4">
          <div className="flex items-center gap-4 h-16">
            <Button
              variant="ghost"
              size="sm"
              onClick={onBack}
              className="flex items-center gap-2"
            >
              <ArrowLeft className="h-4 w-4" />
              Back
            </Button>
            
            <div className="flex-1 max-w-2xl">
              <SearchBar
                onSearch={performSearch}
                onClear={clearSearch}
                isSearching={isSearching}
                placeholder="Search Dubai Vartha articles..."
              />
            </div>
          </div>
        </div>
      </header>

      {/* Search Results */}
      <main className="container px-4 py-6">
        <SearchResults
          results={searchResults}
          onArticleClick={onArticleClick}
          isSearching={isSearching}
          searchQuery={searchQuery}
          error={searchError}
        />
      </main>
    </div>
  );
};

export default Search;