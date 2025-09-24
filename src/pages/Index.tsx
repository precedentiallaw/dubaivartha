import { useState, useEffect } from "react";
import Header from "@/components/Header";
import Navigation from "@/components/Navigation";
import BreakingNews from "@/components/BreakingNews";
import ArticleCard from "@/components/ArticleCard";
import AdBanner from "@/components/AdBanner";
import SubscriberOffers from "@/components/SubscriberOffers";
import { useArticles, Article } from "@/hooks/useArticles";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { RefreshCw } from "lucide-react";
import { NewsGridSkeleton } from "@/components/ui/loading-skeleton";
import InstagramReels from "@/components/social/InstagramReels";

const Index = () => {
  const navigate = useNavigate();
  const [isDark, setIsDark] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { articles, loading, error, refreshArticles, fetchRSSFeed } = useArticles("home");

  useEffect(() => {
    // Apply theme
    if (isDark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDark]);

  // Fetch RSS feed on initial load
  useEffect(() => {
    fetchRSSFeed();
  }, []);

  const handleThemeToggle = () => {
    setIsDark(!isDark);
  };

  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleArticleClick = (article: Article) => {
    navigate(`/article/${article.slug}`);
  };

  // Filter featured articles
  const filterFeaturedArticles = () => {
    return articles.filter(article => article.is_breaking).slice(0, 1);
  };

  const filterRegularArticles = () => {
    return articles.filter(article => !article.is_breaking);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header
        onMenuClick={handleMenuToggle}
        isDark={isDark}
        onThemeToggle={handleThemeToggle}
      />

      <Navigation
        isOpen={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
      />

      <main className="md:ml-0 transition-all duration-300 ease-in-out">
        <div className="container mx-auto px-4 py-6">
          {/* Breaking News Ticker */}
          <BreakingNews />

          {/* Instagram Reels */}
          <div className="mb-8">
            <InstagramReels />
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-6 p-4 bg-destructive/10 border border-destructive/20 rounded-lg">
              <p className="text-destructive text-sm">{error}</p>
              <Button size="sm" onClick={refreshArticles} className="mt-2">
                Try Again
              </Button>
            </div>
          )}

          {/* Loading State */}
          {loading ? (
            <NewsGridSkeleton />
          ) : (
            <>
              {/* Featured Articles */}
              {filterFeaturedArticles().length > 0 && (
                <section className="mb-8">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-bold">Featured News</h2>
                    <div className="h-px flex-1 bg-border ml-4"></div>
                  </div>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {filterFeaturedArticles().map((article) => (
                      <ArticleCard
                        key={article.id}
                        article={article}
                        onClick={() => handleArticleClick(article)}
                      />
                    ))}
                  </div>
                </section>
              )}

              {/* Ad Banner */}
              <div className="mb-8">
                <AdBanner 
                  type="featured"
                  title="Special Offers for Dubai Vartha Readers"
                />
              </div>

              {/* Latest News */}
              <section className="mb-8">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold">Latest News</h2>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={refreshArticles}
                    disabled={loading}
                    className="flex items-center gap-2"
                  >
                    <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
                    Refresh News
                  </Button>
                </div>

                {/* Articles Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filterRegularArticles().map((article) => (
                    <ArticleCard
                      key={article.id}
                      article={article}
                      onClick={() => handleArticleClick(article)}
                    />
                  ))}
                </div>

                {/* Empty State */}
                {articles.length === 0 && !loading && (
                  <div className="text-center py-12">
                    <h3 className="text-lg font-semibold mb-2">No articles found</h3>
                    <p className="text-muted-foreground mb-4">
                      No articles are available at the moment. Please check back later.
                    </p>
                    <Button onClick={refreshArticles}>
                      <RefreshCw className="h-4 w-4 mr-2" />
                      Refresh Articles
                    </Button>
                  </div>
                )}
              </section>

              {/* Subscriber Offers */}
              <div className="mb-8">
                <SubscriberOffers />
              </div>
            </>
          )}
        </div>
      </main>
    </div>
  );
};

export default Index;