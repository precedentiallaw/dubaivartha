-- Create articles table for RSS feed content
CREATE TABLE public.articles (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  excerpt TEXT,
  content TEXT,
  image_url TEXT,
  published_at TIMESTAMP WITH TIME ZONE NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  author TEXT,
  category TEXT,
  source_url TEXT UNIQUE,
  is_breaking BOOLEAN DEFAULT false,
  read_time INTEGER DEFAULT 5,
  views INTEGER DEFAULT 0,
  cached_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.articles ENABLE ROW LEVEL SECURITY;

-- Create policies - articles are public read-only
CREATE POLICY "Articles are viewable by everyone" 
ON public.articles 
FOR SELECT 
USING (true);

-- Create indexes for better performance
CREATE INDEX idx_articles_published_at ON public.articles(published_at DESC);
CREATE INDEX idx_articles_category ON public.articles(category);
CREATE INDEX idx_articles_is_breaking ON public.articles(is_breaking) WHERE is_breaking = true;
CREATE INDEX idx_articles_slug ON public.articles(slug);

-- Create function to generate slug from title
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
$$ LANGUAGE plpgsql;

-- Create trigger for automatic slug generation
CREATE TRIGGER articles_generate_slug_trigger
  BEFORE INSERT OR UPDATE ON public.articles
  FOR EACH ROW
  EXECUTE FUNCTION public.generate_slug_from_title();

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_articles_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_articles_updated_at
  BEFORE UPDATE ON public.articles
  FOR EACH ROW
  EXECUTE FUNCTION public.update_articles_updated_at();