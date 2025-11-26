import { useParams, useNavigate, Link } from "react-router-dom";
import { Tag, Calendar, ArrowLeft } from "lucide-react";
import { mockArticles } from "../lib/supabase";
import ArticleCard from "../components/ArticleCard";
import { formatDate } from "../utils/helpers";

export default function CategoryPage() {
  const { category } = useParams<{ category: string }>();
  const navigate = useNavigate();

  // Decode category from URL
  const decodedCategory = category ? decodeURIComponent(category) : "";

  // Filter articles by category
  const categoryArticles = mockArticles.filter(
    (article) => article.category === decodedCategory
  );

  // Calculate stats
  const totalViews = categoryArticles.reduce((sum, a) => sum + a.views, 0);
  const totalLikes = categoryArticles.reduce((sum, a) => sum + a.likes, 0);
  const latestArticle = categoryArticles[0];

  if (categoryArticles.length === 0) {
    return (
      <div className="min-h-screen bg-white dark:bg-gray-900 flex items-center justify-center px-4">
        <div className="text-center">
          <Tag className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-primary dark:text-white mb-2">
            Catégorie introuvable
          </h1>
          <p className="text-secondary dark:text-gray-400 mb-6">
            Cette catégorie n'existe pas ou ne contient aucun article.
          </p>
          <Link
            to="/archives"
            className="inline-flex items-center space-x-2 bg-accent text-white px-6 py-3 rounded-lg hover:bg-accent/90 transition-all font-semibold"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Voir toutes les catégories</span>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors">
      {/* Header */}
      <div className="bg-gradient-to-br from-gray-50 to-white dark:from-gray-800 dark:to-gray-900 py-12 md:py-16 px-4 border-b border-gray-100 dark:border-gray-700">
        <div className="max-w-5xl mx-auto">
          <button
            onClick={() => navigate("/archives")}
            className="inline-flex items-center space-x-2 text-secondary dark:text-gray-400 hover:text-accent transition-colors mb-6 px-3 py-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="font-medium">Retour aux archives</span>
          </button>

          <div className="flex items-center justify-center space-x-3 mb-6">
            <div className="bg-accent/10 p-3 rounded-xl">
              <Tag className="w-8 h-8 text-accent" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-primary dark:text-white">
              {decodedCategory}
            </h1>
          </div>

          <p className="text-center text-lg text-secondary dark:text-gray-300 max-w-2xl mx-auto">
            Découvrez tous les articles et événements de la catégorie{" "}
            <span className="font-semibold text-accent">{decodedCategory}</span>
          </p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          <div className="bg-gradient-to-br from-gray-50 to-white dark:from-gray-800 dark:to-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-6 text-center">
            <p className="text-3xl font-bold text-accent mb-1">
              {categoryArticles.length}
            </p>
            <p className="text-sm text-secondary dark:text-gray-400">
              Article{categoryArticles.length > 1 ? "s" : ""}
            </p>
          </div>
          <div className="bg-gradient-to-br from-gray-50 to-white dark:from-gray-800 dark:to-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-6 text-center">
            <p className="text-3xl font-bold text-accent-green mb-1">
              {totalViews}
            </p>
            <p className="text-sm text-secondary dark:text-gray-400">Vues</p>
          </div>
          <div className="bg-gradient-to-br from-gray-50 to-white dark:from-gray-800 dark:to-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-6 text-center">
            <p className="text-3xl font-bold text-primary dark:text-white mb-1">
              {totalLikes}
            </p>
            <p className="text-sm text-secondary dark:text-gray-400">Likes</p>
          </div>
          <div className="bg-gradient-to-br from-gray-50 to-white dark:from-gray-800 dark:to-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-6 text-center">
            <div className="flex items-center justify-center space-x-1 mb-1">
              <Calendar className="w-5 h-5 text-accent" />
              <p className="text-sm font-semibold text-primary dark:text-white">
                Dernier
              </p>
            </div>
            <p className="text-xs text-secondary dark:text-gray-400">
              {formatDate(latestArticle.published_at).split(" ").slice(0, 2).join(" ")}
            </p>
          </div>
        </div>

        {/* Articles Grid */}
        <div>
          <h2 className="text-2xl font-bold text-primary dark:text-white mb-6">
            Tous les articles
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {categoryArticles.map((article) => (
              <ArticleCard
                key={article.id}
                article={article}
                onClick={() => navigate(`/article/${article.slug}`)}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
