import { useState } from "react";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import Navigation from "./components/Navigation";
import HomePage from "./pages/HomePage";
import ArticleDetailPage from "./pages/ArticleDetailPage";
import EventsPage from "./pages/EventsPage";
import AboutPage from "./pages/AboutPage";
import CreateArticlePage from "./pages/CreateArticlePage";
import { Article, mockArticles } from "./lib/supabase";

function AppContent() {
  const [articles, setArticles] = useState<Article[]>(mockArticles);
  const navigate = useNavigate();

  const handleArticleClick = (article: Article) => {
    navigate(`/article/${article.slug}`);
  };

  const handlePublishArticle = (newArticle: Article) => {
    setArticles([newArticle, ...articles]);
    navigate("/");
    alert("✅ Article publié avec succès !");
  };

  return (
    <div className="min-h-screen bg-white">
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Navigation />
              <HomePage
                onArticleClick={handleArticleClick}
                articles={articles}
              />
              <button
                onClick={() => navigate("/create")}
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
            </>
          }
        />
        <Route
          path="/archives"
          element={
            <>
              <Navigation />
              <EventsPage />
              <button
                onClick={() => navigate("/create")}
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
              </button>
            </>
          }
        />
        <Route
          path="/about"
          element={
            <>
              <Navigation />
              <AboutPage />
              <button
                onClick={() => navigate("/create")}
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
              </button>
            </>
          }
        />
        <Route
          path="/article/:slug"
          element={
            <>
              <Navigation />
              <ArticleDetailPage
                article={
                  articles.find((a) =>
                    window.location.pathname.includes(a.slug)
                  ) || articles[0]
                }
                onBack={() => navigate("/")}
              />
            </>
          }
        />
        <Route
          path="/create"
          element={
            <CreateArticlePage
              onBack={() => navigate("/")}
              onPublish={handlePublishArticle}
            />
          }
        />
      </Routes>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

export default App;
