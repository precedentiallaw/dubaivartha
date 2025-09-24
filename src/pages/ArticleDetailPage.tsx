import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { Article } from "@/hooks/useArticles";
import ArticleDetail from "@/components/ArticleDetail";
import { NewsGridSkeleton } from "@/components/ui/loading-skeleton";

const ArticleDetailPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [article, setArticle] = useState<Article | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchArticle = async () => {
      if (!slug) return;

      try {
        setLoading(true);
        setError(null);

        // Fetch article by slug
        const { data, error: fetchError } = await supabase
          .from('articles')
          .select('*')
          .eq('slug', slug)
          .single();

        if (fetchError) {
          throw fetchError;
        }

        if (data) {
          setArticle(data);
          
          // Update view count
          await supabase
            .from('articles')
            .update({ views: (data.views || 0) + 1 })
            .eq('id', data.id);
        }
      } catch (err) {
        console.error('Error fetching article:', err);
        setError(err instanceof Error ? err.message : 'Failed to load article');
      } finally {
        setLoading(false);
      }
    };

    fetchArticle();
  }, [slug]);

  const handleBack = () => {
    navigate(-1);
  };

  const handleRelatedArticleClick = (relatedArticle: Article) => {
    navigate(`/article/${relatedArticle.slug}`);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <header className="sticky top-0 z-40 border-b bg-card/95 backdrop-blur">
          <div className="container px-4">
            <div className="flex items-center gap-4 h-16">
              <Button variant="ghost" size="sm" onClick={handleBack}>
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back
              </Button>
            </div>
          </div>
        </header>
        <div className="container px-4 py-6">
          <NewsGridSkeleton />
        </div>
      </div>
    );
  }

  if (error || !article) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Article Not Found</h1>
          <p className="text-muted-foreground mb-4">
            {error || "The article you're looking for doesn't exist."}
          </p>
          <Button onClick={handleBack}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Go Back
          </Button>
        </div>
      </div>
    );
  }

  return (
    <ArticleDetail
      article={article}
      onBack={handleBack}
      onRelatedArticleClick={handleRelatedArticleClick}
    />
  );
};

export default ArticleDetailPage;