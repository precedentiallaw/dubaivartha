-- Add full-text search functionality to articles table
-- Create a search function that can search through title, excerpt, and content

-- Add a tsvector column for full-text search
ALTER TABLE public.articles ADD COLUMN IF NOT EXISTS search_vector tsvector;

-- Create an index on the search vector for performance
CREATE INDEX IF NOT EXISTS articles_search_idx ON public.articles USING GIN(search_vector);

-- Create a function to update the search vector
CREATE OR REPLACE FUNCTION public.update_articles_search_vector()
RETURNS TRIGGER AS $$
BEGIN
  NEW.search_vector = to_tsvector('english', 
    COALESCE(NEW.title, '') || ' ' || 
    COALESCE(NEW.excerpt, '') || ' ' || 
    COALESCE(NEW.content, '') || ' ' ||
    COALESCE(NEW.author, '') || ' ' ||
    COALESCE(NEW.category, '')
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger to automatically update search vector
DROP TRIGGER IF EXISTS update_articles_search_vector_trigger ON public.articles;
CREATE TRIGGER update_articles_search_vector_trigger
  BEFORE INSERT OR UPDATE ON public.articles
  FOR EACH ROW
  EXECUTE FUNCTION public.update_articles_search_vector();

-- Update existing records with search vectors
UPDATE public.articles SET search_vector = to_tsvector('english', 
  COALESCE(title, '') || ' ' || 
  COALESCE(excerpt, '') || ' ' || 
  COALESCE(content, '') || ' ' ||
  COALESCE(author, '') || ' ' ||
  COALESCE(category, '')
);

-- Create a search function that returns ranked results
CREATE OR REPLACE FUNCTION public.search_articles(search_query text, max_results integer DEFAULT 20)
RETURNS TABLE (
  id uuid,
  title text,
  slug text,
  excerpt text,
  content text,
  image_url text,
  published_at timestamp with time zone,
  updated_at timestamp with time zone,
  created_at timestamp with time zone,
  author text,
  category text,
  source_url text,
  is_breaking boolean,
  read_time integer,
  views integer,
  cached_at timestamp with time zone,
  search_rank real
) AS $$
BEGIN
  RETURN QUERY
  SELECT 
    a.id,
    a.title,
    a.slug,
    a.excerpt,
    a.content,
    a.image_url,
    a.published_at,
    a.updated_at,
    a.created_at,
    a.author,
    a.category,
    a.source_url,
    a.is_breaking,
    a.read_time,
    a.views,
    a.cached_at,
    ts_rank(a.search_vector, plainto_tsquery('english', search_query)) as search_rank
  FROM public.articles a
  WHERE a.search_vector @@ plainto_tsquery('english', search_query)
  ORDER BY search_rank DESC, a.published_at DESC
  LIMIT max_results;
END;
$$ LANGUAGE plpgsql;