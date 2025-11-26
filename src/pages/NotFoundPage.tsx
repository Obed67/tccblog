import { Link } from "react-router-dom";
import { Home, Search, FileQuestion } from "lucide-react";

export default function NotFoundPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 flex items-center justify-center px-4">
      <div className="max-w-2xl mx-auto text-center">
        {/* 404 Animation */}
        <div className="mb-8 relative">
          <div className="text-[150px] md:text-[200px] font-bold text-gray-100 dark:text-gray-800 leading-none select-none">
            404
          </div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="bg-accent/10 p-8 rounded-full animate-pulse">
              <FileQuestion className="w-20 h-20 md:w-24 md:h-24 text-accent" />
            </div>
          </div>
        </div>

        {/* Message */}
        <h1 className="text-3xl md:text-4xl font-bold text-primary dark:text-white mb-4">
          Page introuvable
        </h1>
        <p className="text-lg text-secondary dark:text-gray-400 mb-8 leading-relaxed">
          Désolé, la page que vous recherchez n'existe pas ou a été déplacée.
          <br />
          Retournez à l'accueil ou utilisez la recherche pour trouver ce que
          vous cherchez.
        </p>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
          <Link
            to="/"
            className="inline-flex items-center space-x-2 bg-accent text-white px-8 py-3 rounded-lg hover:bg-accent/90 transition-all font-semibold shadow-md hover:shadow-lg"
          >
            <Home className="w-5 h-5" />
            <span>Retour à l'accueil</span>
          </Link>
          <Link
            to="/search"
            className="inline-flex items-center space-x-2 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 px-8 py-3 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-all font-semibold"
          >
            <Search className="w-5 h-5" />
            <span>Rechercher</span>
          </Link>
        </div>

        {/* Quick Links */}
        <div className="bg-gradient-to-br from-gray-50 to-white dark:from-gray-800 dark:to-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-6">
          <h2 className="text-lg font-semibold text-primary dark:text-white mb-4">
            Liens utiles
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Link
              to="/"
              className="text-accent hover:text-accent/80 transition-colors font-medium"
            >
              Accueil
            </Link>
            <Link
              to="/archives"
              className="text-accent hover:text-accent/80 transition-colors font-medium"
            >
              Archives
            </Link>
            <Link
              to="/about"
              className="text-accent hover:text-accent/80 transition-colors font-medium"
            >
              À propos
            </Link>
            <Link
              to="/search"
              className="text-accent hover:text-accent/80 transition-colors font-medium"
            >
              Recherche
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
