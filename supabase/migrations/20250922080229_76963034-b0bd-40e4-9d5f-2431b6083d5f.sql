-- Fix security warnings by setting search_path for all functions

-- Update update_articles_search_vector function
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
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

-- Update search_articles function
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
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

-- Update existing functions with proper search_path
CREATE OR REPLACE FUNCTION public.update_articles_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

CREATE OR REPLACE FUNCTION public.generate_slug_from_title()
RETURNS TRIGGER AS $$
BEGIN
  -- Generate a simple slug from title (remove special chars, convert to lowercase)
  NEW.slug = lower(regexp_replace(regexp_replace(NEW.title, '[^\w\s-]', '', 'g'), '\s+', '-', 'g'));
  -- Ensure uniqueness by appending timestamp if needed
  IF EXISTS (SELECT 1 FROM public.articles WHERE slug = NEW.slug AND id != NEW.id) THEN
    NEW.slug = NEW.slug || '-' || extract(epoch from now())::text;
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;