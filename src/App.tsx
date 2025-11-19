import { useState } from "react";
import Navigation from "./components/Navigation";
import HomePage from "./pages/HomePage";
import ArticleDetailPage from "./pages/ArticleDetailPage";
import EventsPage from "./pages/EventsPage";
import AboutPage from "./pages/AboutPage";
import { Article } from "./lib/supabase";

type Page = "accueil" | "evenements" | "apropos";

function App() {
  const [currentPage, setCurrentPage] = useState<Page>("accueil");
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);

  const handleArticleClick = (article: Article) => {
    setSelectedArticle(article);
  };

  const handleBackToHome = () => {
    setSelectedArticle(null);
  };

  const handleNavigate = (page: Page) => {
    setCurrentPage(page);
    setSelectedArticle(null);
  };

  return (
    <div className="min-h-screen bg-white">
      <Navigation currentPage={currentPage} onNavigate={handleNavigate} />

      {selectedArticle ? (
        <ArticleDetailPage
          article={selectedArticle}
          onBack={handleBackToHome}
        />
      ) : currentPage === "accueil" ? (
        <HomePage onArticleClick={handleArticleClick} />
      ) : currentPage === "evenements" ? (
        <EventsPage />
      ) : (
        <AboutPage />
      )}
    </div>
  );
}

export default App;
