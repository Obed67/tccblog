import { useParams, useNavigate, Link } from "react-router-dom";
import { User, MapPin, FileText, Heart, Eye, ArrowLeft } from "lucide-react";
import { mockArticles } from "../lib/supabase";
import ArticleCard from "../components/ArticleCard";

export default function AuthorPage() {
  const { authorName } = useParams<{ authorName: string }>();
  const navigate = useNavigate();

  // Decode author name from URL
  const decodedAuthorName = authorName ? decodeURIComponent(authorName) : "";

  // Filter articles by author
  const authorArticles = mockArticles.filter(
    (article) => article.author.name === decodedAuthorName
  );

  // Get author info from first article
  const authorInfo = authorArticles[0]?.author;

  // Calculate stats
  const totalViews = authorArticles.reduce((sum, a) => sum + a.views, 0);
  const totalLikes = authorArticles.reduce((sum, a) => sum + a.likes, 0);

  // Get categories
  const categories = Array.from(
    new Set(authorArticles.map((a) => a.category))
  );

  if (authorArticles.length === 0) {
    return (
      <div className="min-h-screen bg-white dark:bg-gray-900 flex items-center justify-center px-4">
        <div className="text-center">
          <User className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-primary dark:text-white mb-2">
            Auteur introuvable
          </h1>
          <p className="text-secondary dark:text-gray-400 mb-6">
            Cet auteur n'existe pas ou n'a publié aucun article.
          </p>
          <Link
            to="/"
            className="inline-flex items-center space-x-2 bg-accent text-white px-6 py-3 rounded-lg hover:bg-accent/90 transition-all font-semibold"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Retour à l'accueil</span>
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
            onClick={() => navigate(-1)}
            className="inline-flex items-center space-x-2 text-secondary dark:text-gray-400 hover:text-accent transition-colors mb-6 px-3 py-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="font-medium">Retour</span>
          </button>

          {/* Author Profile */}
          <div className="text-center">
            <div className="w-24 h-24 bg-gradient-to-br from-accent to-accent-green rounded-full flex items-center justify-center mx-auto mb-4">
              <User className="w-12 h-12 text-white" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-primary dark:text-white mb-3">
              {authorInfo.name}
            </h1>
            <div className="flex items-center justify-center space-x-2 text-secondary dark:text-gray-400 mb-6">
              <MapPin className="w-5 h-5 text-accent" />
              <span className="text-lg">{authorInfo.chapter}</span>
            </div>
            <p className="text-secondary dark:text-gray-300 max-w-2xl mx-auto leading-relaxed">
              Membre actif de la communauté TCC, contributeur régulier
              d'articles et organisateur d'événements technologiques.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          <div className="bg-gradient-to-br from-gray-50 to-white dark:from-gray-800 dark:to-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-6 text-center">
            <div className="flex items-center justify-center space-x-2 mb-2">
              <FileText className="w-5 h-5 text-accent" />
              <p className="text-3xl font-bold text-accent">
                {authorArticles.length}
              </p>
            </div>
            <p className="text-sm text-secondary dark:text-gray-400">
              Article{authorArticles.length > 1 ? "s" : ""}
            </p>
          </div>
          <div className="bg-gradient-to-br from-gray-50 to-white dark:from-gray-800 dark:to-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-6 text-center">
            <div className="flex items-center justify-center space-x-2 mb-2">
              <Eye className="w-5 h-5 text-accent-green" />
              <p className="text-3xl font-bold text-accent-green">
                {totalViews}
              </p>
            </div>
            <p className="text-sm text-secondary dark:text-gray-400">Vues</p>
          </div>
          <div className="bg-gradient-to-br from-gray-50 to-white dark:from-gray-800 dark:to-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-6 text-center">
            <div className="flex items-center justify-center space-x-2 mb-2">
              <Heart className="w-5 h-5 text-red-500" />
              <p className="text-3xl font-bold text-primary dark:text-white">
                {totalLikes}
              </p>
            </div>
            <p className="text-sm text-secondary dark:text-gray-400">Likes</p>
          </div>
          <div className="bg-gradient-to-br from-gray-50 to-white dark:from-gray-800 dark:to-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-6 text-center">
            <p className="text-3xl font-bold text-primary dark:text-white mb-2">
              {categories.length}
            </p>
            <p className="text-sm text-secondary dark:text-gray-400">
              Catégorie{categories.length > 1 ? "s" : ""}
            </p>
          </div>
        </div>

        {/* Categories */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-primary dark:text-white mb-4">
            Catégories couvertes
          </h2>
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <Link
                key={category}
                to={`/category/${encodeURIComponent(category)}`}
                className="px-4 py-2 bg-accent/10 text-accent hover:bg-accent hover:text-white rounded-lg transition-all font-medium"
              >
                {category}
              </Link>
            ))}
          </div>
        </div>

        {/* Articles */}
        <div>
          <h2 className="text-2xl font-bold text-primary dark:text-white mb-6">
            Articles publiés
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {authorArticles.map((article) => (
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
