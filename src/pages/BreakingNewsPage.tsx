import { ArrowLeft, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useArticles, Article } from "@/hooks/useArticles";
import ArticleCard from "@/components/ArticleCard";
import { NewsGridSkeleton } from "@/components/ui/loading-skeleton";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

const BreakingNewsPage = () => {
  const navigate = useNavigate();
  const [breakingArticles, setBreakingArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBreakingNews = async () => {
      try {
        setLoading(true);
        setError(null);

        const { data, error: fetchError } = await supabase
          .from('articles')
          .select('*')
          .eq('is_breaking', true)
          .order('published_at', { ascending: false })
          .limit(20);

        if (fetchError) {
          throw fetchError;
        }

        setBreakingArticles(data || []);
      } catch (err) {
        console.error('Error fetching breaking news:', err);
        setError(err instanceof Error ? err.message : 'Failed to load breaking news');
      } finally {
        setLoading(false);
      }
    };

    fetchBreakingNews();
  }, []);

  const handleArticleClick = (article: Article) => {
    navigate(`/article/${article.slug}`);
  };

  const handleBack = () => {
    navigate('/');
  };

  const refreshBreakingNews = async () => {
    setLoading(true);
    // Refetch breaking news
    window.location.reload();
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-40 border-b bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/60">
        <div className="container px-4">
          <div className="flex items-center gap-4 h-16">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleBack}
              className="flex items-center gap-2"
            >
              <ArrowLeft className="h-4 w-4" />
              Back
            </Button>
            
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2">
                <Zap className="h-5 w-5 text-breaking" />
                <div className="h-2 w-2 rounded-full bg-breaking breaking-animation"></div>
              </div>
              <div>
                <h1 className="text-xl font-bold text-breaking">Breaking News</h1>
                <p className="text-sm text-muted-foreground">ബ്രേക്കിംഗ് ന്യൂസ്</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="container px-4 py-6">
        {/* Breaking News Alert */}
        <div className="mb-8 p-6 bg-breaking/10 border border-breaking/20 rounded-lg">
          <div className="flex items-center gap-3 mb-3">
            <div className="h-3 w-3 rounded-full bg-breaking breaking-animation"></div>
            <h2 className="text-lg font-semibold text-breaking">LIVE UPDATES</h2>
          </div>
          <p className="text-muted-foreground">
            Stay informed with the latest breaking news from Dubai, UAE, and around the world. 
            Our team works around the clock to bring you verified, up-to-date information.
          </p>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-destructive/10 border border-destructive/20 rounded-lg">
            <p className="text-destructive text-sm">{error}</p>
            <Button size="sm" onClick={refreshBreakingNews} className="mt-2">
              Try Again
            </Button>
          </div>
        )}

        {loading ? (
          <NewsGridSkeleton />
        ) : (
          <>
            {/* Breaking Articles Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {breakingArticles.map((article) => (
                <ArticleCard
                  key={article.id}
                  article={article}
                  onClick={() => handleArticleClick(article)}
                />
              ))}
            </div>

            {breakingArticles.length === 0 && !loading && (
              <div className="text-center py-12">
                <Zap className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">No breaking news at the moment</h3>
                <p className="text-muted-foreground mb-4">
                  Check back soon for the latest updates, or browse our other news categories.
                </p>
                <div className="flex gap-2 justify-center">
                  <Button onClick={refreshBreakingNews}>
                    Refresh News
                  </Button>
                  <Button variant="outline" onClick={handleBack}>
                    Browse All News
                  </Button>
                </div>
              </div>
            )}
          </>
        )}
      </main>
    </div>
  );
};

export default BreakingNewsPage;