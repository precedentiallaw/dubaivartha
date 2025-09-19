import { useState, useEffect } from "react";
import Header from "@/components/Header";
import Navigation from "@/components/Navigation";
import BreakingNews from "@/components/BreakingNews";
import ArticleCard, { Article } from "@/components/ArticleCard";
import ArticleDetail from "@/components/ArticleDetail";
import AdBanner from "@/components/AdBanner";
import SubscriberOffers from "@/components/SubscriberOffers";
import { mockArticles, getArticlesByCategory } from "@/data/mockArticles";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const navigate = useNavigate();
  const [isDark, setIsDark] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState("home");
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
  const [articles, setArticles] = useState<Article[]>(mockArticles);

  useEffect(() => {
    // Apply theme
    if (isDark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDark]);

  useEffect(() => {
    // Update articles when category changes
    setArticles(getArticlesByCategory(activeCategory));
  }, [activeCategory]);

  const handleThemeToggle = () => {
    setIsDark(!isDark);
  };

  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleCategoryChange = (category: string) => {
    if (category === "about") {
      navigate("/about");
      return;
    }
    setActiveCategory(category);
    setSelectedArticle(null);
  };

  const handleArticleClick = (article: Article) => {
    setSelectedArticle(article);
  };

  const handleBackToList = () => {
    setSelectedArticle(null);
  };

  // Show article detail view
  if (selectedArticle) {
    return (
      <div className="min-h-screen bg-background">
        <Header 
          onMenuClick={handleMenuToggle}
          isDark={isDark}
          onThemeToggle={handleThemeToggle}
        />
        <ArticleDetail 
          article={selectedArticle}
          onBack={handleBackToList}
        />
      </div>
    );
  }

  const featuredArticle = articles.find(article => article.isBreaking) || articles[0];
  const regularArticles = articles.filter(article => article.id !== featuredArticle?.id);

  return (
    <div className="min-h-screen bg-background">
      <Header 
        onMenuClick={handleMenuToggle}
        isDark={isDark}
        onThemeToggle={handleThemeToggle}
      />
      
      <Navigation
        activeCategory={activeCategory}
        onCategoryChange={handleCategoryChange}
        isOpen={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
      />
      
      <BreakingNews />
      
      <main className="md:ml-0 transition-all duration-300">
        <div className="container mx-auto px-4 py-6">
            {featuredArticle && (
              <section className="mb-8">
                <h2 className="text-2xl font-bold mb-4 gradient-text">Featured News</h2>
                <ArticleCard
                  article={featuredArticle}
                  variant="featured"
                  onClick={handleArticleClick}
                />
              </section>
            )}

            {/* Ad Banner */}
            <AdBanner type="featured" className="mb-8" />

            {/* Regular Articles Grid */}
            <section>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold">
                  {activeCategory === "home" ? "Latest News" : `${activeCategory.toUpperCase()} News`}
                </h2>
                <span className="text-sm text-muted-foreground">
                  {articles.length} articles
                </span>
              </div>
              
              {articles.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {regularArticles.slice(0, 6).map((article, index) => (
                    <div key={article.id}>
                      <ArticleCard
                        article={article}
                        onClick={handleArticleClick}
                      />
                      {/* Insert ad banner after every 3rd article */}
                      {(index + 1) % 3 === 0 && index < regularArticles.length - 1 && (
                        <div className="col-span-full mt-6 mb-6">
                          <AdBanner type="banner" className="max-w-2xl mx-auto" />
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <p className="text-muted-foreground text-lg">
                    No articles found in this category.
                  </p>
                  <p className="text-sm text-muted-foreground mt-2">
                    Check back later for updates.
                  </p>
                </div>
              )}
            </section>

            {/* Subscriber Offers Section */}
            {activeCategory === "home" && (
              <section className="mt-16">
                <SubscriberOffers />
              </section>
            )}

            {/* Load More Button */}
            {articles.length > 6 && (
              <div className="text-center mt-12">
                <button className="px-8 py-3 bg-brand-gradient text-white rounded-lg font-medium hover:opacity-90 transition-opacity">
                  Load More Articles
                </button>
              </div>
            )}
        </div>
      </main>
    </div>
  );
};

export default Index;