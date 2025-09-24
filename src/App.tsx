import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import About from "./pages/About";
import Search from "./pages/Search";
import Bookmarks from "./pages/Bookmarks";
import CategoryPage from "./pages/CategoryPage";
import ArticleDetailPage from "./pages/ArticleDetailPage";
import BreakingNewsPage from "./pages/BreakingNewsPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/search" element={<Search />} />
          <Route path="/bookmarks" element={<Bookmarks />} />
          <Route path="/breaking" element={<BreakingNewsPage />} />
          <Route path="/category/:category" element={<CategoryPage />} />
          <Route path="/article/:slug" element={<ArticleDetailPage />} />
          <Route path="/about" element={<About onBack={() => window.history.back()} />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
