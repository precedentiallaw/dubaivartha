import { useParams } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useArticles, Article } from "@/hooks/useArticles";
import ArticleCard from "@/components/ArticleCard";
import { NewsGridSkeleton } from "@/components/ui/loading-skeleton";
import AdBanner from "@/components/AdBanner";
import { useNavigate } from "react-router-dom";

const categories = {
  dubai: { title: "Dubai News", malayalam: "ദുബായ് വാർത്തകൾ" },
  uae: { title: "UAE News", malayalam: "യുഎഇ വാർത്തകൾ" },
  kerala: { title: "Kerala News", malayalam: "കേരളം വാർത്തകൾ" },
  gcc: { title: "GCC News", malayalam: "ജിസിസി വാർത്തകൾ" },
  world: { title: "World News", malayalam: "ലോക വാർത്തകൾ" },
  videos: { title: "Video News", malayalam: "വീഡിയോ വാർത്തകൾ" },
  social: { title: "Social Media", malayalam: "സോഷ്യൽ മീഡിയ" },
  trending: { title: "Trending News", malayalam: "ട്രെൻഡിംഗ് വാർത്തകൾ" },
};

const CategoryPage = () => {
  const { category } = useParams<{ category: string }>();
  const navigate = useNavigate();
  const { articles, loading, error, refreshArticles } = useArticles(category);

  const categoryInfo = categories[category as keyof typeof categories];

  const handleArticleClick = (article: Article) => {
    navigate(`/article/${article.slug}`);
  };

  const handleBackToHome = () => {
    navigate('/');
  };

  if (!categoryInfo) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Category Not Found</h1>
          <Button onClick={handleBackToHome}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Home
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-40 border-b bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/60">
        <div className="container px-4">
          <div className="flex items-center gap-4 h-16">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleBackToHome}
              className="flex items-center gap-2"
            >
              <ArrowLeft className="h-4 w-4" />
              Back
            </Button>
            
            <div>
              <h1 className="text-xl font-bold">{categoryInfo.title}</h1>
              <p className="text-sm text-muted-foreground">{categoryInfo.malayalam}</p>
            </div>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="container px-4 py-6">
        {error && (
          <div className="mb-6 p-4 bg-destructive/10 border border-destructive/20 rounded-lg">
            <p className="text-destructive text-sm">{error}</p>
            <Button size="sm" onClick={refreshArticles} className="mt-2">
              Try Again
            </Button>
          </div>
        )}

        {loading ? (
          <NewsGridSkeleton />
        ) : (
          <>
            {/* Ad Banner */}
            <div className="mb-8">
              <AdBanner 
                type="featured"
                title="Special Offers for Dubai Vartha Readers"
              />
            </div>

            {/* Articles Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {articles.map((article) => (
                <ArticleCard
                  key={article.id}
                  article={article}
                  onClick={() => handleArticleClick(article)}
                />
              ))}
            </div>

            {articles.length === 0 && !loading && (
              <div className="text-center py-12">
                <h3 className="text-lg font-semibold mb-2">No articles found</h3>
                <p className="text-muted-foreground mb-4">
                  No articles available in this category at the moment.
                </p>
                <Button onClick={refreshArticles}>
                  Refresh Articles
                </Button>
              </div>
            )}
          </>
        )}
      </main>
    </div>
  );
};

export default CategoryPage;