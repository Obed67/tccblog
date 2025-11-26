import { useNavigate } from "react-router-dom";
import { Bookmark, Trash2 } from "lucide-react";
import { mockArticles } from "../lib/supabase";
import { useBookmarks } from "../hooks/useBookmarks";
import ArticleCard from "../components/ArticleCard";

export default function BookmarksPage() {
  const navigate = useNavigate();
  const { bookmarks, clearBookmarks } = useBookmarks();

  // Get bookmarked articles
  const bookmarkedArticles = mockArticles.filter((article) =>
    bookmarks.includes(article.id)
  );

  const handleClearAll = () => {
    if (
      window.confirm(
        "Êtes-vous sûr de vouloir supprimer tous vos favoris ?"
      )
    ) {
      clearBookmarks();
    }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors">
      {/* Header */}
      <div className="bg-gradient-to-br from-gray-50 to-white dark:from-gray-800 dark:to-gray-900 py-12 md:py-16 px-4 border-b border-gray-100 dark:border-gray-700">
        <div className="max-w-5xl mx-auto text-center">
          <div className="flex items-center justify-center space-x-3 mb-6">
            <div className="bg-accent/10 p-3 rounded-xl">
              <Bookmark className="w-8 h-8 text-accent" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-primary dark:text-white">
              Mes Favoris
            </h1>
          </div>
          <p className="text-lg text-secondary dark:text-gray-300 max-w-2xl mx-auto">
            Retrouvez tous les articles que vous avez sauvegardés pour les lire
            plus tard.
          </p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {bookmarkedArticles.length > 0 ? (
          <>
            {/* Actions */}
            <div className="flex items-center justify-between mb-8">
              <p className="text-secondary dark:text-gray-400">
                <span className="font-semibold text-primary dark:text-white">
                  {bookmarkedArticles.length}
                </span>{" "}
                article{bookmarkedArticles.length > 1 ? "s" : ""} sauvegardé
                {bookmarkedArticles.length > 1 ? "s" : ""}
              </p>
              <button
                onClick={handleClearAll}
                className="inline-flex items-center space-x-2 px-4 py-2 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-900/30 rounded-lg transition-colors font-medium"
              >
                <Trash2 className="w-4 h-4" />
                <span>Tout supprimer</span>
              </button>
            </div>

            {/* Articles Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {bookmarkedArticles.map((article) => (
                <ArticleCard
                  key={article.id}
                  article={article}
                  onClick={() => navigate(`/article/${article.slug}`)}
                />
              ))}
            </div>
          </>
        ) : (
          /* Empty State */
          <div className="text-center py-20">
            <div className="bg-gray-100 dark:bg-gray-800 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6">
              <Bookmark className="w-12 h-12 text-gray-400" />
            </div>
            <h2 className="text-2xl font-bold text-primary dark:text-white mb-3">
              Aucun favori pour le moment
            </h2>
            <p className="text-secondary dark:text-gray-400 mb-8 max-w-md mx-auto">
              Commencez à sauvegarder vos articles préférés en cliquant sur
              l'icône de favori sur chaque article.
            </p>
            <button
              onClick={() => navigate("/")}
              className="inline-flex items-center space-x-2 bg-accent text-white px-6 py-3 rounded-lg hover:bg-accent/90 transition-all font-semibold shadow-md hover:shadow-lg"
            >
              <span>Découvrir les articles</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
