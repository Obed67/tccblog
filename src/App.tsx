import { useState } from "react";
import Navigation from "./components/Navigation";
import HomePage from "./pages/HomePage";
import ArticleDetailPage from "./pages/ArticleDetailPage";
import EventsPage from "./pages/EventsPage";
import AboutPage from "./pages/AboutPage";
import CreateArticlePage from "./pages/CreateArticlePage";
import { Article, mockArticles } from "./lib/supabase";

type Page = "accueil" | "evenements" | "apropos" | "create";

function App() {
  const [currentPage, setCurrentPage] = useState<Page>("accueil");
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
  const [articles, setArticles] = useState<Article[]>(mockArticles);

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

  const handlePublishArticle = (newArticle: Article) => {
    setArticles([newArticle, ...articles]);
    setCurrentPage("accueil");
    // Simuler un message de succès
    alert("✅ Article publié avec succès !");
  };

  return (
    <div className="min-h-screen bg-white">
      {currentPage !== "create" && (
        <Navigation currentPage={currentPage} onNavigate={handleNavigate} />
      )}

      {selectedArticle ? (
        <ArticleDetailPage
          article={selectedArticle}
          onBack={handleBackToHome}
        />
      ) : currentPage === "create" ? (
        <CreateArticlePage
          onBack={() => setCurrentPage("accueil")}
          onPublish={handlePublishArticle}
        />
      ) : currentPage === "accueil" ? (
        <HomePage onArticleClick={handleArticleClick} articles={articles} />
      ) : currentPage === "evenements" ? (
        <EventsPage />
      ) : (
        <AboutPage />
      )}

      {/* Bouton flottant pour créer un article */}
      {currentPage !== "create" && !selectedArticle && (
        <button
          onClick={() => setCurrentPage("create")}
          className="fixed bottom-8 right-8 bg-accent text-white p-4 rounded-full shadow-lg hover:shadow-xl hover:scale-110 transition-all z-50 group"
          title="Créer un article"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 4v16m8-8H4"
            />
          </svg>
          <span className="absolute right-full mr-3 top-1/2 -translate-y-1/2 bg-gray-900 text-white px-3 py-1.5 rounded-lg text-sm whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
            Créer un article
          </span>
        </button>
      )}
    </div>
  );
}

export default App;
