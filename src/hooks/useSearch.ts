import { useState, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Article } from './useArticles';

export interface SearchResult extends Article {
  search_rank: number;
}

export interface UseSearchResult {
  searchResults: SearchResult[];
  isSearching: boolean;
  searchError: string | null;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  performSearch: (query: string) => Promise<void>;
  clearSearch: () => void;
}

export function useSearch(): UseSearchResult {
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [searchError, setSearchError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const performSearch = useCallback(async (query: string) => {
    if (!query.trim()) {
      setSearchResults([]);
      return;
    }

    try {
      setIsSearching(true);
      setSearchError(null);
      
      console.log('Searching for:', query);

      // Use the custom search function
      const { data, error } = await supabase.rpc('search_articles', {
        search_query: query.trim(),
        max_results: 20
      });

      if (error) {
        throw error;
      }

      console.log('Search results:', data);
      setSearchResults(data || []);
      
    } catch (err) {
      console.error('Search error:', err);
      setSearchError(err instanceof Error ? err.message : 'Search failed');
      setSearchResults([]);
    } finally {
      setIsSearching(false);
    }
  }, []);

  const clearSearch = useCallback(() => {
    setSearchResults([]);
    setSearchQuery('');
    setSearchError(null);
  }, []);

  return {
    searchResults,
    isSearching,
    searchError,
    searchQuery,
    setSearchQuery,
    performSearch,
    clearSearch
  };
}